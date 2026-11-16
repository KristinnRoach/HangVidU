import { beforeEach, describe, expect, it, vi } from 'vite-plus/test';

const mocks = vi.hoisted(() => ({
  requestContactsAccess: vi.fn(),
  getLoggedInUserId: vi.fn(),
  getAuthState: vi.fn(() => ({ user: null })),
  getAllContacts: vi.fn(),
  hydrateContacts: vi.fn(),
  findRegisteredUsersByEmails: vi.fn(),
  fetchGoogleContacts: vi.fn(),
  buildImportableContacts: vi.fn(),
}));

vi.mock('../../../auth/index.js', () => ({
  getLoggedInUserId: mocks.getLoggedInUserId,
  getAuthState: mocks.getAuthState,
}));

vi.mock('../../../shared/utils/google/gis-tokens.js', () => ({
  requestContactsAccess: mocks.requestContactsAccess,
}));

vi.mock('../../../stores/contacts-store.js', () => ({
  getAllContacts: mocks.getAllContacts,
  hydrateContacts: mocks.hydrateContacts,
}));

vi.mock('../../../stores/user-profile-store.js', () => ({
  findRegisteredUsersByEmails: mocks.findRegisteredUsersByEmails,
}));

vi.mock('../../../shared/utils/google/google-contacts.js', () => ({
  fetchGoogleContacts: mocks.fetchGoogleContacts,
}));

vi.mock('./import-contacts-utils.js', () => ({
  buildImportableContacts: mocks.buildImportableContacts,
}));

import { importGoogleContacts } from './google-import.js';

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
    mocks.findRegisteredUsersByEmails.mockResolvedValue(registeredUsers);
    mocks.getLoggedInUserId.mockReturnValue('me');
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
