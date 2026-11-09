import * as Sentry from '@sentry/browser';

import { subscribe } from '@shared/events/index.js';

const sentryDsn = import.meta.env.VITE_SENTRY_DSN;
const FILTER_EXTENSION_ASYNC_CHANNEL_ERRORS =
  import.meta.env.VITE_SENTRY_FILTER_EXTENSION_ASYNC_CHANNEL_ERRORS !== '0';

const EXTENSION_ASYNC_CHANNEL_ERROR_TEXT =
  'A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received';

function getEventMessage(event, hint) {
  const sentryMessage = event?.message;
  if (typeof sentryMessage === 'string' && sentryMessage.trim() !== '') {
    return sentryMessage;
  }

  const exceptionValue = event?.exception?.values?.[0]?.value;
  if (typeof exceptionValue === 'string' && exceptionValue.trim() !== '') {
    return exceptionValue;
  }

  const originalExceptionMessage = hint?.originalException?.message;
  if (
    typeof originalExceptionMessage === 'string' &&
    originalExceptionMessage.trim() !== ''
  ) {
    return originalExceptionMessage;
  }

  return '';
}

// Console capture forwards 185-odd call sites to Sentry, and this app looks
// users up by email, so an address can ride along inside a Firebase error.
// Opaque ids (conversation, user) are deliberately left alone: they are not
// PII on their own and Sentry needs them to correlate events.
const EMAIL_PATTERN = /[^\s<>()[\]{}@,;:"]+@[^\s<>()[\]{}@,;:"]+\.[a-z]{2,}/gi;
// Query values can contain reversible email encodings (emailHash), object keys
// or credentials. Keep parameter names for diagnostics without their values.
const QUERY_VALUE_PATTERN = /([?&][^=\s&#?"'<>]+)=([^&#\s"'<>]*)/g;

export function redactEmails(value) {
  return typeof value === 'string'
    ? value
        .replace(QUERY_VALUE_PATTERN, '$1=[redacted]')
        .replace(EMAIL_PATTERN, '[redacted-email]')
    : value;
}

// Console arguments include nested recipient objects. Bound traversal so cyclic
// or unexpectedly large diagnostic data cannot break error reporting.
export function redactEventEmails(event) {
  const ancestors = new WeakSet();
  let remaining = 2_000;
  function sanitize(value, depth = 0) {
    if (--remaining < 0) return '[truncated]';
    if (typeof value === 'string') return redactEmails(value);
    if (!value || typeof value !== 'object') return value;
    if (depth >= 10) return '[truncated]';
    if (ancestors.has(value)) return '[circular]';
    ancestors.add(value);
    const entries =
      value instanceof Error
        ? Object.assign({}, value, {
            name: value.name,
            message: value.message,
            stack: value.stack,
          })
        : value;
    let result;
    if (Array.isArray(entries)) {
      result = entries.slice(0, 100).map((item) => sanitize(item, depth + 1));
    } else {
      result = {};
      let count = 0;
      for (const key of Object.keys(entries)) {
        if (++count > 100 || remaining <= 0) break;
        // An encoded email is sensitive even outside a URL.
        Object.defineProperty(result, redactEmails(key), {
          value: /^emailHash$/i.test(key)
            ? '[redacted-email]'
            : sanitize(entries[key], depth + 1),
          enumerable: true,
          configurable: true,
          writable: true,
        });
      }
    }
    ancestors.delete(value);
    return result;
  }
  return sanitize(event);
}

function shouldDropKnownExternalNoise(event, hint) {
  if (!FILTER_EXTENSION_ASYNC_CHANNEL_ERRORS) {
    return false;
  }

  const message = getEventMessage(event, hint);
  return message.includes(EXTENSION_ASYNC_CHANNEL_ERROR_TEXT);
}

if (sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,
    // Dev events were all HMR/WIP noise. Use `vp build && vp preview` to test.
    enabled: !import.meta.env.DEV,
    environment: import.meta.env.MODE,
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true,
    // Structured logs. Paired with consoleLoggingIntegration below, the
    // console.warn/error calls the app already makes become searchable logs
    // attached to the same events, so an error arrives with the context that
    // led to it. Requires SDK >= 9.41.
    enableLogs: true,
    // ponytail: 10% of page loads; raise if traces are too sparse to be useful.
    tracesSampleRate: 0.1,
    // Merged with the SDK's default integrations, not a replacement for them.
    // Replay was removed: with text and media masked (DM text, contact names,
    // camera output) the recordings showed nothing useful. Breadcrumbs and
    // logs already cover what led up to an error.
    integrations: [
      // Page loads, navigations and fetch/XHR spans. tracePropagationTargets
      // stays at the same-origin default: adding api.hangvidu.com would send
      // sentry-trace/baggage headers that its CORS config does not allow.
      Sentry.browserTracingIntegration(),
      // warn/error only: console.log/info would be mostly noise and count
      // against the log quota.
      Sentry.consoleLoggingIntegration({ levels: ['warn', 'error'] }),
    ],
    // Errors, logs and request traces all need the same privacy filter.
    beforeSendLog: redactEventEmails,
    beforeSendSpan: redactEventEmails,
    // Toggle with VITE_SENTRY_FILTER_EXTENSION_ASYNC_CHANNEL_ERRORS:
    // - default (unset): enabled
    // - "0": disabled
    beforeSend(event, hint) {
      if (shouldDropKnownExternalNoise(event, hint)) {
        return null;
      }

      return redactEventEmails(event);
    },
  });

  // uid only: it is opaque, and the email stays out (see EMAIL_PATTERN above).
  // 'loading' is skipped so an in-flight sign-out keeps attributing to the user.
  subscribe('evt:auth:state:changed', ({ state }) => {
    if (state.status === 'authenticated' && state.user) {
      Sentry.setUser({ id: state.user.uid });
    } else if (state.status === 'unauthenticated') {
      Sentry.setUser(null);
    }
  });
} else {
  console.warn('Sentry DSN not provided; error reporting is disabled.');
}

// myUndefinedFunction(); // Uncomment to debug (should cause error)
