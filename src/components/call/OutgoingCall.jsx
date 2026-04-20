import { useI18n } from '../../shared/i18n/index.js';
import CallDialogFrame from './CallDialogFrame.jsx';

export default function OutgoingCall(props) {
  const { t } = useI18n();
  const idPrefix = () => props.idPrefix || 'outgoing-call';

  const calleeName = () => props.calleeName || t('shared.contact');
  const callKindLabel = () =>
    props.callKindLabel ||
    (props.audioOnly ? t('message.audioCall') : t('message.videoCall'));
  const title = () => props.title || t('call.calling', { name: calleeName() });
  const subtitle = () => props.subtitle || t('call.waiting');
  const cancelLabel = () =>
    props.cancelLabel ||
    (props.isCancelling ? t('shared.sending') : t('shared.cancel'));

  return (
    <CallDialogFrame
      class='outgoing-call-card'
      tone='outgoing'
      titleId={`${idPrefix()}-title`}
      descriptionId={`${idPrefix()}-description`}
      badge={callKindLabel()}
      title={title()}
      subtitle={subtitle()}
      actions={
        <button
          type='button'
          class='call-dialog-btn call-dialog-btn--danger'
          disabled={!!props.disabled || !!props.isCancelling}
          aria-busy={props.isCancelling ? 'true' : 'false'}
          onClick={() => props.onCancel?.()}
        >
          {cancelLabel()}
        </button>
      }
    >
      <div class='call-dialog-persona'>
        <div class='call-dialog-avatar' aria-hidden='true'>
          {calleeName().slice(0, 1).toUpperCase()}
        </div>
        <div class='call-dialog-persona-text'>
          <strong>{calleeName()}</strong>
          {props.details ? (
            <span class='call-dialog-meta'>{props.details}</span>
          ) : null}
        </div>
      </div>
    </CallDialogFrame>
  );
}
