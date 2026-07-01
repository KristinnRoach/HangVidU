// tests/setup.js
// Stub import.meta.env for tests so Firebase config does not throw
try {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    Object.assign(import.meta.env, {
      VITE_FIREBASE_API_KEY: 'dummy',
      VITE_FIREBASE_AUTH_DOMAIN: 'dummy',
      VITE_FIREBASE_PROJECT_ID: 'dummy',
      VITE_APP_GOOGLE_CLIENT_ID: 'dummy',
    });
  }
} catch {}

try {
  const testStorage = (() => {
    const data = new Map();
    return {
      get length() {
        return data.size;
      },
      key: (index) => Array.from(data.keys())[index] ?? null,
      getItem: (key) => (data.has(String(key)) ? data.get(String(key)) : null),
      setItem: (key, value) => data.set(String(key), String(value)),
      removeItem: (key) => data.delete(String(key)),
      clear: () => data.clear(),
    };
  })();

  const storage =
    typeof process !== 'undefined' && process.versions?.node
      ? testStorage
      : window.localStorage;

  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: storage,
  });
} catch {}

// Browser mode provides native WebRTC APIs - no mocking needed
