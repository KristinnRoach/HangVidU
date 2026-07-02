import { describe, it, expect } from 'vite-plus/test';
import { compressImage } from '../../src/lib/media/image-compress.js';

// Resolve optional HEIC fixtures without hard-failing when they are absent.
const heicFileUrls = import.meta.glob(
  '../../src/media/test-images/*.{heic,HEIC}',
  {
    query: '?url',
    import: 'default',
    eager: true,
  },
);
const heicFiles = Object.entries(heicFileUrls).map(([path, url]) => ({
  name: path.split('/').pop(),
  url,
}));

async function loadTestFile({ name, url }) {
  const res = await fetch(url);
  const blob = await res.blob();
  return new File([blob], name, { type: 'image/heic' });
}

const suite = heicFiles.length > 0 ? describe : describe.skip;

suite('compressImage — real HEIC files', () => {
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
        console.warn(
          `[${entry.name}] compressImage returned null — format unsupported in this browser`,
        );
      }
    });
  }
});
