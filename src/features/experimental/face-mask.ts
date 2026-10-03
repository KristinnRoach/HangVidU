import {
  FACE_MASK_CAPTURE_MODE,
  capturePoints,
  faceBoundary,
} from './capture-template';

import { faceMaskStyle } from './face-mask-style';

type Graphics = { canvas: HTMLCanvasElement };

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
  image: (source: Graphics, x: number, y: number, w: number, h: number) => void;
  texture: (source: Graphics) => void;
  noStroke: () => void;
  beginShape: (mode: string) => void;
  vertex: (x: number, y: number, u: number, v: number) => void;
  endShape: () => void;
  remove: () => void;
};
type Libraries = {
  p5: new (sketch: (p: Sketch) => void, container: HTMLElement) => Sketch;
  ml5: { faceMesh: (options: { maxFaces: number }) => Mesh | Promise<Mesh> };
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
      'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.11.13/p5.min.js',
      'sha384-+4pFSzqrHIcjFoiZQ8s1jUHqNylTGybto+iELDyMA+UQ0UhpTH0B92zF4Bg0mawP',
    );
    await loadScript(
      'https://unpkg.com/ml5@1.4.0/dist/ml5.min.js',
      'sha384-WhQsp6wxLjcueRBZ1VznJM97KGBK+r4P+L3yOCLEUk/H/4uAm9leYfoLx+Fauci2',
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
    // Without a global p5 at ml5 load time, ml5 returns a Promise<Mesh>.
    const mesh = await libs.ml5.faceMesh({ maxFaces: 1 });
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
  onCaptureReady?: (capture: (() => void) | undefined) => void,
  captureMode: () => 'outline' | 'detected' = () => FACE_MASK_CAPTURE_MODE,
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
  let liveTexture: Graphics | undefined;
  let styledMaskTexture: Graphics | undefined;
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
    onCaptureReady?.(undefined);
    mesh?.detectStop();
    // The sketch owns buffer cleanup; Graphics.remove() breaks in p5 1.11.13.
    sketch?.remove();
    sketch = undefined;
    liveTexture = undefined;
    styledMaskTexture = undefined;
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
        let liveContext: CanvasRenderingContext2D;
        let maskContext: CanvasRenderingContext2D;
        let faces: Face[] = [];
        let captured: Face | undefined;
        const outlineMode = () => captureMode() === 'outline';
        const capture = () => {
          if (disposed || captured || (!outlineMode() && !faces[0])) return;
          context.drawImage(video, 0, 0, width, height);
          captured = outlineMode()
            ? {
                keypoints: capturePoints.map(([x, y]) => ({
                  x: width / 2 + (x - 0.5) * height,
                  y: y * height,
                })),
              }
            : faces[0];
          onCaptureReady?.(undefined);
          progress(
            outlineMode()
              ? 'Bring your face into view to animate'
              : 'Rendering captured face',
          );
        };
        let canvas: HTMLCanvasElement;
        let triangles: number[][] = [];
        progress('Starting renderer');
        sketch = new libs.p5((p) => {
          p.setup = () => {
            if (disposed) return;
            canvas = p.createCanvas(width, height, p.WEBGL).elt;
            image = p.createGraphics(width, height);
            context = image.canvas.getContext('2d')!;
            liveTexture = p.createGraphics(width, height);
            liveContext = liveTexture.canvas.getContext('2d')!;
            styledMaskTexture = p.createGraphics(width, height);
            maskContext = styledMaskTexture.canvas.getContext('2d')!;
            p.frameRate(20);
            p.textureMode(p.NORMAL);
            triangles = mesh!.getTriangles();
            if (outlineMode() && onCaptureReady) {
              clearTimeout(timer);
              onCaptureReady(capture);
              progress('Position your image inside the outline, then capture');
            } else {
              progress('Waiting for a face');
            }
            mesh!.detectStart(video, (results) => {
              if (disposed) return;
              // Landmarks refer to source-video pixels, not the output canvas.
              faces = results.map((face) => ({
                keypoints: face.keypoints.map((point) => ({
                  x: (point.x * width) / video.videoWidth,
                  y: (point.y * height) / video.videoHeight,
                })),
              }));
              if (!captured && (!outlineMode() || !onCaptureReady)) {
                if (onCaptureReady) {
                  // The timeout bounds startup, not the user's adjustment time.
                  if (faces[0]) clearTimeout(timer);
                  onCaptureReady(faces[0] ? capture : undefined);
                  const next = faces[0]
                    ? 'Adjust your face, then capture'
                    : 'Waiting for a face';
                  if (stage !== next) progress(next);
                } else if (faces[0]) {
                  capture();
                }
              }
            });
          };
          p.draw = () => {
            if (disposed) return;
            p.translate(-width / 2, -height / 2);
            p.background(0);
            const face = faces[0];
            if (!captured) return;
            liveContext.fillStyle = faceMaskStyle.backgroundColor;
            liveContext.fillRect(0, 0, width, height);
            liveContext.save();
            Object.assign(liveContext, faceMaskStyle.outside);
            liveContext.drawImage(video, 0, 0, width, height);
            liveContext.restore();
            if (face) {
              // Keep live eyes and mouth fully visible inside the face outline.
              liveContext.save();
              liveContext.beginPath();
              faceBoundary.forEach((index, i) => {
                const point = face.keypoints[index]!;
                if (i === 0) liveContext.moveTo(point.x, point.y);
                else liveContext.lineTo(point.x, point.y);
              });
              liveContext.closePath();
              liveContext.clip();
              // Replace A beneath B so their opacity settings stay independent.
              liveContext.fillRect(0, 0, width, height);
              Object.assign(liveContext, faceMaskStyle.inside);
              liveContext.drawImage(video, 0, 0, width, height);
              liveContext.restore();
            }
            p.image(liveTexture!, 0, 0, width, height);
            if (!output) {
              output = canvas.captureStream(20).getVideoTracks()[0]!;
              clearTimeout(timer);
              progress('Filtered video ready');
              resolve({ track: output, dispose });
            }
            if (!face) return;
            maskContext.clearRect(0, 0, width, height);
            maskContext.save();
            Object.assign(maskContext, faceMaskStyle.mask);
            maskContext.drawImage(image.canvas, 0, 0, width, height);
            maskContext.restore();
            p.texture(styledMaskTexture!);
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
