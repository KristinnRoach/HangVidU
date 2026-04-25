import { createStore } from 'solid-js/store';

// Handlers are wrapped in objects so Solid doesn't treat function values as
// store updaters when setting top-level keys.
const [store, _set] = createStore({});

export const appActions = store;

export function setAppAction(name, fn) {
  if (typeof fn !== 'function') {
    _set(name, undefined);
    return () => {};
  }
  _set(name, { fn });
  return () => {
    if (store[name]?.fn === fn) _set(name, undefined);
  };
}

export async function callAppAction(name, event) {
  await store[name]?.fn?.(event);
}
