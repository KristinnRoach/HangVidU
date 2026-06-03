import { authenticate, type Identity } from './auth';

export interface Env {
  FILES_BUCKET: R2Bucket;
  R2_BUCKET_NAME: string;
  FIREBASE_PROJECT_ID: string;
  FIREBASE_DATABASE_URL: string;
  ALLOWED_ORIGINS?: string;
}

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const CONVERSATION_FILE_PREFIX = 'conversation-files';
const IMAGE_UPLOAD_PATH = /^\/conversations\/([^/]+)\/files\/images$/;
const FILE_OBJECT_PATH = /^\/conversations\/([^/]+)\/files\/object$/;

function allowedOrigin(request: Request, env: Env): string | null {
  const origin = request.headers.get('Origin');
  if (!origin) return null;
  const allowed = (env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
  return allowed.includes(origin) ? origin : null;
}

function corsHeaders(origin: string): HeadersInit {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers':
      'Authorization,Content-Type,X-Firebase-AppCheck',
    'Access-Control-Expose-Headers': 'Content-Length,Content-Type,ETag',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

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
  env: Env,
  body: BodyInit | null,
  init: ResponseInit = {},
) {
  const headers = new Headers(init.headers);
  const origin = allowedOrigin(request, env);
  if (origin) {
    for (const [key, value] of Object.entries(corsHeaders(origin))) {
      if (key.toLowerCase() === 'vary') continue;
      headers.set(key, value);
    }
    appendVaryOrigin(headers);
  }
  return new Response(body, { ...init, headers });
}

function json(
  request: Request,
  env: Env,
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

function isImageMimeType(value: string | null): value is string {
  const mimeType = value?.trim().toLowerCase() ?? '';
  return mimeType.startsWith('image/') && mimeType !== 'image/svg+xml';
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

async function authorizeConversation(
  request: Request,
  conversationId: string,
  identity: Identity,
  env: Env,
): Promise<boolean> {
  const base = env.FIREBASE_DATABASE_URL.replace(/\/$/, '');
  const url = `${base}/conversations/${encodeURIComponent(
    conversationId,
  )}/members/${encodeURIComponent(
    identity.userId,
  )}.json?auth=${encodeURIComponent(identity.token)}`;
  const appCheckToken = request.headers.get('X-Firebase-AppCheck')?.trim();

  let membership: Response;
  try {
    membership = await fetch(url, {
      headers: appCheckToken
        ? { 'X-Firebase-AppCheck': appCheckToken }
        : undefined,
    });
  } catch {
    return false;
  }
  if (!membership.ok) return false;

  try {
    const member = (await membership.json()) as
      | { status?: unknown }
      | null;
    return (
      member !== null &&
      (member.status === undefined || member.status === 'active')
    );
  } catch {
    return false;
  }
}

async function readCappedBody(request: Request): Promise<ArrayBuffer | null> {
  const contentLength = Number(request.headers.get('Content-Length') ?? '0');
  if (Number.isFinite(contentLength) && contentLength > MAX_IMAGE_BYTES) {
    return null;
  }

  if (!request.body) return new ArrayBuffer(0);

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    totalBytes += value.byteLength;
    if (totalBytes > MAX_IMAGE_BYTES) {
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
  env: Env,
  conversationId: string,
  identity: Identity,
) {
  const mimeType = request.headers.get('Content-Type');
  if (!isImageMimeType(mimeType)) {
    return json(request, env, { error: 'unsupported image type' }, { status: 415 });
  }

  const body = await readCappedBody(request);
  if (!body) {
    return json(request, env, { error: 'image too large' }, { status: 413 });
  }

  const key = objectKey(conversationId, crypto.randomUUID());
  await env.FILES_BUCKET.put(key, body, {
    httpMetadata: { contentType: mimeType },
    customMetadata: {
      conversationId,
      uploadedBy: identity.userId,
    },
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
  env: Env,
  key: string,
) {
  const object = await env.FILES_BUCKET.get(key);
  if (!object) return response(request, env, 'Not found', { status: 404 });

  const headers = new Headers();
  headers.set(
    'Content-Type',
    object.httpMetadata?.contentType ?? 'application/octet-stream',
  );
  headers.set('Content-Length', String(object.size));
  headers.set('ETag', object.etag);
  return response(request, env, object.body, { headers });
}

async function handleDelete(
  request: Request,
  env: Env,
  key: string,
) {
  await env.FILES_BUCKET.delete(key);
  return response(request, env, null, { status: 204 });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = allowedOrigin(request, env);
    if (request.method === 'OPTIONS') {
      if (!origin) return new Response('Forbidden origin', { status: 403 });
      const headers = new Headers(corsHeaders(origin));
      appendVaryOrigin(headers);
      return new Response(null, { status: 204, headers });
    }
    if (!origin) return new Response('Forbidden origin', { status: 403 });

    const url = new URL(request.url);
    const uploadMatch = url.pathname.match(IMAGE_UPLOAD_PATH);
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

    if (!(await authorizeConversation(request, conversationId, identity, env))) {
      return response(request, env, 'Forbidden', { status: 403 });
    }

    if (uploadMatch) {
      if (request.method !== 'POST') {
        return response(request, env, 'Method not allowed', { status: 405 });
      }
      return handleUpload(request, env, conversationId, identity);
    }

    const key = storageKeyFromUrl(url, conversationId);
    if (!key) {
      return response(request, env, 'Invalid file key', { status: 400 });
    }

    if (request.method === 'GET') {
      return handleDownload(request, env, key);
    }
    if (request.method === 'DELETE') {
      return handleDelete(request, env, key);
    }
    return response(request, env, 'Method not allowed', { status: 405 });
  },
} satisfies ExportedHandler<Env>;
