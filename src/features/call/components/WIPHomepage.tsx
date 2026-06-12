// WIP guest-call homepage sketch — temporary replacement for PublicHomepage
// while we try out public room-link calls (no account needed).
// Lives in features/call (not components/) because it needs realtime + p2p,
// which the components layer may not import.
// TODO: i18n for new copy; design pass deferred until the Tailwind migration.
import { createSignal, createEffect, on, Show } from 'solid-js';

import { useP2PContext } from '../../../shared/p2p-context.js';
import { createRoomSignaling } from '../../../realtime/index.js';
import { signInAsGuest } from '../../../auth/index.js';
import {
  getAudioConstraints,
  getVideoConstraints,
} from '../media-constraints.js';
import { useI18n } from '../../../shared/i18n';

export default function WIPHomepage() {
  const p2p = useP2PContext();
  const { t } = useI18n();

  // Present when the visitor arrived via an invite link.
  const invitedRoomId = new URLSearchParams(window.location.search).get('room');

  const [roomId, setRoomId] = createSignal<string | null>(invitedRoomId);
  const [copied, setCopied] = createSignal(false);
  const [joining, setJoining] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);

  // Re-enable the join button once a call ends and the home view returns.
  createEffect(
    on(
      () => p2p.state(),
      (state) => {
        if (state === 'idle') setJoining(false);
      },
    ),
  );

  function createRoom() {
    const id = crypto.randomUUID();
    const url = new URL(window.location.href);
    url.searchParams.set('room', id);
    window.history.replaceState(null, '', url);
    setRoomId(id);
    void copyLink();
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  async function joinRoom() {
    const id = roomId();
    if (!id || joining()) return;
    setJoining(true);
    setError(null);
    try {
      const uid = await signInAsGuest();
      // peerId must be unique per tab, not per user: the anonymous session is
      // shared by all tabs of a browser profile, and the signaling DO keys
      // peers by peerId (the verified identity is authn-only). Two tabs
      // joining with the same uid would collide as one peer.
      const peerId = `${uid.slice(0, 6)}-${crypto.randomUUID().slice(0, 8)}`;
      const room = await p2p.join({
        roomId: id,
        peerId,
        createSignaling: createRoomSignaling,
        memberCapacity: 3,
        dataChannel: true,
        getLocalStream: () =>
          navigator.mediaDevices.getUserMedia({
            video: getVideoConstraints(),
            // Mirrors call-handshake-controller: no mic in dev to avoid echo.
            audio: import.meta.env.DEV ? false : getAudioConstraints(),
          }),
      });
      if (!room) throw p2p.error() ?? new Error('Room join returned no room');
    } catch (err) {
      console.error('[WIPHomepage] Failed to join guest room:', err);
      setError('Could not join the call. Please try again.');
      setJoining(false);
    }
  }

  return (
    <section class='public-homepage' aria-labelledby='public-homepage-title'>
      <div class='public-homepage__content'>
        <h2 id='public-homepage-title'>{t('home.title')}</h2>
        <p>
          Private peer-to-peer video calls, right in the browser. Start a call
          and share the link — no account needed. Sign in to save contacts,
          message them and call them directly.
        </p>

        <div class='public-homepage__actions'>
          <Show
            when={roomId()}
            fallback={
              <button
                type='button'
                class='public-homepage__cta'
                onClick={createRoom}
              >
                Start a call
              </button>
            }
          >
            <button
              type='button'
              class='public-homepage__cta'
              onClick={joinRoom}
              disabled={joining()}
            >
              {joining() ? 'Joining…' : 'Join call'}
            </button>
            <Show when={!invitedRoomId}>
              <button
                type='button'
                class='public-homepage__secondary'
                onClick={copyLink}
              >
                {copied() ? 'Link copied' : 'Copy invite link'}
              </button>
            </Show>
          </Show>
        </div>

        <Show when={roomId() && !invitedRoomId}>
          <p class='public-homepage__hint'>
            Send the link to the person you want to call, then join.
          </p>
        </Show>
        <Show when={invitedRoomId && !joining()}>
          <p class='public-homepage__hint'>
            You've been invited to a video call.
          </p>
        </Show>
        <Show when={error()}>
          <p class='public-homepage__error' role='alert'>
            {error()}
          </p>
        </Show>

        {/* Privacy/terms intentionally omitted — LegalFooter covers them. */}
      </div>
    </section>
  );
}
