/*
type Props = {
    onCall: ({ roomId: string }) => void;
    roomId: string;
    title: string;
    class: string;
} 
*/

import { dispatchCommand } from '../../shared/events';

export default function CallButton(props) {
  function onCall() {
    if (!props.roomId) {
      console.warn('[app] No room id for contact', {
        contactId: props.id,
      });
      return;
    }

    dispatchCommand('cmd:room:initiate:call', {
      roomId: props.roomId,
    });
  }

  // console.warn('CallButton roomId: ', props.roomId);

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
