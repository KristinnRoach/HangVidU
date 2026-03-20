export * from '../../shared/push-notifications/index.js';

export {
  PushNotificationPayloadSchema,
  CanonicalPushNotificationDataSchema,
  RegisterPushSubscriptionRequestSchema,
  SendCallNotificationRequestSchema,
  PushSubscriptionRecordSchema,
  ServiceWorkerNavigateMessageSchema,
} from '../../shared/push-notifications/index.js';

import {
  PushNotificationPayloadSchema,
  CanonicalPushNotificationDataSchema,
  RegisterPushSubscriptionRequestSchema,
  SendCallNotificationRequestSchema,
  PushSubscriptionRecordSchema,
  ServiceWorkerNavigateMessageSchema,
} from '../../shared/push-notifications/index.js';

export const parsePushNotificationPayload = (data) =>
  PushNotificationPayloadSchema.parse(data);

export const parseCanonicalPushNotificationData = (data) =>
  CanonicalPushNotificationDataSchema.parse(data);

export const parseSendCallNotificationRequest = (data) =>
  SendCallNotificationRequestSchema.parse(data);

export const parseRegisterPushSubscriptionRequest = (data) =>
  RegisterPushSubscriptionRequestSchema.parse(data);

export const parsePushSubscriptionRecord = (data) =>
  PushSubscriptionRecordSchema.parse(data);

export const parseServiceWorkerNavigateMessage = (data) =>
  ServiceWorkerNavigateMessageSchema.parse(data);
