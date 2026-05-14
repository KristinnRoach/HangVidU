import type { z } from 'zod';
import type {
  ConversationDraftSchema,
  ConversationNodeSchema,
  ConversationParticipantSchema,
  ConversationRecordSchema,
  DeliveryPolicySchema,
  DirectConversationIdSchema,
  EventMessagePayloadSchema,
  GroupConversationIdSchema,
  MessageEnvelopeSchema,
  MessagePayloadSchema,
  SystemMessagePayloadSchema,
  TextMessagePayloadSchema,
  UserIdSchema,
} from './schema.js';

export type UserId = z.infer<typeof UserIdSchema>;
export type DirectConversationId = z.infer<typeof DirectConversationIdSchema>;
export type GroupConversationId = z.infer<typeof GroupConversationIdSchema>;
export type ConversationId = DirectConversationId | GroupConversationId;
export type DeliveryPolicy = z.infer<typeof DeliveryPolicySchema>;

export type ConversationParticipant = z.infer<
  typeof ConversationParticipantSchema
>;
export type ConversationDraft = z.infer<typeof ConversationDraftSchema>;
export type ConversationRecord = z.infer<typeof ConversationRecordSchema>;
export type ConversationNode = z.infer<typeof ConversationNodeSchema>;

export type TextMessagePayload = z.infer<typeof TextMessagePayloadSchema>;
export type EventMessagePayload = z.infer<typeof EventMessagePayloadSchema>;
export type SystemMessagePayload = z.infer<typeof SystemMessagePayloadSchema>;
export type MessagePayload = z.infer<typeof MessagePayloadSchema>;
export type MessageEnvelope = z.infer<typeof MessageEnvelopeSchema>;
