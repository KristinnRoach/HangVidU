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

vi.mock('../../shared/i18n/index.js', () => ({
  useI18n: () => ({
    t: (key) =>
      ({
        'home.eyebrow': 'Public homepage',
        'home.title': 'HangVidU keeps calls and shared watching simple',
        'home.lede':
          'HangVidU is a web app for peer-to-peer video calls, chat, and shared video watching with people you choose.',
        'home.features': 'Features',
        'home.feature.video': 'Start direct video calls with saved contacts.',
        'home.feature.watch': 'Watch YouTube or shared videos together.',
        'home.feature.contacts':
          'Import Google Contacts to find people already on HangVidU.',
        'home.google_use':
          'Google access is requested only when you sign in, import contacts, or send selected Gmail invites.',
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
    const { default: PublicHomepage } = await import('./PublicHomepage.jsx');
    const { getByRole, getByText } = render(() => <PublicHomepage />);

    expect(
      getByRole('heading', {
        name: 'HangVidU keeps calls and shared watching simple',
      }),
    ).toBeTruthy();
    expect(getByText('Start direct video calls with saved contacts.')).toBeTruthy();
    expect(getByText('Privacy').getAttribute('href')).toBe(
      '/privacy-policy.html',
    );
  });

  it('hides after the user is signed in', async () => {
    const { default: PublicHomepage } = await import('./PublicHomepage.jsx');
    const { queryByRole } = render(() => <PublicHomepage />);

    mocks.authState = {
      status: 'authenticated',
      user: { uid: 'u1', userName: 'User', email: 'user@example.com' },
      isLoggedIn: true,
    };
    for (const listener of mocks.listeners) listener({ ...mocks.authState });

    expect(
      queryByRole('heading', {
        name: 'HangVidU keeps calls and shared watching simple',
      }),
    ).toBeNull();
  });
});
