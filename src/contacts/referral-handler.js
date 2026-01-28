// referral-handler.js - Handle referral links and auto-add contacts
// Reuses the existing invitation system for consistency

import { getLoggedInUserId } from '../firebase/auth.js';
import { acceptInvite } from './invitations.js';
import { get, ref } from 'firebase/database';
import { rtdb } from '../storage/fb-rtdb/rtdb.js';
import { getDeterministicRoomId } from '../utils/room-id.js';
import { showSuccessToast } from '../utils/ui/toast.js';

/**
 * Store referrer ID when user arrives via referral link.
 * Called on page load before authentication.
 */
export function captureReferral() {
  const urlParams = new URLSearchParams(window.location.search);
  const referrerId = urlParams.get('ref');

  if (referrerId) {
    console.log('[REFERRAL] Captured referrer ID:', referrerId);
    localStorage.setItem('referredBy', referrerId);

    // Clean up URL to remove ref parameter
    const url = new URL(window.location.href);
    url.searchParams.delete('ref');
    window.history.replaceState({}, '', url.toString());
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
    const referrerSnapshot = await get(
      ref(rtdb, `users/${referrerId}/presence`),
    );

    if (!referrerSnapshot.exists()) {
      console.warn('[REFERRAL] Referrer user not found:', referrerId);
      localStorage.removeItem('referredBy');
      return;
    }

    // Get referrer's display name
    const referrerData = referrerSnapshot.val();
    const referrerName = referrerData?.displayName || referrerId;

    // Generate deterministic room ID
    const roomId = getDeterministicRoomId(myUserId, referrerId);

    // Create a synthetic invite data object (same format as real invites)
    const syntheticInvite = {
      fromUserId: referrerId,
      fromName: referrerName,
      fromEmail: referrerData?.email || '',
      fromPhotoURL: referrerData?.photoURL || null,
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
