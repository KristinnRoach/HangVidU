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
import { CallHandshakeController } from './call-handshake-controller.js';
import type {
  CallHandshakeState,
  OutgoingCall,
  OutgoingCallOutcome,
} from './call-types.js';

type CallHandshakeContextValue = {
  calling: Accessor<CallHandshakeState>;
  outgoingCallOutcome: Accessor<OutgoingCallOutcome>;
  incomingCall: Accessor<CallInvite | null>;
  outgoingCall: Accessor<OutgoingCall | null>;
  exitActiveRoom: () => void;
  cancelOutgoing: () => void;
  acceptIncoming: () => void;
  declineIncoming: () => void;
};

const CallHandshakeContext = createContext<CallHandshakeContextValue>();

export function CallHandshakeProvider(props: ParentProps) {
  const p2p = useP2PContext();
  const [handshakeState, setHandshakeState] =
    createSignal<CallHandshakeState>(null);
  const [outgoingCallOutcome, setOutgoingCallOutcome] =
    createSignal<OutgoingCallOutcome>(null);

  const controller = new CallHandshakeController({
    p2p,
    createSignaling: createFirebaseRoomSignaling,
    onStateChange: setHandshakeState,
    onResultChange: setOutgoingCallOutcome,
  });

  const incomingCall = (): CallInvite | null => {
    const state = handshakeState();
    return state && state.direction === 'incoming' ? state.call : null;
  };

  const outgoingCall = (): OutgoingCall | null => {
    const state = handshakeState();
    return state && state.direction === 'outgoing' ? state.call : null;
  };

  const value: CallHandshakeContextValue = {
    calling: handshakeState,
    outgoingCallOutcome,
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
    <CallHandshakeContext.Provider value={value}>
      {props.children}
    </CallHandshakeContext.Provider>
  );
}

export function useCallHandshake(): CallHandshakeContextValue {
  const ctx = useContext(CallHandshakeContext);
  if (!ctx) {
    throw new Error('useCallHandshake must be used inside CallHandshakeProvider');
  }
  return ctx;
}
