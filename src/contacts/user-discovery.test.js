// src/contacts/user-discovery.test.js
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { hashEmail, removeUserFromDirectory } from './user-discovery.js';

vi.mock('firebase/database', () => ({
  ref: vi.fn(),
  set: vi.fn(),
  get: vi.fn(),
  remove: vi.fn(() => Promise.resolve()),
}));

vi.mock('../storage/fb-rtdb/rtdb.js', () => ({
  rtdb: {},
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

  describe('removeUserFromDirectory', () => {
    it('should remove user from discovery directory', async () => {
      const { remove } = await import('firebase/database');

      await removeUserFromDirectory('test@example.com');

      expect(remove).toHaveBeenCalled();
    });

    it('should throw error for invalid email', async () => {
      await expect(removeUserFromDirectory('')).rejects.toThrow(
        'Invalid email',
      );
      await expect(removeUserFromDirectory(null)).rejects.toThrow(
        'Invalid email',
      );
    });
  });
});
