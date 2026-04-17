import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  confirmDialog: vi.fn(),
  saveContact: vi.fn(),
  openSolidDialog: vi.fn(),
}));

vi.mock('../../../shared/i18n/index.js', () => ({
  t: (key) => key,
}));

vi.mock('../contacts-service.js', () => ({
  contactsService: {
    saveContact: mocks.saveContact,
  },
}));

vi.mock('../../../shared/components/base/confirm-dialog.js', () => ({
  default: mocks.confirmDialog,
}));

vi.mock('../../../shared/components/base/solid-dialog.js', () => ({
  openSolidDialog: mocks.openSolidDialog,
}));

describe('showSaveContactPrompt', () => {
  beforeEach(() => {
    mocks.confirmDialog.mockReset();
    mocks.saveContact.mockReset();
    mocks.openSolidDialog.mockReset();
  });

  it('returns false when the user cancels', async () => {
    mocks.confirmDialog.mockResolvedValue(false);

    const { showSaveContactPrompt } = await import('./save-contact-modal.jsx');

    await expect(showSaveContactPrompt('u1', 'room-1')).resolves.toBe(false);
    expect(mocks.saveContact).not.toHaveBeenCalled();
  });

  it('returns true when the contact save succeeds', async () => {
    mocks.confirmDialog.mockResolvedValue(true);
    mocks.openSolidDialog.mockResolvedValue('Alice');
    mocks.saveContact.mockResolvedValue({ contactId: 'u1' });

    const { showSaveContactPrompt } = await import('./save-contact-modal.jsx');

    await expect(showSaveContactPrompt('u1', 'room-1')).resolves.toBe(true);
    expect(mocks.saveContact).toHaveBeenCalledWith('u1', 'Alice', 'room-1');
  });

  it('returns false when the contact save fails', async () => {
    mocks.confirmDialog.mockResolvedValue(true);
    mocks.openSolidDialog.mockResolvedValue('Alice');
    mocks.saveContact.mockResolvedValue(null);

    const { showSaveContactPrompt } = await import('./save-contact-modal.jsx');

    await expect(showSaveContactPrompt('u1', 'room-1')).resolves.toBe(false);
  });

  it('falls back to contact id when the name dialog is cancelled', async () => {
    mocks.confirmDialog.mockResolvedValue(true);
    mocks.openSolidDialog.mockResolvedValue(null);
    mocks.saveContact.mockResolvedValue({ contactId: 'u1' });

    const { showSaveContactPrompt } = await import('./save-contact-modal.jsx');

    await expect(showSaveContactPrompt('u1', 'room-1')).resolves.toBe(true);
    expect(mocks.saveContact).toHaveBeenCalledWith('u1', 'u1', 'room-1');
  });
});
