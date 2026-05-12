import { createSignal } from 'solid-js';
import { rtdb } from '../../shared/storage/fb-rtdb/rtdb.js';
import { handleCommand } from '../../shared/events/index.js';
import { initCallService, getCallService } from './call-service.js';
import { getUser, getUserId } from '../../auth/auth-state.js';
import type { SolidP2PRoom } from '@kidlib/p2p/solid';
import type { P2PRoomStateChangeDetail } from '@kidlib/p2p';
import { getPushNotifications } from '../push-notifications/index.js';
import type { CallInvite } from './model/call-schema.js';
import {
  getVideoConstraints,
  getAudioConstraints,
} from './media-constraints.js';

const OUTGOING_CALL_TIMEOUT_MS = 30_000;

interface CallFlowOptions {
  p2p: SolidP2PRoom;
  createSignaling: any; // TODO: Type
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

export function useCallFlow({ p2p, createSignaling }: CallFlowOptions) {
  const [callingState, setCallingState] = createSignal<CallingState>(false);
  let outgoingCallTimeoutId: ReturnType<typeof setTimeout> | undefined;
  let unsubCalleeResponse: (() => void) | undefined;

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
    audioOnly = false,
    getLocalStream: () => Promise<MediaStream> = () =>
      navigator.mediaDevices.getUserMedia({
        video: audioOnly ? false : getVideoConstraints(),
        audio:
          import.meta.env.DEV && !audioOnly ? false : getAudioConstraints(),
      }),
    memberCapacity = 2,
    autoExitOnEmpty = true,
  ) {
    const room = await p2p.join({
      roomId,
      peerId: localUserId,
      createSignaling,
      getLocalStream,
      memberCapacity,
      dataChannel: true,
    });

    room.on('memberLeft', (detail) => {
      console.debug('Member left room:', { detail });
      if (autoExitOnEmpty && room.memberCount === 1) {
        exitActiveRoom();
      }
    });

    import.meta.env.DEV &&
      room &&
      console.debug(
        `Active room: ${room.roomId}, members: ${room.members.join(', ')}`,
      );

    return room;
  }

  function exitActiveRoom() {
    p2p.close();
  }

  function clearOutgoingCallTimeout() {
    if (!outgoingCallTimeoutId) return;
    clearTimeout(outgoingCallTimeoutId);
    outgoingCallTimeoutId = undefined;
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
      unsubCalleeResponse?.();
      unsubCalleeResponse = undefined;
      callService
        .timeoutOutgoingCall({
          recipientUID: call.calleeId,
        })
        .catch((err) => {
          console.error('Error timing out outgoing call:', err);
        });
      sendMissedCallNotification(call);
    }, OUTGOING_CALL_TIMEOUT_MS);
  }

  function cancelOutgoing() {
    const activeCall = callingState();
    const svc = getCallService();
    if (!activeCall || activeCall.direction !== 'outgoing' || !svc) return;
    clearOutgoingCallTimeout();
    unsubCalleeResponse?.();
    unsubCalleeResponse = undefined;
    setCallingState(false);
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
    clearOutgoingCallTimeout();
    setCallingState(false);

    svc
      .acceptIncomingCall({
        roomId: currentState.call.roomId,
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
    clearOutgoingCallTimeout();
    setCallingState(false);
    svc
      .rejectIncomingCall({
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
      async (details: {
        calleeId: string;
        calleeName: string;
        audioOnly: boolean;
      }) => {
        const { calleeId, calleeName, audioOnly } = details;
        const callerName = getUser()?.userName || 'Unknown';

        // Create ephemiral unique room ID for this call
        // (could use getDeterministicRoomId() if stable id needed)
        const roomId = crypto.randomUUID();

        const outgoingCall = {
          calleeId,
          calleeName,
          callerId: localUID,
          callerName,
          roomId,
          audioOnly,
        };

        try {
          await callService.sendOutgoingCallInvite({
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
          call: outgoingCall,
        });
        scheduleOutgoingCallTimeout(callService, outgoingCall);
        sendIncomingCallNotification(outgoingCall);
        unsubCalleeResponse?.();
        unsubCalleeResponse = callService.onCalleeResponse(
          calleeId,
          async (response) => {
            if (!response || response.roomId !== roomId) return;
            unsubCalleeResponse?.();
            unsubCalleeResponse = undefined;
            clearOutgoingCallTimeout();
            if (response.responseType === 'accepted') {
              await enterRoom(response.roomId, localUID, outgoingCall.audioOnly);
            } else if (response.responseType === 'rejected') {
              console.debug('Outgoing call was rejected');
            }
            setCallingState(false);
          },
        );
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
      if (!call) {
        if (incomingCall()) setCallingState(false);
        return;
      }
      setCallingState({ direction: 'incoming', call });
      console.debug('Received incoming call invite:', { call });
    });

    return () => {
      clearOutgoingCallTimeout();
      unsubCalleeResponse?.();
      unsubCalleeResponse = undefined;
      ac.abort();
      unsubscribeIncoming();
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
