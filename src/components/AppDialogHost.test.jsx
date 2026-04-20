import { cleanup, render } from '@solidjs/testing-library';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import AppDialogHost, {
  closeAppDialog,
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

    expect(document.body.textContent).toContain('Incoming Call:Alice');
  });

  it('renders outgoing-call dialogs through the shared host', () => {
    showOutgoingCallDialog({ calleeName: 'Bob' });

    render(() => <AppDialogHost />);

    expect(document.body.textContent).toContain('Outgoing Call:Bob');
  });
});
