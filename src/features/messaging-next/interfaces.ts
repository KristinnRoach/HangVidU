// Transport and state contracts for messaging-next.
// No Firebase, no runtime deps — adapters implement these and are swapped freely.

import type { ConversationId, DeliveryPolicy, UserId } from './types.js';

// ─── Wire types ───────────────────────────────────────────────────────────────

export type IncomingMessage = {
  id: string;
  conversationId: ConversationId;
  senderId: UserId;
  text: string;
  createdAt: number;
  delivery: DeliveryPolicy;
};

export type OutgoingText = {
  conversationId: ConversationId;
  senderId: UserId;
  text: string;
  delivery: DeliveryPolicy;
};

/** Wire format for chat messages sent over a datachannel (private mode). */
export type P2PChatEnvelope = {
  type: 'chat';
  id: string;
  conversationId: ConversationId;
  text: string;
  senderId: UserId;
  createdAt: number;
};

// ─── Persistent backend ───────────────────────────────────────────────────────

/** emoji → userId → true  (RTDB nested-object shape, JSON-safe) */
export type ReactionMap = Record<string, Record<UserId, true>>;

export type MessageRepository = {
  /** Load recent messages for a conversation, newest last. */
  loadMessages(
    conversationId: ConversationId,
  ): IncomingMessage[] | Promise<IncomingMessage[]>;

  /** Persist a text message. Resolves with the canonical id and server timestamp. */
  send(
    msg: OutgoingText,
  ):
    | { id: string; createdAt: number }
    | Promise<{ id: string; createdAt: number }>;

  /**
   * Subscribe to new remote messages.
   * The adapter must skip messages sent by myUserId.
   * Returns unsubscribe.
   */
  subscribe(
    conversationId: ConversationId,
    myUserId: UserId,
    onMessage: (msg: IncomingMessage) => void,
  ): (() => void) | Promise<() => void>;

  /**
   * Write a reaction delta to the persistent store.
   * active=true adds the userId, active=false removes it.
   */
  setReaction(
    conversationId: ConversationId,
    messageId: string,
    emoji: string,
    userId: UserId,
    active: boolean,
  ): void | Promise<void>;

  /**
   * Subscribe to reaction changes for the open conversation.
   * Called whenever any reaction on any message changes.
   * Returns unsubscribe.
   */
  subscribeReactions(
    conversationId: ConversationId,
    onReactions: (messageId: string, reactions: ReactionMap) => void,
  ): (() => void) | Promise<() => void>;
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

export type ChatMessage = {
  id: string;
  conversationId: ConversationId;
  text: string;
  senderId: UserId;
  createdAt: number;
  status: MessageStatus;
  source: MessageSource;
  delivery: DeliveryPolicy;
  reactions: ReactionMap;
  actions?: MessageAction[];
};

export type ConversationChatState = {
  conversationId: ConversationId | null;
  myUserId: UserId | null;
  draft: string;
  messages: ChatMessage[];
  sending: boolean;
  isLoading: boolean;
  transportMode: TransportMode;
  unreadCount: number;
  isPendingPrivateResponse: boolean;
};
