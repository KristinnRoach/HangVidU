// src/notifications/schema.js
// Data shapes for Web Push notification payloads, requests, and storage.

import { z } from 'zod';

const TimestampStringSchema = z.string().regex(/^\d+$/);
const NonEmptyStringSchema = z.string().min(1);

// ============================================================================
// CANONICAL NOTIFICATION TYPES
// ============================================================================

export const NotificationTypeSchema = z.enum([
  'incoming_call',
  'missed_call',
  'message',
]);

// Temporary compatibility for older payloads still using `call`.
export const LegacyNotificationTypeSchema = z.literal('call');

// ============================================================================
// PUSH PAYLOAD DATA SHAPES
// ============================================================================

const NotificationDataBaseSchema = z.object({
  notificationId: NonEmptyStringSchema,
  timestamp: TimestampStringSchema,
});

export const IncomingCallNotificationDataSchema =
  NotificationDataBaseSchema.extend({
    type: z.literal('incoming_call'),
    roomId: NonEmptyStringSchema,
    callerId: NonEmptyStringSchema,
    callerName: NonEmptyStringSchema,
    targetUserId: NonEmptyStringSchema,
  });

export const LegacyCallNotificationDataSchema =
  NotificationDataBaseSchema.extend({
    type: LegacyNotificationTypeSchema,
    roomId: NonEmptyStringSchema,
    callerId: NonEmptyStringSchema,
    callerName: NonEmptyStringSchema,
    targetUserId: NonEmptyStringSchema,
  });

export const MissedCallNotificationDataSchema =
  NotificationDataBaseSchema.extend({
    type: z.literal('missed_call'),
    roomId: z.string(),
    callerId: NonEmptyStringSchema,
    callerName: NonEmptyStringSchema,
    targetUserId: NonEmptyStringSchema,
  });

export const MessageNotificationDataSchema =
  NotificationDataBaseSchema.extend({
    type: z.literal('message'),
    senderId: NonEmptyStringSchema,
    senderName: NonEmptyStringSchema,
    messagePreview: z.string(),
    conversationId: NonEmptyStringSchema,
  });

export const CanonicalPushNotificationDataSchema = z.discriminatedUnion(
  'type',
  [
    IncomingCallNotificationDataSchema,
    MissedCallNotificationDataSchema,
    MessageNotificationDataSchema,
  ],
);

export const RuntimePushNotificationDataSchema = z.discriminatedUnion('type', [
  IncomingCallNotificationDataSchema,
  LegacyCallNotificationDataSchema,
  MissedCallNotificationDataSchema,
  MessageNotificationDataSchema,
]);

export const PushNotificationPayloadSchema = z.object({
  title: NonEmptyStringSchema,
  body: NonEmptyStringSchema,
  data: RuntimePushNotificationDataSchema,
});

// ============================================================================
// CLIENT -> BACKEND REQUEST SHAPES
// ============================================================================

export const OutboundCallNotificationDataSchema = z.object({
  roomId: NonEmptyStringSchema,
  callerId: NonEmptyStringSchema,
  callerName: NonEmptyStringSchema,
  notificationId: NonEmptyStringSchema.optional(),
  type: z.enum(['incoming_call', 'missed_call']).default('incoming_call'),
});

export const SendCallNotificationRequestSchema = z.object({
  targetUserId: NonEmptyStringSchema,
  callData: OutboundCallNotificationDataSchema,
});

export const SendDebugCallNotificationRequestSchema = z.object({
  callData: OutboundCallNotificationDataSchema.partial().optional(),
});

export const RemovePushSubscriptionRequestSchema = z.object({
  endpoint: NonEmptyStringSchema,
});

// ============================================================================
// PUSH SUBSCRIPTION STORAGE SHAPES
// ============================================================================

export const WebPushSubscriptionSchema = z.object({
  endpoint: NonEmptyStringSchema,
  expirationTime: z.number().nullable().optional(),
  keys: z.object({
    p256dh: NonEmptyStringSchema,
    auth: NonEmptyStringSchema,
  }),
});

export const PushSubscriptionDeviceInfoSchema = z.object({
  platform: z.string().optional(),
  userAgent: z.string().optional(),
  language: z.string().optional(),
});

export const RegisterPushSubscriptionRequestSchema = z.object({
  subscription: WebPushSubscriptionSchema,
  deviceInfo: PushSubscriptionDeviceInfoSchema.optional(),
});

export const PushSubscriptionRecordSchema = z.object({
  subscription: WebPushSubscriptionSchema,
  endpoint: NonEmptyStringSchema,
  keys: z.object({
    p256dh: NonEmptyStringSchema,
    auth: NonEmptyStringSchema,
  }),
  createdAt: z.number(),
  lastUsed: z.number(),
  deviceInfo: PushSubscriptionDeviceInfoSchema.optional(),
});

export const PushSubscriptionsByIdSchema = z.record(
  z.string(),
  PushSubscriptionRecordSchema,
);

export const PushSubscriptionOwnerSchema = NonEmptyStringSchema;

// ============================================================================
// BACKEND RESPONSE SHAPES
// ============================================================================

export const PushDeliveryFailureSchema = z.object({
  subscriptionKey: NonEmptyStringSchema,
  statusCode: z.number().nullable(),
  message: z.string().nullable(),
  body: z.string().nullable(),
});

export const PushSendSuccessResponseSchema = z.object({
  success: z.literal(true),
  successCount: z.number().nonnegative(),
  failureCount: z.number().nonnegative(),
  failures: z.array(PushDeliveryFailureSchema),
});

export const PushSendErrorResponseSchema = z.object({
  error: NonEmptyStringSchema,
  reason: z.string().optional(),
  totalSubscriptions: z.number().nonnegative().optional(),
  successCount: z.number().nonnegative().optional(),
  failureCount: z.number().nonnegative().optional(),
  failures: z.array(PushDeliveryFailureSchema).optional(),
});

export const RegisterPushSubscriptionResponseSchema = z.object({
  success: z.literal(true),
  subscriptionId: NonEmptyStringSchema,
});

export const RemovePushSubscriptionResponseSchema = z.object({
  success: z.literal(true),
});

// ============================================================================
// SERVICE WORKER MESSAGE SHAPES
// ============================================================================

export const ServiceWorkerNavigateMessageSchema = z.object({
  type: z.literal('NAVIGATE'),
  path: NonEmptyStringSchema,
});

export const SyncPushDebugIdentityMessageSchema = z.object({
  type: z.literal('SYNC_PUSH_DEBUG_IDENTITY'),
  data: z.object({
    userId: z.string().nullable().optional(),
    displayName: z.string().optional(),
    syncedAt: z.number(),
  }),
});

// ============================================================================
// PARSERS
// ============================================================================

export const parsePushNotificationPayload = (data) =>
  PushNotificationPayloadSchema.parse(data);

export const parseCanonicalPushNotificationData = (data) =>
  CanonicalPushNotificationDataSchema.parse(data);

export const parseRuntimePushNotificationData = (data) =>
  RuntimePushNotificationDataSchema.parse(data);

export const parseSendCallNotificationRequest = (data) =>
  SendCallNotificationRequestSchema.parse(data);

export const parseRegisterPushSubscriptionRequest = (data) =>
  RegisterPushSubscriptionRequestSchema.parse(data);

export const parsePushSubscriptionRecord = (data) =>
  PushSubscriptionRecordSchema.parse(data);

export const parseServiceWorkerNavigateMessage = (data) =>
  ServiceWorkerNavigateMessageSchema.parse(data);
