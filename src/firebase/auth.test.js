// src/firebase/auth.test.js
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
  getRedirectResult: vi.fn(() => Promise.resolve(null)),
  onAuthStateChanged: vi.fn(),
  setPersistence: vi.fn(() => Promise.resolve()),
  indexedDBLocalPersistence: {},
  browserLocalPersistence: {},
  inMemoryPersistence: {},
}));

vi.mock('./firebase.js', () => ({
  app: {},
}));

vi.mock('./presence.js', () => ({
  setOffline: vi.fn(() => Promise.resolve()),
  initializePresence: vi.fn(() => Promise.resolve()),
}));

vi.mock('./onetap.js', () => ({
  initOneTap: vi.fn(),
  showOneTapSignin: vi.fn(),
}));

vi.mock('../contacts/user-discovery.js', () => ({
  registerUserInDirectory: vi.fn(() => Promise.resolve()),
}));

vi.mock('firebase/database', () => ({
  ref: vi.fn(),
  remove: vi.fn(() => Promise.resolve()),
}));

vi.mock('../storage/fb-rtdb/rtdb.js', () => ({
  rtdb: {},
}));

describe('deleteAccount', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAuth.currentUser = null;
  });

  it('should throw error when no user is logged in', async () => {
    const { deleteAccount } = await import('./auth.js');
    await expect(deleteAccount()).rejects.toThrow('No user logged in');
  });

  it('should provide helpful error for requires-recent-login', async () => {
    const { deleteUser } = await import('firebase/auth');

    // Set up a logged-in user
    mockAuth.currentUser = { uid: 'test-user-123' };

    const error = new Error('Recent login required');
    error.code = 'auth/requires-recent-login';
    vi.mocked(deleteUser).mockRejectedValue(error);

    const { deleteAccount } = await import('./auth.js');

    await expect(deleteAccount()).rejects.toThrow(
      'For security, please sign out and sign in again before deleting your account.',
    );
  });
});
