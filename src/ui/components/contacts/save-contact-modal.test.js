import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  confirmDialog: vi.fn(),
  saveContact: vi.fn(),
}));

vi.mock('../../../i18n/index.js', () => ({
  t: (key) => key,
}));

vi.mock('../../../contacts/contacts-service.js', () => ({
  contactsService: {
    saveContact: mocks.saveContact,
  },
}));

vi.mock('../base/confirm-dialog.js', () => ({
  default: mocks.confirmDialog,
}));

describe('showSaveContactPrompt', () => {
  beforeEach(() => {
    mocks.confirmDialog.mockReset();
    mocks.saveContact.mockReset();
    vi.spyOn(window, 'prompt').mockReset();
  });

  it('returns false when the user cancels', async () => {
    mocks.confirmDialog.mockResolvedValue(false);
    vi.spyOn(window, 'prompt').mockReturnValue('Ignored');

    const { showSaveContactPrompt } = await import('./save-contact-modal.js');

    await expect(showSaveContactPrompt('u1', 'room-1')).resolves.toBe(false);
    expect(mocks.saveContact).not.toHaveBeenCalled();
  });

  it('returns true when the contact save succeeds', async () => {
    mocks.confirmDialog.mockResolvedValue(true);
    vi.spyOn(window, 'prompt').mockReturnValue('Alice');
    mocks.saveContact.mockResolvedValue({ contactId: 'u1' });

    const { showSaveContactPrompt } = await import('./save-contact-modal.js');

    await expect(showSaveContactPrompt('u1', 'room-1')).resolves.toBe(true);
    expect(mocks.saveContact).toHaveBeenCalledWith('u1', 'Alice', 'room-1');
  });

  it('returns false when the contact save fails', async () => {
    mocks.confirmDialog.mockResolvedValue(true);
    vi.spyOn(window, 'prompt').mockReturnValue('Alice');
    mocks.saveContact.mockResolvedValue(null);

    const { showSaveContactPrompt } = await import('./save-contact-modal.js');

    await expect(showSaveContactPrompt('u1', 'room-1')).resolves.toBe(false);
  });
});
