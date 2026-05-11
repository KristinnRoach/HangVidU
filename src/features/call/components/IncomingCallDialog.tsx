import { useI18n } from '../../../shared/i18n';
import CallDialog from './CallDialog.jsx';
import type { CallDialogProps } from './CallDialog';

interface IncomingCallDialogProps extends CallDialogProps {
  callerName?: string;
  disabled?: boolean;
  isAccepting?: boolean;
  isDeclining?: boolean;
  acceptLabel?: string;
  declineLabel?: string;
  onAccept?: () => void;
  onDecline?: () => void;
}

export default function IncomingCallDialog(props: IncomingCallDialogProps) {
  const { t } = useI18n();
  const idPrefix = () => props.idPrefix || 'incoming-call';
  const acceptLabel = () =>
    props.acceptLabel ||
    (props.isAccepting ? t('notification.invite.accepting') : t('call.accept'));
  const declineLabel = () =>
    props.declineLabel ||
    (props.isDeclining
      ? t('notification.invite.declining')
      : t('call.decline'));
  const buttonsDisabled = () =>
    !!props.disabled || !!props.isAccepting || !!props.isDeclining;

  return (
    <CallDialog
      {...props}
      cardClass='incoming-call-card'
      tone='incoming'
      idPrefix={idPrefix()}
      name={props.callerName}
      defaultName={t('shared.unknown')}
      titleKey='call.incoming'
      subtitle={props.subtitle}
      actions={
        <>
          <button
            type='button'
            class='dialog-btn dialog-btn--success'
            disabled={buttonsDisabled()}
            attr:aria-busy={props.isAccepting ? 'true' : 'false'}
            onClick={() => props.onAccept?.()}
          >
            {acceptLabel()}
          </button>
          <button
            type='button'
            class='dialog-btn dialog-btn--danger'
            disabled={buttonsDisabled()}
            attr:aria-busy={props.isDeclining ? 'true' : 'false'}
            onClick={() => props.onDecline?.()}
          >
            {declineLabel()}
          </button>
        </>
      }
    />
  );
}
