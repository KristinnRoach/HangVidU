import { Show } from 'solid-js';

import MemberStreams from './MemberStreams';
import ActiveCallControls from './ActiveCallControls';
import { useP2P } from '../../../shared/p2p-context.js';

import './ActiveCallRoom.module.css';

export default function ActiveCallRoom() {
  const p2p = useP2P();

  return (
    <div class='room'>
      <MemberStreams />

      <Show when={p2p.state() === 'joined'}>
        <ActiveCallControls />
      </Show>
    </div>
  );
}
