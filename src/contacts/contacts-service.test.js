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
  appBus: {
    emit: vi.fn(),
    emitAsync: vi.fn().mockResolvedValue(undefined),
  },
}));

vi.mock('../auth/auth-state.js', () => ({
  getIsLoggedIn: () => mocks.auth.loggedIn,
  getLoggedInUserId: () => mocks.auth.ownerId,
}));

vi.mock('../app/app-bus.js', () => ({
  appBus: mocks.appBus,
}));

vi.mock('../storage/fb-rtdb/rtdb.js', () => ({
  rtdb: {},
}));

vi.mock('./storage/index.js', () => ({
  createContactsRTDBStore: vi.fn(() => mocks.store),
  createContactsLocalStore: vi.fn(() => mocks.store),
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
    mocks.appBus.emit.mockReset();
    mocks.appBus.emitAsync.mockReset().mockResolvedValue(undefined);

    vi.restoreAllMocks();
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('saveContact creates and returns a canonical contact record', async () => {
    const { ContactsService } = await import('./contacts-service.js');
    const service = new ContactsService();
    const contact = {
      contactId: 'u1',
      contactName: 'Alice',
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
      contactName: 'Alice',
      roomId: 'room-1',
      savedAt: expect.any(Number),
      lastInteractionAt: expect.any(Number),
    });

    expect(mocks.appBus.emitAsync).toHaveBeenCalledWith('room:id:created', {
      roomId: 'room-1',
    });
  });

  it('saveContact preserves timestamps for an existing contact', async () => {
    const { ContactsService } = await import('./contacts-service.js');
    const service = new ContactsService();
    const existing = {
      contactId: 'u1',
      contactName: 'Before',
      roomId: 'room-1',
      savedAt: 100,
      lastInteractionAt: 200,
    };
    const updated = {
      ...existing,
      contactName: 'After',
    };

    mocks.store.get.mockResolvedValue(existing);
    mocks.store.put.mockResolvedValue(updated);

    const result = await service.saveContact('u1', 'After', 'room-1');

    expect(result).toEqual(updated);
    expect(mocks.store.put).toHaveBeenCalledWith({
      contactId: 'u1',
      contactName: 'After',
      roomId: 'room-1',
      savedAt: 100,
      lastInteractionAt: 200,
    });
  });

  it('updateContact updates an existing contact and returns the updated record', async () => {
    const { ContactsService } = await import('./contacts-service.js');
    const service = new ContactsService();
    const existing = {
      contactId: 'u1',
      contactName: 'Alice',
      roomId: 'room-1',
      savedAt: 100,
      lastInteractionAt: 200,
    };
    const updated = {
      ...existing,
      contactName: 'Alice B',
      roomId: 'room-2',
    };

    mocks.store.get.mockResolvedValue(existing);
    mocks.store.patch.mockResolvedValue(updated);

    const result = await service.updateContact('u1', 'Alice B', 'room-2');

    expect(result).toEqual(updated);
    expect(mocks.store.patch).toHaveBeenCalledWith('u1', {
      contactName: 'Alice B',
      roomId: 'room-2',
    });

    expect(mocks.appBus.emitAsync).toHaveBeenCalledWith('room:id:updated', {
      contactId: 'u1',
      contactName: 'Alice B',
      roomId: 'room-2',
      previousRoomId: 'room-1',
    });
  });

  it('updateContact returns null when the contact does not exist', async () => {
    const { ContactsService } = await import('./contacts-service.js');
    const service = new ContactsService();

    mocks.store.get.mockResolvedValue(null);

    const result = await service.updateContact('missing', 'Alice', 'room-1');

    expect(result).toBeNull();
    expect(mocks.store.patch).not.toHaveBeenCalled();
    expect(mocks.store.put).not.toHaveBeenCalled();
    expect(mocks.appBus.emitAsync).not.toHaveBeenCalled();
  });

  it('deleteContact returns true when deleted and emits compatibility event', async () => {
    const { ContactsService } = await import('./contacts-service.js');
    const service = new ContactsService();
    const existing = {
      contactId: 'u1',
      contactName: 'Alice',
      roomId: 'room-1',
      savedAt: 1,
      lastInteractionAt: 1,
    };

    mocks.store.get.mockResolvedValue(existing);
    mocks.store.remove.mockResolvedValue(true);

    const result = await service.deleteContact('u1');

    expect(result).toBe(true);
    expect(mocks.appBus.emitAsync).toHaveBeenCalledWith('contact:deleted', {
      contactId: 'u1',
      roomId: 'room-1',
    });
  });

  it('deleteContact returns false when missing', async () => {
    const { ContactsService } = await import('./contacts-service.js');
    const service = new ContactsService();

    mocks.store.get.mockResolvedValue(null);
    mocks.store.remove.mockResolvedValue(false);

    const result = await service.deleteContact('missing');

    expect(result).toBe(false);
    expect(mocks.appBus.emitAsync).not.toHaveBeenCalled();
  });

  it('getAllContacts returns a map keyed by contactId', async () => {
    const { ContactsService } = await import('./contacts-service.js');
    const service = new ContactsService();

    mocks.store.list.mockResolvedValue([
      {
        contactId: 'b',
        contactName: 'Bob',
        roomId: 'r2',
        savedAt: 1,
        lastInteractionAt: 2,
      },
      {
        contactId: 'a',
        contactName: 'Alice',
        roomId: 'r1',
        savedAt: 3,
        lastInteractionAt: 4,
      },
    ]);

    const result = await service.getAllContacts();

    expect(result).toEqual({
      a: {
        contactId: 'a',
        contactName: 'Alice',
        roomId: 'r1',
        savedAt: 3,
        lastInteractionAt: 4,
      },
      b: {
        contactId: 'b',
        contactName: 'Bob',
        roomId: 'r2',
        savedAt: 1,
        lastInteractionAt: 2,
      },
    });
  });

  it('getAllContactsSorted returns contacts sorted by lastInteractionAt then name', async () => {
    const { ContactsService } = await import('./contacts-service.js');
    const service = new ContactsService();

    mocks.store.list.mockResolvedValue([
      {
        contactId: 'b',
        contactName: 'Bob',
        roomId: 'r2',
        savedAt: 1,
        lastInteractionAt: 5,
      },
      {
        contactId: 'a',
        contactName: 'Alice',
        roomId: 'r1',
        savedAt: 1,
        lastInteractionAt: 5,
      },
      {
        contactId: 'c',
        contactName: 'Cara',
        roomId: 'r3',
        savedAt: 1,
        lastInteractionAt: 1,
      },
    ]);

    const result = await service.getAllContactsSorted();

    expect(result.map((contact) => contact.contactId)).toEqual(['a', 'b', 'c']);
  });

  it('getContactByRoomId returns the matching record or null', async () => {
    const { ContactsService } = await import('./contacts-service.js');
    const service = new ContactsService();

    mocks.store.list.mockResolvedValue([
      {
        contactId: 'u1',
        contactName: 'Alice',
        roomId: 'room-1',
        savedAt: 1,
        lastInteractionAt: 1,
      },
    ]);

    await expect(service.getContactByRoomId('room-1')).resolves.toEqual({
      contactId: 'u1',
      contactName: 'Alice',
      roomId: 'room-1',
      savedAt: 1,
      lastInteractionAt: 1,
    });
    await expect(service.getContactByRoomId('missing')).resolves.toBeNull();
  });

  it('updateLastInteraction returns null for guest mode and does not patch', async () => {
    const { ContactsService } = await import('./contacts-service.js');
    const service = new ContactsService();

    mocks.auth.loggedIn = false;
    mocks.auth.ownerId = null;

    const result = await service.updateLastInteraction('u1');

    expect(result).toBeNull();
    expect(mocks.store.patch).not.toHaveBeenCalled();
  });

  it('updateLastInteraction patches existing authenticated contacts', async () => {
    const { ContactsService } = await import('./contacts-service.js');
    const service = new ContactsService();
    const updated = {
      contactId: 'u1',
      contactName: 'Alice',
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
    const { ContactsService } = await import('./contacts-service.js');
    const service = new ContactsService();

    mocks.store.list.mockResolvedValue([
      {
        contactId: 'u1',
        contactName: 'Alice',
        roomId: 'room-1',
        savedAt: 1,
        lastInteractionAt: 1,
      },
    ]);

    await expect(service.handleHangUp('u1', 'room-1')).resolves.toEqual({
      action: 'existing',
    });

    mocks.store.list.mockResolvedValue([]);
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
});
