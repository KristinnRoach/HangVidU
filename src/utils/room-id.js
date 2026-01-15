// src/utils/room-id.js
// Deterministic room ID generation for user pairs

/**
 * Generate a deterministic room ID for two users.
 * Ensures both users always get the same room ID regardless of who initiates.
 * 
 * @param {string} userId1 - First user ID
 * @param {string} userId2 - Second user ID
 * @returns {string} - Deterministic room ID (16 characters)
 */
export function getDeterministicRoomId(userId1, userId2) {
  if (!userId1 || !userId2) {
    throw new Error('Both user IDs are required');
  }

  if (userId1 === userId2) {
    throw new Error('Cannot create room ID for same user');
  }

  // Sort IDs alphabetically to ensure consistent ordering
  const [first, second] = [userId1, userId2].sort();

  // Concatenate sorted IDs
  const combined = `${first}_${second}`;

  // Create a simple deterministic hash from the combined string
  // Using a basic hash function for consistency
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  // Create a second hash for more entropy
  let hash2 = 5381;
  for (let i = 0; i < combined.length; i++) {
    hash2 = ((hash2 << 5) + hash2) + combined.charCodeAt(i);
  }

  // Convert both hashes to base36 and combine
  const part1 = Math.abs(hash).toString(36);
  const part2 = Math.abs(hash2).toString(36);
  
  // Combine and ensure exactly 16 characters
  const roomId = (part1 + part2).slice(0, 16).padEnd(16, '0');

  return roomId;
}
