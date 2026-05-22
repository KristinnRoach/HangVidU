import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  requestContactsAccess: vi.fn(),
  getUser: vi.fn(),
  getAllContacts: vi.fn(),
  hydrateContacts: vi.fn(),
  findUsersByEmails: vi.fn(),
  fetchGoogleContacts: vi.fn(),
  buildImportableContacts: vi.fn(),
}));

vi.mock('../../../auth/index.js', () => ({
  requestContactsAccess: mocks.requestContactsAccess,
  getUser: mocks.getUser,
}));

vi.mock('../../../stores/contact-store.js', () => ({
  getAllContacts: mocks.getAllContacts,
  hydrateContacts: mocks.hydrateContacts,
}));

vi.mock('../helpers/user-discovery.js', () => ({
  findUsersByEmails: mocks.findUsersByEmails,
}));

vi.mock('../helpers/google-contacts.js', () => ({
  fetchGoogleContacts: mocks.fetchGoogleContacts,
}));

vi.mock('../helpers/import-contacts-utils.js', () => ({
  buildImportableContacts: mocks.buildImportableContacts,
}));

import { importGoogleContacts } from '../helpers/google-import.js';

describe('importGoogleContacts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.hydrateContacts.mockResolvedValue();
  });

  it('returns importable contacts and reports progress through the import stages', async () => {
    const onProgress = vi.fn();
    const googleContacts = [{ email: 'alice@example.com', name: 'Alice' }];
    const savedContacts = { user_1: { contactId: 'user_1' } };
    const registeredUsers = [{ uid: 'user_1', email: 'alice@example.com' }];
    const importableContacts = [
      { email: 'alice@example.com', user: registeredUsers[0] },
    ];

    mocks.requestContactsAccess.mockResolvedValue('token-123');
    mocks.fetchGoogleContacts.mockResolvedValue(googleContacts);
    mocks.getAllContacts.mockReturnValue(savedContacts);
    mocks.findUsersByEmails.mockResolvedValue(registeredUsers);
    mocks.getUser.mockReturnValue({ uid: 'me' });
    mocks.buildImportableContacts.mockReturnValue(importableContacts);

    await expect(importGoogleContacts({ onProgress })).resolves.toEqual({
      status: 'success',
      contacts: importableContacts,
    });

    expect(onProgress.mock.calls).toEqual([
      [{ step: 'requesting' }],
      [{ step: 'fetching' }],
      [{ step: 'checking', count: 1 }],
    ]);
    expect(mocks.hydrateContacts).toHaveBeenCalled();
    expect(mocks.buildImportableContacts).toHaveBeenCalledWith({
      contacts: googleContacts,
      registeredUsers,
      savedContactIds: new Set(['user_1']),
      currentUserId: 'me',
    });
  });

  it('returns cancelled when authorization is cancelled', async () => {
    mocks.requestContactsAccess.mockRejectedValue(
      new Error('Authorization cancelled'),
    );

    await expect(importGoogleContacts()).resolves.toEqual({
      status: 'cancelled',
      contacts: [],
    });
    expect(mocks.fetchGoogleContacts).not.toHaveBeenCalled();
    expect(mocks.getAllContacts).not.toHaveBeenCalled();
  });
});
