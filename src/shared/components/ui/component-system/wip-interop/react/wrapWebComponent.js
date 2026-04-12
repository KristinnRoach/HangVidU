// Minimal factory to wrap any Web Component for React
// Usage:
// import React from 'react';
// import { wrapWebComponent } from './wrapWebComponent';
// const Counter = wrapWebComponent(React, 'v-counter', { onPropsUpdated: 'props-updated' });
// <Counter count={5} onPropsUpdated={(e)=>console.log(e.detail)} />

export function wrapWebComponent(React, tagName, eventMap = {}) {
  const { useRef, useEffect, createElement, forwardRef } = React;

  // Build reverse map: nativeEventName -> reactPropName
  const nativeToReact = {};
  for (const [reactProp, nativeName] of Object.entries(eventMap)) {
    nativeToReact[nativeName] = reactProp;
  }

  // The factory returns a React component (forwardRef to support refs)
  const Wrapper = forwardRef((props, ref) => {
    const internalRef = useRef(null);
    const hostRef = ref || internalRef;

    // Split props into event handlers and other props
    const handlers = {};
    const otherProps = {};
    Object.entries(props || {}).forEach(([k, v]) => {
      if (k in eventMap) {
        handlers[k] = v;
      } else if (k === 'children') {
        // leave children out of property sync
      } else {
        otherProps[k] = v;
      }
    });

    // Attach native event listeners for mapped events
    useEffect(() => {
      const el = hostRef.current;
      if (!el) return;

      const attached = [];
      for (const [reactProp, nativeName] of Object.entries(eventMap)) {
        const handler = handlers[reactProp];
        if (typeof handler === 'function') {
          const fn = (e) => handler(e);
          el.addEventListener(nativeName, fn);
          attached.push([nativeName, fn]);
        }
      }

      return () => {
        attached.forEach(([name, fn]) => el.removeEventListener(name, fn));
      };
    }, [hostRef.current, JSON.stringify(Object.keys(handlers))]);

    // Sync properties/attributes
    useEffect(() => {
      const el = hostRef.current;
      if (!el) return;

      for (const [k, v] of Object.entries(otherProps)) {
        // Simple heuristic: if prop exists as property, set it; else set attribute
        try {
          // Avoid unnecessary updates for functions or undefined
          if (typeof v === 'function' || v === undefined) continue;

          // If property exists on element prototype or current element, set as property
          const protoHas = k in el;
          if (protoHas) {
            if (el[k] !== v) el[k] = v;
          } else {
            // attribute case: convert camelCase -> kebab-case
            const attr = k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
            if (v === false || v === null) {
              el.removeAttribute(attr);
            } else if (v === true) {
              el.setAttribute(attr, '');
            } else {
              el.setAttribute(attr, String(v));
            }
          }
        } catch (err) {
          // swallow property set errors
        }
      }
    }, [hostRef.current, JSON.stringify(otherProps)]);

    // Render the host tag. children are passed through (slots)
    return createElement(tagName, { ref: hostRef }, props.children);
  });

  // Give a nice display name for React devtools
  Wrapper.displayName = `Wrapped(${tagName})`;
  return Wrapper;
}
