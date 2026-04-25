// Call mode UI state management

import {
  localBoxEl,
  remoteBoxEl,
  remoteVideoEl,
  lobbyDiv,
  chatControls,
} from '../../../../../elements.js';

import {
  showElement,
  hideElement,
  placeInSmallFrame,
  removeFromSmallFrame,
  exitPiP,
} from '../../utils/ui-utils.js';

import { setupShowHideOnInactivity } from '../../utils/showHideOnInactivity.js';
import { hasRemoteStream } from '../../../../media/state.js';
import { isWatchModeActive } from '../../../../../features/watch/watch-sync.js'; // Import from watch-sync.js (should probably be from watch-mode.js)

let isInCallMode = false; // Call mode state
let enterCallModeWaitingForVideo = false;
let cleanupRemoteLeavePipHandler = null;
let cleanupRemoteEnterPipHandler = null;
let cleanupChatControlAutoHide = null;
let cleanupFunctions = [];

// Export state getter
export const getIsInCallMode = () => isInCallMode;

const isVideoReady = () =>
  remoteVideoEl &&
  hasRemoteStream() &&
  !remoteVideoEl.paused &&
  remoteVideoEl.readyState >= 2;

export const enterCallModeUI = (audioOnly = false) => {
  if (isInCallMode) return;

  if (!audioOnly && !isVideoReady()) {
    // Video not ready yet - set up listener if we haven't already
    if (!enterCallModeWaitingForVideo) {
      enterCallModeWaitingForVideo = true;
      remoteVideoEl.addEventListener(
        'playing',
        () => {
          enterCallModeWaitingForVideo = false;
          enterCallModeUI();
        },
        { once: true },
      );
    }
    return;
  }

  // Video is ready and playing - proceed with entering call mode
  enterCallModeWaitingForVideo = false;

  isInCallMode = true;

  if (!audioOnly && isVideoReady()) {
    showElement(remoteBoxEl);
    showElement(localBoxEl);
    placeInSmallFrame(localBoxEl);

    hideElement(lobbyDiv);
  }

  if (!cleanupChatControlAutoHide) {
    // Start hidden, show on activity and auto-hide after inactivity
    cleanupChatControlAutoHide = setupShowHideOnInactivity(chatControls, {
      inactivityMs: 2500,
      hideOnEsc: true,
      excludeElements: ['.messages-box'],
      excludeInteractive: true, // Exclude all interactive elements
    });
  }

  if (!cleanupRemoteLeavePipHandler) {
    const remoteLeavePipHandler = () => {
      remoteBoxEl.style.opacity = '';
      remoteBoxEl.style.pointerEvents = '';

      if (!isInCallMode) return; // Call ended, don't restore video
      if (isWatchModeActive()) placeInSmallFrame(remoteBoxEl);
      else removeFromSmallFrame(remoteBoxEl);
      showElement(remoteBoxEl);
    };
    // Handle case when user exits PiP manually
    remoteVideoEl.addEventListener(
      'leavepictureinpicture',
      remoteLeavePipHandler,
    );

    cleanupRemoteLeavePipHandler = () =>
      remoteVideoEl.removeEventListener(
        'leavepictureinpicture',
        remoteLeavePipHandler,
      );

    cleanupFunctions.push(cleanupRemoteLeavePipHandler);
  }

  if (!cleanupRemoteEnterPipHandler) {
    const remoteEnterPipHandler = () => {
      // opacity:0 keeps the compositor pipeline active (unlike display:none or visibility:hidden)
      // so the PiP window continues to receive frames from the video element
      remoteBoxEl.style.opacity = '0';
      remoteBoxEl.style.pointerEvents = 'none';
    };

    remoteVideoEl.addEventListener(
      'enterpictureinpicture',
      remoteEnterPipHandler,
    );

    cleanupRemoteEnterPipHandler = () =>
      remoteVideoEl.removeEventListener(
        'enterpictureinpicture',
        remoteEnterPipHandler,
      );

    cleanupFunctions.push(cleanupRemoteEnterPipHandler);
  }
};

export const exitCallModeUI = () => {
  if (!isInCallMode) return;
  isInCallMode = false;

  // Exit PiP first (before cleanup removes the event listener)
  exitPiP(remoteVideoEl);

  removeFromSmallFrame(localBoxEl);
  hideElement(localBoxEl);
  removeFromSmallFrame(remoteBoxEl);
  hideElement(remoteBoxEl);

  hideElement(chatControls);
  if (cleanupChatControlAutoHide) {
    cleanupChatControlAutoHide();
    cleanupChatControlAutoHide = null;
  }

  if (!isWatchModeActive()) {
    showElement(lobbyDiv);
  }

};

// TODO: Call this
export function cleanupCallModeUI() {
  // Run all cleanup functions
  cleanupFunctions.forEach((fn) => fn());
  cleanupFunctions = [];

  // Reset state
  cleanupRemoteLeavePipHandler = null;
  cleanupRemoteEnterPipHandler = null;

  // Ensure chat-controls inactivity handler is also cleaned up
  if (cleanupChatControlAutoHide) {
    cleanupChatControlAutoHide();
    cleanupChatControlAutoHide = null;
  }
}
