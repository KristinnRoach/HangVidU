import {
  PlayableSourceSchema,
  StreamSourceSchema,
  createPlaybackController,
  createLiveStreamController,
} from '../index.js';
import { createHtmlVideoPlaybackRuntime } from '../playback/html-video-playback.js';
import { createCameraPreviewRuntime } from '../live-stream/camera-preview-runtime.js';

const app = document.getElementById('app');

const playbackController = createPlaybackController();
const liveStreamController = createLiveStreamController();

const samplePlayable = PlayableSourceSchema.parse({
  id: 'sample-playable-1',
  kind: 'playable',
  label: 'Flower MP4',
  origin: 'url',
  mimeType: 'video/mp4',
  playableType: 'remote-url',
  handle: {
    url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  },
});

const sampleStream = StreamSourceSchema.parse({
  id: 'sample-stream-1',
  kind: 'stream',
  label: 'Local Camera',
  origin: 'capture',
  mimeType: 'video/webm',
  streamType: 'camera',
  handle: {
    streamId: 'local-preview-stream',
    trackIds: ['video-track-1'],
  },
});

renderShell();

const playbackVideoEl = document.getElementById('playback-video');
const cameraVideoEl = document.getElementById('camera-video');
const playbackStateEl = document.getElementById('playback-state');
const liveStreamStateEl = document.getElementById('live-stream-state');
const decisionsEl = document.getElementById('decisions-review');
const playbackUrlInput = document.getElementById('playback-url-input');
const loadPlaybackBtn = document.getElementById('load-playback-btn');
const playPlaybackBtn = document.getElementById('play-playback-btn');
const pausePlaybackBtn = document.getElementById('pause-playback-btn');
const stopPlaybackBtn = document.getElementById('stop-playback-btn');
const startCameraBtn = document.getElementById('start-camera-btn');
const stopCameraBtn = document.getElementById('stop-camera-btn');

const playbackRuntime = createHtmlVideoPlaybackRuntime({
  controller: playbackController,
  videoEl: playbackVideoEl,
});
const cameraRuntime = createCameraPreviewRuntime({
  controller: liveStreamController,
  videoEl: cameraVideoEl,
});

playbackUrlInput.value = samplePlayable.handle.url;
syncStatePanels();
renderDecisionsToReview();

playbackController.subscribe(syncStatePanels);
liveStreamController.subscribe(syncStatePanels);

loadPlaybackBtn.addEventListener('click', async () => {
  const url = playbackUrlInput.value.trim();
  if (!url) return;

  const source = {
    ...samplePlayable,
    id: `remote-url-${Date.now()}`,
    label: 'Lab Remote URL',
    handle: { url },
  };

  try {
    await playbackRuntime.load(source);
  } catch (error) {
    console.error('[media-lab] Failed to load playback source', error);
  }
});

playPlaybackBtn.addEventListener('click', async () => {
  try {
    await playbackRuntime.play();
  } catch (error) {
    console.error('[media-lab] Failed to play video', error);
  }
});

pausePlaybackBtn.addEventListener('click', () => {
  playbackRuntime.pause();
});

stopPlaybackBtn.addEventListener('click', () => {
  playbackRuntime.stop();
});

startCameraBtn.addEventListener('click', async () => {
  try {
    await cameraRuntime.start();
  } catch (error) {
    console.error('[media-lab] Failed to start camera preview', error);
  }
});

stopCameraBtn.addEventListener('click', () => {
  cameraRuntime.stop();
});

function renderShell() {
  app.innerHTML = `
    <section class="hero">
      <p class="eyebrow">Media Lab</p>
      <h1>Isolated scaffold for the next media module</h1>
      <p>
        This page is intentionally separate from the production app. It exists to
        validate contracts, boundaries, and state flow before any migration work.
      </p>
      <div class="badge-row">
        <span class="badge">No production integration</span>
        <span class="badge">Schema-first contracts</span>
        <span class="badge">UI-free core modules</span>
      </div>
    </section>

    <div class="grid">
      <section class="panel">
        <p class="eyebrow">Contracts</p>
        <h2>Current session goal</h2>
        <ul class="list">
          <li>Load a real remote video URL through <code>PlayableSource</code>.</li>
          <li>Start and stop a real local camera preview through <code>StreamSource</code>.</li>
          <li>Keep the DOM handling in thin runtimes, not in the core controllers.</li>
        </ul>
      </section>

      <section class="panel">
        <p class="eyebrow">Playback</p>
        <h2>Remote URL playback</h2>
        <div class="control-stack">
          <label class="field-label" for="playback-url-input">Remote MP4 URL</label>
          <input id="playback-url-input" class="text-input" type="url" placeholder="https://example.com/video.mp4" />
          <div class="button-row">
            <button id="load-playback-btn" type="button">Load</button>
            <button id="play-playback-btn" type="button">Play</button>
            <button id="pause-playback-btn" type="button">Pause</button>
            <button id="stop-playback-btn" type="button">Stop</button>
          </div>
          <video id="playback-video" class="video-frame" controls playsinline preload="metadata"></video>
          <pre id="playback-state"><code></code></pre>
        </div>
      </section>

      <section class="panel">
        <p class="eyebrow">Live Stream</p>
        <h2>Camera preview</h2>
        <div class="button-row">
          <button id="start-camera-btn" type="button">Start camera</button>
          <button id="stop-camera-btn" type="button">Stop camera</button>
        </div>
        <video id="camera-video" class="video-frame" autoplay muted playsinline></video>
        <pre id="live-stream-state"><code></code></pre>
      </section>

      <section class="panel">
        <p class="eyebrow">Schema</p>
        <h2>Sample PlayableSource</h2>
        <pre><code>${escapeHtml(JSON.stringify(samplePlayable, null, 2))}</code></pre>
      </section>

      <section class="panel">
        <p class="eyebrow">Schema</p>
        <h2>Sample StreamSource</h2>
        <pre><code>${escapeHtml(JSON.stringify(sampleStream, null, 2))}</code></pre>
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
  playbackStateEl.textContent = JSON.stringify(
    playbackController.getState(),
    null,
    2,
  );
  liveStreamStateEl.textContent = JSON.stringify(
    liveStreamController.getState(),
    null,
    2,
  );
}

function renderDecisionsToReview() {
  const decisions = [
    'If these DOM runtimes stabilize, promote them into a documented adapter layer.',
    'Playback and live-stream remain separate; no session-level aggregate controller is defined yet.',
  ];

  decisionsEl.innerHTML = decisions
    .map((decision) => `<li>${escapeHtml(decision)}</li>`)
    .join('');
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}
