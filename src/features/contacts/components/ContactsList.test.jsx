import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, cleanup } from '@solidjs/testing-library';

// TODO: Check this:
/*
Caveat worth flagging: The 10s test runtime for ContactsList "renders a row per contact" 
comes from a Firebase-related dependency chain reached through 
ContactEntry → StartCallButton → useP2PContext. 
Worth investigating later — either lazy-load that chain 
or stub useP2PContext once the call/p2p layer is migrated. 
For now the 60s timeout swallows it.
*/
const mocks = vi.hoisted(() => ({
  contacts: [],
  isLoading: false,
  watchUserPresence: vi.fn(() => () => {}),
  dispatchCommand: vi.fn(),
  subscribe: vi.fn(),
  initIcons: vi.fn(),
  subscriptions: new Map(),
  startCall: vi.fn(),
  openDirectConversation: vi.fn(),
}));

vi.mock('../../../stores/selectedConversationStore', () => ({
  openDirectConversation: mocks.openDirectConversation,
  clear: vi.fn(),
  selection: () => null,
}));

vi.mock('../../call/call-handshake', () => ({
  useCallHandshake: () => ({ startCall: mocks.startCall }),
}));

vi.mock('../../presence/index.js', () => ({
  watchUserPresence: mocks.watchUserPresence,
}));

vi.mock('../useContacts.js', () => ({
  useContacts: () => ({
    contacts: mocks.contacts,
    isLoading: () => mocks.isLoading,
  }),
}));

vi.mock('../../../shared/events/index.js', () => ({
  dispatchCommand: mocks.dispatchCommand,
  subscribe: (eventName, handler) => {
    if (!mocks.subscriptions.has(eventName)) {
      mocks.subscriptions.set(eventName, []);
    }
    const handlers = mocks.subscriptions.get(eventName);
    handlers.push(handler);
    return () => {
      const arr = mocks.subscriptions.get(eventName);
      if (arr) {
        const idx = arr.indexOf(handler);
        if (idx !== -1) arr.splice(idx, 1);
        if (arr.length === 0) mocks.subscriptions.delete(eventName);
      }
    };
  },
}));

vi.mock('../../../shared/i18n/index.js', () => ({
  t: vi.fn((key, params) => {
    if (params?.name) return `${key}:${params.name}`;
    return key;
  }),
  useI18n: () => ({
    t: (key, params) => {
      if (params?.name) return `${key}:${params.name}`;
      return key;
    },
    locale: () => 'en',
  }),
  onLocaleChange: vi.fn(() => () => {}),
}));

vi.mock('../../../components/base-legacy/icons.js', () => ({
  initIcons: mocks.initIcons,
}));

// First-render path drags in Firebase initialization indirectly via
// the call/presence dependency tree, which can take 10s+ alone — and
// longer under parallel test load.
describe('SolidJS ContactsList PoC', { timeout: 60000 }, () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    mocks.subscriptions.clear();
    mocks.contacts = [
      { id: 'contact-1', name: 'Alice', hasUnread: false },
      { id: 'contact-2', name: 'Bob', hasUnread: false },
    ];
    mocks.isLoading = false;
  });

  it('renders a row per contact from hydrated state', async () => {
    const ContactsListModule = await import('./ContactsList.tsx');

    const { container, unmount } = render(() => <ContactsListModule.default />);

    const rows = container.querySelectorAll('.contact-entry');
    expect(rows.length).toBe(2);
    expect(container.textContent).toContain('Alice');
    expect(container.textContent).toContain('Bob');

    unmount();
  });

  it('renders loading state before hydrated empty state', async () => {
    mocks.contacts = [];
    mocks.isLoading = true;
    const ContactsListModule = await import('./ContactsList.tsx');

    const { container, unmount } = render(() => <ContactsListModule.default />);

    expect(container.querySelector('[role="status"]')).not.toBeNull();
    expect(container.textContent).not.toContain('contact.none');

    unmount();
  });

  // TODO: uncomment once audio-only calls re-enabled
  // it('triggers a call on call button click', async () => {
  //   const ContactsListModule = await import('./ContactsList.tsx');

  //   const { container, unmount } = render(() => <ContactsListModule.default />);

  //   const firstCall = container.querySelector('.contact-call-btn');
  //   firstCall?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

  //   expect(mocks.startCall).toHaveBeenCalledWith(
  //     expect.objectContaining({
  //       calleeId: 'contact-1',
  //       calleeName: 'Alice',
  //       audioOnly: true,
  //     }),
  //   );

  //   unmount();
  // });

  it('opens the direct conversation on row click', async () => {
    const ContactsListModule = await import('./ContactsList.tsx');

    const { container, unmount } = render(() => <ContactsListModule.default />);

    const firstContactName = container.querySelector('.contact-name');
    firstContactName?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(mocks.openDirectConversation).toHaveBeenCalledWith('contact-1', {
      displayUI: true,
      nickname: 'Alice',
    });

    unmount();
  });
});
