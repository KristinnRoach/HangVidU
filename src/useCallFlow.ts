import { createSignal } from 'solid-js';
import { rtdb } from './shared/storage/fb-rtdb/rtdb.js';
import { handleCommand } from './shared/events/index.js';
import { initCallService, getCallService } from './call-service.js';
import { getUser, getUserId } from './auth/auth-state.js';
import type { SolidP2PRoom } from '@kidlib/p2p/solid';
import { createFirebaseRoomSignaling } from './features/signaling/firebase-room-signaling.js';
import type { CallInvite } from './shared/storage/user/call-schema';

interface CallFlowOptions {
  p2p: SolidP2PRoom;
}

type OutgoingCall = {
  calleeId: string;
  calleeName: string;
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
      await Promise.all([svc.endActiveCall(), svc.clearOutgoingCallResponse()]);
    }
  }

  function cancelOutgoing() {
    const activeCall = callingState();
    const svc = getCallService();
    if (!activeCall || activeCall.direction !== 'outgoing' || !svc) return;
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

  function setup(): () => void {
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
        setCallingState({
          direction: 'outgoing',
          call: { calleeId, calleeName, roomId: outgoingRoomId, audioOnly },
        });
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
      setCallingState({ direction: 'incoming', call });
      console.debug('Received incoming call invite:', { call });
    });

    const unsubscribeOutgoingResponse = callService.onOutgoingCallResponse(
      async (response) => {
        if (!response) return;
        console.debug('Received outgoing call response:', { response });

        if (response.responseType === 'accepted') {
          await enterRoom(response.roomId, localUID);
        } else if (response.responseType === 'rejected') {
          console.debug('Outgoing call was rejected');
        }
        setCallingState(false);

        callService.clearOutgoingCallResponse().catch((err) => {
          console.error('Error clearing outgoing call response:', err);
        });
      },
    );

    return () => {
      ac.abort();
      unsubscribeIncoming();
      unsubscribeOutgoingResponse();
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
    setup,
  };
}

// todo: re-enable push notifications for calls once the flow is solidified
// getPushNotifications().sendIncomingCall()
