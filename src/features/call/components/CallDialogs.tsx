import { Match, Switch } from 'solid-js';

import { useCallFlowContext } from '../call-flow-context.js';
import BusyCallDialog from './dialogs/BusyCallDialog.jsx';
import IncomingCallDialog from './dialogs/IncomingCallDialog.jsx';
import OutgoingCallDialog from './dialogs/OutgoingCallDialog.jsx';

export default function CallDialogs() {
  const callFlow = useCallFlowContext();

  return (
    <Switch>
      <Match when={callFlow.outgoingCall()}>
        {(call) => (
          <OutgoingCallDialog
            calleeName={call().calleeName}
            audioOnly={call().audioOnly}
            onCancel={callFlow.cancelOutgoing}
          />
        )}
      </Match>
      <Match when={callFlow.outgoingCallResponse() === 'busy'}>
        <BusyCallDialog />
      </Match>
      <Match when={callFlow.incomingCall()}>
        {(call) => (
          <IncomingCallDialog
            callerName={call().callerName}
            audioOnly={call().audioOnly}
            onAccept={callFlow.acceptIncoming}
            onDecline={callFlow.declineIncoming}
          />
        )}
      </Match>
    </Switch>
  );
}
