import { Show } from 'solid-js';

import PublicHomepage from './home/PublicHomepage.jsx';
import ContactsList from './contacts/ContactsList.jsx';
// import LobbyForm from './app/LobbyForm.jsx';
import Room from './room/Room.jsx';
import SimpleRoom from './SimpleRoom.jsx';
import type { P2PRoom } from '@kidlib/p2p';

export default function MainContent(props: { activeRoom: P2PRoom | null }) {
  return (
    <main id='main-content'>
      <div class='relative-wrapper'>
        <div id='lobby' class='lobby'>
          <PublicHomepage />
          <Show when={props.activeRoom}>
            <Room room={props.activeRoom} />
          </Show>
          {/* <SimpleRoom /> */}
          <ContactsList />
        </div>
      </div>
    </main>
  );
}
