import { onCleanup, onMount, ParentProps } from 'solid-js';
import { useI18n } from '../../../shared/i18n';
import DialogFrame from '../../../components/dialogs/DialogFrame.jsx';
import { ringtoneManager } from '../audio/ringtone-manager';
import { callIndicators } from '../../../shared/components/ui/utils/call-indicators';

export interface CallDialogProps {
  idPrefix?: string;
  name?: string;
  defaultName?: string;
  callKindLabel?: string;
  audioOnly?: boolean;
  title?: string;
  titleKey?: string;
  subtitle?: any;
  tone?: string;
  ringtone?: 'incoming' | 'outgoing' | false;
  cardClass?: string;
  details?: any;
  actions?: any;
}

export default function CallDialog(props: ParentProps<CallDialogProps>) {
  const { t } = useI18n();
  const idPrefix = () => props.idPrefix || 'call-dialog';

  const name = () => props.name || props.defaultName;
  const callKindLabel = () =>
    props.callKindLabel ||
    (props.audioOnly ? t('message.audioCall') : t('message.videoCall'));
  const title = () => props.title || t(props.titleKey, { name: name() });
  const ringtone = () => props.ringtone ?? false;

  onMount(() => {
    if (ringtone() === 'incoming') {
      ringtoneManager.playIncoming();
      callIndicators.startCallIndicators(name());
    } else if (ringtone() === 'outgoing') {
      ringtoneManager.playOutgoing({ audioOnly: props.audioOnly });
    }
  });

  onCleanup(() => {
    ringtoneManager.stop();
    callIndicators.stopCallIndicators();
  });

  return (
    <DialogFrame
      class={props.cardClass}
      tone={props.tone}
      titleId={`${idPrefix()}-title`}
      descriptionId={`${idPrefix()}-description`}
      badge={callKindLabel()}
      title={title()}
      subtitle={props.subtitle}
      actions={props.actions}
    >
      <div class='dialog-persona'>
        <div class='dialog-avatar' aria-hidden='true'>
          {name().slice(0, 1).toUpperCase()}
        </div>
        <div class='dialog-persona-text'>
          <strong>{name()}</strong>
          {props.details ? (
            <span class='dialog-meta'>{props.details}</span>
          ) : null}
        </div>
      </div>
    </DialogFrame>
  );
}
