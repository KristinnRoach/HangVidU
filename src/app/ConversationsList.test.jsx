import { beforeEach, describe, expect, it, vi } from 'vite-plus/test';
import { render, cleanup } from '@solidjs/testing-library';

const mocks = vi.hoisted(() => ({
  byId: {},
  seeded: true,
  activity: new Map(),
  watchUserPresence: vi.fn(() => () => {}),
  dispatchCommand: vi.fn(),
  startCall: vi.fn(),
  openConversation: vi.fn(),
}));

vi.mock('../stores/contactsStore.js', () => ({
  getContactsStore: () => ({
    get byId() {
      return mocks.byId;
    },
  }),
  getContactLabel: (contact) =>
    contact.nickname || contact.displayName || contact.username || null,
}));

vi.mock('../stores/conversation-list-state', () => ({
  conversationListState: () => mocks.activity,
  conversationListSeeded: () => mocks.seeded,
  getLastReadAt: () => 0,
}));

vi.mock('../auth/index.js', () => ({
  getLoggedInUserId: () => 'me',
}));

vi.mock('../stores/conversationStore', () => ({
  openConversation: mocks.openConversation,
  selection: () => null,
}));

vi.mock('../features/call/call-handshake', () => ({
  useCallHandshake: () => ({ startCall: mocks.startCall }),
}));

vi.mock('../features/presence/index.js', () => ({
  watchUserPresence: mocks.watchUserPresence,
}));

vi.mock('../shared/events/index.js', () => ({
  dispatchCommand: mocks.dispatchCommand,
  subscribe: vi.fn(() => () => {}),
}));

vi.mock('../shared/i18n', () => ({
  t: vi.fn((key) => key),
  useI18n: () => ({
    t: (key) => key,
    locale: () => 'en',
  }),
  onLocaleChange: vi.fn(() => () => {}),
}));

function contact(contactId, nickname) {
  return {
    contactId,
    nickname,
    displayName: null,
    username: null,
    conversationId: null,
    savedAt: 0,
    lastInteractionAt: 0,
  };
}

describe('ConversationsList', { timeout: 60000 }, () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    mocks.byId = {
      'contact-1': contact('contact-1', 'Alice'),
      'contact-2': contact('contact-2', 'Bob'),
    };
    mocks.seeded = true;
    mocks.activity = new Map([
      [
        'conversation-1',
        {
          conversationId: 'conversation-1',
          kind: 'direct',
          title: null,
          members: [{ user_id: 'me' }, { user_id: 'contact-1' }],
          latestSentAt: 100,
          latestSenderId: 'me',
        },
      ],
      [
        'conversation-2',
        {
          conversationId: 'conversation-2',
          kind: 'direct',
          title: null,
          members: [{ user_id: 'me' }, { user_id: 'contact-2' }],
          latestSentAt: 50,
          latestSenderId: 'contact-2',
        },
      ],
    ]);
  });

  it('renders a row per conversation from hydrated state', async () => {
    const { default: ConversationsList } =
      await import('./ConversationsList.tsx');

    const { container, unmount } = render(() => <ConversationsList />);

    const rows = container.querySelectorAll('.conversation-entry');
    expect(rows.length).toBe(2);
    expect(container.textContent).toContain('Alice');
    expect(container.textContent).toContain('Bob');

    unmount();
  });

  it('renders loading state before hydrated empty state', async () => {
    mocks.byId = {};
    mocks.seeded = false;
    const { default: ConversationsList } =
      await import('./ConversationsList.tsx');

    const { container, unmount } = render(() => <ConversationsList />);

    expect(container.querySelector('[role="status"]')).not.toBeNull();
    expect(container.textContent).not.toContain('contact.none');

    unmount();
  });

  it('opens the direct conversation on row click', async () => {
    const { default: ConversationsList } =
      await import('./ConversationsList.tsx');

    const { container, unmount } = render(() => <ConversationsList />);

    const firstContactName = container.querySelector('.contact-name');
    firstContactName?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(mocks.openConversation).toHaveBeenCalledWith({
      conversationId: 'conversation-1',
      kind: 'direct',
      remoteParticipantIds: ['contact-1'],
      displayUI: true,
      nickname: 'Alice',
    });

    unmount();
  });

  it('sorts active conversations first and marks unread rows', async () => {
    mocks.activity = new Map([
      [
        'conversation-1',
        {
          conversationId: 'conversation-1',
          kind: 'direct',
          title: null,
          members: [{ user_id: 'me' }, { user_id: 'contact-1' }],
          latestSentAt: 100,
          latestSenderId: 'me',
        },
      ],
      [
        'conversation-2',
        {
          conversationId: 'conversation-2',
          kind: 'direct',
          title: null,
          members: [{ user_id: 'me' }, { user_id: 'contact-2' }],
          latestSentAt: 200,
          latestSenderId: 'contact-2',
        },
      ],
    ]);
    const { default: ConversationsList } =
      await import('./ConversationsList.tsx');

    const { container, unmount } = render(() => <ConversationsList />);
    const rows = [...container.querySelectorAll('.conversation-entry')];

    expect(
      rows.map((row) => row.querySelector('.contact-name')?.textContent),
    ).toEqual(['Bob', 'Alice']);
    expect(rows[0].querySelector('.unread-badge')).not.toBeNull();
    expect(rows[1].querySelector('.unread-badge')).toBeNull();

    unmount();
  });

  it('renders an unread group row without self, call, or presence controls', async () => {
    mocks.activity = new Map([
      [
        'group-1',
        {
          conversationId: 'group-1',
          kind: 'group',
          title: null,
          members: [
            { user_id: 'me', display_name: 'Me' },
            { user_id: 'contact-1', display_name: 'Alice' },
            { user_id: 'contact-2', display_name: 'Bob' },
          ],
          latestSentAt: 300,
          latestSenderId: 'contact-2',
        },
      ],
    ]);
    const { default: ConversationsList } =
      await import('./ConversationsList.tsx');

    const { container, unmount } = render(() => <ConversationsList />);
    const row = container.querySelector('.conversation-entry');

    expect(row?.textContent).toContain('Alice, Bob');
    expect(row?.textContent).not.toContain('Me');
    expect(row?.querySelector('.unread-badge')).not.toBeNull();
    expect(row?.querySelector('.contact-call-btn')).toBeNull();
    expect(row?.querySelector('.presence-indicator')).toBeNull();

    unmount();
  });
});
