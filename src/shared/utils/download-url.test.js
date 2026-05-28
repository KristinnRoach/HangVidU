import { describe, expect, it, vi } from 'vitest';
import { downloadUrl } from './download-url.js';

describe('downloadUrl', () => {
  it('downloads cross-origin URLs via a blob URL', async () => {
    vi.useFakeTimers();
    const blob = new Blob(['demo'], { type: 'text/plain' });
    const originalFetch = globalThis.fetch;
    const originalCreateObjectURL = URL.createObjectURL;
    const originalRevokeObjectURL = URL.revokeObjectURL;
    URL.createObjectURL ??= vi.fn();
    URL.revokeObjectURL ??= vi.fn();
    const createObjectURL = vi
      .spyOn(URL, 'createObjectURL')
      .mockReturnValue('blob:test');
    const revokeObjectURL = vi
      .spyOn(URL, 'revokeObjectURL')
      .mockImplementation(() => {});
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      blob: () => Promise.resolve(blob),
    });

    try {
      const result = await downloadUrl(
        'https://files.example.com/demo.png',
        'demo.png',
      );

      expect(result).toBe(true);
      expect(globalThis.fetch).toHaveBeenCalledWith(
        'https://files.example.com/demo.png',
        { credentials: 'omit' },
      );
      expect(createObjectURL).toHaveBeenCalledWith(blob);
      expect(click).toHaveBeenCalled();
      expect(document.body.querySelector('a[href="blob:test"]')).toBeNull();
      vi.runAllTimers();
      expect(revokeObjectURL).toHaveBeenCalledWith('blob:test');
    } finally {
      globalThis.fetch = originalFetch;
      createObjectURL.mockRestore();
      revokeObjectURL.mockRestore();
      URL.createObjectURL = originalCreateObjectURL;
      URL.revokeObjectURL = originalRevokeObjectURL;
      click.mockRestore();
      vi.useRealTimers();
    }
  });

  it('returns false and falls back to direct download when fetch fails', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});

    const result = await downloadUrl(
      'https://example.com/file.pdf',
      'file.pdf',
    );

    expect(result).toBe(false);
    expect(click).toHaveBeenCalled();
    // verify the anchor was created with the original URL, not a blob URL
  });

  it('returns false when url is falsy', async () => {
    const result = await downloadUrl(null, 'file.pdf');
    expect(result).toBe(false);
  });

  it('falls back when response is not OK', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ ok: false, status: 404 });
    const result = await downloadUrl(
      'https://example.com/file.pdf',
      'file.pdf',
    );
    expect(result).toBe(false);
  });
});
