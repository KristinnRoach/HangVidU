import { afterEach, describe, expect, it, vi } from 'vite-plus/test';
import * as Sentry from '@sentry/browser';

// Importing the module runs Sentry.init; these tests only need the helpers.
vi.mock('@sentry/browser');
vi.mock('@shared/events/index.js', () => ({ subscribe: vi.fn() }));

import { redactEmails, redactEventEmails } from './initSentry.js';

afterEach(() => {
  vi.unstubAllEnvs();
});

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

  it('sanitizes nested recipients, encoded email fields and errors without mutating the input', () => {
    const email = 'contact@example.com';
    const encoded = btoa(email);
    const recipients = [
      { email, emailHash: encoded, error: new Error(`failed for ${email}`) },
    ];
    const shared = { recipients };
    const event = redactEventEmails({
      breadcrumbs: [{ data: { arguments: [shared] } }],
      extra: shared,
      contexts: { lookup: { emailHash: encoded } },
    });
    const output = JSON.stringify(event);
    expect(output).not.toContain(email);
    expect(output).not.toContain(encoded);
    expect(event.extra.recipients[0].error.message).toBe(
      'failed for [redacted-email]',
    );
    expect(event.breadcrumbs[0].data.arguments[0]).toEqual(event.extra);
    expect(recipients[0].email).toBe(email);
  });

  it('redacts query values in request breadcrumbs, navigation and event URLs', () => {
    const encoded = btoa('contact@example.com');
    const url = `https://api.example.com/users/lookup?emailHash=${encoded}&limit=10`;
    const event = redactEventEmails({
      request: { url },
      breadcrumbs: [
        { category: 'fetch', data: { url, method: 'GET', status_code: 503 } },
        {
          category: 'navigation',
          data: { to: '/?email=contact%40example.com' },
        },
      ],
      extra: { attachment: '/files/object?key=private-object-key' },
    });
    expect(JSON.stringify(event)).not.toContain(encoded);
    expect(event.request.url).toBe(
      'https://api.example.com/users/lookup?emailHash=[redacted]&limit=[redacted]',
    );
    expect(event.breadcrumbs[0].data).toMatchObject({
      method: 'GET',
      status_code: 503,
    });
    expect(event.breadcrumbs[1].data.to).toBe('/?email=[redacted]');
    expect(event.extra.attachment).toBe('/files/object?key=[redacted]');
  });

  it('bounds cycles, deep nesting and wide diagnostic collections', () => {
    const cyclic = { email: 'contact@example.com' };
    cyclic.self = cyclic;
    let deep = { email: 'contact@example.com' };
    for (let i = 0; i < 20; i++) deep = { child: deep };
    const result = redactEventEmails({
      cyclic,
      deep,
      wide: Array(200).fill('contact@example.com'),
    });
    expect(result.cyclic.self).toBe('[circular]');
    expect(result.wide).toHaveLength(100);
    expect(JSON.stringify(result)).not.toContain('contact@example.com');
    expect(JSON.stringify(result)).toContain('[truncated]');
  });

  it('limits total work for broad, deeply nested input', () => {
    const branch = Array.from({ length: 100 }, () => ({
      email: 'contact@example.com',
    }));
    const result = redactEventEmails(Array(100).fill(branch));
    expect(JSON.stringify(result)).toContain('[truncated]');
    expect(JSON.stringify(result)).not.toContain('contact@example.com');
  });

  it('retains useful error metadata while sanitizing property names', () => {
    const result = redactEventEmails({
      event_id: 'opaque-event-id',
      tags: { failure: 'server' },
      extra: {
        status: 503,
        fileSizeBytes: 42,
        'contact@example.com': 'recipient',
      },
    });
    expect(result).toMatchObject({
      event_id: 'opaque-event-id',
      tags: { failure: 'server' },
      extra: { status: 503, fileSizeBytes: 42 },
    });
    expect(result.extra['[redacted-email]']).toBe('recipient');
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

  it('removes encoded query values even from log messages and encoded parameter names', () => {
    expect(
      redactEmails(
        'GET /users/lookup?email%48ash=c2VjcmV0&email=contact%40example.com -> 503',
      ),
    ).toBe('GET /users/lookup?email%48ash=[redacted]&email=[redacted] -> 503');
  });
});

describe('Sentry privacy hooks', () => {
  it('sanitizes errors, structured logs and request traces before sending', async () => {
    vi.stubEnv('VITE_SENTRY_DSN', 'https://public@example.invalid/1');
    vi.resetModules();
    await import('./initSentry.js');
    const options = Sentry.init.mock.calls.at(-1)[0];
    const email = 'contact@example.com';
    const encoded = btoa(email);
    for (const hook of ['beforeSend', 'beforeSendLog', 'beforeSendSpan']) {
      const result = options[hook]({
        message: `GET /users/lookup?emailHash=${encoded}`,
        attributes: { recipients: [{ email }] },
        data: {
          'url.full': `https://api.example.com/users/lookup?emailHash=${encoded}`,
        },
      });
      expect(JSON.stringify(result)).not.toContain(email);
      expect(JSON.stringify(result)).not.toContain(encoded);
    }
  });
});
