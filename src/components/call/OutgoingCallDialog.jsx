import OutgoingCall from './OutgoingCall.jsx';

export default function OutgoingCallDialog(props) {
  return (
    <OutgoingCall
      idPrefix={`outgoing-call-${props.roomId || 'dialog'}`}
      calleeName={props.calleeName}
      subtitle={props.subtitle}
      details={props.details}
      cancelLabel={props.cancelLabel}
      isCancelling={props.isCancelling}
      disabled={props.disabled}
      audioOnly={props.audioOnly}
      callKindLabel={props.callKindLabel}
      onCancel={props.onCancel}
    />
  );
}
