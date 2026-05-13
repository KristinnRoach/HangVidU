import {
  createContext,
  createSignal,
  onCleanup,
  onMount,
  useContext,
  type Accessor,
  type ParentProps,
} from 'solid-js';

import { useP2PContext } from '../../shared/p2p-context.js';
import { createFirebaseRoomSignaling } from '../signaling/firebase-room-signaling.js';
import type { CallInvite } from './model/call-schema.js';
import { CallFlowController } from './call-flow-controller.js';
import type {
  CallingState,
  OutgoingCall,
  CallResponseType,
} from './call-types.js';

type CallFlowContextValue = {
  calling: Accessor<CallingState>;
  outgoingCallResponse: Accessor<CallResponseType>;
  incomingCall: Accessor<CallInvite | null>;
  outgoingCall: Accessor<OutgoingCall | null>;
  exitActiveRoom: () => void;
  cancelOutgoing: () => void;
  acceptIncoming: () => void;
  declineIncoming: () => void;
};

const CallFlowContext = createContext<CallFlowContextValue>();

export function CallFlowProvider(props: ParentProps) {
  const p2p = useP2PContext();
  const [callingState, setCallingState] = createSignal<CallingState>(false);
  const [outgoingCallResponse, setOutgoingCallResponse] =
    createSignal<CallResponseType>(null);

  const controller = new CallFlowController({
    p2p,
    createSignaling: createFirebaseRoomSignaling,
    onStateChange: setCallingState,
    onResultChange: setOutgoingCallResponse,
  });

  const incomingCall = (): CallInvite | null => {
    const state = callingState();
    return state && state.direction === 'incoming' ? state.call : null;
  };

  const outgoingCall = (): OutgoingCall | null => {
    const state = callingState();
    return state && state.direction === 'outgoing' ? state.call : null;
  };

  const value: CallFlowContextValue = {
    calling: callingState,
    outgoingCallResponse,
    incomingCall,
    outgoingCall,
    exitActiveRoom: controller.exitActiveRoom,
    cancelOutgoing: controller.cancelOutgoing,
    acceptIncoming: controller.acceptIncoming,
    declineIncoming: controller.declineIncoming,
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

  return (
    <CallFlowContext.Provider value={value}>
      {props.children}
    </CallFlowContext.Provider>
  );
}

export function useCallFlowContext(): CallFlowContextValue {
  const ctx = useContext(CallFlowContext);
  if (!ctx) {
    throw new Error(
      'useCallFlowContext must be used inside CallFlowProvider',
    );
  }
  return ctx;
}
