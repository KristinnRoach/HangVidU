import { afterEach, expect, it, vi } from 'vite-plus/test';

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

it('requires canvas capture and WebGL APIs without allocating a context', async () => {
  const { isFaceMaskSupported } = await import('./face-mask');
  const getContext = vi.spyOn(HTMLCanvasElement.prototype, 'getContext');
  vi.stubGlobal('WebGLRenderingContext', class {});
  vi.stubGlobal('WebGL2RenderingContext', undefined);
  vi.stubGlobal(
    'HTMLCanvasElement',
    class {
      captureStream() {}
    },
  );
  expect(isFaceMaskSupported()).toBe(true);
  vi.stubGlobal('WebGLRenderingContext', undefined);
  expect(isFaceMaskSupported()).toBe(false);
  vi.stubGlobal('WebGLRenderingContext', class {});
  vi.stubGlobal('HTMLCanvasElement', class {});
  expect(isFaceMaskSupported()).toBe(false);
  expect(getContext).not.toHaveBeenCalled();
});

it('shares preloading and reuses the ready model after detection stops', async () => {
  vi.resetModules();
  const mesh = { ready: Promise.resolve(), detectStop: vi.fn() };
  const faceMesh = vi.fn(() => mesh);
  vi.stubGlobal('window', { p5: class {}, ml5: { faceMesh } });
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

it.each(['missing p5', 'invalid p5', 'missing ml5', 'missing faceMesh'])(
  'rejects %s after script loading and reloads libraries on retry',
  async (scenario) => {
    vi.resetModules();
    const mesh = { ready: Promise.resolve() };
    const faceMesh = vi.fn(() => mesh);
    const libs = { p5: class {}, ml5: { faceMesh } };
    const invalid = { ...libs };
    if (scenario === 'missing p5') delete invalid.p5;
    if (scenario === 'invalid p5') invalid.p5 = {};
    if (scenario === 'missing ml5') delete invalid.ml5;
    if (scenario === 'missing faceMesh') invalid.ml5 = {};
    vi.stubGlobal('window', invalid);
    const append = vi
      .spyOn(document.head, 'append')
      .mockImplementation((script) => {
        queueMicrotask(() => script.onload());
      });
    const { preloadFaceMask } = await import('./face-mask');
    await expect(preloadFaceMask()).rejects.toThrow(
      'Could not load face mask libraries',
    );
    expect(faceMesh).not.toHaveBeenCalled();
    vi.stubGlobal('window', libs);
    expect((await preloadFaceMask()).mesh).toBe(mesh);
    expect(faceMesh).toHaveBeenCalledOnce();
    expect(append).toHaveBeenCalledTimes(4);
  },
);

async function setupFaceMask({ waitForCamera = false } = {}) {
  let captureTrack;
  const remoteTrack = { stop: vi.fn() };
  let mode = 'outline';
  vi.resetModules();
  let sketch;
  let detect;
  let capture;
  const track = { stop: vi.fn() };
  const sampledTracks = [];
  const drawImage = vi.fn((input) =>
    sampledTracks.push(input.srcObject.tracks[0]),
  );
  const liveDrawImage = vi.fn();
  const vertex = vi.fn();
  const removeGraphics = vi.fn(() => {
    throw new TypeError(
      "Cannot read properties of undefined (reading 'indexOf')",
    );
  });
  const mesh = {
    ready: Promise.resolve(),
    detectStart: vi.fn((_video, callback) => {
      detect = callback;
    }),
    detectStop: vi.fn(),
    getTriangles: () => [[0, 1, 2]],
  };
  const outputCanvas = document.createElement('canvas');
  outputCanvas.captureStream = () => {
    return { getVideoTracks: () => [track] };
  };
  const sourceWidth = 800;
  const sourceHeight = 600;
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
  vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
  let readyState = waitForCamera ? 1 : 2;
  vi.spyOn(HTMLMediaElement.prototype, 'readyState', 'get').mockImplementation(
    () => readyState,
  );
  vi.spyOn(HTMLVideoElement.prototype, 'videoWidth', 'get').mockImplementation(
    function () {
      return this.srcObject?.tracks[0] === remoteTrack ? 1280 : sourceWidth;
    },
  );
  vi.spyOn(HTMLVideoElement.prototype, 'videoHeight', 'get').mockImplementation(
    function () {
      return this.srcObject?.tracks[0] === remoteTrack ? 720 : sourceHeight;
    },
  );
  vi.stubGlobal(
    'MediaStream',
    class {
      constructor(tracks) {
        this.tracks = tracks;
      }
    },
  );
  vi.stubGlobal('window', {
    ml5: { faceMesh: () => mesh },
    p5: class {
      constructor(init) {
        sketch = {
          createCanvas: vi.fn(() => ({ elt: outputCanvas })),
          createGraphics: vi
            .fn(() => ({
              canvas: {
                getContext: () => ({
                  drawImage: liveDrawImage,
                  fillRect: vi.fn(),
                  clearRect: vi.fn(),
                  createRadialGradient: () => ({ addColorStop: vi.fn() }),
                  save: vi.fn(),
                  beginPath: vi.fn(),
                  moveTo: vi.fn(),
                  lineTo: vi.fn(),
                  closePath: vi.fn(),
                  clip: vi.fn(),
                  restore: vi.fn(),
                }),
              },
              remove: removeGraphics,
            }))
            .mockImplementationOnce(() => ({
              canvas: { getContext: () => ({ drawImage }) },
              remove: removeGraphics,
            })),
          frameRate: vi.fn(),
          pixelDensity: vi.fn(),
          textureMode: vi.fn(),
          translate: vi.fn(),
          scale: vi.fn(),
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
  const onError = vi.fn();
  const pending = createFaceMask({}, controller.signal, {
    onCaptureReady: (action) => {
      capture = action;
    },
    captureMode: () => mode,
    onError,
    captureTrack: () => captureTrack,
  });
  return {
    pending,
    controller,
    onError,
    mesh,
    outputCanvas,
    track,
    remoteTrack,
    sampledTracks,
    drawImage,
    vertex,
    removeGraphics,
    sourceWidth,
    sourceHeight,
    get sketch() {
      return sketch;
    },
    get detect() {
      return detect;
    },
    get capture() {
      return capture;
    },
    useDetection: () => {
      mode = 'detected';
    },
    useRemote: () => {
      captureTrack = remoteTrack;
    },
    cameraReady: () => {
      readyState = 2;
      document.querySelector('video').dispatchEvent(new Event('loadeddata'));
    },
  };
}

async function waitForCapture(env) {
  await vi.waitFor(() => expect(env.capture).toBeTypeOf('function'));
}

function testFace() {
  return {
    keypoints: [
      { x: 10, y: 20 },
      { x: 30, y: 40 },
      { x: 50, y: 60 },
      ...Array.from({ length: 465 }, () => ({ x: 50, y: 60 })),
    ],
  };
}

it.each([
  { switchToDetection: false },
  { switchToDetection: true },
  { switchToDetection: true, remoteCapture: true },
  { remoteCapture: true },
])(
  'captures and disposes the face mask: %j',
  async ({ switchToDetection, remoteCapture }) => {
    const env = await setupFaceMask();
    await waitForCapture(env);
    const { sketch, mesh, remoteTrack, sourceWidth, sourceHeight } = env;
    expect(sketch.pixelDensity).toHaveBeenCalledWith(1);
    env.detect([]);
    expect(env.capture).toBeTypeOf('function');
    if (switchToDetection) env.useDetection();
    if (remoteCapture) {
      env.useRemote();
      const oldDetect = env.detect;
      sketch.draw();
      await Promise.resolve();
      sketch.draw();
      const remoteVideo = mesh.detectStart.mock.calls.at(-1)[0];
      expect(remoteVideo).toBe(mesh.detectStart.mock.calls[0][0]);
      expect(remoteVideo.srcObject.tracks).toEqual([remoteTrack]);
      expect(remoteVideo.width).toBe(1280);
      expect(remoteVideo.height).toBe(720);
      // Reject stale results from either the old or newly installed callback.
      oldDetect([{ keypoints: [] }]);
      env.detect([{ keypoints: [] }]);
      if (switchToDetection) expect(env.capture).toBeUndefined();
      else expect(env.capture).toBeTypeOf('function');
    }
    if (switchToDetection) {
      env.detect([]);
      expect(env.capture).toBeUndefined();
      env.detect([testFace()]);
      expect(env.capture).toBeTypeOf('function');
    }
    const captureVideo = mesh.detectStart.mock.calls.at(-1)[0];
    env.capture();
    if (remoteCapture) {
      expect(mesh.detectStart.mock.calls.at(-1)[0]).toBe(
        mesh.detectStart.mock.calls[0][0],
      );
      expect(captureVideo.srcObject.tracks[0]).not.toBe(remoteTrack);
      expect(env.sampledTracks).toEqual([remoteTrack]);
      await Promise.resolve();
      sketch.draw();
      expect(captureVideo.width).toBe(sourceWidth);
      expect(captureVideo.height).toBe(sourceHeight);
    }
    env.detect([]);
    expect(env.drawImage).toHaveBeenCalledWith(captureVideo, 0, 0, 960, 720);
    sketch.draw();
    const mask = await env.pending;
    expect(mask.track).toBe(env.track);
    expect(env.vertex).not.toHaveBeenCalled();
    env.detect([testFace()]);
    sketch.draw();
    expect(env.vertex).toHaveBeenCalledTimes(3);
    expect(remoteTrack.stop).not.toHaveBeenCalled();
    // Landmarks scale to output pixels; texture coordinates stay normalized.
    if (switchToDetection) {
      const [width, height] = sketch.createCanvas.mock.calls[0];
      expect(env.vertex).toHaveBeenNthCalledWith(
        1,
        (10 * width) / sourceWidth,
        (20 * height) / sourceHeight,
        expect.closeTo(10 / (remoteCapture ? 1280 : sourceWidth)),
        expect.closeTo(20 / (remoteCapture ? 720 : sourceHeight)),
      );
    }
    expect(env.drawImage).toHaveBeenCalledOnce();
    const sourceVideo = mesh.detectStart.mock.calls[0][0];
    const container = sourceVideo.parentElement;
    const stopsBeforeDispose = mesh.detectStop.mock.calls.length;
    if (switchToDetection) env.controller.abort();
    else expect(() => mask.dispose()).not.toThrow();
    // Hangup aborts first and then explicitly disposes the mask again.
    expect(() => mask.dispose()).not.toThrow();
    expect(env.removeGraphics).not.toHaveBeenCalled();
    expect(sketch.remove).toHaveBeenCalledOnce();
    expect(mesh.detectStop).toHaveBeenCalledTimes(stopsBeforeDispose + 1);
    expect(env.track.stop).toHaveBeenCalledOnce();
    expect(sourceVideo.srcObject).toBeNull();
    expect(container.isConnected).toBe(false);
  },
);

it('waits for drawable camera pixels before offering capture', async () => {
  const env = await setupFaceMask({ waitForCamera: true });
  await vi.waitFor(() =>
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalled(),
  );
  expect(env.capture).toBeUndefined();
  expect(env.sketch).toBeUndefined();
  env.cameraReady();
  await waitForCapture(env);
  env.capture();
  env.sketch.draw();
  const mask = await env.pending;
  mask.dispose();
});

it('cancels while waiting for camera pixels', async () => {
  const env = await setupFaceMask({ waitForCamera: true });
  await vi.waitFor(() =>
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalled(),
  );
  expect(env.capture).toBeUndefined();
  expect(env.sketch).toBeUndefined();
  const rejected = expect(env.pending).rejects.toThrow('Face mask cancelled');
  env.controller.abort();
  await rejected;
  expect(document.querySelector('video')).toBeNull();
  expect(env.mesh.detectStart).not.toHaveBeenCalled();
});

it('times out when the captured mask is never published', async () => {
  const env = await setupFaceMask();
  await waitForCapture(env);
  vi.useFakeTimers();
  try {
    const rejected = expect(env.pending).rejects.toThrow('Face mask timed out');
    env.capture();
    await vi.advanceTimersByTimeAsync(30000);
    await rejected;
    expect(env.mesh.detectStop).toHaveBeenCalledOnce();
    expect(env.sketch.remove).toHaveBeenCalledOnce();
    expect(env.capture).toBeUndefined();
  } finally {
    vi.useRealTimers();
  }
});

it('cleans up when canvas capture fails before publishing', async () => {
  const env = await setupFaceMask();
  await waitForCapture(env);
  env.outputCanvas.captureStream = () => {
    throw new Error('Canvas capture failed');
  };
  env.capture();
  const rejected = expect(env.pending).rejects.toThrow('Canvas capture failed');
  expect(() => env.sketch.draw()).not.toThrow();
  await rejected;
  expect(env.mesh.detectStop).toHaveBeenCalledOnce();
  expect(env.sketch.remove).toHaveBeenCalledOnce();
  expect(env.capture).toBeUndefined();
});

it('reports renderer failures and cleans up after publishing', async () => {
  const env = await setupFaceMask();
  await waitForCapture(env);
  env.capture();
  env.sketch.draw();
  await env.pending;
  const container = env.mesh.detectStart.mock.calls[0][0].parentElement;
  env.detect([testFace()]);
  env.sketch.texture.mockImplementation(() => {
    throw new Error('Renderer stopped');
  });
  env.sketch.draw();
  expect(env.onError).toHaveBeenCalledWith(
    expect.objectContaining({ message: 'Renderer stopped' }),
  );
  expect(env.track.stop).toHaveBeenCalledOnce();
  expect(container.isConnected).toBe(false);
});

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
