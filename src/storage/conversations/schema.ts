import { z } from 'zod';
import { SYSTEM_MESSAGE_TYPES } from '../../../shared/conversation-channel/protocol';

export const UserIdSchema = z.string().trim().min(1);

export const ConversationIdSchema = z.string().trim().min(1);

export const DeliveryPolicySchema = z.enum(['persistent', 'private']);

const MessageBaseSchema = z.object({
  messageId: z.string().trim().min(1),
  conversationId: ConversationIdSchema,
  senderId: UserIdSchema,
  senderName: z.string().trim().min(1).optional(),
  sentAt: z.number().int().nonnegative(),
  delivery: DeliveryPolicySchema,
});

export const TextMessagePayloadSchema = z.object({
  type: z.literal('text'),
  text: z.string().min(1),
});

export const FileMessagePayloadSchema = z.object({
  type: z.literal('file'),
  fileName: z.string().trim().min(1),
  mimeType: z.string().trim().min(1),
  fileSize: z.number().int().nonnegative(),
  // Natural image dimensions (px). Optional; when present the renderer reserves
  // layout space before the image loads, avoiding scroll shift.
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  storage: z
    .object({
      provider: z.literal('r2'),
      bucket: z.string().trim().min(1),
      key: z.string().trim().min(1),
    })
    .passthrough(),
  text: z.string().optional(),
});

export const SystemMessagePayloadSchema = z.object({
  type: z.literal('system'),
  systemType: z.enum(SYSTEM_MESSAGE_TYPES),
  callerUId: UserIdSchema,
});

export const MessagePayloadSchema = z.discriminatedUnion('type', [
  TextMessagePayloadSchema,
  FileMessagePayloadSchema,
  SystemMessagePayloadSchema,
]);

export const MessageEnvelopeSchema = MessageBaseSchema.extend({
  payload: MessagePayloadSchema,
});
