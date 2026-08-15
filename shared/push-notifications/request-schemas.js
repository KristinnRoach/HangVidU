import { z } from 'zod';

import { NonEmptyStringSchema } from './schema-primitives.js';
import {
  PushSubscriptionDeviceInfoSchema,
  WebPushSubscriptionSchema,
} from './storage-schemas.js';

const OutboundCallNotificationDataBaseSchema = z.object({
  // Optional only at this deployed-client boundary. New incoming-call sends
  // include it; missed calls do not carry a completed invite's identifier.
  callInviteId: NonEmptyStringSchema.optional(),
  roomId: NonEmptyStringSchema,
  callerId: NonEmptyStringSchema,
  callerName: NonEmptyStringSchema,
  notificationId: NonEmptyStringSchema.optional(),
  type: z.enum(['incoming_call', 'missed_call']).default('incoming_call'),
});

export const OutboundCallNotificationDataSchema =
  OutboundCallNotificationDataBaseSchema.superRefine((data, ctx) => {
    if (data.type === 'incoming_call' && !data.callInviteId) {
      ctx.addIssue({
        code: 'custom',
        path: ['callInviteId'],
        message: 'callInviteId is required for incoming calls',
      });
    }
  });

export const SendCallNotificationRequestSchema = z.object({
  targetUserId: NonEmptyStringSchema,
  callData: OutboundCallNotificationDataSchema,
});

export const SendDebugCallNotificationRequestSchema = z.object({
  callData: OutboundCallNotificationDataBaseSchema.partial().optional(),
});

export const RemovePushSubscriptionRequestSchema = z.object({
  endpoint: NonEmptyStringSchema,
});

export const RegisterPushSubscriptionRequestSchema = z.object({
  subscription: WebPushSubscriptionSchema,
  deviceInfo: PushSubscriptionDeviceInfoSchema.optional(),
});
