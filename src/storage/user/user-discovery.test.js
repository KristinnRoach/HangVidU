import { describe, it, expect, vi, beforeEach } from 'vitest';

const mocks = vi.hoisted(() => ({
  ref: vi.fn(),
  set: vi.fn(),
  get: vi.fn(),
  remove: vi.fn(() => Promise.resolve()),
}));

vi.mock('firebase/database', () => mocks);

import {
  lookupUserByEmail,
  removeFromUserByEmailDirectory,
} from './user-discovery.js';

vi.mock('../../infra/firebase-rtdb.js', () => ({
  rtdb: {},
}));

vi.mock('../../../auth/index.js', () => ({
  onAuthStateChanged: vi.fn(() => () => {}),
}));

describe('user-discovery', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('removeFromUserByEmailDirectory', () => {
    it('should remove user from discovery directory', async () => {
      await removeFromUserByEmailDirectory('test@example.com');

      expect(mocks.remove).toHaveBeenCalled();
    });

    it('should throw error for invalid email', async () => {
      await expect(removeFromUserByEmailDirectory('')).rejects.toThrow(
        'Invalid email',
      );
      await expect(removeFromUserByEmailDirectory(null)).rejects.toThrow(
        'Invalid email',
      );
    });
  });

  describe('lookupUserByEmail', () => {
    it('returns found when user exists', async () => {
      mocks.get.mockResolvedValue({
        exists: () => true,
        val: () => ({ uid: 'u1', userName: 'Alice' }),
      });

      const result = await lookupUserByEmail('alice@example.com');

      expect(result).toEqual({
        status: 'found',
        user: { uid: 'u1', userName: 'Alice' },
      });
    });

    it('returns not_found when user does not exist', async () => {
      mocks.get.mockResolvedValue({
        exists: () => false,
        val: () => null,
      });

      const result = await lookupUserByEmail('missing@example.com');

      expect(result).toEqual({
        status: 'not_found',
        user: null,
      });
    });

    it('returns not_found for whitespace-only email without lookup', async () => {
      const result = await lookupUserByEmail('   ');

      expect(result).toEqual({
        status: 'not_found',
        user: null,
      });
      expect(mocks.get).not.toHaveBeenCalled();
    });

    it('returns lookup_error when lookup throws', async () => {
      const error = new Error('database unavailable');
      mocks.get.mockRejectedValue(error);

      const result = await lookupUserByEmail('error@example.com');

      expect(result).toEqual({
        status: 'lookup_error',
        user: null,
        error,
      });
    });
  });
});
