import { useI18n } from '../../shared/i18n/index.js';
import CallDialogFrame from './CallDialogFrame.jsx';

export default function IncomingCall(props) {
  const { t } = useI18n();
  const idPrefix = () => props.idPrefix || 'incoming-call';

  const callerName = () => props.callerName || t('shared.unknown');
  const callKindLabel = () =>
    props.callKindLabel ||
    (props.audioOnly ? t('message.audioCall') : t('message.videoCall'));
  const title = () =>
    props.title || t('call.incoming', { name: callerName() });
  const acceptLabel = () =>
    props.acceptLabel ||
    (props.isAccepting ? t('notification.invite.accepting') : t('call.accept'));
  const declineLabel = () =>
    props.declineLabel ||
    (props.isDeclining ? t('notification.invite.declining') : t('call.decline'));
  const buttonsDisabled = () =>
    !!props.disabled || !!props.isAccepting || !!props.isDeclining;

  return (
    <CallDialogFrame
      class='incoming-call-card'
      tone='incoming'
      titleId={`${idPrefix()}-title`}
      descriptionId={`${idPrefix()}-description`}
      badge={callKindLabel()}
      title={title()}
      subtitle={props.subtitle}
      actions={
        <>
          <button
            type='button'
            class='call-dialog-btn call-dialog-btn--success'
            disabled={buttonsDisabled()}
            aria-busy={props.isAccepting ? 'true' : 'false'}
            onClick={() => props.onAccept?.()}
          >
            {acceptLabel()}
          </button>
          <button
            type='button'
            class='call-dialog-btn call-dialog-btn--danger'
            disabled={buttonsDisabled()}
            aria-busy={props.isDeclining ? 'true' : 'false'}
            onClick={() => props.onDecline?.()}
          >
            {declineLabel()}
          </button>
        </>
      }
    >
      <div class='call-dialog-persona'>
        <div class='call-dialog-avatar' aria-hidden='true'>
          {callerName().slice(0, 1).toUpperCase()}
        </div>
        <div class='call-dialog-persona-text'>
          <strong>{callerName()}</strong>
          {props.details ? (
            <span class='call-dialog-meta'>{props.details}</span>
          ) : null}
        </div>
      </div>
    </CallDialogFrame>
  );
}
