import { describe, it, expect } from 'vitest';
import { hashEmail as clientHashEmail } from '../shared/storage/user/user-discovery.js';

/**
 * Server-side hashEmail from functions/account/delete-account-handler.js
 * duplicated here to verify both sides produce the same output.
 * If this test breaks, the server and client implementations have diverged.
 */
function serverHashEmail(email) {
  const normalized = email.toLowerCase().trim();
  // Node Buffer.from(...).toString('base64') equivalent using browser APIs
  let binary = '';
  for (const b of new TextEncoder().encode(normalized))
    binary += String.fromCharCode(b);
  return btoa(binary).replace(/\//g, '-');
}

describe('hashEmail consistency (client vs server)', () => {
  const cases = [
    'user@example.com',
    'User@Example.COM',
    '  user@example.com  ',
    'test+tag@gmail.com',
    'unicode@exämple.com',
    'a@b.c',
  ];

  for (const email of cases) {
    it(`produces same hash for "${email}"`, () => {
      expect(clientHashEmail(email)).toBe(serverHashEmail(email));
    });
  }
});
