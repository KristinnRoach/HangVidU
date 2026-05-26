import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  ref: vi.fn((_database, path) => ({ path: path ?? null })),
  remove: vi.fn(() => Promise.resolve()),
  update: vi.fn(() => Promise.resolve()),
}));

vi.mock('firebase/database', () => ({
  ref: mocks.ref,
  remove: mocks.remove,
  update: mocks.update,
}));

import { RoomAccessRTDBAdapter } from './room-access-rtdb-adapter.js';

describe('RoomAccessRTDBAdapter', () => {
  let adapter;

  beforeEach(() => {
    vi.clearAllMocks();
    adapter = new RoomAccessRTDBAdapter({ database: {} });
  });

  it('creates room metadata and participant authorization records in a single atomic write', async () => {
    await adapter.createRoomAccess({
      roomId: 'room-1',
      createdBy: 'caller-1',
      participants: ['callee-1'],
      createdAt: 123,
      expiresAt: 456,
    });

    expect(mocks.update).toHaveBeenCalledTimes(1);
    expect(mocks.update).toHaveBeenCalledWith(
      { path: null },
      {
        'rooms/room-1/meta/createdBy': 'caller-1',
        'rooms/room-1/meta/createdAt': 123,
        'rooms/room-1/meta/expiresAt': 456,
        'rooms/room-1/participants/caller-1': true,
        'rooms/room-1/participants/callee-1': true,
      },
    );
  });

  it('clears the whole room aggregate', async () => {
    await adapter.clearRoomAccess('room-1');

    expect(mocks.remove).toHaveBeenCalledWith({ path: 'rooms/room-1' });
  });
});
