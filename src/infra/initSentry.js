import * as Sentry from '@sentry/browser';

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
    // Separates local dev noise from production issues in the Sentry UI.
    environment: import.meta.env.MODE,
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true,
    // Structured logs. Paired with consoleLoggingIntegration below, the
    // console.warn/error calls the app already makes become searchable logs
    // attached to the same events, so an error arrives with the context that
    // led to it. Requires SDK >= 9.41.
    enableLogs: true,
    // Merged with the SDK's default integrations, not a replacement for them.
    // warn/error only: console.log/info would be mostly noise and count
    // against the log quota.
    integrations: [
      Sentry.consoleLoggingIntegration({ levels: ['warn', 'error'] }),
      // Masking options match the SDK defaults, but are set explicitly: this
      // app carries DM text, contact names, and camera output, so a future
      // default flipping would leak. blockAllMedia covers video/audio, so no
      // camera frames are ever recorded.
      Sentry.replayIntegration({
        maskAllText: true,
        maskAllInputs: true,
        blockAllMedia: true,
      }),
    ],
    // Buffer mode: replay records into a rolling ~60s in-memory buffer and
    // only uploads when an error fires, so healthy sessions cost no quota.
    // The buffer only exists once the integration is running, which is why
    // replay is loaded up front rather than lazily.
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 1.0,
    // Toggle with VITE_SENTRY_FILTER_EXTENSION_ASYNC_CHANNEL_ERRORS:
    // - default (unset): enabled
    // - "0": disabled
    beforeSend(event, hint) {
      if (shouldDropKnownExternalNoise(event, hint)) {
        return null;
      }

      return event;
    },
  });
} else {
  console.warn('Sentry DSN not provided; error reporting is disabled.');
}

// myUndefinedFunction(); // Uncomment to debug (should cause error)
