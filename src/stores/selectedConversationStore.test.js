import { beforeEach, describe, expect, it, vi } from 'vite-plus/test';

const mocks = vi.hoisted(() => ({
  getLoggedInUserId: vi.fn(),
  getContactById: vi.fn(),
  cacheContactConversationId: vi.fn(),
  resolveDirectConversationId: vi.fn(),
}));

vi.mock('../auth/index.js', () => ({
  getLoggedInUserId: mocks.getLoggedInUserId,
}));

vi.mock('./contactsStore.js', () => ({
  getContactById: mocks.getContactById,
  cacheContactConversationId: mocks.cacheContactConversationId,
}));

vi.mock('./conversations-client', () => ({
  resolveDirectConversationId: mocks.resolveDirectConversationId,
}));

describe('selectedConversationStore', () => {
  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();

    const storage = new Map();
    vi.stubGlobal('localStorage', {
      getItem: (key) => storage.get(String(key)) ?? null,
      setItem: (key, value) => storage.set(String(key), String(value)),
      removeItem: (key) => storage.delete(String(key)),
    });

    mocks.getLoggedInUserId.mockReturnValue('me');
    mocks.getContactById.mockReturnValue({
      contactId: 'contact-1',
      conversationId: 'conversation-1',
    });
  });

  it('persists the selected contact id for direct opens', async () => {
    const store = await import('./selectedConversationStore.ts');

    await store.openDirectConversation('contact-1', { displayUI: false });

    expect(store.loadSelectedContactId()).toBe('contact-1');
  });

  it('persists direct selections opened from raw selection state', async () => {
    const store = await import('./selectedConversationStore.ts');

    store.open({
      conversationId: 'conversation-1',
      remoteParticipantIds: ['contact-2'],
      displayUI: true,
    });

    expect(store.loadSelectedContactId()).toBe('contact-2');
  });
});
