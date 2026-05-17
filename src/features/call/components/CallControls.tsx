// import { Phone, PhoneOff, Video } from 'lucide';
import { useCallHandshake } from '../call-handshake';
import styles from './CallControls.module.css';

type StartCallButtonProps = {
  calleeId: string;
  calleeName: string;
  audioOnly?: boolean;
  title: string;
};

export function StartCallButton(props: StartCallButtonProps) {
  const { startCall } = useCallHandshake();
  const { calleeId, calleeName, audioOnly = false, title } = props;

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
      <i data-lucide={audioOnly ? 'phone' : 'video'}></i>
    </button>
  );
}

// TODO: add mute, camera toggle, etc.
export function ActiveCallControls() {
  return (
    <div class={styles.callControls}>
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
      Hang Up
      {/* TODO: <i data-lucide={'phone-off'}></i> */}
    </button>
  );
}
