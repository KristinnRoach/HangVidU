// Simple Face Mask - Minimal working version based on sketch/p5_face_sketch.js

let p5Instance = null;
let librariesLoaded = false;

// p5 sketch variables (will be in p5 scope)
let video;
let faceMesh;
let faces = [];
let triangles;
let capturedImage = null;
let capturedFace = null;
let useMask = false;

/**
 * Load libraries
 */
async function loadLibraries() {
  if (librariesLoaded) return;

  console.log('[FaceMask] Loading libraries...');

  await loadScript(
    'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js'
  );
  await loadScript('https://unpkg.com/ml5@1/dist/ml5.min.js');

  librariesLoaded = true;
  console.log('[FaceMask] Libraries loaded');
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

/**
 * Pre-load libraries - call this early in the call flow
 */
export async function preloadFaceMaskLibraries() {
  try {
    await loadLibraries();
    console.log('[FaceMask] Libraries pre-loaded and ready');
  } catch (error) {
    console.error('[FaceMask] Failed to pre-load libraries:', error);
    throw error;
  }
}

/**
 * Initialize face mask
 */
export async function initFaceMask(videoElement, container) {
  try {
    if (!librariesLoaded) {
      console.warn('[FaceMask] Libraries not pre-loaded, loading now...');
      await loadLibraries();
    }

    // Create p5 sketch - exactly like the working version
    const sketch = (p) => {
      p.preload = function () {
        faceMesh = window.ml5.faceMesh({ maxFaces: 1 });
      };

      p.setup = function () {
        const canvas = p.createCanvas(640, 480, p.WEBGL);

        // Ensure container has position: relative for absolute positioning to work
        container.style.position = 'relative';

        // Position canvas to overlay the container
        canvas.elt.style.position = 'absolute';
        canvas.elt.style.top = '0';
        canvas.elt.style.left = '0';
        canvas.elt.style.width = '100%';
        canvas.elt.style.height = '100%';
        canvas.elt.style.zIndex = '999';
        canvas.elt.style.pointerEvents = 'auto';

        video = p.createCapture(p.VIDEO);
        video.hide();

        faceMesh.detectStart(video, (results) => {
          faces = results;
        });

        triangles = faceMesh.getTriangles();
        p.textureMode(p.NORMAL);
      };

      p.draw = function () {
        p.translate(-p.width / 2, -p.height / 2);

        // Draw background based on mask mode
        if (useMask && capturedImage) {
          p.background(0);
        } else {
          p.image(video, 0, 0, p.width, p.height);
        }

        // Only render mesh if face is detected
        if (faces.length === 0) return;

        let face = faces[0];

        // Choose texture and UV source
        let textureSource, uvSource;
        if (useMask && capturedImage && capturedFace) {
          textureSource = capturedImage;
          uvSource = capturedFace;
        } else {
          textureSource = video;
          uvSource = face;
        }

        // Render face mesh
        p.texture(textureSource);
        p.noStroke();
        p.beginShape(p.TRIANGLES);

        for (let i = 0; i < triangles.length; i++) {
          let [a, b, c] = triangles[i];

          let posA = face.keypoints[a];
          let posB = face.keypoints[b];
          let posC = face.keypoints[c];

          let uvA = uvSource.keypoints[a];
          let uvB = uvSource.keypoints[b];
          let uvC = uvSource.keypoints[c];

          p.vertex(posA.x, posA.y, uvA.x / p.width, uvA.y / p.height);
          p.vertex(posB.x, posB.y, uvB.x / p.width, uvB.y / p.height);
          p.vertex(posC.x, posC.y, uvC.x / p.width, uvC.y / p.height);
        }

        p.endShape();
      };
    };

    p5Instance = new window.p5(sketch, container);
    console.log('[FaceMask] Initialized');
  } catch (error) {
    console.error('[FaceMask] Failed:', error);
  }
}

/**
 * Capture photo
 */
export function capturePhoto() {
  if (!p5Instance) {
    console.warn('[FaceMask] Not initialized');
    return;
  }

  if (faces.length === 0) {
    console.warn(
      '[FaceMask] No face detected yet - please wait a moment and try again'
    );
    return;
  }

  const p = p5Instance;
  let img = p.createGraphics(video.width, video.height);
  img.image(video, 0, 0);
  capturedImage = img;

  capturedFace = JSON.parse(JSON.stringify(faces[0]));
  useMask = true;

  console.log('[FaceMask] Photo captured!');
}

/**
 * Toggle mask
 */
export function toggleMask() {
  if (!capturedImage) {
    console.warn('[FaceMask] No mask captured');
    return;
  }
  useMask = !useMask;
  console.log('[FaceMask] Mask:', useMask ? 'ON' : 'OFF');
}

/**
 * Clear mask
 */
export function clearMask() {
  capturedImage = null;
  capturedFace = null;
  useMask = false;
  console.log('[FaceMask] Mask cleared');
}

/**
 * Destroy
 */
export function destroyFaceMask() {
  if (p5Instance) {
    p5Instance.remove();
    p5Instance = null;
  }

  if (faceMesh) {
    faceMesh.detectStop();
  }

  video = null;
  faceMesh = null;
  faces = [];
  triangles = null;
  capturedImage = null;
  capturedFace = null;
  useMask = false;

  console.log('[FaceMask] Destroyed');
}

export function isFaceMaskActive() {
  return p5Instance !== null;
}
