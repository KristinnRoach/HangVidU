// Guest call lobby: create a room-link call or join one via ?publicRoom=<id>.
// No account needed — signs in anonymously for the signaling token.
import { createSignal, createEffect, on, Show } from 'solid-js';

import { useP2PContext } from '@shared/p2p-context.js';
import { signInAsGuest } from '@auth';
import { t } from '@shared/i18n';
import Button from '../../../components/Button';
import TextField from '../../../components/TextField';
import {
  getAudioConstraints,
  getVideoConstraints,
} from '../media-constraints.js';
import { useCallHandshake } from '../call-handshake.js';

const hintClass = 'px-1 text-sm text-text-secondary';

function joinErrorMessage(err: unknown, kind: string | undefined): string {
  if (kind === 'room-full') return t('call.lobby.error.full');
  if (
    kind === 'local-stream' ||
    (err instanceof DOMException && err.name === 'NotAllowedError')
  ) {
    return t('call.lobby.error.media_blocked');
  }
  return t('call.lobby.error.generic');
}

// Room ids are crypto.randomUUID(); anything else in ?publicRoom= is a mangled
// or forged link — drop it instead of attempting a join that can't work.
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function publicRoomIdFromUrl(link = window.location.href): string | null {
  try {
    const url = new URL(link.trim());
    const raw = url.searchParams.get('publicRoom');
    return /^https?:$/.test(url.protocol) && raw && UUID_RE.test(raw)
      ? raw
      : null;
  } catch {
    return null;
  }
}

export function CallLobby() {
  const p2p = useP2PContext();
  const { joinRoomLink } = useCallHandshake();

  // Set when the visitor arrived via an invite link; cleared once that
  // call ends (the room link is single-use).
  const [invitedRoomId, setInvitedRoomId] = createSignal<string | null>(
    publicRoomIdFromUrl(),
  );

  const [link, setLink] = createSignal(
    invitedRoomId() ? window.location.href : '',
  );
  const roomId = () => publicRoomIdFromUrl(link());
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
          url.searchParams.delete('publicRoom');
          window.history.replaceState(null, '', url);
          setLink('');
          setInvitedRoomId(null);
          setCallEnded(true);
        }
      },
    ),
  );

  function createRoom() {
    const id = crypto.randomUUID();
    const url = new URL(window.location.href);
    url.searchParams.set('publicRoom', id);
    window.history.replaceState(null, '', url);
    setLink(url.href);
    setCallEnded(false);
    void copyLink();
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(link().trim());
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  async function joinRoom() {
    const id = roomId();
    if (!id || joining()) return;
    const url = new URL(window.location.href);
    url.searchParams.set('publicRoom', id);
    window.history.replaceState(null, '', url);
    setJoining(true);
    setCallEnded(false);
    setError(null);
    let streamPromise: Promise<MediaStream> | undefined;
    try {
      // iOS requires getUserMedia to start within the tap's transient user
      // activation — start it alongside the guest sign-in, not after it.
      streamPromise = navigator.mediaDevices.getUserMedia({
        video: getVideoConstraints(),
        audio: getAudioConstraints(),
      });
      const [uid, acquiredStream] = await Promise.all([
        signInAsGuest(),
        streamPromise,
      ]);
      await joinRoomLink(id, uid, acquiredStream);
    } catch (err) {
      // Sign-in or signaling can fail before p2p invokes getLocalStream and
      // assumes ownership of the tracks, possibly before capture resolves.
      void streamPromise?.then(
        (stream) => stream.getTracks().forEach((track) => track.stop()),
        () => {},
      );
      console.error('[CallLobby] Failed to join guest room:', err);
      setError(joinErrorMessage(err, p2p.errorKind()));
      // Failed joins can leave a watched room behind, hiding the lobby error.
      const state = p2p.state();
      if (
        (state === 'full' || state === 'error') &&
        p2p.room()?.roomId === id
      ) {
        void p2p.dispose().catch((error: unknown) => {
          console.warn('[CallLobby] Failed to dispose rejected room:', error);
        });
      }
      setJoining(false);
    }
  }

  return (
    <div class='flex w-full max-w-98 flex-col gap-4 mx-auto'>
      <div class='flex flex-wrap gap-4'>
        <Show
          when={link().trim()}
          fallback={
            <div class='flex w-full flex-col gap-4'>
              <p class='text-base'>{t('call.lobby.ephemeral_prompt')}</p>
              <Button variant='secondary' onClick={createRoom}>
                {t('call.lobby.start')}
              </Button>
            </div>
          }
        >
          <Button
            variant='primary'
            class='flex-1'
            onClick={joinRoom}
            loading={joining()}
            disabled={!roomId()}
          >
            {joining() ? t('call.lobby.joining') : t('call.lobby.join')}
          </Button>
          <Button
            variant='secondary'
            class='flex-1'
            onClick={copyLink}
            disabled={joining() || !roomId()}
          >
            {t('call.lobby.copy_link')}
          </Button>
        </Show>
      </div>

      <Show when={copied() && roomId()}>
        <span class={hintClass} role='status'>
          {t('call.lobby.link_copied')}
        </span>
      </Show>

      <TextField
        label={t('call.lobby.invite_label')}
        hideLabel
        value={link()}
        placeholder={t('call.lobby.paste_link')}
        disabled={joining()}
        error={
          link().trim() && !roomId() ? t('call.lobby.error.link') : undefined
        }
        onChange={(value) => {
          setLink(value);
          setInvitedRoomId(null);
          setCopied(false);
          setError(null);
        }}
        onFocus={(e) => e.currentTarget.select()}
      />
      <Show when={roomId() && !invitedRoomId()}>
        <p class={hintClass}>{t('call.lobby.send_link_hint')}</p>
      </Show>
      <Show when={invitedRoomId() && !joining()}>
        <p class={hintClass}>{t('call.lobby.invited')}</p>
      </Show>
      <Show when={joining()}>
        <p class={hintClass}>{t('call.lobby.permission_hint')}</p>
      </Show>
      <Show when={callEnded() && !roomId()}>
        <p class={hintClass}>{t('call.lobby.ended')}</p>
      </Show>
      <Show when={error()}>
        <p class='text-sm text-danger' role='alert'>
          {error()}
        </p>
      </Show>
    </div>
  );
}
