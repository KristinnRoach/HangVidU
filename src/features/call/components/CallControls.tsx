import { Mic, MicOff, Phone, PhoneOff, Video, VideoOff } from 'lucide-solid';

import { useCallHandshake } from '../call-handshake';
import { useP2PContext } from '@shared/p2p-context.js';
import { createAutoHide } from '@shared/createAutoHide';
import { createCallMedia } from '../call-media';

import styles from './CallControls.module.css';
import { useI18n } from '@shared/i18n';
import { onMount } from 'solid-js';

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

export function ActiveCallControls() {
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
        disabled={media.cameraPending()}
        classList={{ [styles.off]: !media.cameraOn() }}
        title={media.cameraOn() ? 'Turn camera off' : 'Turn camera on'}
        aria-label={media.cameraOn() ? 'Turn camera off' : 'Turn camera on'}
      >
        {media.cameraOn() ? <Video /> : <VideoOff />}
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
