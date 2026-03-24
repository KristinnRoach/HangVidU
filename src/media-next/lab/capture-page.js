import { createLiveStreamController } from '../index.js';
import { createCaptureRuntime } from '../live-stream/capture-runtime.js';

const app = document.getElementById('app');

const cameraController = createLiveStreamController();
const microphoneController = createLiveStreamController();
const screenController = createLiveStreamController();

const sampleCamera = createSampleStream({
  id: 'sample-camera-1',
  label: 'Local Camera',
  mediaType: 'video',
  streamType: 'camera',
});

const sampleMicrophone = createSampleStream({
  id: 'sample-microphone-1',
  label: 'Local Microphone',
  mediaType: 'audio',
  streamType: 'microphone',
});

const sampleScreen = createSampleStream({
  id: 'sample-screen-1',
  label: 'Shared Screen',
  mediaType: 'video',
  streamType: 'screen',
});

renderShell();

const cameraVideoEl = document.getElementById('camera-video');
const microphoneAudioEl = document.getElementById('microphone-audio');
const screenVideoEl = document.getElementById('screen-video');
const cameraStateEl = document.getElementById('camera-state');
const microphoneStateEl = document.getElementById('microphone-state');
const screenStateEl = document.getElementById('screen-state');
const decisionsEl = document.getElementById('decisions-review');
const startCameraBtn = document.getElementById('start-camera-btn');
const stopCameraBtn = document.getElementById('stop-camera-btn');
const startMicrophoneBtn = document.getElementById('start-microphone-btn');
const stopMicrophoneBtn = document.getElementById('stop-microphone-btn');
const startScreenBtn = document.getElementById('start-screen-btn');
const stopScreenBtn = document.getElementById('stop-screen-btn');

const cameraRuntime = createCaptureRuntime({
  controller: cameraController,
  getStream: () =>
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    }),
  sourceFactory: (stream) =>
    createCaptureSource({
      idPrefix: 'camera-preview',
      label: 'Local Camera Preview',
      mediaType: 'video',
      streamType: 'camera',
      stream,
    }),
  videoEl: cameraVideoEl,
});

const microphoneRuntime = createCaptureRuntime({
  controller: microphoneController,
  getStream: () =>
    navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true,
    }),
  sourceFactory: (stream) =>
    createCaptureSource({
      idPrefix: 'microphone-preview',
      label: 'Local Microphone Preview',
      mediaType: 'audio',
      streamType: 'microphone',
      stream,
    }),
  audioEl: microphoneAudioEl,
});

const screenRuntime = createCaptureRuntime({
  controller: screenController,
  getStream: async () => {
    const mediaDevices = navigator.mediaDevices;
    if (!mediaDevices?.getDisplayMedia) {
      throw new Error('Screen sharing is not supported in this browser');
    }

    return mediaDevices.getDisplayMedia({
      video: true,
      audio: false,
    });
  },
  sourceFactory: (stream) =>
    createCaptureSource({
      idPrefix: 'screen-share',
      label: 'Shared Screen',
      mediaType: stream.getAudioTracks().length > 0 ? 'av' : 'video',
      streamType: 'screen',
      stream,
    }),
  videoEl: screenVideoEl,
});

syncStatePanels();
renderDecisionsToReview();

cameraController.subscribe(syncStatePanels);
microphoneController.subscribe(syncStatePanels);
screenController.subscribe(syncStatePanels);

startCameraBtn.addEventListener('click', async () => {
  try {
    await cameraRuntime.start();
  } catch (error) {
    console.error('[media-capture] Failed to start camera preview', error);
  }
});

stopCameraBtn.addEventListener('click', () => {
  cameraRuntime.stop();
});

startMicrophoneBtn.addEventListener('click', async () => {
  try {
    await microphoneRuntime.start();
  } catch (error) {
    console.error('[media-capture] Failed to start microphone preview', error);
  }
});

stopMicrophoneBtn.addEventListener('click', () => {
  microphoneRuntime.stop();
});

startScreenBtn.addEventListener('click', async () => {
  try {
    await screenRuntime.start();
  } catch (error) {
    console.error('[media-capture] Failed to start screen share', error);
  }
});

stopScreenBtn.addEventListener('click', () => {
  screenRuntime.stop();
});

function renderShell() {
  app.innerHTML = `
    <section class="hero">
      <a class="back-link" href="/media-lab.html">Back to Media Lab</a>
      <p class="eyebrow" style="margin-top: 18px;">Capture</p>
      <h1>Stream source lab</h1>
      <p>
        Focused test page for camera, microphone, and screen-sharing capture
        variants with separate live-stream state panels.
      </p>
    </section>

    <div class="grid">
      <section class="panel">
        <p class="eyebrow">Goal</p>
        <h2>Current primitive</h2>
        <ul class="list">
          <li>Exercise camera, microphone, and screen as distinct stream sources.</li>
          <li>Keep capture and element behavior in thin runtimes, not controllers.</li>
          <li>Surface permission failures and active-state transitions clearly.</li>
        </ul>
      </section>

      <section class="panel">
        <p class="eyebrow">Live Stream</p>
        <h2>Camera preview</h2>
        <div class="button-row">
          <button id="start-camera-btn" type="button">Start camera</button>
          <button id="stop-camera-btn" type="button">Stop camera</button>
        </div>
        <video id="camera-video" class="video-frame" autoplay muted playsinline></video>
        <pre id="camera-state"><code></code></pre>
      </section>

      <section class="panel">
        <p class="eyebrow">Live Stream</p>
        <h2>Microphone preview</h2>
        <div class="button-row">
          <button id="start-microphone-btn" type="button">Start microphone</button>
          <button id="stop-microphone-btn" type="button">Stop microphone</button>
        </div>
        <audio id="microphone-audio" class="audio-frame" controls></audio>
        <pre id="microphone-state"><code></code></pre>
      </section>

      <section class="panel">
        <p class="eyebrow">Live Stream</p>
        <h2>Screen sharing</h2>
        <div class="button-row">
          <button id="start-screen-btn" type="button">Start screen</button>
          <button id="stop-screen-btn" type="button">Stop screen</button>
        </div>
        <video id="screen-video" class="video-frame" autoplay muted playsinline></video>
        <pre id="screen-state"><code></code></pre>
      </section>

      <section class="panel">
        <p class="eyebrow">Schema</p>
        <h2>Sample Camera StreamSource</h2>
        <pre><code>${escapeHtml(JSON.stringify(sampleCamera, null, 2))}</code></pre>
      </section>

      <section class="panel">
        <p class="eyebrow">Schema</p>
        <h2>Sample Microphone StreamSource</h2>
        <pre><code>${escapeHtml(JSON.stringify(sampleMicrophone, null, 2))}</code></pre>
      </section>

      <section class="panel">
        <p class="eyebrow">Schema</p>
        <h2>Sample Screen StreamSource</h2>
        <pre><code>${escapeHtml(JSON.stringify(sampleScreen, null, 2))}</code></pre>
      </section>

      <section class="panel">
        <p class="eyebrow">Review</p>
        <h2>Decisions to review</h2>
        <ul id="decisions-review" class="list"></ul>
      </section>
    </div>
  `;
}

function syncStatePanels() {
  cameraStateEl.textContent = JSON.stringify(cameraController.getState(), null, 2);
  microphoneStateEl.textContent = JSON.stringify(
    microphoneController.getState(),
    null,
    2,
  );
  screenStateEl.textContent = JSON.stringify(screenController.getState(), null, 2);
}

function renderDecisionsToReview() {
  const decisions = [
    'Camera, microphone, and screen sharing stay separate stream primitives for now.',
    'Session-level composition remains a later concern instead of a lab-page responsibility.',
    'System-audio capture is not split into its own focused page or runtime yet.',
  ];

  decisionsEl.innerHTML = decisions
    .map((decision) => `<li>${escapeHtml(decision)}</li>`)
    .join('');
}

function createSampleStream({ id, label, mediaType, streamType }) {
  return createCaptureSource({
    id,
    label,
    mediaType,
    streamType,
    stream: {
      id: `${id}-stream`,
      getTracks: () => [{ id: `${id}-track-1` }],
      getVideoTracks: () => [],
      getAudioTracks: () => [],
    },
  });
}

function createCaptureSource({ id, idPrefix, label, mediaType, streamType, stream }) {
  const sourceId = id || `${idPrefix}-${Date.now()}`;

  return {
    id: sourceId,
    kind: 'stream',
    label,
    origin: 'capture',
    mediaType,
    mimeType: inferMimeType(stream, mediaType),
    codecHints: [],
    streamType,
    handle: {
      streamId: stream.id,
      trackIds: stream.getTracks().map((track) => track.id),
    },
  };
}

function inferMimeType(stream, mediaType) {
  const videoTrack = stream.getVideoTracks?.()[0];
  const audioTrack = stream.getAudioTracks?.()[0];

  return (
    videoTrack?.getSettings?.().mimeType ||
    audioTrack?.getSettings?.().mimeType ||
    (mediaType === 'video'
      ? 'video/webm'
      : mediaType === 'audio'
        ? 'audio/webm'
        : null)
  );
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}
