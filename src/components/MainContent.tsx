import { Show } from 'solid-js';

import PublicHomepage from './app/PublicHomepage.jsx';
import ContactsList from './contacts/ContactsList.jsx';
// import LobbyForm from './app/LobbyForm.jsx';
import ActiveCallRoom from '../features/call/components/ActiveCallRoom.jsx';
import type { SolidP2PRoom } from '@kidlib/p2p/solid';

export default function MainContent(props: { p2p: SolidP2PRoom }) {
  return (
    <main id='main-content'>
      <div class='relative-wrapper'>
        <div id='lobby' class='lobby'>
          <PublicHomepage />
          <Show when={props.p2p.state() !== 'idle'}>
            <ActiveCallRoom p2p={props.p2p} />
          </Show>
          <ContactsList />
        </div>
      </div>
    </main>
  );
}
