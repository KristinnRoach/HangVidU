#!/usr/bin/env node

/**
 * One-off RTDB repair script for push subscription ownership state.
 *
 * What it does:
 * 1. Scans `users/{uid}/pushSubscriptions/{subscriptionId}`
 * 2. Rebuilds or repairs `pushSubscriptionOwners/{subscriptionId}`
 * 3. Removes orphaned ownership index entries with no backing subscription
 * 4. Resolves duplicate subscription ownership by keeping one canonical owner
 *    and deleting duplicate copies from other users
 *
 * Canonical-owner selection rules:
 * - Prefer the current indexed owner if that user still has the subscription
 * - Otherwise prefer the owner with the most recent `lastUsed`
 * - Then prefer the owner with the most recent `createdAt`
 * - Then fall back to lexicographic UID order for deterministic output
 *
 * Usage:
 *   node scripts/repair-push-subscription-ownership.js
 *   RTDB_URL="https://..." node scripts/repair-push-subscription-ownership.js --apply
 *
 * Requires GOOGLE_APPLICATION_CREDENTIALS or firebase-admin default credentials.
 * This script also loads `functions/service-account-key.json` if present, matching
 * the existing maintenance-script pattern in this repo.
 */

import admin from 'firebase-admin';
import crypto from 'node:crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DRY_RUN = !process.argv.includes('--apply');
const VERBOSE = process.argv.includes('--verbose');

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
  console.error('Set RTDB_URL to the target RTDB instance and re-run with --apply.');
  process.exit(1);
}

const serviceAccountPath = path.join(
  __dirname,
  '../functions/service-account-key.json',
);

if (!fs.existsSync(serviceAccountPath)) {
  console.error('Error: service-account-key.json not found at', serviceAccountPath);
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: RTDB_URL,
});

const db = admin.database();

function getSubscriptionId(endpoint) {
  return crypto
    .createHash('sha256')
    .update(endpoint)
    .digest('hex')
    .slice(0, 40);
}

function maskSubscriptionKey(key) {
  if (!key) return 'unknown';
  return `${key.slice(0, 8)}...${key.slice(-6)}`;
}

function asTimestamp(value) {
  return Number.isFinite(value) ? value : 0;
}

function getOwnerRank(owner) {
  return {
    lastUsed: asTimestamp(owner.record?.lastUsed),
    createdAt: asTimestamp(owner.record?.createdAt),
  };
}

function pickCanonicalOwner(owners, indexedOwnerUid) {
  const indexedOwner = owners.find((owner) => owner.uid === indexedOwnerUid);
  if (indexedOwner) {
    return {
      owner: indexedOwner,
      reason: 'indexed-owner',
    };
  }

  const rankedOwners = [...owners].sort((left, right) => {
    const leftRank = getOwnerRank(left);
    const rightRank = getOwnerRank(right);

    if (rightRank.lastUsed !== leftRank.lastUsed) {
      return rightRank.lastUsed - leftRank.lastUsed;
    }
    if (rightRank.createdAt !== leftRank.createdAt) {
      return rightRank.createdAt - leftRank.createdAt;
    }
    return left.uid.localeCompare(right.uid);
  });

  const reason =
    asTimestamp(rankedOwners[0]?.record?.lastUsed) > 0
      ? 'latest-lastUsed'
      : asTimestamp(rankedOwners[0]?.record?.createdAt) > 0
        ? 'latest-createdAt'
        : 'stable-uid-tiebreak';

  return {
    owner: rankedOwners[0],
    reason,
  };
}

async function main() {
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN (pass --apply to write)' : 'APPLY'}`);
  console.log(`RTDB: ${RTDB_URL}`);
  console.log('');

  const [usersSnapshot, ownersIndexSnapshot] = await Promise.all([
    db.ref('users').once('value'),
    db.ref('pushSubscriptionOwners').once('value'),
  ]);

  const users = usersSnapshot.val() || {};
  const indexedOwners = ownersIndexSnapshot.val() || {};

  const ownersBySubscriptionId = new Map();
  const malformedEntries = [];
  const stats = {
    usersScanned: 0,
    subscriptionRecordsScanned: 0,
    uniqueSubscriptionIds: 0,
    missingIndexes: 0,
    wrongIndexes: 0,
    orphanedIndexes: 0,
    duplicateSubscriptionIds: 0,
    duplicateCopiesRemoved: 0,
    malformedEntries: 0,
  };
  const updates = {};

  for (const [uid, user] of Object.entries(users)) {
    stats.usersScanned++;

    const pushSubscriptions = user?.pushSubscriptions;
    if (!pushSubscriptions || typeof pushSubscriptions !== 'object') {
      continue;
    }

    for (const [storedSubscriptionId, record] of Object.entries(pushSubscriptions)) {
      stats.subscriptionRecordsScanned++;

      const endpoint = record?.subscription?.endpoint || record?.endpoint;
      if (!endpoint) {
        malformedEntries.push({
          uid,
          storedSubscriptionId,
          reason: 'missing-endpoint',
        });
        continue;
      }

      const derivedSubscriptionId = getSubscriptionId(endpoint);
      if (derivedSubscriptionId !== storedSubscriptionId) {
        malformedEntries.push({
          uid,
          storedSubscriptionId,
          derivedSubscriptionId,
          reason: 'stored-key-does-not-match-endpoint',
        });
        continue;
      }

      if (!ownersBySubscriptionId.has(storedSubscriptionId)) {
        ownersBySubscriptionId.set(storedSubscriptionId, []);
      }

      ownersBySubscriptionId.get(storedSubscriptionId).push({
        uid,
        record,
      });
    }
  }

  stats.uniqueSubscriptionIds = ownersBySubscriptionId.size;
  stats.malformedEntries = malformedEntries.length;

  for (const [subscriptionId, owners] of ownersBySubscriptionId.entries()) {
    const indexedOwnerUid = indexedOwners[subscriptionId] || null;
    const canonical = pickCanonicalOwner(owners, indexedOwnerUid);
    const canonicalUid = canonical.owner.uid;

    if (!indexedOwnerUid) {
      stats.missingIndexes++;
      updates[`pushSubscriptionOwners/${subscriptionId}`] = canonicalUid;
      console.log(
        `[backfill-index] ${maskSubscriptionKey(subscriptionId)} -> ${canonicalUid}`,
      );
    } else if (indexedOwnerUid !== canonicalUid) {
      stats.wrongIndexes++;
      updates[`pushSubscriptionOwners/${subscriptionId}`] = canonicalUid;
      console.log(
        `[repair-index] ${maskSubscriptionKey(subscriptionId)} ${indexedOwnerUid} -> ${canonicalUid} (${canonical.reason})`,
      );
    } else if (VERBOSE) {
      console.log(
        `[ok-index] ${maskSubscriptionKey(subscriptionId)} -> ${canonicalUid}`,
      );
    }

    if (owners.length > 1) {
      stats.duplicateSubscriptionIds++;
      console.log(
        `[duplicate] ${maskSubscriptionKey(subscriptionId)} owners=${owners.map((owner) => owner.uid).join(', ')} keep=${canonicalUid} (${canonical.reason})`,
      );

      owners
        .filter((owner) => owner.uid !== canonicalUid)
        .forEach((owner) => {
          stats.duplicateCopiesRemoved++;
          updates[`users/${owner.uid}/pushSubscriptions/${subscriptionId}`] = null;
          console.log(
            `[remove-duplicate] users/${owner.uid}/pushSubscriptions/${subscriptionId}`,
          );
        });
    }
  }

  for (const [subscriptionId, indexedOwnerUid] of Object.entries(indexedOwners)) {
    if (!ownersBySubscriptionId.has(subscriptionId)) {
      stats.orphanedIndexes++;
      updates[`pushSubscriptionOwners/${subscriptionId}`] = null;
      console.log(
        `[remove-orphaned-index] ${maskSubscriptionKey(subscriptionId)} owner=${indexedOwnerUid}`,
      );
    }
  }

  if (malformedEntries.length > 0) {
    console.log('');
    console.log('Malformed subscription entries skipped for manual review:');
    malformedEntries.forEach((entry) => {
      const detail =
        entry.reason === 'stored-key-does-not-match-endpoint'
          ? `stored=${entry.storedSubscriptionId} derived=${entry.derivedSubscriptionId}`
          : `stored=${entry.storedSubscriptionId}`;
      console.log(`- uid=${entry.uid} ${detail} reason=${entry.reason}`);
    });
  }

  const updateCount = Object.keys(updates).length;

  console.log('');
  console.log('--- Summary ---');
  console.log(`Users scanned:                 ${stats.usersScanned}`);
  console.log(`Subscription records scanned:  ${stats.subscriptionRecordsScanned}`);
  console.log(`Unique subscription IDs:       ${stats.uniqueSubscriptionIds}`);
  console.log(`Missing indexes to backfill:   ${stats.missingIndexes}`);
  console.log(`Wrong indexes to repair:       ${stats.wrongIndexes}`);
  console.log(`Orphaned indexes to remove:    ${stats.orphanedIndexes}`);
  console.log(`Duplicate subscription IDs:    ${stats.duplicateSubscriptionIds}`);
  console.log(`Duplicate copies to remove:    ${stats.duplicateCopiesRemoved}`);
  console.log(`Malformed entries skipped:     ${stats.malformedEntries}`);
  console.log(`Total RTDB paths to update:    ${updateCount}`);

  if (updateCount === 0) {
    console.log('');
    console.log('No changes needed.');
    process.exit(0);
  }

  if (DRY_RUN) {
    console.log('');
    console.log('Dry run complete. Re-run with --apply to write changes.');
    process.exit(0);
  }

  console.log('');
  console.log('Applying updates...');
  await db.ref().update(updates);
  console.log('Done.');
  process.exit(0);
}

main().catch((error) => {
  console.error('Repair failed:', error);
  process.exit(1);
});
