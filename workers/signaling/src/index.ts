import { authenticate } from './auth';
import { SignalingRoom } from './signaling-room';

export { SignalingRoom };

export interface Env {
  SIGNALING_ROOM: DurableObjectNamespace<SignalingRoom>;
  FIREBASE_PROJECT_ID: string;
  /** Comma-separated WebSocket Origin allowlist. */
  ALLOWED_ORIGINS?: string;
}

// Route: GET /rooms/:roomId/signal  (WebSocket upgrade)
const ROOM_PATH = /^\/rooms\/([^/]+)\/signal$/;

// Browsers always send Origin on a WebSocket handshake; a missing or
// non-allowlisted Origin is rejected. Defense-in-depth on top of token auth —
// stops other web origins from driving the worker with a user's token.
function isAllowedOrigin(request: Request, env: Env): boolean {
  const origin = request.headers.get('Origin');
  if (!origin) return false;
  return (env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean)
    .includes(origin);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const match = url.pathname.match(ROOM_PATH);
    if (!match) return new Response('Not found', { status: 404 });

    if (request.headers.get('Upgrade') !== 'websocket') {
      return new Response('Expected WebSocket upgrade', { status: 426 });
    }

    if (!isAllowedOrigin(request, env)) {
      return new Response('Forbidden origin', { status: 403 });
    }

    const identity = await authenticate(request, env);
    if (!identity) return new Response('Unauthorized', { status: 401 });

    let roomId: string;
    try {
      roomId = decodeURIComponent(match[1]);
    } catch {
      return new Response('Invalid roomId', { status: 400 });
    }
    const stub = env.SIGNALING_ROOM.getByName(roomId);
    return stub.fetch(request);
  },
} satisfies ExportedHandler<Env>;
