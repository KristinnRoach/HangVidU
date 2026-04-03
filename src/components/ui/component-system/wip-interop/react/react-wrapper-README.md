# React wrapper PoC for Web Components (vanElla)

This PoC provides a minimal `wrapWebComponent` factory that creates a React component for any web component tag.

Files:

- `wrapWebComponent.js` — the factory implementation
- `poc.jsx` — example usage showing `v-counter` and `v-form`

Quick notes:

- The factory expects React (pass the React namespace as the first argument).
- `eventMap` maps React prop names (like `onPropsUpdated`) to native event names (like `props-updated`).
- Properties are synced as follows: if the host element has that property (detected by `k in el`), it's set as a property; otherwise it's set as an attribute (camelCase -> kebab-case).
- Limitations:
  - No TypeScript metadata generation (lit-labs provides this for Lit)
  - Using `JSON.stringify` on prop objects for dependency lists is a simple approach — not perfect for large or circular data.
  - Slot/children support is naive: children are passed through to the web component's light DOM (works for basic cases).

Usage (in your React app):

1. Make sure the web components are imported/registered before React mounts. For example,

```js
import './src/utils/dom/wip-van-components/web-components.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Demo } from './src/utils/dom/wip-interop/react/poc.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(<Demo />);
```

2. Use the wrapped components as shown in `poc.jsx`.

If you'd like, I can either:

- Create a tiny runnable React sandbox (project) to verify end-to-end, or
- Add a thin example that uses `@lit-labs/react` and compare behavior.

Which next step do you prefer?
