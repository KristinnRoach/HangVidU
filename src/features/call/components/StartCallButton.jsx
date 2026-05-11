/*
type Props = {
    contactId: string;
    title: string;
    class: string;
} 
*/

import { getCallService } from '../call-service';
import { dispatchCommand } from '../../../shared/events';
import { devDebug } from '../../../shared/utils/dev/dev-utils';

export default function StartCallButton(props) {
  function onCall() {
    devDebug('[CallButton] clicked', props.title);

    dispatchCommand('cmd:room:initiate:call', {
      calleeId: props.contactId,
      calleeName: props.calleeName,
      audioOnly: false,
    });
  }

  return (
    <button
      class='contact-call-btn'
      type='button'
      onClick={onCall}
      title={props.title}
      aria-label={props.title}
    >
      <i data-lucide='phone' fill='currentColor' stroke-width='0' />
    </button>
  );
}
