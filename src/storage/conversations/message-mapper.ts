import type { Reaction } from '@lib/reactions/solid/solid.js';
import type {
  SystemMessageType,
  WireMessage,
} from '../../../shared/conversation-channel/protocol';
import type { ConversationId, MessageEnvelope, UserId } from './types.js';

export type IncomingMessage = MessageEnvelope & {
  reactions: Reaction[];
};

export type SendMessageInput = {
  messageId: string;
  kind: 'text' | 'file' | 'system';
  body?: string | null;
  systemType?: SystemMessageType;
  attachment?: {
    r2Key: string;
    bucket: string;
    fileName: string;
    mimeType: string;
    fileSize: number;
    width?: number | null;
    height?: number | null;
  };
};

export function toIncomingMessage(m: WireMessage): IncomingMessage | null {
  const base = {
    messageId: m.id,
    conversationId: m.conversationId as ConversationId,
    senderId: m.senderId as UserId,
    senderName: m.senderName ?? undefined,
    sentAt: m.sentAt,
    delivery: 'persistent' as const,
    reactions: m.reactions,
  };

  if (m.kind === 'file') {
    const a = m.attachments[0];
    if (!a) return null;
    return {
      ...base,
      payload: {
        type: 'file',
        fileName: a.fileName,
        mimeType: a.mimeType,
        fileSize: a.fileSize,
        width: a.width ?? undefined,
        height: a.height ?? undefined,
        storage: { provider: 'r2', bucket: a.bucket, key: a.r2Key },
        text: m.body ?? undefined,
      },
    };
  }

  if (m.kind === 'system') {
    if (!m.systemType) return null;
    return {
      ...base,
      payload: {
        type: 'system',
        systemType: m.systemType,
        callerUId: m.senderId as UserId,
      },
    };
  }

  if (typeof m.body !== 'string') return null;
  return { ...base, payload: { type: 'text', text: m.body } };
}

export function toSendMessageInput(message: MessageEnvelope): SendMessageInput {
  const { payload } = message;
  if (payload.type === 'text') {
    return { messageId: message.messageId, kind: 'text', body: payload.text };
  }
  if (payload.type === 'file') {
    return {
      messageId: message.messageId,
      kind: 'file',
      body: payload.text ?? null,
      attachment: {
        r2Key: payload.storage.key,
        bucket: payload.storage.bucket,
        fileName: payload.fileName,
        mimeType: payload.mimeType,
        fileSize: payload.fileSize,
        width: payload.width ?? null,
        height: payload.height ?? null,
      },
    };
  }
  return {
    messageId: message.messageId,
    kind: 'system',
    systemType: payload.systemType,
  };
}
