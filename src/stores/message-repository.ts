// Wiring layer: builds the data-worker client (storage) with the auth token
// provider (auth) and hands it to the D1 message adapter (feature). `stores` is
// the only layer permitted to import both storage and auth, so the
// boundary-clean pieces are assembled here.

import { getConversationsClient } from './conversations-client';
import { createD1MessageRepository } from '../features/messaging-next/adapters/d1';
import type { MessageRepository } from '../features/messaging-next/interfaces.js';

export function createD1MessageRepositoryFromEnv(): MessageRepository {
  return createD1MessageRepository(getConversationsClient());
}
