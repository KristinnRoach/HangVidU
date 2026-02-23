#!/usr/bin/env node

/**
 * Script to analyze and clean up old room entries from Firebase RTDB
 * Usage: node scripts/cleanup-old-rooms.js [--delete]
 *
 * Without --delete: Shows analysis only (no changes)
 * With --delete: Deletes old rooms after confirmation
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

// Cutoff: 2 months ago (Dec 23, 2025)
const CUTOFF_TIMESTAMP = 1766504280012;
const cutoffDate = new Date(CUTOFF_TIMESTAMP);

console.log('=== Room Cleanup Analysis ===\n');
console.log(`Cutoff date: ${cutoffDate.toISOString()}`);
console.log(`(Entries with createdAt < ${CUTOFF_TIMESTAMP})\n`);
console.log('Analyzing rooms/...\n');

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

async function deleteOldRooms(roomIds) {
  const updates = {};
  roomIds.forEach(id => {
    updates[`/rooms/${id}`] = null;
  });

  await db.ref().update(updates);
}

async function analyzeRooms() {
  try {
    const snapshot = await db.ref('rooms').orderByChild('createdAt').once('value');

    if (!snapshot.exists()) {
      console.log('No rooms found in database.');
      process.exit(0);
    }

    const rooms = snapshot.val();
    const roomIds = Object.keys(rooms);
    const totalCount = roomIds.length;

    let oldCount = 0;
    const oldRooms = [];

    roomIds.forEach(roomId => {
      const room = rooms[roomId];
      const createdAt = room.createdAt;

      if (typeof createdAt === 'number' && createdAt < CUTOFF_TIMESTAMP) {
        oldCount++;
        const createdDate = new Date(createdAt);
        const ageInDays = Math.floor((Date.now() - createdAt) / (1000 * 60 * 60 * 24));

        oldRooms.push({
          id: roomId,
          createdAt: createdDate.toISOString(),
          ageInDays,
          hasOffer: !!room.offer,
          hasAnswer: !!room.answer,
          membersCount: room.members ? Object.keys(room.members).length : 0,
        });
      }
    });

    // Sort by age (oldest first)
    oldRooms.sort((a, b) => b.ageInDays - a.ageInDays);

    console.log('📊 Summary:');
    console.log(`  Total rooms: ${totalCount}`);
    console.log(`  Old rooms (>2 months): ${oldCount}`);
    console.log(`  Percentage: ${((oldCount / totalCount) * 100).toFixed(1)}%\n`);

    if (oldCount > 0) {
      console.log('📋 Oldest rooms (first 10):');
      oldRooms.slice(0, 10).forEach((room, idx) => {
        console.log(`  ${idx + 1}. ${room.id}`);
        console.log(`     Created: ${room.createdDate} (${room.ageInDays} days old)`);
        console.log(`     Members: ${room.membersCount}, Has offer: ${room.hasOffer}, Has answer: ${room.hasAnswer}`);
      });

      if (oldCount > 10) {
        console.log(`  ... and ${oldCount - 10} more old rooms`);
      }

      if (shouldDelete) {
        console.log('\n⚠️  About to delete ' + oldCount + ' old rooms!');
        const confirmed = await promptConfirmation('\nAre you sure? Type "yes" to confirm: ');

        if (!confirmed) {
          console.log('\n❌ Deletion cancelled.');
          process.exit(0);
        }

        console.log('\n🗑️  Deleting old rooms...');
        const oldRoomIds = oldRooms.map(r => r.id);
        await deleteOldRooms(oldRoomIds);

        console.log(`\n✅ Successfully deleted ${oldCount} old rooms`);
        console.log(`\n📊 Final Summary:`);
        console.log(`  Remaining rooms: ${totalCount - oldCount}`);
      } else {
        console.log('\n✅ Analysis complete. No data was deleted.');
        console.log('   Run with --delete flag to delete old rooms.');
      }
    } else {
      console.log('\n✅ No old rooms found. Database is clean!');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

analyzeRooms();
