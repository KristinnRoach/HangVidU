// calling-ui.js - Calling modal with cancel and auto-timeout

import {
  CALL_TIMEOUT_MS,
  setOutgoingCallState,
  clearOutgoingCallState,
  // isOutgoingCallFresh,
} from '../WIP-CallState-rtdb.js';
import {
  dismissOutgoingCallDialog,
  showOutgoingCallDialog,
} from '../../../components/AppDialogHost.jsx';
import { devDebug } from '../../../shared/utils/dev/dev-utils.js';
import { getDiagnosticLogger } from '../../../shared/utils/dev/diagnostic-logger.js';
import RoomService from '../room.js';
import { ringtoneManager } from '../../../shared/media/audio/ringtone-manager.js';
import { getUserId } from '../../../auth/index.js';

let activeCallingUI = null;
let timeoutId = null;
let storedOnHide = null;

/**
 * Show "Calling..." modal with cancel button and auto-timeout
 */
export async function showOutgoingCallUI(
  roomId,
  contactNickName,
  { onCancel, onHide, audioOnly } = {},
) {
  const diag = getDiagnosticLogger();
  const showTime = Date.now();

  // Remove any existing calling UI first
  hideOutgoingCallingUI();

  // Store onHide callback for hideCallingUI to call
  storedOnHide = onHide || null;

  // Track outgoing call state in RTDB
  await setOutgoingCallState(roomId, contactNickName);

  const handleCancel = async () => {
    diag.logCallingUILifecycle('CANCEL', roomId, {
      contactNickName,
      reason: 'user_cancelled',
      duration: Date.now() - showTime,
    });

    // Dismiss UI immediately for responsiveness
    ringtoneManager.stop();
    hideOutgoingCallingUI();
    clearOutgoingCallState().catch(() => {});

    if (onCancel) {
      // Delegate call lifecycle cleanup to caller (CallController.hangUp)
      onCancel('caller_cancelled');
    } else {
      // Fallback: direct cleanup when no callback provided
      try {
        await Promise.all([
          RoomService.cancelCall(roomId, getUserId(), 'caller_cancelled'),
          RoomService.leaveRoom(getUserId(), roomId),
        ]);
      } catch (e) {
        diag.log('ROOM', 'CALLER_CANCELLED_CLEANUP_FAIL', {
          roomId,
          error: String(e),
        });
      }
    }
    devDebug('Call cancelled');
  };

  showOutgoingCallDialog({
    roomId,
    calleeName: contactNickName,
    audioOnly,
    onCancel: handleCancel,
  });
  activeCallingUI = { roomId };

  // Start outgoing call ringtone
  ringtoneManager.playOutgoing({ audioOnly });

  // Auto-timeout after 30 seconds
  timeoutId = setTimeout(async () => {
    diag.logCallingUILifecycle('TIMEOUT', roomId, {
      contactNickName,
      reason: 'auto_timeout',
      duration: Date.now() - showTime,
      timeoutMs: CALL_TIMEOUT_MS,
    });

    // Dismiss UI immediately for responsiveness
    ringtoneManager.stop();
    hideOutgoingCallingUI();
    clearOutgoingCallState().catch(() => {});

    if (onCancel) {
      // Delegate call lifecycle cleanup to caller (CallController.hangUp)
      onCancel('auto_timeout');
    } else {
      // Fallback: direct cleanup when no callback provided
      try {
        await Promise.all([
          RoomService.cancelCall(roomId, getUserId(), 'auto_timeout'),
          RoomService.leaveRoom(getUserId(), roomId),
        ]);
      } catch (e) {
        diag.log('ROOM', 'CALLER_TIMEOUT_CLEANUP_FAIL', {
          roomId,
          error: String(e),
        });
      }
    }
    devDebug('Call timed out - no answer after 30 seconds');
  }, CALL_TIMEOUT_MS);
}

/**
 * Hide and clean up calling UI
 */
export function hideOutgoingCallingUI() {
  // Stop ringtone when hiding UI
  ringtoneManager.stop();

  // Let the lifecycle layer handle view state reset
  if (storedOnHide) {
    try {
      storedOnHide();
    } catch (e) {
      console.warn('[calling-ui] onHide callback threw:', e);
    }
    storedOnHide = null;
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
    dismissOutgoingCallDialog(activeCallingUI.roomId);
    activeCallingUI = null;
  }
}

/**
 * Hide calling UI and clear outgoing state when call is answered
 */
export async function onOutgoingCallAnswered() {
  if (activeCallingUI) {
    const roomId = activeCallingUI.dataset?.roomId || 'unknown';
    getDiagnosticLogger().logCallingUILifecycle('ANSWERED', roomId, {
      reason: 'call_answered',
      timestamp: Date.now(),
    });
  }

  await clearOutgoingCallState();
  hideOutgoingCallingUI();
}

/**
 * Hide calling UI and clear outgoing state when call is rejected by callee
 */
export async function onOutgoingCallRejected(reason = 'user_rejected') {
  const diag = getDiagnosticLogger();
  const roomId = activeCallingUI?.dataset?.roomId || 'unknown';

  diag.logCallingUILifecycle('REJECTED', roomId, {
    reason,
    timestamp: Date.now(),
  });

  await clearOutgoingCallState();
  hideOutgoingCallingUI();
  devDebug('Call declined');
}
