// IMPROVED React wrapper with issue fixes
import { useEffect, useRef, useMemo } from 'react';

/**
 * Better React integration for vanilla components
 */
export function useVanillaComponent(createFn, props = {}, options = {}) {
  const containerRef = useRef(null);
  const componentRef = useRef(null);
  const { onUpdate } = options;

  // Memoize props to avoid unnecessary updates
  const stableProps = useMemo(() => props, [JSON.stringify(props)]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create component
    componentRef.current = createFn(containerRef.current);

    // Listen to vanilla component changes and sync back to React
    if (onUpdate) {
      componentRef.current.onAnyPropUpdated(({ props, changedKeys }) => {
        onUpdate(props, changedKeys);
      });
    }

    return () => {
      componentRef.current?.dispose();
    };
  }, []);

  // Sync React props to vanilla component
  useEffect(() => {
    if (componentRef.current) {
      componentRef.current.update(stableProps);
    }
  }, [stableProps]);

  return containerRef;
}

// === PRACTICAL EXAMPLE ===

import { useState } from 'react';
// import { createCounter } from '../../wip-van-components/counter.js';
import createComponent from '../../component.js';

function CounterDemo() {
  const [externalCount, setExternalCount] = useState(0);

  const counterRef = useVanillaComponent(
    (parent) => {
      const counter = createComponent({
        initialProps: { count: externalCount, label: 'Click me' },
        template: `
          <button onclick="increment">\${label}: \${count}</button>
        `,
        handlers: {
          increment: () => counter.count++,
        },
        parent,
      });
      return counter;
    },
    { count: externalCount },
    {
      // Sync vanilla changes back to React
      onUpdate: (props) => {
        if (props.count !== externalCount) {
          setExternalCount(props.count);
        }
      },
    }
  );

  return (
    <div>
      <h2>Two-Way Binding Example</h2>
      <div ref={counterRef} />

      <p>React state: {externalCount}</p>

      <button onClick={() => setExternalCount((c) => c + 10)}>
        Add 10 from React
      </button>
    </div>
  );
}

// === REMAINING ISSUES ===

/*
  ❌ Still an issue: JSON.stringify for memoization is hacky
     - Breaks with functions, circular refs, etc.
     - Better: Use React.memo or manual comparison
  
  ⚠️  Bi-directional updates can cause loops
     - onUpdate calls setState → triggers useEffect → calls update → triggers onUpdate
     - Need condition check (already shown above)
  
  ✅ Fixed: Lifecycle, cleanup, event flow
*/

// === ALTERNATIVE: Web Component approach ===

/*
  If you use vanElla.js to create Web Components:
  
  import { defineComponent } from './vanElla.js';
  
  defineComponent('my-counter', {
    initialProps: { count: 0 },
    template: `<button onclick="inc">\${count}</button>`,
    handlers: { inc: function() { this.count++; } }
  });
  
  // Then in React:
  function App() {
    return <my-counter count={5} />;
  }
  
  ✅ React treats it like any other DOM element
  ✅ No wrapper hooks needed
  ❌ Still need to handle prop updates manually
*/
