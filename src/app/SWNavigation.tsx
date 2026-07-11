import { createEffect, onCleanup, onMount } from 'solid-js';
import { getContactsIsHydrated } from '../stores/contacts-store';
import {
  openConversation as openSelectedConversation,
  openDirectConversation,
} from '../stores/conversation/conversation-store';
import { publish } from '@shared/events/index.js';

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

function optionalTimestamp(searchParams: URLSearchParams): number | undefined {
  const rawTimestamp = searchParams.get('timestamp');
  if (rawTimestamp == null) return undefined;
  const timestamp = Number(rawTimestamp);
  return Number.isFinite(timestamp) ? timestamp : undefined;
}

function dispatchUrl(url: URL): void {
  const conversationRoomId = trimmedParam(url.searchParams, 'conversationRoom');
  if (conversationRoomId) {
    publish('evt:call:notification:opened', {
      roomId: conversationRoomId,
      callerId: trimmedParam(url.searchParams, 'callerId') ?? undefined,
      callerName: trimmedParam(url.searchParams, 'callerName') ?? undefined,
      audioOnly: url.searchParams.get('audioOnly') === '1',
      startedAt: optionalTimestamp(url.searchParams),
      accept: url.searchParams.get('accept') === '1',
    });
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

function dispatchPath(path: string): void {
  dispatchUrl(new URL(path, window.location.origin));
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
      const url = new URL(data.path, window.location.origin);

      if (trimmedParam(url.searchParams, 'conversationRoom')) {
        dispatchUrl(url);
        return;
      }

      if (!getContactsIsHydrated()) {
        pending.push(data.path);
        if (pending.length > queueLimit) pending.shift();
        return;
      }

      dispatchUrl(url);
    };

    navigator.serviceWorker.addEventListener('message', handler);

    onCleanup(() => {
      navigator.serviceWorker.removeEventListener('message', handler);
      pending.length = 0;
    });
  });

  return null;
}
