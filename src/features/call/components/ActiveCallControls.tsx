import { dispatchCommand } from '../../../shared/events';
import styles from './ActiveCallControls.module.css';

const hangUpCommand = () => {
  dispatchCommand('cmd:room:exit:call');
};

export default function ActiveCallControls() {
  return (
    <div class={styles.callControls}>
      <button type='button' class={styles.hangup} onClick={hangUpCommand}>
        Hang Up
      </button>
    </div>
  );
}
