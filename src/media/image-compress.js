/**
 * Compress an image File using OffscreenCanvas.
 *
 * Tries WebP first (better compression), falls back to JPEG.
 * Returns a new File on success, or null if compression failed or
 * the result is larger than the original.
 *
 * @param {File} file - The image file to compress
 * @param {number} [quality=0.85] - Encoding quality (0–1)
 * @returns {Promise<File|null>}
 */
export async function compressImage(file, quality = 0.85) {
  let bitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return null; // Not a valid image
  }

  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    bitmap.close();
    return null;
  }

  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();

  const ext = { 'image/webp': '.webp', 'image/jpeg': '.jpg' };

  for (const type of ['image/webp', 'image/jpeg']) {
    let blob;
    try {
      blob = await canvas.convertToBlob({ type, quality });
    } catch {
      continue;
    }
    if (blob.size < file.size) {
      const name = file.name.replace(/\.[^.]+$/, '') + ext[type];
      return new File([blob], name, { type });
    }
  }

  return null; // Compression didn't help
}
