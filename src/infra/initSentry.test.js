import { describe, expect, it } from 'vite-plus/test';

import { redactEmails } from './initSentry.js';

describe('redactEmails', () => {
  it('strips addresses out of log messages', () => {
    expect(
      redactEmails('[USER DISCOVERY] no user for a.b+tag@example.co.uk'),
    ).toBe('[USER DISCOVERY] no user for [redacted-email]');
  });

  it('strips every address, not just the first', () => {
    expect(redactEmails('one@a.com and two@b.com')).toBe(
      '[redacted-email] and [redacted-email]',
    );
  });

  it('leaves non-strings and email-free text alone', () => {
    expect(redactEmails('[main] cleanup failed')).toBe('[main] cleanup failed');
    expect(redactEmails(42)).toBe(42);
    expect(redactEmails(undefined)).toBe(undefined);
  });
});
