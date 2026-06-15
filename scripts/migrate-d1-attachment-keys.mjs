#!/usr/bin/env node
// One-off: realign D1 `message_attachments.r2_key` with the opaque
// conversationId.
//
// The RTDB->D1 backfill (workers/data/scripts/backfill-rtdb-messages.mjs)
// copied the legacy `conversation-files/<a_b>/<fileId>` key verbatim while the
// conversation got a fresh opaque id. The files worker requires the key to be
// prefixed with `conversation-files/<conversationId>/` (keyBelongsToConversation
// in workers/files/src/index.ts), so every migrated image 400s.
//
// This script, per attachment whose key does not match its conversation:
//   1. server-side-copies the R2 object  conversation-files/<old>/<fileId>
//      -> conversation-files/<conversationId>/<fileId>  (S3 CopyObject; the
//      default COPY metadata-directive preserves Content-Type and the
//      `uploadedBy` custom metadata the worker's delete path needs), then
//   2. UPDATEs message_attachments.r2_key to the new key.
//
// Dry-run by default; pass --write to mutate. Idempotent: already-aligned rows
// are skipped, and a re-run after a partial failure simply re-copies + updates.
// Old objects are kept (cheap rollback); pass --delete-old to remove them once
// verified.
//
// Env (e.g. in .env.r2.local, same as migrate-rtdb-files-to-r2.js):
//   R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET
//   CLOUDFLARE_API_TOKEN            (D1 edit)
//   D1_DATABASE_ID                  (hangvidu-data)
//   CLOUDFLARE_ACCOUNT_ID           (defaults to R2_ACCOUNT_ID)
//
// Usage:
//   node scripts/migrate-d1-attachment-keys.mjs                  # dry run
//   node scripts/migrate-d1-attachment-keys.mjs --write --limit=1 # test one object end-to-end
//   node scripts/migrate-d1-attachment-keys.mjs --write
//   node scripts/migrate-d1-attachment-keys.mjs --write --delete-old

import { createHash, createHmac } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const DEFAULT_ENV_FILES = ['.env.r2.local', '.env.local', '.env'];
for (const file of DEFAULT_ENV_FILES) loadEnvFile(file);

const argv = process.argv.slice(2);
const args = new Set(argv);
const dryRun = !args.has('--write');
const deleteOld = args.has('--delete-old');
const limitArg = argv.find((a) => a.startsWith('--limit='));
const limit = limitArg ? Number(limitArg.slice('--limit='.length)) : Infinity;
if (limitArg && (!Number.isFinite(limit) || limit <= 0)) {
  throw new Error('--limit must be a positive number');
}

const PREFIX = 'conversation-files';

const config = {
  accountId: requiredEnv('R2_ACCOUNT_ID'),
  accessKeyId: requiredEnv('R2_ACCESS_KEY_ID'),
  secretAccessKey: requiredEnv('R2_SECRET_ACCESS_KEY'),
  bucket: requiredEnv('R2_BUCKET'),
  apiToken: requiredEnv('CLOUDFLARE_API_TOKEN'),
  databaseId: requiredEnv('D1_DATABASE_ID'),
};
const cfAccountId = process.env.CLOUDFLARE_ACCOUNT_ID || config.accountId;

const rows = await d1Query(
  `SELECT a.id AS id, a.r2_key AS r2_key, m.conversation_id AS conversation_id
   FROM message_attachments a
   JOIN messages m ON m.id = a.message_id`,
);

let scanned = 0;
let aligned = 0;
let copied = 0;
let updated = 0;
let deleted = 0;
let skipped = 0;
let failed = 0;

for (const row of rows) {
  scanned += 1;
  const { id, r2_key: oldKey, conversation_id: conversationId } = row;

  const expectedPrefix = `${PREFIX}/${conversationId}/`;
  if (oldKey.startsWith(expectedPrefix)) {
    aligned += 1;
    continue;
  }

  const newKey = rekey(oldKey, conversationId);
  if (!newKey) {
    skipped += 1;
    console.warn(`[skip] unexpected key shape: ${oldKey}`);
    continue;
  }

  console.log(`${dryRun ? '[dry-run]' : '[migrate]'} ${oldKey} -> ${newKey}`);
  if (dryRun) continue;
  if (copied >= limit) {
    skipped += 1;
    continue;
  }

  try {
    await copyR2Object(config, oldKey, newKey);
    copied += 1;

    await d1Query(`UPDATE message_attachments SET r2_key = ? WHERE id = ?`, [
      newKey,
      id,
    ]);
    updated += 1;

    if (deleteOld) {
      await deleteR2Object(config, oldKey);
      deleted += 1;
    }
  } catch (error) {
    failed += 1;
    console.error(`[failed] ${id} ${oldKey}: ${error?.message || error}`);
  }
}

console.log(
  JSON.stringify(
    { dryRun, scanned, alreadyAligned: aligned, copied, updated, deleted, skipped, failed },
    null,
    2,
  ),
);
if (failed > 0) process.exitCode = 1;

// --- key rewrite ---------------------------------------------------------

// `conversation-files/<old>/<...fileId>` -> `conversation-files/<conv>/<...fileId>`.
// Replaces only the conversation segment; keeps everything after it intact.
function rekey(key, conversationId) {
  const parts = key.split('/');
  if (parts.length < 3 || parts[0] !== PREFIX || !parts[1]) return null;
  parts[1] = conversationId;
  return parts.join('/');
}

// --- D1 (HTTP API) -------------------------------------------------------

async function d1Query(sql, params = []) {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/d1/database/${config.databaseId}/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sql, params }),
    },
  );
  const body = await res.json();
  if (!res.ok || !body.success) {
    throw new Error(`D1 query failed: ${res.status} ${JSON.stringify(body.errors ?? body)}`);
  }
  return body.result?.[0]?.results ?? [];
}

// --- R2 (S3 SigV4) -------------------------------------------------------

async function copyR2Object(cfg, oldKey, newKey) {
  // Default metadata-directive is COPY, preserving Content-Type + custom metadata.
  const copySource = `/${cfg.bucket}/${oldKey.split('/').map(encodeRfc3986).join('/')}`;
  const { url, headers } = signedR2Request({
    ...cfg,
    key: newKey,
    method: 'PUT',
    payloadHash: sha256Hex(''),
    extraSignedHeaders: { 'x-amz-copy-source': copySource },
  });
  const res = await fetch(url, { method: 'PUT', headers });
  if (!res.ok) {
    throw new Error(`R2 copy failed: ${res.status} ${await res.text()}`);
  }
}

async function deleteR2Object(cfg, key) {
  const { url, headers } = signedR2Request({
    ...cfg,
    key,
    method: 'DELETE',
    payloadHash: sha256Hex(''),
  });
  const res = await fetch(url, { method: 'DELETE', headers });
  if (!res.ok && res.status !== 404) {
    throw new Error(`R2 delete failed: ${res.status} ${await res.text()}`);
  }
}

function signedR2Request({
  accountId,
  accessKeyId,
  secretAccessKey,
  bucket,
  key,
  method,
  payloadHash,
  extraSignedHeaders = {},
}) {
  const host = `${accountId}.r2.cloudflarestorage.com`;
  const canonicalUri = `/${encodeRfc3986(bucket)}/${key
    .split('/')
    .map(encodeRfc3986)
    .join('/')}`;
  const url = `https://${host}${canonicalUri}`;
  const amzDate = toAmzDate(new Date());
  const dateStamp = amzDate.slice(0, 8);

  const baseHeaders = {
    host,
    'x-amz-content-sha256': payloadHash,
    'x-amz-date': amzDate,
    ...Object.fromEntries(
      Object.entries(extraSignedHeaders).map(([k, v]) => [k.toLowerCase(), v]),
    ),
  };
  const signedHeaderNames = Object.keys(baseHeaders).sort();
  const canonicalHeaders = signedHeaderNames
    .map((name) => `${name}:${baseHeaders[name]}\n`)
    .join('');
  const signedHeaders = signedHeaderNames.join(';');

  const canonicalRequest = [
    method,
    canonicalUri,
    '',
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join('\n');

  const credentialScope = `${dateStamp}/auto/s3/aws4_request`;
  const stringToSign = [
    'AWS4-HMAC-SHA256',
    amzDate,
    credentialScope,
    sha256Hex(canonicalRequest),
  ].join('\n');
  const signingKey = getSignatureKey(secretAccessKey, dateStamp, 'auto', 's3');
  const signature = hmac(signingKey, stringToSign, 'hex');

  const headers = {
    ...Object.fromEntries(
      Object.entries(baseHeaders).map(([k, v]) => [headerCase(k), v]),
    ),
    Authorization:
      `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${credentialScope}, ` +
      `SignedHeaders=${signedHeaders}, Signature=${signature}`,
  };
  return { url, headers };
}

function headerCase(name) {
  return name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('-');
}

function encodeRfc3986(value) {
  return encodeURIComponent(value).replace(
    /[!'()*]/g,
    (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}

function toAmzDate(date) {
  return date.toISOString().replace(/[:-]|\.\d{3}/g, '');
}

function sha256Hex(value) {
  return createHash('sha256').update(value).digest('hex');
}

function hmac(key, value, encoding) {
  return createHmac('sha256', key).update(value).digest(encoding);
}

function getSignatureKey(secretAccessKey, dateStamp, regionName, serviceName) {
  const dateKey = hmac(`AWS4${secretAccessKey}`, dateStamp);
  const dateRegionKey = hmac(dateKey, regionName);
  const dateRegionServiceKey = hmac(dateRegionKey, serviceName);
  return hmac(dateRegionServiceKey, 'aws4_request');
}

// --- env helpers ---------------------------------------------------------

function loadEnvFile(file) {
  const absolute = path.resolve(file);
  if (!existsSync(absolute)) return;
  for (const line of readFileSync(absolute, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const equals = trimmed.indexOf('=');
    if (equals === -1) continue;
    const key = trimmed.slice(0, equals).trim();
    let value = trimmed.slice(equals + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] ??= value;
  }
}

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required`);
  return value;
}
