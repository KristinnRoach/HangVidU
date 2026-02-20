/**
 * Compress and downscale an image File using OffscreenCanvas.
 *
 * Iteratively reduces quality and dimensions until the result fits
 * within maxBytes. Tries WebP first, falls back to JPEG.
 *
 * @param {File} file - The image file to compress
 * @param {object} [opts]
 * @param {number} [opts.maxBytes=700_000] - Target max file size in bytes (accounts for base64 overhead)
 * @param {number} [opts.maxDimension=1280] - Starting max width or height in px
 * @returns {Promise<File|null>}
 */
export async function compressImage(
  file,
  { maxBytes = 700_000, maxDimension = 1280 } = {},
) {
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
  const ext = { 'image/webp': '.webp', 'image/jpeg': '.jpg' };
  const formats = ['image/webp', 'image/jpeg'];

  // Try progressively smaller dimensions and lower quality
  const steps = [
    { dim: maxDimension, q: 0.7 },
    { dim: maxDimension, q: 0.5 },
    { dim: 800, q: 0.6 },
    { dim: 800, q: 0.4 },
    { dim: 600, q: 0.5 },
    { dim: 600, q: 0.3 },
  ];

  for (const { dim, q } of steps) {
    const scale = Math.min(1, dim / Math.max(width, height));
    const tw = Math.round(width * scale);
    const th = Math.round(height * scale);

    const canvas = new OffscreenCanvas(tw, th);
    const ctx = canvas.getContext('2d');
    if (!ctx) continue;

    ctx.drawImage(bitmap, 0, 0, tw, th);

    for (const type of formats) {
      let blob;
      try {
        blob = await canvas.convertToBlob({ type, quality: q });
      } catch {
        continue;
      }

      if (blob.size <= maxBytes) {
        bitmap.close();
        const name = file.name.replace(/\.[^.]+$/, '') + ext[type];
        return new File([blob], name, { type });
      }
    }
  }

  bitmap.close();
  return null;
}
