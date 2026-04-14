import { copyToClipboard } from '../../shared/components/modal/copyLinkModal.js';
import { publish } from '../../shared/events/index.js';
import { t } from '../../shared/i18n/index.js';

/*
 * Invite sharing via the Web Share API, with clipboard-copy fallback.
 */

const DEFAULT_SENDER_NAME = 'A friend';

const APP_ORIGIN = import.meta.env.VITE_APP_URL || window.location.origin;
const SHARE_ATTEMPTED_EVENT = 'evt:contacts:invite:share-attempted';
const SHARE_RESULT_EVENT = 'evt:contacts:invite:share-result';

function safePublish(eventName, payload) {
  try {
    publish(eventName, payload);
  } catch (error) {
    console.warn('[CONTACTS INVITE] Failed to publish telemetry event:', error);
  }
}

function emitShareAttempt(channel) {
  safePublish(SHARE_ATTEMPTED_EVENT, { channel, timestamp: Date.now() });
}

function emitShareResult({ channel, status, sourceChannel }) {
  safePublish(SHARE_RESULT_EVENT, {
    channel,
    status,
    sourceChannel,
    timestamp: Date.now(),
  });
}

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
 * @returns {Promise<{ ok: boolean, status: 'opened_elsewhere' | 'copied' | 'cancelled' | 'copy_failed', link: string, text: string }>}
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
  emitShareAttempt('generic');

  const link = buildReferralLink(userId, origin);
  const text = buildInviteText({ senderName, link });

  if (typeof shareImpl === 'function') {
    try {
      await shareImpl({
        title: t('contact.invite.subject'),
        text,
        url: link,
      });
      emitShareResult({ channel: 'generic', status: 'opened' });
      return { ok: true, status: 'opened_elsewhere', link, text };
    } catch (error) {
      if (error?.name === 'AbortError') {
        emitShareResult({ channel: 'generic', status: 'cancelled' });
        return { ok: false, status: 'cancelled', link, text };
      }
      // Continue to copy fallback for non-cancel failures.
    }
  }

  let copied = false;
  try {
    copied = typeof copyImpl === 'function' ? await copyImpl(link) : false;
  } catch {
    emitShareResult({
      channel: 'copy',
      sourceChannel: 'generic',
      status: 'copy_failed',
    });
    return { ok: false, status: 'copy_failed', link, text };
  }

  if (copied) {
    emitShareResult({
      channel: 'copy',
      sourceChannel: 'generic',
      status: 'copied',
    });
    return { ok: true, status: 'copied', link, text };
  }
  emitShareResult({
    channel: 'copy',
    sourceChannel: 'generic',
    status: 'copy_failed',
  });
  return { ok: false, status: 'copy_failed', link, text };
}

/**
 * Copy HangVidU invite link to clipboard.
 *
 * @param {{
 *   userId?: string | null,
 *   origin?: string,
 *   copyImpl?: ((text: string) => Promise<boolean>) | null,
 * }} params
 * @returns {Promise<{ ok: boolean, status: 'copied' | 'copy_failed', link: string }>}
 */
export async function copyInviteLink({
  userId,
  origin = APP_ORIGIN,
  copyImpl = copyToClipboard,
} = {}) {
  emitShareAttempt('copy');

  const link = buildReferralLink(userId, origin);
  let copied = false;
  try {
    copied = typeof copyImpl === 'function' ? await copyImpl(link) : false;
  } catch {
    emitShareResult({ channel: 'copy', status: 'copy_failed' });
    return { ok: false, status: 'copy_failed', link };
  }

  if (copied) {
    emitShareResult({ channel: 'copy', status: 'copied' });
    return { ok: true, status: 'copied', link };
  }

  emitShareResult({ channel: 'copy', status: 'copy_failed' });
  return { ok: false, status: 'copy_failed', link };
}
