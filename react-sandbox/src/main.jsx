import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Import vanElla web components (registers <v-counter> and <v-form>)
import '../../src/utils/dom/wip-van-components/web-components.js';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
