import { rtdb } from './shared/storage/fb-rtdb/rtdb.js';
import { handleCommand } from './shared/events/index.js';
import {
  setOutgoingCall,
  setIncomingCall,
} from './components/dialogs/state.js';
import { initCallService, getCallService } from './call-service.js';
import { getUserId } from './auth/auth-state.js';
import { setLogger } from '@kidlib/p2p';
import { useP2PRoom } from '@kidlib/p2p/solid';

interface CallFlowOptions {
  enterRoom: (roomId: string, userId: string) => Promise<unknown>;
  exitActiveRoom: () => void;
}

export function setupCallFlow({
  enterRoom,
  exitActiveRoom,
}: CallFlowOptions): void {
  const localUID = getUserId();
  const callService = initCallService({ localUID, rtdb });
  handleCommand('cmd:room:initiate:call', ({ contactId }) => {
    const outgoingRoomId = callService.sendOutgoingCallInvite({
      recipientUID: contactId,
    });
    setOutgoingCall({ contactId, roomId: outgoingRoomId });
    console.debug('Initiated outgoing call invite:', {
      contactId,
      outgoingRoomId,
    });
  });

  handleCommand('cmd:room:exit:call', () => {
    exitActiveRoom();
  });

  callService.onIncomingCall((call) => {
    if (!call) return;
    setIncomingCall(call);
    console.debug('Received incoming call invite:', { call });
  });

  callService.onOutgoingCallResponse(async (response) => {
    if (!response) return;
    console.debug('Received outgoing call response:', { response });

    if (response.responseType === 'accepted') {
      await enterRoom(response.roomId, localUID);
    } else if (response.responseType === 'rejected') {
      console.debug('Outgoing call was rejected');
    }
    setOutgoingCall(null);

    callService.clearOutgoingCallResponse().catch((err) => {
      console.error('Error clearing outgoing call response:', err);
    });
  });
}

// todo: re-enable push notifications for calls once the flow is solidified
// getPushNotifications().sendIncomingCall()
