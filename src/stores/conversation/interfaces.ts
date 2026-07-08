// Transport and state contracts for the conversations feature.
// No Firebase, no runtime deps — adapters implement these and are swapped freely.

import type { ConversationId, MessageEnvelope, UserId } from './types.js';

// ─── Wire types ───────────────────────────────────────────────────────────────

export type ReactionSummary = {
  key: string;
  count: number;
  reactedByMe: boolean;
};

export type IncomingMessage = MessageEnvelope & {
  reactions: ReactionSummary[];
};
export type OutgoingMessage = MessageEnvelope;

// ─── Persistent backend ───────────────────────────────────────────────────────

export type MessageRepository = {
  /**
   * Reserve the canonical persistent id before optimistic rendering.
   * send() must persist the message under this same messageId so live backend
   * echoes reconcile with the optimistic row instead of creating a second row.
   */
  createMessageId(conversationId: ConversationId): string;

  /** Load recent messages for a conversation, newest last. */
  loadMessages(
    conversationId: ConversationId,
  ): IncomingMessage[] | Promise<IncomingMessage[]>;

  /**
   * Watch the current recent message window for an open conversation.
   * The first callback is the current recent history; later callbacks include
   * subsequent backend changes in the same window.
   */
  watchRecentMessages(
    conversationId: ConversationId,
    onMessages: (messages: IncomingMessage[]) => void,
    onError?: (error: unknown) => void,
  ): (() => void) | Promise<() => void>;

  /**
   * Persist a message envelope using msg.messageId as its canonical identity.
   * Resolves with the same id and the backend-acknowledged timestamp metadata.
   */
  send(
    msg: OutgoingMessage,
  ): { id: string; sentAt: number } | Promise<{ id: string; sentAt: number }>;

  /** Mark a conversation read by userId at the current backend time. */
  markConversationRead(
    conversationId: ConversationId,
    userId: UserId,
  ): void | Promise<void>;

  /** Set or remove the current user's one reaction on a persisted message. */
  setMyReaction(
    conversationId: ConversationId,
    messageId: string,
    userId: UserId,
    reactionKey: string | null,
  ): void | Promise<void>;
};

// ─── State types ──────────────────────────────────────────────────────────────

export type MessageStatus = 'sending' | 'sent' | 'failed';

export type MessageAttachment = {
  type: 'file';
  fileName: string;
  mimeType: string;
  fileSize: number;
  // Natural image dimensions. Optional: populated once upload/schema carry
  // them; when present the renderer reserves layout space before load.
  width?: number;
  height?: number;
  storage: {
    provider: 'r2';
    bucket: string;
    key: string;
    [key: string]: unknown;
  };
};

export type ChatMessage = {
  id: string;
  conversationId: ConversationId;
  text: string;
  attachment?: MessageAttachment;
  senderId: UserId;
  sentAt: number;
  status: MessageStatus;
  reactions: ReactionSummary[];
};
