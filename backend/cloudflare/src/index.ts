import { corsHeaders } from './cors';
import { handleDataRequest } from './data/handlers';
import { handleFilesRequest } from './files/handlers';
import { handleSignalingRequest } from './realtime/signaling-handler';
import type { WorkerEnv } from './types';

export { ConversationChannel } from './realtime/conversation-channel';
export { SignalingRoom } from './realtime/signaling-room';
export { UserMailbox } from './realtime/user-mailbox';

const FILES_PATH = /^\/conversations\/[^/]+\/files$/;
const FILES_SUBRESOURCE_PATH =
  /^\/conversations\/[^/]+\/files\/(?:images|object)$/;
const SIGNALING_PATH = /^\/rooms\/[^/]+\/signal$/;
const DATA_PATHS = [
  /^\/health$/,
  /^\/me$/,
  /^\/calls\/(?:invite|response(?:\/ack)?|cancel)$/,
  /^\/users\/me\/mailbox\/ws$/,
  /^\/users\/me\/profile$/,
  /^\/users\/[^/]+\/profile$/,
  /^\/users\/me\/discoverable$/,
  /^\/users\/lookup$/,
  /^\/users\/me\/contacts$/,
  /^\/users\/me\/contacts\/[^/]+$/,
  /^\/contact-requests$/,
  /^\/contact-requests\/[^/]+\/(?:accept|decline)$/,
  /^\/referrals\/connect$/,
  /^\/conversations$/,
  /^\/conversations\/resolve-direct$/,
  /^\/conversations\/[^/]+\/(?:messages|call-events|ws|read)$/,
  /^\/conversations\/[^/]+\/messages\/[^/]+\/reaction$/,
  /^\/conversations\/[^/]+$/,
];

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    try {
      const { pathname } = new URL(request.url);
      if (FILES_PATH.test(pathname) || FILES_SUBRESOURCE_PATH.test(pathname)) {
        return await handleFilesRequest(request, env);
      }
      if (SIGNALING_PATH.test(pathname)) {
        return await handleSignalingRequest(request, env);
      }
      if (DATA_PATHS.some((pattern) => pattern.test(pathname))) {
        return await handleDataRequest(request, env);
      }
      return new Response('Not found', { status: 404 });
    } catch (error) {
      // Without this, an uncaught throw (e.g. a D1 outage) becomes a bare 500
      // with no CORS headers, which browsers report as a CORS failure.
      console.error('[worker] unhandled error', {
        path: new URL(request.url).pathname,
        error:
          error instanceof Error
            ? { name: error.name, message: error.message }
            : error,
      });
      return new Response(JSON.stringify({ error: 'service unavailable' }), {
        status: 503,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders(request.headers.get('Origin'), env),
        },
      });
    }
  },
} satisfies ExportedHandler<WorkerEnv>;
