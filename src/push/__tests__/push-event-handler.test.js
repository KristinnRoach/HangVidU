import { beforeEach, describe, expect, it, vi } from 'vite-plus/test';

import { handlePushEvent } from '../sw/index.js';

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
        body: 'Caller is ringing',
        data: expect.objectContaining({
          type: 'incoming_call',
          roomId: 'room-1',
        }),
        requireInteraction: true,
      }),
    );
  });
});
