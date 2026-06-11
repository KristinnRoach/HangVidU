// TODO:
/* still derives the other participant via conversationId.split('_'). 
That can break if user IDs contain underscores. 
Fixing it properly likely needs either a safer encoded ID 
format or passing participant IDs from conversation metadata

If this ID pattern changes, migrate pre-existing direct conversation IDs
and any references stored against them.
*/

export function deriveLegacyDirectConversationId(userA, userB) {
  const participants = [userA, userB]
    .map((value) => String(value || '').trim())
    .filter(Boolean);

  if (participants.length !== 2) {
    throw new Error(
      'deriveLegacyDirectConversationId requires exactly 2 participant ids',
    );
  }

  return participants.sort().join('_');
}

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
