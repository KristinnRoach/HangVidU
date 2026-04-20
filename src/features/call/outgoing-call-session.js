import {
  CALL_TIMEOUT_MS,
  setOutgoingCallState,
  clearOutgoingCallState,
} from './WIP-CallState-rtdb.js';
import { devDebug } from '../../shared/utils/dev/dev-utils.js';
import { getDiagnosticLogger } from '../../shared/utils/dev/diagnostic-logger.js';
import RoomService from './room.js';
import { ringtoneManager } from '../../shared/media/audio/ringtone-manager.js';
import { getUserId } from '../../auth/index.js';
import { dispatchCommand } from '../../shared/events/index.js';

let activeCallingUI = null;
let timeoutId = null;
let storedOnHide = null;

export async function showOutgoingCallUI(
  roomId,
  contactNickName,
  { onCancel, onHide, audioOnly } = {},
) {
  const diag = getDiagnosticLogger();
  const showTime = Date.now();

  hideOutgoingCallingUI();
  storedOnHide = onHide || null;

  await setOutgoingCallState(roomId, contactNickName);

  const handleCancel = async () => {
    diag.logCallingUILifecycle('CANCEL', roomId, {
      contactNickName,
      reason: 'user_cancelled',
      duration: Date.now() - showTime,
    });

    ringtoneManager.stop();
    hideOutgoingCallingUI();
    clearOutgoingCallState().catch(() => {});

    if (onCancel) {
      onCancel('caller_cancelled');
    } else {
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

  try {
    dispatchCommand('cmd:dialog:outgoing-call:open', {
      roomId,
      calleeName: contactNickName,
      audioOnly,
      onCancel: handleCancel,
    });
  } catch (error) {
    console.warn(
      '[outgoing-call-session] failed to open outgoing call dialog:',
      error,
    );
  }
  activeCallingUI = { roomId };

  ringtoneManager.playOutgoing({ audioOnly });

  timeoutId = setTimeout(async () => {
    diag.logCallingUILifecycle('TIMEOUT', roomId, {
      contactNickName,
      reason: 'auto_timeout',
      duration: Date.now() - showTime,
      timeoutMs: CALL_TIMEOUT_MS,
    });

    ringtoneManager.stop();
    hideOutgoingCallingUI();
    clearOutgoingCallState().catch(() => {});

    if (onCancel) {
      onCancel('auto_timeout');
    } else {
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

export function hideOutgoingCallingUI() {
  ringtoneManager.stop();

  if (storedOnHide) {
    try {
      storedOnHide();
    } catch (e) {
      console.warn('[outgoing-call-session] onHide callback threw:', e);
    }
    storedOnHide = null;
  }

  if (activeCallingUI) {
    const roomId = activeCallingUI.roomId || 'unknown';

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
    try {
      dispatchCommand('cmd:dialog:outgoing-call:close', {
        roomId: activeCallingUI.roomId,
      });
    } catch (error) {
      console.warn(
        '[outgoing-call-session] failed to close outgoing call dialog:',
        error,
      );
    }
    activeCallingUI = null;
  }
}

export async function onOutgoingCallAnswered() {
  if (activeCallingUI) {
    const roomId = activeCallingUI.roomId || 'unknown';
    getDiagnosticLogger().logCallingUILifecycle('ANSWERED', roomId, {
      reason: 'call_answered',
      timestamp: Date.now(),
    });
  }

  await clearOutgoingCallState();
  hideOutgoingCallingUI();
}

export async function onOutgoingCallRejected(reason = 'user_rejected') {
  const diag = getDiagnosticLogger();
  const roomId = activeCallingUI?.roomId || 'unknown';

  diag.logCallingUILifecycle('REJECTED', roomId, {
    reason,
    timestamp: Date.now(),
  });

  await clearOutgoingCallState();
  hideOutgoingCallingUI();
  devDebug('Call declined');
}
