import { createSignal, onCleanup, onMount } from 'solid-js';
import { watchUserPresence } from '../../features/presence/index.js';

/**
 * Standalone presence dot. Given a userId, it watches that user's presence and
 * reflects online/offline via a class. Drop it anywhere — no external wiring.
 *
 * Props:
 *   userId: string (required)
 *   class?: string    additional classes merged with the base .presence-indicator
 */
export default function PresenceIndicator(props) {
  const [isOnline, setIsOnline] = createSignal(false);
  let unsubscribe = null;

  onMount(() => {
    if (!props.userId) return;
    unsubscribe = watchUserPresence(props.userId, (presence) => {
      setIsOnline(presence?.state === 'online');
    });
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
