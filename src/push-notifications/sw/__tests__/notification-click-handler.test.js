import { describe, expect, it } from 'vitest';

import { getNotificationNavigationPath } from '../notification-click-handler.js';

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
