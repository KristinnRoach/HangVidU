import { beforeEach, describe, expect, it, vi } from 'vite-plus/test';
import { render, cleanup } from '@solidjs/testing-library';

const mocks = vi.hoisted(() => ({
  byId: {},
  status: 'ready',
  watchUserPresence: vi.fn(() => () => {}),
  dispatchCommand: vi.fn(),
  startCall: vi.fn(),
  openDirectConversation: vi.fn(),
}));

vi.mock('../stores/contactsStore.js', () => ({
  getContactsStore: () => ({
    get byId() {
      return mocks.byId;
    },
    get status() {
      return mocks.status;
    },
  }),
  getContactLabel: (contact) =>
    contact.nickname || contact.displayName || contact.username || null,
}));

vi.mock('../stores/conversation-activity', () => ({
  conversationActivity: () => new Map(),
  getLastReadAt: () => 0,
}));

vi.mock('../auth/index.js', () => ({
  getLoggedInUserId: () => 'me',
}));

vi.mock('../stores/selectedConversationStore', () => ({
  openDirectConversation: mocks.openDirectConversation,
  clear: vi.fn(),
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
    mocks.status = 'ready';
  });

  it('renders a row per contact from hydrated state', async () => {
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
    mocks.status = 'loading';
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

    expect(mocks.openDirectConversation).toHaveBeenCalledWith('contact-1', {
      displayUI: true,
      nickname: 'Alice',
    });

    unmount();
  });
});
