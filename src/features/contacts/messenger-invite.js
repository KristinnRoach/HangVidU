import { copyToClipboard } from '../../shared/components/modal/copyLinkModal.js';

const DEFAULT_SENDER_NAME = 'A friend';

/**
 * Build HangVidU referral link for invites.
 * Falls back to origin-only when user id is missing.
 *
 * @param {string | null | undefined} userId
 * @param {string} [origin]
 * @returns {string}
 */
export function buildReferralLink(userId, origin = window.location.origin) {
  const base = typeof origin === 'string' && origin.trim() ? origin : '';
  if (!userId || typeof userId !== 'string' || !userId.trim()) {
    return base;
  }

  const encodedRef = encodeURIComponent(userId.trim());
  return `${base}/?ref=${encodedRef}`;
}

/**
 * Create reusable invite text for sharing.
 *
 * @param {{ senderName?: string | null, link: string }} params
 * @returns {string}
 */
export function buildMessengerInviteText({ senderName, link }) {
  const safeSender =
    typeof senderName === 'string' && senderName.trim()
      ? senderName.trim()
      : DEFAULT_SENDER_NAME;

  return (
    `Hi!\n\n${safeSender} invited you to join HangVidU - ` +
    `an app for text messaging, video calls and video sharing.\n\n` +
    `Click here to get started:\n${link}\n\nSee you there!`
  );
}

/**
 * Share via native share first, then fall back to copy-link.
 *
 * @param {{
 *   senderName?: string | null,
 *   userId?: string | null,
 *   origin?: string,
 *   shareImpl?: ((data: ShareData) => Promise<void>) | null,
 *   copyImpl?: ((text: string) => Promise<boolean>) | null
 * }} params
 * @returns {Promise<{ ok: boolean, status: 'shared' | 'copied' | 'cancelled' | 'copy_failed', link: string, text: string }>}
 */
export async function shareMessengerInvite({
  senderName,
  userId,
  origin = window.location.origin,
  shareImpl = typeof navigator !== 'undefined' &&
  typeof navigator.share === 'function'
    ? navigator.share.bind(navigator)
    : null,
  copyImpl = copyToClipboard,
} = {}) {
  const link = buildReferralLink(userId, origin);
  const text = buildMessengerInviteText({ senderName, link });

  if (typeof shareImpl === 'function') {
    try {
      await shareImpl({
        title: 'HangVidU',
        text,
        url: link,
      });
      return { ok: true, status: 'shared', link, text };
    } catch (error) {
      if (error?.name === 'AbortError') {
        return { ok: false, status: 'cancelled', link, text };
      }
      // Continue to copy fallback for non-cancel failures.
    }
  }

  const copied = typeof copyImpl === 'function' ? await copyImpl(link) : false;
  if (copied) {
    return { ok: true, status: 'copied', link, text };
  }
  return { ok: false, status: 'copy_failed', link, text };
}
