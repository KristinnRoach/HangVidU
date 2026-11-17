import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vite-plus/test';

import { handlePushEvent } from '../sw/index.js';

describe('handlePushEvent', () => {
  let showNotification;
  let postMessage;

  beforeEach(() => {
    showNotification = vi.fn().mockResolvedValue(undefined);
    postMessage = vi.fn();

    globalThis.self = {
      clients: {
        matchAll: vi.fn().mockResolvedValue([{ postMessage }]),
      },
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
      }),
    );
    expect(postMessage).toHaveBeenCalledWith({
      type: 'PUSH_NOTIFICATION_SHOWN',
    });
  });

  describe('foreground auto-close', () => {
    const messagePush = {
      data: {
        json: () => ({
          title: 'Alice',
          body: 'hi',
          data: { type: 'message', senderId: 'alice' },
        }),
      },
    };

    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    function setup(client) {
      const close = vi.fn();
      const other = vi.fn();
      self.clients.matchAll.mockResolvedValue([{ postMessage, ...client }]);
      self.registration.getNotifications = vi.fn().mockResolvedValue([
        { tag: 'message_alice', title: 'Alice', close },
        { tag: 'message_bob', title: 'Bob', close: other },
      ]);
      return { close, other };
    }

    it('closes the shown notification after a delay when the app is focused', async () => {
      const { close, other } = setup({
        focused: true,
        visibilityState: 'visible',
      });

      const done = handlePushEvent(messagePush);
      await vi.runAllTimersAsync();
      await done;

      expect(showNotification).toHaveBeenCalled();
      expect(close).toHaveBeenCalledOnce();
      expect(other).not.toHaveBeenCalled();
    });

    it('leaves the notification when the app is in the background', async () => {
      const { close } = setup({ focused: false, visibilityState: 'hidden' });

      const done = handlePushEvent(messagePush);
      await vi.runAllTimersAsync();
      await done;

      expect(showNotification).toHaveBeenCalled();
      expect(close).not.toHaveBeenCalled();
    });
  });
});
