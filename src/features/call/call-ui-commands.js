import CallController from './call-controller.js';
import { getCallOptions, applyCallResult } from './WIP-start-call-refactor.js';
import {
  initLocalStream,
  handleMediaPermissionError,
} from '../../shared/media/WIP-init-local-media.js';
import { getLastWatched } from '../watch/watch-sync.js';
import {
  pauseYouTubeVideo,
  hideYouTubePlayer,
} from '../../shared/media/youtube/youtube-player.js';
import { sharedVideoEl, sharedBoxEl } from '../../elements.js';
import { hideElement } from '../../shared/components/ui/utils/ui-utils.js';
import { onWatchModeExited } from '../../shared/components/ui/core/watch-lifecycle-ui.js';

export async function startCallCommand() {
  try {
    await initLocalStream();
    const result = await CallController.createCall(getCallOptions());
    applyCallResult(result, true);
  } catch (error) {
    console.error('Failed to start call:', error);
    handleMediaPermissionError(error);
  }
}

export function exitWatchModeCommand() {
  if (getLastWatched() === 'yt') {
    pauseYouTubeVideo();
    hideYouTubePlayer();
  } else if (getLastWatched() === 'url' || getLastWatched() === 'file') {
    sharedVideoEl.pause();
    if (sharedVideoEl.src.startsWith('blob:')) {
      URL.revokeObjectURL(sharedVideoEl.src);
    }
    hideElement(sharedBoxEl);
  }
  onWatchModeExited();
}

export async function hangUpCommand() {
  console.debug('Hanging up...');
  await CallController.hangUp({ emitCancel: true, reason: 'user_hung_up' });
}
