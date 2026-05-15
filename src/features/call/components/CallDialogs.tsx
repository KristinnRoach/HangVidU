import { Match, Switch } from 'solid-js';

import { useCallHandshake } from '../call-handshake.js';
import BusyCallDialog from './dialogs/BusyCallDialog.jsx';
import IncomingCallDialog from './dialogs/IncomingCallDialog.jsx';
import OutgoingCallDialog from './dialogs/OutgoingCallDialog.jsx';

export default function CallDialogs() {
  const handshake = useCallHandshake();

  return (
    <Switch>
      <Match when={handshake.pendingOutgoingCall()}>
        {(call) => (
          <OutgoingCallDialog
            calleeName={call().calleeName}
            audioOnly={call().audioOnly}
            onCancel={handshake.cancelOutgoing}
          />
        )}
      </Match>
      <Match when={handshake.isCalleeBusy()}>
        <BusyCallDialog />
      </Match>
      <Match when={handshake.pendingIncomingCall()}>
        {(call) => (
          <IncomingCallDialog
            callerName={call().callerName}
            audioOnly={call().audioOnly}
            onAccept={handshake.acceptIncoming}
            onDecline={handshake.declineIncoming}
          />
        )}
      </Match>
    </Switch>
  );
}
