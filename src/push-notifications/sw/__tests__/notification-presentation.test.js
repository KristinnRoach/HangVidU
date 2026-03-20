import { describe, expect, it } from 'vitest';

import {
  buildNotificationPresentation,
  getNotificationActions,
  getNotificationTag,
  isIncomingCallType,
} from '../notification-presentation.js';

describe('notification presentation', () => {
  it('treats only canonical incoming_call payloads as active call notifications', () => {
    expect(isIncomingCallType('incoming_call')).toBe(true);
    expect(isIncomingCallType('call')).toBe(false);
    expect(isIncomingCallType('message')).toBe(false);
  });

  it('derives stable tags for supported notification kinds', () => {
    expect(
      getNotificationTag({
        type: 'incoming_call',
        notificationId: 'notif-1',
      }),
    ).toBe('call_notif-1');
    expect(
      getNotificationTag({
        type: 'missed_call',
        notificationId: 'missed-1',
      }),
    ).toBe('missed_call_missed-1');

    expect(
      getNotificationTag({
        type: 'message',
        senderId: 'sender-1',
      }),
    ).toBe('message_sender-1');
  });

  it('exposes actions only for supported interactive notification kinds', () => {
    expect(getNotificationActions('incoming_call')).toEqual([
      { action: 'accept', title: 'Accept' },
    ]);
    expect(getNotificationActions('message')).toEqual([
      { action: 'view', title: 'View' },
    ]);
    expect(getNotificationActions('missed_call')).toEqual([]);
  });

  it('builds display options with call-specific interaction behavior', () => {
    const presentation = buildNotificationPresentation(
      {
        title: 'Incoming call from Alice',
        body: 'Tap to answer',
        data: {
          type: 'incoming_call',
          roomId: 'room-1',
          notificationId: 'notif-1',
        },
      },
      '/HangVidU/',
    );

    expect(presentation.title).toBe('Incoming call from Alice');
    expect(presentation.tag).toBe('call_notif-1');
    expect(presentation.options.requireInteraction).toBe(true);
    expect(presentation.options.actions).toEqual([
      { action: 'accept', title: 'Accept' },
    ]);
    expect(presentation.options.icon).toContain(
      '/HangVidU/icons/play-arrows-v1/icon-192.png',
    );
  });
});
