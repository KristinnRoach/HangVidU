export function resolveDirectConversationId(userA, userB) {
  const participants = [userA, userB]
    .map((value) => String(value || '').trim())
    .filter(Boolean);

  if (participants.length !== 2) {
    throw new Error(
      'resolveDirectConversationId requires exactly 2 participant ids',
    );
  }

  return participants.sort().join('_');
}
