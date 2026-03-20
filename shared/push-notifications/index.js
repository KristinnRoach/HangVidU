export * from './notification-types.js';
export * from './notification-schemas.js';
export * from './request-schemas.js';
export * from './response-schemas.js';
export * from './storage-schemas.js';
export * from './service-worker-message-schemas.js';

import {
  PushNotificationPayloadSchema,
  CanonicalPushNotificationDataSchema,
  RuntimePushNotificationDataSchema,
} from './notification-schemas.js';
import {
  RegisterPushSubscriptionRequestSchema,
  SendCallNotificationRequestSchema,
} from './request-schemas.js';
import { PushSubscriptionRecordSchema } from './storage-schemas.js';
import { ServiceWorkerNavigateMessageSchema } from './service-worker-message-schemas.js';

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
