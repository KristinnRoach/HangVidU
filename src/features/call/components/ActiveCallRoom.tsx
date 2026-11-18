import { Link2, UserPlus } from 'lucide-solid';
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
import { showSuccessToast } from '@components/base-legacy/toast.js';
import Dialog from '@components/dialogs/Dialog';
import { Spinner } from '@components/Spinner';
import TextField from '@components/TextField';
import {
  getContactsStore,
  getContactLabel,
  hydrateContacts,
  type Contact,
} from '@stores/contacts-store';

import { MemberStreams } from './MemberStreams';
import { ActiveCallControls } from './CallControls';
import { useCallHandshake } from '../call-handshake.js';
import type { CallMedia } from '../call-media';
import { useP2PContext } from '@shared/p2p-context.js';
import { getLocale, t } from '@shared/i18n';

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

  // Room-link calls use a fresh ID. Contact calls reuse a conversation ID
  // across calls, so exposing it in an invite would also expose future calls.
  const isRoomLinkCall = new URLSearchParams(window.location.search).has(
    'publicRoom',
  );
  const [remoteAudioMuted, setRemoteAudioMuted] = createSignal(false);

  return (
    <div class={styles.room}>
      <MemberStreams
        remoteAudioMuted={remoteAudioMuted()}
        media={props.media}
      />

      <div class='pointer-events-none absolute inset-x-(--gap) top-(--call-overlay-top) z-10 grid grid-cols-[minmax(2.75rem,1fr)_minmax(0,max-content)_minmax(2.75rem,1fr)] items-start gap-2 transition-[top] duration-(--duration-default) ease-(--easing-default) motion-reduce:transition-none'>
        <div class='col-start-3 row-start-1 flex justify-end gap-2'>
          <Show
            when={
              isRoomLinkCall &&
              p2p.state() === 'joined' &&
              !props.media.faceMaskCapturing()
            }
          >
            <CopyRoomLink />
          </Show>
          <Show when={invitePickerOwner()} keyed>
            <InviteCaller />
          </Show>
        </div>
        <Show when={ringingIntoRoom() || inviteNotice()}>
          <div
            role='status'
            class='pointer-events-auto col-start-2 row-start-1 flex min-h-11 items-center gap-2 rounded-full bg-bg-darker py-1 pr-1 pl-4 text-sm wrap-anywhere text-text-primary'
          >
            <Show
              when={ringingIntoRoom()}
              fallback={<span class='pr-3'>{inviteNotice()}</span>}
            >
              {(call) => (
                <>
                  <span>{t('call.calling', { name: call().calleeName })}</span>
                  <Button
                    variant='danger'
                    class='shrink-0 rounded-full'
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

function CopyRoomLink() {
  const link = window.location.href;
  const [manualCopy, setManualCopy] = createSignal(false);
  let active = true;
  onCleanup(() => {
    active = false;
  });

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      if (active) setManualCopy(true);
      return;
    }
    if (active) showSuccessToast(t('call.link_copied'));
  }

  return (
    <>
      <Button
        variant='secondary'
        class='pointer-events-auto size-11 shrink-0'
        aria-label={t('call.copy_invite_link')}
        title={t('call.copy_invite_link')}
        onClick={copyLink}
      >
        <Link2 size={20} class='shrink-0' aria-hidden='true' />
      </Button>
      <Dialog
        open={manualCopy()}
        onOpenChange={setManualCopy}
        title={t('call.copy_invite_link')}
      >
        <TextField
          label={t('call.copy_invite_manually')}
          value={link}
          onChange={() => {}}
          onFocus={(event) => event.currentTarget.select()}
          readOnly
        />
      </Dialog>
    </>
  );
}

function InviteCaller() {
  const [open, setOpen] = createSignal(false);

  return (
    <>
      <Button
        variant='success'
        class='pointer-events-auto size-11 shrink-0'
        aria-label={t('call.add_caller')}
        title={t('call.add_caller')}
        aria-haspopup='dialog'
        onClick={() => setOpen(true)}
      >
        <UserPlus size={20} class='shrink-0' aria-hidden='true' />
      </Button>
      <Dialog open={open()} onOpenChange={setOpen} title={t('call.add_caller')}>
        <InviteCallerContacts close={() => setOpen(false)} />
      </Dialog>
    </>
  );
}

function InviteCallerContacts(props: { close: () => void }) {
  const { startCall, isCallDisabled } = useCallHandshake();
  const contacts = getContactsStore();
  const [query, setQuery] = createSignal('');
  const name = (contact: Contact) =>
    getContactLabel(contact) ?? t('contact.no_name');
  const eligibleContacts = createMemo(() => {
    const locale = getLocale();
    return Object.values(contacts.byId)
      .filter(({ contactId }) => !isCallDisabled(contactId))
      .sort((a, b) => name(a).localeCompare(name(b), locale));
  });
  const matches = createMemo(() => {
    const term = query().trim().toLowerCase();
    return eligibleContacts().filter((contact) =>
      name(contact).toLowerCase().includes(term),
    );
  });

  function invite(contact: Contact) {
    props.close();
    void startCall({
      calleeId: contact.contactId,
      calleeName: name(contact),
      audioOnly: false,
    });
  }

  return (
    <Switch fallback={<Spinner />}>
      <Match when={contacts.status === 'ready'}>
        <Show
          when={eligibleContacts().length}
          fallback={<p class='text-sm'>{t('call.no_invitable_contacts')}</p>}
        >
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const firstMatch = matches()[0];
              if (firstMatch) invite(firstMatch);
            }}
          >
            <TextField
              label={t('contact.search')}
              hideLabel
              placeholder={t('contact.search')}
              value={query()}
              onChange={setQuery}
            />
          </form>
          <Show
            when={matches().length}
            fallback={<p class='text-sm'>{t('contact.search.no_matches')}</p>}
          >
            <div class='flex flex-col gap-2'>
              <For each={matches()}>
                {(contact) => (
                  <Button
                    class='justify-start wrap-anywhere text-left'
                    onClick={() => invite(contact)}
                  >
                    {name(contact)}
                  </Button>
                )}
              </For>
            </div>
          </Show>
        </Show>
      </Match>
      <Match when={contacts.status === 'error'}>
        <Button onClick={() => void hydrateContacts().catch(() => {})}>
          {t('call.retry_contacts')}
        </Button>
      </Match>
    </Switch>
  );
}
