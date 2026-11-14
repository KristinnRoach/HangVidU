import { cleanup, render, waitFor } from '@solidjs/testing-library';
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

const mocks = vi.hoisted(() => ({
  init: vi.fn(),
  render: vi.fn(),
  locale: null,
}));
vi.mock('../onetap.js', () => ({
  initOneTap: mocks.init,
  renderGoogleSignInButton: mocks.render,
}));
vi.mock('@shared/i18n/index.js', () => ({
  useI18n: () => ({ locale: () => mocks.locale() }),
}));

describe('GoogleSignInButton', () => {
  beforeEach(() => {
    mocks.locale = createSignal('en')[0];
    mocks.init.mockReset().mockResolvedValue();
    mocks.render.mockReset().mockImplementation((container) => {
      container.append(document.createElement('iframe'));
    });
  });
  afterEach(cleanup);

  it('replaces the previous button when the locale changes', async () => {
    const [locale, setLocale] = createSignal('en');
    mocks.locale = locale;
    const { container } = render(() => <GoogleSignInButton />);
    await waitFor(() => expect(mocks.render).toHaveBeenCalledTimes(1));
    const oldFrame = container.querySelector('iframe');

    setLocale('is');
    await waitFor(() => expect(mocks.render).toHaveBeenCalledTimes(2));
    expect(container.querySelectorAll('iframe').length).toBe(1);
    expect(container.querySelector('iframe')).not.toBe(oldFrame);
  });

  it('does not render after unmounting during SDK initialization', async () => {
    let finishInit;
    mocks.init.mockImplementation(
      () =>
        new Promise((resolve) => {
          finishInit = resolve;
        }),
    );
    const { unmount } = render(() => <GoogleSignInButton />);
    unmount();
    finishInit();
    await Promise.resolve();
    expect(mocks.render).not.toHaveBeenCalled();
  });
});
