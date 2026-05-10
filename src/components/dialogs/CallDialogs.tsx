import { Match, Switch } from 'solid-js';

import type { useCallFlow } from '../../useCallFlow';
import IncomingCallDialog from './IncomingCallDialog.jsx';
import OutgoingCallDialog from './OutgoingCallDialog.jsx';

type Props = {
  callFlow: ReturnType<typeof useCallFlow>;
};

export default function CallDialogs(props: Props) {
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
