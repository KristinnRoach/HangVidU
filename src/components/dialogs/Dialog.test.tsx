import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@solidjs/testing-library';
import { createSignal, Show } from 'solid-js';
import { afterEach, describe, expect, it, vi } from 'vite-plus/test';
import Dialog from './Dialog';

vi.mock('@shared/i18n', () => ({
  useI18n: () => ({ t: (key: string) => key }),
}));

describe('Dialog', () => {
  afterEach(cleanup);

  it('closes on Escape and returns focus to the opener', async () => {
    const [open, setOpen] = createSignal(false);
    render(() => (
      <>
        <button onClick={() => setOpen(true)}>opener</button>
        <Dialog open={open()} onOpenChange={setOpen} title='Title'>
          <button>inside</button>
        </Dialog>
      </>
    ));
    const opener = screen.getByText('opener');
    opener.focus();
    fireEvent.click(opener);

    const dialog = await screen.findByRole('dialog');
    await waitFor(() =>
      expect(dialog.contains(document.activeElement)).toBe(true),
    );

    fireEvent.keyDown(document.activeElement!, { key: 'Escape' });

    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    await waitFor(() => expect(document.activeElement).toBe(opener));
  });

  it('without onOpenChange cannot be dismissed and focuses no action', async () => {
    const [mounted, setMounted] = createSignal(true);
    const opener = document.createElement('button');
    document.body.append(opener);
    opener.focus();

    render(() => (
      <Show when={mounted()}>
        <Dialog open title='Incoming' footer={<button>accept</button>} />
      </Show>
    ));

    const dialog = await screen.findByRole('alertdialog');
    await waitFor(() => expect(document.activeElement).toBe(dialog));
    expect(screen.queryByLabelText('shared.close')).toBeNull();

    fireEvent.keyDown(dialog, { key: 'Escape' });
    expect(screen.getByRole('alertdialog')).toBe(dialog);

    // Removing it (the call ended) hands the page back.
    setMounted(false);
    await waitFor(() => expect(screen.queryByRole('alertdialog')).toBeNull());
    await waitFor(() => expect(document.activeElement).toBe(opener));
    expect(document.body.style.pointerEvents).not.toBe('none');
    opener.remove();
  });
});
