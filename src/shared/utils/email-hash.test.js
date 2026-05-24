import { describe, expect, it } from 'vitest';
import { hashEmail } from './email-hash.js';

function serverHashEmail(email) {
  return Buffer.from(email.toLowerCase().trim())
    .toString('base64')
    .replace(/\//g, '-');
}

describe('hashEmail', () => {
  it('creates a consistent hash for the same email', () => {
    const email = 'test@example.com';
    expect(hashEmail(email)).toBe(hashEmail(email));
  });

  it('normalizes email case and whitespace', () => {
    expect(hashEmail('  Test@Example.COM ')).toBe(
      hashEmail('test@example.com'),
    );
  });

  it('produces Firebase-safe keys', () => {
    expect(hashEmail('test@example.com')).not.toContain('/');
  });

  it('matches the server-side delete-account hash algorithm', () => {
    const cases = [
      'user@example.com',
      'User@Example.COM',
      '  user@example.com  ',
      'test+tag@gmail.com',
      'unicode@exämple.com',
      'a@b.c',
    ];

    for (const email of cases) {
      expect(hashEmail(email)).toBe(serverHashEmail(email));
    }
  });
});
