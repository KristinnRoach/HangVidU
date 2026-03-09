#!/usr/bin/env node

/**
 * One-off migration script for RTDB messages.
 *
 * Fixes three legacy formats so they pass ParsedMessageSchema validation:
 *
 * 1. Text messages missing `type` field       → adds `type: 'text'`
 * 2. `type: 'call_event'` messages            → `type: 'event'`, moves
 *    top-level callerId/callerName/callId into `details: {}`
 * 3. Event messages with `from: 'system'`     → sets `from` to `details.callerId`
 *
 * Usage:
 *   node scripts/migrate-invalid-rtdb-messages.js              # dry run (default)
 *   node scripts/migrate-invalid-rtdb-messages.js --apply       # apply changes
 *
 * Requires GOOGLE_APPLICATION_CREDENTIALS or firebase-admin default credentials.
 * Set RTDB_URL if your database URL differs from the default.
 */

import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DRY_RUN = !process.argv.includes('--apply');

// Load service account from standard location
const serviceAccountPath = path.join(__dirname, '../functions/service-account-key.json');

if (!fs.existsSync(serviceAccountPath)) {
  console.error('❌ Error: service-account-key.json not found at', serviceAccountPath);
  console.error('Please ensure you have a valid service account key file.');
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app',
});

const db = admin.database();

// ---------------------------------------------------------------------------
// Migration
// ---------------------------------------------------------------------------

async function migrate() {
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN (pass --apply to write)' : 'APPLY'}`);
  console.log('');

  const conversationsRef = db.ref('conversations');
  const snapshot = await conversationsRef.once('value');

  if (!snapshot.exists()) {
    console.log('No conversations found.');
    process.exit(0);
  }

  const conversations = snapshot.val();
  const updates = {}; // multi-path update object
  let stats = { textFixed: 0, callEventFixed: 0, systemFromFixed: 0, total: 0 };

  for (const [convId, conv] of Object.entries(conversations)) {
    if (!conv.messages) continue;

    for (const [msgId, msg] of Object.entries(conv.messages)) {
      stats.total++;
      const basePath = `conversations/${convId}/messages/${msgId}`;

      // 1. Text messages missing type field
      if (!msg.type && msg.text !== undefined && msg.from) {
        updates[`${basePath}/type`] = 'text';
        stats.textFixed++;
        console.log(`[text] ${basePath} — add type:'text'`);
      }

      // 2. Legacy call_event → event with details
      if (msg.type === 'call_event') {
        updates[`${basePath}/type`] = 'event';

        // Move top-level fields into details (if not already there)
        if (!msg.details) {
          updates[`${basePath}/details`] = {
            callerId: msg.callerId || msg.from || null,
            callerName: msg.callerName || 'Unknown',
            callId: msg.callId || null,
          };
        }

        // Clean up top-level fields that are now in details
        if (msg.callerId !== undefined) updates[`${basePath}/callerId`] = null;
        if (msg.callerName !== undefined)
          updates[`${basePath}/callerName`] = null;
        if (msg.callId !== undefined) updates[`${basePath}/callId`] = null;

        stats.callEventFixed++;
        console.log(`[call_event] ${basePath} — migrate to type:'event'`);
      }

      // 3. Event messages with from: 'system' → use callerId
      if (
        (msg.type === 'event' || msg.type === 'call_event') &&
        msg.from === 'system'
      ) {
        const callerId =
          msg.details?.callerId || msg.callerId || null;

        if (callerId) {
          updates[`${basePath}/from`] = callerId;
          stats.systemFromFixed++;
          console.log(
            `[from:system] ${basePath} — set from to '${callerId}'`,
          );
        } else {
          console.warn(
            `[from:system] ${basePath} — no callerId found, skipping`,
          );
        }
      }
    }
  }

  console.log('');
  console.log('--- Summary ---');
  console.log(`Total messages scanned: ${stats.total}`);
  console.log(`Text messages fixed (added type):  ${stats.textFixed}`);
  console.log(`call_event → event migrated:       ${stats.callEventFixed}`);
  console.log(`from:'system' → callerId:          ${stats.systemFromFixed}`);

  const updateCount = Object.keys(updates).length;
  console.log(`Total RTDB paths to update:        ${updateCount}`);

  if (updateCount === 0) {
    console.log('\nNo changes needed.');
    process.exit(0);
  }

  if (DRY_RUN) {
    console.log('\nDry run complete. Run with --apply to write changes.');
  } else {
    console.log('\nApplying updates...');
    await db.ref().update(updates);
    console.log('Done.');
  }

  process.exit(0);
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
