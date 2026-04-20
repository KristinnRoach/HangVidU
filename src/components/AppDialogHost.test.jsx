import { cleanup, render } from '@solidjs/testing-library';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import AppDialogHost, {
  closeAppDialog,
  dismissIncomingCallDialog,
  showIncomingCallDialog,
  showOutgoingCallDialog,
} from './AppDialogHost.jsx';

vi.mock('./contacts/EditContactDialog.jsx', () => ({
  default: () => <div>Edit Contact Dialog</div>,
}));

vi.mock('./contacts/SaveContactDialog.jsx', () => ({
  default: () => <div>Save Contact Dialog</div>,
}));

vi.mock('./call/IncomingCall.jsx', () => ({
  default: (props) => (
    <div>
      Incoming Call:
      {props.callerName}
    </div>
  ),
}));

vi.mock('./call/IncomingCallDialog.jsx', () => ({
  default: (props) => (
    <div>
      Incoming Call Dialog:
      {props.callerName}
    </div>
  ),
}));

vi.mock('./call/OutgoingCall.jsx', () => ({
  default: (props) => (
    <div>
      Outgoing Call:
      {props.calleeName}
    </div>
  ),
}));

describe('AppDialogHost', () => {
  beforeEach(() => {
    closeAppDialog();
  });

  afterEach(() => {
    closeAppDialog();
    cleanup();
  });

  it('renders incoming-call dialogs through the shared host', () => {
    showIncomingCallDialog({ callerName: 'Alice' });

    render(() => <AppDialogHost />);

    expect(document.body.textContent).toContain('Incoming Call Dialog:Alice');
  });

  it('renders outgoing-call dialogs through the shared host', () => {
    showOutgoingCallDialog({ calleeName: 'Bob' });

    render(() => <AppDialogHost />);

    expect(document.body.textContent).toContain('Outgoing Call:Bob');
  });

  it('dismisses only the matching incoming-call dialog', () => {
    showIncomingCallDialog({ roomId: 'room-1', callerName: 'Alice' });
    render(() => <AppDialogHost />);

    expect(dismissIncomingCallDialog('room-2')).toBe(false);
    expect(document.body.textContent).toContain('Incoming Call Dialog:Alice');

    expect(dismissIncomingCallDialog('room-1')).toBe(true);
    expect(document.body.textContent).not.toContain(
      'Incoming Call Dialog:Alice',
    );
  });
});
