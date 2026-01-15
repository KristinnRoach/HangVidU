// src/contacts/user-discovery.test.js
// Tests for user discovery system

import { describe, it, expect } from 'vitest';
import { hashEmail } from './user-discovery.js';

describe('user-discovery', () => {
  describe('hashEmail', () => {
    it('should hash email addresses consistently', () => {
      const email = 'test@example.com';
      const hash1 = hashEmail(email);
      const hash2 = hashEmail(email);
      
      expect(hash1).toBe(hash2);
      expect(hash1).toBeTruthy();
      expect(hash1.length).toBeGreaterThan(0);
    });

    it('should normalize emails to lowercase', () => {
      const hash1 = hashEmail('Test@Example.com');
      const hash2 = hashEmail('test@example.com');
      
      expect(hash1).toBe(hash2);
    });

    it('should trim whitespace from emails', () => {
      const hash1 = hashEmail('  test@example.com  ');
      const hash2 = hashEmail('test@example.com');
      
      expect(hash1).toBe(hash2);
    });

    it('should replace Firebase-incompatible characters', () => {
      const hash = hashEmail('test@example.com');
      
      // Should not contain Firebase-incompatible characters
      expect(hash).not.toMatch(/[\.\$#\[\]\/]/);
    });

    it('should throw error for invalid input', () => {
      expect(() => hashEmail('')).toThrow();
      expect(() => hashEmail(null)).toThrow();
      expect(() => hashEmail(undefined)).toThrow();
    });

    it('should produce different hashes for different emails', () => {
      const hash1 = hashEmail('user1@example.com');
      const hash2 = hashEmail('user2@example.com');
      
      expect(hash1).not.toBe(hash2);
    });
  });
});
