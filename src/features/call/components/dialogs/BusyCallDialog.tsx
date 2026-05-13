import { useI18n } from '../../../../shared/i18n';
import CallDialog from './CallDialog';
import type { CallDialogProps } from './CallDialog';

interface BusyCallDialogProps extends CallDialogProps {
  onDismiss?: () => void;
}

export default function BusyCallDialog(props: BusyCallDialogProps) {
  const { t } = useI18n();
  const idPrefix = () => props.idPrefix || 'busy-call';

  return (
    <CallDialog
      {...props}
      cardClass='outgoing-call-card'
      tone='outgoing'
      ringtone='busy'
      idPrefix={idPrefix()}
      defaultName={t('shared.contact')}
      titleKey='call.busy'
      showPersona={false}
      actions={
        <button
          type='button'
          class='dialog-btn dialog-btn--danger'
          onClick={() => props.onDismiss?.()}
        >
          {t('shared.ok')}
        </button>
      }
    />
  );
}
