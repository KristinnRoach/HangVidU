import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vite-plus/test';
import { renderGoogleSignInButton } from './onetap.js';

const mocks = vi.hoisted(() => ({
  render: vi.fn(),
  locale: vi.fn(() => 'en'),
}));
vi.mock('./adapters/firebase-auth-adapter.js', () => ({
  createGoogleCredential: vi.fn(),
  signInWithGoogleCredential: vi.fn(),
}));
vi.mock('./auth-state.js', () => ({
  getIsLoggedIn: vi.fn(),
  setState: vi.fn(),
}));
vi.mock('@shared/i18n/index.js', () => ({
  getLocale: mocks.locale,
  t: vi.fn(),
}));
vi.mock('@shared/utils/google/google-identity-adapter.js', () => ({
  cancelGoogleOneTap: vi.fn(),
  initializeGoogleOneTap: vi.fn(),
  isGoogleOneTapLoaded: () => true,
  loadGoogleIdentityScript: vi.fn(),
  promptGoogleOneTap: vi.fn(),
  renderGoogleSignInButton: mocks.render,
}));

describe('Google sign-in button rendering', () => {
  beforeEach(() => {
    mocks.locale.mockReturnValue('en');
    mocks.render.mockReset();
    mocks.render.mockImplementation((container) => {
      container.append(document.createElement('iframe'));
    });
    vi.stubGlobal('requestAnimationFrame', (callback) => {
      callback(0);
      return 1;
    });
  });
  afterEach(() => vi.unstubAllGlobals());

  it('waits for the iframe before revealing the button, including duplicate renders', () => {
    const container = document.createElement('div');
    renderGoogleSignInButton(container);
    expect(container.style.visibility).toBe('hidden');

    renderGoogleSignInButton(container);
    expect(mocks.render).toHaveBeenCalledTimes(1);
    expect(container.style.visibility).toBe('hidden');

    container.querySelector('iframe').dispatchEvent(new Event('load'));
    expect(container.style.visibility).toBe('visible');
  });

  it('ignores an old iframe loading after the locale changes', () => {
    const container = document.createElement('div');
    renderGoogleSignInButton(container);
    const oldFrame = container.querySelector('iframe');
    mocks.locale.mockReturnValue('is');
    renderGoogleSignInButton(container);

    oldFrame.dispatchEvent(new Event('load'));
    expect(container.style.visibility).toBe('hidden');
    container.querySelector('iframe').dispatchEvent(new Event('load'));
    expect(container.style.visibility).toBe('visible');
  });

  it('reveals the generic button if GIS renders without an iframe', () => {
    mocks.render.mockImplementation((container) => {
      container.textContent = 'Google';
    });
    const container = document.createElement('div');
    renderGoogleSignInButton(container);
    expect(container.style.visibility).toBe('visible');
  });
});
