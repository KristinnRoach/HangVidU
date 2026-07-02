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
const rewriteLegacyKeys = Boolean(args['rewrite-legacy-keys']);
const cleanupRewriteMetadata = Boolean(args['cleanup-rewrite-metadata']);
const verifyLegacyCopies = Boolean(args['verify-legacy-copies']);
const limit = args.limit ? Number(args.limit) : Infinity;
const onlyConversation = args.conversation ?? null;
const needsR2Credentials = !dryRun || verifyLegacyCopies;

const config = {
  accountId: requiredEnv('R2_ACCOUNT_ID', { required: needsR2Credentials }),
  accessKeyId: requiredEnv('R2_ACCESS_KEY_ID', {
    required: needsR2Credentials,
  }),
  secretAccessKey: requiredEnv('R2_SECRET_ACCESS_KEY', {
    required: needsR2Credentials,
  }),
  bucket:
    args.bucket ?? requiredEnv('R2_BUCKET', { required: needsR2Credentials }),
};

if (limit !== Infinity && (!Number.isFinite(limit) || limit <= 0)) {
  throw new Error('--limit must be a positive number');
}

if (verifyLegacyCopies) {
  await verifyLegacyR2Copies(config, limit);
  process.exit(0);
}

const database = initializeFirebaseAdmin();
const snapshot = await database.ref('conversations').get();
const conversations = snapshot.val() ?? {};

let scanned = 0;
let candidates = 0;
let uploaded = 0;
let patched = 0;
let removed = 0;
let skipped = 0;
let failed = 0;

for (const [conversationId, conversation] of Object.entries(conversations)) {
  if (candidates >= limit) break;
  if (onlyConversation && conversationId !== onlyConversation) continue;
  const messages = conversation?.messages ?? {};

  for (const [messageId, message] of Object.entries(messages)) {
    scanned += 1;
    if (candidates >= limit) break;

    if (cleanupRewriteMetadata && hasRewriteMetadata(message)) {
      candidates += 1;
      console.log(
        `${dryRun ? '[dry-run]' : '[cleanup]'} ${conversationId}/${messageId} remove R2 rewrite metadata`,
      );

      if (dryRun) continue;

      try {
        await database
          .ref('conversations')
          .child(conversationId)
          .child('messages')
          .child(messageId)
          .update({
            'storage/previousKey': null,
            'storage/rewrittenAt': null,
          });
        patched += 1;
      } catch (error) {
        failed += 1;
        console.error(
          `[failed] ${conversationId}/${messageId}: ${error?.message || error}`,
        );
      }
      continue;
    }

    if (
      rewriteLegacyKeys &&
      isMigratedImageMessageWithLegacyR2Key(message, conversationId)
    ) {
      candidates += 1;
      const oldKey = message.storage.key;
      const key = buildR2Key(conversationId, messageId);
      console.log(
        `${dryRun ? '[dry-run]' : '[rewrite]'} ${conversationId}/${messageId} ${oldKey} -> ${key}`,
      );

      if (dryRun) continue;

      try {
        const object = await getR2Object({
          accountId: config.accountId,
          accessKeyId: config.accessKeyId,
          secretAccessKey: config.secretAccessKey,
          bucket: config.bucket,
          key: oldKey,
        });

        await putR2Object({
          accountId: config.accountId,
          accessKeyId: config.accessKeyId,
          secretAccessKey: config.secretAccessKey,
          bucket: config.bucket,
          key,
          body: object.body,
          contentType: message.mimeType || object.contentType,
        });
        uploaded += 1;

        await database
          .ref('conversations')
          .child(conversationId)
          .child('messages')
          .child(messageId)
          .update({
            storage: {
              ...message.storage,
              provider: 'r2',
              bucket: message.storage.bucket || config.bucket,
              key,
              contentType: message.mimeType || object.contentType,
              size: object.body.length,
              rewrittenAt: admin.database.ServerValue.TIMESTAMP,
            },
            data: null,
            url: null,
          });
        patched += 1;
        if (typeof message.data === 'string') removed += 1;
      } catch (error) {
        failed += 1;
        console.error(
          `[failed] ${conversationId}/${messageId}: ${error?.message || error}`,
        );
      }
      continue;
    }

    if (removeData && isMigratedImageMessageWithInlineData(message)) {
      candidates += 1;
      console.log(
        `${dryRun ? '[dry-run]' : '[cleanup]'} ${conversationId}/${messageId} remove RTDB inline data`,
      );

      if (dryRun) continue;

      try {
        await database
          .ref('conversations')
          .child(conversationId)
          .child('messages')
          .child(messageId)
          .update({ data: null });
        patched += 1;
        removed += 1;
      } catch (error) {
        failed += 1;
        console.error(
          `[failed] ${conversationId}/${messageId}: ${error?.message || error}`,
        );
      }
      continue;
    }

    if (!isMigratableImageMessage(message)) {
      skipped += 1;
      continue;
    }

    candidates += 1;
    const file = parseDataUrl(message.data);
    const key = buildR2Key(conversationId, messageId);

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
      removed,
      skipped,
      failed,
      removedData: removeData,
      rewrittenLegacyKeys: rewriteLegacyKeys,
      cleanedRewriteMetadata: cleanupRewriteMetadata,
    },
    null,
    2,
  ),
);

if (failed > 0) {
  process.exitCode = 1;
}

await shutdownFirebaseAdmin();

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
    if (arg === '--rewrite-legacy-keys') {
      parsed['rewrite-legacy-keys'] = true;
      continue;
    }
    if (arg === '--cleanup-rewrite-metadata') {
      parsed['cleanup-rewrite-metadata'] = true;
      continue;
    }
    if (arg === '--verify-legacy-copies') {
      parsed['verify-legacy-copies'] = true;
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
    throw new Error(
      'FIREBASE_DATABASE_URL or VITE_FIREBASE_DATABASE_URL is required',
    );
  }

  const credentialPath =
    process.env.GOOGLE_APPLICATION_CREDENTIALS ??
    (existsSync('backend/firebase/service-account-key.json')
      ? 'backend/firebase/service-account-key.json'
      : null);

  const credential = credentialPath
    ? admin.credential.cert(JSON.parse(readFileSyncText(credentialPath)))
    : admin.credential.applicationDefault();

  admin.initializeApp({ credential, databaseURL });
  return admin.database();
}

async function shutdownFirebaseAdmin() {
  await Promise.all(admin.apps.filter(Boolean).map((app) => app.delete()));
}

function isMigratableImageMessage(message) {
  return (
    message &&
    message.type === 'file' &&
    typeof message.mimeType === 'string' &&
    message.mimeType.toLowerCase().startsWith('image/') &&
    typeof message.data === 'string' &&
    message.data.startsWith('data:') &&
    !(message.storage && message.storage.provider === 'r2')
  );
}

function isMigratedImageMessageWithInlineData(message) {
  return (
    message &&
    message.type === 'file' &&
    typeof message.mimeType === 'string' &&
    message.mimeType.toLowerCase().startsWith('image/') &&
    typeof message.data === 'string' &&
    message.data.startsWith('data:') &&
    message.storage &&
    message.storage.provider === 'r2' &&
    typeof message.storage.key === 'string'
  );
}

function isMigratedImageMessageWithLegacyR2Key(message, conversationId) {
  return (
    message &&
    message.type === 'file' &&
    typeof message.mimeType === 'string' &&
    message.mimeType.toLowerCase().startsWith('image/') &&
    message.storage &&
    message.storage.provider === 'r2' &&
    typeof message.storage.key === 'string' &&
    message.storage.key.startsWith(`conversations/${conversationId}/media/`)
  );
}

function hasRewriteMetadata(message) {
  return (
    message &&
    message.storage &&
    (typeof message.storage.previousKey === 'string' ||
      typeof message.storage.rewrittenAt === 'number')
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

function buildR2Key(conversationId, messageId) {
  return ['conversation-files', conversationId, messageId].join('/');
}

async function verifyLegacyR2Copies(config, limit) {
  const oldKeys = [];
  for await (const key of listR2Keys({
    accountId: config.accountId,
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    bucket: config.bucket,
    prefix: 'conversations/',
  })) {
    if (!key.includes('/media/')) continue;
    oldKeys.push(key);
    if (oldKeys.length >= limit) break;
  }

  let checked = 0;
  let copied = 0;
  let missing = 0;
  let unparsable = 0;
  let failed = 0;

  for (const oldKey of oldKeys) {
    const parsed = parseLegacyR2Key(oldKey);
    if (!parsed) {
      unparsable += 1;
      console.log(`[unparsable] ${oldKey}`);
      continue;
    }

    checked += 1;
    const newKey = buildR2Key(parsed.conversationId, parsed.messageId);
    try {
      const exists = await headR2Object({
        accountId: config.accountId,
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
        bucket: config.bucket,
        key: newKey,
      });
      if (exists) {
        copied += 1;
      } else {
        missing += 1;
        console.log(`[missing] ${oldKey} -> ${newKey}`);
      }
    } catch (error) {
      failed += 1;
      console.error(`[failed] ${oldKey}: ${error?.message || error}`);
    }
  }

  console.log(
    JSON.stringify(
      {
        oldMediaObjects: oldKeys.length,
        checked,
        copied,
        missing,
        unparsable,
        failed,
      },
      null,
      2,
    ),
  );

  if (missing > 0 || failed > 0 || unparsable > 0) {
    process.exitCode = 1;
  }
}

function parseLegacyR2Key(key) {
  const parts = key.split('/');
  if (
    parts.length < 6 ||
    parts[0] !== 'conversations' ||
    parts[2] !== 'media'
  ) {
    return null;
  }
  return {
    conversationId: parts[1],
    messageId: parts[4],
  };
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
    throw new Error(
      `R2 upload failed: ${response.status} ${await response.text()}`,
    );
  }
}

async function getR2Object({
  accountId,
  accessKeyId,
  secretAccessKey,
  bucket,
  key,
}) {
  const { url, headers } = signedR2Request({
    accountId,
    accessKeyId,
    secretAccessKey,
    bucket,
    key,
    method: 'GET',
    payloadHash: sha256Hex(''),
  });

  const response = await fetch(url, { method: 'GET', headers });
  if (!response.ok) {
    throw new Error(
      `R2 download failed: ${response.status} ${await response.text()}`,
    );
  }

  return {
    body: Buffer.from(await response.arrayBuffer()),
    contentType:
      response.headers.get('Content-Type') || 'application/octet-stream',
  };
}

async function* listR2Keys({
  accountId,
  accessKeyId,
  secretAccessKey,
  bucket,
  prefix,
}) {
  let continuationToken;

  while (true) {
    const query = {
      'list-type': '2',
      prefix,
      ...(continuationToken ? { 'continuation-token': continuationToken } : {}),
    };
    const { url, headers } = signedR2Request({
      accountId,
      accessKeyId,
      secretAccessKey,
      bucket,
      key: '',
      method: 'GET',
      payloadHash: sha256Hex(''),
      query,
    });

    const response = await fetch(url, { method: 'GET', headers });
    if (!response.ok) {
      throw new Error(
        `R2 list failed: ${response.status} ${await response.text()}`,
      );
    }

    const xml = await response.text();
    for (const key of parseListObjectKeys(xml)) {
      yield key;
    }

    if (!/<IsTruncated>true<\/IsTruncated>/.test(xml)) break;
    continuationToken = parseSingleXmlValue(xml, 'NextContinuationToken');
    if (!continuationToken) {
      throw new Error(
        'R2 list response was truncated without a continuation token',
      );
    }
  }
}

async function headR2Object({
  accountId,
  accessKeyId,
  secretAccessKey,
  bucket,
  key,
}) {
  const { url, headers } = signedR2Request({
    accountId,
    accessKeyId,
    secretAccessKey,
    bucket,
    key,
    method: 'HEAD',
    payloadHash: sha256Hex(''),
  });

  const response = await fetch(url, { method: 'HEAD', headers });
  if (response.status === 404) return false;
  if (!response.ok) {
    throw new Error(`R2 head failed: ${response.status}`);
  }
  return true;
}

function parseListObjectKeys(xml) {
  return [...xml.matchAll(/<Key>([\s\S]*?)<\/Key>/g)].map((match) =>
    decodeXml(match[1]),
  );
}

function parseSingleXmlValue(xml, tagName) {
  const match = new RegExp(`<${tagName}>([\\s\\S]*?)<\\/${tagName}>`).exec(xml);
  return match ? decodeXml(match[1]) : null;
}

function decodeXml(value) {
  return value
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

function signedR2Request({
  accountId,
  accessKeyId,
  secretAccessKey,
  bucket,
  key,
  method,
  payloadHash,
  contentType,
  query = {},
}) {
  const host = `${accountId}.r2.cloudflarestorage.com`;
  const canonicalUri = `/${encodeRfc3986(bucket)}/${key
    .split('/')
    .map(encodeRfc3986)
    .join('/')}`;
  const canonicalQuery = canonicalQueryString(query);
  const url = `https://${host}${canonicalUri}${
    canonicalQuery ? `?${canonicalQuery}` : ''
  }`;
  const now = new Date();
  const amzDate = toAmzDate(now);
  const dateStamp = amzDate.slice(0, 8);
  const headers = {
    Authorization: '',
    Host: host,
    'X-Amz-Content-Sha256': payloadHash,
    'X-Amz-Date': amzDate,
  };
  if (contentType) headers['Content-Type'] = contentType;

  const signedHeaderNames = contentType
    ? ['content-type', 'host', 'x-amz-content-sha256', 'x-amz-date']
    : ['host', 'x-amz-content-sha256', 'x-amz-date'];
  const canonicalHeaders =
    (contentType ? `content-type:${contentType}\n` : '') +
    `host:${host}\n` +
    `x-amz-content-sha256:${payloadHash}\n` +
    `x-amz-date:${amzDate}\n`;
  const signedHeaders = signedHeaderNames.join(';');
  const canonicalRequest = [
    method,
    canonicalUri,
    canonicalQuery,
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

  return { url, headers };
}

function canonicalQueryString(query) {
  return Object.entries(query)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => [encodeRfc3986(key), encodeRfc3986(String(value))])
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
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
