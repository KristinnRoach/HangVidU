// src/auth/tests/auth.test.js
import { describe, it, expect, vi, beforeEach } from 'vite-plus/test';

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

vi.mock('../../infra/firebase.js', () => ({
  app: {},
  fcmVapidKey: 'test-vapid-key',
}));

vi.mock('../../shared/events/index.js', () => ({
  dispatchCommand: vi.fn(),
}));

vi.mock('../onetap.js', () => ({
  initOneTap: vi.fn(),
  showOneTapSignin: vi.fn(),
}));

vi.mock('../auth-state.js', () => ({
  setState: vi.fn(),
  waitForAuthReady: vi.fn(() => Promise.resolve()),
  getAuthState: vi.fn(() => ({
    status: 'unauthenticated',
    user: null,
    isLoggedIn: false,
  })),
  getLoggedInUserId: vi.fn(() => null),
  toStableAuthState: vi.fn(() => ({
    status: 'unauthenticated',
    user: null,
    isLoggedIn: false,
  })),
}));

vi.mock('firebase/database', () => ({
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
  serverTimestamp: vi.fn(() => ({ '.sv': 'timestamp' })),
}));

vi.mock('../../infra/firebase-rtdb.js', () => ({
  rtdb: {},
}));

// Placeholder test to prevent Vitest error when no test suites are present
describe('auth placeholder', () => {
  it('should pass (placeholder)', () => {
    expect(true).toBe(true);
  });
});
