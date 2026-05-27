import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  previousAuthState: {
    status: 'unauthenticated',
    user: null,
    isLoggedIn: false,
  },
  createPasswordUser: vi.fn(),
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

vi.mock('./auth-setup.js', () => ({
  logAuthError: mocks.logAuthError,
}));

vi.mock('../shared/utils/email-hash.js', () => ({
  hashEmail: vi.fn((email) => `hash:${email}`),
}));

beforeEach(() => {
  mocks.previousAuthState = {
    status: 'unauthenticated',
    user: null,
    isLoggedIn: false,
  };
  mocks.createPasswordUser.mockReset();
  mocks.signInPassword.mockReset();
  mocks.updateFirebaseProfile.mockReset();
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

    expect(mocks.setState).toHaveBeenNthCalledWith(1, { status: 'loading' });
    expect(mocks.setState).toHaveBeenCalledTimes(2);
    expect(mocks.setState).toHaveBeenLastCalledWith({
      status: 'unauthenticated',
      isLoggedIn: false,
      user: null,
    });
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

    expect(mocks.setState).toHaveBeenNthCalledWith(1, { status: 'loading' });
    expect(mocks.setState).toHaveBeenCalledTimes(2);
    expect(mocks.setState).toHaveBeenLastCalledWith({
      status: 'unauthenticated',
      isLoggedIn: false,
      user: null,
    });
    expect(mocks.logAuthError).not.toHaveBeenCalled();
  });
});
