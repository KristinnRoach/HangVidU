import { createEffect, onCleanup, onMount } from 'solid-js';
import { getContactsIsHydrated } from '../stores/contacts-store';
import {
  openConversation as openSelectedConversation,
  openDirectConversation,
} from '../stores/conversation/conversation-store';

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

function conversationRoomParam(searchParams: URLSearchParams): string | null {
  return (
    trimmedParam(searchParams, 'conversationRoom') ??
    // Legacy name used by earlier incoming-call push notifications.
    trimmedParam(searchParams, 'callRoom')
  );
}

function isCallNavigationPath(path: string): boolean {
  const url = new URL(path, window.location.origin);
  return Boolean(conversationRoomParam(url.searchParams));
}

function dispatchPath(path: string) {
  const url = new URL(path, window.location.origin);
  const conversationRoomId = conversationRoomParam(url.searchParams);
  if (conversationRoomId) {
    const timestamp = Number(url.searchParams.get('timestamp'));
    window.dispatchEvent(
      new CustomEvent('hangvidu:incoming-call-notification', {
        detail: {
          roomId: conversationRoomId,
          callerId: trimmedParam(url.searchParams, 'callerId') ?? undefined,
          callerName: trimmedParam(url.searchParams, 'callerName') ?? undefined,
          audioOnly: url.searchParams.get('audioOnly') === '1',
          timestamp: Number.isFinite(timestamp) ? timestamp : undefined,
          accept: url.searchParams.get('accept') === '1',
        },
      }),
    );
    return;
  }

  const conversationId = trimmedParam(url.searchParams, 'conversationId');
  const contactId = trimmedParam(url.searchParams, 'contact');

  // Links may carry an opaque conversationId directly; open it as-is.
  if (conversationId) {
    openSelectedConversation(conversationId, { displayUI: true });
    return;
  }

  if (!contactId) return;

  // Contact-only links resolve-or-create the opaque id through the registry,
  // the same path the in-app open flow uses.
  void openDirectConversation(contactId, { displayUI: true });
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

      if (isCallNavigationPath(data.path)) {
        dispatchPath(data.path);
        return;
      }

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
