import { createSignal } from 'solid-js';
import { rtdb } from '../../shared/storage/fb-rtdb/rtdb.js';
import { handleCommand } from '../../shared/events/index.js';
import { initCallService, getCallService } from './call-service.js';
import { getUser, getUserId } from '../../auth/auth-state.js';
import type { SolidP2PRoom } from '@kidlib/p2p/solid';
import { createFirebaseRoomSignaling } from '../signaling/firebase-room-signaling.js';
import { getPushNotifications } from '../push-notifications/index.js';
import type { CallInvite, CallResponse } from './model/call-schema.js';

const OUTGOING_CALL_TIMEOUT_MS = 30_000;

interface CallFlowOptions {
  p2p: SolidP2PRoom;
}

type OutgoingCall = {
  calleeId: string;
  calleeName: string;
  callerId: string;
  callerName: string;
  audioOnly: boolean;
  roomId: string;
};

export type CallingState =
  | false
  | {
      direction: 'incoming';
      call: CallInvite;
    }
  | {
      direction: 'outgoing';
      call: OutgoingCall;
    };

export function useCallFlow({ p2p }: CallFlowOptions) {
  const [callingState, setCallingState] = createSignal<CallingState>(false);
  let outgoingCallTimeoutId: ReturnType<typeof setTimeout> | undefined;
  const terminalCallSignals = new Map<string, CallResponse>();

  function outgoingCall(): OutgoingCall | null {
    const state = callingState();
    return state && state.direction === 'outgoing' ? state.call : null;
  }

  function incomingCall(): CallInvite | null {
    const state = callingState();
    return state && state.direction === 'incoming' ? state.call : null;
  }

  async function enterRoom(
    roomId: string,
    localUserId: string,
    getLocalStream: () => Promise<MediaStream> = () =>
      navigator.mediaDevices.getUserMedia({ video: true, audio: false }),
    memberCapacity = 2,
  ) {
    const room = await p2p.join({
      roomId,
      peerId: localUserId,
      createSignaling: createFirebaseRoomSignaling,
      getLocalStream,
      memberCapacity,
      dataChannel: true,
    });

    import.meta.env.DEV &&
      room &&
      console.debug(
        `Active room: ${room.roomId}, members: ${room.members.join(', ')}`,
      );

    return room;
  }

  async function exitActiveRoom() {
    p2p.close();

    const svc = getCallService();
    if (svc) {
      await svc.clearCallSignal();
    }
  }

  function clearOutgoingCallTimeout() {
    if (!outgoingCallTimeoutId) return;
    clearTimeout(outgoingCallTimeoutId);
    outgoingCallTimeoutId = undefined;
  }

  function isTerminalCallSignal(response: CallResponse) {
    return (
      response.responseType === 'canceled' ||
      response.responseType === 'timedOut'
    );
  }

  function sendIncomingCallNotification(call: OutgoingCall) {
    const pushNotifications = getPushNotifications();
    pushNotifications
      ?.sendIncomingCall({
        targetUserId: call.calleeId,
        roomId: call.roomId,
        callerId: call.callerId,
        callerName: call.callerName,
      })
      .catch((err) => {
        console.error('Error sending incoming call notification:', err);
      });
  }

  function sendMissedCallNotification(call: OutgoingCall) {
    const pushNotifications = getPushNotifications();
    pushNotifications
      ?.sendMissedCall({
        targetUserId: call.calleeId,
        roomId: call.roomId,
        callerId: call.callerId,
        callerName: call.callerName,
      })
      .catch((err) => {
        console.error('Error sending missed call notification:', err);
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
      callService
        .timeoutOutgoingCall({
          recipientUID: call.calleeId,
          roomId: call.roomId,
        })
        .catch((err) => {
          console.error('Error timing out outgoing call:', err);
        });
      sendMissedCallNotification(call);
      callService.clearCallSignal().catch((err) => {
        console.error('Error clearing call signal:', err);
      });
    }, OUTGOING_CALL_TIMEOUT_MS);
  }

  function cancelOutgoing() {
    const activeCall = callingState();
    const svc = getCallService();
    if (!activeCall || activeCall.direction !== 'outgoing' || !svc) return;
    clearOutgoingCallTimeout();
    setCallingState(false);
    svc
      .cancelOutgoingCall({
        recipientUID: activeCall.call.calleeId,
        roomId: activeCall.call.roomId,
      })
      .catch((err) => {
        console.error('Error cancelling outgoing call:', err);
      });
  }

  function acceptIncoming() {
    const activeCall = callingState();
    console.info('Accepting incoming call:', { activeCall });
    const svc = getCallService();
    if (!activeCall || activeCall.direction !== 'incoming' || !svc) return;
    clearOutgoingCallTimeout();
    setCallingState(false);
    svc
      .acceptIncomingCall({
        fromUID: activeCall.call.callerId,
        roomId: activeCall.call.roomId,
      })
      .then(() => enterRoom(activeCall.call.roomId, getUserId()))
      .catch((err) => {
        console.error('Error accepting incoming call:', err);
        exitActiveRoom();
      });
  }

  function declineIncoming() {
    const activeCall = callingState();
    const svc = getCallService();
    if (!activeCall || activeCall.direction !== 'incoming' || !svc) return;
    clearOutgoingCallTimeout();
    setCallingState(false);
    svc
      .rejectIncomingCall({
        fromUID: activeCall.call.callerId,
        roomId: activeCall.call.roomId,
      })
      .catch((err) => {
        console.error('Error declining incoming call:', err);
      });
  }

  function init(): () => void {
    const localUID = getUserId();
    const callService = initCallService({ localUID, rtdb });
    const ac = new AbortController();

    handleCommand(
      'cmd:room:initiate:call',
      (details: {
        calleeId: string;
        calleeName: string;
        audioOnly: boolean;
      }) => {
        const { calleeId, calleeName, audioOnly } = details;
        const callerName = getUser()?.userName || 'Unknown';
        const outgoingRoomId = callService.sendOutgoingCallInvite({
          calleeId,
          callerName,
          audioOnly,
        });
        const outgoingCall = {
          calleeId,
          calleeName,
          callerId: localUID,
          callerName,
          roomId: outgoingRoomId,
          audioOnly,
        };
        setCallingState({
          direction: 'outgoing',
          call: outgoingCall,
        });
        scheduleOutgoingCallTimeout(callService, outgoingCall);
        sendIncomingCallNotification(outgoingCall);
        console.debug('Initiated outgoing call invite, command details:', {
          details,
        });
      },
      { signal: ac.signal },
    );

    handleCommand(
      'cmd:room:exit:call',
      () => {
        exitActiveRoom();
      },
      { signal: ac.signal },
    );

    const unsubscribeIncoming = callService.onIncomingCall((call) => {
      if (!call) return;
      const terminalSignal = terminalCallSignals.get(call.roomId);
      if (terminalSignal && terminalSignal.by === call.callerId) {
        terminalCallSignals.delete(call.roomId);
        callService.clearIncomingCallInvite().catch((err) => {
          console.error('Error clearing canceled incoming call invite:', err);
        });
        callService.clearCallSignal().catch((err) => {
          console.error('Error clearing terminal call response:', err);
        });
        return;
      }

      setCallingState({ direction: 'incoming', call });
      console.debug('Received incoming call invite:', { call });
    });

    const unsubscribeCallSignal = callService.onCallSignal(
      async (response) => {
        if (!response) return;
        console.debug('Received call signal:', { response });

        if (isTerminalCallSignal(response)) {
          terminalCallSignals.set(response.roomId, response);
          const state = callingState();
          if (
            state &&
            state.direction === 'incoming' &&
            state.call.roomId === response.roomId &&
            state.call.callerId === response.by
          ) {
            setCallingState(false);
            await callService.clearIncomingCallInvite();
          }

          await callService.clearCallSignal();
          return;
        }

        clearOutgoingCallTimeout();
        if (response.responseType === 'accepted') {
          await enterRoom(response.roomId, localUID);
        } else if (response.responseType === 'rejected') {
          console.debug('Outgoing call was rejected');
        }
        setCallingState(false);

        callService.clearCallSignal().catch((err) => {
          console.error('Error clearing call signal:', err);
        });
      },
    );

    return () => {
      clearOutgoingCallTimeout();
      ac.abort();
      unsubscribeIncoming();
      unsubscribeCallSignal();
    };
  }

  return {
    calling: callingState,
    incomingCall,
    outgoingCall,
    enterRoom,
    exitActiveRoom,
    cancelOutgoing,
    acceptIncoming,
    declineIncoming,
    init,
  };
}
