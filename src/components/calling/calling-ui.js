// calling-ui.js - Calling modal with cancel and auto-timeout

import { set, remove, get, ref } from 'firebase/database';
import { rtdb, getUserOutgoingCallRef } from '../../storage/fb-rtdb/rtdb.js';
import { getLoggedInUserId, getUserId } from '../../firebase/auth.js';
import { devDebug } from '../../utils/dev/dev-utils.js';
import { getDiagnosticLogger } from '../../utils/dev/diagnostic-logger.js';
import RoomService from '../../room.js';
import { ringtoneManager } from '../../media/audio/ringtone-manager.js';
import { uiState } from '../../ui/state.js';
import { t } from '../../i18n/index.js';

const CALL_TIMEOUT_MS = 30000; // 30 seconds

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

  const outgoingRef = getUserOutgoingCallRef(loggedInUid);
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

  const outgoingRef = getUserOutgoingCallRef(loggedInUid);
  await remove(outgoingRef).catch(() => {});
}

/**
 * Check if an outgoing call state exists and is fresh (< 20s old)
 */
export async function isOutgoingCallFresh(callerUid, roomId) {
  if (!callerUid) return false;

  try {
    const outgoingRef = getUserOutgoingCallRef(callerUid);
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
  const diag = getDiagnosticLogger();
  const showTime = Date.now();

  // Remove any existing calling UI first
  hideCallingUI();

  // Track outgoing call state in RTDB
  await setOutgoingCallState(roomId, contactName);

  // Set UI state to calling
  uiState.setView('calling');

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
    background: #4d4e54ff;
    padding: 30px;
    border-radius: 12px;
    text-align: center;
    min-width: 300px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  `;

  const title = document.createElement('h2');
  title.textContent = t('call.calling', { name: contactName || t('shared.contact') });
  title.style.cssText = `
    margin: 0 0 10px 0;
    font-size: 20px;
    color: #d0d7dbff;
  `;

  const subtitle = document.createElement('p');
  subtitle.textContent = t('call.waiting');
  subtitle.style.cssText = `
    margin: 0 0 20px 0;
    color: #bbb;
    font-size: 14px;
  `;

  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = t('shared.cancel');
  cancelBtn.style.cssText = `
    padding: 10px 24px;
    background: #c34949ff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
  `;

  const handleCancel = async () => {
    diag.logCallingUILifecycle('CANCEL', roomId, {
      contactName,
      reason: 'user_cancelled',
      duration: Date.now() - showTime,
    });

    // Best-effort cleanup: clear outgoing state and remove our member entry
    try {
      await Promise.all([
        clearOutgoingCallState(),
        RoomService.cancelCall(roomId, getUserId(), 'caller_cancelled'),
        RoomService.leaveRoom(getUserId(), roomId),
      ]);
    } catch (e) {
      diag.log('ROOM', 'CALLER_CANCELLED_CLEANUP_FAIL', {
        roomId,
        error: String(e),
      });
    }
    ringtoneManager.stop();
    hideCallingUI();
    devDebug('Call cancelled');
    if (onCancel) onCancel();
  };

  cancelBtn.onclick = handleCancel;

  modal.appendChild(title);
  modal.appendChild(subtitle);
  modal.appendChild(cancelBtn);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Store roomId for logging purposes
  overlay.dataset.roomId = roomId;
  activeCallingUI = overlay;

  // Start outgoing call ringtone
  ringtoneManager.playOutgoing();

  // Auto-timeout after 30 seconds
  timeoutId = setTimeout(async () => {
    diag.logCallingUILifecycle('TIMEOUT', roomId, {
      contactName,
      reason: 'auto_timeout',
      duration: Date.now() - showTime,
      timeoutMs: CALL_TIMEOUT_MS,
    });

    // Best-effort cleanup on timeout as well
    try {
      await Promise.all([
        clearOutgoingCallState(),
        RoomService.cancelCall(roomId, getUserId(), 'auto_timeout'),
        RoomService.leaveRoom(getUserId(), roomId),
      ]);
    } catch (e) {
      diag.log('ROOM', 'CALLER_TIMEOUT_CLEANUP_FAIL', {
        roomId,
        error: String(e),
      });
    }
    ringtoneManager.stop();
    hideCallingUI();
    devDebug('Call timed out - no answer after 30 seconds');
    if (onCancel) onCancel();
  }, CALL_TIMEOUT_MS);
}

/**
 * Hide and clean up calling UI
 */
export function hideCallingUI() {
  // Stop ringtone when hiding UI
  ringtoneManager.stop();

  // Reset UI state to lobby (unless call connected, which sets 'connected')
  if (uiState.view === 'calling') {
    uiState.setView('lobby');
  }

  if (activeCallingUI) {
    // Try to extract roomId from the UI for logging
    const roomId = activeCallingUI.dataset?.roomId || 'unknown';

    getDiagnosticLogger().logCallingUILifecycle('HIDE', roomId, {
      reason: 'hide_called',
      hadTimeout: !!timeoutId,
      timestamp: Date.now(),
    });
  }

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
  if (activeCallingUI) {
    const roomId = activeCallingUI.dataset?.roomId || 'unknown';
    getDiagnosticLogger().logCallingUILifecycle('ANSWERED', roomId, {
      reason: 'call_answered',
      timestamp: Date.now(),
    });
  }

  await clearOutgoingCallState();
  hideCallingUI();
}

/**
 * Hide calling UI and clear outgoing state when call is rejected by callee
 */
export async function onCallRejected(reason = 'user_rejected') {
  const diag = getDiagnosticLogger();
  const roomId = activeCallingUI?.dataset?.roomId || 'unknown';

  diag.logCallingUILifecycle('REJECTED', roomId, {
    reason,
    timestamp: Date.now(),
  });

  await clearOutgoingCallState();
  hideCallingUI();
  devDebug('Call declined');
}
