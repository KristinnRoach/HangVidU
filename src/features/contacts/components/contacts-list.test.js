import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  getAllContactsSorted: vi.fn(),
  onLocaleChange: vi.fn(() => () => {}),
  hideElement: vi.fn(),
  showElement: vi.fn(),
  initIcons: vi.fn(),
  dispatchCommand: vi.fn(),
  onValue: vi.fn(),
  off: vi.fn(),
  subscriptions: new Map(),
}));

vi.mock('firebase/database', () => ({
  ref: vi.fn(() => ({ path: 'presence-ref' })),
  onValue: mocks.onValue,
  off: mocks.off,
}));

vi.mock('../../../shared/storage/fb-rtdb/rtdb.js', () => ({
  rtdb: {},
}));

vi.mock('../../../auth/index.js', () => ({
  getLoggedInUserId: vi.fn(() => 'user-123'),
}));

vi.mock('../../../shared/components/base/confirm-dialog.js', () => ({
  default: vi.fn(),
}));

vi.mock('./edit-contact-modal.js', () => ({
  default: vi.fn(),
}));

vi.mock('../../../shared/components/ui/utils/ui-utils.js', () => ({
  hideElement: mocks.hideElement,
  showElement: mocks.showElement,
}));

vi.mock('../../../shared/i18n/index.js', () => ({
  t: vi.fn((key) => key),
  onLocaleChange: mocks.onLocaleChange,
}));

vi.mock('../../../shared/components/ui/component-system/dom-utils.js', () => ({
  escapeHtml: vi.fn((value) => String(value)),
}));

vi.mock('../../../shared/components/ui/icons.js', () => ({
  initIcons: mocks.initIcons,
}));

vi.mock('../../../shared/events/index.js', () => ({
  dispatchCommand: mocks.dispatchCommand,
  subscribe: vi.fn((eventName, handler) => {
    mocks.subscriptions.set(eventName, handler);
    return () => mocks.subscriptions.delete(eventName);
  }),
}));

vi.mock('../contacts-state.js', () => ({
  getAllContacts: vi.fn(() => ({})),
  getAllContactsSorted: mocks.getAllContactsSorted,
}));

vi.mock('../contacts-service.js', () => ({
  contactsService: {
    updateContact: vi.fn(),
    deleteContact: vi.fn(),
  },
}));

describe('contacts component', () => {
  beforeEach(() => {
    vi.resetModules();
    document.body.innerHTML = '';
    vi.clearAllMocks();
    mocks.subscriptions.clear();
    mocks.onLocaleChange.mockReturnValue(() => {});
    mocks.getAllContactsSorted.mockReturnValue([
      {
        contactId: 'contact-1',
        contactNickName: 'Alice',
        conversationId: 'contact-1_user-123',
        roomId: 'room-1',
      },
    ]);
  });

  it('does not attempt to open a conversation when no conversation id exists', async () => {
    mocks.getAllContactsSorted.mockReturnValue([
      {
        contactId: 'contact-1',
        contactNickName: 'Alice',
        conversationId: null,
        roomId: 'room-1',
      },
    ]);

    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { mountContactsList } = await import('./contacts-list.js');

    const lobbyElement = document.createElement('div');
    await mountContactsList(lobbyElement);

    lobbyElement.querySelector('.contact-name')?.click();

    expect(mocks.dispatchCommand).not.toHaveBeenCalledWith(
      'cmd:messaging:conversation:select',
      expect.anything(),
    );
    expect(warnSpy).toHaveBeenCalledWith(
      '[contacts] No conversation id for contact',
      expect.objectContaining({ contactId: 'contact-1' }),
    );

    warnSpy.mockRestore();
  });

  it('tears down previous presence listeners when rerendered with no contacts', async () => {
    const { mountContactsList } = await import('./contacts-list.js');

    const lobbyElement = document.createElement('div');
    await mountContactsList(lobbyElement);

    expect(mocks.onValue).toHaveBeenCalledTimes(1);
    const offCallsBeforeEmptyRender = mocks.off.mock.calls.length;

    mocks.getAllContactsSorted.mockReturnValue([]);
    mocks.subscriptions.get('evt:contacts:state:changed')?.({});

    expect(mocks.off.mock.calls.length).toBeGreaterThan(
      offCallsBeforeEmptyRender,
    );
  });

  it('subscribes to unread counts through appBus requests and updates the badge', async () => {
    const { mountContactsList } = await import('./contacts-list.js');

    const lobbyElement = document.createElement('div');
    document.body.appendChild(lobbyElement);

    await mountContactsList(lobbyElement);

    expect(mocks.dispatchCommand).toHaveBeenCalledWith(
      'cmd:messaging:conversation:unread-count-listen',
      {
        conversationId: 'contact-1_user-123',
      },
    );

    const unreadHandler = mocks.subscriptions.get(
      'evt:messaging:conversation:unread-count-changed',
    );

    unreadHandler?.({
      conversationId: 'contact-1_user-123',
      unreadCount: 4,
    });

    await new Promise((resolve) => setTimeout(resolve, 60));

    const badge = lobbyElement.querySelector(
      '.unread-badge[data-contact-id="contact-1"]',
    );

    expect(badge?.textContent).toBe('4');
    expect(badge?.hidden).toBe(false);
  });
});
