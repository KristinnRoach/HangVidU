#!/usr/bin/env node

/**
 * Rename legacy usersByEmail field `displayName` -> `userName` in RTDB.
 *
 * Usage:
 *   node scripts/migrate-usersbyemail-display-name-to-user-name.js           # dry run
 *   RTDB_URL="https://..." node scripts/migrate-usersbyemail-display-name-to-user-name.js --apply
 *
 * Requires GOOGLE_APPLICATION_CREDENTIALS or firebase-admin default credentials.
 */

import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DRY_RUN = !process.argv.includes('--apply');

const RTDB_URL =
  process.env.RTDB_URL ||
  'https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app';

if (!RTDB_URL) {
  console.error('Error: RTDB_URL is not set. Aborting.');
  process.exit(1);
}

const serviceAccountPath = path.join(
  __dirname,
  '../functions/service-account-key.json',
);

const appOptions = { databaseURL: RTDB_URL };
if (fs.existsSync(serviceAccountPath)) {
  const serviceAccount = JSON.parse(
    fs.readFileSync(serviceAccountPath, 'utf-8'),
  );
  appOptions.credential = admin.credential.cert(serviceAccount);
}

admin.initializeApp(appOptions);
const db = admin.database();

async function migrate() {
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN (pass --apply to write)' : 'APPLY'}`);
  console.log('');

  const directorySnap = await db.ref('usersByEmail').once('value');
  if (!directorySnap.exists()) {
    console.log('No usersByEmail entries found.');
    process.exit(0);
  }

  const entries = directorySnap.val();
  const updates = {};
  const stats = {
    entriesScanned: 0,
    migrated: 0,
    removedLegacyOnly: 0,
    mismatched: 0,
  };

  for (const [emailHash, entry] of Object.entries(entries)) {
    stats.entriesScanned++;
    if (!entry || typeof entry !== 'object') {
      continue;
    }

    const legacyDisplayName =
      typeof entry.displayName === 'string' ? entry.displayName.trim() : '';
    const nextUserName =
      typeof entry.userName === 'string' ? entry.userName.trim() : '';
    const basePath = `usersByEmail/${emailHash}`;

    if (!nextUserName && legacyDisplayName) {
      updates[`${basePath}/userName`] = legacyDisplayName;
      updates[`${basePath}/displayName`] = null;
      stats.migrated++;
      console.log(
        `[migrate] ${basePath}: displayName -> userName ("${legacyDisplayName}")`,
      );
      continue;
    }

    if (nextUserName && legacyDisplayName) {
      if (nextUserName !== legacyDisplayName) {
        stats.mismatched++;
        console.log(
          `[mismatch] ${basePath}: keeping userName="${nextUserName}", removing legacy displayName="${legacyDisplayName}"`,
        );
      } else {
        console.log(`[cleanup] ${basePath}: removing duplicate displayName`);
      }
      updates[`${basePath}/displayName`] = null;
      stats.removedLegacyOnly++;
    }
  }

  console.log('');
  console.log('--- Summary ---');
  console.log(`Entries scanned:          ${stats.entriesScanned}`);
  console.log(`Entries migrated:         ${stats.migrated}`);
  console.log(`Legacy fields removed:    ${stats.removedLegacyOnly}`);
  console.log(`User/legacy mismatches:   ${stats.mismatched}`);
  console.log(`Total RTDB updates:       ${Object.keys(updates).length}`);

  if (Object.keys(updates).length === 0) {
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

migrate().catch((error) => {
  console.error('Migration failed:', error);
  process.exit(1);
});
