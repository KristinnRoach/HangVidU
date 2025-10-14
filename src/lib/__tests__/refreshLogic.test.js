import { describe, it, expect } from 'vitest';
import { decideRefreshAction } from '../refreshLogic.js';

describe('decideRefreshAction', () => {
  it('returns idle if no roomId in url or state', () => {
    expect(decideRefreshAction({ urlRoomId: null, savedState: {} })).toEqual({
      action: 'idle',
    });
    expect(
      decideRefreshAction({ urlRoomId: undefined, savedState: undefined })
    ).toEqual({ action: 'idle' });
  });

  it('returns join if urlRoomId is present and not in savedState', () => {
    expect(
      decideRefreshAction({
        urlRoomId: 'abc',
        savedState: { roomId: 'def', wasConnected: false },
      })
    ).toEqual({ action: 'join', roomId: 'abc' });
  });

  it('returns join if savedState.roomId is present but not connected', () => {
    expect(
      decideRefreshAction({
        urlRoomId: null,
        savedState: { roomId: 'abc', wasConnected: false },
      })
    ).toEqual({ action: 'join', roomId: 'abc' });
  });

  it('returns reconnect if same room and wasConnected', () => {
    expect(
      decideRefreshAction({
        urlRoomId: 'abc',
        savedState: { roomId: 'abc', wasConnected: true },
      })
    ).toEqual({ action: 'reconnect', roomId: 'abc' });
    expect(
      decideRefreshAction({
        urlRoomId: null,
        savedState: { roomId: 'abc', wasConnected: true },
      })
    ).toEqual({ action: 'reconnect', roomId: 'abc' });
  });

  it('returns join if urlRoomId and savedState.roomId differ', () => {
    expect(
      decideRefreshAction({
        urlRoomId: 'abc',
        savedState: { roomId: 'def', wasConnected: true },
      })
    ).toEqual({ action: 'join', roomId: 'abc' });
  });
});
