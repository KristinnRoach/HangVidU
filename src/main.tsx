import { createResource, Suspense } from 'solid-js';
import type { JSX } from 'solid-js';
import { render } from 'solid-js/web';

import { setupAppRuntime } from './app/setupAppRuntime.js';
import App from './App';

function LoadingScreen() {
  return (
    <div
      class='loading-screen'
      style='display: flex;  height: 100dvh; flex-direction: column; align-items: center; justify-content: center;'
    >
      <p>Loading HangVidU...</p>
    </div>
  );
}

function AppRuntimeGate(props: { children: JSX.Element }) {
  const [runtime] = createResource(setupAppRuntime);

  function RuntimeReady(props: { children: JSX.Element }) {
    runtime();
    return <>{props.children}</>;
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <RuntimeReady>{props.children}</RuntimeReady>
    </Suspense>
  );
}

render(
  () => (
    <AppRuntimeGate>
      <App />
    </AppRuntimeGate>
  ),
  document.getElementById('root')!,
);
