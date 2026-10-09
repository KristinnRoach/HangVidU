import { cleanup, fireEvent, render } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { afterEach, expect, it, vi } from 'vite-plus/test';
import { createAutoHide } from '@shared/createAutoHide';
import { ActiveCallRoom } from './ActiveCallRoom';

const mocks = vi.hoisted(() => ({ capturing: vi.fn() }));
vi.mock('../call-media', () => ({
  createCallMedia: () => ({ faceMaskCapturing: mocks.capturing }),
}));
vi.mock('../call-handshake.js', () => ({
  useCallHandshake: () => ({ reconnectStatus: () => 'connected' }),
}));
vi.mock('@shared/p2p-context.js', () => ({
  useP2PContext: () => ({ state: () => 'idle' }),
}));
vi.mock('./MemberStreams', () => ({ MemberStreams: () => null }));
vi.mock('./CallControls', () => ({ ActiveCallControls: () => null }));

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

it('holds the top bar hidden throughout setup and resumes after setup ends', () => {
  vi.useFakeTimers();
  const [capturing, setCapturing] = createSignal(false);
  mocks.capturing.mockImplementation(capturing);
  let header;
  render(() => {
    header = createAutoHide(1000);
    return <ActiveCallRoom holdTopBar={header.hold} />;
  });

  expect(header.visible()).toBe(true);
  setCapturing(true);
  for (const event of ['pointermove', 'pointerdown', 'keydown']) {
    fireEvent(window, new Event(event));
    vi.advanceTimersByTime(2000);
    expect(header.visible()).toBe(false);
  }
  setCapturing(false);
  expect(header.visible()).toBe(true);
  vi.advanceTimersByTime(1000);
  expect(header.visible()).toBe(false);
});

it('releases the top-bar hold when the call room unmounts during setup', () => {
  mocks.capturing.mockReturnValue(true);
  const hold = vi.fn(() => release);
  const release = vi.fn();
  render(() => <ActiveCallRoom holdTopBar={hold} />);
  expect(hold).toHaveBeenCalledExactlyOnceWith('hidden');
  cleanup();
  expect(release).toHaveBeenCalledOnce();
});
