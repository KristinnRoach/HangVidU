import { Show } from 'solid-js';

import MemberStreams from './MemberStreams';
import ActiveCallControls from './ActiveCallControls';
import { useP2PContext } from '../../../shared/p2p-context.js';

import styles from './ActiveCallRoom.module.css';

export default function ActiveCallRoom() {
  const p2p = useP2PContext();

  return (
    <div class={styles.room}>
      <MemberStreams />

      <Show when={p2p.state() === 'joined'}>
        <ActiveCallControls />
      </Show>
    </div>
  );
}
