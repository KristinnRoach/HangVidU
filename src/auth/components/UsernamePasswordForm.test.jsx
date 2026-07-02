import { cleanup, render, waitFor } from '@solidjs/testing-library';
import { beforeEach, describe, expect, it, vi } from 'vite-plus/test';
import UsernamePasswordForm from './UsernamePasswordForm';

const mocks = vi.hoisted(() => ({
  signInWithUsernameOrEmail: vi.fn(),
  signUpWithUsername: vi.fn(),
}));

const messages = {
  'auth.error.invalid_credentials':
    "We couldn't find an account with those credentials.",
  'auth.placeholder.identifier': 'username or email',
  'auth.placeholder.password': 'password',
  'auth.sign_in': 'Sign in',
  'auth.sign_up': 'Sign up',
  'auth.toggle.to_signup': 'No account? Sign up',
};

vi.mock('../password-auth.js', () => ({
  signInWithUsernameOrEmail: mocks.signInWithUsernameOrEmail,
  signUpWithUsername: mocks.signUpWithUsername,
}));

vi.mock('../../shared/i18n/index.js', () => ({
  useI18n: () => ({
    t: (key) => messages[key] ?? key,
    locale: () => 'en',
  }),
}));

describe('UsernamePasswordForm', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('shows a friendly inline error and keeps the sheet open on failed sign-in', async () => {
    mocks.signInWithUsernameOrEmail.mockRejectedValue({
      code: 'auth/invalid-credential',
    });
    const onAuthFailure = vi.fn();

    const { container, getByPlaceholderText } = render(() => (
      <UsernamePasswordForm onAuthFailure={onAuthFailure} />
    ));

    const identifier = getByPlaceholderText('username or email');
    identifier.value = 'missing-user';
    identifier.dispatchEvent(new InputEvent('input', { bubbles: true }));

    const password = getByPlaceholderText('password');
    password.value = 'incorrect-password';
    password.dispatchEvent(new InputEvent('input', { bubbles: true }));

    container
      .querySelector('form')
      .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    await waitFor(() => {
      expect(container.querySelector('[role="alert"]')?.textContent).toBe(
        "We couldn't find an account with those credentials.",
      );
    });

    expect(mocks.signInWithUsernameOrEmail).toHaveBeenCalledWith({
      identifier: 'missing-user',
      password: 'incorrect-password',
    });
    expect(onAuthFailure).toHaveBeenCalledTimes(1);
  });
});
