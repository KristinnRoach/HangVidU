import { beforeEach, describe, expect, it, vi } from 'vite-plus/test';

const mocks = vi.hoisted(() => ({
  close: vi.fn(),
  unsubscribe: vi.fn(),
  subscribe: vi.fn(),
}));

vi.mock('../../auth/index.js', () => ({
  getLoggedInUserId: vi.fn(),
  getLoggedInUserToken: vi.fn(),
}));
vi.mock('./conversations-client', () => ({ getConversationsClient: vi.fn() }));
vi.mock('../../realtime/user-mailbox', () => ({
  closeUserMailbox: mocks.close,
  subscribeToUserMailbox: mocks.subscribe,
}));
vi.mock('../../infra/hangvidu-api-url', () => ({
  getHangViduApiBaseUrl: vi.fn(),
}));

import { getLoggedInUserId } from '@auth';
import { getConversationsClient } from './conversations-client';
import {
  conversationListState,
  getLastReadAt,
  markConversationRead,
  recordConversationListMessage,
  refreshConversationListState,
  startConversationListSync,
  updateMemberLastReadAt,
  stopConversationListSync,
} from './conversation-list-state';

describe('markConversationRead', () => {
  beforeEach(() => {
    const values = new Map();
    vi.stubGlobal('localStorage', {
      getItem: (key) => values.get(key) ?? null,
      setItem: (key, value) => values.set(key, String(value)),
    });
    mocks.subscribe.mockReturnValue(mocks.unsubscribe);
    stopConversationListSync();
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

    recordConversationListMessage('conversation-1', 2000, 'me');
    await refreshConversationListState();

    expect(conversationListState().get('conversation-1')?.latestSentAt).toBe(
      2000,
    );
  });

  it('keeps group conversations from the seed', async () => {
    vi.mocked(getLoggedInUserId).mockReturnValue('me');
    vi.mocked(getConversationsClient).mockReturnValue({
      list: vi.fn().mockResolvedValue([
        {
          id: 'group-1',
          kind: 'group',
          title: 'Project Room',
          updated_at: 1000,
          members: [
            { user_id: 'me', display_name: 'Me' },
            { user_id: 'peer', display_name: 'Peer' },
          ],
          latest_sent_at: 1000,
          latest_sender_id: 'peer',
        },
      ]),
    });

    await refreshConversationListState();

    expect(conversationListState().get('group-1')).toMatchObject({
      conversationId: 'group-1',
      kind: 'group',
      title: 'Project Room',
      latestSenderId: 'peer',
    });
  });

  it('takes seed members but keeps a read marker a broadcast moved past', async () => {
    vi.mocked(getLoggedInUserId).mockReturnValue('me');
    const row = (peerReadAt, latestSentAt) => ({
      id: 'dm-1',
      kind: 'direct',
      title: null,
      updated_at: 1000,
      members: [
        { user_id: 'me', display_name: 'Me', last_read_at: 0 },
        { user_id: 'peer', display_name: 'Peer', last_read_at: peerReadAt },
      ],
      latest_sent_at: latestSentAt,
      latest_sender_id: 'me',
    });

    vi.mocked(getConversationsClient).mockReturnValue({
      list: vi.fn().mockResolvedValue([row(100, 1000)]),
    });
    await refreshConversationListState();

    // Live broadcast + a local send, both newer than the next snapshot.
    updateMemberLastReadAt('dm-1', 'peer', 900);
    recordConversationListMessage('dm-1', 2000, 'me');

    vi.mocked(getConversationsClient).mockReturnValue({
      list: vi.fn().mockResolvedValue([row(100, 1000)]),
    });
    await refreshConversationListState();

    const seeded = conversationListState().get('dm-1');
    expect(
      seeded.members.find((member) => member.user_id === 'peer'),
    ).toMatchObject({ display_name: 'Peer', last_read_at: 900 });
    expect(seeded.latestSentAt).toBe(2000);
  });

  it('can subscribe again after being stopped', () => {
    startConversationListSync();
    stopConversationListSync();
    startConversationListSync();

    expect(mocks.unsubscribe).toHaveBeenCalledOnce();
    expect(mocks.close).toHaveBeenCalledOnce();
    expect(mocks.subscribe).toHaveBeenCalledTimes(2);
  });
});

describe('updateMemberLastReadAt', () => {
  async function seedDirect() {
    vi.mocked(getLoggedInUserId).mockReturnValue('me');
    vi.mocked(getConversationsClient).mockReturnValue({
      list: vi.fn().mockResolvedValue([
        {
          id: 'dm-1',
          kind: 'direct',
          title: null,
          updated_at: 1000,
          members: [
            { user_id: 'me', display_name: 'Me', last_read_at: 0 },
            { user_id: 'peer', display_name: 'Peer', last_read_at: 500 },
          ],
          latest_sent_at: 1000,
          latest_sender_id: 'me',
        },
      ]),
    });
    await refreshConversationListState();
  }

  const peerReadAt = () =>
    conversationListState()
      .get('dm-1')
      ?.members.find((member) => member.user_id === 'peer')?.last_read_at;

  it('advances the peer marker without touching other members', async () => {
    await seedDirect();

    updateMemberLastReadAt('dm-1', 'peer', 900);

    expect(peerReadAt()).toBe(900);
    expect(
      conversationListState()
        .get('dm-1')
        ?.members.find((member) => member.user_id === 'me')?.last_read_at,
    ).toBe(0);
  });

  it('never moves a marker backwards on a replayed event', async () => {
    await seedDirect();

    updateMemberLastReadAt('dm-1', 'peer', 900);
    updateMemberLastReadAt('dm-1', 'peer', 700);

    expect(peerReadAt()).toBe(900);
  });

  it('ignores an unseeded conversation', async () => {
    await seedDirect();

    updateMemberLastReadAt('dm-404', 'peer', 900);

    expect(conversationListState().get('dm-404')).toBeUndefined();
  });
});
