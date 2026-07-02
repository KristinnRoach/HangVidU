import {
  cleanupCallService,
  initCallService,
  getCallService,
} from './call-service.js';
import { getLoggedInUserId, getLoggedInUserToken } from '../../auth/index.js';
import type { SolidP2PRoom } from '@kidlib/p2p/solid';
import type { CreateRoomSignalingOptions, P2PRoomSignaling } from '@kidlib/p2p';
import { CallResponseType, type CallInvite } from './model/call-schema.js';
import {
  sendIncomingCallPushNotification,
  sendMissedCallPushNotification,
} from './call-notifications.js';
import {
  getAudioConstraints,
  getVideoConstraints,
} from './media-constraints.js';
import type {
  CallHandshakeState,
  pendingOutgoingCall,
  StartCallDetails,
} from './call-types.js';
import { resolveDirectConversationId } from '../../stores/conversations-client.js';
import {
  cacheContactConversationId,
  getContactById,
} from '../../stores/contactsStore.js';
import { CALLING_TTL_MS } from '../../../shared/constants';
import { getHangViduApiBaseUrl } from '../../infra/hangvidu-api-url';

const DATA_URL = getHangViduApiBaseUrl();

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
};

export class CallHandshakeController {
  private readonly p2p: SolidP2PRoom;
  private readonly createSignaling: CreateRoomSignaling;
  private readonly getCallerName: () => string;
  private readonly onStateChange: (state: CallHandshakeState) => void;
  private readonly onCalleeBusy: (busy: boolean) => void;

  private _handshakeState: CallHandshakeState = null;
  private outgoingCallTimeoutId: ReturnType<typeof setTimeout> | undefined;
  private calleeBusyResetTimeoutId: ReturnType<typeof setTimeout> | undefined;
  private unsubCalleeResponse: (() => void) | undefined;
  private unsubscribeIncomingCall: (() => void) | undefined;
  private lastBoundUID: string | undefined;

  constructor({
    p2p,
    createSignaling,
    getCallerName,
    onStateChange,
    onCalleeBusy,
  }: CallHandshakeControllerOptions) {
    this.p2p = p2p;
    this.createSignaling = createSignaling;
    this.getCallerName = getCallerName;
    this.onStateChange = onStateChange;
    this.onCalleeBusy = onCalleeBusy;
  }

  private setHandshakeState(state: CallHandshakeState): void {
    this._handshakeState = state;
    this.onStateChange(state);
  }

  private setCalleeBusy(busy: boolean): void {
    this.onCalleeBusy(busy);
  }

  // TODO: Proper in-app notification
  private alertCallStartFailed(): void {
    if (typeof window !== 'undefined') {
      window.alert('Could not start call. Please try again.');
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
    // call (p2p.close here black-screens a call that's mid-join). Only a switch
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

    const callService = initCallService({
      localUID,
      baseUrl: DATA_URL,
      getToken: getLoggedInUserToken,
    });

    this.unsubscribeIncomingCall = callService.onIncomingCall((event) => {
      if (event.type === 'cancel' || event.type === 'handled') {
        if (
          this._handshakeState &&
          this._handshakeState.direction === 'incoming' &&
          this._handshakeState.call.roomId === event.roomId
        ) {
          this.setHandshakeState(null);
        }
        return;
      }
      const { invite: call } = event;
      if (this.isBusyForIncomingCall(call)) {
        callService
          .respondToIncomingCallInvite({
            roomId: call.roomId,
            callerId: call.callerId,
            responseType: CallResponseType.BUSY,
          })
          .catch((err) =>
            console.error('Error responding busy to incoming call:', err),
          );
        return;
      }
      this.setHandshakeState({ direction: 'incoming', call });
      if (import.meta.env.DEV) {
        console.debug('Received incoming call invite:', { call });
      }
    });
  }

  private isBusyForIncomingCall(call: CallInvite): boolean {
    const state = this._handshakeState;
    if (state && state.direction === 'incoming') {
      return state.call.roomId !== call.roomId;
    }
    return state !== null || this.p2p.state() !== 'idle';
  }

  async sendOutgoingCallInvite(details: StartCallDetails): Promise<void> {
    const localUID = getLoggedInUserId();
    if (!localUID) {
      console.warn('Cannot start outgoing call before login is ready');
      return;
    }
    const svc = initCallService({
      localUID,
      baseUrl: DATA_URL,
      getToken: getLoggedInUserToken,
    });

    const { calleeId, calleeName, audioOnly } = details;
    const callerName = this.getCallerName();
    let roomId: string;
    try {
      roomId = await this.resolveCallRoomId(calleeId);
    } catch (err) {
      console.error(
        '[CallHandshake] Cannot start call: failed to resolve conversationId:',
        err,
      );
      this.alertCallStartFailed();
      return;
    }

    const nextOutgoingCall: pendingOutgoingCall = {
      calleeId,
      calleeName,
      callerId: localUID,
      callerName,
      roomId,
      audioOnly,
    };

    this.setHandshakeState({ direction: 'outgoing', call: nextOutgoingCall });
    this.setCalleeBusy(false);
    this.scheduleOutgoingCallTimeout(svc, nextOutgoingCall);

    let responseReceived = false;
    this.unsubCalleeResponse?.();
    this.unsubCalleeResponse = svc.onCalleeResponse(async (response) => {
      if (!response || response.roomId !== roomId) return;
      responseReceived = true;
      this.clearOutgoingCallTracking();
      try {
        if (response.responseType === 'accepted') {
          await this.enterRoom(
            response.roomId,
            localUID,
            nextOutgoingCall.audioOnly,
          );
        } else if (response.responseType === 'busy') {
          this.setCalleeBusy(true);
          this.clearCalleeBusyResetTimeout();
          this.calleeBusyResetTimeoutId = setTimeout(() => {
            this.calleeBusyResetTimeoutId = undefined;
            this.setCalleeBusy(false);
          }, 2_500);
        }
      } catch (err) {
        console.error('Error entering room on callee accept:', err);
        this.exitActiveRoom();
      } finally {
        svc
          .ackCallResponse(response.roomId)
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
        roomId,
        calleeId,
        callerName,
        audioOnly,
      });
    } catch (err) {
      this.clearOutgoingCallTracking();
      this.setHandshakeState(null);
      console.error('Error sending outgoing call invite:', err);
      this.alertCallStartFailed();
      return;
    }

    const state = this._handshakeState;
    if (
      state &&
      !responseReceived &&
      state.direction === 'outgoing' &&
      state.call.roomId === roomId
    ) {
      sendIncomingCallPushNotification(nextOutgoingCall);
    }
    if (import.meta.env.DEV) {
      console.debug('Initiated outgoing call invite, command details:', {
        details,
      });
    }
  }

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
    cacheContactConversationId(calleeId, conversationId);
    return conversationId;
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
      onAlone: (detail) => {
        if (import.meta.env.DEV) console.debug('Room is alone:', { detail });
        if (autoExitOnEmpty) this.exitActiveRoom();
      },
    });
    if (!room)
      throw this.p2p.error() ?? new Error('Room join returned no room');

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
        .cancelOutgoingCall({
          recipientUID: call.calleeId,
          roomId: call.roomId,
        })
        .catch((err) =>
          console.warn(
            '[CallHandshake] Failed to clear callee invite on timeout — callee dialog may not dismiss:',
            err,
          ),
        );
      sendMissedCallPushNotification(call);
    }, CALLING_TTL_MS);
  }

  cancelOutgoing = (): void => {
    const state = this._handshakeState;
    const svc = getCallService();
    if (!state || state.direction !== 'outgoing' || !svc) return;
    this.clearOutgoingCallTracking();
    this.setHandshakeState(null);
    this.setCalleeBusy(false);
    svc
      .cancelOutgoingCall({
        recipientUID: state.call.calleeId,
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
    const svc = getCallService();
    const localUID = getLoggedInUserId();
    if (!svc || !localUID) return;
    this.clearOutgoingCallTracking();
    this.setHandshakeState(null);
    this.enterRoom(state.call.roomId, localUID, state.call.audioOnly ?? false)
      .then(() =>
        svc.respondToIncomingCallInvite({
          roomId: state.call.roomId,
          callerId: state.call.callerId,
          responseType: CallResponseType.ACCEPTED,
        }),
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
        callerId: state.call.callerId,
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
    this.unsubscribeIncomingCall?.();
    this.unsubscribeIncomingCall = undefined;
    this.clearOutgoingCallTracking();
    this.clearCalleeBusyResetTimeout();
    this.setHandshakeState(null);
    this.setCalleeBusy(false);
    this.p2p.close();
    cleanupCallService();
    this.lastBoundUID = undefined;
  }
}
