import {
  ScanFace,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  ScreenShare,
  ScreenShareOff,
  SwitchCamera,
  Video,
  VideoOff,
  Volume2,
  VolumeX,
} from 'lucide-solid';

import { useCallHandshake } from '../call-handshake';
import { Spinner } from '@components/Spinner';
import { createAutoHide } from '@shared/createAutoHide';
import type { CallMedia } from '../call-media';

import styles from './CallControls.module.css';
import { useI18n } from '@shared/i18n';
import { showToast } from '@components/toast';
import { onCleanup, Show } from 'solid-js';

const MEDIA_ERROR_KEYS: Record<string, string> = {
  NotAllowedError: 'blocked',
  NotFoundError: 'not_found',
  NotReadableError: 'in_use',
};

type StartCallButtonProps = {
  calleeId: string;
  calleeName?: string;
  audioOnly?: boolean;
  title?: string;
};

export function StartCallButton(props: StartCallButtonProps) {
  const { startCall, isCallDisabled } = useCallHandshake();
  const { t } = useI18n();

  const calleeName = () => props.calleeName || t('call.unknown_caller');
  const audioOnly = () => props.audioOnly ?? false;
  const title = () =>
    props.title || t('contact.action.call', { name: calleeName() });

  function onCall() {
    void startCall({
      calleeId: props.calleeId,
      calleeName: calleeName(),
      audioOnly: audioOnly(),
    });
  }

  return (
    <button
      class={'contact-call-btn'}
      type='button'
      onClick={onCall}
      disabled={isCallDisabled(props.calleeId)}
      title={title()}
      aria-label={title()}
    >
      {audioOnly() ? <Phone /> : <Video />}
    </button>
  );
}

type ActiveCallControlsProps = {
  media: CallMedia;
  remoteAudioMuted: boolean;
  onRemoteAudioMutedChange: (muted: boolean) => void;
};

export function ActiveCallControls(props: ActiveCallControlsProps) {
  const media = props.media;
  const { visible } = createAutoHide(5000);
  const { t } = useI18n();

  // Toasts render in a body portal; this lifts them above the controls for the
  // whole call, not only while the auto-hidden controls are visible.
  const root = document.documentElement.style;
  const observer = new ResizeObserver(([entry]) =>
    root.setProperty(
      '--call-controls-height',
      `${entry!.borderBoxSize[0]!.blockSize}px`,
    ),
  );
  onCleanup(() => {
    observer.disconnect();
    root.removeProperty('--call-controls-height');
  });

  function reportMediaError(
    device: 'microphone' | 'camera',
    label: string,
    error: unknown,
  ) {
    console.error(`[CallMedia] Failed to ${label}`, error);
    const name = (error as Error | undefined)?.name ?? '';
    const reason = Object.hasOwn(MEDIA_ERROR_KEYS, name)
      ? MEDIA_ERROR_KEYS[name]
      : 'generic';
    showToast(t(`call.media_error.${device}.${reason}`), { tone: 'error' });
  }

  const micAction = () =>
    media.micRecoveryPending()
      ? t('call.controls.mic_cancel_recovery')
      : media.micOn()
        ? t('call.controls.mic_mute')
        : t('call.controls.mic_unmute');

  const cameraAction = () =>
    media.cameraOn()
      ? t('call.controls.camera_off')
      : t('call.controls.camera_on');

  const remoteAudioAction = () =>
    props.remoteAudioMuted
      ? t('call.controls.remote_audio_unmute')
      : t('call.controls.remote_audio_mute');

  const screenShareAction = () =>
    media.screenSharing()
      ? t('call.controls.stop_sharing_screen')
      : t('call.controls.share_screen');

  const faceMaskAction = () =>
    media.faceMaskOn()
      ? t('call.controls.remove_mask')
      : t('call.controls.face_mask');

  function toggleMic() {
    void Promise.resolve(
      media.setMicEnabled(!(media.micOn() || media.micRecoveryPending())),
    ).catch((error) =>
      reportMediaError('microphone', 'change microphone state', error),
    );
  }

  function toggleCam() {
    void media
      .setCameraEnabled(!media.cameraOn())
      .catch((error) =>
        reportMediaError('camera', 'change camera state', error),
      );
  }

  function switchCamera() {
    void media
      .switchCamera()
      .catch((error) => reportMediaError('camera', 'switch camera', error));
  }

  // No toast: cancelling the screen picker also rejects with NotAllowedError.
  function toggleScreenShare() {
    void media.toggleScreenShare().catch((error) => {
      console.error('[CallMedia] Failed to change screen-share state', error);
    });
  }

  return (
    <div
      ref={(el) => observer.observe(el)}
      class={styles.callControls}
      classList={{
        [styles.hidden!]: !visible(),
      }}
    >
      <button
        type='button'
        onClick={toggleCam}
        disabled={media.cameraPending() || media.screenSharing()}
        classList={{ [styles.off!]: !media.cameraOn() }}
        title={cameraAction()}
        aria-label={cameraAction()}
      >
        {media.cameraOn() ? <Video /> : <VideoOff />}
      </button>
      <button
        type='button'
        onClick={toggleMic}
        classList={{ [styles.off!]: !media.micOn() }}
        title={micAction()}
        aria-label={micAction()}
      >
        <Show
          when={media.micRecoveryPending()}
          fallback={media.micOn() ? <Mic /> : <MicOff />}
        >
          <Spinner label={t('call.controls.mic_recovering')} />
        </Show>
      </button>
      <button
        type='button'
        onClick={() => props.onRemoteAudioMutedChange(!props.remoteAudioMuted)}
        classList={{ [styles.off!]: props.remoteAudioMuted }}
        title={remoteAudioAction()}
        aria-label={remoteAudioAction()}
      >
        {props.remoteAudioMuted ? <VolumeX /> : <Volume2 />}
      </button>
      <Show when={media.cameraSwitchAvailable()}>
        <button
          type='button'
          onClick={switchCamera}
          disabled={
            media.cameraPending() || media.screenSharing() || !media.cameraOn()
          }
          title={t('call.controls.switch_camera')}
          aria-label={t('call.controls.switch_camera')}
        >
          <SwitchCamera />
        </button>
      </Show>
      <Show when={media.screenShareAvailable()}>
        <button
          type='button'
          onClick={toggleScreenShare}
          disabled={media.cameraPending()}
          classList={{ [styles.off!]: !media.screenSharing() }}
          title={screenShareAction()}
          aria-label={screenShareAction()}
        >
          {media.screenSharing() ? <ScreenShareOff /> : <ScreenShare />}
        </button>
      </Show>

      <Show when={media.faceMaskSupported()}>
        <button
          type='button'
          onClick={() => void media.toggleFaceMask()}
          disabled={
            (!media.mediaFlowing() && !media.faceMaskOn()) ||
            media.cameraPending() ||
            media.screenSharing() ||
            !media.cameraOn()
          }
          aria-pressed={media.faceMaskOn()}
          title={faceMaskAction()}
          aria-label={faceMaskAction()}
          classList={{ [styles.active!]: media.faceMaskOn() }}
        >
          <ScanFace />
        </button>
      </Show>

      <EndCallButton />
    </div>
  );
}

function EndCallButton() {
  const { hangUp } = useCallHandshake();
  const { t } = useI18n();

  return (
    <button
      type='button'
      class={styles.hangup}
      onClick={hangUp}
      title={t('call.controls.end_call')}
      aria-label={t('call.controls.end_call')}
    >
      <PhoneOff />
    </button>
  );
}
