import { createSignal, createEffect, on, onCleanup, Show } from 'solid-js';

import { useP2PContext } from '@shared/p2p-context.js';
import { signInAsGuest } from '@auth';
import { t } from '@shared/i18n';
import Button from '@components/Button';
import { showSuccessToast } from '@components/base-legacy/toast.js';
import TextField from '@components/TextField';
import {
  getAudioConstraints,
  getVideoConstraints,
} from '../media-constraints.js';
import { useCallHandshake } from '../call-handshake.js';

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

// Room-link calls use UUIDs generated on the client.
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function publicRoomIdFromUrl(link: string): string | null {
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

async function copyStartedInvite(started: Promise<string | undefined>) {
  const clipboard = navigator.clipboard;
  if (!clipboard) return;

  try {
    if (clipboard.write && typeof ClipboardItem !== 'undefined') {
      // Safari needs write() during the submit gesture. Provide the link only
      // once the call starts, so a failed start leaves the clipboard alone.
      const text = started.then((url) => {
        if (!url || window.location.href !== url) {
          throw new Error('Guest call is no longer active');
        }
        return new Blob([url], { type: 'text/plain' });
      });
      // Some browsers reject the write before reading its payload.
      void text.catch(() => {});
      await clipboard.write([new ClipboardItem({ 'text/plain': text })]);
    } else {
      const url = await started;
      if (!url || window.location.href !== url) return;
      await clipboard.writeText(url);
    }

    if (window.location.href === (await started)) {
      showSuccessToast(t('call.link_copied'));
    }
  } catch {
    // The call toolbar still offers a manual copy action.
  }
}

export function CallLobby() {
  const p2p = useP2PContext();
  const { joinRoomLink } = useCallHandshake();

  const [invite, setInvite] = createSignal(
    publicRoomIdFromUrl(window.location.href),
  );
  const [link, setLink] = createSignal('');
  const [joining, setJoining] = createSignal(false);
  const [callEnded, setCallEnded] = createSignal(false);
  const [error, setError] = createSignal<string>();
  const roomId = () => invite() ?? publicRoomIdFromUrl(link());
  const isJoiningInvite = () => Boolean(invite() || link().trim());
  const invalidLink = () => isJoiningInvite() && !roomId();

  let pendingCapture: Promise<MediaStream> | undefined;
  function releasePendingCapture() {
    void pendingCapture?.then(
      (stream) => stream.getTracks().forEach((track) => track.stop()),
      () => {},
    );
    pendingCapture = undefined;
  }
  onCleanup(releasePendingCapture);

  createEffect(
    on(p2p.state, (state, previous) => {
      if (state !== 'idle' || previous !== 'joined') return;

      const url = new URL(window.location.href);
      if (!url.searchParams.has('publicRoom')) return;
      url.searchParams.delete('publicRoom');
      window.history.replaceState(null, '', url);
      setLink('');
      setInvite(null);
      setCallEnded(true);
    }),
  );

  async function connect(invitedRoomId: string | null) {
    const id = invitedRoomId ?? crypto.randomUUID();
    setJoining(true);
    setCallEnded(false);
    setError(undefined);

    const previousUrl = window.location.href;
    const url = new URL(previousUrl);
    url.searchParams.set('publicRoom', id);
    try {
      // iOS needs capture to start during the tap, before awaiting sign-in.
      const capture = navigator.mediaDevices.getUserMedia({
        video: getVideoConstraints(),
        audio: getAudioConstraints(),
      });
      pendingCapture = capture;
      const [uid, stream] = await Promise.all([signInAsGuest(), capture]);
      if (pendingCapture !== capture) return;

      window.history.replaceState(null, '', url);
      // The handshake owns the stream from this point, including failed joins.
      pendingCapture = undefined;
      await joinRoomLink(id, uid, stream);
      return url.href;
    } catch (err) {
      releasePendingCapture();
      console.error('[CallLobby] Failed to join guest room:', err);
      const message = joinErrorMessage(err, p2p.errorKind());

      if (window.location.href === url.href && previousUrl !== url.href) {
        window.history.replaceState(null, '', previousUrl);
      }
      // Return to the lobby if the rejected room is still being watched.
      const state = p2p.state();
      if (
        (state === 'full' || state === 'error') &&
        p2p.room()?.roomId === id
      ) {
        await p2p.dispose().catch((error: unknown) => {
          console.warn('[CallLobby] Failed to dispose rejected room:', error);
        });
      }
      setError(message);
    } finally {
      setJoining(false);
    }
  }

  return (
    <form
      class='relative mx-auto flex w-full max-w-98 flex-col gap-2'
      onSubmit={(event) => {
        event.preventDefault();
        if (joining() || invalidLink()) return;
        const id = roomId();
        const started = connect(id);
        if (!id) void copyStartedInvite(started);
      }}
    >
      <Show when={invite()}>
        <p class='text-sm text-text-secondary'>{t('call.lobby.invited')}</p>
      </Show>
      <Button
        type='submit'
        variant={isJoiningInvite() ? 'success' : 'primary'}
        loading={joining()}
        disabled={invalidLink()}
      >
        {joining()
          ? t('call.lobby.joining')
          : isJoiningInvite()
            ? t('call.lobby.join')
            : t('call.lobby.start')}
      </Button>
      <Show when={!invite()}>
        <TextField
          label={t('call.lobby.invite_label')}
          hideLabel
          value={link()}
          placeholder={t('call.lobby.paste_link')}
          disabled={joining()}
          error={invalidLink() ? t('call.lobby.error.link') : undefined}
          onChange={(value) => {
            setLink(value);
            setError(undefined);
            setCallEnded(false);
          }}
        />
      </Show>
      <div role='status' class='text-sm text-text-secondary empty:absolute'>
        {joining()
          ? t('call.lobby.permission_hint')
          : callEnded()
            ? t('call.lobby.ended')
            : undefined}
      </div>
      <Show when={error()}>
        <p class='text-sm text-danger' role='alert'>
          {error()}
        </p>
      </Show>
    </form>
  );
}
