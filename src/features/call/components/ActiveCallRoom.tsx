import { Plus } from 'lucide-solid';
import {
  For,
  Match,
  Show,
  Switch,
  createMemo,
  createSignal,
  createEffect,
  onCleanup,
} from 'solid-js';
import type { AutoHideController } from '@shared/createAutoHide';
import { useAuth } from '@auth';
import Button from '@components/Button';
import Dialog from '@components/dialogs/Dialog';
import { Spinner } from '@components/Spinner';
import {
  getContactsStore,
  getContactLabel,
  hydrateContacts,
} from '@stores/contacts-store';

import { MemberStreams } from './MemberStreams';
import { ActiveCallControls } from './CallControls';
import { useCallHandshake } from '../call-handshake.js';
import type { CallMedia } from '../call-media';
import { useP2PContext } from '@shared/p2p-context.js';
import { t } from '@shared/i18n';

import styles from './ActiveCallRoom.module.css';

export function ActiveCallRoom(props: {
  media: CallMedia;
  holdTopBar: AutoHideController['hold'];
}) {
  const p2p = useP2PContext();
  const { user, isLoggingOut } = useAuth();
  const { reconnectStatus, outgoingCall, inviteOutcome, cancelOutgoing } =
    useCallHandshake();
  const invitePickerOwner = () =>
    p2p.state() === 'joined' &&
    !isLoggingOut() &&
    !props.media.faceMaskCapturing()
      ? user()?.uid
      : undefined;
  const ringingIntoRoom = () =>
    outgoingCall()?.joinRoomId ? outgoingCall() : null;
  const inviteNotice = () => {
    const outcome = inviteOutcome();
    return outcome?.call.joinRoomId
      ? t(`call.invite_${outcome.result}`, { name: outcome.call.calleeName })
      : null;
  };
  createEffect(() => {
    if (props.media.faceMaskCapturing()) onCleanup(props.holdTopBar('hidden'));
  });

  // Room-link (guest) calls carry ?publicRoom= in the URL; contact calls don't.
  // Only those can re-share the page URL as an invite.
  const isRoomLinkCall = new URLSearchParams(window.location.search).has(
    'publicRoom',
  );
  const [copied, setCopied] = createSignal(false);
  const [remoteAudioMuted, setRemoteAudioMuted] = createSignal(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div class={styles.room}>
      <MemberStreams
        remoteAudioMuted={remoteAudioMuted()}
        media={props.media}
      />

      <div class='pointer-events-none absolute inset-x-2 top-[calc(var(--topbar-height)+0.5rem)] z-10 flex flex-col items-end gap-2'>
        <Show when={invitePickerOwner()} keyed>
          <InviteCaller />
        </Show>
        <Show when={ringingIntoRoom() || inviteNotice()}>
          <div
            role='status'
            class='pointer-events-auto flex min-h-9 items-center gap-3 self-center rounded-full bg-bg-darker py-1 pr-1 pl-4 text-sm text-text-primary'
          >
            <Show
              when={ringingIntoRoom()}
              fallback={<span class='pr-3'>{inviteNotice()}</span>}
            >
              {(call) => (
                <>
                  {t('call.calling', { name: call().calleeName })}
                  <Button
                    variant='danger'
                    class='rounded-full'
                    onClick={cancelOutgoing}
                  >
                    {t('shared.cancel')}
                  </Button>
                </>
              )}
            </Show>
          </div>
        </Show>
      </div>

      <Show when={reconnectStatus() !== 'connected'}>
        <div class={styles.reconnecting} role='status' aria-live='polite'>
          <p>
            {reconnectStatus() === 'connect-failed'
              ? t('call.connect_failed')
              : reconnectStatus() === 'failed'
                ? t('call.reconnect_failed')
                : t('call.reconnecting')}
          </p>
        </div>
      </Show>

      <Show
        when={
          p2p.state() === 'joined' &&
          p2p.remoteMemberStreams().length === 0 &&
          reconnectStatus() === 'connected'
        }
      >
        <div class={styles.waiting}>
          <p>
            {isRoomLinkCall ? t('call.room_empty') : t('call.waiting_peer')}
          </p>
          <Show when={isRoomLinkCall}>
            <button type='button' onClick={copyLink}>
              {copied()
                ? t('call.lobby.link_copied')
                : t('call.copy_invite_link')}
            </button>
          </Show>
        </div>
      </Show>

      <Show when={p2p.state() === 'joined'}>
        <ActiveCallControls
          media={props.media}
          remoteAudioMuted={remoteAudioMuted()}
          onRemoteAudioMutedChange={setRemoteAudioMuted}
        />
      </Show>
    </div>
  );
}

function InviteCaller() {
  const { startCall, isCallDisabled } = useCallHandshake();
  const contacts = getContactsStore();
  const [open, setOpen] = createSignal(false);
  const eligibleContacts = createMemo(() =>
    Object.values(contacts.byId).filter(
      ({ contactId }) => !isCallDisabled(contactId),
    ),
  );

  return (
    <>
      <Button
        variant='success'
        class='pointer-events-auto min-h-11'
        aria-haspopup='dialog'
        onClick={() => setOpen(true)}
      >
        <Plus size={18} aria-hidden='true' />
        {t('call.add_caller')}
      </Button>
      <Dialog open={open()} onOpenChange={setOpen} title={t('call.add_caller')}>
        <Switch fallback={<Spinner />}>
          <Match when={contacts.status === 'ready'}>
            <Show
              when={eligibleContacts().length}
              fallback={
                <p class='text-sm'>{t('call.no_invitable_contacts')}</p>
              }
            >
              <div class='flex flex-col gap-2'>
                <For each={eligibleContacts()}>
                  {(contact) => {
                    const name = () =>
                      getContactLabel(contact) ?? t('contact.no_name');
                    return (
                      <Button
                        class='justify-start wrap-anywhere text-left'
                        onClick={() => {
                          setOpen(false);
                          void startCall({
                            calleeId: contact.contactId,
                            calleeName: name(),
                            audioOnly: false,
                          });
                        }}
                      >
                        {name()}
                      </Button>
                    );
                  }}
                </For>
              </div>
            </Show>
          </Match>
          <Match when={contacts.status === 'error'}>
            <Button onClick={() => void hydrateContacts().catch(() => {})}>
              {t('call.retry_contacts')}
            </Button>
          </Match>
        </Switch>
      </Dialog>
    </>
  );
}
