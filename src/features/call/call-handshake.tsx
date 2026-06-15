import {
  createContext,
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  useContext,
  type Accessor,
  type ParentProps,
} from 'solid-js';

import { useAuth } from '../../auth/solid-auth.js';
import { useP2PContext } from '../../shared/p2p-context.js';
import { createRoomSignaling } from '../../realtime/index.js';
import type { CallInvite } from './model/call-schema.js';
import { CallHandshakeController } from './call-handshake-controller.js';
import type {
  CallHandshakeState,
  pendingOutgoingCall,
  StartCallDetails,
} from './call-types.js';

type CallHandshakeContextValue = {
  startCall: (details: StartCallDetails) => Promise<void>;
  hangUp: () => void;

  isCalleeBusy: Accessor<boolean>;
  pendingIncomingCall: Accessor<CallInvite | null>;
  pendingOutgoingCall: Accessor<pendingOutgoingCall | null>;
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
  const [isCalleeBusy, setIsCalleeBusy] = createSignal(false);

  const controller = new CallHandshakeController({
    p2p,
    createSignaling: createRoomSignaling,
    onStateChange: setHandshakeState,
    onCalleeBusy: setIsCalleeBusy,
  });

  const incomingCall = (): CallInvite | null => {
    const state = handshakeState();
    return state && state.direction === 'incoming' ? state.call : null;
  };

  const outgoingCall = (): pendingOutgoingCall | null => {
    const state = handshakeState();
    return state && state.direction === 'outgoing' ? state.call : null;
  };

  const startCall = async (details: StartCallDetails) => {
    await controller.sendOutgoingCallInvite(details);
  };

  const hangUp = () => controller.exitActiveRoom();

  const value: CallHandshakeContextValue = {
    startCall,
    hangUp,
    isCalleeBusy,
    pendingIncomingCall: incomingCall,
    pendingOutgoingCall: outgoingCall,
    exitActiveRoom: controller.exitActiveRoom,
    cancelOutgoing: controller.cancelOutgoing,
    acceptIncoming: controller.acceptIncoming,
    declineIncoming: controller.declineIncoming,
  };

  // Re-attach the incoming-call listener whenever the logged-in user changes.
  // A one-shot init at mount missed the common case where login completes
  // AFTER mount (the listener never attached → no incoming-call dialog until a
  // reload). Keying on the uid avoids tearing down an active call on unrelated
  // auth-state updates (e.g. token refresh) that don't change the user.
  const auth = useAuth();
  const activeUid = createMemo(() => auth.user()?.uid ?? null);
  createEffect(() => {
    if (activeUid()) {
      controller.init();
    } else {
      controller.cleanup();
    }
  });

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
    throw new Error(
      'useCallHandshake must be used inside CallHandshakeProvider',
    );
  }
  return ctx;
}
