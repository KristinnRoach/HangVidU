// src/components/ui/watch-mode.js
// Watch mode UI state management

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
  placeInSmallFrame,
  removeFromSmallFrame,
  requestPiP,
  exitPiP,
} from '../../utils/ui/ui-utils.js';

import { isWatchModeActive, setWatchMode } from '../../firebase/watch-sync.js';

// Import from call-mode
import { getIsInCallMode } from './call-mode.js';

// Import media state
import { hasRemoteStream, getRemoteStream } from '../../media/state.js';
import { devDebug } from '../../utils/dev/dev-utils.js';

// TODO: check if setupShowHideOnInactivity needs integrating here.

// Helper functions
export const isRemoteVideoVideoActive = () => {
  if (!hasRemoteStream()) return false;

  const remoteStream = getRemoteStream();
  return (
    remoteStream &&
    remoteStream.getVideoTracks().length > 0 &&
    remoteStream.getVideoTracks()[0].enabled &&
    remoteStream.getVideoTracks()[0].readyState === 'live'
  );
};

export function enterWatchMode() {
  if (isWatchModeActive()) return;
  setWatchMode(true);

  // Hide lobby if visible
  hideElement(lobbyDiv);
  hideElement(lobbyCallBtn);

  // Chat controls adjustments (minimal UI)
  chatControls.classList.remove('bottom');
  chatControls.classList.add('watch-mode');

  devDebug('Entered watch mode UI, isInCallMode:', getIsInCallMode());

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
  hideElement(cameraBtn);
  hideElement(switchCameraBtn);

  // Show exit watch mode button
  showElement(exitWatchModeBtn);

  showElement(chatControls);

  // Only manage video elements if in an active call
  if (getIsInCallMode()) {
    hideElement(localBoxEl);
    removeFromSmallFrame(localBoxEl);
    hideElement(remoteBoxEl);

    requestPiP(remoteVideoEl, remoteBoxEl);
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
    exitPiP(remoteVideoEl);
    removeFromSmallFrame(remoteBoxEl);
    showElement(remoteBoxEl);
  }

  if (getIsInCallMode()) {
    placeInSmallFrame(localBoxEl);
    showElement(localBoxEl);
  } else {
    showElement(lobbyDiv);
    showElement(lobbyCallBtn);

    removeFromSmallFrame(localBoxEl);
    hideElement(localBoxEl);
  }

  setWatchMode(false);
}
