import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  auth: {
    loggedIn: false,
    ownerId: null,
  },
  store: {
    get: vi.fn(),
    list: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    remove: vi.fn(),
  },
  events: {
    publish: vi.fn(),
    handleCommand: vi.fn(),
  },
  state: {
    setState: vi.fn(),
    getAllContacts: vi.fn(() => ({})),
    getContactsIsHydrated: vi.fn(() => false),
  },
}));

vi.mock('../contacts-state.js', () => ({
  setState: mocks.state.setState,
  getAllContacts: mocks.state.getAllContacts,
  getContactsIsHydrated: mocks.state.getContactsIsHydrated,
}));

vi.mock('../../../auth/index.js', () => ({
  getIsLoggedIn: () => mocks.auth.loggedIn,
  getLoggedInUserId: () => mocks.auth.ownerId,
}));

vi.mock('../../../shared/events/index.js', () => ({
  publish: mocks.events.publish,
  handleCommand: mocks.events.handleCommand,
}));

vi.mock('../../../shared/storage/fb-rtdb/rtdb.js', () => ({
  rtdb: {},
}));

vi.mock('../storage/index.js', () => ({
  createContactsRTDBStoreRepository: vi.fn(() => mocks.store),
  createContactsLocalStorageRepository: vi.fn(() => mocks.store),
}));

vi.mock('../../../shared/utils/direct-conversation-id.js', () => ({
  resolveDirectConversationId: (userA, userB) =>
    [userA, userB].sort().join('_'),
  resolveContactIdFromDirectConversationId: (conversationId, myUserId) =>
    conversationId.split('_').find((id) => id !== myUserId) ?? null,
}));

describe('contacts-service', () => {
  beforeEach(() => {
    mocks.auth.loggedIn = false;
    mocks.auth.ownerId = null;

    mocks.store.get.mockReset();
    mocks.store.list.mockReset();
    mocks.store.put.mockReset();
    mocks.store.patch.mockReset();
    mocks.store.remove.mockReset();
    mocks.events.publish.mockReset();
    mocks.events.handleCommand.mockReset();
    mocks.state.setState.mockReset();
    mocks.state.getAllContacts.mockReset().mockReturnValue({});
    mocks.state.getContactsIsHydrated.mockReset().mockReturnValue(false);

    vi.restoreAllMocks();
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('saveContact creates and returns a canonical contact record', async () => {
    const { ContactsService } = await import('../contacts-service.js');
    const service = new ContactsService();
    const contact = {
      contactId: 'u1',
      contactNickName: 'Alice',
      roomId: 'room-1',
      savedAt: 10,
      lastInteractionAt: 10,
    };

    mocks.store.get.mockResolvedValue(null);
    mocks.store.put.mockResolvedValue(contact);

    const result = await service.saveContact('u1', 'Alice', 'room-1');

    expect(result).toEqual(contact);
    expect(mocks.store.put).toHaveBeenCalledWith({
      contactId: 'u1',
      contactNickName: 'Alice',
      roomId: 'room-1',
      conversationId: null,
      savedAt: expect.any(Number),
      lastInteractionAt: expect.any(Number),
    });

    expect(mocks.events.publish).toHaveBeenCalledWith(
      'evt:contacts:room:created',
      {
        roomId: 'room-1',
      },
    );
  });

  it('saveContact preserves timestamps for an existing contact', async () => {
    const { ContactsService } = await import('../contacts-service.js');
    const service = new ContactsService();
    const existing = {
      contactId: 'u1',
      contactNickName: 'Before',
      roomId: 'room-1',
      savedAt: 100,
      lastInteractionAt: 200,
    };
    const updated = {
      ...existing,
      contactNickName: 'After',
    };

    mocks.store.get.mockResolvedValue(existing);
    mocks.store.put.mockResolvedValue(updated);

    const result = await service.saveContact('u1', 'After', 'room-1');

    expect(result).toEqual(updated);
    expect(mocks.store.put).toHaveBeenCalledWith({
      contactId: 'u1',
      contactNickName: 'After',
      roomId: 'room-1',
      conversationId: null,
      savedAt: 100,
      lastInteractionAt: 200,
    });
  });

  it('saveContact stores direct conversationId for authenticated users', async () => {
    const { ContactsService } = await import('../contacts-service.js');
    const service = new ContactsService();

    mocks.auth.ownerId = 'me';
    mocks.store.get.mockResolvedValue(null);
    mocks.store.put.mockResolvedValue({
      contactId: 'u1',
      contactNickName: 'Alice',
      roomId: 'room-1',
      conversationId: 'me_u1',
      savedAt: 1,
      lastInteractionAt: 1,
    });

    await service.saveContact('u1', 'Alice', 'room-1');

    expect(mocks.store.put).toHaveBeenCalledWith({
      contactId: 'u1',
      contactNickName: 'Alice',
      roomId: 'room-1',
      conversationId: 'me_u1',
      savedAt: expect.any(Number),
      lastInteractionAt: expect.any(Number),
    });
  });

  it('updateContact updates an existing contact and returns the updated record', async () => {
    const { ContactsService } = await import('../contacts-service.js');
    const service = new ContactsService();
    const existing = {
      contactId: 'u1',
      contactNickName: 'Alice',
      roomId: 'room-1',
      savedAt: 100,
      lastInteractionAt: 200,
    };
    const updated = {
      ...existing,
      contactNickName: 'Alice B',
      roomId: 'room-2',
    };

    mocks.store.get.mockResolvedValue(existing);
    mocks.store.patch.mockResolvedValue(updated);

    const result = await service.updateContact('u1', 'Alice B', 'room-2');

    expect(result).toEqual(updated);
    expect(mocks.store.patch).toHaveBeenCalledWith('u1', {
      contactNickName: 'Alice B',
      roomId: 'room-2',
    });

    expect(mocks.events.publish).toHaveBeenCalledWith(
      'evt:contacts:room:updated',
      {
        contactId: 'u1',
        contactNickName: 'Alice B',
        roomId: 'room-2',
        previousRoomId: 'room-1',
      },
    );
  });

  it('updateContact returns null when the contact does not exist', async () => {
    const { ContactsService } = await import('../contacts-service.js');
    const service = new ContactsService();

    mocks.store.get.mockResolvedValue(null);

    const result = await service.updateContact('missing', 'Alice', 'room-1');

    expect(result).toBeNull();
    expect(mocks.store.patch).not.toHaveBeenCalled();
    expect(mocks.store.put).not.toHaveBeenCalled();
    expect(mocks.events.publish).not.toHaveBeenCalled();
  });

  it('deleteContact returns true when deleted and publishes contact deletion', async () => {
    const { ContactsService } = await import('../contacts-service.js');
    const service = new ContactsService();
    const existing = {
      contactId: 'u1',
      contactNickName: 'Alice',
      roomId: 'room-1',
      savedAt: 1,
      lastInteractionAt: 1,
    };

    mocks.store.get.mockResolvedValue(existing);
    mocks.store.remove.mockResolvedValue(true);

    const result = await service.deleteContact('u1');

    expect(result).toBe(true);
    expect(mocks.events.publish).toHaveBeenCalledWith(
      'evt:contacts:contact:deleted',
      {
        contactId: 'u1',
        roomId: 'room-1',
      },
    );
  });

  it('deleteContact returns false when missing', async () => {
    const { ContactsService } = await import('../contacts-service.js');
    const service = new ContactsService();

    mocks.store.get.mockResolvedValue(null);
    mocks.store.remove.mockResolvedValue(false);

    const result = await service.deleteContact('missing');

    expect(result).toBe(false);
    expect(mocks.events.publish).not.toHaveBeenCalled();
  });

  it('updateLastInteraction returns null for guest mode and does not patch', async () => {
    const { ContactsService } = await import('../contacts-service.js');
    const service = new ContactsService();

    mocks.auth.loggedIn = false;
    mocks.auth.ownerId = null;

    const result = await service.updateLastInteraction('u1');

    expect(result).toBeNull();
    expect(mocks.store.patch).not.toHaveBeenCalled();
  });

  it('updateLastInteraction patches existing authenticated contacts', async () => {
    const { ContactsService } = await import('../contacts-service.js');
    const service = new ContactsService();
    const updated = {
      contactId: 'u1',
      contactNickName: 'Alice',
      roomId: 'room-1',
      savedAt: 1,
      lastInteractionAt: 99,
    };

    mocks.auth.loggedIn = true;
    mocks.auth.ownerId = 'me';
    mocks.store.patch.mockResolvedValue(updated);

    const result = await service.updateLastInteraction('u1');

    expect(result).toEqual(updated);
    expect(mocks.store.patch).toHaveBeenCalledWith('u1', {
      lastInteractionAt: expect.any(Number),
    });
  });

  it('handleHangUp returns existing, skip, or prompt-save decisions', async () => {
    const { ContactsService } = await import('../contacts-service.js');
    const service = new ContactsService();

    mocks.state.getContactsIsHydrated.mockReturnValue(true);
    mocks.state.getAllContacts.mockReturnValue({
      u1: {
        contactId: 'u1',
        contactNickName: 'Alice',
        roomId: 'room-1',
        savedAt: 1,
        lastInteractionAt: 1,
      },
    });

    await expect(service.handleHangUp('u1', 'room-1')).resolves.toEqual({
      action: 'existing',
    });

    mocks.state.getAllContacts.mockReturnValue({});
    mocks.auth.loggedIn = false;
    await expect(service.handleHangUp('u2', 'room-2')).resolves.toEqual({
      action: 'skip',
      reason: 'not-logged-in',
    });

    mocks.auth.loggedIn = true;
    await expect(service.handleHangUp('u2', 'room-2')).resolves.toEqual({
      action: 'prompt-save',
    });
  });

  it('rehydrates when auth scope changes after an earlier guest hydration', async () => {
    const { ensureContactsHydrated } = await import('../contacts-service.js');

    mocks.store.list.mockResolvedValueOnce([]).mockResolvedValueOnce([
      {
        contactId: 'u1',
        contactNickName: 'Alice',
        roomId: 'room-1',
        savedAt: 1,
        lastInteractionAt: 1,
      },
    ]);

    await ensureContactsHydrated();
    expect(mocks.state.setState).toHaveBeenLastCalledWith({
      byId: {},
      isHydrated: true,
    });

    mocks.state.getContactsIsHydrated.mockReturnValue(true);
    mocks.auth.ownerId = 'me';

    await ensureContactsHydrated();

    expect(mocks.state.setState).toHaveBeenLastCalledWith({
      byId: {
        u1: {
          contactId: 'u1',
          contactNickName: 'Alice',
          roomId: 'room-1',
          savedAt: 1,
          lastInteractionAt: 1,
        },
      },
      isHydrated: true,
    });
    expect(mocks.store.list).toHaveBeenCalledTimes(2);
  });
});
