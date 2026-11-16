import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@solidjs/testing-library';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vite-plus/test';
import { HandleClaimPrompt } from './HandleClaimPrompt';

const mocks = vi.hoisted(() => ({
  claimUsername: vi.fn(async () => {}),
}));

vi.mock('../../../stores/user-profile-store.js', () => ({
  claimUsername: mocks.claimUsername,
  getUserProfileById: async () => ({ username: 'alice' }),
  suggestHandle: () => 'suggested',
}));
vi.mock('@auth', () => ({
  validateUsername: (value: string) => (value.length < 3 ? 'short' : null),
}));
vi.mock('@shared/i18n', () => ({
  useI18n: () => ({ t: (key: string) => key }),
}));

const user = { uid: 'u1', displayName: 'Alice' };

describe('HandleClaimPrompt', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('opens as a labelled modal with focus inside', async () => {
    render(() => <HandleClaimPrompt user={user} />);

    const dialog = await screen.findByRole('dialog');
    const titleId = dialog.getAttribute('aria-labelledby')!;
    expect(document.getElementById(titleId)?.textContent).toBe(
      'handle.claim.title',
    );
    await waitFor(() =>
      expect(dialog.contains(document.activeElement)).toBe(true),
    );
    expect(
      (screen.getByLabelText('handle.claim.input') as HTMLInputElement).value,
    ).toBe('alice');
  });

  it('shows validation errors on the field without saving', async () => {
    render(() => <HandleClaimPrompt user={user} />);
    const input = await screen.findByLabelText('handle.claim.input');

    fireEvent.input(input, { target: { value: 'ab' } });
    fireEvent.click(screen.getByRole('button', { name: 'shared.save' }));

    const error = await screen.findByText('auth.error.username_invalid');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-describedby')).toContain(error.id);
    expect(mocks.claimUsername).not.toHaveBeenCalled();
  });

  it('remembers dismissal via Escape and returns focus', async () => {
    render(() => (
      <>
        <button type='button'>opener</button>
        <HandleClaimPrompt user={user} />
      </>
    ));
    const opener = screen.getByRole('button', { name: 'opener' });
    opener.focus();
    const dialog = await screen.findByRole('dialog');
    await waitFor(() =>
      expect(dialog.contains(document.activeElement)).toBe(true),
    );

    fireEvent.keyDown(dialog, { key: 'Escape' });

    expect(screen.queryByRole('dialog')).toBeNull();
    expect(localStorage.getItem('handle-claim-dismissed:u1')).toBe('1');
    await waitFor(() => expect(document.activeElement).toBe(opener));
  });
});
