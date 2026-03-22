import { z } from 'zod';

import { NonEmptyStringSchema } from './schema-primitives.js';

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
