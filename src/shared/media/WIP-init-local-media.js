import { getElements } from '../../elements.js';
import { setUpLocalStream } from './stream.js';
import { getLocalStream } from './state.js';
import {
  hasInitializedLocalStreamAndMedia,
  markLocalStreamAndMediaInitialized,
  resetLocalStreamInitFlag,
} from './local-stream-init-state.js';
import { showElement, hideElement } from '../components/ui/utils/ui-utils.js';
import { isWatchModeActive } from '../../features/watch/watch-sync.js';
import { isRemoteVideoVideoActive } from '../components/ui/core/legacy/watch-mode.js';
import { t } from '../i18n/index.js';
import { publish } from '../events/index.js';

export async function initLocalStreamAndMedia({ audioOnly = false } = {}) {
  if (hasInitializedLocalStreamAndMedia()) return;
  markLocalStreamAndMediaInitialized();

  const { localVideoEl, localBoxEl } = getElements();

  await setUpLocalStream(localVideoEl, { audioOnly });
  publish('evt:media:local-stream:ready', {
    audioOnly,
    localStream: getLocalStream(),
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
    // confirm() so PWA users (no easy reload) can recover in one tap.
    if (confirm(t('error.media.permission'))) {
      window.location.reload();
    }
  }
  resetLocalStreamInitFlag();
}
