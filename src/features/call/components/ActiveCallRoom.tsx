import { Show } from 'solid-js';

import type { SolidP2PRoom } from '@kidlib/p2p/solid';
import MemberStreams from './MemberStreams';
import ActiveCallControls from './ActiveCallControls';

import './ActiveCallRoom.module.css';

type Props = {
  p2p: SolidP2PRoom;
};

export default function ActiveCallRoom(props: Props) {
  return (
    <div class='room'>
      <MemberStreams p2p={props.p2p} />

      <Show when={props.p2p.state() === 'joined'}>
        <ActiveCallControls />
      </Show>
    </div>
  );
}
