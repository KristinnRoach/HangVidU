#!/usr/bin/env node

/**
 * Read-only size report for conversations/ — surfaces which conversations
 * and which individual messages are responsible for the bulk of RTDB
 * storage. Inline base64 attachments are the usual suspects.
 *
 * Usage:
 *   node scripts/scan-conversation-sizes.js [--top=N] [--per-conv-top=M]
 *
 *   --top=N           top N conversations by total size (default 15)
 *   --per-conv-top=M  also show top M messages within each listed
 *                     conversation (default 0 = skip)
 *
 * Safe to run against PROD. Never writes.
 */

import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DATABASE_URL =
  'https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app';

const topArg = process.argv.find((a) => a.startsWith('--top='));
const perConvArg = process.argv.find((a) => a.startsWith('--per-conv-top='));
const TOP_N = topArg ? Number(topArg.split('=')[1]) || 15 : 15;
const PER_CONV_TOP = perConvArg ? Number(perConvArg.split('=')[1]) || 0 : 0;

const serviceAccountPath = path.join(
  __dirname,
  '../backend/firebase/service-account-key.json',
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
  databaseURL: DATABASE_URL,
});

const db = admin.database();

const NOW = Date.now();
const DAY_MS = 24 * 60 * 60 * 1000;

function fmtBytes(n) {
  if (n < 1024) return `${n}B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)}KB`;
  if (n < 1024 * 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)}MB`;
  return `${(n / 1024 / 1024 / 1024).toFixed(2)}GB`;
}

function ageDays(ts) {
  if (typeof ts !== 'number') return null;
  return Math.floor((NOW - ts) / DAY_MS);
}

function approxBytes(v) {
  try {
    return Buffer.byteLength(JSON.stringify(v), 'utf8');
  } catch {
    return 0;
  }
}

function previewText(msg) {
  if (typeof msg?.text === 'string') {
    return msg.text.slice(0, 60).replace(/\s+/g, ' ');
  }
  if (msg?.type === 'file' && typeof msg?.fileName === 'string') {
    return `[file:${msg.fileName}]`;
  }
  return '';
}

async function main() {
  console.log(`Conversation size report — ${DATABASE_URL}`);
  console.log(`Run at ${new Date().toISOString()}\n`);

  const snap = await db.ref('conversations').once('value');
  if (!snap.exists()) {
    console.log('No conversations.');
    process.exit(0);
  }

  const convos = snap.val();
  const ids = Object.keys(convos);

  const summaries = [];
  let totalBytes = 0;
  let totalMessages = 0;

  for (const convId of ids) {
    const convo = convos[convId] || {};
    const messages = convo.messages || {};
    const msgIds = Object.keys(messages);

    let convBytes = 0;
    const msgSummaries = [];
    let lastSentAt = 0;
    let fileMsgs = 0;
    let textMsgs = 0;

    for (const msgId of msgIds) {
      const msg = messages[msgId] || {};
      const bytes = approxBytes(msg);
      convBytes += bytes;
      if (msg.type === 'file') fileMsgs += 1;
      else textMsgs += 1;
      if (typeof msg.sentAt === 'number' && msg.sentAt > lastSentAt) {
        lastSentAt = msg.sentAt;
      }
      msgSummaries.push({
        msgId,
        bytes,
        type: msg.type || 'text',
        from: msg.from || '?',
        sentAt: msg.sentAt,
        preview: previewText(msg),
        fileName: msg.fileName,
        fileSize: msg.fileSize,
        mimeType: msg.mimeType,
      });
    }

    const lastAgeDays = lastSentAt ? ageDays(lastSentAt) : null;
    summaries.push({
      convId,
      msgCount: msgIds.length,
      textMsgs,
      fileMsgs,
      bytes: convBytes,
      lastAgeDays,
      messages: msgSummaries,
    });
    totalBytes += convBytes;
    totalMessages += msgIds.length;
  }

  summaries.sort((a, b) => b.bytes - a.bytes);

  console.log(`Total conversations: ${ids.length}`);
  console.log(`Total messages:      ${totalMessages}`);
  console.log(`Total size (approx): ${fmtBytes(totalBytes)}`);
  console.log(
    `Average per convo:   ${fmtBytes(totalBytes / Math.max(1, ids.length))}`,
  );
  console.log(
    `Average per message: ${fmtBytes(totalBytes / Math.max(1, totalMessages))}`,
  );

  console.log(`\n=== Top ${TOP_N} conversations by size ===`);
  console.log(
    [
      'rank'.padEnd(4),
      'size'.padEnd(8),
      'msgs'.padEnd(5),
      'file'.padEnd(5),
      'last'.padEnd(7),
      'conversationId',
    ].join(' '),
  );
  summaries.slice(0, TOP_N).forEach((s, i) => {
    console.log(
      [
        String(i + 1).padEnd(4),
        fmtBytes(s.bytes).padEnd(8),
        String(s.msgCount).padEnd(5),
        String(s.fileMsgs).padEnd(5),
        (s.lastAgeDays != null ? `${s.lastAgeDays}d` : '?').padEnd(7),
        s.convId,
      ].join(' '),
    );
  });

  if (PER_CONV_TOP > 0) {
    console.log(
      `\n=== Top ${PER_CONV_TOP} messages within each of the ${TOP_N} largest conversations ===`,
    );
    for (const s of summaries.slice(0, TOP_N)) {
      console.log(`\n[${s.convId}] ${fmtBytes(s.bytes)} · ${s.msgCount} msgs`);
      const sorted = [...s.messages].sort((a, b) => b.bytes - a.bytes);
      sorted.slice(0, PER_CONV_TOP).forEach((m, i) => {
        const ageDaysVal = m.sentAt ? ageDays(m.sentAt) : null;
        const meta =
          m.type === 'file'
            ? `${m.fileName || '?'} (${m.mimeType || '?'}, ${m.fileSize ?? '?'}B)`
            : m.preview;
        console.log(
          `  ${String(i + 1).padEnd(3)} ${fmtBytes(m.bytes).padEnd(8)} ${m.type.padEnd(5)} ${(ageDaysVal != null ? `${ageDaysVal}d` : '?').padEnd(6)} from=${m.from}  ${meta}`,
        );
      });
    }
  }

  // Cross-cutting: top N messages globally.
  const allMessages = summaries.flatMap((s) =>
    s.messages.map((m) => ({ ...m, convId: s.convId })),
  );
  allMessages.sort((a, b) => b.bytes - a.bytes);

  console.log(`\n=== Top ${TOP_N} largest individual messages (global) ===`);
  console.log(
    [
      'rank'.padEnd(4),
      'size'.padEnd(8),
      'type'.padEnd(5),
      'age'.padEnd(6),
      'conversationId / msgId',
    ].join(' '),
  );
  allMessages.slice(0, TOP_N).forEach((m, i) => {
    const ageDaysVal = m.sentAt ? ageDays(m.sentAt) : null;
    const detail =
      m.type === 'file'
        ? `${m.fileName || '?'} (${m.mimeType || '?'})`
        : m.preview;
    console.log(
      [
        String(i + 1).padEnd(4),
        fmtBytes(m.bytes).padEnd(8),
        m.type.padEnd(5),
        (ageDaysVal != null ? `${ageDaysVal}d` : '?').padEnd(6),
        `${m.convId}/${m.msgId}  ${detail}`,
      ].join(' '),
    );
  });

  // File vs text breakdown
  let fileBytes = 0;
  let textBytes = 0;
  let fileCount = 0;
  let textCount = 0;
  for (const m of allMessages) {
    if (m.type === 'file') {
      fileBytes += m.bytes;
      fileCount += 1;
    } else {
      textBytes += m.bytes;
      textCount += 1;
    }
  }
  console.log('\n=== Bytes by message type ===');
  console.log(`  file: ${fileCount} msgs · ${fmtBytes(fileBytes)}`);
  console.log(`  text/other: ${textCount} msgs · ${fmtBytes(textBytes)}`);

  process.exit(0);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
