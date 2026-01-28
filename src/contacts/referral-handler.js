// referral-handler.js - Handle referral links and auto-add contacts
// Reuses the existing invitation system for consistency

import {
  getLoggedInUserId,
  signInWithAccountSelection,
} from '../firebase/auth.js';
import { acceptInvite } from './invitations.js';
import { getDeterministicRoomId } from '../utils/room-id.js';
import { showInfoToast, showSuccessToast } from '../utils/ui/toast.js';
import { getUserProfile } from '../user/profile.js';

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

    // Fetch referrer profile (world-readable, no auth needed)
    const profile = await getUserProfile(referrerId);
    const name = profile?.displayName;

    const message = name
      ? `${name} invited you — tap here to sign in and connect`
      : 'Tap here to sign in and connect with your inviter';

    showInfoToast(message, {
      duration: 8000,
      onClick: () => signInWithAccountSelection(),
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

    // Check if referrer exists and get their info
    const profile = await getUserProfile(referrerId);

    if (!profile) {
      console.warn('[REFERRAL] Referrer profile not found:', referrerId);
      localStorage.removeItem('referredBy');
      return;
    }

    // Get referrer's display name
    const referrerName = profile.displayName || referrerId;

    // Generate deterministic room ID
    const roomId = getDeterministicRoomId(myUserId, referrerId);

    // Create a synthetic invite data object (same format as real invites)
    const syntheticInvite = {
      fromUserId: referrerId,
      fromName: referrerName,
      fromEmail: '',
      fromPhotoURL: profile.photoURL || null,
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
    showSuccessToast(`✅ Connected with ${referrerName}!`);

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
