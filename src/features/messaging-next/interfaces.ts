// Transport and state contracts for messaging-next.
// No Firebase, no runtime deps — adapters implement these and are swapped freely.

import type {
  ConversationId,
  ConversationKind,
  ConversationNode,
  ConversationParticipant,
  DeliveryPolicy,
  MessageEnvelope,
  UserId,
} from './types.js';

// ─── Wire types ───────────────────────────────────────────────────────────────

export type IncomingMessage = MessageEnvelope;
export type OutgoingMessage = MessageEnvelope;

/** Wire format for chat messages sent over a datachannel (private mode). */
export type P2PChatEnvelope = {
  protocol: 'hangvidu.messaging.v1';
  type: 'message';
  message: MessageEnvelope;
};

// ─── Persistent backend ───────────────────────────────────────────────────────

/** emoji → userId → true  (RTDB nested-object shape, JSON-safe) */
export type ReactionMap = Record<string, Record<UserId, true>>;

/**
 * Per-conversation activity snapshot. Single source for both list-ordering
 * (latestSentAt) and the unread badge (latestSenderId !== me && latestSentAt > lastReadAt).
 * Zero values mean "no data yet."
 */
export type ConversationActivity = {
  latestSentAt: number;
  latestSenderId: UserId | null;
  lastReadAt: number;
};

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
  ):
    | { id: string; sentAt: number }
    | Promise<{ id: string; sentAt: number }>;

  /** Mark a conversation read by userId at the current backend time. */
  markConversationRead(
    conversationId: ConversationId,
    userId: UserId,
  ): void | Promise<void>;

  /**
   * Watch a conversation's activity signal — the latest message timestamp and
   * sender, plus the user's lastReadAt. Consumers derive sort order and unread
   * state from this single source. Implementations must invoke onChange once
   * with the current ConversationActivity immediately after a successful
   * subscription, then invoke it again whenever any field changes. onError may
   * be called if the initial snapshot cannot be delivered.
   */
  watchConversationActivity(
    conversationId: ConversationId,
    userId: UserId,
    onChange: (activity: ConversationActivity) => void,
    onError?: (error: unknown) => void,
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

// ─── Conversation metadata backend ───────────────────────────────────────────

export type ConversationUpsert = {
  conversationId: ConversationId;
  kind: ConversationKind;
  title?: string;
  participants: Record<UserId, ConversationParticipant>;
  deliveryPolicy?: DeliveryPolicy;
  createdAt?: number;
  updatedAt?: number;
};

export type ConversationRepository = {
  /** Load shared conversation metadata. */
  loadConversation(
    conversationId: ConversationId,
  ): ConversationNode | null | Promise<ConversationNode | null>;

  /** Create or replace a conversation node. Adapter fills missing timestamps. */
  upsertConversation(
    conversation: ConversationUpsert,
  ): ConversationNode | Promise<ConversationNode>;

  /**
   * Subscribe to conversation-node changes. Called with null if deleted or
   * unavailable in a future persistent adapter.
   */
  subscribeConversation(
    conversationId: ConversationId,
    onConversation: (conversation: ConversationNode | null) => void,
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

export type MessageAttachment = {
  type: 'file';
  fileName: string;
  mimeType: string;
  fileSize: number;
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
  contactNickName?: string | null;
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
  reactions: ReactionMap;
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
