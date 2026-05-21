import MainContent from './components/MainContent.jsx';
import { CallHandshakeProvider } from './features/call/call-handshake.js';
import { P2PProvider } from './shared/p2p-context.js';
import { setDevDebugEnabled } from './shared/utils/dev/dev-utils.js';
import { setLogger } from '@kidlib/p2p';

setDevDebugEnabled(true);
setLogger((...args) => console.info('[P2P]', ...args));

export default function App() {
  return (
    <P2PProvider>
      <CallHandshakeProvider>
        <MainContent />
      </CallHandshakeProvider>
    </P2PProvider>
  );
}
