import { createSignal, onCleanup } from 'solid-js';
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
  OutgoingCallResult,
} from './call-types.js';

const OUTGOING_CALL_TIMEOUT_MS = 30_000;

interface CallFlowOptions {
  p2p: SolidP2PRoom;
  createSignaling: any; // TODO: Type
}

export type { CallingState, OutgoingCallResult } from './call-types.js';

export function useCallFlow({ p2p, createSignaling }: CallFlowOptions) {
  const [callingState, setCallingState] = createSignal<CallingState>(false);
  const [outgoingCallResult, setOutgoingCallResult] =
    createSignal<OutgoingCallResult>(null);
  let outgoingCallTimeoutId: ReturnType<typeof setTimeout> | undefined;
  let unsubCalleeResponse: (() => void) | undefined;
  let commandAbortController: AbortController | undefined;
  let unsubscribeIncomingCall: (() => void) | undefined;

  function outgoingCall(): OutgoingCall | null {
    const state = callingState();
    return state && state.direction === 'outgoing' ? state.call : null;
  }

  function incomingCall(): CallInvite | null {
    const state = callingState();
    return state && state.direction === 'incoming' ? state.call : null;
  }

  function clearOutgoingCallResult() {
    setOutgoingCallResult(null);
  }

  function isBusyForIncomingCall(call: CallInvite): boolean {
    const state = callingState();
    if (state && state.direction === 'incoming') {
      return state.call.roomId !== call.roomId;
    }
    return state !== false || p2p.state() !== 'idle';
  }

  function init(): void {
    cleanup();

    const localUID = getUserId();
    const callService = initCallService({ localUID, rtdb });
    const ac = new AbortController();
    commandAbortController = ac;

    registerCallCommandHandlers({
      signal: ac.signal,
      startOutgoingCall: (details) => startOutgoingCall(details, localUID),
      exitActiveRoom,
    });

    unsubscribeIncomingCall = callService.onIncomingCall((call) => {
      if (!call) {
        if (incomingCall()) setCallingState(false);
        return;
      }
      if (isBusyForIncomingCall(call)) {
        callService
          .respondToIncomingCallInvite({
            roomId: call.roomId,
            responseType: CallResponseType.BUSY,
          })
          .catch((err) => {
            console.error('Error responding busy to incoming call:', err);
          });
        return;
      }
      setCallingState({ direction: 'incoming', call });
      console.debug('Received incoming call invite:', { call });
    });
  }

  async function startOutgoingCall(
    details: InitiateCallCommandDetails,
    localUID: string,
  ) {
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

    setCallingState({
      direction: 'outgoing',
      call: nextOutgoingCall,
    });

    setOutgoingCallResult(null);
    scheduleOutgoingCallTimeout(svc, nextOutgoingCall);
    sendIncomingCallPushNotification(nextOutgoingCall);
    unsubCalleeResponse?.();
    unsubCalleeResponse = svc.onCalleeResponse(calleeId, async (response) => {
      if (!response || response.roomId !== roomId) return;
      clearOutgoingCallTracking();
      if (response.responseType === 'accepted') {
        await enterRoom(response.roomId, localUID, nextOutgoingCall.audioOnly);
      } else if (response.responseType === 'busy') {
        setOutgoingCallResult('busy');
      } else if (response.responseType === 'rejected') {
        setOutgoingCallResult('rejected');
        console.debug('Outgoing call was rejected');
      }
      setCallingState(false);
    });
    console.debug('Initiated outgoing call invite, command details:', {
      details,
    });
  }

  async function enterRoom(
    roomId: string,
    localUserId: string,
    audioOnly = false,
    getLocalStream?: () => Promise<MediaStream>,
    memberCapacity = 2,
    autoExitOnEmpty = true,
  ) {
    return joinCallRoom({
      p2p,
      createSignaling,
      roomId,
      localUserId,
      audioOnly,
      getLocalStream,
      memberCapacity,
      autoExitOnEmpty,
      onEmpty: exitActiveRoom,
    });
  }

  function scheduleOutgoingCallTimeout(
    callService: NonNullable<ReturnType<typeof getCallService>>,
    call: OutgoingCall,
  ) {
    clearOutgoingCallTimeout();
    outgoingCallTimeoutId = setTimeout(() => {
      const state = callingState();
      if (
        !state ||
        state.direction !== 'outgoing' ||
        state.call.roomId !== call.roomId
      ) {
        return;
      }

      setCallingState(false);
      setOutgoingCallResult('timeout');
      clearOutgoingCallTracking();
      callService
        .timeoutOutgoingCall({
          recipientUID: call.calleeId,
        })
        .catch((err) => {
          console.error('Error timing out outgoing call:', err);
        });
      sendMissedCallPushNotification(call);
    }, OUTGOING_CALL_TIMEOUT_MS);
  }

  function cancelOutgoing() {
    const activeCall = callingState();
    const svc = getCallService();
    if (!activeCall || activeCall.direction !== 'outgoing' || !svc) return;
    clearOutgoingCallTracking();
    setCallingState(false);
    setOutgoingCallResult(null);
    svc
      .cancelOutgoingCall({
        recipientUID: activeCall.call.calleeId,
      })
      .catch((err) => {
        console.error('Error cancelling outgoing call:', err);
      });
  }

  function acceptIncoming() {
    const currentState = callingState();
    if (!currentState || currentState.direction !== 'incoming') return;

    const svc = getCallService();
    clearOutgoingCallTracking();
    setCallingState(false);

    svc
      .respondToIncomingCallInvite({
        roomId: currentState.call.roomId,
        responseType: CallResponseType.ACCEPTED,
      })
      .then(() =>
        enterRoom(
          currentState.call.roomId,
          getUserId(),
          currentState.call.audioOnly ?? false,
        ),
      )
      .catch((err) => {
        console.error('Error accepting incoming call:', err);
        exitActiveRoom();
      });
  }

  function declineIncoming() {
    const activeCall = callingState();
    const svc = getCallService();
    if (!activeCall || activeCall.direction !== 'incoming' || !svc) return;
    clearOutgoingCallTracking();
    setCallingState(false);
    svc
      .respondToIncomingCallInvite({
        roomId: activeCall.call.roomId,
        responseType: CallResponseType.REJECTED,
      })
      .catch((err) => {
        console.error('Error declining incoming call:', err);
      });
  }

  function exitActiveRoom() {
    p2p.close();
  }

  function clearOutgoingCallTimeout() {
    if (!outgoingCallTimeoutId) return;
    clearTimeout(outgoingCallTimeoutId);
    outgoingCallTimeoutId = undefined;
  }

  function clearOutgoingCallTracking() {
    clearOutgoingCallTimeout();
    unsubCalleeResponse?.();
    unsubCalleeResponse = undefined;
  }

  function cleanup() {
    commandAbortController?.abort();
    commandAbortController = undefined;
    unsubscribeIncomingCall?.();
    unsubscribeIncomingCall = undefined;
    clearOutgoingCallTracking();
    setCallingState(false);
    setOutgoingCallResult(null);
    p2p.close();
    cleanupCallService();
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', cleanup);
    onCleanup(() => {
      window.removeEventListener('beforeunload', cleanup);
      cleanup();
    });
  } else {
    onCleanup(cleanup);
  }

  return {
    calling: callingState,
    outgoingCallResult,
    clearOutgoingCallResult,
    incomingCall,
    outgoingCall,
    enterRoom,
    exitActiveRoom,
    cancelOutgoing,
    acceptIncoming,
    declineIncoming,
    cleanup,
    init,
  };
}
