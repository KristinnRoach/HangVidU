import { z } from 'zod';

export const UserIdSchema = z.string().trim().min(1);

export const DirectConversationIdSchema = z.string().trim().min(1);

export const GroupConversationIdSchema = z
  .string()
  .regex(/^grp:[A-Za-z0-9_-]+$/);

export const ConversationIdSchema = z.union([
  DirectConversationIdSchema,
  GroupConversationIdSchema,
]);

export const DeliveryPolicySchema = z.enum(['persistent', 'private']);

export const ConversationKindSchema = z.enum(['direct', 'group']);

export const ConversationParticipantSchema = z.object({
  userId: UserIdSchema,
  role: z.enum(['owner', 'admin', 'member']).default('member'),
  status: z.enum(['active', 'left', 'removed']).default('active'),
  joinedAt: z.number().int().nonnegative(),
});

export const ConversationDraftSchema = z.object({
  text: z.string(),
  updatedAt: z.number().int().nonnegative(),
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

export const ConversationNodeSchema = ConversationRecordSchema.extend({
  draft: ConversationDraftSchema.nullable().default(null),
});

const MessageBaseSchema = z.object({
  messageId: z.string().trim().min(1),
  conversationId: ConversationIdSchema,
  senderId: UserIdSchema,
  senderName: z.string().trim().min(1).optional(),
  createdAt: z.number().int().nonnegative(),
  delivery: DeliveryPolicySchema,
});

export const TextMessagePayloadSchema = z.object({
  type: z.literal('text'),
  text: z.string().min(1),
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
  EventMessagePayloadSchema,
  SystemMessagePayloadSchema,
]);

export const MessageEnvelopeSchema = MessageBaseSchema.extend({
  payload: MessagePayloadSchema,
});

export function resolveDirectConversationId(
  userA: string,
  userB: string,
): z.infer<typeof DirectConversationIdSchema> {
  const p1 = String(userA || '').trim();
  const p2 = String(userB || '').trim();

  if (!p1 || !p2) {
    throw new Error('resolveDirectConversationId requires exactly 2 user ids');
  }

  return DirectConversationIdSchema.parse([p1, p2].sort().join('_'));
}

export function createGroupConversationId(
  id: string,
): z.infer<typeof GroupConversationIdSchema> {
  return GroupConversationIdSchema.parse(`grp:${id}`);
}
