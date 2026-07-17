import { createEffect, createSignal, onCleanup } from 'solid-js';
import { observePresence as watchUserPresence } from '../presence-rtdb-adapter.js';

type PresenceIndicatorProps = {
  userId: string;
  class?: string; // additional classes merged with the base .presence-indicator
};

/**
 * Standalone presence dot. Given a userId, it watches that user's presence and
 * reflects online/offline via a class. Drop it anywhere — no external wiring.
 *
 * Props:
 *   userId: string - (required)
 *   class?: string - additional classes merged with the base .presence-indicator
 */
export function PresenceIndicator(props: PresenceIndicatorProps) {
  const [isOnline, setIsOnline] = createSignal(false);
  let unsubscribe: Function | null = null;

  createEffect(() => {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }

    if (!props.userId) {
      setIsOnline(false);
      return;
    }

    unsubscribe = watchUserPresence(
      props.userId,
      (presence: { state: 'online' | 'offline' }) => {
        setIsOnline(presence?.state === 'online');
      },
    );
  });

  onCleanup(() => {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
  });

  return (
    <span
      class={`presence-indicator ${props.class ?? ''}`}
      classList={{ online: isOnline() }}
      title={isOnline() ? 'Online' : 'Offline'}
      data-contact-id={props.userId}
    />
  );
}
