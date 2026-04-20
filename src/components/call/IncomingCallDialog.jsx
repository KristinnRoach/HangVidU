import IncomingCall from './IncomingCall.jsx';

export default function IncomingCallDialog(props) {
  return (
    <IncomingCall
      idPrefix={`incoming-call-${props.roomId || 'dialog'}`}
      callerName={props.callerName}
      subtitle={props.subtitle}
      details={props.details}
      acceptLabel={props.acceptLabel}
      declineLabel={props.declineLabel}
      isAccepting={props.isAccepting}
      isDeclining={props.isDeclining}
      disabled={props.disabled}
      audioOnly={props.audioOnly}
      callKindLabel={props.callKindLabel}
      onAccept={props.onAccept}
      onDecline={props.onDecline}
    />
  );
}
