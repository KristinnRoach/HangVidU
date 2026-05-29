// Dev-only glue: exposes the conversations data-worker client on
// `window.dataClient` for manual browser-console verification of Slice A.
// Not for production use. The app layer is allowed to import both auth and
// storage, so it wires the boundary-clean client to the real token provider.

import { getLoggedInUserToken } from '../auth/index.js';
import { createConversationsClient } from '../storage/conversations/data-client';

export function exposeDevDataClient(): void {
  if (!import.meta.env.DEV) return;

  const baseUrl =
    (import.meta.env.VITE_DATA_URL as string | undefined) ??
    'http://localhost:8788';

  const client = createConversationsClient({
    baseUrl,
    getToken: getLoggedInUserToken,
  });

  (globalThis as unknown as { dataClient: typeof client }).dataClient = client;
  console.info(
    `[dev] window.dataClient ready (${baseUrl}). Try: await dataClient.me(), ` +
      `await dataClient.resolveDirect('<otherUid>'), await dataClient.list(), ` +
      `await dataClient.sendMessage(id,'hi'), await dataClient.loadMessages(id)`,
  );
}
