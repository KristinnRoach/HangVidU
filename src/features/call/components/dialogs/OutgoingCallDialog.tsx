import { useI18n } from '../../../../shared/i18n';
import CallDialog from './CallDialog.jsx';
import type { CallDialogProps } from './CallDialog';

interface OutgoingCallDialogProps extends CallDialogProps {
  calleeName?: string;
  disabled?: boolean;
  isCancelling?: boolean;
  cancelLabel?: string;
  onCancel?: () => void;
}

export default function OutgoingCallDialog(props: OutgoingCallDialogProps) {
  const { t } = useI18n();
  const idPrefix = () => props.idPrefix || 'outgoing-call';
  const cancelLabel = () =>
    props.cancelLabel ||
    (props.isCancelling ? t('shared.sending') : t('shared.cancel'));

  return (
    <CallDialog
      {...props}
      cardClass='outgoing-call-card'
      tone='outgoing'
      ringtone='outgoing'
      idPrefix={idPrefix()}
      name={props.calleeName}
      defaultName={t('shared.contact')}
      titleKey='call.calling'
      subtitle={props.subtitle || t('call.waiting')}
      actions={
        <button
          type='button'
          class='dialog-btn dialog-btn--danger'
          disabled={!!props.disabled || !!props.isCancelling}
          attr:aria-busy={props.isCancelling ? 'true' : 'false'}
          onClick={() => props.onCancel?.()}
        >
          {cancelLabel()}
        </button>
      }
    />
  );
}
