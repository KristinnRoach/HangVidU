import { getElements } from '../../elements.js';
import { setUpLocalStream } from './stream.js';
import { getLocalStream, setLocalStream } from './state.js';
import {
  hasInitializedLocalStreamAndMedia,
  markLocalStreamAndMediaInitialized,
  resetLocalStreamInitFlag,
} from './local-stream-init-state.js';
import { initializeMediaControls } from './media-controls.js';
import CallController from '../../features/call/call-controller.js';
import { showElement, hideElement } from '../components/ui/utils/ui-utils.js';
import { isWatchModeActive } from '../../features/watch/watch-sync.js';
import { isRemoteVideoVideoActive } from '../components/ui/core/legacy/watch-mode.js';
import { t } from '../i18n/index.js';

// TODO: This is a temp WIP extraction - decoupling considerations:
// imports CallController for getPeerConnection(), media/ → call/ dependency.

export async function initLocalStreamAndMedia() {
  if (hasInitializedLocalStreamAndMedia()) return;
  markLocalStreamAndMediaInitialized();

  const {
    localVideoEl,
    remoteVideoEl,
    localBoxEl,
    micBtn,
    cameraBtn,
    switchCameraBtn,
    mutePartnerBtn,
    fullscreenPartnerBtn,
    remotePipBtn,
  } = getElements();

  await setUpLocalStream(localVideoEl);

  initializeMediaControls({
    getLocalStream,
    getLocalVideo: () => localVideoEl,
    getRemoteVideo: () => remoteVideoEl,
    getPeerConnection: () => CallController.getPeerConnection(),
    setLocalStream,

    micBtn,
    cameraBtn,
    switchCameraBtn,
    mutePartnerBtn,
    fullscreenPartnerBtn,
    remotePipBtn,
  });

  if (localVideoEl) {
    localVideoEl.addEventListener(
      'enterpictureinpicture',
      () => localBoxEl && hideElement(localBoxEl),
    );

    localVideoEl.addEventListener('leavepictureinpicture', () => {
      if (localBoxEl && !(isWatchModeActive() && isRemoteVideoVideoActive())) {
        showElement(localBoxEl);
      }
    });
  }
}

export function handleMediaPermissionError(error) {
  if (
    error?.name === 'NotAllowedError' ||
    error?.name === 'PermissionDeniedError'
  ) {
    alert(t('error.media.permission'));
  }
  resetLocalStreamInitFlag();
}
