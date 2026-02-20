import { describe, it, expect } from 'vitest';
import { compressImage } from '../../src/media/image-compress.js';

/**
 * Create a test image File of the given format using a canvas.
 * Draws a colored rectangle so the image has non-trivial content.
 */
function createTestImage(format, mimeType, width = 4000, height = 3000) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#e74c3c';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = '#3498db';
  ctx.fillRect(100, 100, width - 200, height - 200);

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => resolve(new File([blob], `test.${format}`, { type: mimeType })),
      mimeType,
      0.95,
    );
  });
}

describe('compressImage', () => {
  it('compresses a PNG under maxBytes', async () => {
    const file = await createTestImage('png', 'image/png');
    const result = await compressImage(file);

    expect(result).not.toBeNull();
    expect(result.size).toBeLessThanOrEqual(950_000);

    const bitmap = await createImageBitmap(result);
    expect(bitmap.width).toBeLessThanOrEqual(1280);
    expect(bitmap.height).toBeLessThanOrEqual(1280);
    bitmap.close();
  });

  it('compresses a JPEG under maxBytes', async () => {
    const file = await createTestImage('jpg', 'image/jpeg');
    const result = await compressImage(file);

    expect(result).not.toBeNull();
    expect(result.size).toBeLessThanOrEqual(950_000);

    const bitmap = await createImageBitmap(result);
    expect(bitmap.width).toBeLessThanOrEqual(1280);
    expect(bitmap.height).toBeLessThanOrEqual(1280);
    bitmap.close();
  });

  it('compresses a WebP under maxBytes', async () => {
    const file = await createTestImage('webp', 'image/webp');
    const result = await compressImage(file);

    expect(result).not.toBeNull();
    expect(result.size).toBeLessThanOrEqual(950_000);

    const bitmap = await createImageBitmap(result);
    expect(bitmap.width).toBeLessThanOrEqual(1280);
    expect(bitmap.height).toBeLessThanOrEqual(1280);
    bitmap.close();
  });

  it('preserves aspect ratio when downscaling', async () => {
    const file = await createTestImage('png', 'image/png', 4000, 2000);
    const result = await compressImage(file);

    expect(result).not.toBeNull();
    const bitmap = await createImageBitmap(result);
    const ratio = bitmap.width / bitmap.height;
    expect(ratio).toBeCloseTo(2, 1);
    bitmap.close();
  });

  it('does not upscale small images', async () => {
    const file = await createTestImage('png', 'image/png', 200, 150);
    const result = await compressImage(file);

    expect(result).not.toBeNull();
    const bitmap = await createImageBitmap(result);
    expect(bitmap.width).toBe(200);
    expect(bitmap.height).toBe(150);
    bitmap.close();
  });

  it('respects custom maxBytes', async () => {
    const file = await createTestImage('png', 'image/png', 4000, 3000);
    const result = await compressImage(file, { maxBytes: 100_000 });

    expect(result).not.toBeNull();
    expect(result.size).toBeLessThanOrEqual(100_000);
  });

  it('respects custom maxDimension', async () => {
    const file = await createTestImage('png', 'image/png', 4000, 3000);
    const result = await compressImage(file, { maxDimension: 800 });

    expect(result).not.toBeNull();
    const bitmap = await createImageBitmap(result);
    expect(bitmap.width).toBeLessThanOrEqual(800);
    expect(bitmap.height).toBeLessThanOrEqual(800);
    bitmap.close();
  });

  it('returns null for non-image files', async () => {
    const file = new File(['not an image'], 'test.txt', { type: 'text/plain' });
    const result = await compressImage(file);
    expect(result).toBeNull();
  });

  it('handles fake HEIC gracefully (unsupported in Chromium)', async () => {
    const file = new File([new ArrayBuffer(1024)], 'test.heic', {
      type: 'image/heic',
    });
    const result = await compressImage(file);
    expect(result).toBeNull();
  });
});
