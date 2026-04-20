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
});
