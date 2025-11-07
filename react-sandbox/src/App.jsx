import React, { useState } from 'react';
import { wrapWebComponent } from '../../src/utils/dom/wip-interop/react/wrapWebComponent.js';

// Create wrappers for the vanElla web components
const VCounter = wrapWebComponent(React, 'v-counter', {
  onPropsUpdated: 'props-updated',
  onRender: 'render',
});

const VForm = wrapWebComponent(React, 'v-form', {
  onPropsUpdated: 'props-updated',
});

export default function App() {
  const [count, setCount] = useState(5);

  return (
    <div
      style={{
        padding: 24,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <h1>React Sandbox — vanElla PoC</h1>

      <section style={{ marginBottom: 24 }}>
        <h2>Wrapped v-counter</h2>
        <VCounter
          count={count}
          label='React-wrapped'
          onPropsUpdated={(e) => setCount(e.detail.props.count)}
        />
        <p>React state: {count}</p>
        <button onClick={() => setCount((c) => c + 1)}>
          Increment from React
        </button>
      </section>

      <section>
        <h2>Wrapped v-form</h2>
        <VForm
          title='React-wrapped form'
          onPropsUpdated={(e) => console.log('form', e.detail)}
        />
      </section>
    </div>
  );
}
