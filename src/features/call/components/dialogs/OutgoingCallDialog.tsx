import { useI18n } from '../../../../shared/i18n';
import CallDialog from './CallDialog.jsx';
import type { CallDialogProps } from './CallDialog';

interface OutgoingCallDialogProps extends CallDialogProps {
  calleeName?: string;
  cancelLabel?: string;
  disabled?: boolean;
  onCancel?: () => void;
}

export default function OutgoingCallDialog(props: OutgoingCallDialogProps) {
  const { t } = useI18n();
  const cancelLabel = () => props.cancelLabel || t('shared.cancel');

  return (
    <CallDialog
      {...props}
      cardClass='outgoing-call-card'
      tone='outgoing'
      ringtone='outgoing'
      idPrefix='outgoing-call'
      name={props.calleeName}
      defaultName={t('shared.contact')}
      titleKey='call.calling'
      subtitle={props.subtitle || t('call.waiting')}
      actions={
        <button
          type='button'
          class='dialog-btn dialog-btn--danger'
          disabled={!!props.disabled}
          onClick={() => props.onCancel?.()}
        >
          {cancelLabel()}
        </button>
      }
    />
  );
}
