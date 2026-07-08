import { z } from 'zod';

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

export const EventMessagePayloadSchema = z.object({
  type: z.literal('event'),
  eventType: z.literal('evt:call:session:unanswered'),
  details: z
    .object({
      callId: z.string().nullable().optional(),
    })
    .optional(),
});

export const SystemMessagePayloadSchema = z.object({
  type: z.literal('system'),
  systemType: z.string().trim().min(1),
  details: z.record(z.string(), z.unknown()).optional(),
});

export const MessagePayloadSchema = z.discriminatedUnion('type', [
  TextMessagePayloadSchema,
  FileMessagePayloadSchema,
  EventMessagePayloadSchema,
  SystemMessagePayloadSchema,
]);

export const MessageEnvelopeSchema = MessageBaseSchema.extend({
  payload: MessagePayloadSchema,
});
