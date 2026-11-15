import { cleanup, fireEvent, render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vite-plus/test';
import GoogleSignInButton from './GoogleSignInButton';

const mocks = vi.hoisted(() => ({ signIn: vi.fn(), loading: null }));
vi.mock('../auth-commands.js', () => ({
  signInWithAccountSelection: mocks.signIn,
}));
vi.mock('../solid-auth', () => ({
  useAuth: () => ({ isLoading: () => mocks.loading() }),
}));
vi.mock('@shared/i18n', () => ({
  useI18n: () => ({ t: () => 'Sign in with Google' }),
}));

describe('GoogleSignInButton', () => {
  beforeEach(() => {
    mocks.loading = createSignal(false)[0];
    mocks.signIn.mockReset().mockResolvedValue();
  });
  afterEach(cleanup);

  it('starts the Firebase popup action directly from a click', () => {
    const { container } = render(() => <GoogleSignInButton />);
    expect(mocks.signIn).not.toHaveBeenCalled();
    fireEvent.click(
      screen.getByRole('button', { name: 'Sign in with Google' }),
    );
    expect(mocks.signIn).toHaveBeenCalledTimes(1);
    expect(container.querySelector('iframe')).toBeNull();
  });

  it('uses the auth owner to prevent another sign-in during an active attempt', () => {
    const [loading, setLoading] = createSignal(false);
    mocks.loading = loading;
    render(() => <GoogleSignInButton />);
    const button = screen.getByRole('button', { name: 'Sign in with Google' });

    setLoading(true);
    expect(button.disabled).toBe(true);
    expect(button.getAttribute('aria-busy')).toBe('true');
    fireEvent.click(button);
    expect(mocks.signIn).not.toHaveBeenCalled();

    setLoading(false);
    expect(button.disabled).toBe(false);
    fireEvent.click(button);
    expect(mocks.signIn).toHaveBeenCalledTimes(1);
  });
});
