// src/components/ui/watch-mode.js
// Watch mode UI state management - extracted from main.js

import {
  localVideoEl,
  remoteVideoEl,
  lobbyDiv,
  lobbyCallBtn,
  chatControls,
  callBtn,
  hangUpBtn,
  micBtn,
  mutePartnerBtn,
  cameraBtn,
  switchCameraBtn,
  exitWatchModeBtn,
  localBoxEl,
  remoteBoxEl,
} from '../../elements.js';

import {
  showElement,
  hideElement,
  isElementInPictureInPicture,
  placeInSmallFrame,
  removeFromSmallFrame,
} from '../../utils/ui/ui-utils.js';

import { isWatchModeActive, setWatchMode } from '../../firebase/watch-sync.js';

// Import from call-mode
import { getIsInCallMode } from './call-mode.js';

// Import media state
import { getRemoteStream } from '../../media/state.js';

// TODO: check if setupShowHideOnInactivity needs integrating here.

// Helper functions
export const isRemoteVideoVideoActive = () => {
  const remoteStream = getRemoteStream(false);
  return (
    remoteStream &&
    remoteStream.getVideoTracks().length > 0 &&
    remoteStream.getVideoTracks()[0].enabled &&
    remoteStream.getVideoTracks()[0].readyState === 'live'
  );
};

export function isPiPSupported() {
  return (
    'pictureInPictureEnabled' in document &&
    typeof document.pictureInPictureEnabled === 'boolean' &&
    document.pictureInPictureEnabled
  );
}

export function enterWatchMode() {
  if (isWatchModeActive()) return;
  setWatchMode(true);

  // Hide lobby if visible
  hideElement(lobbyDiv);

  // Chat controls adjustments (minimal UI)
  chatControls.classList.remove('bottom');
  chatControls.classList.add('watch-mode');

  if (getIsInCallMode()) {
    hideElement(callBtn);
    showElement(hangUpBtn);
  } else {
    hideElement(hangUpBtn);
    hideElement(micBtn);
    hideElement(mutePartnerBtn);
    showElement(callBtn);
  }

  // Minimize further
  hideElement(lobbyCallBtn);
  hideElement(cameraBtn);
  hideElement(switchCameraBtn);

  // Show exit watch mode button
  showElement(exitWatchModeBtn);

  showElement(chatControls);

  if (!isRemoteVideoVideoActive()) {
    hideElement(remoteBoxEl);
    removeFromSmallFrame(remoteBoxEl);

    if (!isElementInPictureInPicture(localVideoEl)) {
      showElement(localBoxEl);
      placeInSmallFrame(localBoxEl);
    }
    return;
  }

  // Hide local video if remote video is active
  hideElement(localBoxEl);
  removeFromSmallFrame(localBoxEl);

  if (isElementInPictureInPicture(remoteVideoEl)) {
    hideElement(remoteBoxEl); // ensure small-frame is hidden if in PiP
    removeFromSmallFrame(remoteBoxEl);
  } else if (isPiPSupported()) {
    // Try to enter PiP with fallback
    remoteVideoEl
      .requestPictureInPicture()
      .then(() => {
        // Hide the smallFrame if PiP entered successfully
        hideElement(remoteBoxEl);
        removeFromSmallFrame(remoteBoxEl);
      })
      .catch((err) => {
        console.warn('Failed to enter Picture-in-Picture:', err);
        // Fallback: place in small frame
        placeInSmallFrame(remoteBoxEl);
        showElement(remoteBoxEl);
      });
  } else {
    // PiP not supported
    placeInSmallFrame(remoteBoxEl);
    showElement(remoteBoxEl);
  }
}

export function exitWatchMode() {
  if (!isWatchModeActive()) return;

  // Hide exit watch mode button
  hideElement(exitWatchModeBtn);

  showElement(callBtn);
  showElement(hangUpBtn);
  showElement(micBtn);
  showElement(mutePartnerBtn);
  showElement(cameraBtn);
  showElement(switchCameraBtn);

  chatControls.classList.remove('watch-mode');
  chatControls.classList.add('bottom');

  showElement(chatControls);

  if (isRemoteVideoVideoActive()) {
    if (isElementInPictureInPicture(remoteVideoEl)) {
      document.exitPictureInPicture().catch((err) => {
        console.error('Failed to exit Picture-in-Picture:', err);
      });
    }

    removeFromSmallFrame(remoteBoxEl);
    showElement(remoteBoxEl);
  }

  placeInSmallFrame(localBoxEl);
  showElement(localBoxEl);

  if (!isRemoteVideoVideoActive()) {
    showElement(lobbyDiv);
    showElement(lobbyCallBtn);
  }

  setWatchMode(false);
}
