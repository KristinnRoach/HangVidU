import { Show } from 'solid-js';

import type { SolidP2PRoom } from '@kidlib/p2p/solid';
import RoomMembers from './RoomMembers';
import ChatControls from '../app/ChatControls';

import './RoomExample.css';

type Props = {
  p2p: SolidP2PRoom;
};

export default function Room(props: Props) {
  return (
    <div class='room'>
      <RoomMembers p2p={props.p2p} />

      <Show when={props.p2p.state() === 'joined'}>
        <ChatControls />
      </Show>
    </div>
  );
}
