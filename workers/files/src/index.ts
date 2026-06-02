import { authenticate, type Identity } from './auth';

export interface Env {
  FILES_BUCKET: R2Bucket;
  R2_BUCKET_NAME: string;
  FIREBASE_PROJECT_ID: string;
  FIREBASE_DATABASE_URL: string;
  ALLOWED_ORIGINS?: string;
}

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const IMAGE_UPLOAD_PATH = /^\/conversations\/([^/]+)\/files\/images$/;
const FILE_PATH = /^\/conversations\/([^/]+)\/files\/([^/]+)$/;

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
    'Access-Control-Allow-Headers': 'Authorization,Content-Type',
    'Access-Control-Expose-Headers': 'Content-Length,Content-Type,ETag',
  };
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
      headers.set(key, value);
    }
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

function objectKey(conversationId: string, fileId: string) {
  return `${conversationId}/${fileId}`;
}

async function authorizeConversation(
  conversationId: string,
  identity: Identity,
  env: Env,
): Promise<boolean> {
  if (!conversationId.startsWith('group:')) {
    return conversationId.split('_').includes(identity.userId);
  }

  const base = env.FIREBASE_DATABASE_URL.replace(/\/$/, '');
  const url = `${base}/conversations/${encodeURIComponent(
    conversationId,
  )}/members/${encodeURIComponent(identity.userId)}.json?auth=${encodeURIComponent(
    identity.token,
  )}`;

  let membership: Response;
  try {
    membership = await fetch(url);
  } catch {
    return false;
  }
  if (!membership.ok) return false;

  try {
    return (await membership.json()) !== null;
  } catch {
    return false;
  }
}

async function readCappedBody(request: Request): Promise<ArrayBuffer | null> {
  const contentLength = Number(request.headers.get('Content-Length') ?? '0');
  if (Number.isFinite(contentLength) && contentLength > MAX_IMAGE_BYTES) {
    return null;
  }

  const body = await request.arrayBuffer();
  return body.byteLength <= MAX_IMAGE_BYTES ? body : null;
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

  const fileId = crypto.randomUUID();
  const key = objectKey(conversationId, fileId);
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
      fileId,
    },
    { status: 201 },
  );
}

async function handleDownload(
  request: Request,
  env: Env,
  conversationId: string,
  fileId: string,
) {
  const object = await env.FILES_BUCKET.get(objectKey(conversationId, fileId));
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
  conversationId: string,
  fileId: string,
) {
  await env.FILES_BUCKET.delete(objectKey(conversationId, fileId));
  return response(request, env, null, { status: 204 });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = allowedOrigin(request, env);
    if (request.method === 'OPTIONS') {
      if (!origin) return new Response('Forbidden origin', { status: 403 });
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }
    if (!origin) return new Response('Forbidden origin', { status: 403 });

    const url = new URL(request.url);
    const uploadMatch = url.pathname.match(IMAGE_UPLOAD_PATH);
    const fileMatch = url.pathname.match(FILE_PATH);
    if (!uploadMatch && !fileMatch) {
      return response(request, env, 'Not found', { status: 404 });
    }

    const identity = await authenticate(request, env);
    if (!identity) {
      return response(request, env, 'Unauthorized', { status: 401 });
    }

    let conversationId: string;
    let fileId: string | undefined;
    try {
      conversationId = decodeURIComponent((uploadMatch ?? fileMatch)![1]);
      fileId = fileMatch ? decodeURIComponent(fileMatch[2]) : undefined;
    } catch {
      return response(request, env, 'Invalid path', { status: 400 });
    }

    if (!(await authorizeConversation(conversationId, identity, env))) {
      return response(request, env, 'Forbidden', { status: 403 });
    }

    if (uploadMatch) {
      if (request.method !== 'POST') {
        return response(request, env, 'Method not allowed', { status: 405 });
      }
      return handleUpload(request, env, conversationId, identity);
    }

    if (request.method === 'GET' && fileId) {
      return handleDownload(request, env, conversationId, fileId);
    }
    if (request.method === 'DELETE' && fileId) {
      return handleDelete(request, env, conversationId, fileId);
    }
    return response(request, env, 'Method not allowed', { status: 405 });
  },
} satisfies ExportedHandler<Env>;
