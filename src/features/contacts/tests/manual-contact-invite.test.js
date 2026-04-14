import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  lookupUserByEmail: vi.fn(),
  sendContactInvite: vi.fn(),
  getAllContacts: vi.fn(),
}));

vi.mock('../user-discovery.js', () => ({
  lookupUserByEmail: mocks.lookupUserByEmail,
}));

vi.mock('../send-contact-invite.js', () => ({
  sendContactInvite: mocks.sendContactInvite,
}));

vi.mock('../contacts-service.js', () => ({
  contactsService: {
    getAllContacts: mocks.getAllContacts,
  },
}));

vi.mock('../../../auth/index.js', () => ({
  getUser: vi.fn(() => ({ uid: 'me' })),
}));

import { inviteContactByEmail } from '../manual-contact-invite.js';

describe('inviteContactByEmail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('invokes not-found fallback only when lookup returns not_found', async () => {
    const onNotFound = vi.fn().mockResolvedValue(undefined);
    mocks.lookupUserByEmail.mockResolvedValue({
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
    mocks.lookupUserByEmail.mockResolvedValue({
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
});
