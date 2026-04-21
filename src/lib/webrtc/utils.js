// src/lib/webrtc/utils.js

const ROOM_ID_ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789';
const ROOM_ID_LENGTH = 7;

/**
 * Generate a short random room ID suitable for use as a signaling key.
 * Uses the Web Crypto API so invite codes are unpredictable.
 * @returns {string} 7-char lowercase base36 ID.
 */
export function generateRoomId() {
  const bytes = new Uint8Array(ROOM_ID_LENGTH);
  globalThis.crypto.getRandomValues(bytes);
  let out = '';
  for (let i = 0; i < ROOM_ID_LENGTH; i++) {
    out += ROOM_ID_ALPHABET[bytes[i] % ROOM_ID_ALPHABET.length];
  }
  return out;
}
