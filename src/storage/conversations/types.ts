import type { z } from 'zod';
import type {
  ConversationIdSchema,
  DeliveryPolicySchema,
  FileMessagePayloadSchema,
  MessageEnvelopeSchema,
  MessagePayloadSchema,
  SystemMessagePayloadSchema,
  TextMessagePayloadSchema,
  UserIdSchema,
} from './schema.js';

export type UserId = z.infer<typeof UserIdSchema>;
export type ConversationId = z.infer<typeof ConversationIdSchema>;
export type DeliveryPolicy = z.infer<typeof DeliveryPolicySchema>;

export type TextMessagePayload = z.infer<typeof TextMessagePayloadSchema>;
export type FileMessagePayload = z.infer<typeof FileMessagePayloadSchema>;
export type SystemMessagePayload = z.infer<typeof SystemMessagePayloadSchema>;
export type MessagePayload = z.infer<typeof MessagePayloadSchema>;
export type MessageEnvelope = z.infer<typeof MessageEnvelopeSchema>;
