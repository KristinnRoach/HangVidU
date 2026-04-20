import { cleanup, render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  dispatchCommand,
  dispatchCommandAndAwait,
} from '../shared/events/index.js';
import DialogProvider from './DialogProvider.jsx';

vi.mock('./contacts/EditContactDialog.jsx', () => ({
  default: () => <div>Edit Contact Dialog</div>,
}));

vi.mock('./contacts/SaveContactDialog.jsx', () => ({
  default: () => <div>Save Contact Dialog</div>,
}));

vi.mock('./call/IncomingCallDialog.jsx', () => ({
  default: (props) => (
    <div>
      Incoming Call Dialog:
      {props.callerName}
    </div>
  ),
}));

vi.mock('./call/OutgoingCallDialog.jsx', () => ({
  default: (props) => (
    <div>
      Outgoing Call Dialog:
      {props.calleeName}
    </div>
  ),
}));

describe('DialogProvider', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders incoming-call dialogs through dialog commands', async () => {
    render(() => <DialogProvider />);

    await dispatchCommandAndAwait('cmd:dialog:incoming-call:open', {
      callerName: 'Alice',
    });

    expect(document.body.textContent).toContain('Alice');
  });

  it('dismisses only the matching outgoing-call dialog', async () => {
    render(() => <DialogProvider />);

    await dispatchCommandAndAwait('cmd:dialog:outgoing-call:open', {
      roomId: 'room-1',
      calleeName: 'Bob',
    });

    expect(document.body.textContent).toContain('Bob');

    expect(
      await dispatchCommandAndAwait('cmd:dialog:outgoing-call:close', {
        roomId: 'room-2',
      }),
    ).toBe(false);
    expect(document.body.textContent).toContain('Bob');

    expect(
      await dispatchCommandAndAwait('cmd:dialog:outgoing-call:close', {
        roomId: 'room-1',
      }),
    ).toBe(true);
    expect(document.body.textContent).not.toContain('Bob');
  });

  it('opens edit contact dialogs through the app bus', async () => {
    render(() => <DialogProvider />);

    dispatchCommand('cmd:dialog:contact-edit:open', {
      contactId: 'contact-1',
      currentName: 'Alice',
      roomId: 'room-1',
    });

    expect(document.body.textContent).toContain('Edit');
  });

  it('resolves save-contact prompts as false on generic modal close', async () => {
    render(() => <DialogProvider />);

    const pending = dispatchCommandAndAwait('cmd:dialog:contact-save:prompt', {
      contactUserId: 'contact-1',
      roomId: 'room-1',
    });

    expect(document.body.textContent).toContain('Save Contact Dialog');

    dispatchCommand('cmd:dialog:modal:close');

    await expect(pending).resolves.toBe(false);
  });

  it('does not replace an active call dialog with a non-call dialog', async () => {
    render(() => <DialogProvider />);

    await dispatchCommandAndAwait('cmd:dialog:incoming-call:open', {
      roomId: 'room-1',
      callerName: 'Alice',
    });

    dispatchCommand('cmd:dialog:contact-edit:open', {
      contactId: 'contact-1',
      currentName: 'Alice',
      roomId: 'room-1',
    });

    expect(document.body.textContent).toContain('Incoming Call Dialog:Alice');
    expect(document.body.textContent).not.toContain('Edit Contact Dialog');
  });

  it('routes generic close through incoming-call decline', async () => {
    render(() => <DialogProvider />);

    const onDecline = vi.fn();

    await dispatchCommandAndAwait('cmd:dialog:incoming-call:open', {
      roomId: 'room-1',
      callerName: 'Alice',
      onDecline,
    });

    dispatchCommand('cmd:dialog:modal:close');

    expect(onDecline).toHaveBeenCalledTimes(1);
    expect(document.body.textContent).not.toContain('Incoming Call Dialog:Alice');
  });

  it('routes generic close through outgoing-call cancel', async () => {
    render(() => <DialogProvider />);

    const onCancel = vi.fn();

    await dispatchCommandAndAwait('cmd:dialog:outgoing-call:open', {
      roomId: 'room-1',
      calleeName: 'Bob',
      onCancel,
    });

    dispatchCommand('cmd:dialog:modal:close');

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(document.body.textContent).not.toContain('Outgoing Call Dialog:Bob');
  });
});
