import type { z } from 'zod';
import type {
  DeliveryPolicySchema,
  DirectConversationIdSchema,
  EventMessagePayloadSchema,
  FileMessagePayloadSchema,
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

export type TextMessagePayload = z.infer<typeof TextMessagePayloadSchema>;
export type FileMessagePayload = z.infer<typeof FileMessagePayloadSchema>;
export type EventMessagePayload = z.infer<typeof EventMessagePayloadSchema>;
export type SystemMessagePayload = z.infer<typeof SystemMessagePayloadSchema>;
export type MessagePayload = z.infer<typeof MessagePayloadSchema>;
export type MessageEnvelope = z.infer<typeof MessageEnvelopeSchema>;
