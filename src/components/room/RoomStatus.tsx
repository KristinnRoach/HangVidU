import { Show } from 'solid-js';
import type {
  SolidP2PRoom,
  SolidP2PRoomState,
} from '@kidlib/p2p/solid';

type Props = {
  p2p: SolidP2PRoom;
};

export type RoomStatusType = SolidP2PRoomState;

export default function RoomStatus(props: Props) {
  return (
    <div class='room-status'>
      <Show when={props.p2p.memberCount()}>
        <p>
          Members: {props.p2p.memberCount()} / {props.p2p.memberCapacity()}
        </p>
      </Show>
      <Show when={props.p2p.room()?.roomId}>
        {(roomId) => <p>Room ID: {roomId()}</p>}
      </Show>
      <p>Room status: {props.p2p.state()}</p>
      <Show when={props.p2p.errorKind()}>
        {(kind) => <p>Room error: {kind()}</p>}
      </Show>
    </div>
  );
}
