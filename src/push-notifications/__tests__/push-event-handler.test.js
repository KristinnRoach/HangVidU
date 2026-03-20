import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../sw/push-debug-identity-store.js', () => ({
  readPushDebugIdentity: vi.fn().mockResolvedValue({
    userId: 'local-user',
    displayName: 'Local User',
  }),
}));

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
  let getNotifications;
  let matchAll;

  beforeEach(() => {
    showNotification = vi.fn().mockResolvedValue(undefined);
    getNotifications = vi.fn().mockResolvedValue([]);
    matchAll = vi.fn().mockResolvedValue([]);

    globalThis.self = {
      registration: {
        showNotification,
        getNotifications,
      },
      clients: {
        matchAll,
      },
    };
  });

  it('suppresses native notification display when a focused visible app client exists', async () => {
    matchAll.mockResolvedValueOnce([
      {
        focused: true,
        visibilityState: 'visible',
        url: 'https://vidu-aae11.web.app/',
      },
    ]);

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

    expect(matchAll).toHaveBeenCalledWith({
      type: 'window',
      includeUncontrolled: true,
    });
    expect(showNotification).not.toHaveBeenCalled();
    expect(getNotifications).not.toHaveBeenCalled();
  });

  it('shows the native notification when no focused visible app client exists', async () => {
    matchAll.mockResolvedValueOnce([
      {
        focused: false,
        visibilityState: 'hidden',
        url: 'https://vidu-aae11.web.app/',
      },
    ]);

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
    expect(getNotifications).toHaveBeenCalledWith({
      tag: 'call_room-1',
    });
  });
});
