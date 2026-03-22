import { z } from 'zod';

import { NonEmptyStringSchema } from './schema-primitives.js';

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
