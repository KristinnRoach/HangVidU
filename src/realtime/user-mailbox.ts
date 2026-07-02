// The logged-in user's mailbox connection — one socket, shared by every consumer
// (call invites + conversation activity). The underlying channel already
// multiplexes handlers, but each `createMailboxChannel` opens its own socket;
// this singleton keeps a single socket and fans every envelope to all
// subscribers.
//
// Keyed by uid: switching users must re-auth a fresh socket (the DO binds the
// connection to whoever the upgrade token identifies). closeUserMailbox drops it
// on logout/user-switch; consumers subscribed across that boundary must
// resubscribe afterwards.

import { createMailboxChannel, type MailboxChannel } from './mailbox-channel';
import type { MailboxEnvelope } from '../../shared/user-mailbox/protocol';

export interface UserMailboxOptions {
  /** Current user; null is tolerated pre-login (socket waits for a token). */
  localUID: string | null;
  baseUrl: string;
  getToken: () => Promise<string | null>;
}

const handlers = new Set<(e: MailboxEnvelope) => void>();
let channel: MailboxChannel | null = null;
let channelUid: string | null = null;
let unbind: (() => void) | null = null;

function ensureChannel(opts: UserMailboxOptions): void {
  if (channel && channelUid === opts.localUID) return;
  unbind?.();
  channel?.close();
  channel = createMailboxChannel({
    baseUrl: opts.baseUrl,
    getToken: opts.getToken,
  });
  channelUid = opts.localUID;
  unbind = channel.onEnvelope((e) => handlers.forEach((h) => h(e)));
}

/** Subscribe to the user's mailbox, (re)opening the socket as needed. */
export function subscribeToUserMailbox(
  opts: UserMailboxOptions,
  handler: (e: MailboxEnvelope) => void,
): () => void {
  ensureChannel(opts);
  handlers.add(handler);
  return () => handlers.delete(handler);
}

/** Tear down the socket and drop all subscriptions (logout/user-switch). */
export function closeUserMailbox(): void {
  unbind?.();
  unbind = null;
  channel?.close();
  channel = null;
  channelUid = null;
  handlers.clear();
}
