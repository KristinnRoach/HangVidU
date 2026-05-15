import MainLayout from './components/MainLayout.jsx';
import CallDialogs from './features/call/components/CallDialogs.jsx';
import { CallHandshakeProvider } from './features/call/call-handshake.js';
import { P2PProvider } from './shared/p2p-context.js';

export default function App() {
  return (
    <P2PProvider>
      <CallHandshakeProvider>
        <MainLayout />
        <CallDialogs />
      </CallHandshakeProvider>
    </P2PProvider>
  );
}
