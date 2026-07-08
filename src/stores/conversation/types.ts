import type { Reaction } from '@lib/reactions/solid/solid.js';
import type { IncomingMessage } from '@storage/conversations/message-mapper.js';
import type {
  ConversationId,
  MessageEnvelope,
  UserId,
} from '../../storage/conversations/types.js';

export type {
  ConversationId,
  DeliveryPolicy,
  EventMessagePayload,
  FileMessagePayload,
  MessageEnvelope,
  MessagePayload,
  SystemMessagePayload,
  TextMessagePayload,
  UserId,
} from '../../storage/conversations/types.js';

export type { IncomingMessage } from '@storage/conversations/message-mapper.js';
export type OutgoingMessage = MessageEnvelope;

export type MessageRepository = {
  createMessageId(conversationId: ConversationId): string;

  loadMessages(
    conversationId: ConversationId,
  ): IncomingMessage[] | Promise<IncomingMessage[]>;

  watchRecentMessages(
    conversationId: ConversationId,
    onMessages: (messages: IncomingMessage[]) => void,
    onError?: (error: unknown) => void,
  ): (() => void) | Promise<() => void>;

  send(
    msg: OutgoingMessage,
  ): { id: string; sentAt: number } | Promise<{ id: string; sentAt: number }>;

  markConversationRead(
    conversationId: ConversationId,
    userId: UserId,
  ): void | Promise<void>;

  setMyReaction(
    conversationId: ConversationId,
    messageId: string,
    userId: UserId,
    reactionKey: string | null,
  ): void | Promise<void>;
};

export type MessageStatus = 'sending' | 'sent' | 'failed';

export type MessageAttachment = {
  type: 'file';
  fileName: string;
  mimeType: string;
  fileSize: number;
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
  reactions: Reaction[];
};
