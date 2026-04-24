import { render } from 'solid-js/web';
import App from './App.jsx';

const rootEl = document.getElementById('root');

if (!rootEl) {
  throw new Error('Missing Solid root element');
}

const dispose = render(() => <App />, rootEl);

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    dispose();
  });
}

await import('./main.js');
