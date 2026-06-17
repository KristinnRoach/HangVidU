import { createEffect, onCleanup, onMount } from 'solid-js';
import {
  getContactById,
  getContactsIsHydrated,
} from '../../stores/contactsStore';
import {
  open as openSelectedConversation,
  openDirectConversation,
} from '../../stores/selectedConversationStore';

type Props = {
  queueLimit?: number;
};

const DEFAULT_QUEUE_LIMIT = 20;

function trimmedParam(
  searchParams: URLSearchParams,
  name: string,
): string | null {
  const value = searchParams.get(name);
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function dispatchPath(path: string) {
  const url = new URL(path, window.location.origin);
  const conversationId = trimmedParam(url.searchParams, 'conversationId');
  const contactId = trimmedParam(url.searchParams, 'contact');

  // Links may carry an opaque conversationId directly; open it as-is.
  if (conversationId) {
    const contact = contactId ? getContactById(contactId) : null;
    openSelectedConversation({
      conversationId,
      remoteParticipantIds: contactId ? [contactId] : [],
      displayUI: true,
      contactNickName: contact?.contactNickName ?? undefined,
    });
    return;
  }

  if (!contactId) return;

  // Contact-only links resolve-or-create the opaque id through the registry,
  // the same path the in-app open flow uses.
  const contact = getContactById(contactId);
  void openDirectConversation(contactId, {
    displayUI: true,
    contactNickName: contact?.contactNickName ?? undefined,
  });
}

/**
 * Listens for SW NAVIGATE messages (posted by the SW notification-click
 * handler when the user taps a push notification) and opens the resolved
 * conversation. Queues until contacts are hydrated so contact lookups succeed.
 *
 * Renders nothing.
 */
export default function SWNavigation(props: Props = {}) {
  const queueLimit = props.queueLimit ?? DEFAULT_QUEUE_LIMIT;
  const pending: string[] = [];

  const flushPending = () => {
    while (pending.length > 0) {
      const path = pending.shift();
      if (path) dispatchPath(path);
    }
  };

  // Flush queued paths once contacts have hydrated.
  createEffect(() => {
    if (getContactsIsHydrated()) flushPending();
  });

  onMount(() => {
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker.startMessages?.();

    const handler = (event: MessageEvent) => {
      const data = event.data || {};
      if (data.type !== 'NAVIGATE' || !data.path) return;

      if (!getContactsIsHydrated()) {
        pending.push(data.path);
        if (pending.length > queueLimit) pending.shift();
        return;
      }

      dispatchPath(data.path);
    };

    navigator.serviceWorker.addEventListener('message', handler);

    onCleanup(() => {
      navigator.serviceWorker.removeEventListener('message', handler);
      pending.length = 0;
    });
  });

  return null;
}
