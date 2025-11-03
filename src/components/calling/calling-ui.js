// calling-ui.js - Calling modal with cancel and auto-timeout

import { ref, set, remove, get } from 'firebase/database';
import { rtdb } from '../../storage/fb-rtdb/rtdb.js';
import { getLoggedInUserId, getUserId } from '../../firebase/auth.js';
import { updateStatus } from '../../utils/status.js';

const CALL_TIMEOUT_MS = 20000; // 20 seconds

let activeCallingUI = null;
let timeoutId = null;

/**
 * Write outgoing call state to RTDB so we can verify call freshness
 */
async function setOutgoingCallState(roomId, targetContactName = null) {
  const userId = getUserId();
  const loggedInUid = getLoggedInUserId();

  // Only track for authenticated users (guests don't need cross-session freshness checks)
  if (!loggedInUid) return;

  const outgoingRef = ref(rtdb, `users/${loggedInUid}/outgoingCall`);
  await set(outgoingRef, {
    roomId,
    targetContactName,
    initiatedAt: Date.now(),
    callerUserId: userId,
  });
}

/**
 * Remove outgoing call state (on answer, cancel, or timeout)
 */
async function clearOutgoingCallState() {
  const loggedInUid = getLoggedInUserId();
  if (!loggedInUid) return;

  const outgoingRef = ref(rtdb, `users/${loggedInUid}/outgoingCall`);
  await remove(outgoingRef).catch(() => {});
}

/**
 * Check if an outgoing call state exists and is fresh (< 20s old)
 */
export async function isOutgoingCallFresh(callerUid, roomId) {
  if (!callerUid) return false;

  try {
    const outgoingRef = ref(rtdb, `users/${callerUid}/outgoingCall`);
    const snap = await get(outgoingRef);
    if (!snap.exists()) return false;

    const data = snap.val();
    if (data.roomId !== roomId) return false;

    const age = Date.now() - data.initiatedAt;
    return age < CALL_TIMEOUT_MS;
  } catch (e) {
    console.warn('Failed to check outgoing call freshness', e);
    return false;
  }
}

/**
 * Fallback freshness check for guests (logged-out flows):
 * Use the room's createdAt timestamp to determine if the call is recent.
 * Works because initiator overwrites/creates the room node with a fresh createdAt.
 */
export async function isRoomCallFresh(roomId) {
  if (!roomId) return false;
  try {
    const createdAtRef = ref(rtdb, `rooms/${roomId}/createdAt`);
    const snap = await get(createdAtRef);
    if (!snap.exists()) return false;
    const createdAt = snap.val();
    if (typeof createdAt !== 'number') return false;
    const age = Date.now() - createdAt;
    return age < CALL_TIMEOUT_MS;
  } catch (e) {
    console.warn('Failed to check room freshness', e);
    return false;
  }
}

/**
 * Show "Calling..." modal with cancel button and auto-timeout
 */
export async function showCallingUI(roomId, contactName, onCancel) {
  // Remove any existing calling UI first
  hideCallingUI();

  // Track outgoing call state in RTDB
  await setOutgoingCallState(roomId, contactName);

  // Create modal overlay
  const overlay = document.createElement('div');
  overlay.id = 'calling-modal';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  `;

  const modal = document.createElement('div');
  modal.style.cssText = `
    background: white;
    padding: 30px;
    border-radius: 12px;
    text-align: center;
    min-width: 300px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  `;

  const title = document.createElement('h2');
  title.textContent = `Calling ${contactName || 'contact'}...`;
  title.style.cssText = `
    margin: 0 0 10px 0;
    font-size: 20px;
    color: #333;
  `;

  const subtitle = document.createElement('p');
  subtitle.textContent = 'Waiting for answer...';
  subtitle.style.cssText = `
    margin: 0 0 20px 0;
    color: #666;
    font-size: 14px;
  `;

  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancel';
  cancelBtn.style.cssText = `
    padding: 10px 24px;
    background: #f44336;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
  `;

  const handleCancel = async () => {
    await clearOutgoingCallState();
    hideCallingUI();
    updateStatus('Call cancelled');
    if (onCancel) onCancel();
  };

  cancelBtn.onclick = handleCancel;

  modal.appendChild(title);
  modal.appendChild(subtitle);
  modal.appendChild(cancelBtn);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  activeCallingUI = overlay;

  // Auto-timeout after 20 seconds
  timeoutId = setTimeout(async () => {
    await clearOutgoingCallState();
    hideCallingUI();
    updateStatus('Call timed out - no answer after 20 seconds');
    if (onCancel) onCancel();
  }, CALL_TIMEOUT_MS);
}

/**
 * Hide and clean up calling UI
 */
export function hideCallingUI() {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }

  if (activeCallingUI) {
    activeCallingUI.remove();
    activeCallingUI = null;
  }
}

/**
 * Hide calling UI and clear outgoing state when call is answered
 */
export async function onCallAnswered() {
  await clearOutgoingCallState();
  hideCallingUI();
}
