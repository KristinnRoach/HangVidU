import { authenticate, type Identity } from '../auth';
import { allowedOrigin, corsHeaders } from '../cors';
import { isMember } from '../data/repo';
import type { WorkerEnv } from '../types';
import type { FileObjectStore } from './file-object-store';
import { R2FileObjectStore } from './r2-file-object-store';

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const AUTHORIZATION_CACHE_TTL_MS = 30 * 1000;
const AUTHORIZATION_CACHE_MAX_ENTRIES = 500;
const CONVERSATION_FILE_PREFIX = 'conversation-files';
const FILE_OBJECT_PATH = /^\/conversations\/([^/]+)\/files\/object$/;
const IMAGE_UPLOAD_PATH = /^\/conversations\/([^/]+)\/files\/images$/;
// TODO: Wire client uploads to this path, then remove IMAGE_UPLOAD_PATH.
const FILE_UPLOAD_PATH = /^\/conversations\/([^/]+)\/files$/;

const authorizationCache = new Map<string, number>();

function appendVaryOrigin(headers: Headers) {
  const vary = headers.get('Vary');
  if (!vary) {
    headers.set('Vary', 'Origin');
    return;
  }

  const values = vary.split(',').map((value) => value.trim().toLowerCase());
  if (!values.includes('origin')) {
    headers.set('Vary', `${vary}, Origin`);
  }
}

function response(
  request: Request,
  env: WorkerEnv,
  body: BodyInit | null,
  init: ResponseInit = {},
) {
  const headers = new Headers(init.headers);
  const origin = allowedOrigin(request, env);
  if (origin) {
    for (const [key, value] of Object.entries(corsHeaders(origin, env))) {
      if (key.toLowerCase() === 'vary') continue;
      headers.set(key, value);
    }
    appendVaryOrigin(headers);
  }
  return new Response(body, { ...init, headers });
}

function json(
  request: Request,
  env: WorkerEnv,
  body: unknown,
  init: ResponseInit = {},
) {
  return response(request, env, JSON.stringify(body), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init.headers,
    },
  });
}

function isSupportedFileMimeType(value: string | null): value is string {
  if (!value) return false;
  const baseType = value.split(';')[0].trim().toLowerCase();
  return /^[a-z0-9!#$&^_.+-]+\/[a-z0-9!#$&^_.+-]+$/.test(baseType);
}

function objectKey(conversationId: string, objectId: string) {
  return `${CONVERSATION_FILE_PREFIX}/${conversationId}/${objectId}`;
}

function keyHasPrefixObject(key: string, prefix: string) {
  return key.startsWith(prefix) && key.length > prefix.length;
}

function keyBelongsToConversation(key: string, conversationId: string) {
  return keyHasPrefixObject(
    key,
    `${CONVERSATION_FILE_PREFIX}/${conversationId}/`,
  );
}

function storageKeyFromUrl(url: URL, conversationId: string) {
  const key = url.searchParams.get('key')?.trim();
  if (!key || !keyBelongsToConversation(key, conversationId)) return null;
  return key;
}

function bytesToHex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

async function authorizationCacheKey(
  conversationId: string,
  identity: Identity,
  appCheckToken: string | undefined,
) {
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(
      `${conversationId}\0${identity.userId}\0${identity.token}\0${
        appCheckToken ?? ''
      }`,
    ),
  );
  return bytesToHex(digest);
}

function getCachedAuthorization(cacheKey: string, now: number) {
  const expiresAt = authorizationCache.get(cacheKey);
  if (!expiresAt) return false;
  if (expiresAt > now) return true;
  authorizationCache.delete(cacheKey);
  return false;
}

function setCachedAuthorization(cacheKey: string, now: number) {
  if (authorizationCache.size >= AUTHORIZATION_CACHE_MAX_ENTRIES) {
    for (const [key, expiresAt] of authorizationCache) {
      if (
        expiresAt <= now ||
        authorizationCache.size >= AUTHORIZATION_CACHE_MAX_ENTRIES
      ) {
        authorizationCache.delete(key);
      }
      if (authorizationCache.size < AUTHORIZATION_CACHE_MAX_ENTRIES) break;
    }
  }
  authorizationCache.set(cacheKey, now + AUTHORIZATION_CACHE_TTL_MS);
}

async function authorizeConversation(
  request: Request,
  conversationId: string,
  identity: Identity,
  env: WorkerEnv,
): Promise<Response | boolean> {
  // Membership lives in the D1 conversation registry (keyed by the opaque
  // conversationId), the same store the data handlers write.
  const appCheckToken =
    request.headers.get('X-Firebase-AppCheck')?.trim() || undefined;
  const canUseCache = request.method === 'GET';
  const now = Date.now();
  const cacheKey = canUseCache
    ? await authorizationCacheKey(conversationId, identity, appCheckToken)
    : null;
  if (cacheKey && getCachedAuthorization(cacheKey, now)) return true;

  // Membership is delete-based: a row exists iff the user is a member (no
  // leave/remove flow yet). Matches the data worker's existence-only guard.
  let member: boolean;
  try {
    member = await isMember(env.DB, conversationId, identity.userId);
  } catch (error) {
    console.error('[auth] membership query failed', error);
    return response(request, env, 'Upstream service unavailable', {
      status: 502,
    });
  }

  const authorized = member;
  if (authorized && cacheKey) setCachedAuthorization(cacheKey, now);
  return authorized;
}

async function readCappedBody(request: Request): Promise<ArrayBuffer | null> {
  const contentLength = Number(request.headers.get('Content-Length') ?? '0');
  if (Number.isFinite(contentLength) && contentLength > MAX_FILE_BYTES) {
    return null;
  }

  if (!request.body) return null;

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    totalBytes += value.byteLength;
    if (totalBytes > MAX_FILE_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return body.buffer;
}

async function handleUpload(
  request: Request,
  env: WorkerEnv,
  store: FileObjectStore,
  conversationId: string,
  identity: Identity,
) {
  const mimeType = request.headers.get('Content-Type');
  if (!isSupportedFileMimeType(mimeType)) {
    return json(
      request,
      env,
      { error: 'unsupported file type' },
      { status: 415 },
    );
  }

  const body = await readCappedBody(request);
  if (body === null) {
    return json(
      request,
      env,
      { error: 'file too large or empty' },
      { status: 413 },
    );
  }
  if (body.byteLength === 0) {
    return json(request, env, { error: 'empty file' }, { status: 400 });
  }

  const key = objectKey(conversationId, crypto.randomUUID());
  await store.put(key, {
    body,
    contentType: mimeType,
    conversationId,
    uploadedBy: identity.userId,
  });

  return json(
    request,
    env,
    {
      provider: 'r2',
      bucket: env.R2_BUCKET_NAME,
      key,
    },
    { status: 201 },
  );
}

async function handleDownload(
  request: Request,
  env: WorkerEnv,
  store: FileObjectStore,
  key: string,
) {
  const object = await store.get(key);
  if (!object) return response(request, env, 'Not found', { status: 404 });

  const headers = new Headers();
  headers.set('Content-Type', object.contentType ?? 'application/octet-stream');
  headers.set('Content-Length', String(object.size));
  headers.set('ETag', object.etag);
  // Defense-in-depth for user-supplied files (e.g. SVG): neutralize any
  // embedded scripts and prevent inline rendering if the URL is ever opened
  // top-level. Clients fetch this as a blob, so these never hinder normal use.
  headers.set('Content-Security-Policy', "default-src 'none'; sandbox");
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Content-Disposition', 'attachment');
  return response(request, env, object.body, { headers });
}

async function handleDelete(
  request: Request,
  env: WorkerEnv,
  store: FileObjectStore,
  key: string,
  identity: Identity,
) {
  const object = await store.head(key);
  if (!object) {
    return response(request, env, 'Not found', { status: 404 });
  }

  const uploadedBy = object.uploadedBy;
  if (!uploadedBy) {
    console.warn('[delete] missing uploadedBy metadata', { key });
    return response(request, env, 'Forbidden', { status: 403 });
  }
  if (uploadedBy !== identity.userId) {
    return response(request, env, 'Forbidden', { status: 403 });
  }

  await store.delete(key);
  return response(request, env, null, { status: 204 });
}

export async function handleFilesRequest(
  request: Request,
  env: WorkerEnv,
): Promise<Response> {
  const store = new R2FileObjectStore(env.FILES_BUCKET);
  const origin = allowedOrigin(request, env);
  if (request.method === 'OPTIONS') {
    if (!origin) return new Response('Forbidden origin', { status: 403 });
    const headers = new Headers(corsHeaders(origin, env));
    appendVaryOrigin(headers);
    return new Response(null, { status: 204, headers });
  }
  if (!origin) return new Response('Forbidden origin', { status: 403 });

  const url = new URL(request.url);
  const uploadMatch =
    url.pathname.match(FILE_UPLOAD_PATH) ??
    url.pathname.match(IMAGE_UPLOAD_PATH);
  const objectMatch = url.pathname.match(FILE_OBJECT_PATH);
  if (!uploadMatch && !objectMatch) {
    return response(request, env, 'Not found', { status: 404 });
  }

  const identity = await authenticate(request, env);
  if (!identity) {
    return response(request, env, 'Unauthorized', { status: 401 });
  }

  let conversationId: string;
  try {
    conversationId = decodeURIComponent((uploadMatch ?? objectMatch)![1]);
  } catch {
    return response(request, env, 'Invalid path', { status: 400 });
  }

  const authResult = await authorizeConversation(
    request,
    conversationId,
    identity,
    env,
  );
  if (authResult instanceof Response) {
    return authResult;
  }
  if (!authResult) {
    return response(request, env, 'Forbidden', { status: 403 });
  }

  if (uploadMatch) {
    if (request.method !== 'POST') {
      return response(request, env, 'Method not allowed', { status: 405 });
    }
    return handleUpload(request, env, store, conversationId, identity);
  }

  const key = storageKeyFromUrl(url, conversationId);
  if (!key) {
    return response(request, env, 'Invalid file key', { status: 400 });
  }

  if (request.method === 'GET') {
    return handleDownload(request, env, store, key);
  }
  if (request.method === 'DELETE') {
    return handleDelete(request, env, store, key, identity);
  }
  return response(request, env, 'Method not allowed', { status: 405 });
}
