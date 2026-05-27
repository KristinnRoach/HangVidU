import { createHash, createHmac } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import admin from 'firebase-admin';

const DEFAULT_ENV_FILES = ['.env.r2.local', '.env.local', '.env'];

for (const file of DEFAULT_ENV_FILES) {
  loadEnvFile(file);
}

const args = parseArgs(process.argv.slice(2));
const dryRun = !args.write;
const removeData = Boolean(args['remove-data']);
const limit = args.limit ? Number(args.limit) : Infinity;
const onlyConversation = args.conversation ?? null;

const config = {
  accountId: requiredEnv('R2_ACCOUNT_ID', { required: !dryRun }),
  accessKeyId: requiredEnv('R2_ACCESS_KEY_ID', { required: !dryRun }),
  secretAccessKey: requiredEnv('R2_SECRET_ACCESS_KEY', { required: !dryRun }),
  bucket: args.bucket ?? requiredEnv('R2_BUCKET', { required: !dryRun }),
  publicBaseUrl: args['public-base'] ?? process.env.R2_PUBLIC_BASE_URL ?? null,
};

if (!Number.isFinite(limit) || limit <= 0) {
  throw new Error('--limit must be a positive number');
}

const database = initializeFirebaseAdmin();
const snapshot = await database.ref('conversations').get();
const conversations = snapshot.val() ?? {};

let scanned = 0;
let candidates = 0;
let uploaded = 0;
let patched = 0;
let skipped = 0;
let failed = 0;

for (const [conversationId, conversation] of Object.entries(conversations)) {
  if (onlyConversation && conversationId !== onlyConversation) continue;
  const messages = conversation?.messages ?? {};

  for (const [messageId, message] of Object.entries(messages)) {
    scanned += 1;
    if (candidates >= limit) break;
    if (!isMigratableFileMessage(message)) {
      skipped += 1;
      continue;
    }

    candidates += 1;
    const file = parseDataUrl(message.data);
    const fileName = sanitizeFileName(message.fileName || `${messageId}.bin`);
    const key = buildR2Key(conversationId, messageId, fileName);
    const publicUrl = config.publicBaseUrl
      ? joinPublicUrl(config.publicBaseUrl, key)
      : undefined;

    console.log(
      `${dryRun ? '[dry-run]' : '[migrate]'} ${conversationId}/${messageId} -> ${key} (${file.bytes.length} bytes)`,
    );

    if (dryRun) continue;

    try {
      await putR2Object({
        accountId: config.accountId,
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
        bucket: config.bucket,
        key,
        body: file.bytes,
        contentType: message.mimeType || file.mimeType,
      });
      uploaded += 1;

      const patch = {
        storage: {
          provider: 'r2',
          bucket: config.bucket,
          key,
          contentType: message.mimeType || file.mimeType,
          size: file.bytes.length,
          migratedAt: admin.database.ServerValue.TIMESTAMP,
          source: 'rtdb-data-url',
        },
        ...(publicUrl ? { url: publicUrl } : {}),
        ...(removeData ? { data: null } : {}),
      };

      await database
        .ref('conversations')
        .child(conversationId)
        .child('messages')
        .child(messageId)
        .update(patch);
      patched += 1;
    } catch (error) {
      failed += 1;
      console.error(
        `[failed] ${conversationId}/${messageId}: ${error?.message || error}`,
      );
    }
  }
}

console.log(
  JSON.stringify(
    {
      dryRun,
      scanned,
      candidates,
      uploaded,
      patched,
      skipped,
      failed,
      removedData: removeData,
    },
    null,
    2,
  ),
);

if (failed > 0) {
  process.exitCode = 1;
}

function loadEnvFile(file) {
  const absolute = path.resolve(file);
  if (!existsSync(absolute)) return;
  const text = existsSync(absolute) ? readFileSyncText(absolute) : '';

  for (const line of text.split(/\r?\n/)) {
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

function readFileSyncText(file) {
  return readFileSync(file, 'utf8');
}

function parseArgs(argv) {
  const parsed = {};
  for (const arg of argv) {
    if (arg === '--write') {
      parsed.write = true;
      continue;
    }
    if (arg === '--remove-data') {
      parsed['remove-data'] = true;
      continue;
    }
    const match = /^--([^=]+)=(.*)$/.exec(arg);
    if (match) parsed[match[1]] = match[2];
  }
  return parsed;
}

function requiredEnv(name, { required }) {
  const value = process.env[name];
  if (!value && required) {
    throw new Error(`${name} is required`);
  }
  return value;
}

function initializeFirebaseAdmin() {
  if (admin.apps.length) return admin.database();

  const databaseURL =
    process.env.FIREBASE_DATABASE_URL ?? process.env.VITE_FIREBASE_DATABASE_URL;
  if (!databaseURL) {
    throw new Error('FIREBASE_DATABASE_URL or VITE_FIREBASE_DATABASE_URL is required');
  }

  const credentialPath =
    process.env.GOOGLE_APPLICATION_CREDENTIALS ??
    (existsSync('functions/service-account-key.json')
      ? 'functions/service-account-key.json'
      : null);

  const credential = credentialPath
    ? admin.credential.cert(JSON.parse(readFileSyncText(credentialPath)))
    : admin.credential.applicationDefault();

  admin.initializeApp({ credential, databaseURL });
  return admin.database();
}

function isMigratableFileMessage(message) {
  return (
    message &&
    message.type === 'file' &&
    typeof message.data === 'string' &&
    message.data.startsWith('data:') &&
    !(message.storage && message.storage.provider === 'r2')
  );
}

function parseDataUrl(dataUrl) {
  const match = /^data:([^;,]+)?((?:;[^,]+)*),(.*)$/s.exec(dataUrl);
  if (!match) throw new Error('Invalid data URL');

  const mimeType = match[1] || 'application/octet-stream';
  const metadata = match[2] || '';
  const data = match[3] || '';
  const bytes = metadata.includes(';base64')
    ? Buffer.from(data, 'base64')
    : Buffer.from(decodeURIComponent(data), 'utf8');

  return { mimeType, bytes };
}

function sanitizeFileName(fileName) {
  const cleaned = String(fileName)
    .replace(/[/\\?%*:|"<>]/g, '_')
    .replace(/\s+/g, ' ')
    .trim();
  return cleaned.slice(0, 180) || 'file.bin';
}

function buildR2Key(conversationId, messageId, fileName) {
  return ['message-files', conversationId, messageId, fileName].join('/');
}

function joinPublicUrl(baseUrl, key) {
  const base = baseUrl.replace(/\/+$/, '');
  const encodedKey = key.split('/').map(encodeRfc3986).join('/');
  return `${base}/${encodedKey}`;
}

async function putR2Object({
  accountId,
  accessKeyId,
  secretAccessKey,
  bucket,
  key,
  body,
  contentType,
}) {
  const host = `${accountId}.r2.cloudflarestorage.com`;
  const canonicalUri = `/${encodeRfc3986(bucket)}/${key
    .split('/')
    .map(encodeRfc3986)
    .join('/')}`;
  const url = `https://${host}${canonicalUri}`;
  const now = new Date();
  const amzDate = toAmzDate(now);
  const dateStamp = amzDate.slice(0, 8);
  const payloadHash = sha256Hex(body);
  const headers = {
    Authorization: '',
    'Content-Type': contentType,
    Host: host,
    'X-Amz-Content-Sha256': payloadHash,
    'X-Amz-Date': amzDate,
  };

  const canonicalHeaders =
    `content-type:${contentType}\n` +
    `host:${host}\n` +
    `x-amz-content-sha256:${payloadHash}\n` +
    `x-amz-date:${amzDate}\n`;
  const signedHeaders = 'content-type;host;x-amz-content-sha256;x-amz-date';
  const canonicalRequest = [
    'PUT',
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

  headers.Authorization =
    `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${credentialScope}, ` +
    `SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers,
    body,
  });

  if (!response.ok) {
    throw new Error(`R2 upload failed: ${response.status} ${await response.text()}`);
  }
}

function encodeRfc3986(value) {
  return encodeURIComponent(value).replace(/[!'()*]/g, (char) =>
    `%${char.charCodeAt(0).toString(16).toUpperCase()}`,
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
