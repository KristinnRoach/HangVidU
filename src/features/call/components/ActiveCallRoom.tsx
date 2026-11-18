import { Show, createSignal, createEffect, onCleanup } from 'solid-js';
import type { AutoHideController } from '@shared/createAutoHide';

import { MemberStreams } from './MemberStreams';
import { ActiveCallControls } from './CallControls';
import { useCallHandshake } from '../call-handshake.js';
import type { CallMedia } from '../call-media';
import { useP2PContext } from '@shared/p2p-context.js';
import Button from '../../../components/Button';
import { t } from '@shared/i18n';

import styles from './ActiveCallRoom.module.css';

export function ActiveCallRoom(props: {
  media: CallMedia;
  holdTopBar: AutoHideController['hold'];
}) {
  const p2p = useP2PContext();
  const { reconnectStatus, outgoingCall, busyCall, cancelOutgoing } =
    useCallHandshake();
  const ringingIntoRoom = () =>
    outgoingCall()?.joinRoomId ? outgoingCall() : null;
  const busyIntoRoom = () => (busyCall()?.joinRoomId ? busyCall() : null);
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

      <Show when={ringingIntoRoom() ?? busyIntoRoom()}>
        {(call) => (
          <div
            role='status'
            class='absolute top-16 left-1/2 z-10 flex min-h-9 -translate-x-1/2 items-center gap-3 rounded-full bg-bg-darker py-1 pr-1 pl-4 text-sm text-text-primary'
          >
            <Show
              when={ringingIntoRoom()}
              fallback={
                <span class='pr-3'>
                  {t('call.busy_name', { name: call().calleeName })}
                </span>
              }
            >
              {t('call.calling', { name: call().calleeName })}
              <Button
                variant='danger'
                class='rounded-full'
                onClick={cancelOutgoing}
              >
                {t('shared.cancel')}
              </Button>
            </Show>
          </div>
        )}
      </Show>

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
            {isRoomLinkCall
              ? 'Room is empty...'
              : 'Waiting for the other person to connect...'}
          </p>
          <Show when={isRoomLinkCall}>
            <button type='button' onClick={copyLink}>
              {copied() ? 'Link copied' : 'Copy invite link'}
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
