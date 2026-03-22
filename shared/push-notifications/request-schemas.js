import { z } from 'zod';

import { NonEmptyStringSchema } from './schema-primitives.js';
import {
  PushSubscriptionDeviceInfoSchema,
  WebPushSubscriptionSchema,
} from './storage-schemas.js';

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

export const RegisterPushSubscriptionRequestSchema = z.object({
  subscription: WebPushSubscriptionSchema,
  deviceInfo: PushSubscriptionDeviceInfoSchema.optional(),
});
