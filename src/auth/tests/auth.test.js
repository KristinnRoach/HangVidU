// src/auth/tests/auth.test.js
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Firebase modules before importing auth
const mockAuth = {
  currentUser: null,
};

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => mockAuth),
  deleteUser: vi.fn(),
  signOut: vi.fn(),
  GoogleAuthProvider: vi.fn(),
  signInWithPopup: vi.fn(),
  signInWithCredential: vi.fn(),
  getRedirectResult: vi.fn(() => Promise.resolve(null)),
  onAuthStateChanged: vi.fn(),
  setPersistence: vi.fn(() => Promise.resolve()),
  indexedDBLocalPersistence: {},
  browserLocalPersistence: {},
  inMemoryPersistence: {},
}));

vi.mock('../../firebase/firebase.js', () => ({
  app: {},
  fcmVapidKey: 'test-vapid-key',
}));

vi.mock('../../firebase/presence.js', () => ({
  setOffline: vi.fn(() => Promise.resolve()),
}));

vi.mock('../onetap.js', () => ({
  initOneTap: vi.fn(),
  showOneTapSignin: vi.fn(),
}));

vi.mock('../auth-state.js', () => ({
  setState: vi.fn(),
  subscribe: vi.fn(),
  waitForAuthReady: vi.fn(() => Promise.resolve()),
  getLoggedInUserId: vi.fn(() => null),
}));

vi.mock('../../ui/ui-state.js', () => ({
  uiState: { view: 'lobby:guest', setView: vi.fn() },
}));

vi.mock('firebase/database', () => ({
  getDatabase: vi.fn(() => ({})),
  ref: vi.fn(),
  remove: vi.fn(() => Promise.resolve()),
  get: vi.fn(() => Promise.resolve({ exists: () => false, val: () => null })),
  set: vi.fn(() => Promise.resolve()),
  update: vi.fn(() => Promise.resolve()),
  push: vi.fn(() => ({ key: 'mock-key' })),
  onValue: vi.fn(),
  onChildAdded: vi.fn(),
  onChildRemoved: vi.fn(),
  off: vi.fn(),
  onDisconnect: vi.fn(() => ({
    set: vi.fn(() => Promise.resolve()),
    remove: vi.fn(() => Promise.resolve()),
  })),
  serverTimestamp: vi.fn(() => ({ '.sv': 'timestamp' })),
}));

vi.mock('../../storage/fb-rtdb/rtdb.js', () => ({
  rtdb: {},
}));

vi.mock('../gis-tokens.js', () => ({
  clearGISTokenCache: vi.fn(),
}));

// Placeholder test to prevent Vitest error when no test suites are present
describe('auth placeholder', () => {
  it('should pass (placeholder)', () => {
    expect(true).toBe(true);
  });
});
