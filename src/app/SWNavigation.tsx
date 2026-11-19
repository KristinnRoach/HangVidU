import { createEffect, on, onCleanup, onMount } from 'solid-js';
import { useAuth } from '@auth';
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

// call=1 marks an incoming-call link (from the SW call notification);
// its conversationId is the call room, not a conversation to open.
function isCallUrl(url: URL): boolean {
  return url.searchParams.get('call') === '1';
}

function dispatchUrl(url: URL): boolean | Promise<boolean> {
  const callConversationId = isCallUrl(url)
    ? trimmedParam(url.searchParams, 'conversationId')
    : null;
  if (callConversationId) {
    publish('evt:call:notification:opened', {
      callInviteId: trimmedParam(url.searchParams, 'callInviteId') ?? undefined,
      roomId: callConversationId,
      joinRoomId: trimmedParam(url.searchParams, 'joinRoomId') ?? undefined,
      callerId: trimmedParam(url.searchParams, 'callerId') ?? undefined,
      callerName: trimmedParam(url.searchParams, 'callerName') ?? undefined,
      audioOnly: url.searchParams.get('audioOnly') === '1',
      startedAt: optionalTimestamp(url.searchParams),
      accept: url.searchParams.get('accept') === '1',
    });
    return false;
  }

  const conversationId = trimmedParam(url.searchParams, 'conversationId');
  const contactId = trimmedParam(url.searchParams, 'contact');

  // Links may carry an opaque conversationId directly; open it as-is.
  if (conversationId) {
    openSelectedConversation(conversationId, { displayUI: true });
    return true;
  }

  if (!contactId) return false;

  // Contact-only links resolve-or-create the opaque id through the registry,
  // the same path the in-app open flow uses.
  return openDirectConversation(contactId, { displayUI: true });
}

/**
 * Routes conversation notifications from the launch URL or an SW NAVIGATE
 * message. Waits for sign-in and contacts so contact lookups succeed.
 */
export default function SWNavigation(props: Props = {}) {
  const { isLoggedIn, isLoggingOut } = useAuth();
  const canOpenConversation = () =>
    isLoggedIn() && !isLoggingOut() && getContactsIsHydrated();
  const queueLimit = props.queueLimit ?? DEFAULT_QUEUE_LIMIT;
  const pending: URL[] = [];

  createEffect(
    on(canOpenConversation, (ready) => {
      if (!ready) return;

      // The call provider handles incoming-call launch URLs separately.
      const launchUrl = new URL(window.location.href);
      if (
        !isCallUrl(launchUrl) &&
        (trimmedParam(launchUrl.searchParams, 'conversationId') ||
          trimmedParam(launchUrl.searchParams, 'contact'))
      ) {
        let active = true;
        onCleanup(() => {
          active = false;
        });
        void Promise.resolve(dispatchUrl(launchUrl)).then((opened) => {
          if (!opened || !active || window.location.href !== launchUrl.href)
            return;
          for (const name of ['conversationId', 'contact', 'kind']) {
            launchUrl.searchParams.delete(name);
          }
          window.history.replaceState(window.history.state, '', launchUrl);
        });
      }

      for (const url of pending) void dispatchUrl(url);
      pending.length = 0;
    }),
  );

  onMount(() => {
    if (!('serviceWorker' in navigator)) return;

    const handler = (event: MessageEvent) => {
      const data = event.data || {};
      if (data.type !== 'NAVIGATE' || !data.path) return;
      const url = new URL(data.path, window.location.origin);

      if (isCallUrl(url)) {
        void dispatchUrl(url);
        return;
      }

      if (!canOpenConversation()) {
        pending.push(url);
        if (pending.length > queueLimit) pending.shift();
        return;
      }

      void dispatchUrl(url);
    };

    navigator.serviceWorker.addEventListener('message', handler);
    navigator.serviceWorker.startMessages?.();

    onCleanup(() => {
      navigator.serviceWorker.removeEventListener('message', handler);
      pending.length = 0;
    });
  });

  return null;
}
