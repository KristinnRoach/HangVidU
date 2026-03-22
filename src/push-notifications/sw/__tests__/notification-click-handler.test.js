import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  getNotificationNavigationPath,
  openApp,
  selectWindowClient,
} from '../notification-click-handler.js';

describe('notification click routing', () => {
  it('routes incoming call notifications to the room path', () => {
    expect(
      getNotificationNavigationPath(
        {
          type: 'incoming_call',
          roomId: 'room-123',
        },
        undefined,
      ),
    ).toBe('/?room=room-123');
  });

  it('routes missed calls explicitly to caller contact first, then room fallback', () => {
    expect(
      getNotificationNavigationPath({
        type: 'missed_call',
        roomId: 'room-missed',
        callerId: 'caller-1',
      }),
    ).toBe('/?contact=caller-1');

    expect(
      getNotificationNavigationPath({
        type: 'missed_call',
        roomId: 'room-fallback',
      }),
    ).toBe('/?room=room-fallback');

    expect(
      getNotificationNavigationPath({
        type: 'missed_call',
        callerId: 'caller-2',
      }),
    ).toBe('/?contact=caller-2');
  });

  it('routes message notifications to the sender conversation context', () => {
    expect(
      getNotificationNavigationPath(
        {
          type: 'message',
          senderId: 'sender-1',
          conversationId: 'conversation-1',
        },
        'view',
      ),
    ).toBe('/?contact=sender-1');
  });

  it('falls back to the app root when notification data is incomplete', () => {
    expect(getNotificationNavigationPath({ type: 'message' })).toBe('/');
    expect(getNotificationNavigationPath({ type: 'unknown' })).toBe('/');
  });
});

describe('window client selection', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('prefers a focused visible client', () => {
    const fallbackClient = { focused: false, visibilityState: 'hidden' };
    const visibleClient = { focused: false, visibilityState: 'visible' };
    const focusedVisibleClient = { focused: true, visibilityState: 'visible' };

    expect(
      selectWindowClient([fallbackClient, visibleClient, focusedVisibleClient]),
    ).toBe(focusedVisibleClient);
  });

  it('falls back to a visible client before the first matched client', () => {
    const hiddenClient = { focused: false, visibilityState: 'hidden' };
    const visibleClient = { focused: false, visibilityState: 'visible' };

    expect(selectWindowClient([hiddenClient, visibleClient])).toBe(
      visibleClient,
    );
  });

  it('falls back to the first client when none are visible', () => {
    const firstClient = { focused: false, visibilityState: 'hidden' };
    const secondClient = { focused: false, visibilityState: 'hidden' };

    expect(selectWindowClient([firstClient, secondClient])).toBe(firstClient);
  });

  it('posts navigation to the selected client', async () => {
    const hiddenClient = {
      focused: false,
      visibilityState: 'hidden',
      focus: vi.fn().mockResolvedValue(undefined),
      postMessage: vi.fn(),
    };
    const visibleClient = {
      focused: false,
      visibilityState: 'visible',
      focus: vi.fn().mockResolvedValue(undefined),
      postMessage: vi.fn(),
    };

    vi.stubGlobal('self', {
      clients: {
        matchAll: vi.fn().mockResolvedValue([hiddenClient, visibleClient]),
        openWindow: vi.fn(),
      },
      registration: {
        scope: 'https://example.com/',
      },
    });

    await openApp('/?contact=user-1');

    expect(visibleClient.focus).toHaveBeenCalled();
    expect(visibleClient.postMessage).toHaveBeenCalledWith({
      type: 'NAVIGATE',
      path: '/?contact=user-1',
    });
    expect(hiddenClient.focus).not.toHaveBeenCalled();
  });
});
