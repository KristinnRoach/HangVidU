import { authenticateWebSocket } from '../auth';
import { isAllowedOrigin } from '../cors';
import type { WorkerEnv } from '../types';

// Route: GET /rooms/:roomId/signal  (WebSocket upgrade)
const ROOM_PATH = /^\/rooms\/([^/]+)\/signal$/;

// Browsers always send Origin on a WebSocket handshake; a missing or
// non-allowlisted Origin is rejected. Defense-in-depth on top of token auth —
// stops other web origins from driving the worker with a user's token.
export async function handleSignalingRequest(
  request: Request,
  env: WorkerEnv,
): Promise<Response> {
    const url = new URL(request.url);
    const match = url.pathname.match(ROOM_PATH);
    if (!match) return new Response('Not found', { status: 404 });

    if (request.headers.get('Upgrade') !== 'websocket') {
      return new Response('Expected WebSocket upgrade', { status: 426 });
    }

    if (!isAllowedOrigin(request.headers.get('Origin'), env)) {
      return new Response('Forbidden origin', { status: 403 });
    }

    const identity = await authenticateWebSocket(request, env);
    if (!identity) return new Response('Unauthorized', { status: 401 });

    let roomId: string;
    try {
      roomId = decodeURIComponent(match[1]);
    } catch {
      return new Response('Invalid roomId', { status: 400 });
    }
    const stub = env.SIGNALING_ROOM.getByName(roomId);
    return stub.fetch(request);
}
