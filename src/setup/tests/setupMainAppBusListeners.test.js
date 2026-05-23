import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const handlers = new Map();

  return {
    handlers,
    events: {
      handleCommand: vi.fn((eventName, handler) => {
        handlers.set(eventName, handler);
        return () => handlers.delete(eventName);
      }),
      subscribe: vi.fn((eventName, handler) => {
        handlers.set(eventName, handler);
        return () => handlers.delete(eventName);
      }),
    },
    getContactByRoomId: vi.fn(() => null),
    setUserOffline: vi.fn(() => Promise.resolve()),
    getPushNotifications: vi.fn(() => ({ disable: vi.fn(() => Promise.resolve()) })),
  };
});

vi.mock('../../shared/events/index.js', () => ({
  handleCommand: mocks.events.handleCommand,
  subscribe: mocks.events.subscribe,
}));

vi.mock('../../stores/contactsStore.js', () => ({
  getContactByRoomId: mocks.getContactByRoomId,
}));

vi.mock('../../features/presence/index.js', () => ({
  setUserOffline: mocks.setUserOffline,
}));

vi.mock('../../features/push-notifications/index.js', () => ({
  getPushNotifications: mocks.getPushNotifications,
}));

describe('setupMainAppBusListeners', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    mocks.handlers.clear();
  });

  it('handles the presence offline command through setup wiring', async () => {
    const { setupMainAppBusListeners } =
      await import('../setupMainAppBusListeners.js');

    await setupMainAppBusListeners();
    const handler = mocks.handlers.get('cmd:user:presence:set-offline');

    await handler?.({ userId: 'user-1' });

    expect(mocks.setUserOffline).toHaveBeenCalledWith('user-1');
  });

  it('returns null for the get-by-room-id command when no roomId is supplied', async () => {
    const { setupMainAppBusListeners } =
      await import('../setupMainAppBusListeners.js');

    await setupMainAppBusListeners();
    const handler = mocks.handlers.get('cmd:contacts:contact:get-by-room-id');

    const result = await handler?.({});

    expect(result).toBeNull();
    expect(mocks.getContactByRoomId).not.toHaveBeenCalled();
  });

  it('looks up the contact by room id when a roomId is supplied', async () => {
    mocks.getContactByRoomId.mockReturnValue({ contactId: 'contact-1' });

    const { setupMainAppBusListeners } =
      await import('../setupMainAppBusListeners.js');

    await setupMainAppBusListeners();
    const handler = mocks.handlers.get('cmd:contacts:contact:get-by-room-id');

    const result = await handler?.({ roomId: 'room-123' });

    expect(mocks.getContactByRoomId).toHaveBeenCalledWith('room-123');
    expect(result).toEqual({ contactId: 'contact-1' });
  });
});
