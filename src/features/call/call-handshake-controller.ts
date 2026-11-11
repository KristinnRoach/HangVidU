import {
  cleanupCallService,
  initCallService,
  getCallService,
} from './call-service.js';
import { getLoggedInUserId, getLoggedInUserToken } from '@auth';
import {
  captureMessage,
  flush,
  getIsolationScope,
  logger,
  metrics,
  setTag,
} from '@sentry/browser';
import type { SolidP2PRoom } from '@kidlib/p2p/solid';
import {
  P2P_ERROR_CODES,
  type CreateRoomSignalingOptions,
  type IceServersProvider,
  type P2PRoomSignaling,
} from '@kidlib/p2p';
import type { MailboxInvite } from '../../../shared/user-mailbox/protocol';
import { publish } from '@shared/events/index.js';
import {
  getAudioConstraints,
  getVideoConstraints,
} from './media-constraints.js';
import { createCallLocalTrackSlots } from './call-media.js';
import type {
  CallHandshakeState,
  CallReconnectStatus,
  OutgoingCall,
  StartCallDetails,
} from './call-types.js';
import { resolveDirectConversationId } from '../../stores/conversation/conversations-client.js';
import {
  cacheContactConversationId,
  getContactById,
} from '../../stores/contacts-store.js';
import { CALLING_TTL_MS } from '../../../shared/constants';
import { getHangViduApiBaseUrl } from '../../infra/hangvidu-api-url';
import { t } from '@shared/i18n';

const DATA_URL = getHangViduApiBaseUrl();
const TURN_FETCH_TIMEOUT_MS = 4_000;

const provideIceServers: IceServersProvider = async ({ signal, reason }) => {
  let responseStatus: number | undefined;
  try {
    const token = await getLoggedInUserToken();
    const response = await fetch(`${DATA_URL}/turn-credentials`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.any([
        signal,
        AbortSignal.timeout(TURN_FETCH_TIMEOUT_MS),
      ]),
    });
    responseStatus = response.status;
    if (!response.ok) throw new Error('TURN credential request failed');
    const credentials = await response.json();
    if (
      !Array.isArray(credentials?.iceServers) ||
      credentials.iceServers.length === 0 ||
      !credentials.iceServers.every(
        (server: RTCIceServer) =>
          server &&
          ((typeof server.urls === 'string' && server.urls.trim().length > 0) ||
            (Array.isArray(server.urls) &&
              server.urls.length > 0 &&
              server.urls.every(
                (url) => typeof url === 'string' && url.trim().length > 0,
              ))) &&
          (server.username === undefined ||
            typeof server.username === 'string') &&
          (server.credential === undefined ||
            typeof server.credential === 'string'),
      ) ||
      (credentials.expiresAt !== undefined &&
        (!Number.isFinite(credentials.expiresAt) ||
          credentials.expiresAt <= Date.now()))
    ) {
      throw new TypeError('TURN credential response was invalid');
    }
    return credentials;
  } catch (error) {
    if (signal.aborted) throw error;
    console.warn(
      {
        reason,
        responseStatus,
        errorName:
          error &&
          typeof error === 'object' &&
          'name' in error &&
          typeof error.name === 'string'
            ? error.name
            : 'UnknownError',
      },
      '[call] TURN credentials unavailable; using STUN fallback',
    );
    // ponytail: STUN remains fixed for this room; retry TURN only if credential outages prove common.
    return {
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    };
  }
};

/** Lazy room-signaling factory passed to `p2p.join` — see `src/realtime/signaling`. */
type CreateRoomSignaling = (
  options: CreateRoomSignalingOptions,
) => P2PRoomSignaling | Promise<P2PRoomSignaling>;

type CallHandshakeControllerOptions = {
  p2p: SolidP2PRoom;
  createSignaling: CreateRoomSignaling;
  getCallerName: () => string;
  onStateChange: (state: CallHandshakeState) => void;
  onCalleeBusy: (busy: boolean) => void;
  onReconnectStatus: (status: CallReconnectStatus) => void;
};

/**
 * Grace window after the remote peer drops silently (backgrounded app, network
 * flap) — reported by @kidlib/p2p as a `dropped` departure. The peer gets this
 * long to re-join before teardown. An explicit `left` departure skips it.
 */
const RECONNECT_GRACE_MS = 10_000;
/** How long "Could not reconnect" is shown before the call finally exits. */
const RECONNECT_FAILED_DISPLAY_MS = 2_500;
/**
 * How long a peer session may sit un-`connected` before @kidlib/p2p fails it.
 * Covers STUN + TURN-relay setup with room to spare; without it a blocked
 * connection sits on "Waiting for the other person to connect…" forever.
 */
const CONNECTED_TIMEOUT_MS = 20_000;
/** Allow signaling and TURN setup to recover after waking or changing networks. */
const START_TIMEOUT_MS = 20_000;
/** How long "Could not connect" is shown before the call exits to the lobby. */
const CONNECT_FAILED_DISPLAY_MS = 4_000;

export type IncomingCallNotificationDetails = {
  callInviteId: string;
  roomId: string;
  callerId: string;
  callerName?: string;
  audioOnly?: boolean;
  startedAt?: number;
};

type EnterRoomOptions = {
  memberCapacity?: number;
  autoExitOnEmpty?: boolean;
  signal?: AbortSignal;
};

type ActiveOutgoingCall = OutgoingCall & {
  connectedAt?: number;
  disconnectedAt?: number;
};

/** Why a call was torn down — logged so field reports are unambiguous. */
type HangUpReason =
  | 'user'
  | 'peer-left'
  | 'reconnect-timeout'
  | 'connect-timeout'
  | 'enter-room-error'
  | 'accept-error';

type CallFailureKind =
  | 'room-resolve-failed'
  | 'caller-media-failed'
  | 'invite-send-failed'
  | 'enter-room-failed'
  | 'accept-failed'
  | 'connect-failed'
  | 'ice-reconnect-failed'
  | 'reconnect-timeout';

// Startup failures of a member session. Teardown (aborted / closed before
// start) is not a connection failure.
const CONNECT_FAILURE_CODES: ReadonlySet<string> = new Set(
  Object.values(P2P_ERROR_CODES).filter(
    (code) =>
      code !== P2P_ERROR_CODES.ABORTED && code !== P2P_ERROR_CODES.START_CLOSED,
  ),
);

/**
 * Terminal call failures become Sentry issues, not just warn logs, so they
 * alert and count per release/user. One issue per kind (and sub-kind, e.g.
 * the p2p error code); the console.warn next to each call still feeds
 * the same detail to Sentry logs and breadcrumbs.
 */
function reportCallFailure(
  kind: CallFailureKind,
  detail: Record<string, unknown>,
  subKind?: string,
): void {
  captureMessage(`[call] ${kind}`, {
    level: 'warning',
    fingerprint: ['call-failure', kind, ...(subKind ? [subKind] : [])],
    tags: {
      'call.failure': kind,
      // Explicit, so a report captured after hangUp (or a newer join) still
      // names the failing room; event tags win over the scope's call.room.
      ...(typeof detail.roomId === 'string' && { 'call.room': detail.roomId }),
      ...(subKind && { 'call.failure.sub': subKind }),
    },
    extra: detail,
  });
}

/** Resolves within 500ms so a stalled query can't hold up the failure alert. */
async function getMediaPermissions(): Promise<Record<string, string>> {
  const query = async (name: string) => {
    try {
      const status = await navigator.permissions.query({
        name: name as PermissionName,
      });
      return status.state;
    } catch {
      return 'unsupported';
    }
  };
  const permissions = Promise.all([query('camera'), query('microphone')]).then(
    ([camera, microphone]) => ({ camera, microphone }),
  );
  const timeout = new Promise<Record<string, string>>((resolve) =>
    setTimeout(
      () => resolve({ camera: 'timeout', microphone: 'timeout' }),
      500,
    ),
  );
  return Promise.race([permissions, timeout]);
}

/**
 * A failed call attempt (before or while joining) as a Sentry issue, grouped
 * by error name. Awaited before the reload in alertCallStartFailed, which
 * would otherwise drop the buffered console log that was the only trace.
 * Resolves with the reported permission state.
 */
async function reportCallStartFailure(
  kind: CallFailureKind,
  err: unknown,
  detail: Record<string, unknown> = {},
): Promise<Record<string, string>> {
  const errorName = err instanceof Error ? err.name : 'unknown';
  const mediaRejectedAfterMs = (err as { mediaRejectedAfterMs?: number })
    ?.mediaRejectedAfterMs;
  const permissions = await getMediaPermissions();
  reportCallFailure(
    kind,
    {
      errorName,
      message: err instanceof Error ? err.message : String(err),
      ...detail,
      standalone: globalThis.matchMedia?.('(display-mode: standalone)').matches,
      visibilityState: globalThis.document?.visibilityState,
      permissions,
      msSinceLoad: Math.round(performance.now()),
      ...(mediaRejectedAfterMs != null && { mediaRejectedAfterMs }),
    },
    errorName,
  );
  return permissions;
}

/**
 * Reloading never clears a NotAllowedError (field reports: only fully
 * closing the PWA or browser does), so say what will instead.
 */
function mediaFailureMessage(
  err: unknown,
  permissions: Record<string, string>,
  audioOnly: boolean,
): string {
  if (!(err instanceof Error) || err.name !== 'NotAllowedError') {
    return t('call.media_error.capture.generic');
  }
  const states = audioOnly
    ? [permissions.microphone]
    : [permissions.microphone, permissions.camera];
  if (states.includes('denied')) return t('call.media_error.capture.blocked');
  // 'unsupported' or 'timeout' could hide a denial, so cover both fixes.
  return states.every((state) => state === 'prompt' || state === 'granted')
    ? t('call.media_error.capture.refused')
    : t('call.media_error.capture.unknown');
}

/**
 * Tags only reach error events; logs and metrics read scope attributes.
 * Set both so every signal from a call is searchable by room.
 */
function setCallRoomContext(roomId: string | undefined): void {
  setTag('call.room', roomId);
  const scope = getIsolationScope();
  if (roomId) scope.setAttribute('call.room', roomId);
  else scope.removeAttribute('call.room');
}

export class CallHandshakeController {
  private readonly p2p: SolidP2PRoom;
  private readonly createSignaling: CreateRoomSignaling;
  private readonly getCallerName: () => string;
  private readonly onStateChange: (state: CallHandshakeState) => void;
  private readonly onCalleeBusy: (busy: boolean) => void;
  private readonly onReconnectStatus: (status: CallReconnectStatus) => void;

  private _handshakeState: CallHandshakeState = null;
  private incomingAcceptanceAbortController: AbortController | undefined;
  // The join that last set the Sentry room context (its abort signal, or a
  // fresh token when unsignalled). Room ids repeat per conversation, so
  // ownership can't be keyed by room id.
  private roomContextOwner: object | undefined;
  private incomingCallTimeoutId: ReturnType<typeof setTimeout> | undefined;
  private outgoingCallTimeoutId: ReturnType<typeof setTimeout> | undefined;
  private calleeBusyResetTimeoutId: ReturnType<typeof setTimeout> | undefined;
  private reconnectTimeoutId: ReturnType<typeof setTimeout> | undefined;
  private reconnectFailedTimeoutId: ReturnType<typeof setTimeout> | undefined;
  private connectFailedTimeoutId: ReturnType<typeof setTimeout> | undefined;
  private unsubCalleeResponse: (() => void) | undefined;
  private unsubscribeIncomingCall: (() => void) | undefined;
  private pendingOutgoingLocalStream: MediaStream | undefined;
  private activeOutgoingCall: ActiveOutgoingCall | undefined;
  private outgoingMediaAttempt = 0;
  private lastBoundUID: string | undefined;

  constructor({
    p2p,
    createSignaling,
    getCallerName,
    onStateChange,
    onCalleeBusy,
    onReconnectStatus,
  }: CallHandshakeControllerOptions) {
    this.p2p = p2p;
    this.createSignaling = createSignaling;
    this.getCallerName = getCallerName;
    this.onStateChange = onStateChange;
    this.onCalleeBusy = onCalleeBusy;
    this.onReconnectStatus = onReconnectStatus;
  }

  private setHandshakeState(state: CallHandshakeState): void {
    if (this.incomingCallTimeoutId != null) {
      clearTimeout(this.incomingCallTimeoutId);
      this.incomingCallTimeoutId = undefined;
    }
    this._handshakeState = state;
    this.onStateChange(state);
  }

  private initService(localUID: string) {
    return initCallService({
      localUID,
      baseUrl: DATA_URL,
      getToken: getLoggedInUserToken,
    });
  }

  // TODO: Proper in-app notification with i18n strings - Temporarily keeping as is for debugging in prod, 040826
  private alertCallStartFailed(msg: string): void {
    if (typeof window !== 'undefined') {
      // window.alert(t('call.start_failed_reload'));
      window.alert(msg);
      // keepalive isn't guaranteed (large payloads), so give the failure
      // report a bounded chance to send before the reload drops it.
      void flush(2_000).finally(() => window.location.reload());
    }
  }

  /**
   * (Re)attach the incoming-call listener for the currently logged-in user.
   * Driven reactively by the provider on auth changes, so it must be safe to
   * call repeatedly: it tears down any prior subscription first. Callers gate
   * on a logged-in user, but we re-read the uid defensively.
   */
  init(): void {
    // Runs on every auth change incl. login, so it must not tear down an active
    // call (p2p.dispose here black-screens a call that's mid-join). Only a switch
    // to a *different* user does full teardown; full cleanup() is otherwise
    // reserved for logout/unmount.
    const localUID = getLoggedInUserId();
    if (this.lastBoundUID && localUID && this.lastBoundUID !== localUID) {
      this.cleanup();
    }
    this.lastBoundUID = localUID ?? undefined;

    this.unsubscribeIncomingCall?.();
    this.unsubscribeIncomingCall = undefined;

    if (!localUID) return;

    const callService = this.initService(localUID);

    this.unsubscribeIncomingCall = callService.onIncomingCall((event) => {
      if (event.type === 'cancel' || event.type === 'handled') {
        const state = this._handshakeState;
        if (state && state.call.callInviteId === event.callInviteId) {
          if (state.direction === 'incoming') {
            this.setHandshakeState(null);
          } else if (
            state.direction === 'accepting' &&
            event.type === 'cancel'
          ) {
            // `handled` is echoed to the responding callee too; only a caller
            // cancellation invalidates an acceptance already in progress.
            this.incomingAcceptanceAbortController?.abort(
              new DOMException('Call invite cancelled', 'AbortError'),
            );
            this.setHandshakeState(null);
          }
        }
        return;
      }
      this.handleIncomingCallInvite(event.invite, callService);
    });
  }

  showIncomingCallFromNotification(
    details: IncomingCallNotificationDetails,
  ): void {
    const localUID = getLoggedInUserId();
    if (
      !localUID ||
      !details.callInviteId ||
      !details.roomId ||
      !details.callerId
    )
      return;
    const startedAt = details.startedAt ?? Date.now();
    const call: MailboxInvite = {
      callInviteId: details.callInviteId,
      roomId: details.roomId,
      callerId: details.callerId,
      calleeId: localUID,
      callerName: details.callerName,
      audioOnly: details.audioOnly,
      startedAt,
      expiresAt: startedAt + CALLING_TTL_MS,
    };
    if (call.expiresAt != null && call.expiresAt <= Date.now()) return;
    this.handleIncomingCallInvite(call, this.initService(localUID));
  }

  private handleIncomingCallInvite(
    call: MailboxInvite,
    callService: NonNullable<ReturnType<typeof getCallService>>,
  ): void {
    if (this.isExpired(call)) return;
    if (this.isBusyForIncomingCall(call)) {
      callService
        .respondToIncomingCallInvite({
          callInviteId: call.callInviteId,
          roomId: call.roomId,
          callerId: call.callerId,
          responseType: 'busy',
        })
        .catch((err) =>
          console.error('Error responding busy to incoming call:', err),
        );
      return;
    }
    this.setHandshakeState({ direction: 'incoming', call });
    if (call.expiresAt != null) {
      this.incomingCallTimeoutId = setTimeout(
        () => {
          this.incomingCallTimeoutId = undefined;
          const state = this._handshakeState;
          if (
            state?.direction === 'incoming' &&
            state.call.callInviteId === call.callInviteId &&
            this.isExpired(state.call)
          ) {
            this.setHandshakeState(null);
          }
        },
        Math.max(0, call.expiresAt - Date.now()),
      );
    }
    if (import.meta.env.DEV) {
      console.debug('Received incoming call invite:', { call });
    }
  }

  private isBusyForIncomingCall(call: MailboxInvite): boolean {
    const state = this._handshakeState;
    if (state && state.direction === 'incoming') {
      return state.call.roomId !== call.roomId;
    }
    return state !== null || this.p2p.state() !== 'idle';
  }

  private isExpired(call: MailboxInvite): boolean {
    return call.expiresAt != null && call.expiresAt <= Date.now();
  }

  startCall = async (details: StartCallDetails): Promise<void> => {
    const localUID = getLoggedInUserId();
    if (!localUID) {
      console.warn('Cannot start outgoing call before login is ready');
      return;
    }
    const svc = this.initService(localUID);
    this.stopPendingOutgoingLocalStream();
    const mediaAttempt = ++this.outgoingMediaAttempt;

    const { calleeId, calleeName, audioOnly } = details;
    const callerName = this.getCallerName();

    // iOS requires getUserMedia to start within the tap's transient user
    // activation — kick it off before any network awaits or it throws
    // NotAllowedError whenever the roomId resolve is slow.
    const localStreamPromise = this.getCallLocalStream(audioOnly);
    const stopStreamWhenReady = () =>
      localStreamPromise.then(
        (stream) => this.stopMediaStream(stream),
        () => {},
      );

    let roomId: string;
    try {
      roomId = await this.resolveCallRoomId(calleeId);
    } catch (err) {
      console.error(
        '[CallHandshake] Cannot start call: failed to resolve conversationId:',
        err,
      );
      void stopStreamWhenReady();
      await reportCallStartFailure('room-resolve-failed', err);
      this.alertCallStartFailed(
        'Error: Failed to resolve conversationId. Try again.',
      );
      return;
    }
    if (mediaAttempt !== this.outgoingMediaAttempt) {
      void stopStreamWhenReady();
      return;
    }

    const nextOutgoingCall: OutgoingCall = {
      callInviteId: crypto.randomUUID(),
      calleeId,
      calleeName,
      callerId: localUID,
      callerName,
      roomId,
      audioOnly,
      startedAt: Date.now(),
    };

    let localStream: MediaStream;
    try {
      localStream = await localStreamPromise;
      if (mediaAttempt !== this.outgoingMediaAttempt) {
        this.stopMediaStream(localStream);
        return;
      }
      this.pendingOutgoingLocalStream = localStream;
    } catch (err) {
      console.error('Error getting caller media before starting call:', err);
      const permissions = await reportCallStartFailure(
        'caller-media-failed',
        err,
        { audioOnly },
      );
      window.alert(mediaFailureMessage(err, permissions, audioOnly));
      return;
    }

    this.setHandshakeState({ direction: 'outgoing', call: nextOutgoingCall });
    this.onCalleeBusy(false);
    this.scheduleOutgoingCallTimeout(svc, nextOutgoingCall);

    let responseReceived = false;
    this.unsubCalleeResponse?.();
    this.unsubCalleeResponse = svc.onCalleeResponse(async (response) => {
      if (!response || response.callInviteId !== nextOutgoingCall.callInviteId)
        return;
      responseReceived = true;
      this.clearOutgoingCallTracking();
      try {
        if (response.responseType === 'accepted') {
          if (this.pendingOutgoingLocalStream === localStream) {
            this.pendingOutgoingLocalStream = undefined;
          }
          this.activeOutgoingCall = { ...nextOutgoingCall };
          await this.enterRoom(
            response.roomId,
            localUID,
            nextOutgoingCall.audioOnly,
            () => Promise.resolve(localStream),
          );
        } else if (response.responseType === 'busy') {
          publish('evt:call:invite:busy', nextOutgoingCall);
          this.stopMediaStream(localStream);
          if (this.pendingOutgoingLocalStream === localStream) {
            this.pendingOutgoingLocalStream = undefined;
          }
          this.onCalleeBusy(true);
          this.clearCalleeBusyResetTimeout();
          this.calleeBusyResetTimeoutId = setTimeout(() => {
            this.calleeBusyResetTimeoutId = undefined;
            this.onCalleeBusy(false);
          }, 2_500);
        } else {
          publish('evt:call:invite:declined', nextOutgoingCall);
          this.stopMediaStream(localStream);
          if (this.pendingOutgoingLocalStream === localStream) {
            this.pendingOutgoingLocalStream = undefined;
          }
        }
      } catch (err) {
        console.error('Error entering room on callee accept:', err);
        void reportCallStartFailure('enter-room-failed', err, {
          roomId: response.roomId,
        });
        this.stopMediaStream(localStream);
        this.hangUp('enter-room-error');
      } finally {
        svc
          .ackCallResponse(response.roomId, response.callInviteId)
          .catch((err) =>
            console.warn(
              '[CallHandshake] Failed to acknowledge call response:',
              err,
            ),
          );
        this.setHandshakeState(null);
      }
    });

    try {
      await svc.sendOutgoingCallInvite({
        callInviteId: nextOutgoingCall.callInviteId,
        roomId,
        calleeId,
        callerName,
        audioOnly,
      });
    } catch (err) {
      this.clearOutgoingCallTracking();
      this.stopPendingOutgoingLocalStream();
      this.setHandshakeState(null);
      console.error('Error sending outgoing call invite:', err);
      await reportCallStartFailure('invite-send-failed', err, { roomId });
      this.alertCallStartFailed('Error sending call invite. Try again.');
      return;
    }

    const state = this._handshakeState;
    if (
      state &&
      !responseReceived &&
      state.direction === 'outgoing' &&
      state.call.callInviteId === nextOutgoingCall.callInviteId
    ) {
      publish('evt:call:invite:sent', nextOutgoingCall);
    }
    if (import.meta.env.DEV) {
      console.debug('Initiated outgoing call invite, command details:', {
        details,
      });
    }
  };

  /**
   * The call room handle is the opaque conversationId from the D1 registry,
   * so every interaction between the same participants shares one id.
   * The data worker authorizes call mailbox writes against that conversation's
   * D1 membership, so there is no valid random-room fallback.
   *
   * Normally already on the contact record (minted at invite-accept time);
   * resolveDirectConversationId() is only a fallback for contacts saved
   * before that existed.
   */
  private async resolveCallRoomId(calleeId: string): Promise<string> {
    const storedConversationId = getContactById(calleeId)?.conversationId;
    if (storedConversationId) return storedConversationId;
    const conversationId = await resolveDirectConversationId(calleeId);
    void cacheContactConversationId(calleeId, conversationId);
    return conversationId;
  }

  private async enterRoom(
    roomId: string,
    localUID: string,
    audioOnly = false,
    getLocalStream?: () => Promise<MediaStream>,
    {
      memberCapacity = 2,
      autoExitOnEmpty = true,
      signal,
    }: EnterRoomOptions = {},
  ) {
    const localStream = await (
      getLocalStream ?? (() => this.getCallLocalStream(audioOnly, signal))
    )();
    if (signal?.aborted) {
      this.stopMediaStream(localStream);
      throw signal.reason;
    }
    this.resetReconnectState();
    // Searchable on every event/log/metric until the call ends.
    this.roomContextOwner = signal ?? {};
    setCallRoomContext(roomId);
    // Starts after media acquisition: the caller's media is acquired before
    // ringing, so this keeps both sides measuring connection setup only.
    const joinStartedAt = Date.now();
    let connectRecorded = false;
    let room;
    try {
      room = await this.p2p.join({
        roomId,
        peerId: localUID,
        createSignaling: this.createSignaling,
        // Keep room ownership/cleanup while making the acquired tracks available
        // when the reserved publication slots are declared before negotiation.
        getLocalStream: () => Promise.resolve(localStream),
        localTrackSlots: createCallLocalTrackSlots(localStream),
        presenceData: {
          micOn: localStream
            .getAudioTracks()
            .some((track) => track.readyState === 'live' && track.enabled),
          cameraOn: localStream
            .getVideoTracks()
            .some((track) => track.readyState === 'live' && track.enabled),
        },
        memberCapacity,
        dataChannel: true,
        iceServersProvider: provideIceServers,
        iceRecovery: {},
        startTimeoutMs: START_TIMEOUT_MS,
        connectedTimeoutMs: CONNECTED_TIMEOUT_MS,
        signal,
        onError: ({ error }) => this.handleRoomError(error, roomId),
        onIceReconnecting: ({ attempt, maxAttempts, reason, nextDelayMs }) => {
          metrics.count('call.ice_reconnect_attempt', 1);
          console.warn(
            {
              roomId,
              attempt,
              maxAttempts,
              reason,
              nextDelayMs,
            },
            '[call] media connection interrupted; recovering',
          );
        },
        onIceReconnected: ({ attempt, durationMs }) => {
          metrics.count('call.ice_reconnected', 1);
          logger.info('[call] media connection recovered', {
            roomId,
            attempt,
            durationMs,
          });
          console.log('[call] media connection recovered', {
            roomId,
            attempt,
            durationMs,
          });
        },
        onIceReconnectFailed: ({ attempts, reason, error }) => {
          const detail = {
            roomId,
            attempts,
            reason,
            message: error instanceof Error ? error.message : String(error),
          };
          console.warn(detail, '[call] media connection recovery failed');
          reportCallFailure('ice-reconnect-failed', detail, String(reason));
        },
        onMemberJoined: () => {
          // A (re)join cancels any in-progress reconnect grace; the peer's back.
          if (autoExitOnEmpty) this.cancelReconnectGrace();
        },
        onDataChannelOpen: () => {
          // Per join, so callee setup counts too (it has no outgoing call).
          if (!connectRecorded) {
            connectRecorded = true;
            metrics.distribution(
              'call.time_to_connected',
              Date.now() - joinStartedAt,
              { unit: 'millisecond' },
            );
          }
          const call = this.activeOutgoingCall;
          if (!call || call.roomId !== roomId) return;
          call.connectedAt ??= Date.now();
          call.disconnectedAt = undefined;
        },
        onAlone: (detail) => {
          if (import.meta.env.DEV) console.debug('Room is alone:', { detail });
          if (!autoExitOnEmpty) return;
          if (this.activeOutgoingCall?.roomId === roomId) {
            this.activeOutgoingCall.disconnectedAt = Date.now();
          }
          // `left` = every departure that emptied the room was an explicit
          // signaling leave (intentional hangup) → exit now. `dropped` = a
          // silent drop → give the peer a grace window to re-join first.
          if (detail.reason === 'left') this.hangUp('peer-left');
          else this.startReconnectGrace();
        },
      });
      if (!room)
        throw this.p2p.error() ?? new Error('Room join returned no room');
    } catch (error) {
      // Early join failures can happen before p2p invokes getLocalStream and
      // assumes ownership, so eagerly acquired media is still ours to release.
      this.stopMediaStream(localStream);
      throw error;
    }

    if (import.meta.env.DEV)
      console.debug(
        `Active room: ${room.roomId}, members: ${room.members.join(', ')}`,
      );

    return room;
  }

  private async getCallLocalStream(
    audioOnly: boolean,
    signal?: AbortSignal,
  ): Promise<MediaStream> {
    const startedAt = performance.now();
    const streamPromise = navigator.mediaDevices.getUserMedia({
      video: audioOnly ? false : getVideoConstraints(),
      audio: getAudioConstraints(),
    });
    // Reported with the failure: a near-instant rejection means no permission
    // prompt was shown. A side branch, registered first, so it runs before
    // any consumer and adds no tick to the stream's own chain.
    streamPromise.catch((err: unknown) => {
      if (err instanceof Error) {
        Object.assign(err, {
          mediaRejectedAfterMs: Math.round(performance.now() - startedAt),
        });
      }
    });
    if (!signal) return streamPromise;

    const abortPromise = new Promise<never>((_, reject) => {
      signal.addEventListener(
        'abort',
        () =>
          reject(signal.reason ?? new DOMException('Aborted', 'AbortError')),
        { once: true },
      );
    });
    void streamPromise.then(
      (stream) => {
        if (signal.aborted) this.stopMediaStream(stream);
      },
      () => {},
    );
    return Promise.race([streamPromise, abortPromise]);
  }

  private clearRoomContext(): void {
    this.roomContextOwner = undefined;
    setCallRoomContext(undefined);
  }

  private stopMediaStream(stream: MediaStream): void {
    stream.getTracks().forEach((track) => track.stop());
  }

  private stopPendingOutgoingLocalStream(): void {
    if (!this.pendingOutgoingLocalStream) return;
    this.stopMediaStream(this.pendingOutgoingLocalStream);
    this.pendingOutgoingLocalStream = undefined;
  }

  private scheduleOutgoingCallTimeout(
    callService: NonNullable<ReturnType<typeof getCallService>>,
    call: OutgoingCall,
  ): void {
    this.clearOutgoingCallTimeout();
    this.outgoingCallTimeoutId = setTimeout(() => {
      const state = this._handshakeState;
      if (
        !state ||
        state.direction !== 'outgoing' ||
        state.call.callInviteId !== call.callInviteId
      )
        return;
      this.setHandshakeState(null);
      this.clearOutgoingCallTracking();
      this.stopPendingOutgoingLocalStream();
      callService
        .cancelOutgoingCall({
          callInviteId: call.callInviteId,
          calleeId: call.calleeId,
          roomId: call.roomId,
        })
        .catch((err) =>
          console.warn(
            '[CallHandshake] Failed to clear callee invite on timeout — callee dialog may not dismiss:',
            err,
          ),
        );
      publish('evt:call:invite:unanswered', call);
    }, CALLING_TTL_MS);
  }

  cancelOutgoing = (): void => {
    const state = this._handshakeState;
    const svc = getCallService();
    if (!state || state.direction !== 'outgoing' || !svc) return;
    this.clearOutgoingCallTracking();
    this.stopPendingOutgoingLocalStream();
    this.setHandshakeState(null);
    this.onCalleeBusy(false);
    publish('evt:call:invite:unanswered', state.call);
    svc
      .cancelOutgoingCall({
        callInviteId: state.call.callInviteId,
        calleeId: state.call.calleeId,
        roomId: state.call.roomId,
      })
      .catch((err) =>
        console.warn(
          '[CallHandshake] Failed to clear callee invite on cancel — callee dialog may not dismiss:',
          err,
        ),
      );
  };

  acceptIncoming = (): void => {
    const state = this._handshakeState;
    if (!state || state.direction !== 'incoming') return;
    if (this.isExpired(state.call)) {
      console.log('[call] incoming acceptance stopped', {
        reason: 'expired-before-start',
        roomId: state.call.roomId,
        callInviteId: state.call.callInviteId,
      });
      this.setHandshakeState(null);
      return;
    }
    const svc = getCallService();
    const localUID = getLoggedInUserId();
    if (!svc || !localUID) {
      console.warn('[call] incoming acceptance unavailable', {
        reason: svc ? 'not-authenticated' : 'service-unavailable',
        roomId: state.call.roomId,
        callInviteId: state.call.callInviteId,
      });
      return;
    }
    this.clearOutgoingCallTracking();
    this.incomingAcceptanceAbortController?.abort();
    const abortController = new AbortController();
    this.incomingAcceptanceAbortController = abortController;
    const acceptanceStartedAt = Date.now();
    this.setHandshakeState({ direction: 'accepting', call: state.call });
    if (state.call.expiresAt != null) {
      this.incomingCallTimeoutId = setTimeout(
        () => {
          this.incomingCallTimeoutId = undefined;
          abortController.abort(
            new DOMException('Call invite expired', 'TimeoutError'),
          );
        },
        Math.max(0, state.call.expiresAt - Date.now()),
      );
    }
    const { signal } = abortController;
    let acceptSent = false;
    this.enterRoom(
      state.call.roomId,
      localUID,
      state.call.audioOnly ?? false,
      undefined,
      { signal },
    )
      .then(() => {
        if (this.isExpired(state.call) && !signal.aborted) {
          abortController.abort(
            new DOMException('Call invite expired', 'TimeoutError'),
          );
        }
        if (signal.aborted) throw signal.reason;
        acceptSent = true;
        return svc.respondToIncomingCallInvite({
          callInviteId: state.call.callInviteId,
          roomId: state.call.roomId,
          callerId: state.call.callerId,
          responseType: 'accepted',
        });
      })
      .catch((err) => {
        if (signal.aborted) {
          const reason = signal.reason;
          const stopReason =
            reason instanceof DOMException && reason.name === 'TimeoutError'
              ? 'expired-during-acceptance'
              : reason instanceof DOMException &&
                  reason.message === 'Call invite cancelled'
                ? 'cancelled-during-acceptance'
                : null;
          if (stopReason) {
            const details = {
              reason: stopReason,
              roomId: state.call.roomId,
              callInviteId: state.call.callInviteId,
            };
            if (stopReason === 'expired-during-acceptance') {
              console.warn(
                {
                  ...details,
                  acceptanceElapsedMs: Date.now() - acceptanceStartedAt,
                  remainingAtAcceptMs:
                    state.call.expiresAt == null
                      ? undefined
                      : state.call.expiresAt - acceptanceStartedAt,
                },
                '[call] incoming acceptance stopped',
              );
            } else {
              console.log('[call] incoming acceptance stopped', details);
            }
          }
          return;
        }
        console.error('Error accepting incoming call:', err);
        // Callee media, join and accept-response failures all land here;
        // the error name (e.g. NotAllowedError) tells them apart.
        void reportCallStartFailure('accept-failed', err, {
          roomId: state.call.roomId,
          audioOnly: state.call.audioOnly ?? false,
        }).then((permissions) => {
          if (err instanceof Error && err.name === 'NotAllowedError') {
            window.alert(
              mediaFailureMessage(
                err,
                permissions,
                state.call.audioOnly ?? false,
              ),
            );
          }
        });
        // Otherwise the caller keeps ringing until the invite expires.
        if (!acceptSent) {
          svc
            .respondToIncomingCallInvite({
              callInviteId: state.call.callInviteId,
              roomId: state.call.roomId,
              callerId: state.call.callerId,
              responseType: 'rejected',
            })
            .catch((err) =>
              console.error('Error rejecting failed incoming call:', err),
            );
        }
        this.hangUp('accept-error');
      })
      .finally(() => {
        if (this.incomingAcceptanceAbortController === abortController) {
          this.incomingAcceptanceAbortController = undefined;
        }
        // An aborted acceptance never reaches hangUp, and its accept request
        // can still settle either way. Clear the room context only if this
        // join still owns it, so a newer call keeps its own.
        if (signal.aborted && this.roomContextOwner === signal) {
          this.clearRoomContext();
        }
        const current = this._handshakeState;
        if (
          current?.direction === 'accepting' &&
          current.call.callInviteId === state.call.callInviteId
        ) {
          this.setHandshakeState(null);
        }
      });
  };

  declineIncoming = (): void => {
    const state = this._handshakeState;
    const svc = getCallService();
    if (!state || state.direction !== 'incoming' || !svc) return;
    this.clearOutgoingCallTracking();
    this.setHandshakeState(null);
    svc
      .respondToIncomingCallInvite({
        callInviteId: state.call.callInviteId,
        roomId: state.call.roomId,
        callerId: state.call.callerId,
        responseType: 'rejected',
      })
      .catch((err) => console.error('Error declining incoming call:', err));
  };

  hangUp = (reason: HangUpReason = 'user'): void => {
    // The peer's side learns this leave is intentional from the signaling
    // `leave` the room sends during dispose() — the DO tags it as a `left`
    // departure, so their `onAlone` exits immediately instead of showing
    // "Reconnecting…". No app-level control message is needed.
    // ponytail: normal console.log (not gated behind DEV) so field reports of
    // "call ended unexpectedly" can be diagnosed from a phone's remote console.
    console.log('[call] hangUp', {
      reason,
      // Live room accessor — _handshakeState is cleared at join, so it would
      // log undefined here. members().length (not the UIDs) keeps the field
      // signal without leaking peer identifiers into a production console.
      roomId: this.p2p.room()?.roomId,
      memberCount: this.p2p.members().length,
      state: this.p2p.state(),
    });
    this.publishCompletedCall();
    this.resetReconnectState();
    this.clearRoomContext();
    // dispose() is async in @kidlib/p2p ≥0.4; hangUp stays sync (called from
    // click + timer callbacks). Surface teardown failures — a silently failed
    // dispose is the "call won't end / black screen" bug class we log for.
    void this.p2p.dispose().catch((err) => {
      console.warn('[call] p2p dispose failed on hangUp:', err);
    });
  };

  private publishCompletedCall(): void {
    const call = this.activeOutgoingCall;
    this.activeOutgoingCall = undefined;
    if (call?.connectedAt == null) return;

    const endedAt = call.disconnectedAt ?? Date.now();
    publish('evt:call:session:completed', {
      roomId: call.roomId,
      startedAt: call.startedAt,
      audioOnly: call.audioOnly,
      durationSeconds: Math.max(
        1,
        Math.floor((endedAt - call.connectedAt) / 1000),
      ),
    });
  }

  /**
   * A peer session that never reached `connected` within `connectedTimeoutMs`
   * is a dead call, not a blip — @kidlib/p2p has already closed that member.
   * Show a bounded failure message, then exit to the lobby so the user can retry.
   */
  private handleRoomError(error: unknown, roomId: string): void {
    const message = error instanceof Error ? error.message : String(error);
    console.log('[call] room error', { message });
    const code = (error as { code?: unknown } | null)?.code;
    if (typeof code !== 'string' || !CONNECT_FAILURE_CODES.has(code)) return;
    const detail = {
      message,
      roomId,
      memberCount: this.p2p.members().length,
      state: this.p2p.state(),
    };
    console.warn(detail, '[call] connection failed');
    reportCallFailure('connect-failed', detail, code);
    this.clearReconnectTimers();
    this.clearConnectFailureTimeout();
    this.onReconnectStatus('connect-failed');
    this.connectFailedTimeoutId = setTimeout(() => {
      this.connectFailedTimeoutId = undefined;
      this.hangUp('connect-timeout');
    }, CONNECT_FAILED_DISPLAY_MS);
  }

  /** Remote dropped silently (`dropped`): hold the room open for the grace window. */
  private startReconnectGrace(): void {
    this.clearReconnectTimers();
    this.onReconnectStatus('reconnecting');
    this.reconnectTimeoutId = setTimeout(() => {
      this.reconnectTimeoutId = undefined;
      this.onReconnectStatus('failed');
      reportCallFailure('reconnect-timeout', {
        roomId: this.activeOutgoingCall?.roomId,
        memberCount: this.p2p.members().length,
      });
      this.reconnectFailedTimeoutId = setTimeout(() => {
        this.reconnectFailedTimeoutId = undefined;
        this.hangUp('reconnect-timeout');
      }, RECONNECT_FAILED_DISPLAY_MS);
    }, RECONNECT_GRACE_MS);
  }

  /** Peer came back inside the grace window: return to the connected state. */
  private cancelReconnectGrace(): void {
    if (
      this.reconnectTimeoutId == null &&
      this.reconnectFailedTimeoutId == null
    )
      return;
    this.clearReconnectTimers();
    this.onReconnectStatus('connected');
  }

  private clearReconnectTimers(): void {
    if (this.reconnectTimeoutId != null) {
      clearTimeout(this.reconnectTimeoutId);
      this.reconnectTimeoutId = undefined;
    }
    if (this.reconnectFailedTimeoutId != null) {
      clearTimeout(this.reconnectFailedTimeoutId);
      this.reconnectFailedTimeoutId = undefined;
    }
  }

  private clearConnectFailureTimeout(): void {
    if (this.connectFailedTimeoutId == null) return;
    clearTimeout(this.connectFailedTimeoutId);
    this.connectFailedTimeoutId = undefined;
  }

  private resetReconnectState(): void {
    this.clearReconnectTimers();
    this.clearConnectFailureTimeout();
    this.onReconnectStatus('connected');
  }

  private clearOutgoingCallTimeout(): void {
    if (!this.outgoingCallTimeoutId) return;
    clearTimeout(this.outgoingCallTimeoutId);
    this.outgoingCallTimeoutId = undefined;
  }

  private clearCalleeBusyResetTimeout(): void {
    if (!this.calleeBusyResetTimeoutId) return;
    clearTimeout(this.calleeBusyResetTimeoutId);
    this.calleeBusyResetTimeoutId = undefined;
  }

  private clearOutgoingCallTracking(): void {
    this.clearOutgoingCallTimeout();
    this.unsubCalleeResponse?.();
    this.unsubCalleeResponse = undefined;
  }

  cleanup(): void {
    this.outgoingMediaAttempt += 1;
    this.incomingAcceptanceAbortController?.abort();
    this.incomingAcceptanceAbortController = undefined;
    this.unsubscribeIncomingCall?.();
    this.unsubscribeIncomingCall = undefined;
    this.clearOutgoingCallTracking();
    this.clearCalleeBusyResetTimeout();
    this.resetReconnectState();
    this.stopPendingOutgoingLocalStream();
    this.publishCompletedCall();
    this.clearRoomContext();
    this.setHandshakeState(null);
    this.onCalleeBusy(false);
    void this.p2p.dispose().catch((err) => {
      console.warn('[call] p2p dispose failed on cleanup:', err);
    });
    cleanupCallService();
    this.lastBoundUID = undefined;
  }
}
