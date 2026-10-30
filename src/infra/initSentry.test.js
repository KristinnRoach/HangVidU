import { describe, expect, it, vi } from 'vite-plus/test';

// Importing the module runs Sentry.init; these tests only need the helpers.
vi.mock('@sentry/browser');

import { redactEmails, redactEventEmails } from './initSentry.js';

describe('redactEventEmails', () => {
  it('strips addresses from message, exceptions and breadcrumbs', () => {
    const event = redactEventEmails({
      message: 'no user a@b.com',
      logentry: { message: 'no user a@b.com' },
      exception: { values: [{ value: 'lookup failed for a@b.com' }] },
      breadcrumbs: [
        {
          message: 'warn a@b.com',
          data: { arguments: ['[lookup]', 'a@b.com', 3] },
        },
        { category: 'navigation' },
      ],
    });
    expect(JSON.stringify(event)).not.toContain('a@b.com');
    expect(event.breadcrumbs[0].data.arguments).toEqual([
      '[lookup]',
      '[redacted-email]',
      3,
    ]);
  });
});

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
