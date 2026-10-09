import { cleanup, fireEvent, render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it, vi } from 'vite-plus/test';
import { holdAppReload } from '@shared/app-reload';
import AppLogo from './AppLogo';
import AppReloadButton from './AppReloadButton';

vi.mock('@shared/i18n/index.js', () => ({
  useI18n: () => ({ t: (key) => key }),
}));

const releases = [];

afterEach(() => {
  cleanup();
  for (const release of releases.splice(0)) release();
  vi.unstubAllGlobals();
});

describe.each([
  ['AppLogo', AppLogo],
  ['homepage title button', () => <AppReloadButton>HangVidU</AppReloadButton>],
])('%s', (_name, Component) => {
  it('reloads the current page when allowed', () => {
    const reload = vi.fn();
    vi.stubGlobal('window', { location: { reload } });
    const { getByRole } = render(() => <Component />);

    fireEvent.click(getByRole('button', { name: 'nav.reload' }));

    expect(reload).toHaveBeenCalledOnce();
  });

  it('blocks clicks during calls without scheduling a reload for later', () => {
    const reload = vi.fn();
    vi.stubGlobal('window', { location: { reload } });
    const { getByRole } = render(() => <Component />);
    const button = getByRole('button', { name: 'nav.reload' });
    const releaseIncomingCall = holdAppReload();
    const releaseActiveCall = holdAppReload();
    releases.push(releaseIncomingCall, releaseActiveCall);

    expect(button.disabled).toBe(true);
    expect(button.title).toBe('nav.reload_blocked');
    fireEvent.click(button);
    expect(reload).not.toHaveBeenCalled();

    releaseIncomingCall();
    expect(button.disabled).toBe(true);
    releaseActiveCall();
    expect(button.disabled).toBe(false);
    expect(reload).not.toHaveBeenCalled();

    fireEvent.click(button);
    expect(reload).toHaveBeenCalledOnce();
  });
});
