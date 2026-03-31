import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  selectConversation: vi.fn(),
  getAllContactsSorted: vi.fn(),
  onLocaleChange: vi.fn(() => () => {}),
  hideElement: vi.fn(),
  showElement: vi.fn(),
  initIcons: vi.fn(),
  dispatchUIEvent: vi.fn(),
  onValue: vi.fn(),
  off: vi.fn(),
}));

vi.mock('firebase/database', () => ({
  ref: vi.fn(() => ({ path: 'presence-ref' })),
  onValue: mocks.onValue,
  off: mocks.off,
}));

vi.mock('../../storage/fb-rtdb/rtdb.js', () => ({
  rtdb: {},
}));

vi.mock('../../auth/auth-state.js', () => ({
  getLoggedInUserId: vi.fn(() => 'user-123'),
}));

vi.mock('../../ui/components/base/confirm-dialog.js', () => ({
  default: vi.fn(),
}));

vi.mock('./edit-contact-modal.js', () => ({
  default: vi.fn(),
}));

vi.mock('../../ui/utils/ui-utils.js', () => ({
  hideElement: mocks.hideElement,
  showElement: mocks.showElement,
}));

vi.mock('../../i18n/index.js', () => ({
  t: vi.fn((key) => key),
  onLocaleChange: mocks.onLocaleChange,
}));

vi.mock('../../ui/component-system/dom-utils.js', () => ({
  escapeHtml: vi.fn((value) => String(value)),
}));

vi.mock('../../ui/icons.js', () => ({
  initIcons: mocks.initIcons,
}));

vi.mock('../../messaging/messaging-controller.js', () => ({
  messagingController: {
    selectConversation: mocks.selectConversation,
    listenToUnreadCount: vi.fn(() => () => {}),
  },
}));

vi.mock('../contacts-service.js', () => ({
  contactsService: {
    getAllContactsSorted: mocks.getAllContactsSorted,
    getAllContacts: vi.fn(),
    updateContact: vi.fn(),
    deleteContact: vi.fn(),
  },
}));

vi.mock('../../ui/dispatcher.js', () => ({
  dispatchUIEvent: mocks.dispatchUIEvent,
}));

describe('contacts component', () => {
  beforeEach(() => {
    vi.resetModules();
    document.body.innerHTML = '';
    vi.clearAllMocks();
    mocks.onLocaleChange.mockReturnValue(() => {});
    mocks.getAllContactsSorted.mockResolvedValue([
      {
        contactId: 'contact-1',
        contactName: 'Alice',
        conversationId: 'contact-1_user-123',
        roomId: 'room-1',
      },
    ]);
  });

  it('does not attempt to open a conversation when no conversation id exists', async () => {
    mocks.getAllContactsSorted.mockResolvedValue([
      {
        contactId: 'contact-1',
        contactName: 'Alice',
        conversationId: null,
        roomId: 'room-1',
      },
    ]);

    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { renderContactsList } = await import('./contacts-list.js');

    const lobbyElement = document.createElement('div');
    await renderContactsList(lobbyElement);

    lobbyElement.querySelector('.contact-name')?.click();

    expect(mocks.selectConversation).not.toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalledWith(
      '[contacts] No conversation id for contact',
      expect.objectContaining({ contactId: 'contact-1' }),
    );

    warnSpy.mockRestore();
  });

  it('tears down previous presence listeners when rerendered with no contacts', async () => {
    const { renderContactsList } = await import('./contacts-list.js');

    const lobbyElement = document.createElement('div');
    await renderContactsList(lobbyElement);

    expect(mocks.onValue).toHaveBeenCalledTimes(1);
    const offCallsBeforeEmptyRender = mocks.off.mock.calls.length;

    mocks.getAllContactsSorted.mockResolvedValue([]);
    await renderContactsList(lobbyElement);

    expect(mocks.off.mock.calls.length).toBeGreaterThan(
      offCallsBeforeEmptyRender,
    );
  });
});
