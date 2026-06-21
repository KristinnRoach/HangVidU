import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  close: vi.fn(),
  unsubscribe: vi.fn(),
  subscribe: vi.fn(),
}));

vi.mock('../auth/index.js', () => ({
  getLoggedInUserId: vi.fn(),
  getLoggedInUserToken: vi.fn(),
}));
vi.mock('./conversations-client', () => ({ getConversationsClient: vi.fn() }));
vi.mock('../realtime/user-mailbox', () => ({
  closeUserMailbox: mocks.close,
  subscribeToUserMailbox: mocks.subscribe,
}));
vi.mock('../infra/hangvidu-api-url', () => ({
  getHangViduApiBaseUrl: vi.fn(),
}));

import {
  getLastReadAt,
  markConversationRead,
  startConversationActivity,
  stopConversationActivity,
} from './conversation-activity';

describe('markConversationRead', () => {
  beforeEach(() => {
    const values = new Map();
    vi.stubGlobal('localStorage', {
      getItem: (key) => values.get(key) ?? null,
      setItem: (key, value) => values.set(key, String(value)),
    });
    mocks.subscribe.mockReturnValue(mocks.unsubscribe);
    stopConversationActivity();
    vi.clearAllMocks();
  });

  it('does not move the read timestamp backward', () => {
    markConversationRead('conversation-1', 2000);
    markConversationRead('conversation-1', 1000);

    expect(getLastReadAt('conversation-1')).toBe(2000);
  });

  it('can subscribe again after being stopped', () => {
    startConversationActivity();
    stopConversationActivity();
    startConversationActivity();

    expect(mocks.unsubscribe).toHaveBeenCalledOnce();
    expect(mocks.close).toHaveBeenCalledOnce();
    expect(mocks.subscribe).toHaveBeenCalledTimes(2);
  });
});
