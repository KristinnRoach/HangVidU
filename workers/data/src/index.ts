import { authenticate } from './auth';
import {
  getConversation,
  getMembers,
  isMember,
  listConversations,
  resolveOrCreateDirect,
  upsertUser,
} from './repo';

export interface Env {
  DB: D1Database;
  FIREBASE_PROJECT_ID: string;
  ALLOWED_ORIGINS: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin');
    const cors = corsHeaders(origin, env);

    // CORS preflight.
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    const url = new URL(request.url);

    // Health check — no auth, for local-dev / uptime verification.
    if (request.method === 'GET' && url.pathname === '/health') {
      return json({ ok: true }, 200, cors);
    }

    // Everything below requires authentication.
    const identity = await authenticate(request, env);
    if (!identity) return json({ error: 'unauthorized' }, 401, cors);
    const callerId = identity.userId;
    const now = Date.now();

    // Record/refresh the caller. `name` query param optionally seeds display_name.
    await upsertUser(env.DB, callerId, url.searchParams.get('name'), now);

    // Identity echo — exercises the Bearer auth seam end-to-end.
    if (request.method === 'GET' && url.pathname === '/me') {
      return json({ userId: callerId }, 200, cors);
    }

    // POST /conversations/resolve-direct  { otherUserId } -> { conversationId }
    if (request.method === 'POST' && url.pathname === '/conversations/resolve-direct') {
      const otherUserId = (await readJson(request))?.otherUserId;
      if (typeof otherUserId !== 'string' || !otherUserId.trim()) {
        return json({ error: 'otherUserId required' }, 400, cors);
      }
      if (otherUserId === callerId) {
        return json({ error: 'cannot open a direct conversation with self' }, 400, cors);
      }
      const conversationId = await resolveOrCreateDirect(
        env.DB,
        callerId,
        otherUserId.trim(),
        now,
      );
      return json({ conversationId }, 200, cors);
    }

    // GET /conversations -> caller's conversations (each with members)
    if (request.method === 'GET' && url.pathname === '/conversations') {
      const conversations = await listConversations(env.DB, callerId);
      return json({ conversations }, 200, cors);
    }

    // GET /conversations/:id -> conversation + members (membership-guarded)
    const convoMatch = url.pathname.match(/^\/conversations\/([^/]+)$/);
    if (request.method === 'GET' && convoMatch) {
      const conversationId = decodeURIComponent(convoMatch[1]);
      if (!(await isMember(env.DB, conversationId, callerId))) {
        // 404 (not 403) so non-members can't probe which ids exist.
        return json({ error: 'not_found' }, 404, cors);
      }
      const conversation = await getConversation(env.DB, conversationId);
      if (!conversation) return json({ error: 'not_found' }, 404, cors);
      const members = await getMembers(env.DB, conversationId);
      return json({ conversation, members }, 200, cors);
    }

    return json({ error: 'not_found' }, 404, cors);
  },
} satisfies ExportedHandler<Env>;

function corsHeaders(origin: string | null, env: Env): Record<string, string> {
  const allowed = env.ALLOWED_ORIGINS.split(',').map((o) => o.trim());
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
  if (origin && allowed.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }
  return headers;
}

async function readJson(
  request: Request,
): Promise<Record<string, unknown> | null> {
  try {
    return (await request.json()) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function json(
  body: unknown,
  status: number,
  cors: Record<string, string>,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors },
  });
}
