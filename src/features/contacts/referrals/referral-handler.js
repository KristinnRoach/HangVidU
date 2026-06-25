// referral-handler.js - Handle referral links and auto-add contacts
// Reuses the existing invitation system for consistency

import {
  signInWithAccountSelection,
  getLoggedInUserId,
} from '../../../auth/index.js';
import { acceptInvite } from '../invites/invitations.js';
import {
  showInfoToast,
  showSuccessToast,
} from '../../../components/base-legacy/toast.js';
import { getPublicUserProfile } from '../../../stores/userDirectoryStore.js';
import { dispatchCommand } from '../../../shared/events/index.js';
import { t } from '../../../shared/i18n/index.js';

/**
 * Store referrer ID when user arrives via referral link.
 * Shows a clickable toast and a persistent notification prompting sign-in.
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

    // Fetch referrer profile (world-readable, no auth needed)
    const profile = await getPublicUserProfile(referrerId);
    const name = profile?.userName || null;
    const photoURL = profile?.photoURL || null;

    // Clickable toast (ephemeral)
    const message = name
      ? t('referral.sign_in_named', { name })
      : t('referral.sign_in_banner');

    showInfoToast(message, {
      duration: 8000,
      onClick: () => signInWithAccountSelection(),
    });

    dispatchCommand('cmd:app-notifications:referral:add', {
      notificationId: `referral-${referrerId}`,
      referrerName: name,
      referrerPhotoURL: photoURL,
      onSignIn: () => signInWithAccountSelection(),
    });
  }
}

/**
 * Process referral after user signs in.
 * Uses the same mutual contact-add flow as "Invite Selected".
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
    return;
  }

  try {
    console.log('[REFERRAL] Processing referral from:', referrerId);

    // Fetch referrer profile (may not exist yet for older users)
    const profile = await getPublicUserProfile(referrerId);
    const referrerName = profile?.userName?.trim() || t('contact.no_name');
    const referrerPhotoURL = profile?.photoURL || null;

    // Create a synthetic invite data object (same format as real invites)
    const syntheticInvite = {
      fromUserId: referrerId,
      fromName: referrerName,
      fromEmail: '',
      fromPhotoURL: referrerPhotoURL,
      timestamp: Date.now(),
      status: 'pending',
    };

    // Use the existing acceptInvite flow - this will:
    // 1. Save referrer to my contacts
    // 2. Notify referrer (via acceptedInvites)
    // 3. Auto-save me to referrer's contacts (via listenForAcceptedInvites)
    await acceptInvite(referrerId, syntheticInvite);

    console.log(
      `[REFERRAL] ✅ Connected with ${referrerName} via referral link!`,
    );

    // Show success toast
    showSuccessToast(t('referral.connected', { name: referrerName }));

    dispatchCommand('cmd:app-notifications:referral:remove', {
      notificationId: `referral-${referrerId}`,
    });

    // Clean up
    localStorage.removeItem('referredBy');
  } catch (error) {
    console.error('[REFERRAL] Failed to process referral:', error);
    // Don't remove from localStorage on error - might retry later
  }
}

/**
 * Check if there's a pending referral to process.
 * Useful for checking before showing onboarding.
 */
export function hasPendingReferral() {
  return !!localStorage.getItem('referredBy');
}
