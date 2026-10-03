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

it.each([false, true])(
  'captures and animates after switching to detection: %s',
  async (switchToDetection) => {
    let mode = 'outline';
    vi.resetModules();
    let sketch;
    let detect;
    let capture;
    const track = { stop: vi.fn() };
    const drawImage = vi.fn();
    const liveDrawImage = vi.fn();
    const vertex = vi.fn();
    const mesh = {
      ready: Promise.resolve(),
      detectStart: vi.fn((_video, callback) => {
        detect = callback;
      }),
      detectStop: vi.fn(),
      getTriangles: () => [[0, 1, 2]],
    };
    const outputCanvas = document.createElement('canvas');
    outputCanvas.captureStream = () => ({ getVideoTracks: () => [track] });
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
    vi.spyOn(HTMLVideoElement.prototype, 'videoWidth', 'get').mockReturnValue(
      640,
    );
    vi.spyOn(HTMLVideoElement.prototype, 'videoHeight', 'get').mockReturnValue(
      480,
    );
    vi.stubGlobal('MediaStream', class {});
    vi.stubGlobal('window', {
      ml5: { faceMesh: () => mesh },
      p5: class {
        constructor(init) {
          sketch = {
            createCanvas: () => ({ elt: outputCanvas }),
            createGraphics: vi
              .fn(() => ({
                canvas: {
                  getContext: () => ({
                    drawImage: liveDrawImage,
                    fillRect: vi.fn(),
                    clearRect: vi.fn(),
                    save: vi.fn(),
                    beginPath: vi.fn(),
                    moveTo: vi.fn(),
                    lineTo: vi.fn(),
                    closePath: vi.fn(),
                    clip: vi.fn(),
                    restore: vi.fn(),
                  }),
                },
                remove: vi.fn(),
              }))
              .mockImplementationOnce(() => ({
                canvas: { getContext: () => ({ drawImage }) },
                remove: vi.fn(),
              })),
            frameRate: vi.fn(),
            textureMode: vi.fn(),
            translate: vi.fn(),
            background: vi.fn(),
            image: vi.fn(),
            texture: vi.fn(),
            noStroke: vi.fn(),
            beginShape: vi.fn(),
            vertex,
            endShape: vi.fn(),
            remove: vi.fn(),
          };
          init(sketch);
          sketch.setup();
          return sketch;
        }
      },
    });
    vi.spyOn(document.head, 'append').mockImplementation((script) =>
      queueMicrotask(() => script.onload()),
    );
    const { createFaceMask } = await import('./face-mask');
    const controller = new AbortController();
    const pending = createFaceMask(
      {},
      controller.signal,
      () => {},
      (action) => {
        capture = action;
      },
      () => mode,
    );
    await vi.waitFor(() => expect(capture).toBeTypeOf('function'));
    detect([]);
    expect(capture).toBeTypeOf('function');
    if (switchToDetection) {
      mode = 'detected';
      detect([]);
      expect(capture).toBeUndefined();
      detect([
        {
          keypoints: [
            { x: 10, y: 20 },
            { x: 30, y: 40 },
            { x: 50, y: 60 },
            ...Array.from({ length: 465 }, () => ({ x: 50, y: 60 })),
          ],
        },
      ]);
      expect(capture).toBeTypeOf('function');
    }
    capture();
    detect([]);
    expect(drawImage).toHaveBeenCalledOnce();
    sketch.draw();
    const mask = await pending;
    expect(mask.track).toBe(track);
    expect(vertex).not.toHaveBeenCalled();
    detect([
      {
        keypoints: [
          { x: 10, y: 20 },
          { x: 30, y: 40 },
          { x: 50, y: 60 },
          ...Array.from({ length: 465 }, () => ({ x: 50, y: 60 })),
        ],
      },
    ]);
    sketch.draw();
    expect(vertex).toHaveBeenCalledTimes(3);
    if (switchToDetection)
      expect(vertex).toHaveBeenNthCalledWith(1, 10, 20, 10 / 640, 20 / 480);
    expect(drawImage).toHaveBeenCalledOnce();
    mask.dispose();
    expect(mesh.detectStop).toHaveBeenCalledOnce();
    expect(track.stop).toHaveBeenCalledOnce();
  },
);

it('keeps the outline proportions independent of camera aspect ratio', async () => {
  const { captureOutline } = await import('./capture-template');
  const bounds = (aspect) => {
    const points = captureOutline(aspect)
      .split(' ')
      .map((point) => point.split(',').map(Number));
    const xs = points.map(([x]) => x);
    const ys = points.map(([, y]) => y);
    return {
      width: Math.max(...xs) - Math.min(...xs),
      height: Math.max(...ys) - Math.min(...ys),
    };
  };
  const landscape = bounds(16 / 9);
  const portrait = bounds(9 / 16);
  expect(landscape.width).toBeCloseTo(portrait.width);
  expect(landscape.height).toBeCloseTo(portrait.height);
  expect(landscape.height).toBeGreaterThan(landscape.width);
});
