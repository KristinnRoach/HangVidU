import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../auth/index.js', () => ({
  getLoggedInUserId: vi.fn(),
  getLoggedInUserToken: vi.fn(),
}));
vi.mock('./conversations-client', () => ({ getConversationsClient: vi.fn() }));
vi.mock('../realtime/user-mailbox', () => ({
  subscribeToUserMailbox: vi.fn(),
}));
vi.mock('../infra/hangvidu-api-url', () => ({
  getHangViduApiBaseUrl: vi.fn(),
}));

import { getLastReadAt, markConversationRead } from './conversation-activity';

describe('markConversationRead', () => {
  beforeEach(() => {
    const values = new Map();
    vi.stubGlobal('localStorage', {
      getItem: (key) => values.get(key) ?? null,
      setItem: (key, value) => values.set(key, String(value)),
    });
  });

  it('does not move the read timestamp backward', () => {
    markConversationRead('conversation-1', 2000);
    markConversationRead('conversation-1', 1000);

    expect(getLastReadAt('conversation-1')).toBe(2000);
  });
});
