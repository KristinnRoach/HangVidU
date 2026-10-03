import { afterEach, expect, it, vi } from 'vite-plus/test';

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

it('shares preloading and reuses the ready model after detection stops', async () => {
  vi.resetModules();
  const mesh = { ready: Promise.resolve(), detectStop: vi.fn() };
  const faceMesh = vi.fn(() => mesh);
  vi.stubGlobal('window', { ml5: { faceMesh } });
  const scripts = [];
  vi.spyOn(document.head, 'append').mockImplementation((script) => {
    scripts.push(script.src);
    queueMicrotask(() => script.onload());
  });
  const { preloadFaceMask } = await import('./face-mask');
  const first = preloadFaceMask();
  expect(preloadFaceMask()).toBe(first);
  expect((await first).mesh).toBe(mesh);
  mesh.detectStop();
  expect((await preloadFaceMask()).mesh).toBe(mesh);
  expect(faceMesh).toHaveBeenCalledOnce();
  expect(scripts).toHaveLength(2);
});
