import { Show, createSignal } from 'solid-js';

import { MemberStreams } from './MemberStreams';
import { ActiveCallControls } from './CallControls';
import { createCallMedia } from '../call-media';
import { useP2PContext } from '@shared/p2p-context.js';

import styles from './ActiveCallRoom.module.css';

export function ActiveCallRoom() {
  const p2p = useP2PContext();
  // createCallMedia owns local imperative track state (camera tracks, screen-share track)
  const media = createCallMedia(p2p);

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

      <Show
        when={
          isRoomLinkCall &&
          p2p.state() === 'joined' &&
          p2p.remoteMemberStreams().length === 0
        }
      >
        <div class={styles.waiting}>
          <p>Room is empty...</p>
          <button type='button' onClick={copyLink}>
            {copied() ? 'Link copied' : 'Copy invite link'}
          </button>
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
