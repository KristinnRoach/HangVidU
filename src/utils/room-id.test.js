// src/utils/room-id.test.js
// Tests for deterministic room ID generation

import { describe, it, expect } from 'vitest';
import { getDeterministicRoomId } from './room-id.js';

describe('getDeterministicRoomId', () => {
  it('should generate the same room ID for same user pair regardless of order', () => {
    const userId1 = 'user123';
    const userId2 = 'user456';

    const roomId1 = getDeterministicRoomId(userId1, userId2);
    const roomId2 = getDeterministicRoomId(userId2, userId1);

    expect(roomId1).toBe(roomId2);
  });

  it('should generate consistent room IDs across multiple calls', () => {
    const userId1 = 'alice';
    const userId2 = 'bob';

    const roomId1 = getDeterministicRoomId(userId1, userId2);
    const roomId2 = getDeterministicRoomId(userId1, userId2);
    const roomId3 = getDeterministicRoomId(userId2, userId1);

    expect(roomId1).toBe(roomId2);
    expect(roomId1).toBe(roomId3);
  });

  it('should generate different room IDs for different user pairs', () => {
    const roomId1 = getDeterministicRoomId('user1', 'user2');
    const roomId2 = getDeterministicRoomId('user1', 'user3');
    const roomId3 = getDeterministicRoomId('user2', 'user3');

    expect(roomId1).not.toBe(roomId2);
    expect(roomId1).not.toBe(roomId3);
    expect(roomId2).not.toBe(roomId3);
  });

  it('should return a string of exactly 16 characters', () => {
    const roomId = getDeterministicRoomId('user123', 'user456');

    expect(roomId).toBeTruthy();
    expect(typeof roomId).toBe('string');
    expect(roomId.length).toBe(16);
  });

  it('should throw error if either user ID is missing', () => {
    expect(() => getDeterministicRoomId('', 'user2')).toThrow();
    expect(() => getDeterministicRoomId('user1', '')).toThrow();
    expect(() => getDeterministicRoomId(null, 'user2')).toThrow();
    expect(() => getDeterministicRoomId('user1', null)).toThrow();
  });

  it('should throw error if both user IDs are the same', () => {
    expect(() => getDeterministicRoomId('user1', 'user1')).toThrow();
  });

  it('should handle Firebase user IDs correctly', () => {
    const firebaseUid1 = 'abc123xyz789def456';
    const firebaseUid2 = 'xyz789abc123def456';

    const roomId1 = getDeterministicRoomId(firebaseUid1, firebaseUid2);
    const roomId2 = getDeterministicRoomId(firebaseUid2, firebaseUid1);

    expect(roomId1).toBe(roomId2);
    expect(roomId1.length).toBe(16);
  });
});
