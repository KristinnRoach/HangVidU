import { copyToClipboard } from '../../shared/components/modal/copyLinkModal.js';
import { t } from '../../shared/i18n/index.js';

/*
 * Invite sharing via the Web Share API, with clipboard-copy fallback.
 */

const DEFAULT_SENDER_NAME = 'A friend';

const APP_ORIGIN = import.meta.env.VITE_APP_URL || window.location.origin;

/**
 * Build HangVidU referral link for invites.
 * Falls back to origin-only when user id is missing.
 *
 * @param {string | null | undefined} userId
 * @param {string} [origin]
 * @returns {string}
 */
export function buildReferralLink(userId, origin = APP_ORIGIN) {
  const base = typeof origin === 'string' && origin.trim() ? origin.trim() : '';
  if (!userId || typeof userId !== 'string' || !userId.trim()) {
    return base;
  }
  const normalizedBase = base.replace(/\/+$/, '');
  const encodedRef = encodeURIComponent(userId.trim());
  return `${normalizedBase}/?ref=${encodedRef}`;
}

/**
 * Create reusable invite text for sharing.
 *
 * @param {{ senderName?: string | null, link: string }} params
 * @returns {string}
 */
export function buildInviteText({ senderName, link }) {
  const safeSender =
    typeof senderName === 'string' && senderName.trim()
      ? senderName.trim()
      : DEFAULT_SENDER_NAME;

  return t('contact.invite.body', {
    name: safeSender,
    link,
  });
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
export async function shareInvite({
  senderName,
  userId,
  origin = APP_ORIGIN,
  shareImpl = typeof navigator !== 'undefined' &&
  typeof navigator.share === 'function'
    ? navigator.share.bind(navigator)
    : null,
  copyImpl = copyToClipboard,
} = {}) {
  const link = buildReferralLink(userId, origin);
  const text = buildInviteText({ senderName, link });

  if (typeof shareImpl === 'function') {
    try {
      await shareImpl({
        title: t('contact.invite.subject'),
        text,
        url: link,
      });
      return { ok: true, status: 'opened_elsewhere', link, text };
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
