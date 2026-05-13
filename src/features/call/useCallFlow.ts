import { createSignal, onCleanup, onMount } from 'solid-js';
import type { SolidP2PRoom } from '@kidlib/p2p/solid';
import type { CallInvite } from './model/call-schema.js';
import { CallFlowController } from './call-flow-controller.js';
import type { CallingState, OutgoingCall, OutgoingCallResult } from './call-types.js';

export type { CallingState, OutgoingCallResult } from './call-types.js';

interface CallFlowOptions {
  p2p: SolidP2PRoom;
  createSignaling: any; // TODO: Type
}

export function useCallFlow({ p2p, createSignaling }: CallFlowOptions) {
  const [callingState, setCallingState] = createSignal<CallingState>(false);
  const [outgoingCallResult, setOutgoingCallResult] = createSignal<OutgoingCallResult>(null);

  const controller = new CallFlowController({
    p2p,
    createSignaling,
    onStateChange: setCallingState,
    onResultChange: setOutgoingCallResult,
  });

  const incomingCall = (): CallInvite | null => {
    const state = callingState();
    return state && state.direction === 'incoming' ? state.call : null;
  };

  const outgoingCall = (): OutgoingCall | null => {
    const state = callingState();
    return state && state.direction === 'outgoing' ? state.call : null;
  };

  onMount(() => controller.init());

  if (typeof window !== 'undefined') {
    const handleBeforeUnload = () => controller.cleanup();
    window.addEventListener('beforeunload', handleBeforeUnload);
    onCleanup(() => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      controller.cleanup();
    });
  } else {
    onCleanup(() => controller.cleanup());
  }

  return {
    calling: callingState,
    outgoingCallResult,
    clearOutgoingCallResult: () => setOutgoingCallResult(null),
    incomingCall,
    outgoingCall,
    exitActiveRoom: controller.exitActiveRoom,
    cancelOutgoing: controller.cancelOutgoing,
    acceptIncoming: controller.acceptIncoming,
    declineIncoming: controller.declineIncoming,
  };
}
