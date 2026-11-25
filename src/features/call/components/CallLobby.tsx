import { createSignal, createEffect, on, onCleanup, Show } from 'solid-js';

import { useP2PContext } from '@shared/p2p-context.js';
import { signInAsGuest } from '@auth';
import { t } from '@shared/i18n';
import Button from '@components/Button';
import { showToast } from '@components/toast';
import Dialog from '@components/dialogs/Dialog';
import TextField from '@components/TextField';
import {
  getAudioConstraints,
  getVideoConstraints,
} from '../media-constraints.js';
import { useCallHandshake } from '../call-handshake.js';
import { publicRoomIdFromUrl } from '../room-links';

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
      showToast(t('call.link_copied'), { tone: 'success' });
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
  const roomId = () => publicRoomIdFromUrl(link());
  const isJoiningInvite = () => Boolean(link().trim());
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

  function clearRoomLink() {
    const url = new URL(window.location.href);
    if (!url.searchParams.has('publicRoom')) return false;
    url.searchParams.delete('publicRoom');
    window.history.replaceState(window.history.state, '', url);
    return true;
  }

  function dismissInvite() {
    if (joining()) return;
    clearRoomLink();
    setInvite(null);
    setError(undefined);
  }

  createEffect(
    on(p2p.state, (state, previous) => {
      if (state !== 'idle' || previous !== 'joined') return;

      if (invite() || !clearRoomLink()) return;
      setLink('');
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
      setInvite(null);
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

  function ConnectionFeedback() {
    return (
      <>
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
      </>
    );
  }

  return (
    <Show
      when={!invite()}
      fallback={
        // The portal keeps URL invites available when the public home is hidden.
        <Dialog
          open
          title={t('call.lobby.invited')}
          hideCloseButton
          onOpenChange={(open) => {
            if (!open) dismissInvite();
          }}
        >
          <Button
            variant='success'
            loading={joining()}
            disabled={p2p.state() !== 'idle'}
            onClick={() => {
              const id = invite();
              if (id && !joining() && p2p.state() === 'idle') void connect(id);
            }}
          >
            {joining() ? t('call.lobby.joining') : t('call.lobby.join')}
          </Button>
          <Button variant='ghost' disabled={joining()} onClick={dismissInvite}>
            {t('shared.dismiss')}
          </Button>
          <ConnectionFeedback />
        </Dialog>
      }
    >
      <form
        class='mx-auto flex w-full max-w-98 flex-col gap-2'
        onSubmit={(event) => {
          event.preventDefault();
          if (joining() || invalidLink()) return;
          const id = roomId();
          const started = connect(id);
          if (!id) void copyStartedInvite(started);
        }}
      >
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
        <ConnectionFeedback />
      </form>
    </Show>
  );
}
