import {
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
import { useP2PContext } from '@shared/p2p-context.js';
import { createAutoHide } from '@shared/createAutoHide';
import { createCallMedia } from '../call-media';

import styles from './CallControls.module.css';
import { useI18n } from '@shared/i18n';
import { onMount, Show } from 'solid-js';

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
  remoteAudioMuted: boolean;
  onRemoteAudioMutedChange: (muted: boolean) => void;
};

export function ActiveCallControls(props: ActiveCallControlsProps) {
  const p2p = useP2PContext();
  const media = createCallMedia(p2p);
  const visible = createAutoHide(3000);

  function toggleMic() {
    media.setMicEnabled(!media.micOn());
  }

  function toggleCam() {
    void media.setCameraEnabled(!media.cameraOn()).catch((error) => {
      console.error('[CallMedia] Failed to change camera state', error);
    });
  }

  function switchCamera() {
    void media.switchCamera().catch((error) => {
      console.error('[CallMedia] Failed to switch camera', error);
    });
  }

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
      classList={{ [styles.hidden]: !visible() }}
    >
      <button
        type='button'
        onClick={toggleMic}
        classList={{ [styles.off]: !media.micOn() }}
        title={media.micOn() ? 'Mute mic' : 'Unmute mic'}
        aria-label={media.micOn() ? 'Mute mic' : 'Unmute mic'}
      >
        {media.micOn() ? <Mic /> : <MicOff />}
      </button>
      <button
        type='button'
        onClick={toggleCam}
        disabled={media.cameraPending() || media.screenSharing()}
        classList={{ [styles.off]: !media.cameraOn() }}
        title={media.cameraOn() ? 'Turn camera off' : 'Turn camera on'}
        aria-label={media.cameraOn() ? 'Turn camera off' : 'Turn camera on'}
      >
        {media.cameraOn() ? <Video /> : <VideoOff />}
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
          classList={{ [styles.off]: !media.screenSharing() }}
          title={media.screenSharing() ? 'Stop sharing screen' : 'Share screen'}
          aria-label={
            media.screenSharing() ? 'Stop sharing screen' : 'Share screen'
          }
        >
          {media.screenSharing() ? <ScreenShareOff /> : <ScreenShare />}
        </button>
      </Show>
      <button
        type='button'
        onClick={() => props.onRemoteAudioMutedChange(!props.remoteAudioMuted)}
        classList={{ [styles.off]: props.remoteAudioMuted }}
        title={
          props.remoteAudioMuted ? 'Unmute remote audio' : 'Mute remote audio'
        }
        aria-label={
          props.remoteAudioMuted ? 'Unmute remote audio' : 'Mute remote audio'
        }
      >
        {props.remoteAudioMuted ? <VolumeX /> : <Volume2 />}
      </button>
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
