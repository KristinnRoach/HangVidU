import { Show, createSignal, createEffect, onCleanup } from 'solid-js';
import type { AutoHideController } from '@shared/createAutoHide';

import { MemberStreams } from './MemberStreams';
import { ActiveCallControls } from './CallControls';
import { createCallMedia } from '../call-media';
import { useCallHandshake } from '../call-handshake.js';
import { useP2PContext } from '@shared/p2p-context.js';
import { t } from '@shared/i18n';

import styles from './ActiveCallRoom.module.css';

export function ActiveCallRoom(props: {
  holdTopBar: AutoHideController['hold'];
}) {
  const p2p = useP2PContext();
  const { reconnectStatus } = useCallHandshake();
  // createCallMedia owns local imperative track state (camera tracks, screen-share track)
  const media = createCallMedia(p2p);
  createEffect(() => {
    if (media.faceMaskCapturing()) onCleanup(props.holdTopBar('hidden'));
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
      <MemberStreams remoteAudioMuted={remoteAudioMuted()} media={media} />

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
          media={media}
          remoteAudioMuted={remoteAudioMuted()}
          onRemoteAudioMutedChange={setRemoteAudioMuted}
        />
      </Show>
    </div>
  );
}
