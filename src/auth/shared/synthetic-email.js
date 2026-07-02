// RFC 2606-reserved TLD - guaranteed to never resolve or become real.
export const SYNTHETIC_DOMAIN = 'hangvidu.invalid';

export function isSyntheticEmail(email) {
  return typeof email === 'string' && email.endsWith(`@${SYNTHETIC_DOMAIN}`);
}

export function extractUsernameFromSyntheticEmail(email) {
  if (!isSyntheticEmail(email)) return null;
  return email.slice(0, -`@${SYNTHETIC_DOMAIN}`.length);
}

export function syntheticEmail(username) {
  return `${username.toLowerCase()}@${SYNTHETIC_DOMAIN}`;
}
