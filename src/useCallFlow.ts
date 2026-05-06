import { createSignal } from 'solid-js';
import { rtdb } from './shared/storage/fb-rtdb/rtdb.js';
import { handleCommand } from './shared/events/index.js';
import { initCallService, getCallService } from './call-service.js';
import { getUserId } from './auth/auth-state.js';
import type { SolidP2PRoom } from '@kidlib/p2p/solid';
import { createFirebaseRoomSignaling } from './features/signaling/firebase-room-signaling.js';
import type { CallInvite } from './shared/storage/user/call-schema';

interface CallFlowOptions {
  p2p: SolidP2PRoom;
}

type OutgoingCall = {
  contactId: string;
  roomId: string;
};

type CallFlowState =
  | false
  | {
      direction: 'incoming';
      call: CallInvite;
    }
  | {
      direction: 'outgoing';
      call: OutgoingCall;
    };

const [calling, setCalling] = createSignal<CallFlowState>(false);

export function useCallFlow({ p2p }: CallFlowOptions) {
  function outgoingCall(): OutgoingCall | null {
    const state = calling();
    return state && state.direction === 'outgoing' ? state.call : null;
  }

  function incomingCall(): CallInvite | null {
    const state = calling();
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
    const activeCall = calling();
    const svc = getCallService();
    if (!activeCall || activeCall.direction !== 'outgoing' || !svc) return;
    setCalling(false);
    svc
      .cancelOutgoingCall({
        recipientUID: activeCall.call.contactId,
        roomId: activeCall.call.roomId,
      })
      .catch((err) => {
        console.error('Error cancelling outgoing call:', err);
      });
  }

  function acceptIncoming() {
    const activeCall = calling();
    const svc = getCallService();
    if (!activeCall || activeCall.direction !== 'incoming' || !svc) return;
    setCalling(false);
    svc
      .acceptIncomingCall({
        fromUID: activeCall.call.from,
        roomId: activeCall.call.roomId,
      })
      .then(() => enterRoom(activeCall.call.roomId, getUserId()))
      .catch((err) => {
        console.error('Error accepting incoming call:', err);
        exitActiveRoom();
      });
  }

  function declineIncoming() {
    const activeCall = calling();
    const svc = getCallService();
    if (!activeCall || activeCall.direction !== 'incoming' || !svc) return;
    setCalling(false);
    svc
      .rejectIncomingCall({
        fromUID: activeCall.call.from,
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
      ({ contactId }) => {
        const outgoingRoomId = callService.sendOutgoingCallInvite({
          recipientUID: contactId,
        });
        setCalling({
          direction: 'outgoing',
          call: { contactId, roomId: outgoingRoomId },
        });
        console.debug('Initiated outgoing call invite:', {
          contactId,
          outgoingRoomId,
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
      setCalling({ direction: 'incoming', call });
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
        setCalling(false);

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
    calling,
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
