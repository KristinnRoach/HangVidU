import { Match, onCleanup, onMount, Switch, type JSX } from 'solid-js';

import { useI18n } from '@shared/i18n';
import { callIndicators } from '@shared/utils/ui-utils/call-indicators';
import Button from '../../../components/Button';
import Dialog from '../../../components/dialogs/Dialog';
import { ringtoneManager } from '../audio/ringtone-manager';
import { useCallHandshake } from '../call-handshake.js';

/** A call prompt lives exactly as long as its ringtone. */
function CallDialog(props: {
  title: string;
  description?: string;
  footer?: JSX.Element;
  ring: () => void;
}) {
  onMount(() => props.ring());
  onCleanup(() => {
    ringtoneManager.stop();
    callIndicators.stopCallIndicators();
  });

  return (
    <Dialog
      open
      title={props.title}
      description={props.description}
      footer={props.footer}
    />
  );
}

export function CallDialogs() {
  const { t } = useI18n();
  const handshake = useCallHandshake();
  const kind = (audioOnly?: boolean) =>
    audioOnly ? t('message.audioCall') : t('message.videoCall');

  return (
    <Switch>
      {/* Ringing a contact into a live call shows in the call view instead. */}
      <Match
        when={!handshake.outgoingCall()?.joinRoomId && handshake.outgoingCall()}
      >
        {(call) => (
          <CallDialog
            title={t('call.calling', {
              name: call().calleeName || t('shared.contact'),
            })}
            description={`${kind(call().audioOnly)} · ${t('call.waiting')}`}
            ring={() =>
              void ringtoneManager.playOutgoing({ audioOnly: call().audioOnly })
            }
            footer={
              <Button variant='danger' onClick={handshake.cancelOutgoing}>
                {t('shared.cancel')}
              </Button>
            }
          />
        )}
      </Match>
      <Match when={handshake.busyCall() && !handshake.busyCall()?.joinRoomId}>
        <CallDialog
          title={t('call.busy')}
          ring={() => void ringtoneManager.playBusy()}
        />
      </Match>
      <Match when={handshake.incomingCall()}>
        {(call) => {
          const name = () => call().callerName || t('shared.unknown');
          return (
            <CallDialog
              title={t('call.incoming', { name: name() })}
              description={kind(call().audioOnly)}
              ring={() => {
                void ringtoneManager.playIncoming();
                callIndicators.startCallIndicators(name());
              }}
              footer={
                <>
                  <Button variant='danger' onClick={handshake.declineIncoming}>
                    {t('call.decline')}
                  </Button>
                  <Button variant='success' onClick={handshake.acceptIncoming}>
                    {t('call.accept')}
                  </Button>
                </>
              }
            />
          );
        }}
      </Match>
    </Switch>
  );
}
