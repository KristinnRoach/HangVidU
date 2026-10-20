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
import { createAutoHide } from '@shared/createAutoHide';
import type { CallMedia } from '../call-media';

import styles from './CallControls.module.css';
import { useI18n } from '@shared/i18n';
import { showErrorToast } from '../../../components/base-legacy/toast.js';
import { onMount, Show } from 'solid-js';

const MEDIA_ERROR_KEYS: Record<string, string> = {
  NotAllowedError: 'call.media_error.blocked',
  NotFoundError: 'call.media_error.not_found',
  NotReadableError: 'call.media_error.in_use',
};

type StartCallButtonProps = {
  calleeId: string;
  calleeName?: string;
  audioOnly?: boolean;
  title?: string;
};

export function StartCallButton(props: StartCallButtonProps) {
  const { startCall } = useCallHandshake();
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

  function reportMediaError(label: string, error: unknown) {
    console.error(`[CallMedia] Failed to ${label}`, error);
    const name = (error as Error | undefined)?.name ?? '';
    showErrorToast(t(MEDIA_ERROR_KEYS[name] ?? 'call.media_error.generic'));
  }

  function toggleMic() {
    void Promise.resolve(media.setMicEnabled(!media.micOn())).catch((error) =>
      reportMediaError('change microphone state', error),
    );
  }

  function toggleCam() {
    void media
      .setCameraEnabled(!media.cameraOn())
      .catch((error) => reportMediaError('change camera state', error));
  }

  function switchCamera() {
    void media
      .switchCamera()
      .catch((error) => reportMediaError('switch camera', error));
  }

  // No toast: cancelling the screen picker also rejects with NotAllowedError.
  function toggleScreenShare() {
    void media.toggleScreenShare().catch((error) => {
      console.error('[CallMedia] Failed to change screen-share state', error);
    });
  }

  onMount(() => {
    if (import.meta.env.DEV) toggleMic(); // Mute mic by default in dev to avoid feedback
  });

  return (
    <div
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
        title={media.cameraOn() ? 'Turn camera off' : 'Turn camera on'}
        aria-label={media.cameraOn() ? 'Turn camera off' : 'Turn camera on'}
      >
        {media.cameraOn() ? <Video /> : <VideoOff />}
      </button>
      <button
        type='button'
        onClick={toggleMic}
        classList={{ [styles.off!]: !media.micOn() }}
        title={media.micOn() ? 'Mute mic' : 'Unmute mic'}
        aria-label={media.micOn() ? 'Mute mic' : 'Unmute mic'}
      >
        {media.micOn() ? <Mic /> : <MicOff />}
      </button>
      <button
        type='button'
        onClick={() => props.onRemoteAudioMutedChange(!props.remoteAudioMuted)}
        classList={{ [styles.off!]: props.remoteAudioMuted }}
        title={
          props.remoteAudioMuted ? 'Unmute remote audio' : 'Mute remote audio'
        }
        aria-label={
          props.remoteAudioMuted ? 'Unmute remote audio' : 'Mute remote audio'
        }
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
          title='Switch camera'
          aria-label='Switch camera'
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
          title={media.screenSharing() ? 'Stop sharing screen' : 'Share screen'}
          aria-label={
            media.screenSharing() ? 'Stop sharing screen' : 'Share screen'
          }
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
          title={media.faceMaskOn() ? 'Remove mask' : 'Face mask'}
          aria-label={media.faceMaskOn() ? 'Remove mask' : 'Face mask'}
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

  return (
    <button
      type='button'
      class={styles.hangup}
      onClick={hangUp}
      title={'End Call'}
      aria-label={'End Call'}
    >
      <PhoneOff />
    </button>
  );
}
