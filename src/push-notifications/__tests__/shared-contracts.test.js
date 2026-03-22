import { describe, expect, it } from 'vitest';

import {
  parseCanonicalPushNotificationData,
  parsePushNotificationPayload,
  parseRegisterPushSubscriptionRequest,
  parseSendCallNotificationRequest,
  parseServiceWorkerNavigateMessage,
} from '../../../shared/push-notifications/index.js';

describe('shared push notification contracts', () => {
  it('parses a canonical incoming call payload', () => {
    const payload = parsePushNotificationPayload({
      title: 'Incoming call from Alice',
      body: 'Tap to answer',
      data: {
        type: 'incoming_call',
        roomId: 'room-123',
        callerId: 'alice',
        callerName: 'Alice',
        targetUserId: 'bob',
        notificationId: 'notif-123',
        timestamp: '1774025000000',
      },
    });

    expect(payload.data.type).toBe('incoming_call');
    expect(payload.data.roomId).toBe('room-123');
  });

  it('rejects legacy call payloads', () => {
    expect(() =>
      parsePushNotificationPayload({
        title: 'Incoming call from Alice',
        body: 'Tap to answer',
        data: {
          type: 'call',
          roomId: 'room-legacy',
          callerId: 'alice',
          callerName: 'Alice',
          targetUserId: 'bob',
          notificationId: 'notif-legacy',
          timestamp: '1774025000001',
        },
      }),
    ).toThrow();

    expect(() =>
      parseCanonicalPushNotificationData({
        type: 'call',
        roomId: 'room-legacy',
        callerId: 'alice',
        callerName: 'Alice',
        targetUserId: 'bob',
        notificationId: 'notif-legacy',
        timestamp: '1774025000001',
      }),
    ).toThrow();
  });

  it('parses sendCallNotification request bodies', () => {
    const request = parseSendCallNotificationRequest({
      targetUserId: 'bob',
      callData: {
        type: 'incoming_call',
        roomId: 'room-123',
        callerId: 'alice',
        callerName: 'Alice',
      },
    });

    expect(request.callData.type).toBe('incoming_call');
  });

  it('parses registerPushSubscription request bodies', () => {
    const request = parseRegisterPushSubscriptionRequest({
      subscription: {
        endpoint: 'https://example.com/push/subscription',
        keys: {
          p256dh: 'p256dh-key',
          auth: 'auth-key',
        },
      },
      deviceInfo: {
        platform: 'MacIntel',
        userAgent: 'TestAgent',
        language: 'en-US',
      },
    });

    expect(request.subscription.endpoint).toContain('/push/');
  });

  it('parses service worker NAVIGATE messages', () => {
    const message = parseServiceWorkerNavigateMessage({
      type: 'NAVIGATE',
      path: '/?room=room-123',
    });

    expect(message.type).toBe('NAVIGATE');
  });
});
