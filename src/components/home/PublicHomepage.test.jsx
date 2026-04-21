import { cleanup, render } from '@solidjs/testing-library';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  authState: {
    status: 'unauthenticated',
    user: null,
    isLoggedIn: false,
  },
  listeners: new Set(),
}));

vi.mock('../../auth/auth-state.js', () => ({
  getAuthState: () => ({ ...mocks.authState }),
  onAuthStateChanged: (listener) => {
    mocks.listeners.add(listener);
    listener({ ...mocks.authState });
    return () => mocks.listeners.delete(listener);
  },
}));

vi.mock('../../auth/solid-auth.js', async () => {
  const { createSignal } = await import('solid-js');
  const [authState, setAuthState] = createSignal({ ...mocks.authState });

  return {
    useAuth: () => ({
      authState,
      isLoggedIn: () => authState().isLoggedIn,
      status: () => authState().status,
      user: () => authState().user,
    }),
    setTestAuthState: (nextState) => setAuthState({ ...nextState }),
  };
});

vi.mock('../../shared/i18n/index.js', () => ({
  useI18n: () => ({
    t: (key) =>
      ({
        'home.eyebrow': 'Public homepage',
        'home.title': 'HangVidU',
        'home.description':
          'HangVidU is a web app for peer-to-peer video calls, chat, and shared video watching. Google access is requested only for sign-in, contact import, and selected Gmail invites.',
        'home.links': 'Legal links',
        'nav.privacy': 'Privacy',
        'nav.terms': 'Terms',
      })[key] || key,
  }),
}));

describe('PublicHomepage', () => {
  beforeEach(() => {
    cleanup();
    mocks.listeners.clear();
    mocks.authState = {
      status: 'unauthenticated',
      user: null,
      isLoggedIn: false,
    };
  });

  it('renders public app purpose before sign-in', async () => {
    const { setTestAuthState } = await import('../../auth/solid-auth.js');
    setTestAuthState(mocks.authState);
    const { default: PublicHomepage } = await import('./PublicHomepage.jsx');
    const { getByRole, getByText } = render(() => <PublicHomepage />);

    expect(
      getByRole('heading', {
        name: 'HangVidU',
      }),
    ).toBeTruthy();
    expect(
      getByText(
        'HangVidU is a web app for peer-to-peer video calls, chat, and shared video watching. Google access is requested only for sign-in, contact import, and selected Gmail invites.',
      ),
    ).toBeTruthy();
    expect(getByText('Privacy').getAttribute('href')).toBe(
      '/privacy-policy.html',
    );
  });

  it('hides after the user is signed in', async () => {
    const { setTestAuthState } = await import('../../auth/solid-auth.js');
    setTestAuthState(mocks.authState);
    const { default: PublicHomepage } = await import('./PublicHomepage.jsx');
    const { queryByRole } = render(() => <PublicHomepage />);

    setTestAuthState({
      status: 'authenticated',
      user: { uid: 'u1', userName: 'User', email: 'user@example.com' },
      isLoggedIn: true,
    });

    expect(
      queryByRole('heading', {
        name: 'HangVidU',
      }),
    ).toBeNull();
  });
});
