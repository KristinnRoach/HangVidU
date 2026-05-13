import MainLayout from './components/MainLayout.jsx';
import CallDialogs from './features/call/components/CallDialogs.jsx';
import { CallFlowProvider } from './features/call/call-flow-context.js';
import { P2PProvider } from './shared/p2p-context.js';

// legacy setup, will be refactored:
import { setupAppRuntime } from './app/setupAppRuntime.js'; // legacy
await setupAppRuntime(); // legacy

export default function App() {
  return (
    <P2PProvider>
      <CallFlowProvider>
        <MainLayout />
        <CallDialogs />
      </CallFlowProvider>
    </P2PProvider>
  );
}
