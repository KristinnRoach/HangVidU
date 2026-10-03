type Graphics = { canvas: HTMLCanvasElement; remove: () => void };

type Face = { keypoints: { x: number; y: number }[] };
type Mesh = {
  ready: Promise<unknown>;
  detectStart: (
    video: HTMLVideoElement,
    callback: (faces: Face[]) => void,
  ) => void;
  detectStop: () => void;
  getTriangles: () => number[][];
};
// Only the small p5 surface used by this experiment.
type Sketch = {
  setup: () => void;
  draw: () => void;
  WEBGL: string;
  NORMAL: string;
  TRIANGLES: string;
  createCanvas: (
    width: number,
    height: number,
    mode: string,
  ) => { elt: HTMLCanvasElement };
  createGraphics: (width: number, height: number) => Graphics;
  frameRate: (fps: number) => void;
  textureMode: (mode: string) => void;
  translate: (x: number, y: number) => void;
  background: (color: number) => void;
  texture: (source: Graphics) => void;
  noStroke: () => void;
  beginShape: (mode: string) => void;
  vertex: (x: number, y: number, u: number, v: number) => void;
  endShape: () => void;
  remove: () => void;
};
type Libraries = {
  p5: new (sketch: (p: Sketch) => void, container: HTMLElement) => Sketch;
  ml5: { faceMesh: (options: { maxFaces: number }) => Mesh };
};
let libraries: Promise<Libraries> | undefined;

function loadScript(src: string, integrity: string) {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.integrity = integrity;
    script.crossOrigin = 'anonymous';
    script.onload = () => resolve();
    script.onerror = () => {
      script.remove();
      reject(new Error('Could not load face mask libraries'));
    };
    document.head.append(script);
  });
}

function loadLibraries() {
  libraries ??= (async () => {
    await loadScript(
      'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js',
      'sha384-bOv+b6RV+dlZvdQAx6+cJ+FK9ab8JCSVWyJ1JPhMVQjPW+4C8V2cOKK+qZDfnRnx',
    );
    await loadScript(
      'https://unpkg.com/ml5@1.2.1/dist/ml5.min.js',
      'sha384-M7AlPfuXf2J1G5o13KETr90B/eOykWAyIKrr60mawDnB5lltLKw/regT6SGxoWyx',
    );
    return window as unknown as Libraries;
  })().catch((error) => {
    libraries = undefined;
    throw error;
  });
  return libraries;
}

let faceModel: Promise<{ libs: Libraries; mesh: Mesh }> | undefined;

export function preloadFaceMask() {
  faceModel ??= (async () => {
    const libs = await loadLibraries();
    const mesh = libs.ml5.faceMesh({ maxFaces: 1 });
    await mesh.ready;
    return { libs, mesh };
  })().catch((error) => {
    faceModel = undefined;
    throw error;
  });
  return faceModel;
}

export type FaceMask = { track: MediaStreamTrack; dispose: () => void };

export async function createFaceMask(
  camera: MediaStreamTrack,
  signal: AbortSignal,
  onProgress: (stage: string) => void = () => {},
): Promise<FaceMask> {
  const container = document.createElement('div');
  // Keep the source playing independently of the outgoing filtered preview.
  container.style.cssText =
    'position:fixed;left:0;top:0;opacity:0;pointer-events:none;z-index:-1';
  const video = document.createElement('video');
  video.muted = true;
  video.playsInline = true;
  video.srcObject = new MediaStream([camera]);
  container.append(video);
  document.body.append(container);
  let sketch: Sketch | undefined;
  let mesh: Mesh | undefined;
  let capturedTexture: Graphics | undefined;
  let output: MediaStreamTrack | undefined;
  let disposed = false;
  let stage = 'Loading libraries';
  const progress = (next: string) => {
    stage = next;
    console.info('[FaceMask]', next);
    onProgress(next);
  };
  progress(stage);
  let timer: ReturnType<typeof setTimeout> | undefined;
  let rejectPending: ((reason: Error) => void) | undefined;
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    clearTimeout(timer);
    signal.removeEventListener('abort', abort);
    mesh?.detectStop();
    capturedTexture?.remove();
    sketch?.remove();
    output?.stop();
    video.pause();
    video.srcObject = null;
    container.remove();
  };
  const abort = () => {
    rejectPending?.(new Error('Face mask cancelled'));
    dispose();
  };
  signal.addEventListener('abort', abort, { once: true });
  try {
    // Bound model loading and face acquisition; never leave the button stuck.
    return await new Promise<FaceMask>((resolve, reject) => {
      rejectPending = reject;
      timer = setTimeout(() => {
        reject(
          new Error(
            `Face mask timed out: ${stage.toLowerCase()}. Keep your face visible and try again.`,
          ),
        );
        dispose();
      }, 30000);
      if (signal.aborted) {
        abort();
        return;
      }
      void (async () => {
        const { libs, mesh: readyMesh } = await preloadFaceMask();
        if (disposed) return;
        progress('Starting camera input');
        await video.play();
        video.width = video.videoWidth;
        video.height = video.videoHeight;
        if (disposed) return;
        mesh = readyMesh;
        const width = 640;
        const height = Math.round(
          width * (video.videoHeight / video.videoWidth || 0.75),
        );
        let image: Graphics;
        let context: CanvasRenderingContext2D;
        let faces: Face[] = [];
        let captured: Face | undefined;
        let canvas: HTMLCanvasElement;
        let triangles: number[][] = [];
        progress('Starting renderer');
        sketch = new libs.p5((p) => {
          p.setup = () => {
            if (disposed) return;
            canvas = p.createCanvas(width, height, p.WEBGL).elt;
            image = p.createGraphics(width, height);
            capturedTexture = image;
            context = image.canvas.getContext('2d')!;
            p.frameRate(20);
            p.textureMode(p.NORMAL);
            triangles = mesh!.getTriangles();
            progress('Waiting for a face');
            mesh!.detectStart(video, (results) => {
              if (disposed) return;
              // Landmarks refer to source-video pixels, not the output canvas.
              faces = results.map((face) => ({
                keypoints: face.keypoints.map((point) => ({
                  x: (point.x * width) / video.videoWidth,
                  y: (point.y * height) / video.videoHeight,
                })),
              }));
              if (!captured && faces[0]) {
                context.drawImage(video, 0, 0, width, height);
                captured = faces[0];
                progress('Rendering captured face');
              }
            });
          };
          p.draw = () => {
            if (disposed) return;
            p.translate(-width / 2, -height / 2);
            p.background(0);
            const face = faces[0];
            if (!face || !captured) return;
            p.texture(image);
            p.noStroke();
            p.beginShape(p.TRIANGLES);
            for (const triangle of triangles) {
              for (const index of triangle) {
                const point = face.keypoints[index]!;
                const uv = captured.keypoints[index]!;
                p.vertex(point.x, point.y, uv.x / width, uv.y / height);
              }
            }
            p.endShape();
            if (!output) {
              output = canvas.captureStream(20).getVideoTracks()[0]!;
              clearTimeout(timer);
              progress('Filtered video ready');
              resolve({ track: output, dispose });
            }
          };
        }, container);
      })().catch((error) => {
        reject(error);
        dispose();
      });
    });
  } catch (error) {
    dispose();
    throw error;
  }
}
