import { describe, it, expect } from 'vitest';
import { compressImage } from '../../src/media/image-compress.js';

// Vite ?url imports — resolved to servable asset URLs at build time
import img0164 from '../../src/media/test-images/IMG_0164.heic?url';
import img0169 from '../../src/media/test-images/IMG_0169.heic?url';
import img1339 from '../../src/media/test-images/IMG_1339.HEIC?url';
import img1503 from '../../src/media/test-images/IMG_1503.heic?url';
import img1632 from '../../src/media/test-images/IMG_1632.heic?url';
import img7566 from '../../src/media/test-images/IMG_7566.HEIC?url';

const heicFiles = [
  { name: 'IMG_0164.heic', url: img0164 },
  { name: 'IMG_0169.heic', url: img0169 },
  { name: 'IMG_1339.HEIC', url: img1339 },
  { name: 'IMG_1503.heic', url: img1503 },
  { name: 'IMG_1632.heic', url: img1632 },
  { name: 'IMG_7566.HEIC', url: img7566 },
];

async function loadTestFile({ name, url }) {
  const res = await fetch(url);
  const blob = await res.blob();
  return new File([blob], name, { type: 'image/heic' });
}

describe('compressImage — real HEIC files', () => {
  for (const entry of heicFiles) {
    it(`compresses ${entry.name}`, async () => {
      const file = await loadTestFile(entry);
      console.log(
        `[${entry.name}] input: ${(file.size / 1024).toFixed(0)}KB, type="${file.type}"`,
      );

      const result = await compressImage(file);

      if (result) {
        const bitmap = await createImageBitmap(result);
        console.log(
          `[${entry.name}] output: ${(result.size / 1024).toFixed(0)}KB, ` +
            `type="${result.type}", ${bitmap.width}x${bitmap.height}`,
        );
        expect(result.size).toBeLessThanOrEqual(700_000);
        expect(bitmap.width).toBeLessThanOrEqual(1280);
        expect(bitmap.height).toBeLessThanOrEqual(1280);
        bitmap.close();
      } else {
        console.warn(`[${entry.name}] compressImage returned null — format unsupported in this browser`);
      }
    });
  }
});
