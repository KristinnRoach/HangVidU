import { createEffect, createSignal } from 'solid-js';
import { Mic, MicOff, Phone, PhoneOff, Video, VideoOff } from 'lucide-solid';

import { useCallHandshake } from '../call-handshake';
import { useP2PContext } from '../../../shared/p2p-context.js';
import { createAutoHide } from '../../../shared/createAutoHide';

import styles from './CallControls.module.css';

type StartCallButtonProps = {
  calleeId: string;
  calleeName: string;
  audioOnly?: boolean;
  title?: string;
};

export function StartCallButton(props: StartCallButtonProps) {
  const { startCall } = useCallHandshake();
  const {
    calleeId,
    calleeName,
    audioOnly = false,
    title = 'Start Call',
  } = props;

  function onCall() {
    startCall({
      calleeId,
      calleeName,
      audioOnly,
    });
  }

  return (
    <button
      class='contact-call-btn'
      type='button'
      onClick={onCall}
      title={title}
      aria-label={title}
    >
      {audioOnly ? <Phone /> : <Video />}
    </button>
  );
}

export function ActiveCallControls() {
  const p2p = useP2PContext();
  const [micOn, setMicOn] = createSignal(true);
  const [camOn, setCamOn] = createSignal(true);
  const visible = createAutoHide(3000);

  // Re-sync UI state from track state whenever the local stream changes.
  createEffect(() => {
    const stream = p2p.localStream();
    if (!stream) return;
    const audio = stream.getAudioTracks();
    const video = stream.getVideoTracks();
    if (audio.length) setMicOn(audio.every((t) => t.enabled));
    if (video.length) setCamOn(video.every((t) => t.enabled));
  });

  function toggleMic() {
    const stream = p2p.localStream();
    if (!stream) return;
    const next = !micOn();
    stream.getAudioTracks().forEach((t) => (t.enabled = next));
    setMicOn(next);
  }

  function toggleCam() {
    const stream = p2p.localStream();
    if (!stream) return;
    const next = !camOn();
    stream.getVideoTracks().forEach((t) => (t.enabled = next));
    setCamOn(next);
  }

  return (
    <div
      class={styles.callControls}
      classList={{ [styles.hidden]: !visible() }}
    >
      <button
        type='button'
        onClick={toggleMic}
        classList={{ [styles.off]: !micOn() }}
        title={micOn() ? 'Mute mic' : 'Unmute mic'}
        aria-label={micOn() ? 'Mute mic' : 'Unmute mic'}
      >
        {micOn() ? <Mic /> : <MicOff />}
      </button>
      <button
        type='button'
        onClick={toggleCam}
        classList={{ [styles.off]: !camOn() }}
        title={camOn() ? 'Turn camera off' : 'Turn camera on'}
        aria-label={camOn() ? 'Turn camera off' : 'Turn camera on'}
      >
        {camOn() ? <Video /> : <VideoOff />}
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
