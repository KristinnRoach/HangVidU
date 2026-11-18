// Conversation IDs are also UUIDs. Reserve a separate namespace for
// per-call contact rooms so a conversation ID never qualifies for sharing.
const CALL_ROOM_PREFIX = 'call-';
const ROOM_ROUTED_INVITE_PREFIX = 'room-invite-';
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function createCallScopedRoomId(): string {
  return CALL_ROOM_PREFIX + crypto.randomUUID();
}

export function isCallScopedRoomId(id: string | undefined): boolean {
  return Boolean(
    id?.startsWith(CALL_ROOM_PREFIX) &&
    UUID_RE.test(id.slice(CALL_ROOM_PREFIX.length)),
  );
}

// Push notifications carry the invite ID through to cached clients. Keep
// the routing marker on that ID without putting the signaling ID in push.
export function createRoomRoutedInviteId(): string {
  return ROOM_ROUTED_INVITE_PREFIX + crypto.randomUUID();
}

export function isRoomRoutedInviteId(id: string): boolean {
  return (
    id.startsWith(ROOM_ROUTED_INVITE_PREFIX) &&
    UUID_RE.test(id.slice(ROOM_ROUTED_INVITE_PREFIX.length))
  );
}

export function publicRoomIdFromUrl(link: string): string | null {
  try {
    const url = new URL(link.trim());
    const id = url.searchParams.get('publicRoom');
    return /^https?:$/.test(url.protocol) &&
      id &&
      (UUID_RE.test(id) || isCallScopedRoomId(id))
      ? id
      : null;
  } catch {
    return null;
  }
}

export function roomInviteUrl(roomId: string): string {
  const url = new URL('/', window.location.origin);
  url.searchParams.set('publicRoom', roomId);
  return url.href;
}
