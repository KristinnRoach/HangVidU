// Face Mask Feature - Easter Egg
// Lazy-loads p5.js and ml5.js only when activated
// Triggered by right-click (desktop) or long-press (mobile) on video element

let p5Instance = null;
let isActive = false;
let librariesLoaded = false;

// State
let videoElement = null;
let faceMesh = null;
let faces = [];
let triangles = null;
let capturedImage = null;
let capturedFace = null;
let useMask = false;

/**
 * Lazy load p5.js and ml5.js from CDN
 */
async function loadLibraries() {
  if (librariesLoaded) return;

  console.log('[FaceMask] Loading libraries...');

  // Load p5.js
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js');

  // Load ml5.js
  await loadScript('https://unpkg.com/ml5@1/dist/ml5.min.js');

  librariesLoaded = true;
  console.log('[FaceMask] Libraries loaded');
}

/**
 * Load a script dynamically
 */
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
 * Initialize face mask on a video element
 * @param {HTMLVideoElement} videoEl - The video element to apply face mask to
 * @param {HTMLElement} container - Container to append canvas to
 */
export async function initFaceMask(videoEl, container) {
  if (isActive) {
    console.warn('[FaceMask] Already active');
    return;
  }

  try {
    // Load libraries if not already loaded
    await loadLibraries();

    isActive = true;
    videoElement = videoEl;

    // Create p5 instance
    p5Instance = new window.p5((p) => {
      p.preload = function () {
        // Initialize FaceMesh model
        faceMesh = window.ml5.faceMesh({ maxFaces: 1 });
      };

      p.setup = function () {
        // Get actual video dimensions
        const width = videoElement.videoWidth || 640;
        const height = videoElement.videoHeight || 480;

        const canvas = p.createCanvas(width, height, p.WEBGL);
        canvas.parent(container);

        // Style the canvas to overlay the video
        const canvasEl = canvas.elt;
        canvasEl.style.position = 'absolute';
        canvasEl.style.top = '0';
        canvasEl.style.left = '0';
        canvasEl.style.width = '100%';
        canvasEl.style.height = '100%';
        canvasEl.style.zIndex = '10'; // Above video
        canvasEl.style.pointerEvents = 'none'; // Allow clicks to pass through

        // Hide the original video when mask is active
        videoElement.style.visibility = 'hidden';

        // Start face detection
        faceMesh.detectStart(videoElement, (results) => {
          faces = results;
        });

        // Get face mesh triangles
        triangles = faceMesh.getTriangles();
        p.textureMode(p.NORMAL);
      };

      p.draw = function () {
        p.translate(-p.width / 2, -p.height / 2);

        // Draw background based on mask mode
        if (useMask && capturedImage) {
          p.background(0); // Black background when using mask
        } else {
          // Draw live video - ensure video is ready
          if (videoElement.readyState >= 2) {
            p.image(videoElement, 0, 0, p.width, p.height);
          } else {
            p.background(0);
          }
        }

        // Only render mesh if face is detected
        if (faces.length === 0) return;

        const face = faces[0];

        // Choose texture and UV source based on mask mode
        let textureSource, uvSource;
        if (useMask && capturedImage && capturedFace) {
          textureSource = capturedImage;
          uvSource = capturedFace;
        } else {
          textureSource = videoElement;
          uvSource = face;
        }

        // Render face mesh with texture
        p.texture(textureSource);
        p.noStroke();
        p.beginShape(p.TRIANGLES);

        // Draw each triangle of the face mesh
        for (let i = 0; i < triangles.length; i++) {
          const [a, b, c] = triangles[i];

          // Current face position (for mesh geometry)
          const posA = face.keypoints[a];
          const posB = face.keypoints[b];
          const posC = face.keypoints[c];

          // UV coordinates (from captured or live face)
          const uvA = uvSource.keypoints[a];
          const uvB = uvSource.keypoints[b];
          const uvC = uvSource.keypoints[c];

          p.vertex(posA.x, posA.y, uvA.x / p.width, uvA.y / p.height);
          p.vertex(posB.x, posB.y, uvB.x / p.width, uvB.y / p.height);
          p.vertex(posC.x, posC.y, uvC.x / p.width, uvC.y / p.height);
        }

        p.endShape();
      };
    }, container);

    console.log('[FaceMask] Initialized');
  } catch (error) {
    console.error('[FaceMask] Failed to initialize:', error);
    isActive = false;
  }
}

/**
 * Capture current video frame as mask
 */
export function capturePhoto() {
  if (!isActive || faces.length === 0 || !p5Instance) {
    console.warn('[FaceMask] Cannot capture - no face detected or not active');
    return;
  }

  const p = p5Instance;

  // Create a graphics buffer to capture the current video frame
  const img = p.createGraphics(videoElement.videoWidth, videoElement.videoHeight);
  img.image(videoElement, 0, 0);
  capturedImage = img;

  // Store the face data at capture time (deep copy)
  capturedFace = JSON.parse(JSON.stringify(faces[0]));

  useMask = true;
  console.log('[FaceMask] Photo captured');
}

/**
 * Toggle between live video and captured mask
 */
export function toggleMask() {
  if (!capturedImage) {
    console.warn('[FaceMask] No mask captured yet');
    return;
  }

  useMask = !useMask;
  console.log('[FaceMask] Mask mode:', useMask ? 'ON' : 'OFF');
}

/**
 * Clear the captured mask
 */
export function clearMask() {
  capturedImage = null;
  capturedFace = null;
  useMask = false;
  console.log('[FaceMask] Mask cleared');
}

/**
 * Destroy face mask and clean up
 */
export function destroyFaceMask() {
  if (!isActive) return;

  // Restore video visibility
  if (videoElement) {
    videoElement.style.visibility = 'visible';
  }

  if (p5Instance) {
    p5Instance.remove();
    p5Instance = null;
  }

  if (faceMesh) {
    faceMesh.detectStop();
  }

  // Clear state
  videoElement = null;
  faceMesh = null;
  faces = [];
  triangles = null;
  capturedImage = null;
  capturedFace = null;
  useMask = false;
  isActive = false;

  console.log('[FaceMask] Destroyed');
}

/**
 * Check if face mask is active
 */
export function isFaceMaskActive() {
  return isActive;
}
