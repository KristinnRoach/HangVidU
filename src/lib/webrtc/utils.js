// src/lib/webrtc/utils.js

const ROOM_ID_ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789';
const ROOM_ID_LENGTH = 7;

/**
 * Generate a short random room ID suitable for use as a signaling key.
 * Uses the Web Crypto API so invite codes are unpredictable.
 * @returns {string} 7-char lowercase base36 ID.
 */
export function generateRoomId() {
  let out = '';
  const alphabetLen = ROOM_ID_ALPHABET.length;
  const maxUnbiased = Math.floor(256 / alphabetLen) * alphabetLen;
  const bytes = new Uint8Array(ROOM_ID_LENGTH * 2);

  while (out.length < ROOM_ID_LENGTH) {
    globalThis.crypto.getRandomValues(bytes);
    for (let i = 0; i < bytes.length && out.length < ROOM_ID_LENGTH; i++) {
      const byte = bytes[i];
      if (byte < maxUnbiased) {
        out += ROOM_ID_ALPHABET[byte % alphabetLen];
      }
    }
  }
  return out;
}
