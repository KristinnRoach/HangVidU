import { AuthProvider } from '@auth';
import MainContent from './app/MainContent';
import { CallHandshakeProvider } from '@features/call';
import { P2PProvider } from '@shared/p2p-context.js';
import { setDevDebugEnabled } from '@shared/utils/dev/dev-utils.js';
import { setLogger } from '@kidlib/p2p';
import SWNavigation from './app/SWNavigation';

const isDev = import.meta.env.DEV;
setDevDebugEnabled(isDev);
isDev && setLogger((...args) => console.info('[P2P]', ...args));

export default function App() {
  return (
    <AuthProvider>
      <P2PProvider>
        <CallHandshakeProvider>
          <SWNavigation />
          <MainContent />
        </CallHandshakeProvider>
      </P2PProvider>
    </AuthProvider>
  );
}
