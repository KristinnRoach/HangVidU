#!/usr/bin/env node

/**
 * Migrate legacy eventType values to 'call:unanswered'.
 *
 * Converts:
 *   - 'missed_call'              → 'call:unanswered'
 *   - 'rejected_call'            → 'call:unanswered'
 *   - 'call:incoming:unanswered' → 'call:unanswered'
 *   - 'call:outgoing:unanswered' → 'call:unanswered'
 *
 * Also removes deprecated details fields (callerId, callerName) from event messages.
 *
 * Usage:
 *   node scripts/migrate-event-types.js              # dry run (default)
 *   node scripts/migrate-event-types.js --apply       # apply changes
 *
 * Requires GOOGLE_APPLICATION_CREDENTIALS or firebase-admin default credentials.
 * Set RTDB_URL if your database URL differs from the default.
 */

import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DRY_RUN = !process.argv.includes('--apply');

const RTDB_URL_FROM_ENV = process.env.RTDB_URL;
const RTDB_URL =
  RTDB_URL_FROM_ENV ||
  'https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app';

if (!RTDB_URL) {
  console.error('Error: RTDB_URL is not set. Aborting.');
  process.exit(1);
}
if (!DRY_RUN && !RTDB_URL_FROM_ENV) {
  console.error(
    'Refusing to run with --apply without explicit RTDB_URL environment variable set.',
  );
  process.exit(1);
}

const serviceAccountPath = path.join(
  __dirname,
  '../functions/service-account-key.json',
);

if (!fs.existsSync(serviceAccountPath)) {
  console.error(
    'Error: service-account-key.json not found at',
    serviceAccountPath,
  );
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: RTDB_URL,
});

const db = admin.database();

const LEGACY_EVENT_TYPES = new Set([
  'missed_call',
  'rejected_call',
  'call:incoming:unanswered',
  'call:outgoing:unanswered',
]);

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
  const updates = {};
  let stats = { eventTypeFixed: 0, detailsCleaned: 0, total: 0 };

  for (const [convId, conv] of Object.entries(conversations)) {
    if (!conv.messages) continue;

    for (const [msgId, msg] of Object.entries(conv.messages)) {
      stats.total++;
      const basePath = `conversations/${convId}/messages/${msgId}`;

      if (msg.type !== 'event') continue;

      // Migrate legacy eventType
      if (LEGACY_EVENT_TYPES.has(msg.eventType)) {
        updates[`${basePath}/eventType`] = 'call:unanswered';
        stats.eventTypeFixed++;
        console.log(
          `[eventType] ${basePath} — '${msg.eventType}' -> 'call:unanswered'`,
        );
      }

      // Remove deprecated details fields
      if (msg.details?.callerId !== undefined) {
        updates[`${basePath}/details/callerId`] = null;
        stats.detailsCleaned++;
        console.log(`[details] ${basePath} — remove callerId`);
      }
      if (msg.details?.callerName !== undefined) {
        updates[`${basePath}/details/callerName`] = null;
        stats.detailsCleaned++;
        console.log(`[details] ${basePath} — remove callerName`);
      }
    }
  }

  console.log('');
  console.log('--- Summary ---');
  console.log(`Total messages scanned:    ${stats.total}`);
  console.log(`eventType migrated:        ${stats.eventTypeFixed}`);
  console.log(`details fields cleaned:    ${stats.detailsCleaned}`);

  const updateCount = Object.keys(updates).length;
  console.log(`Total RTDB paths to update: ${updateCount}`);

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
