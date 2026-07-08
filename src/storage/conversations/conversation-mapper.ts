import type { Conversation, ConversationMember } from './data-client.js';

export type ConversationListItem = {
  conversationId: string;
  kind: 'direct' | 'group';
  title: string | null;
  members: ConversationMember[];
  latestSentAt: number;
  latestSenderId: string | null;
};

export type ConversationListRow = Conversation & {
  members: ConversationMember[];
};

export function toConversationListItem(
  row: ConversationListRow,
): ConversationListItem {
  return {
    conversationId: row.id,
    kind: row.kind,
    title: row.title ?? null,
    members: row.members,
    latestSentAt: row.latest_sent_at ?? row.updated_at,
    latestSenderId: row.latest_sender_id ?? null,
  };
}

export function conversationLastReadAt(row: ConversationListRow): number {
  return row.last_read_at ?? 0;
}
