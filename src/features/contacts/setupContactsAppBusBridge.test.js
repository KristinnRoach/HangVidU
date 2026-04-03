import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const listeners = new Map();

  return {
    listeners,
    contactsBus: {
      on: vi.fn((eventName, handler) => {
        listeners.set(eventName, handler);
        return () => listeners.delete(eventName);
      }),
    },
    appBus: {
      emitAsync: vi.fn().mockResolvedValue(undefined),
    },
  };
});

vi.mock('./contacts-bus.js', () => ({
  CONTACTS_EVENTS: {
    SAVED: 'contact:saved',
    UPDATED: 'contact:updated',
    DELETED: 'contact:deleted',
  },
  contactsBus: mocks.contactsBus,
}));

vi.mock('../../app/app-bus.js', () => ({
  appBus: mocks.appBus,
}));

describe('setupContactsAppBusBridge', () => {
  beforeEach(() => {
    mocks.listeners.clear();
    mocks.contactsBus.on.mockClear();
    mocks.appBus.emitAsync.mockReset().mockResolvedValue(undefined);
  });

  it('forwards saved contacts with room ids to appBus room creation events', async () => {
    const { setupContactsAppBusBridge } = await import(
      './setupContactsAppBusBridge.js'
    );

    const teardown = setupContactsAppBusBridge();

    await mocks.listeners.get('contact:saved')({
      contact: {
        contactId: 'u1',
        roomId: 'room-1',
      },
    });

    expect(mocks.appBus.emitAsync).toHaveBeenCalledWith('room:id:created', {
      roomId: 'room-1',
    });

    teardown();
  });

  it('forwards room changes on contact updates to appBus', async () => {
    const { setupContactsAppBusBridge } = await import(
      './setupContactsAppBusBridge.js'
    );

    const teardown = setupContactsAppBusBridge();

    await mocks.listeners.get('contact:updated')({
      contact: {
        contactId: 'u1',
        contactName: 'Alice',
        roomId: 'room-2',
      },
      previousRoomId: 'room-1',
    });

    expect(mocks.appBus.emitAsync).toHaveBeenCalledWith('room:id:updated', {
      contactId: 'u1',
      contactName: 'Alice',
      roomId: 'room-2',
      previousRoomId: 'room-1',
    });

    teardown();
  });

  it('does not forward unchanged room ids on contact updates', async () => {
    const { setupContactsAppBusBridge } = await import(
      './setupContactsAppBusBridge.js'
    );

    const teardown = setupContactsAppBusBridge();

    await mocks.listeners.get('contact:updated')({
      contact: {
        contactId: 'u1',
        contactName: 'Alice',
        roomId: 'room-1',
      },
      previousRoomId: 'room-1',
    });

    expect(mocks.appBus.emitAsync).not.toHaveBeenCalled();

    teardown();
  });

  it('forwards deleted contacts to appBus compatibility events', async () => {
    const { setupContactsAppBusBridge } = await import(
      './setupContactsAppBusBridge.js'
    );

    const teardown = setupContactsAppBusBridge();

    await mocks.listeners.get('contact:deleted')({
      contactId: 'u1',
      roomId: 'room-1',
    });

    expect(mocks.appBus.emitAsync).toHaveBeenCalledWith('contact:deleted', {
      contactId: 'u1',
      roomId: 'room-1',
    });

    teardown();
  });
});
