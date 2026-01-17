// src/components/ui/call-mode.js
// Call mode UI state management

import {
  localBoxEl,
  remoteBoxEl,
  remoteVideoEl,
  lobbyDiv,
  lobbyCallBtn,
  chatControls,
  callBtn,
  hangUpBtn,
  mutePartnerBtn,
  remotePipBtn,
} from '../../elements.js';

import {
  showElement,
  hideElement,
  placeInSmallFrame,
  removeFromSmallFrame,
} from '../../utils/ui/ui-utils.js';

import { setupShowHideOnInactivity } from '../../utils/ui/showHideOnInactivity.js';
import { hasRemoteStream } from '../../media/state.js';
import { isWatchModeActive } from '../../firebase/watch-sync.js'; // Import from watch-sync.js (should probably be from watch-mode.js)

let isInCallMode = false; // Call mode state
let enterCallModeWaitingForVideo = false;
let cleanupRemoteLeavePipHandler = null;
let cleanupRemoteEnterPipHandler = null;
let cleanupChatControlAutoHide = null;
let cleanupFunctions = [];

// Export state getter
export const getIsInCallMode = () => isInCallMode;

export const enterCallMode = () => {
  if (isInCallMode) return;

  // Check if remote video is ready and playing
  if (
    !remoteVideoEl ||
    !hasRemoteStream() ||
    remoteVideoEl.paused ||
    remoteVideoEl.readyState < 2
  ) {
    // Video not ready yet - set up listener if we haven't already
    if (!enterCallModeWaitingForVideo) {
      enterCallModeWaitingForVideo = true;
      remoteVideoEl.addEventListener(
        'playing',
        () => {
          enterCallModeWaitingForVideo = false;
          enterCallMode();
        },
        { once: true },
      );
    }
    return;
  }

  // Video is ready and playing - proceed with entering call mode
  enterCallModeWaitingForVideo = false;

  isInCallMode = true;

  showElement(remoteBoxEl);
  showElement(localBoxEl);
  placeInSmallFrame(localBoxEl);

  hideElement(lobbyDiv);
  hideElement(lobbyCallBtn);

  callBtn.disabled = true;
  callBtn.classList.add('disabled');

  hangUpBtn.disabled = false;
  hangUpBtn.classList.remove('disabled');
  mutePartnerBtn.disabled = false;
  mutePartnerBtn.classList.remove('disabled');
  remotePipBtn.disabled = false;
  remotePipBtn.classList.remove('disabled');

  if (!cleanupChatControlAutoHide) {
    // Start hidden, show on activity and auto-hide after inactivity
    cleanupChatControlAutoHide = setupShowHideOnInactivity(chatControls, {
      inactivityMs: 2500,
      hideOnEsc: true,
    });
  }

  if (!cleanupRemoteLeavePipHandler) {
    const remoteLeavePipHandler = () => {
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
    const remoteEnterPipHandler = () => hideElement(remoteBoxEl);

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

export const exitCallMode = () => {
  if (!isInCallMode) return;
  isInCallMode = false;

  removeFromSmallFrame(localBoxEl);
  hideElement(localBoxEl);
  removeFromSmallFrame(remoteBoxEl);
  hideElement(remoteBoxEl);

  callBtn.disabled = false;
  callBtn.classList.remove('disabled');
  hangUpBtn.disabled = true;
  hangUpBtn.classList.add('disabled');
  mutePartnerBtn.disabled = true;
  mutePartnerBtn.classList.add('disabled');
  remotePipBtn.disabled = true;
  remotePipBtn.classList.add('disabled');

  if (cleanupChatControlAutoHide) {
    cleanupChatControlAutoHide();
    cleanupChatControlAutoHide = null;
  }

  if (!isWatchModeActive()) {
    showElement(lobbyCallBtn);
    showElement(lobbyDiv);
    showElement(chatControls);
  }
};

// Cleanup function for call mode UI
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
