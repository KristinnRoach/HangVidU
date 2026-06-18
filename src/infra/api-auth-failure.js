const AUTH_FAILURE_ALERT =
  'HangVidU could not verify your session. Refresh the page or sign out and back in.';

let hasAlerted = false;

export function reportApiAuthFailure(scope, status, detail) {
  const message = `[${scope}] auth request failed with ${status}${detail ? `: ${detail}` : ''}`;
  console.error(message);

  if (hasAlerted || typeof window === 'undefined') return;
  hasAlerted = true;
  window.alert(AUTH_FAILURE_ALERT);
}

export function resetApiAuthFailureAlertState() {
  hasAlerted = false;
}
