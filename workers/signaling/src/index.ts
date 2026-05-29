import { authenticate } from './auth';
import { SignalingRoom } from './signaling-room';

export { SignalingRoom };

export interface Env {
  SIGNALING_ROOM: DurableObjectNamespace<SignalingRoom>;
  FIREBASE_PROJECT_ID: string;
}

// Route: GET /rooms/:roomId/signal  (WebSocket upgrade)
const ROOM_PATH = /^\/rooms\/([^/]+)\/signal$/;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const match = url.pathname.match(ROOM_PATH);
    if (!match) return new Response('Not found', { status: 404 });

    if (request.headers.get('Upgrade') !== 'websocket') {
      return new Response('Expected WebSocket upgrade', { status: 426 });
    }

    const identity = await authenticate(request, env);
    if (!identity) return new Response('Unauthorized', { status: 401 });

    const roomId = decodeURIComponent(match[1]);
    const stub = env.SIGNALING_ROOM.getByName(roomId);
    return stub.fetch(request);
  },
} satisfies ExportedHandler<Env>;
