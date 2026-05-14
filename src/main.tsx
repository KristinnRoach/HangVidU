import { render } from 'solid-js/web';

import { AppRuntime } from './app/AppRuntime.jsx';
import App from './App';

render(
  () => (
    <AppRuntime>
      <App />
    </AppRuntime>
  ),
  document.getElementById('root')!,
);
