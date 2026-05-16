/**
 * Builds deterministic conversation ID for a DM between two users.
 * The format is `dm:{sortedUserIdA}:{sortedUserIdB}`
 *
 */
export function buildDMConversationId(
  userIdA: string,
  userIdB: string,
): string {
  const [first, second] = [userIdA, userIdB].sort();
  return `dm:${first}:${second}`;
}
