// referral-handler.js - Handle referral links and auto-add contacts
// Reuses the existing invitation system for consistency

import { signInWithAccountSelection } from '../auth/auth.js';
import { getLoggedInUserId } from '../auth/auth-state.js';
import { acceptInvite } from './invitations.js';
import { getDeterministicRoomId } from '../utils/room-id.js';
import { showInfoToast, showSuccessToast } from '../utils/ui/toast.js';
import { getUserProfile } from '../user/profile.js';
import { createReferralNotification } from '../components/notifications/referral-notification.js';
import { inAppNotificationManager } from '../components/notifications/in-app-notification-manager.js';
import { t } from '../i18n/index.js';

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
    const profile = await getUserProfile(referrerId);
    const name = profile?.displayName || null;
    const photoURL = profile?.photoURL || null;

    // Clickable toast (ephemeral)
    const message = name
      ? t('referral.sign_in_named', { name })
      : t('referral.sign_in_banner');

    showInfoToast(message, {
      duration: 8000,
      onClick: () => signInWithAccountSelection(),
    });

    // Persistent notification in panel (in case user misses the toast)
    const notification = createReferralNotification({
      referrerName: name,
      referrerPhotoURL: photoURL,
      onSignIn: () => signInWithAccountSelection(),
    });

    inAppNotificationManager.add(`referral-${referrerId}`, notification);
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
    const profile = await getUserProfile(referrerId);
    const referrerName = profile?.displayName?.trim() || t('contact.no_name');
    const referrerPhotoURL = profile?.photoURL || null;

    // Generate deterministic room ID
    const roomId = getDeterministicRoomId(myUserId, referrerId);

    // Create a synthetic invite data object (same format as real invites)
    const syntheticInvite = {
      fromUserId: referrerId,
      fromName: referrerName,
      fromEmail: '',
      fromPhotoURL: referrerPhotoURL,
      roomId: roomId,
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

    // Clean up referral notification if still showing
    inAppNotificationManager.remove(`referral-${referrerId}`);

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
