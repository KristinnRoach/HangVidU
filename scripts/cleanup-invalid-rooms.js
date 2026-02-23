#!/usr/bin/env node

/**
 * Script to clean up rooms with invalid structure
 *
 * Rooms in HangVidU should have a consistent structure based on src/room.js:
 * - createdAt: number (timestamp)
 * - createdBy: string (user ID)
 * - offer: object { type, sdp }
 *
 * This script identifies and removes rooms missing these required fields.
 *
 * Usage: node scripts/cleanup-invalid-rooms.js [--delete]
 *
 * Without --delete: Shows analysis only (no changes)
 * With --delete: Deletes invalid rooms after confirmation
 */

import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Parse command line arguments
const shouldDelete = process.argv.includes('--delete');

// Initialize Firebase Admin
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

console.log('=== Invalid Room Structure Analysis ===\n');
console.log('Expected room structure:');
console.log('  ✓ createdAt: number (timestamp)');
console.log('  ✓ createdBy: string (user ID)');
console.log('  ✓ offer: { type: string, sdp: string }\n');
console.log('Analyzing rooms/...\n');

function isValidRoomStructure(room) {
  // Required fields for a valid active room based on src/room.js
  const hasCreatedAt = typeof room.createdAt === 'number';
  const hasCreatedBy = typeof room.createdBy === 'string' && room.createdBy.length > 0;
  const hasOffer = room.offer && typeof room.offer === 'object' &&
                   room.offer.type && room.offer.sdp;

  return hasCreatedAt && hasCreatedBy && hasOffer;
}

function getMissingFields(room) {
  const missing = [];
  if (typeof room.createdAt !== 'number') missing.push('createdAt');
  if (typeof room.createdBy !== 'string' || room.createdBy.length === 0) missing.push('createdBy');
  if (!room.offer || typeof room.offer !== 'object') missing.push('offer');
  else if (!room.offer.type || !room.offer.sdp) missing.push('offer.type/sdp');

  return missing;
}

function promptConfirmation(message) {
  return new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(message, answer => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

async function deleteInvalidRooms(roomIds) {
  const batchSize = 10; // Delete in smaller batches to stay under write_too_big limit
  let deleted = 0;

  for (let i = 0; i < roomIds.length; i += batchSize) {
    const batch = roomIds.slice(i, i + batchSize);

    // Delete each room individually to avoid cumulative size issues
    for (const id of batch) {
      try {
        await db.ref(`rooms/${id}`).remove();
        deleted++;
      } catch (err) {
        console.warn(`  ⚠️  Failed to delete ${id}: ${err.message}`);
      }
    }

    const batchNum = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(roomIds.length / batchSize);
    console.log(`  Batch ${batchNum}/${totalBatches}: Deleted ${Math.min(batchSize, batch.length)} rooms (${deleted}/${roomIds.length} total)`);
  }

  return deleted;
}

async function analyzeRooms() {
  try {
    const snapshot = await db.ref('rooms').once('value');

    if (!snapshot.exists()) {
      console.log('No rooms found in database.');
      process.exit(0);
    }

    const rooms = snapshot.val();
    const roomIds = Object.keys(rooms);
    const totalCount = roomIds.length;

    let invalidCount = 0;
    const invalidRooms = [];

    roomIds.forEach(roomId => {
      const room = rooms[roomId];

      if (!isValidRoomStructure(room)) {
        invalidCount++;
        const missing = getMissingFields(room);
        const createdAt = room.createdAt ? new Date(room.createdAt) : null;

        invalidRooms.push({
          id: roomId,
          createdAt: createdAt ? createdAt.toISOString() : 'MISSING',
          missingFields: missing,
          hasOffer: !!room.offer,
          hasAnswer: !!room.answer,
          hasMembers: !!room.members,
          membersCount: room.members ? Object.keys(room.members).length : 0,
        });
      }
    });

    console.log('📊 Summary:');
    console.log(`  Total rooms: ${totalCount}`);
    console.log(`  Invalid structure: ${invalidCount}`);
    console.log(`  Percentage: ${((invalidCount / totalCount) * 100).toFixed(1)}%\n`);

    if (invalidCount > 0) {
      console.log('📋 Invalid rooms (first 15):');
      invalidRooms.slice(0, 15).forEach((room, idx) => {
        console.log(`  ${idx + 1}. ${room.id}`);
        console.log(`     Created: ${room.createdAt}`);
        console.log(`     Missing: ${room.missingFields.join(', ')}`);
        console.log(`     Other: offer=${room.hasOffer}, answer=${room.hasAnswer}, members=${room.membersCount}`);
      });

      if (invalidCount > 15) {
        console.log(`  ... and ${invalidCount - 15} more invalid rooms`);
      }

      if (shouldDelete) {
        console.log('\n⚠️  About to delete ' + invalidCount + ' rooms with invalid structure!');
        const confirmed = await promptConfirmation('\nAre you sure? Type "yes" to confirm: ');

        if (!confirmed) {
          console.log('\n❌ Deletion cancelled.');
          process.exit(0);
        }

        console.log('\n🗑️  Deleting invalid rooms...');
        const invalidRoomIds = invalidRooms.map(r => r.id);
        const deletedCount = await deleteInvalidRooms(invalidRoomIds);

        console.log(`\n✅ Successfully deleted ${deletedCount} invalid rooms`);
        console.log(`\n📊 Final Summary:`);
        console.log(`  Remaining rooms: ${totalCount - invalidCount}`);
      } else {
        console.log('\n✅ Analysis complete. No data was deleted.');
        console.log('   Run with --delete flag to delete invalid rooms.');
      }
    } else {
      console.log('\n✅ All rooms have valid structure!');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

analyzeRooms();
