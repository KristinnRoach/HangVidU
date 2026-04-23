const DEFAULT_ID_ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789';
const DEFAULT_ID_LENGTH = 7;

/**
 * Generate a short random ID.
 * Uses the Web Crypto API so codes are unpredictable.
 *
 * @param {Object} options - Configuration options
 * @param {string} [options.id_alphabet] - Custom alphabet to use for ID generation (default: lowercase letters + digits)
 * @param {number} [options.id_length] - Desired length of the generated ID (default: 7)
 *
 * @returns {string} N-char lowercase base36 ID.
 */
export function generateRandomId(options = {}) {
  const { id_alphabet, id_length } = options;
  const alphabet = id_alphabet || DEFAULT_ID_ALPHABET;
  const length = id_length || DEFAULT_ID_LENGTH;

  let out = '';
  const alphabetLen = DEFAULT_ID_ALPHABET.length;
  const maxUnbiased = Math.floor(256 / alphabetLen) * alphabetLen;
  const bytes = new Uint8Array(DEFAULT_ID_LENGTH * 2);

  while (out.length < DEFAULT_ID_LENGTH) {
    globalThis.crypto.getRandomValues(bytes);
    for (let i = 0; i < bytes.length && out.length < DEFAULT_ID_LENGTH; i++) {
      const byte = bytes[i];
      if (byte < maxUnbiased) {
        out += DEFAULT_ID_ALPHABET[byte % alphabetLen];
      }
    }
  }
  return out;
}
