#!/usr/bin/env node

/**
 * Rename legacy contact field `contactName` -> `contactNickName` in RTDB.
 *
 * Usage:
 *   node scripts/migrate-contact-name-to-contact-nickname.js           # dry run
 *   RTDB_URL="https://..." node scripts/migrate-contact-name-to-contact-nickname.js --apply
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

  const usersSnap = await db.ref('users').once('value');
  if (!usersSnap.exists()) {
    console.log('No users found.');
    process.exit(0);
  }

  const users = usersSnap.val();
  const updates = {};
  const stats = {
    usersScanned: 0,
    contactsScanned: 0,
    migrated: 0,
    removedLegacyOnly: 0,
    mismatched: 0,
  };

  for (const [userId, userData] of Object.entries(users)) {
    stats.usersScanned++;
    const contacts = userData?.contacts;
    if (!contacts || typeof contacts !== 'object') {
      continue;
    }

    for (const [contactId, contact] of Object.entries(contacts)) {
      stats.contactsScanned++;
      if (!contact || typeof contact !== 'object') {
        continue;
      }

      const legacyName =
        typeof contact.contactName === 'string' ? contact.contactName.trim() : '';
      const nextNickName =
        typeof contact.contactNickName === 'string'
          ? contact.contactNickName.trim()
          : '';

      const basePath = `users/${userId}/contacts/${contactId}`;

      if (!nextNickName && legacyName) {
        updates[`${basePath}/contactNickName`] = legacyName;
        updates[`${basePath}/contactName`] = null;
        stats.migrated++;
        console.log(
          `[migrate] ${basePath}: contactName -> contactNickName ("${legacyName}")`,
        );
        continue;
      }

      if (nextNickName && legacyName) {
        if (nextNickName !== legacyName) {
          stats.mismatched++;
          console.log(
            `[mismatch] ${basePath}: keeping contactNickName="${nextNickName}", removing legacy contactName="${legacyName}"`,
          );
        } else {
          console.log(`[cleanup] ${basePath}: removing duplicate contactName`);
        }
        updates[`${basePath}/contactName`] = null;
        stats.removedLegacyOnly++;
      }
    }
  }

  console.log('');
  console.log('--- Summary ---');
  console.log(`Users scanned:            ${stats.usersScanned}`);
  console.log(`Contacts scanned:         ${stats.contactsScanned}`);
  console.log(`Records migrated:         ${stats.migrated}`);
  console.log(`Legacy fields removed:    ${stats.removedLegacyOnly}`);
  console.log(`Nick/legacy mismatches:   ${stats.mismatched}`);
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
