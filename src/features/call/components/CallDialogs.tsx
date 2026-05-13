import { createEffect, Match, onCleanup, Switch } from 'solid-js';

import type { useCallFlow } from '../useCallFlow';
import BusyCallDialog from './dialogs/BusyCallDialog.jsx';
import IncomingCallDialog from './dialogs/IncomingCallDialog.jsx';
import OutgoingCallDialog from './dialogs/OutgoingCallDialog.jsx';

type Props = {
  callFlow: ReturnType<typeof useCallFlow>;
};

const BUSY_AUTO_DISMISS_MS = 2_500;

export default function CallDialogs(props: Props) {
  let busyAutoDismissTimeoutId: ReturnType<typeof setTimeout> | undefined;

  function clearBusyAutoDismissTimeout() {
    if (!busyAutoDismissTimeoutId) return;
    clearTimeout(busyAutoDismissTimeoutId);
    busyAutoDismissTimeoutId = undefined;
  }

  createEffect(() => {
    clearBusyAutoDismissTimeout();
    if (props.callFlow.outgoingCallResult() !== 'busy') return;

    busyAutoDismissTimeoutId = setTimeout(() => {
      props.callFlow.clearOutgoingCallResult();
    }, BUSY_AUTO_DISMISS_MS);
  });

  onCleanup(clearBusyAutoDismissTimeout);

  return (
    <Switch>
      <Match when={props.callFlow.outgoingCall()}>
        {(call) => (
          <OutgoingCallDialog
            calleeName={call().calleeName}
            audioOnly={call().audioOnly}
            onCancel={props.callFlow.cancelOutgoing}
          />
        )}
      </Match>
      <Match when={props.callFlow.outgoingCallResult() === 'busy'}>
        <BusyCallDialog onDismiss={props.callFlow.clearOutgoingCallResult} />
      </Match>
      <Match when={props.callFlow.incomingCall()}>
        {(call) => (
          <IncomingCallDialog
            callerName={call().callerName}
            audioOnly={call().audioOnly}
            onAccept={props.callFlow.acceptIncoming}
            onDecline={props.callFlow.declineIncoming}
          />
        )}
      </Match>
    </Switch>
  );
}
