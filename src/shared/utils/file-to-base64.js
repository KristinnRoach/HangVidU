/**
 * Convert a File/Blob to a base64 data URL string.
 * @param {File|Blob} file
 * @returns {Promise<string>} base64 data URL
 */
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
