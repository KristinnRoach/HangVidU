// src/lib/webrtc/utils.js

/**
 * Generate a short random room ID suitable for use as a signaling key.
 * @returns {string}
 */
export function generateRoomId() {
  return Math.random().toString(36).substring(2, 9);
}
