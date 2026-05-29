// Wiring layer: one-shot fetch of the caller's conversations (with per-conversation
// activity) from the data worker. `stores` is the only layer allowed to import the
// storage client, so the feature reads the list through this seam, not directly.

import { getConversationsClient } from './conversations-client';
import type { ConversationListEntry } from '../storage/conversations/data-client';

export type { ConversationListEntry } from '../storage/conversations/data-client';

export function loadConversationsList(): Promise<ConversationListEntry[]> {
  return getConversationsClient().list();
}
