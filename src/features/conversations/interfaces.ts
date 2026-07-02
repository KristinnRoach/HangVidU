// Transport and state contracts for the conversations feature.
// No Firebase, no runtime deps — adapters implement these and are swapped freely.

import type {
  ConversationId,
  DeliveryPolicy,
  MessageEnvelope,
  UserId,
} from './types.js';

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

/** Wire format for chat messages sent over a datachannel (private mode). */
export type P2PChatEnvelope = {
  protocol: 'hangvidu.messaging.v1';
  type: 'message';
  message: MessageEnvelope;
};

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

// ─── Private (datachannel) transport ──────────────────────────────────────────

/**
 * Raw datachannel bridge — no envelope format enforced here.
 * The caller serialises/deserialises. Kept separate from MessageRepository so
 * private mode works with zero backend involvement.
 */
export type PrivateMessageTransport = {
  send(data: string): void;
  onMessage(callback: (data: string) => void): () => void;
};

// ─── Private session signaling ────────────────────────────────────────────────

export type PrivateSessionCallbacks = {
  onRequest(fromUserId: UserId, sessionId: string): void;
  onResponse(accepted: boolean): void;
  onCancel?(): void;
};

/**
 * Invite/accept/decline/cancel handshake for switching to private (datachannel)
 * mode within an existing conversation.
 *
 * Same contract shape as ChatExample's InvitationSignaling — interchangeable.
 */
export type PrivateSessionSignaling = {
  send(
    conversationId: ConversationId,
    fromUserId: UserId,
    sessionId: string,
  ): void | Promise<void>;
  respond(
    conversationId: ConversationId,
    accepted: boolean,
  ): void | Promise<void>;
  cancel(conversationId: ConversationId): void | Promise<void>;
  subscribe(
    conversationId: ConversationId,
    myUserId: UserId,
    callbacks: PrivateSessionCallbacks,
  ): (() => void) | Promise<() => void>;
};

// ─── Call channel bridge ──────────────────────────────────────────────────────

/**
 * Thin adapter from the active P2P call's datachannel to the chat module.
 * Implemented by wrapping SolidP2PRoom. Same shape as ChatExample's
 * CallChannelAdapter — a createCallChannelBridge(p2p) factory will produce this.
 */
export type CallChannelBridge = {
  getPeerCount(): number;
  broadcast(data: string): void;
  onMessage(callback: (data: string) => void): () => void;
  onMemberJoined?(callback: (detail: { memberId: UserId }) => void): () => void;
  onMemberLeft?(callback: (detail: { memberId: UserId }) => void): () => void;
};

// ─── State types ──────────────────────────────────────────────────────────────

export type MessageSource = 'persisted' | 'private' | 'system';
export type MessageStatus = 'sending' | 'sent' | 'failed';
export type TransportMode = 'persisted' | 'private';

export type MessageAction = { label: string; onClick: () => void };

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

export type ConversationSelection = {
  conversationId: ConversationId;
  remoteParticipantIds?: UserId[];
  nickname?: string | null;
  displayUI?: boolean;
};

export type ChatMessage = {
  id: string;
  conversationId: ConversationId;
  text: string;
  attachment?: MessageAttachment;
  senderId: UserId;
  sentAt: number;
  status: MessageStatus;
  source: MessageSource;
  delivery: DeliveryPolicy;
  reactions: ReactionSummary[];
  actions?: MessageAction[];
};

export type ConversationChatState = {
  conversationId: ConversationId | null;
  myUserId: UserId | null;
  draft: string;
  messages: ChatMessage[];
  sending: boolean;
  transportMode: TransportMode;
  unreadCount: number;
  isPendingPrivateResponse: boolean;
};
