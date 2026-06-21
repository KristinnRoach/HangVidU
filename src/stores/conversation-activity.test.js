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

import { getLoggedInUserId } from '../auth/index.js';
import { getConversationsClient } from './conversations-client';
import {
  conversationActivity,
  getLastReadAt,
  markConversationRead,
  recordConversationActivity,
  refreshConversationActivity,
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

  it('does not overwrite newer live activity with a stale refresh', async () => {
    vi.mocked(getLoggedInUserId).mockReturnValue('me');
    vi.mocked(getConversationsClient).mockReturnValue({
      list: vi.fn().mockResolvedValue([
        {
          id: 'conversation-1',
          kind: 'direct',
          members: [{ user_id: 'me' }, { user_id: 'peer' }],
          latest_sent_at: 1000,
          latest_sender_id: 'peer',
        },
      ]),
    });

    recordConversationActivity('peer', 'conversation-1', 2000, 'me');
    await refreshConversationActivity();

    expect(conversationActivity().get('peer')?.latestSentAt).toBe(2000);
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
