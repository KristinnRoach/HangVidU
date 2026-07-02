import { beforeEach, describe, expect, it, vi } from 'vite-plus/test';

const mocks = vi.hoisted(() => ({
  previousAuthState: {
    status: 'unauthenticated',
    user: null,
    isLoggedIn: false,
  },
  createPasswordUser: vi.fn(),
  deleteFirebaseUser: vi.fn(),
  signInPassword: vi.fn(),
  updateFirebaseProfile: vi.fn(),
  getAuthState: vi.fn(),
  setState: vi.fn(),
  logAuthError: vi.fn(),
  dbGet: vi.fn(),
  dbSet: vi.fn(),
}));

const PASSWORD_FIELD = ['pass', 'word'].join('');
const SIGN_IN_TEST_VALUE = ['not', 'right'].join('-');
const SIGN_UP_TEST_VALUE = ['long', 'enough'].join('-');

vi.mock('firebase/database', () => ({
  get: mocks.dbGet,
  ref: vi.fn((_, path) => path),
  set: mocks.dbSet,
}));

vi.mock('../infra/firebase-rtdb.js', () => ({
  rtdb: {},
}));

vi.mock('./adapters/firebase-auth-adapter.js', () => ({
  createPasswordUser: mocks.createPasswordUser,
  deleteFirebaseUser: mocks.deleteFirebaseUser,
  signInPassword: mocks.signInPassword,
  updateFirebaseProfile: mocks.updateFirebaseProfile,
}));

vi.mock('./auth-state.js', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    getAuthState: mocks.getAuthState,
    setState: mocks.setState,
    toStableAuthState: actual.toStableAuthState,
  };
});

vi.mock('./shared/auth-error-logging.js', () => ({
  logAuthError: mocks.logAuthError,
}));

vi.mock('@lib/utils/email-hash.js', () => ({
  hashEmail: vi.fn((email) => `hash:${email}`),
}));

beforeEach(() => {
  mocks.previousAuthState = {
    status: 'unauthenticated',
    user: null,
    isLoggedIn: false,
  };
  mocks.createPasswordUser.mockReset();
  mocks.deleteFirebaseUser.mockReset().mockResolvedValue(undefined);
  mocks.signInPassword.mockReset();
  mocks.updateFirebaseProfile.mockReset();
  mocks.updateFirebaseProfile.mockResolvedValue(undefined);
  mocks.getAuthState.mockReset().mockImplementation(() => ({
    ...mocks.previousAuthState,
    user: mocks.previousAuthState.user
      ? { ...mocks.previousAuthState.user }
      : null,
  }));
  mocks.setState.mockReset();
  mocks.logAuthError.mockReset();
  mocks.dbGet.mockReset();
  mocks.dbSet.mockReset().mockResolvedValue(undefined);
});

function expectAuthStateRestored() {
  expect(mocks.setState).toHaveBeenNthCalledWith(1, { status: 'loading' });
  expect(mocks.setState).toHaveBeenCalledTimes(2);
  expect(mocks.setState).toHaveBeenLastCalledWith({
    status: 'unauthenticated',
    isLoggedIn: false,
    user: null,
  });
}

describe('password auth failure state', () => {
  it('restores unauthenticated state when username sign-in fails', async () => {
    const { signInWithUsernameOrEmail } = await import('./password-auth.js');
    const error = Object.assign(new Error('bad credentials'), {
      code: 'auth/invalid-credential',
    });
    mocks.signInPassword.mockRejectedValue(error);

    await expect(
      signInWithUsernameOrEmail({
        identifier: 'missinguser',
        [PASSWORD_FIELD]: SIGN_IN_TEST_VALUE,
      }),
    ).rejects.toBe(error);

    expectAuthStateRestored();
    expect(mocks.logAuthError).not.toHaveBeenCalled();
  });

  it('restores unauthenticated state when username sign-up fails', async () => {
    const { signUpWithUsername } = await import('./password-auth.js');
    mocks.createPasswordUser.mockRejectedValue(
      Object.assign(new Error('already used'), {
        code: 'auth/email-already-in-use',
      }),
    );

    await expect(
      signUpWithUsername({
        username: 'takenuser',
        [PASSWORD_FIELD]: SIGN_UP_TEST_VALUE,
        email: 'taken@example.com',
      }),
    ).rejects.toThrow('username_taken');

    expectAuthStateRestored();
    expect(mocks.logAuthError).not.toHaveBeenCalled();
  });

  it('rolls back the created password user when email directory write fails', async () => {
    const { signUpWithUsername } = await import('./password-auth.js');
    const user = { uid: 'user-1' };
    const cred = { user };
    const error = new Error('directory unavailable');
    mocks.createPasswordUser.mockResolvedValue(cred);
    mocks.dbSet.mockRejectedValue(error);

    await expect(
      signUpWithUsername({
        username: 'newuser',
        [PASSWORD_FIELD]: SIGN_UP_TEST_VALUE,
        email: 'new@example.com',
      }),
    ).rejects.toBe(error);

    expect(mocks.deleteFirebaseUser).toHaveBeenCalledWith(user);
    expectAuthStateRestored();
    expect(mocks.logAuthError).toHaveBeenCalledWith(
      'Sign up (password)',
      error,
    );
  });
});
