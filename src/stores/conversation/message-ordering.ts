import type { ChatMessage, MessageEnvelope } from './types.js';

export const RECENT_MESSAGES_WINDOW = 40;

type OrderedMessage = Pick<ChatMessage | MessageEnvelope, 'sentAt'> & {
  id?: string;
  messageId?: string;
};

function getStableId(message: OrderedMessage) {
  return message.id ?? message.messageId ?? '';
}

function compareMessagesBySentAt(a: OrderedMessage, b: OrderedMessage) {
  const sentAtDiff = a.sentAt - b.sentAt;
  if (sentAtDiff !== 0) return sentAtDiff;

  const aId = getStableId(a);
  const bId = getStableId(b);
  if (aId < bId) return -1;
  if (aId > bId) return 1;
  return 0;
}

export function sortMessagesBySentAt<T extends OrderedMessage>(messages: T[]) {
  return [...messages].sort(compareMessagesBySentAt);
}

// Paged history must not pass through this live-tail eviction policy.
export function recentLiveMessages(messages: ChatMessage[]) {
  // Unacknowledged local sends must survive incoming snapshots and eviction.
  const sent = messages.filter((message) => message.status === 'sent');
  const unsent = messages.filter((message) => message.status !== 'sent');
  return sortMessagesBySentAt([
    ...sortMessagesBySentAt(sent).slice(-RECENT_MESSAGES_WINDOW),
    ...unsent,
  ]);
}
