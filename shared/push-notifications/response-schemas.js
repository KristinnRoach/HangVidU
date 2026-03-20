import { z } from 'zod';

import { NonEmptyStringSchema } from './schema-primitives.js';

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
