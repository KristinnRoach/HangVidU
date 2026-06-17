// Reverse-derives the other participant from a legacy `a_b` conversation id.
// Best-effort fallback for selections that arrive without participant ids (old
// push deep links); opaque registry ids have no `_` and return null here.
export function resolveContactIdFromDirectConversationId(
  conversationId,
  myUserId,
) {
  const participantIds = conversationId.split('_');
  if (participantIds.length !== 2) {
    console.warn('[CONTACTS] Invalid conversation ID format:', conversationId);
    return null;
  }

  const otherUserId = participantIds.find((id) => id !== myUserId);
  if (!otherUserId) {
    console.warn(
      '[CONTACTS] My user ID not found in conversation ID:',
      conversationId,
    );
    return null;
  }

  return otherUserId;
}
