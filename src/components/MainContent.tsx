import { Show } from 'solid-js';

import PublicHomepage from './app/PublicHomepage.jsx';
import ContactsList from './contacts/ContactsList.jsx';
// import LobbyForm from './app/LobbyForm.jsx';
import ActiveCallRoom from '../features/call/components/ActiveCallRoom.jsx';
import { useP2P } from '../shared/p2p-context.js';

export default function MainContent() {
  const p2p = useP2P();

  return (
    <main id='main-content'>
      <div class='relative-wrapper'>
        <div id='lobby' class='lobby'>
          <PublicHomepage />
          <Show when={p2p.state() !== 'idle'}>
            <ActiveCallRoom />
          </Show>
          <ContactsList />
        </div>
      </div>
    </main>
  );
}
