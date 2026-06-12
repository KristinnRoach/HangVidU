// Guest call lobby: create a room-link call or join one via ?room=<id>.
// No account needed — signs in anonymously for the signaling token.
// TODO: i18n for copy; design pass deferred until the Tailwind migration.
import { createSignal, createEffect, on, Show } from 'solid-js';

import { useP2PContext } from '../../../shared/p2p-context.js';
import { createRoomSignaling } from '../../../realtime/index.js';
import { signInAsGuest } from '../../../auth/index.js';
import {
  getAudioConstraints,
  getVideoConstraints,
} from '../media-constraints.js';

function joinErrorMessage(err: unknown, kind: string | undefined): string {
  if (kind === 'room-full') return 'This call is already full.';
  if (
    kind === 'local-stream' ||
    (err instanceof DOMException && err.name === 'NotAllowedError')
  ) {
    return 'Camera or microphone access was blocked. Allow access in your browser and try again.';
  }
  return 'Could not join the call. Please try again.';
}

// Room ids are crypto.randomUUID(); anything else in ?room= is a mangled
// or forged link — drop it instead of attempting a join that can't work.
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function roomIdFromUrl(): string | null {
  const raw = new URLSearchParams(window.location.search).get('room');
  return raw && UUID_RE.test(raw) ? raw : null;
}

export default function CallLobby() {
  const p2p = useP2PContext();

  // Set when the visitor arrived via an invite link; cleared once that
  // call ends (the room link is single-use).
  const [invitedRoomId, setInvitedRoomId] = createSignal<string | null>(
    roomIdFromUrl(),
  );

  const [roomId, setRoomId] = createSignal<string | null>(invitedRoomId());
  const [copied, setCopied] = createSignal(false);
  const [joining, setJoining] = createSignal(false);
  const [callEnded, setCallEnded] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);

  // Re-enable the join button once a call ends and the lobby returns.
  // A finished call also means the room link is dead — clear it so a
  // reload or retry doesn't offer a join into a stale room.
  createEffect(
    on(
      () => p2p.state(),
      (state, prev) => {
        if (state !== 'idle') return;
        setJoining(false);
        if (prev === 'joined') {
          const url = new URL(window.location.href);
          url.searchParams.delete('room');
          window.history.replaceState(null, '', url);
          setRoomId(null);
          setInvitedRoomId(null);
          setCallEnded(true);
        }
      },
    ),
  );

  function createRoom() {
    const id = crypto.randomUUID();
    const url = new URL(window.location.href);
    url.searchParams.set('room', id);
    window.history.replaceState(null, '', url);
    setRoomId(id);
    setCallEnded(false);
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

  async function shareLink() {
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ url: window.location.href });
        return;
      } catch {
        // Share sheet dismissed or unavailable — fall back to copying.
      }
    }
    await copyLink();
  }

  async function joinRoom() {
    const id = roomId();
    if (!id || joining()) return;
    setJoining(true);
    setCallEnded(false);
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
        memberCapacity: 4,
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
      console.error('[CallLobby] Failed to join guest room:', err);
      setError(joinErrorMessage(err, p2p.errorKind()));
      setJoining(false);
    }
  }

  return (
    <div class='call-lobby'>
      <div class='call-lobby__actions'>
        <Show
          when={roomId()}
          fallback={
            <>
              <p>Or make an ephemeral call:</p>
              <button type='button' class='call-lobby__cta' onClick={createRoom}>
                Start a call
              </button>
            </>
          }
        >
          <button
            type='button'
            class='call-lobby__cta'
            onClick={joinRoom}
            disabled={joining()}
          >
            {joining() ? 'Joining…' : 'Join call'}
          </button>
          <button
            type='button'
            class='call-lobby__secondary'
            onClick={shareLink}
          >
            {copied() ? 'Link copied' : 'Share invite link'}
          </button>
        </Show>
      </div>

      <Show when={roomId() && !invitedRoomId()}>
        {/* Clipboard write can fail silently — always show the link itself. */}
        <input
          class='call-lobby__link'
          type='text'
          readonly
          value={window.location.href}
          aria-label='Invite link'
          onFocus={(e) => e.currentTarget.select()}
        />
        <p class='call-lobby__hint'>
          Send the link to the person you want to call, then join.
        </p>
      </Show>
      <Show when={invitedRoomId() && !joining()}>
        <p class='call-lobby__hint'>You've been invited to a video call.</p>
      </Show>
      <Show when={joining()}>
        <p class='call-lobby__hint'>
          Allow camera and microphone access when prompted.
        </p>
      </Show>
      <Show when={callEnded() && !roomId()}>
        <p class='call-lobby__hint'>Call ended.</p>
      </Show>
      <Show when={error()}>
        <p class='call-lobby__error' role='alert'>
          {error()}
        </p>
      </Show>
    </div>
  );
}
