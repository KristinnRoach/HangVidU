import type { ChatMessage } from './interfaces.js';
import type { MessageEnvelope } from './types.js';

type OrderedMessage = Pick<ChatMessage | MessageEnvelope, 'sentAt'> & {
  id?: string;
  messageId?: string;
};

function getStableId(message: OrderedMessage) {
  return message.id ?? message.messageId ?? '';
}

export function compareMessagesBySentAt(a: OrderedMessage, b: OrderedMessage) {
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
