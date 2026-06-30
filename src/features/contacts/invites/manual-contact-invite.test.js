import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  lookupRegisteredUserByEmail: vi.fn(),
  sendContactInvite: vi.fn(),
  getAllContacts: vi.fn(),
  hydrateContacts: vi.fn(),
}));

vi.mock('../../../stores/userProfileStore.js', () => ({
  lookupRegisteredUserByEmail: mocks.lookupRegisteredUserByEmail,
}));

vi.mock('./send-contact-invite.js', () => ({
  sendContactInvite: mocks.sendContactInvite,
}));

vi.mock('../../../stores/contactsStore.js', () => ({
  getAllContacts: mocks.getAllContacts,
  hydrateContacts: mocks.hydrateContacts,
}));

vi.mock('../../../auth/index.js', () => ({
  getLoggedInUserId: vi.fn(() => 'me'),
}));

import { inviteContactByEmail } from './manual-contact-invite.js';

describe('inviteContactByEmail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.hydrateContacts.mockResolvedValue();
    mocks.getAllContacts.mockReturnValue({});
  });

  it('invokes not-found fallback only when lookup returns not_found', async () => {
    const onNotFound = vi.fn().mockResolvedValue(undefined);
    mocks.lookupRegisteredUserByEmail.mockResolvedValue({
      status: 'not_found',
      user: null,
    });

    const result = await inviteContactByEmail('missing@example.com', {
      onNotFound,
    });

    expect(onNotFound).toHaveBeenCalledTimes(1);
    expect(result.status).toBe('not_found');
  });

  it('returns lookup_error and skips fallback when directory lookup fails', async () => {
    const error = new Error('network down');
    const onNotFound = vi.fn().mockResolvedValue(undefined);
    mocks.lookupRegisteredUserByEmail.mockResolvedValue({
      status: 'lookup_error',
      user: null,
      error,
    });

    const result = await inviteContactByEmail('test@example.com', {
      onNotFound,
    });

    expect(onNotFound).not.toHaveBeenCalled();
    expect(result).toEqual(
      expect.objectContaining({
        ok: false,
        status: 'lookup_error',
        error,
      }),
    );
  });

  it('checks duplicates after contacts hydration', async () => {
    mocks.lookupRegisteredUserByEmail.mockResolvedValue({
      status: 'found',
      user: { uid: 'user-1', displayName: 'Alice' },
    });
    mocks.getAllContacts.mockReturnValue({
      'user-1': { contactId: 'user-1' },
    });

    const result = await inviteContactByEmail('alice@example.com');

    expect(mocks.hydrateContacts).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ ok: false, status: 'already_saved' });
    expect(mocks.sendContactInvite).not.toHaveBeenCalled();
  });
});
