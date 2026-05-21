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

  const safeMaxDim = sanitizeMaxDimension(maxDimension);

  if (safeMaxDim === null) {
    bitmap.close();
    return null;
  }

  // Try progressively smaller dimensions and lower quality
  const d1 = Math.min(800, safeMaxDim);
  const d2 = Math.min(600, safeMaxDim);
  const steps = [
    { dim: safeMaxDim, q: 0.7 },
    { dim: safeMaxDim, q: 0.5 },
    { dim: d1, q: 0.6 },
    { dim: d1, q: 0.4 },
    { dim: d2, q: 0.5 },
    { dim: d2, q: 0.3 },
  ];

  let canvas = null;
  let ctx = null;
  let lastDim = -1;

  for (const { dim, q } of steps) {
    if (dim !== lastDim) {
      const scale = Math.min(1, dim / Math.max(width, height));
      const tw = Math.round(width * scale);
      const th = Math.round(height * scale);
      canvas = new OffscreenCanvas(tw, th);
      ctx = canvas.getContext('2d');
      ctx?.drawImage(bitmap, 0, 0, tw, th);
      lastDim = dim;
    }
    if (!ctx) continue;

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

function sanitizeMaxDimension(dim) {
  const MIN_DIM = 16;
  const MAX_DIM = 8192;

  if (!Number.isFinite(dim) || dim <= 0) {
    console.warn('[compressImage] Invalid dimension - skipping this step.');
    return null;
  }
  if (dim < MIN_DIM) {
    console.debug('compressImage received very small dimension, clamping.');
    return MIN_DIM;
  }
  if (dim > MAX_DIM) {
    console.debug('compressImage received too large dimension, clamping.');
    return MAX_DIM;
  }

  return dim;
}
