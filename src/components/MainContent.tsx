import { createSignal, onMount, onCleanup, createEffect, Show } from 'solid-js';

import PublicHomepage from './home/PublicHomepage.jsx';
import LobbyForm from './app/LobbyForm.jsx';
import ContactsList from './contacts/ContactsList.jsx';
import Room from './room/Room.jsx';
import ChatControlsContainer from './app/ChatControlsContainer.jsx';
import type { RoomStatusType } from './room/RoomStatus';
import { useRooms } from './useRooms';
import { P2PRoom } from '@kidlib/p2p';

export default function MainContent() {
  const [room, setRoom] = createSignal<P2PRoom>();
  const [status, setStatus] = createSignal<RoomStatusType>();
  const [error, setError] = createSignal<string>();

  createEffect(() => {
    const liveRoom = useRooms().getLiveRoom();
    setRoom(liveRoom);
  });

  onMount(async () => {
    useRooms().init();
    // const roomId = new URL(window.location.href).searchParams.get('room')?.trim();
    // if (roomId) await useRooms().enterRoom(roomId).catch(console.error);
  });

  onCleanup(() => {
    setStatus('idle');
    setError(undefined);
    useRooms().cleanupRooms();
  });

  return (
    <main id='main-content'>
      <div class='relative-wrapper'>
        <div id='lobby' class='lobby'>
          <PublicHomepage />
          <Show when={room()}>
            <Room room={room()} />
          </Show>
          <ContactsList />
        </div>
      </div>
      <ChatControlsContainer />
    </main>
  );
}
