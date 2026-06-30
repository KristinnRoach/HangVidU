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
  /^\/conversations\/[^/]+\/(?:messages|ws|read)$/,
  /^\/conversations\/[^/]+\/messages\/[^/]+\/reaction$/,
  /^\/conversations\/[^/]+$/,
];

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (FILES_PATH.test(pathname) || FILES_SUBRESOURCE_PATH.test(pathname)) {
      return handleFilesRequest(request, env);
    }
    if (SIGNALING_PATH.test(pathname)) {
      return handleSignalingRequest(request, env);
    }
    if (DATA_PATHS.some((pattern) => pattern.test(pathname))) {
      return handleDataRequest(request, env);
    }
    return new Response('Not found', { status: 404 });
  },
} satisfies ExportedHandler<WorkerEnv>;
