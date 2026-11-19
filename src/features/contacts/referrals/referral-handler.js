// referral-handler.js - Handle referral links and auto-add contacts

import { createSignal } from 'solid-js';
import { getLoggedInUserId } from '@auth';
import { reloadContacts } from '../../../stores/contacts-store.js';
import { showToast } from '@components/toast';
import {
  connectReferral,
  getUserProfileById,
} from '../../../stores/user-profile-store.js';
import { t } from '@shared/i18n/index.js';

const [hasPendingReferral, setHasPendingReferral] = createSignal(false);

/** Whether this visit came from a referral link, for the public homepage. */
export { hasPendingReferral };

/**
 * Store referrer ID when user arrives via referral link.
 * Called on page load before authentication.
 */
export async function captureReferral() {
  const urlParams = new URLSearchParams(window.location.search);
  const referrerId = urlParams.get('ref');

  if (referrerId) {
    console.log('[REFERRAL] Captured referrer ID:', referrerId);
    localStorage.setItem('referredBy', referrerId);

    // Clean up URL to remove ref parameter
    const url = new URL(window.location.href);
    url.searchParams.delete('ref');
    window.history.replaceState({}, '', url.toString());

    // The inviter's name is unavailable: profile lookups require sign-in.
    setHasPendingReferral(true);
  }
}

/**
 * Process referral after user signs in.
 * Uses the D1 referral connect endpoint for the current raw-referrer-id flow.
 * Called after successful authentication.
 */
export async function processReferral() {
  const referrerId = localStorage.getItem('referredBy');
  const myUserId = getLoggedInUserId();

  if (!referrerId || !myUserId) {
    return;
  }

  // Don't process if referring yourself
  if (referrerId === myUserId) {
    console.log('[REFERRAL] Self-referral detected, skipping');
    localStorage.removeItem('referredBy');
    setHasPendingReferral(false);
    return;
  }

  try {
    console.log('[REFERRAL] Processing referral from:', referrerId);

    // Fetch referrer profile (may not exist yet for older users)
    const profile = await getUserProfileById(referrerId);
    const referrerName = profile?.displayName?.trim() || t('contact.no_name');
    await connectReferral(referrerId);
    await reloadContacts();

    console.log(
      `[REFERRAL] ✅ Connected with ${referrerName} via referral link!`,
    );

    // Show success toast
    showToast(t('referral.connected', { name: referrerName }), {
      tone: 'success',
    });

    localStorage.removeItem('referredBy');
    setHasPendingReferral(false);
  } catch (error) {
    console.error('[REFERRAL] Failed to process referral:', error);
    // Don't remove from localStorage on error - might retry later
  }
}
