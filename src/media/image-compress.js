/**
 * Compress and downscale an image File using OffscreenCanvas.
 *
 * Downscales to fit within maxDimension (preserving aspect ratio),
 * then tries WebP first (better compression), falls back to JPEG.
 *
 * @param {File} file - The image file to compress
 * @param {object} [opts]
 * @param {number} [opts.quality=0.7] - Encoding quality (0–1)
 * @param {number} [opts.maxDimension=1280] - Max width or height in px
 * @returns {Promise<File|null>}
 */
export async function compressImage(file, { quality = 0.7, maxDimension = 1280 } = {}) {
  let bitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return null;
  }

  if (typeof OffscreenCanvas === 'undefined') {
    bitmap.close();
    return null;
  }

  const { width, height } = bitmap;
  const scale = Math.min(1, maxDimension / Math.max(width, height));
  const targetW = Math.round(width * scale);
  const targetH = Math.round(height * scale);

  const canvas = new OffscreenCanvas(targetW, targetH);
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    bitmap.close();
    return null;
  }

  ctx.drawImage(bitmap, 0, 0, targetW, targetH);
  bitmap.close();

  const ext = { 'image/webp': '.webp', 'image/jpeg': '.jpg' };

  for (const type of ['image/webp', 'image/jpeg']) {
    let blob;
    try {
      blob = await canvas.convertToBlob({ type, quality });
    } catch {
      continue;
    }
    const name = file.name.replace(/\.[^.]+$/, '') + ext[type];
    return new File([blob], name, { type });
  }

  return null;
}
