const AUTH_FAILURE_ALERT =
  'HangVidU could not verify your session. Refresh the page or sign out and back in.';

const OUTAGE_ALERT =
  "HangVidU's server is temporarily unavailable. Your data is safe — please try again in a few minutes.";

let hasAlerted = false;
let hasAlertedOutage = false;

export function reportApiAuthFailure(scope, status, detail) {
  const message = `[${scope}] auth request failed with ${status}${detail ? `: ${detail}` : ''}`;
  console.error(message);

  if (hasAlerted || typeof window === 'undefined') return;
  hasAlerted = true;
  window.alert(AUTH_FAILURE_ALERT);
}

// Once-per-page-load native alert for 5xx responses, so a backend outage tells
// the user what's happening instead of the app just silently breaking. Scope
// is deliberately the page lifetime (not sessionStorage): a reload during an
// outage should re-alert, and it matches the auth-failure pattern above.
export function reportApiOutage(scope, status, detail) {
  const message = `[${scope}] server error ${status}${detail ? `: ${detail}` : ''}`;
  console.error(message);

  if (hasAlertedOutage || typeof window === 'undefined') return;
  hasAlertedOutage = true;
  window.alert(OUTAGE_ALERT);
}
