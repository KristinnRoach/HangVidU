import { rtdb } from '../../shared/storage/fb-rtdb/rtdb.js';
import {
  cleanupCallService,
  initCallService,
  getCallService,
} from './call-service.js';
import {
  getLoggedInUserId,
  getUser,
  waitForAuthReady,
} from '../../auth/auth-state.js';
import type { SolidP2PRoom } from '@kidlib/p2p/solid';
import { CallResponseType, type CallInvite } from './model/call-schema.js';
import {
  sendIncomingCallPushNotification,
  sendMissedCallPushNotification,
} from './call-notifications.js';
import {
  getAudioConstraints,
  getVideoConstraints,
} from './media-constraints.js';
import {
  registerCallCommandHandlers,
  type InitiateCallCommandDetails,
} from './call-command-handlers.js';
import type {
  CallHandshakeState,
  pendingOutgoingCall,
} from './call-types.js';

const OUTGOING_CALL_TIMEOUT_MS = 30_000;

type CallHandshakeControllerOptions = {
  p2p: SolidP2PRoom;
  createSignaling: any; // TODO: Type
  onStateChange: (state: CallHandshakeState) => void;
  onResultChange: (busy: boolean) => void;
};

export class CallHandshakeController {
  private readonly p2p: SolidP2PRoom;
  private readonly createSignaling: any;
  private readonly onStateChange: (state: CallHandshakeState) => void;
  private readonly onResultChange: (busy: boolean) => void;

  private _handshakeState: CallHandshakeState = null;
  private outgoingCallTimeoutId: ReturnType<typeof setTimeout> | undefined;
  private unsubCalleeResponse: (() => void) | undefined;
  private commandAbortController: AbortController | undefined;
  private unsubscribeIncomingCall: (() => void) | undefined;

  constructor({
    p2p,
    createSignaling,
    onStateChange,
    onResultChange,
  }: CallHandshakeControllerOptions) {
    this.p2p = p2p;
    this.createSignaling = createSignaling;
    this.onStateChange = onStateChange;
    this.onResultChange = onResultChange;
  }

  private setHandshakeState(state: CallHandshakeState): void {
    this._handshakeState = state;
    this.onStateChange(state);
  }

  private setCalleeBusy(busy: boolean): void {
    this.onResultChange(busy);
  }

  async init(): Promise<void> {
    this.cleanup();

    const ac = new AbortController();
    this.commandAbortController = ac;

    registerCallCommandHandlers({
      signal: ac.signal,
      startOutgoingCall: (details) => this.startOutgoingCall(details),
      exitActiveRoom: () => this.exitActiveRoom(),
    });

    const authState = await waitForAuthReady();
    if (ac.signal.aborted) return;

    const localUID = authState.user?.uid ?? getLoggedInUserId();
    if (!localUID) return;

    const callService = initCallService({ localUID, rtdb });

    this.unsubscribeIncomingCall = callService.onIncomingCall((call) => {
      if (!call) {
        if (
          this._handshakeState &&
          this._handshakeState.direction === 'incoming'
        ) {
          this.setHandshakeState(null);
        }
        return;
      }
      if (this.isBusyForIncomingCall(call)) {
        callService
          .respondToIncomingCallInvite({
            roomId: call.roomId,
            responseType: CallResponseType.BUSY,
          })
          .catch((err) =>
            console.error('Error responding busy to incoming call:', err),
          );
        return;
      }
      this.setHandshakeState({ direction: 'incoming', call });
      console.debug('Received incoming call invite:', { call });
    });
  }

  private isBusyForIncomingCall(call: CallInvite): boolean {
    const state = this._handshakeState;
    if (state && state.direction === 'incoming') {
      return state.call.roomId !== call.roomId;
    }
    return state !== null || this.p2p.state() !== 'idle';
  }

  private async startOutgoingCall(
    details: InitiateCallCommandDetails,
  ): Promise<void> {
    const localUID = getLoggedInUserId();
    if (!localUID) {
      console.warn('Cannot start outgoing call before login is ready');
      return;
    }
    const svc = initCallService({ localUID, rtdb });

    const { calleeId, calleeName, audioOnly } = details;
    const callerName = getUser()?.userName || 'Unknown';
    const roomId = crypto.randomUUID();

    const nextOutgoingCall: pendingOutgoingCall = {
      calleeId,
      calleeName,
      callerId: localUID,
      callerName,
      roomId,
      audioOnly,
    };

    try {
      await svc.sendOutgoingCallInvite({
        roomId,
        calleeId,
        callerName,
        audioOnly,
      });
    } catch (err) {
      console.error('Error sending outgoing call invite:', err);
      return;
    }

    this.setHandshakeState({ direction: 'outgoing', call: nextOutgoingCall });
    this.setCalleeBusy(false);
    this.scheduleOutgoingCallTimeout(svc, nextOutgoingCall);
    sendIncomingCallPushNotification(nextOutgoingCall);

    this.unsubCalleeResponse?.();
    this.unsubCalleeResponse = svc.onCalleeResponse(
      calleeId,
      async (response) => {
        if (!response || response.roomId !== roomId) return;
        this.clearOutgoingCallTracking();
        if (response.responseType === 'accepted') {
          await this.enterRoom(
            response.roomId,
            localUID,
            nextOutgoingCall.audioOnly,
          );
        } else if (response.responseType === 'busy') {
          this.setCalleeBusy(true);
          setTimeout(() => this.setCalleeBusy(false), 2_500);
        }
        this.setHandshakeState(null);
      },
    );

    console.debug('Initiated outgoing call invite, command details:', {
      details,
    });
  }

  private async enterRoom(
    roomId: string,
    localUserId: string,
    audioOnly = false,
    getLocalStream?: () => Promise<MediaStream>,
    memberCapacity = 2,
    autoExitOnEmpty = true,
  ) {
    const room = await this.p2p.join({
      roomId,
      peerId: localUserId,
      createSignaling: this.createSignaling,
      getLocalStream:
        getLocalStream ??
        (() =>
          navigator.mediaDevices.getUserMedia({
            video: audioOnly ? false : getVideoConstraints(),
            audio:
              import.meta.env.DEV && !audioOnly ? false : getAudioConstraints(),
          })),
      memberCapacity,
      dataChannel: true,
      onMemberLeft: (detail) => {
        console.debug('Member left room:', { detail });
        if (autoExitOnEmpty && this.p2p.room()?.memberCount === 1) {
          this.exitActiveRoom();
        }
      },
    });

    import.meta.env.DEV &&
      room &&
      console.debug(
        `Active room: ${room.roomId}, members: ${room.members.join(', ')}`,
      );

    return room;
  }

  private scheduleOutgoingCallTimeout(
    callService: NonNullable<ReturnType<typeof getCallService>>,
    call: pendingOutgoingCall,
  ): void {
    this.clearOutgoingCallTimeout();
    this.outgoingCallTimeoutId = setTimeout(() => {
      const state = this._handshakeState;
      if (
        !state ||
        state.direction !== 'outgoing' ||
        state.call.roomId !== call.roomId
      )
        return;
      this.setHandshakeState(null);
      this.clearOutgoingCallTracking();
      callService
        .timeoutOutgoingCall({ recipientUID: call.calleeId })
        .catch((err) => console.warn('[CallHandshake] Failed to clear callee invite on timeout — callee dialog may not dismiss:', err));
      sendMissedCallPushNotification(call);
    }, OUTGOING_CALL_TIMEOUT_MS);
  }

  cancelOutgoing = (): void => {
    const state = this._handshakeState;
    const svc = getCallService();
    if (!state || state.direction !== 'outgoing' || !svc) return;
    this.clearOutgoingCallTracking();
    this.setHandshakeState(null);
    this.setCalleeBusy(false);
    svc
      .cancelOutgoingCall({ recipientUID: state.call.calleeId })
      .catch((err) => console.warn('[CallHandshake] Failed to clear callee invite on cancel — callee dialog may not dismiss:', err));
  };

  acceptIncoming = (): void => {
    const state = this._handshakeState;
    if (!state || state.direction !== 'incoming') return;
    const svc = getCallService();
    const localUID = getLoggedInUserId();
    if (!localUID) return;
    this.clearOutgoingCallTracking();
    this.setHandshakeState(null);
    svc
      .respondToIncomingCallInvite({
        roomId: state.call.roomId,
        responseType: CallResponseType.ACCEPTED,
      })
      .then(() =>
        this.enterRoom(
          state.call.roomId,
          localUID,
          state.call.audioOnly ?? false,
        ),
      )
      .catch((err) => {
        console.error('Error accepting incoming call:', err);
        this.exitActiveRoom();
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
        roomId: state.call.roomId,
        responseType: CallResponseType.REJECTED,
      })
      .catch((err) => console.error('Error declining incoming call:', err));
  };

  exitActiveRoom = (): void => {
    this.p2p.close();
  };

  private clearOutgoingCallTimeout(): void {
    if (!this.outgoingCallTimeoutId) return;
    clearTimeout(this.outgoingCallTimeoutId);
    this.outgoingCallTimeoutId = undefined;
  }

  private clearOutgoingCallTracking(): void {
    this.clearOutgoingCallTimeout();
    this.unsubCalleeResponse?.();
    this.unsubCalleeResponse = undefined;
  }

  cleanup(): void {
    this.commandAbortController?.abort();
    this.commandAbortController = undefined;
    this.unsubscribeIncomingCall?.();
    this.unsubscribeIncomingCall = undefined;
    this.clearOutgoingCallTracking();
    this.setHandshakeState(null);
    this.setCalleeBusy(false);
    this.p2p.close();
    cleanupCallService();
  }
}
