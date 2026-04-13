import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  shareInvite: vi.fn(),
  showSuccessToast: vi.fn(),
  showErrorToast: vi.fn(),
  initIcons: vi.fn(),
}));

vi.mock('../../../shared/i18n/index.js', () => ({
  t: vi.fn((key) => key),
}));

vi.mock('../contacts-service.js', () => ({
  contactsService: {
    getAllContacts: vi.fn().mockResolvedValue({}),
  },
}));

vi.mock('../user-discovery.js', () => ({
  findUsersByEmails: vi.fn().mockResolvedValue({}),
}));

vi.mock('../invitations.js', () => ({
  sendInvite: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('../../../auth/index.js', () => ({
  requestContactsAccess: vi.fn(),
  requestGmailSendAccess: vi.fn(),
  getLoggedInUserId: vi.fn(() => 'user-123'),
  getUser: vi.fn(() => ({ uid: 'user-123', userName: 'Alice' })),
  getIsLoggedIn: vi.fn(() => true),
}));

vi.mock('../google-contacts.js', () => ({
  fetchGoogleContacts: vi.fn(),
}));

vi.mock('../gmail-send.js', () => ({
  sendBulkEmailsViaGmail: vi.fn(),
}));

vi.mock('../../../shared/components/ui/icons.js', () => ({
  initIcons: mocks.initIcons,
}));

vi.mock('../../../shared/components/toast.js', () => ({
  showSuccessToast: mocks.showSuccessToast,
  showErrorToast: mocks.showErrorToast,
}));

vi.mock('../share-invite.js', () => ({
  shareInvite: mocks.shareInvite,
}));

describe('showAddContactModal - share invite platform action', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
    document.body.innerHTML = '';

    if (typeof HTMLDialogElement !== 'undefined') {
      if (!HTMLDialogElement.prototype.showModal) {
        HTMLDialogElement.prototype.showModal = function showModal() {
          this.setAttribute('open', '');
        };
      }
      if (!HTMLDialogElement.prototype.close) {
        HTMLDialogElement.prototype.close = function close() {
          this.removeAttribute('open');
        };
      }
    }
  });

  it('renders share platform button and triggers share helper on click', async () => {
    mocks.shareInvite.mockResolvedValue({
      ok: true,
      status: 'opened_elsewhere',
    });

    const { showAddContactModal } = await import('./add-contact-modal.js');
    const modalPromise = showAddContactModal();

    const btn = document.querySelector('#share-invite-btn');
    expect(btn).toBeTruthy();

    btn.click();
    await Promise.resolve();

    expect(mocks.shareInvite).toHaveBeenCalledTimes(1);
    expect(mocks.showSuccessToast).not.toHaveBeenCalled();
    expect(document.querySelector('#manual-email-status').textContent).toBe(
      'contact.invite.share.opened_elsewhere',
    );

    document.querySelector('[data-action="cancel"]')?.click();
    await modalPromise;
  });

  it('shows opening state and success status text after copy fallback success', async () => {
    mocks.shareInvite.mockResolvedValue({
      ok: true,
      status: 'copied',
    });

    const { showAddContactModal } = await import('./add-contact-modal.js');
    const modalPromise = showAddContactModal();

    const btn = document.querySelector('#share-invite-btn');
    const status = document.querySelector('#manual-email-status');
    btn.click();

    expect(status.textContent).toBe('contact.invite.share.opening');

    await Promise.resolve();
    await Promise.resolve();

    expect(status.textContent).toBe('contact.invite.share.copied');
    expect(status.className).toContain('success');

    document.querySelector('[data-action="cancel"]')?.click();
    await modalPromise;
  });
});
