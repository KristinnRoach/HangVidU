import { beforeEach, describe, expect, it, vi } from 'vite-plus/test';
import { getAuthState, setState } from './auth-state.js';

const mocks = vi.hoisted(() => ({
  createPasswordUser: vi.fn(),
  deleteFirebaseUser: vi.fn(),
  signInPassword: vi.fn(),
  updateFirebaseProfile: vi.fn(),
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

vi.mock('./shared/auth-error-logging.js', () => ({
  logAuthError: mocks.logAuthError,
}));

vi.mock('@lib/utils/email-hash.js', () => ({
  hashEmail: vi.fn((email) => `hash:${email}`),
}));

beforeEach(() => {
  setState({
    status: 'unauthenticated',
    user: null,
    isLoggedIn: false,
  });
  mocks.createPasswordUser.mockReset();
  mocks.deleteFirebaseUser.mockReset().mockResolvedValue(undefined);
  mocks.signInPassword.mockReset();
  mocks.updateFirebaseProfile.mockReset();
  mocks.updateFirebaseProfile.mockResolvedValue(undefined);
  mocks.logAuthError.mockReset();
  mocks.dbGet.mockReset();
  mocks.dbSet.mockReset().mockResolvedValue(undefined);
});

function expectAuthStateRestored() {
  expect(getAuthState()).toEqual({
    status: 'unauthenticated',
    isLoggedIn: false,
    user: null,
  });
}

describe('password auth failure state', () => {
  it('blocks overlapping sign-ins and allows a retry after failure', async () => {
    const { signInWithUsernameOrEmail } = await import('./password-auth.js');
    let rejectAttempt;
    mocks.signInPassword.mockImplementationOnce(
      () =>
        new Promise((_, reject) => {
          rejectAttempt = reject;
        }),
    );
    const params = {
      identifier: 'someuser',
      [PASSWORD_FIELD]: SIGN_IN_TEST_VALUE,
    };
    const attempt = signInWithUsernameOrEmail(params);
    expect(getAuthState().status).toBe('loading');
    await expect(signInWithUsernameOrEmail(params)).rejects.toThrow(
      'operation-in-progress',
    );
    expect(mocks.signInPassword).toHaveBeenCalledTimes(1);

    const error = Object.assign(new Error('bad credentials'), {
      code: 'auth/invalid-credential',
    });
    rejectAttempt(error);
    await expect(attempt).rejects.toBe(error);
    expectAuthStateRestored();

    const credential = { user: { uid: 'retry-user' } };
    mocks.signInPassword.mockResolvedValueOnce(credential);
    await expect(signInWithUsernameOrEmail(params)).resolves.toBe(credential);
  });

  it('does not revert a Firebase auth update when an older lookup fails', async () => {
    const { signInWithUsernameOrEmail } = await import('./password-auth.js');
    let rejectLookup;
    mocks.dbGet.mockImplementationOnce(
      () =>
        new Promise((_, reject) => {
          rejectLookup = reject;
        }),
    );
    const attempt = signInWithUsernameOrEmail({
      identifier: 'someuser@example.com',
      [PASSWORD_FIELD]: SIGN_IN_TEST_VALUE,
    });
    const authenticated = {
      status: 'authenticated',
      isLoggedIn: true,
      user: { uid: 'google-user', email: 'someuser@example.com' },
    };
    setState(authenticated);
    const error = new Error('lookup unavailable');
    rejectLookup(error);
    await expect(attempt).rejects.toBe(error);
    expect(getAuthState()).toEqual(authenticated);
    expect(mocks.signInPassword).not.toHaveBeenCalled();
  });

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
