import { describe, expect, it, vi } from 'vite-plus/test';
import { createGoogleAuthProvider } from './firebase-auth-adapter.js';

vi.mock('firebase/auth', async (importOriginal) => ({
  ...(await importOriginal()),
  getAuth: () => ({}),
}));
vi.mock('../../infra/firebase.js', () => ({ app: {} }));

describe('createGoogleAuthProvider', () => {
  it('returns a usable provider in development as well as production', () => {
    const provider = createGoogleAuthProvider();
    expect(provider.providerId).toBe('google.com');
    expect(() =>
      provider.setCustomParameters({ prompt: 'select_account' }),
    ).not.toThrow();
  });
});
