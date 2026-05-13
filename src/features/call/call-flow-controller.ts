import { rtdb } from '../../shared/storage/fb-rtdb/rtdb.js';
import {
  cleanupCallService,
  initCallService,
  getCallService,
} from './call-service.js';
import { getUser, getUserId } from '../../auth/auth-state.js';
import type { SolidP2PRoom } from '@kidlib/p2p/solid';
import { CallResponseType, type CallInvite } from './model/call-schema.js';
import { joinCallRoom } from './call-room.js';
import {
  sendIncomingCallPushNotification,
  sendMissedCallPushNotification,
} from './call-notifications.js';
import {
  registerCallCommandHandlers,
  type InitiateCallCommandDetails,
} from './call-command-handlers.js';
import type {
  CallingState,
  OutgoingCall,
  CallResponseType,
} from './call-types.js';

const OUTGOING_CALL_TIMEOUT_MS = 30_000;

type CallFlowControllerOptions = {
  p2p: SolidP2PRoom;
  createSignaling: any; // TODO: Type
  onStateChange: (state: CallingState) => void;
  onResultChange: (result: CallResponseType) => void;
};

export class CallFlowController {
  private readonly p2p: SolidP2PRoom;
  private readonly createSignaling: any;
  private readonly onStateChange: (state: CallingState) => void;
  private readonly onResultChange: (result: CallResponseType) => void;

  private _callingState: CallingState = false;
  private outgoingCallTimeoutId: ReturnType<typeof setTimeout> | undefined;
  private unsubCalleeResponse: (() => void) | undefined;
  private commandAbortController: AbortController | undefined;
  private unsubscribeIncomingCall: (() => void) | undefined;

  constructor({
    p2p,
    createSignaling,
    onStateChange,
    onResultChange,
  }: CallFlowControllerOptions) {
    this.p2p = p2p;
    this.createSignaling = createSignaling;
    this.onStateChange = onStateChange;
    this.onResultChange = onResultChange;
  }

  private setCallingState(state: CallingState): void {
    this._callingState = state;
    this.onStateChange(state);
  }

  private setResult(result: CallResponseType): void {
    this.onResultChange(result);
  }

  init(): void {
    this.cleanup();

    const localUID = getUserId();
    const callService = initCallService({ localUID, rtdb });
    const ac = new AbortController();
    this.commandAbortController = ac;

    registerCallCommandHandlers({
      signal: ac.signal,
      startOutgoingCall: (details) => this.startOutgoingCall(details, localUID),
      exitActiveRoom: () => this.exitActiveRoom(),
    });

    this.unsubscribeIncomingCall = callService.onIncomingCall((call) => {
      if (!call) {
        if (this._callingState && this._callingState.direction === 'incoming') {
          this.setCallingState(false);
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
      this.setCallingState({ direction: 'incoming', call });
      console.debug('Received incoming call invite:', { call });
    });
  }

  private isBusyForIncomingCall(call: CallInvite): boolean {
    const state = this._callingState;
    if (state && state.direction === 'incoming') {
      return state.call.roomId !== call.roomId;
    }
    return state !== false || this.p2p.state() !== 'idle';
  }

  private async startOutgoingCall(
    details: InitiateCallCommandDetails,
    localUID: string,
  ): Promise<void> {
    const svc = getCallService();
    if (!svc) return;

    const { calleeId, calleeName, audioOnly } = details;
    const callerName = getUser()?.userName || 'Unknown';
    const roomId = crypto.randomUUID();

    const nextOutgoingCall: OutgoingCall = {
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

    this.setCallingState({ direction: 'outgoing', call: nextOutgoingCall });
    this.setResult(null);
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
          this.setResult('busy');
          setTimeout(() => this.setResult(null), 2_500);
        } else if (response.responseType === 'rejected') {
          this.setResult('rejected');
          console.debug('Outgoing call was rejected');
        }
        this.setCallingState(false);
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
    return joinCallRoom({
      p2p: this.p2p,
      createSignaling: this.createSignaling,
      roomId,
      localUserId,
      audioOnly,
      getLocalStream,
      memberCapacity,
      autoExitOnEmpty,
      onEmpty: () => this.exitActiveRoom(),
    });
  }

  private scheduleOutgoingCallTimeout(
    callService: NonNullable<ReturnType<typeof getCallService>>,
    call: OutgoingCall,
  ): void {
    this.clearOutgoingCallTimeout();
    this.outgoingCallTimeoutId = setTimeout(() => {
      const state = this._callingState;
      if (
        !state ||
        state.direction !== 'outgoing' ||
        state.call.roomId !== call.roomId
      )
        return;
      this.setCallingState(false);
      this.setResult('timeout');
      this.clearOutgoingCallTracking();
      callService
        .timeoutOutgoingCall({ recipientUID: call.calleeId })
        .catch((err) => console.error('Error timing out outgoing call:', err));
      sendMissedCallPushNotification(call);
    }, OUTGOING_CALL_TIMEOUT_MS);
  }

  cancelOutgoing = (): void => {
    const state = this._callingState;
    const svc = getCallService();
    if (!state || state.direction !== 'outgoing' || !svc) return;
    this.clearOutgoingCallTracking();
    this.setCallingState(false);
    this.setResult(null);
    svc
      .cancelOutgoingCall({ recipientUID: state.call.calleeId })
      .catch((err) => console.error('Error cancelling outgoing call:', err));
  };

  acceptIncoming = (): void => {
    const state = this._callingState;
    if (!state || state.direction !== 'incoming') return;
    const svc = getCallService();
    this.clearOutgoingCallTracking();
    this.setCallingState(false);
    svc
      .respondToIncomingCallInvite({
        roomId: state.call.roomId,
        responseType: CallResponseType.ACCEPTED,
      })
      .then(() =>
        this.enterRoom(
          state.call.roomId,
          getUserId(),
          state.call.audioOnly ?? false,
        ),
      )
      .catch((err) => {
        console.error('Error accepting incoming call:', err);
        this.exitActiveRoom();
      });
  };

  declineIncoming = (): void => {
    const state = this._callingState;
    const svc = getCallService();
    if (!state || state.direction !== 'incoming' || !svc) return;
    this.clearOutgoingCallTracking();
    this.setCallingState(false);
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
    this.setCallingState(false);
    this.setResult(null);
    this.p2p.close();
    cleanupCallService();
  }
}
