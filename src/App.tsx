import MainContent from './components/MainContent.jsx';
import { CallHandshakeProvider } from './features/call/call-handshake.js';
import { P2PProvider } from './shared/p2p-context.js';
import { setDevDebugEnabled } from './shared/utils/dev/dev-utils.js';

setDevDebugEnabled(true);

export default function App() {
  return (
    <P2PProvider>
      <CallHandshakeProvider>
        <MainContent />
      </CallHandshakeProvider>
    </P2PProvider>
  );
}
