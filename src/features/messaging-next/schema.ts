import { z } from 'zod';
import { resolveDirectConversationId as resolveSharedDirectConversationId } from '../../shared/utils/direct-conversation-id.js';

export const UserIdSchema = z.string().trim().min(1);

// Group ids carry a `group:` prefix; direct ids are the legacy sorted `a_b` form.
// Group is listed first in the union so the prefix wins discrimination — without
// this, Direct's permissive rule would swallow any string including `group:*`.
export const GroupConversationIdSchema = z
  .string()
  .regex(/^group:[A-Za-z0-9_-]+$/);

export const DirectConversationIdSchema = z
  .string()
  .trim()
  .min(1)
  .regex(
    /^(?!group:).+/,
    'direct conversation id must not start with "group:"',
  );

export const ConversationIdSchema = z.union([
  GroupConversationIdSchema,
  DirectConversationIdSchema,
]);

export const DeliveryPolicySchema = z.enum(['persistent', 'private']);

export const ConversationKindSchema = z.enum(['direct', 'group']);

export const ConversationParticipantSchema = z.object({
  userId: UserIdSchema,
  role: z.enum(['owner', 'admin', 'member']).default('member'),
  status: z.enum(['active', 'left', 'removed']).default('active'),
  joinedAt: z.number().int().nonnegative(),
});

export const ConversationRecordSchema = z.object({
  conversationId: ConversationIdSchema,
  kind: ConversationKindSchema,
  title: z.string().trim().min(1).optional(),
  participants: z.record(UserIdSchema, ConversationParticipantSchema),
  deliveryPolicy: DeliveryPolicySchema.default('persistent'),
  createdAt: z.number().int().nonnegative(),
  updatedAt: z.number().int().nonnegative(),
});

export const ConversationNodeSchema = ConversationRecordSchema;

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
  data: z.string().min(1).optional(),
  url: z.string().url().optional(),
  storage: z
    .object({
      provider: z.literal('r2'),
      bucket: z.string().trim().min(1),
      key: z.string().trim().min(1),
    })
    .passthrough()
    .optional(),
  text: z.string().optional(),
}).refine((payload) => payload.data || payload.url || payload.storage, {
  message: 'file payload must include data, url, or storage metadata',
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

// Single canonical pair-id resolver lives in `src/shared/utils/direct-conversation-id.js`.
// Re-exported here so messaging-next callers don't need to know the path.
export const resolveDirectConversationId = resolveSharedDirectConversationId;

export function createGroupConversationId(
  id: string,
): z.infer<typeof GroupConversationIdSchema> {
  return GroupConversationIdSchema.parse(`group:${id}`);
}
