import { showErrorToast } from '../components/toast.js';
import { t } from '../i18n/index.js';
import {
  getAudioConstraints,
  getFallbackAudioConstraints,
} from './constraints.js';
import CallController from '../../features/call/call-controller.js';
import { abortAudioEndedController, setAudioEndedController } from './state.js';

/**
 * Attach explicit audio-input monitoring and auto-recovery to a local stream.
 *
 * Intent:
 * - If the active microphone track ends (e.g. Bluetooth mic disappears),
 *   reacquire any available microphone.
 * - Preserve mute state.
 * - Replace the audio sender track on the active PeerConnection when present.
 *
 * Notes:
 * - This is intentionally self-contained and explicit so it can be removed or
 *   replaced cleanly in the upcoming media refactor.
 * - We keep using the existing "audio ended controller" state slot for cleanup.
 *
 * @param {MediaStream} localStream
 */
export function attachAudioInputRecovery(localStream) {
  abortAudioEndedController();
  if (!localStream) return;

  const controller = new AbortController();
  setAudioEndedController(controller);

  let recoveryPromise = null;

  const recoverIfNeeded = async (trigger) => {
    if (controller.signal.aborted) return false;
    if (!shouldRecoverLocalAudioTrack(localStream)) return false;
    if (recoveryPromise) return recoveryPromise;

    recoveryPromise = recoverLocalAudioInput(localStream, trigger)
      .catch((error) => {
        console.warn('[media] audio input recovery failed:', error);
        showErrorToast(t('media.audio_disconnected'));
        return false;
      })
      .finally(() => {
        recoveryPromise = null;
      });

    return recoveryPromise;
  };

  const attachTrackEndedListener = () => {
    const track = localStream.getAudioTracks()[0];
    if (!track) return;
    track.addEventListener(
      'ended',
      () => {
        recoverIfNeeded('audio_track_ended');
      },
      { signal: controller.signal },
    );
  };

  attachTrackEndedListener();

  if (
    navigator.mediaDevices &&
    typeof navigator.mediaDevices.addEventListener === 'function'
  ) {
    navigator.mediaDevices.addEventListener(
      'devicechange',
      () => {
        recoverIfNeeded('devicechange');
      },
      { signal: controller.signal },
    );
  }

  if (shouldRecoverLocalAudioTrack(localStream)) {
    recoverIfNeeded('initial_missing_or_ended_audio_track');
  }
}

function shouldRecoverLocalAudioTrack(localStream) {
  const audioTrack = localStream?.getAudioTracks?.()[0];
  return !audioTrack || audioTrack.readyState !== 'live';
}

async function recoverLocalAudioInput(localStream, trigger) {
  const replacementAudioTrack = await requestReplacementAudioTrack();
  if (!replacementAudioTrack) return false;

  const previousAudioTrack = localStream.getAudioTracks()[0] || null;
  const wasEnabled = previousAudioTrack ? previousAudioTrack.enabled : true;
  replacementAudioTrack.enabled = wasEnabled;

  replaceAudioTrackInLocalStream({
    localStream,
    previousAudioTrack,
    replacementAudioTrack,
  });

  await replaceAudioTrackInActivePeerConnection({
    replacementAudioTrack,
  });

  attachAudioInputRecovery(localStream);

  console.info('[media] audio input recovered', { trigger });
  return true;
}

async function requestReplacementAudioTrack() {
  let replacementStream = null;
  try {
    replacementStream = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: getAudioConstraints(),
    });
  } catch (error) {
    if (error?.name !== 'OverconstrainedError') {
      throw error;
    }

    replacementStream = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: getFallbackAudioConstraints(),
    });
  }

  const replacementAudioTrack = replacementStream.getAudioTracks()[0];
  if (!replacementAudioTrack) {
    replacementStream.getTracks().forEach((track) => track.stop());
    throw new Error('No replacement audio track available');
  }

  for (const track of replacementStream.getTracks()) {
    if (track !== replacementAudioTrack) {
      track.stop();
    }
  }

  return replacementAudioTrack;
}

function replaceAudioTrackInLocalStream({
  localStream,
  previousAudioTrack,
  replacementAudioTrack,
}) {
  if (previousAudioTrack) {
    localStream.removeTrack(previousAudioTrack);
    previousAudioTrack.stop();
  }
  localStream.addTrack(replacementAudioTrack);
}

async function replaceAudioTrackInActivePeerConnection({
  replacementAudioTrack,
}) {
  const callState = CallController.getState();
  if (!callState?.hasPc) {
    return;
  }

  const pc = CallController.getPeerConnection();
  if (!pc || typeof pc.getSenders !== 'function') return;

  const audioSender = pc
    .getSenders()
    .find((sender) => sender.track?.kind === 'audio');
  if (audioSender && typeof audioSender.replaceTrack === 'function') {
    await audioSender.replaceTrack(replacementAudioTrack);
  }
}
