import { createEffect, onCleanup, onMount } from 'solid-js';
import {
  getContactById,
  getContactsIsHydrated,
  getConversationId,
} from '../../stores/contactsStore';
import type { ConversationSelection } from '../messaging-next/interfaces.js';

type Props = {
  onNavigate: (selection: ConversationSelection) => void;
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

function resolveSelection(path: string): ConversationSelection | null {
  const url = new URL(path, window.location.origin);
  const conversationId = trimmedParam(url.searchParams, 'conversationId');
  const contactId = trimmedParam(url.searchParams, 'contact');

  if (conversationId) {
    const contact = contactId ? getContactById(contactId) : null;
    return {
      conversationId,
      remoteParticipantIds: contactId ? [contactId] : [],
      displayUI: true,
      contactNickName: contact?.contactNickName ?? undefined,
    };
  }

  if (!contactId) return null;

  const resolvedConversationId = getConversationId(contactId);
  if (!resolvedConversationId) return null;

  const contact = getContactById(contactId);
  return {
    conversationId: resolvedConversationId,
    remoteParticipantIds: [contactId],
    displayUI: true,
    contactNickName: contact?.contactNickName ?? undefined,
  };
}

/**
 * Listens for SW NAVIGATE messages (posted by the SW notification-click
 * handler when the user taps a push notification) and routes them to the
 * provided onNavigate callback. Queues until contacts are hydrated so
 * room/contact lookups can succeed.
 *
 * Renders nothing.
 */
export default function SWNavigation(props: Props) {
  const queueLimit = props.queueLimit ?? DEFAULT_QUEUE_LIMIT;
  const pending: string[] = [];

  const dispatchPath = (path: string) => {
    const selection = resolveSelection(path);
    if (selection) props.onNavigate(selection);
  };

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
