import { Show } from 'solid-js';

import PublicHomepage from './home/PublicHomepage.jsx';
import ContactsList from './contacts/ContactsList.jsx';
// import LobbyForm from './app/LobbyForm.jsx';
import Room from './room/Room.jsx';
import type { SolidP2PRoom } from '@kidlib/p2p/solid';

export default function MainContent(props: { p2p: SolidP2PRoom }) {
  return (
    <main id='main-content'>
      <div class='relative-wrapper'>
        <div id='lobby' class='lobby'>
          <PublicHomepage />
          <Show when={props.p2p.state() !== 'idle'}>
            <Room p2p={props.p2p} />
          </Show>
          <ContactsList />
        </div>
      </div>
    </main>
  );
}
