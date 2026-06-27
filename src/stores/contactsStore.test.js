import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const repo = {
    list: vi.fn(),
    patch: vi.fn(),
  };

  return {
    auth: {
      isLoggedIn: true,
      userId: 'user-1',
      token: 'token',
    },
    repo,
  };
});

vi.mock('../auth/index.js', () => ({
  getIsLoggedIn: () => mocks.auth.isLoggedIn,
  getLoggedInUserId: () => mocks.auth.userId,
  getLoggedInUserToken: () => mocks.auth.token,
}));

vi.mock('../infra/hangvidu-api-url', () => ({
  getHangViduApiBaseUrl: () => 'https://example.test',
}));

vi.mock('../storage/contacts/index.js', () => ({
  createContactsD1Repository: () => mocks.repo,
  createContactsLocalStorageRepository: () => mocks.repo,
}));

function contact(contactId, conversationId) {
  return {
    contactId,
    conversationId,
    nickname: contactId,
    displayName: contactId,
    username: contactId,
    savedAt: 1,
    lastInteractionAt: 1,
  };
}

function deferred() {
  let resolve;
  const promise = new Promise((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

describe('contactsStore', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    mocks.auth.isLoggedIn = true;
    mocks.auth.userId = 'user-1';
  });

  it('does not reuse cached contacts after logout in handleHangUp', async () => {
    mocks.repo.list.mockResolvedValue([contact('contact-1', 'old-conv')]);
    const store = await import('./contactsStore.js');

    await store.hydrateContacts();
    mocks.auth.isLoggedIn = false;
    mocks.auth.userId = null;

    await expect(store.handleHangUp('contact-1', 'new-conv')).resolves.toEqual({
      action: 'skip',
      reason: 'not-logged-in',
    });
    expect(mocks.repo.patch).not.toHaveBeenCalled();
  });

  it('does not pin an invalidated hydrate promise across account changes', async () => {
    const staleHydrate = deferred();
    mocks.repo.list
      .mockReturnValueOnce(staleHydrate.promise)
      .mockResolvedValueOnce([contact('contact-1', 'conv-1')])
      .mockResolvedValueOnce([contact('contact-2', 'conv-2')]);

    const store = await import('./contactsStore.js');
    const hydrate = store.hydrateContacts();

    await Promise.resolve();
    await store.reloadContacts();
    mocks.auth.userId = 'user-2';
    staleHydrate.resolve([contact('stale-contact', 'stale-conv')]);
    await hydrate;
    await store.hydrateContacts();

    expect(mocks.repo.list).toHaveBeenCalledTimes(3);
  });
});
