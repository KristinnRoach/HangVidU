import { z } from 'zod';

import { TimestampStringSchema, NonEmptyStringSchema } from './schema-primitives.js';
import {
  LegacyNotificationTypeSchema,
} from './notification-types.js';

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
