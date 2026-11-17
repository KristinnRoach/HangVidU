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

    let client;
    let shown;

    beforeEach(() => {
      vi.useFakeTimers();
      client = { postMessage, focused: true, visibilityState: 'visible' };
      shown = [];
      self.clients.matchAll.mockImplementation(async () => [client]);
      // Same tag replaces the existing notification, like the real API.
      showNotification.mockImplementation(async (title, options) => {
        shown = shown.filter((n) => n.tag !== options.tag);
        shown.push({ tag: options.tag, data: options.data, close: vi.fn() });
      });
      self.registration.getNotifications = vi.fn(async () => [...shown]);
    });
    afterEach(() => vi.useRealTimers());

    it('closes the shown notification after a delay when the app is focused', async () => {
      const done = handlePushEvent(messagePush);
      await vi.advanceTimersByTimeAsync(3999);
      expect(shown[0].close).not.toHaveBeenCalled();

      await vi.runAllTimersAsync();
      await done;
      expect(shown[0].close).toHaveBeenCalledOnce();
    });

    it('leaves the notification when the app is in the background', async () => {
      client = { postMessage, focused: false, visibilityState: 'hidden' };

      const done = handlePushEvent(messagePush);
      await vi.runAllTimersAsync();
      await done;

      expect(shown[0].close).not.toHaveBeenCalled();
    });

    it('leaves the notification when the app is backgrounded during enumeration', async () => {
      self.registration.getNotifications = vi.fn(async () => {
        client = { postMessage, focused: false, visibilityState: 'hidden' };
        return [...shown];
      });

      const done = handlePushEvent(messagePush);
      await vi.runAllTimersAsync();
      await done;

      expect(shown[0].close).not.toHaveBeenCalled();
    });

    it('does not let an older push close a newer same-tag notification early', async () => {
      const first = handlePushEvent(messagePush);
      await vi.advanceTimersByTimeAsync(3900);
      const second = handlePushEvent(messagePush);
      await vi.advanceTimersByTimeAsync(200);
      await first;

      expect(shown).toHaveLength(1);
      expect(shown[0].close).not.toHaveBeenCalled();

      await vi.runAllTimersAsync();
      await second;
      expect(shown[0].close).toHaveBeenCalledOnce();
    });
  });
});
