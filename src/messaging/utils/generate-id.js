// src/messaging/utils/generate-id.js
// Transport-agnostic message ID generation

/**
 * Generate a unique, time-sortable ID.
 *
 * Format: `{base36 timestamp}-{random}` (e.g. "m1abc23-7f3a9b1c")
 *
 * - Time prefix ensures chronological key ordering (important for RTDB
 *   child_added which fires in key order on initial load).
 * - Random suffix from crypto.getRandomValues prevents collisions.
 * - No dependency on Firebase push() or any external service.
 *
 * @returns {string} Unique, time-sortable ID
 */
export function generateId() {
  const timePart = Date.now().toString(36);
  const randomPart = crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
  return `${timePart}-${randomPart}`;
}
