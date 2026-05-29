import { authenticate } from './auth';

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

    // Identity echo — exercises the Bearer auth seam end-to-end.
    if (request.method === 'GET' && url.pathname === '/me') {
      const identity = await authenticate(request, env);
      if (!identity) return json({ error: 'unauthorized' }, 401, cors);
      return json({ userId: identity.userId }, 200, cors);
    }

    // Routes added in later Slice A tasks:
    //   POST /conversations/resolve-direct  -> { conversationId }
    //   GET  /conversations/:id             -> conversation + members
    //   GET  /conversations                 -> caller's conversations

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
