/*
Minimal PoC React usage (paste into a React app)
This file is not meant to run in the dev server here; it's a usage example.
*/
import React, { useState } from 'react';
import { wrapWebComponent } from './wrapWebComponent.js';

// Ensure your vanElla components are loaded before React mounts
// import '../../wip-van-components/web-components.js';

// Create React wrappers
export const VCounter = wrapWebComponent(React, 'v-counter', {
  onPropsUpdated: 'props-updated', // map React prop onPropsUpdated -> native 'props-updated'
  onRender: 'render',
});

export const VForm = wrapWebComponent(React, 'v-form', {
  onPropsUpdated: 'props-updated',
});

export function Demo() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>React PoC using vanElla Web Components</h2>
      <VCounter
        count={count}
        label='From React'
        onPropsUpdated={(e) => setCount(e.detail.props.count)}
      />

      <p>React state: {count}</p>

      <VForm
        title='React-wrapped form'
        onPropsUpdated={(e) => console.log('form props', e.detail)}
      />
    </div>
  );
}
