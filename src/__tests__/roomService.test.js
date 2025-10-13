// roomService.test.js
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as roomService from '../services/roomService.js';

// Mock db
const mockRef = () => ({
  set: vi.fn().mockResolvedValue(),
  once: vi.fn().mockResolvedValue({
    exists: () => true,
    val: () => ({ offer: { type: 'offer', sdp: 'sdp' } }),
  }),
  remove: vi.fn().mockResolvedValue(),
});

vi.mock('./firebaseService.js', () => ({
  db: {
    ref: vi.fn(() => mockRef()),
  },
}));

describe('roomService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('createRoom sets offer in db', async () => {
    const offer = { type: 'offer', sdp: 'sdp' };
    const roomId = 'testRoom';
    const roomRef = await roomService.createRoom(roomId, offer);
    expect(roomRef.set).toHaveBeenCalledWith({
      offer: { type: 'offer', sdp: 'sdp' },
    });
  });

  it('joinRoom returns roomRef and snapshot', async () => {
    const roomId = 'testRoom';
    const { roomRef, roomSnapshot } = await roomService.joinRoom(roomId);
    expect(roomRef.once).toHaveBeenCalledWith('value');
    expect(roomSnapshot.exists()).toBe(true);
    expect(roomSnapshot.val()).toEqual({
      offer: { type: 'offer', sdp: 'sdp' },
    });
  });

  it('removeRoom removes the room from db', async () => {
    const roomId = 'testRoom';
    await expect(roomService.removeRoom(roomId)).resolves.toBeUndefined();
  });
});
