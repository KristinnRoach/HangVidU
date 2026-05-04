import { createEffect, createSignal, onCleanup, Show } from 'solid-js';
import type { P2PRoom, P2PRoomState } from '@kidlib/p2p';

type Props = {
  room?: P2PRoom;
  status: RoomStatusType;
  error?: string;
};

export type RoomStatusType = P2PRoomState | 'idle' | 'full' | 'error';

export default function RoomStatus(props: Props) {
  const [memberCount, setMemberCount] = createSignal(0);
  const [memberCapacity, setMemberCapacity] = createSignal<number>();
  const [roomId, setRoomId] = createSignal<string>();

  createEffect(() => {
    const room = props.room;
    if (!room || !room.roomId) {
      setMemberCount(0);
      setMemberCapacity(undefined);
      setRoomId(undefined);
      return;
    }

    setRoomId(room.roomId);
    setMemberCount(room.memberCount);
    setMemberCapacity(room.memberCapacity);

    const cleanups = [
      room.on('membersChanged', ({ memberCount, memberCapacity }) => {
        setMemberCount(memberCount);
        setMemberCapacity(memberCapacity);
      }),
    ];

    onCleanup(() => cleanups.forEach((cleanup) => cleanup()));
  });

  return (
    <div class='room-status'>
      <Show when={memberCount()}>
        <p>
          Members: {memberCount()} / {memberCapacity()}
        </p>
      </Show>
      <Show when={roomId()}>
        <p>Room ID: {roomId()}</p>
        <p>Room status: {props.status} </p>
      </Show>
      <Show when={props.error}>
        <p>{props.error}</p>
      </Show>
    </div>
  );
}
