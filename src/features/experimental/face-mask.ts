import {
  FACE_MASK_CAPTURE_MODE,
  capturePoints,
  faceBoundary,
} from './capture-template';

import { faceMaskStyle } from './face-mask-style';

// WIP output width; height follows the source aspect ratio.
const FRAME_WIDTH = 960;

const FACE_MASK_FEATHER = false;
// Skip triangles that fold over when the head turns (their winding flips).
const FACE_MASK_CULL_FOLDED = true;
// Set false to restore the original full-frame filtered video.
const FACE_MASK_AUTO_FRAME = true;
const FACE_MASK_MIN_HEIGHT = 0.4; // Minimum frame-height fraction.
const FACE_MASK_MAX_ZOOM = 2; // Magnification cap, >= 1; may limit minimum size.
const FACE_MASK_CENTER_STRENGTH = 0.5; // 0 = original position, 1 = fully centered.
const FACE_MASK_TARGET_Y = 0.5; // 0 = top, 0.5 = middle, 1 = bottom.
const FACE_MASK_FOLLOW_SPEED = 1; // 0–1 per frame: 1 = instant; lower = smoother.

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
  pixelDensity: (density: number) => void;
  textureMode: (mode: string) => void;
  translate: (x: number, y: number) => void;
  scale: (factor: number) => void;
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
  onError: (error: Error) => void = () => {},
): Promise<FaceMask> {
  const container = document.createElement('div');
  // Keep a tiny source in the viewport. Fully invisible video can stop
  // advancing on mobile even though play() has resolved.
  container.style.cssText =
    'position:fixed;left:0;top:0;width:1px;height:1px;overflow:hidden;opacity:0.01;pointer-events:none';
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
  let cancelVideoWait: (() => void) | undefined;
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    clearTimeout(timer);
    cancelVideoWait?.();
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
      const fail = (error: unknown) => {
        if (disposed) return;
        if (output)
          onError(error instanceof Error ? error : new Error(String(error)));
        reject(error);
        dispose();
      };
      const guard = (action: () => void) => () => {
        if (disposed) return;
        try {
          action();
        } catch (error) {
          fail(error);
        }
      };
      const startTimeout = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          fail(
            new Error(
              `Face mask timed out: ${stage.toLowerCase()}. Try again.`,
            ),
          );
        }, 30000);
      };
      startTimeout();
      if (signal.aborted) {
        abort();
        return;
      }
      void (async () => {
        progress('Starting camera input');
        // Start playback before awaiting libraries, while still in the toggle's
        // user gesture. play() alone does not guarantee drawable video pixels.
        await video.play();
        if (disposed) return;
        if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
          await new Promise<void>((ready, failed) => {
            const cleanup = () => {
              video.removeEventListener('loadeddata', loaded);
              video.removeEventListener('error', error);
              cancelVideoWait = undefined;
            };
            const loaded = () => {
              cleanup();
              ready();
            };
            const error = () => {
              cleanup();
              failed(new Error('Face mask camera input unavailable'));
            };
            cancelVideoWait = () => {
              cleanup();
              failed(new Error('Face mask cancelled'));
            };
            video.addEventListener('loadeddata', loaded, { once: true });
            video.addEventListener('error', error, { once: true });
          });
        }
        if (disposed) return;
        if (!video.videoWidth || !video.videoHeight) {
          throw new Error('Face mask camera input has no dimensions');
        }
        video.width = video.videoWidth;
        video.height = video.videoHeight;
        progress('Loading libraries');
        const { libs, mesh: readyMesh } = await preloadFaceMask();
        if (disposed) return;
        mesh = readyMesh;
        const width = FRAME_WIDTH;
        const height = Math.round(
          width * (video.videoHeight / video.videoWidth || 0.75),
        );
        let image: Graphics;
        let context: CanvasRenderingContext2D;
        let liveContext: CanvasRenderingContext2D;
        let maskContext: CanvasRenderingContext2D;
        let faces: Face[] = [];
        let captured: Face | undefined;
        let centerX = width / 2;
        let centerY = height / 2;
        let zoom = 1;
        const outlineMode = () => captureMode() === 'outline';
        const capture = () => {
          if (disposed || captured || (!outlineMode() && !faces[0])) return;
          // User adjustment time is unbounded, but publishing must still be bounded.
          startTimeout();
          try {
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
          } catch (error) {
            fail(error);
          }
        };
        let canvas: HTMLCanvasElement;
        let triangles: number[][] = [];
        const publish = () => {
          if (output) return;
          output = canvas.captureStream(20).getVideoTracks()[0];
          if (!output)
            throw new Error('Face mask canvas produced no video track');
          clearTimeout(timer);
          progress('Filtered video ready');
          resolve({ track: output, dispose });
        };
        progress('Starting renderer');
        sketch = new libs.p5((p) => {
          p.setup = guard(() => {
            // Output pixels should not depend on the screen's Retina density.
            // At density 3, every buffer otherwise contains nine times as many pixels.
            p.pixelDensity(1);
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
          });
          p.draw = guard(() => {
            p.background(0);
            const face = faces[0];
            if (!captured) return;
            if (FACE_MASK_AUTO_FRAME && face) {
              const xs = faceBoundary.map((index) => face.keypoints[index]!.x);
              const ys = faceBoundary.map((index) => face.keypoints[index]!.y);
              const left = Math.min(...xs);
              const right = Math.max(...xs);
              const top = Math.min(...ys);
              const bottom = Math.max(...ys);
              const targetZoom = Math.max(
                1,
                Math.min(
                  FACE_MASK_MAX_ZOOM,
                  (height * FACE_MASK_MIN_HEIGHT) / Math.max(1, bottom - top),
                ),
              );
              zoom += (targetZoom - zoom) * FACE_MASK_FOLLOW_SPEED;
              const targetX =
                width / 2 +
                ((left + right) / 2 - width / 2) * FACE_MASK_CENTER_STRENGTH;
              const targetY =
                height / 2 +
                ((top + bottom) / 2 -
                  height / 2 -
                  ((FACE_MASK_TARGET_Y - 0.5) * height) / zoom) *
                  FACE_MASK_CENTER_STRENGTH;
              centerX += (targetX - centerX) * FACE_MASK_FOLLOW_SPEED;
              centerY += (targetY - centerY) * FACE_MASK_FOLLOW_SPEED;
            }
            // Frame both layers together; retain the last view if tracking stops.
            p.scale(zoom);
            p.translate(-centerX, -centerY);
            liveContext.fillStyle = faceMaskStyle.backgroundColor;
            liveContext.fillRect(0, 0, width, height);
            liveContext.save();
            Object.assign(liveContext, faceMaskStyle.outside);
            liveContext.drawImage(video, 0, 0, width, height);
            liveContext.restore();
            // Vignette radii are fractions of the visible half-diagonal.
            const corner = Math.hypot(width, height) / 2; // If should follow zoom add: / zoom;
            const vignette = liveContext.createRadialGradient(
              centerX,
              centerY,
              corner * faceMaskStyle.vignette.fadeStart,
              centerX,
              centerY,
              corner * faceMaskStyle.vignette.fadeEnd,
            );
            vignette.addColorStop(0, 'transparent');
            vignette.addColorStop(1, faceMaskStyle.backgroundColor);
            liveContext.fillStyle = vignette;
            liveContext.fillRect(0, 0, width, height);
            liveContext.fillStyle = faceMaskStyle.backgroundColor;
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
            if (!face) {
              publish();
              return;
            }
            maskContext.clearRect(0, 0, width, height);
            maskContext.save();
            Object.assign(maskContext, faceMaskStyle.mask);
            maskContext.drawImage(image.canvas, 0, 0, width, height);

            if (FACE_MASK_FEATHER) {
              // Feather: keep only a blurred face silhouette so mesh edges fade out.
              maskContext.globalCompositeOperation = 'destination-in';
              maskContext.filter = 'blur(16px)';
              maskContext.beginPath();

              for (const index of faceBoundary) {
                const point = captured.keypoints[index]!;
                maskContext.lineTo(point.x, point.y);
              }
              maskContext.fill();
            }
            maskContext.restore();
            p.texture(styledMaskTexture!);
            p.noStroke();
            p.beginShape(p.TRIANGLES);
            // Most of the face faces the camera, so the majority winding is "front".
            const front = Math.sign(
              triangles.reduce((sum, t) => sum + signedArea(t, face), 0),
            );
            for (const triangle of triangles) {
              if (
                FACE_MASK_CULL_FOLDED &&
                Math.sign(signedArea(triangle, face)) !== front
              ) {
                continue;
              }
              for (const index of triangle) {
                const point = face.keypoints[index]!;
                const uv = captured.keypoints[index]!;
                p.vertex(point.x, point.y, uv.x / width, uv.y / height);
              }
            }
            p.endShape();
            // Only report readiness after the entire first frame rendered.
            publish();
          });
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

/** 2D signed area; its sign flips when a triangle folds over (faces away). */
function signedArea([i, j, k]: number[], { keypoints: points }: Face) {
  const [a, b, c] = [points[i!]!, points[j!]!, points[k!]!];
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

/* Optional tuning, only if smoothing still leaves visible jitter:
 *
 * CENTER_DEAD_ZONE = 0.05 (fraction of output width/height):
 * Before updating each center coordinate, compare its target delta with
 * width * CENTER_DEAD_ZONE / zoom (or height for Y). Update only outside
 * that band. Subtract the band from the delta so following starts gently.
 *
 * ZOOM_DEAD_ZONE = 0.03 (fraction of output height):
 * Add a session-local "zooming" boolean alongside zoom. Start compensating
 * below MIN_HEIGHT - ZOOM_DEAD_ZONE; stop above MIN_HEIGHT + ZOOM_DEAD_ZONE.
 * When compensating, use the existing capped targetZoom; otherwise target 1.
 * Keep smoothing after this decision. This avoids toggling at the threshold,
 * but allows face size to drift slightly below the requested minimum.
 *
 * Keep these inside the AUTO_FRAME branch; no extra detector or UI is needed.
 */

/* TODO try depth instead of (or with) FACE_MASK_CULL_FOLDED, so far-side
 * triangles are hidden behind near ones by the WEBGL depth test:
 *
 * 1. Keep z in the detectStart mapping: z: (point.z * width) / video.videoWidth
 *    (same scale as x). Add z?: number to Face keypoints.
 * 2. Before p.beginShape(p.TRIANGLES), clear depth so the full-frame
 *    p.image(liveTexture) at z = 0 can't hide the mask:
 *    const gl = p.drawingContext; gl.clear(gl.DEPTH_BUFFER_BIT);
 *    (add drawingContext: WebGLRenderingContext to the P5 type).
 * 3. Emit p.vertex(point.x, point.y, -(point.z ?? 0), uv.x / width, uv.y / height).
 *    MediaPipe z is smaller toward the camera; p5's camera looks down -z, so
 *    negate. If the near cheek disappears instead of the far one, drop the minus.
 *    Change the P5 vertex type to (x, y, z, u, v).
 * 4. Compare with FACE_MASK_CULL_FOLDED on and off.
 * 5. Update the vertex expectation in face-mask.test.js (5 args).
 *
 * Caveat: with FACE_MASK_FEATHER on, transparent edge pixels still write depth
 * and can punch holes; leave feather off while testing.
 */
