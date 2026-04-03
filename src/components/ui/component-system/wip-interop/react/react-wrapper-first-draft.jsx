// React wrapper for createComponent
import { useEffect, useRef } from 'react';

/**
 * React hook to use vanilla components created with createComponent
 * @param {Function} createFn - Factory function that creates the component
 * @param {Object} props - Props to pass to the component
 * @returns {React.RefObject} Ref to attach to container element
 */
export function useVanillaComponent(createFn, props = {}) {
  const containerRef = useRef(null);
  const componentRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create component
    componentRef.current = createFn(containerRef.current);

    // Cleanup on unmount
    return () => {
      componentRef.current?.dispose();
    };
  }, []); // Only create once

  // Sync React props to vanilla component
  useEffect(() => {
    if (componentRef.current) {
      componentRef.current.update(props);
    }
  }, [props]);

  return containerRef;
}

// === USAGE EXAMPLE ===

import { createCounter } from '../../wip-components/counter.js';

function App() {
  const [count, setCount] = useState(0);

  // Use vanilla component in React
  const counterRef = useVanillaComponent(createCounter, {
    count,
    label: 'React Counter',
  });

  return (
    <div>
      <h1>React + Vanilla Component</h1>
      <div ref={counterRef} />
      <button onClick={() => setCount((c) => c + 1)}>
        Increment from React
      </button>
    </div>
  );
}

// === MAJOR ISSUES ===

/*
  ❌ ISSUE #1: Props object identity
     - useEffect with [props] triggers on every render if props is inline object
     - Solution: Memoize props or use deep comparison
  
  ❌ ISSUE #2: Event communication
     - Vanilla component can't easily call React setState
     - Solution: Pass callbacks as props or listen to DOM events
  
  ❌ ISSUE #3: Two-way binding complexity
     - React props flow down, vanilla component updates don't flow up
     - Solution: Use onPropUpdated listeners to sync back to React
  
  ⚠️  ISSUE #4: Double rendering
     - React re-renders + vanilla component re-renders = potential waste
     - Minor issue in practice
  
  ✅ WORKS: Lifecycle, cleanup, DOM manipulation
*/
