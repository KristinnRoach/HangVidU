import {
  createContext,
  createEffect,
  createSignal,
  onCleanup,
  useContext,
  type Accessor,
  type ParentProps,
} from 'solid-js';

import { getAuthProviderProfileSeed, useAuth } from '@auth';
import { useP2PContext } from '@shared/p2p-context.js';
import { createRoomSignaling } from '@realtime';
import { subscribe } from '@shared/events/index.js';
import { getLoggedInUserProfile } from '../../stores/user-profile-store.js';
import type { MailboxInvite } from '../../../shared/user-mailbox/protocol';
import {
  CallHandshakeController,
  type IncomingCallNotificationDetails,
} from './call-handshake-controller.js';
import type {
  CallHandshakeState,
  PendingOutgoingCall,
  StartCallDetails,
} from './call-types.js';

type CallHandshakeContextValue = {
  startCall: (details: StartCallDetails) => Promise<void>;
  hangUp: () => void;

  isCalleeBusy: Accessor<boolean>;
  pendingIncomingCall: Accessor<MailboxInvite | null>;
  pendingOutgoingCall: Accessor<PendingOutgoingCall | null>;
  exitActiveRoom: () => void;
  cancelOutgoing: () => void;
  acceptIncoming: () => void;
  declineIncoming: () => void;
};

const CallHandshakeContext = createContext<CallHandshakeContextValue>();
type IncomingCallNotificationOpenedPayload = IncomingCallNotificationDetails & {
  accept?: boolean;
};

// TEMPORARY: require an explicit in-app Accept tap while iOS call acceptance
// is being diagnosed. Set to true to restore notification-action auto-accept.
const ENABLE_NOTIFICATION_AUTO_ACCEPT = false;

function optionalTimestamp(params: URLSearchParams): number | undefined {
  const rawTimestamp = params.get('timestamp');
  if (rawTimestamp == null) return undefined;
  const timestamp = Number(rawTimestamp);
  return Number.isFinite(timestamp) ? timestamp : undefined;
}

function incomingCallNotificationDetailsFromParams(
  params: URLSearchParams,
): IncomingCallNotificationDetails | null {
  const roomId = params.get('conversationRoom');
  const callerId = params.get('callerId');
  if (!roomId || !callerId) return null;

  return {
    roomId,
    callerId,
    callerName: params.get('callerName') || undefined,
    audioOnly: params.get('audioOnly') === '1',
    startedAt: optionalTimestamp(params),
  };
}

function incomingCallNotificationDetailsFromPayload(
  payload: IncomingCallNotificationOpenedPayload,
): IncomingCallNotificationDetails | null {
  if (
    typeof payload.roomId !== 'string' ||
    typeof payload.callerId !== 'string'
  )
    return null;
  return {
    roomId: payload.roomId,
    callerId: payload.callerId,
    callerName:
      typeof payload.callerName === 'string' ? payload.callerName : undefined,
    audioOnly: payload.audioOnly === true,
    startedAt:
      typeof payload.startedAt === 'number' ? payload.startedAt : undefined,
  };
}

export function CallHandshakeProvider(props: ParentProps) {
  const p2p = useP2PContext();
  const auth = useAuth();
  const [handshakeState, setHandshakeState] =
    createSignal<CallHandshakeState>(null);
  const [isCalleeBusy, setIsCalleeBusy] = createSignal(false);

  const controller = new CallHandshakeController({
    p2p,
    createSignaling: createRoomSignaling,
    getCallerName: () => {
      const profile = getLoggedInUserProfile();
      const seed = getAuthProviderProfileSeed();
      return (
        profile?.displayName ||
        profile?.username ||
        seed?.displayName ||
        seed?.username ||
        'Unknown'
      );
    },
    onStateChange: setHandshakeState,
    onCalleeBusy: setIsCalleeBusy,
  });

  const incomingCall = (): MailboxInvite | null => {
    const state = handshakeState();
    return state && state.direction === 'incoming' ? state.call : null;
  };

  const outgoingCall = (): PendingOutgoingCall | null => {
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

  // Auto-answer when the app was opened from a push notification's explicit
  // "Accept" action (SW appends ?accept=1). No-ops on a plain body click or if
  // no matching invite arrives, falling back to the in-app dialog (one tap).
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const hasAcceptMarker = params.get('accept') === '1';
    const [queuedNotificationDetails, setQueuedNotificationDetails] =
      createSignal<IncomingCallNotificationDetails | null>(
        incomingCallNotificationDetailsFromParams(params),
      );
    const [wantAcceptRoomId, setWantAcceptRoomId] = createSignal<string | null>(
      ENABLE_NOTIFICATION_AUTO_ACCEPT && hasAcceptMarker
        ? params.get('conversationRoom')
        : null,
    );
    if (hasAcceptMarker) {
      // Strip the marker so a reload/back doesn't re-trigger the accept.
      params.delete('accept');
      const query = params.toString();
      window.history.replaceState(
        null,
        '',
        query
          ? `${window.location.pathname}?${query}`
          : window.location.pathname,
      );
    }

    const unsubscribeIncomingCallNotification = subscribe(
      'evt:call:notification:opened',
      (payload: IncomingCallNotificationOpenedPayload) => {
        const notificationDetails =
          incomingCallNotificationDetailsFromPayload(payload);
        if (notificationDetails) {
          setQueuedNotificationDetails(notificationDetails);
        }
        if (
          ENABLE_NOTIFICATION_AUTO_ACCEPT &&
          payload.accept &&
          typeof payload.roomId === 'string'
        ) {
          setWantAcceptRoomId(payload.roomId);
        }
      },
    );
    onCleanup(() => unsubscribeIncomingCallNotification());

    createEffect(() => {
      if (!auth.user()?.uid) return;
      const notificationDetails = queuedNotificationDetails();
      if (!notificationDetails) return;
      setQueuedNotificationDetails(null);
      controller.showIncomingCallFromNotification(notificationDetails);
    });

    createEffect(() => {
      const call = incomingCall();
      const roomId = wantAcceptRoomId();
      if (roomId && call?.roomId === roomId) {
        setWantAcceptRoomId(null);
        controller.acceptIncoming();
      }
    });
  }

  // Re-attach the incoming-call listener whenever the logged-in user changes.
  // A one-shot init at mount missed the common case where login completes
  // AFTER mount (the listener never attached → no incoming-call dialog until a
  // reload). Keying on the uid avoids tearing down an active call on unrelated
  // auth-state updates (e.g. token refresh) that don't change the user.
  let attachedUid: string | null | undefined;
  createEffect(() => {
    const uid = auth.user()?.uid ?? null;
    if (uid === attachedUid) return;

    attachedUid = uid;
    if (uid) {
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
