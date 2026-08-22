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
