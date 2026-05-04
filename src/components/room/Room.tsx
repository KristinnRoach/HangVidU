import { Show } from 'solid-js';

import type { P2PRoom } from '@kidlib/p2p';
import type { RoomStatusType } from './RoomStatus';
import RoomStatus from './RoomStatus';
import RoomMembers from './RoomMembers';

import './RoomExample.css';

type Props = {
  room?: P2PRoom;
  status?: RoomStatusType;
  error?: string;
};

export default function Room(props: Props) {
  if (!props.room) {
    console.warn('Room component rendered without a room prop');
    return null;
  }

  return (
    <div class='room'>
      <Show when={props.status}>
        <RoomStatus
          room={props.room}
          status={props.status!}
          error={props.error}
        />
      </Show>

      <RoomMembers room={props.room} />
    </div>
  );
}
