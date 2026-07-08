import { useI18n } from '@shared/i18n';
import CallDialog from './CallDialog';
import type { CallDialogProps } from './CallDialog';

export default function BusyCallDialog(props: CallDialogProps) {
  const { t } = useI18n();
  const idPrefix = () => props.idPrefix || 'busy-call';

  return (
    <CallDialog
      {...props}
      cardClass="outgoing-call-card"
      tone="outgoing"
      ringtone="busy"
      idPrefix={idPrefix()}
      defaultName={t('shared.contact')}
      titleKey="call.busy"
      showPersona={false}
    />
  );
}
