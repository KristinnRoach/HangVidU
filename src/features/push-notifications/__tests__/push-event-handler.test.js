import { beforeEach, describe, expect, it, vi } from 'vite-plus/test';

const TEST_APP_URL = import.meta.env.VITE_APP_URL || 'https://hangvidu.com/';

vi.mock('../sw/notification-presentation.js', () => ({
  buildNotificationPresentation: vi.fn(() => ({
    title: 'Incoming call',
    tag: 'call_room-1',
    actions: [],
    options: {
      body: 'Tap to open HangVidU',
      data: {
        type: 'incoming_call',
        roomId: 'room-1',
      },
      tag: 'call_room-1',
      requireInteraction: true,
      actions: [],
      vibrate: [200, 100, 200],
    },
  })),
}));

import { handlePushEvent } from '../sw/push-event-handler.js';

describe('handlePushEvent', () => {
  let showNotification;

  beforeEach(() => {
    showNotification = vi.fn().mockResolvedValue(undefined);

    globalThis.self = {
      registration: {
        showNotification,
      },
    };
  });

  // Always shows — no foreground suppression. Skipping showNotification under
  // userVisibleOnly burns Chrome's silent-push budget and throttles delivery.
  it('always shows the native notification, even with a focused visible client', async () => {
    const event = {
      data: {
        json: () => ({
          title: 'Incoming call',
          body: 'Caller is ringing',
          data: {
            type: 'incoming_call',
            roomId: 'room-1',
            targetUserId: 'target-user',
          },
        }),
      },
    };

    await handlePushEvent(event);

    expect(showNotification).toHaveBeenCalledWith(
      'Incoming call',
      expect.objectContaining({
        tag: 'call_room-1',
      }),
    );
  });
});
