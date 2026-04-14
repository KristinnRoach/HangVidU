import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  hashEmail,
  lookupUserByEmail,
  removeFromUserByEmailDirectory,
} from './user-discovery.js';

vi.mock('firebase/database', () => ({
  ref: vi.fn(),
  set: vi.fn(),
  get: vi.fn(),
  remove: vi.fn(() => Promise.resolve()),
}));

vi.mock('../../shared/storage/fb-rtdb/rtdb.js', () => ({
  rtdb: {},
}));

vi.mock('../../auth/index.js', () => ({
  onAuthStateChanged: vi.fn(() => () => {}),
}));

describe('user-discovery', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('hashEmail', () => {
    it('should create consistent hash for same email', () => {
      const email = 'test@example.com';
      const hash1 = hashEmail(email);
      const hash2 = hashEmail(email);
      expect(hash1).toBe(hash2);
    });

    it('should normalize email to lowercase', () => {
      const hash1 = hashEmail('Test@Example.COM');
      const hash2 = hashEmail('test@example.com');
      expect(hash1).toBe(hash2);
    });

    it('should replace forward slashes for Firebase compatibility', () => {
      const hash = hashEmail('test@example.com');
      expect(hash).not.toContain('/');
    });
  });

  describe('removeFromUserByEmailDirectory', () => {
    it('should remove user from discovery directory', async () => {
      const { remove } = await import('firebase/database');

      await removeFromUserByEmailDirectory('test@example.com');

      expect(remove).toHaveBeenCalled();
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
      const { get } = await import('firebase/database');
      get.mockResolvedValue({
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
      const { get } = await import('firebase/database');
      get.mockResolvedValue({
        exists: () => false,
        val: () => null,
      });

      const result = await lookupUserByEmail('missing@example.com');

      expect(result).toEqual({
        status: 'not_found',
        user: null,
      });
    });

    it('returns lookup_error when lookup throws', async () => {
      const { get } = await import('firebase/database');
      const error = new Error('database unavailable');
      get.mockRejectedValue(error);

      const result = await lookupUserByEmail('error@example.com');

      expect(result).toEqual({
        status: 'lookup_error',
        user: null,
        error,
      });
    });
  });
});
