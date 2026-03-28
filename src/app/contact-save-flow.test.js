import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  renderContactsList: vi.fn(),
  showSaveContactPrompt: vi.fn(),
}));

vi.mock('../ui/components/contacts/contacts.js', () => ({
  renderContactsList: mocks.renderContactsList,
}));

vi.mock('../ui/components/contacts/save-contact-modal.js', () => ({
  showSaveContactPrompt: mocks.showSaveContactPrompt,
}));

describe('promptAndRefreshContactSave', () => {
  beforeEach(() => {
    mocks.renderContactsList.mockReset();
    mocks.showSaveContactPrompt.mockReset();
  });

  it('rerenders contacts after a successful save', async () => {
    mocks.showSaveContactPrompt.mockResolvedValue(true);

    const { promptAndRefreshContactSave } = await import('./contact-save-flow.js');
    const lobbyElement = document.createElement('div');

    await expect(
      promptAndRefreshContactSave('u1', 'room-1', lobbyElement),
    ).resolves.toBe(true);
    expect(mocks.renderContactsList).toHaveBeenCalledWith(lobbyElement);
  });

  it('does not rerender contacts after a canceled or failed save', async () => {
    mocks.showSaveContactPrompt.mockResolvedValue(false);

    const { promptAndRefreshContactSave } = await import('./contact-save-flow.js');
    const lobbyElement = document.createElement('div');

    await expect(
      promptAndRefreshContactSave('u1', 'room-1', lobbyElement),
    ).resolves.toBe(false);
    expect(mocks.renderContactsList).not.toHaveBeenCalled();
  });
});
