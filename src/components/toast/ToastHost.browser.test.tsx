import { cleanup, render, screen, waitFor } from '@solidjs/testing-library';
import { afterEach, expect, it, vi } from 'vite-plus/test';
import { userEvent } from 'vite-plus/test/browser/context';
import Dialog from '../dialogs/Dialog';
import { showToast, ToastHost } from '.';
import '../../styles/main.css';

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

it('announces and handles keyboard actions and dismissal while a dialog is open', async () => {
  const onOpenChange = vi.fn();
  const run = vi.fn();
  render(() => (
    <>
      <ToastHost />
      <Dialog open title='Add contacts' onOpenChange={onOpenChange}>
        <button>Send invite</button>
      </Dialog>
    </>
  ));
  const dialog = await screen.findByRole('dialog');
  await waitFor(() =>
    expect(dialog.contains(document.activeElement)).toBe(true),
  );

  showToast('Sign in to connect', { action: { label: 'Sign in', run } });
  const toast = screen.getByRole('status', { name: 'Sign in to connect' });
  expect(toast.getAttribute('aria-live')).toBe('polite');

  await userEvent.keyboard('{Alt>}t{/Alt}');
  expect(document.activeElement).toBe(screen.getByRole('list'));

  const action = screen.getByRole('button', { name: 'Sign in' });
  action.focus();
  expect(document.activeElement).toBe(action);
  await userEvent.keyboard('{Enter}');
  expect(run).toHaveBeenCalledOnce();
  expect(screen.queryByRole('status')).toBeNull();

  showToast('Camera unavailable', { tone: 'error' });
  const error = screen.getByRole('status', { name: 'Camera unavailable' });
  expect(error.getAttribute('aria-live')).toBe('assertive');
  screen.getByRole('button', { name: 'Dismiss' }).focus();
  await userEvent.keyboard('{Space}');
  expect(screen.queryByRole('status')).toBeNull();

  showToast('Invite sent', { tone: 'success' });
  screen.getByRole('status', { name: 'Invite sent' }).focus();
  await userEvent.keyboard('{Escape}');
  expect(screen.queryByRole('status')).toBeNull();
  expect(screen.getByRole('dialog')).toBe(dialog);
  expect(onOpenChange).not.toHaveBeenCalled();
});

it('expires toasts and clears visible and queued feedback when the host unmounts', async () => {
  vi.useFakeTimers();
  const { unmount } = render(() => <ToastHost />);

  showToast('Link copied');
  expect(screen.getByRole('status', { name: 'Link copied' })).toBeTruthy();
  await vi.advanceTimersByTimeAsync(6000);
  expect(screen.queryByText('Link copied')).toBeNull();

  for (const message of ['First', 'Second', 'Third', 'Queued']) {
    showToast(message);
  }
  expect(screen.getAllByRole('status')).toHaveLength(3);
  unmount();

  render(() => <ToastHost />);
  expect(screen.queryByRole('status')).toBeNull();
  await vi.runOnlyPendingTimersAsync();
  expect(screen.queryByRole('status')).toBeNull();
});
