import { render } from 'solid-js/web';
import App from './App.jsx';
import { initI18n } from './shared/i18n/index.js';

const rootEl = document.getElementById('root');

if (!rootEl) {
  throw new Error('Missing Solid root element');
}

await initI18n();

const dispose = render(() => <App />, rootEl);

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    dispose();
  });
}

await import('./main.js');
