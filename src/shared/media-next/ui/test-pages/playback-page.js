import { PlayableSourceSchema, createPlaybackController } from '../../index.js';
import { createHtmlVideoPlaybackRuntime } from '../../playback/html-video-playback.js';

const app = document.getElementById('app');

const playbackController = createPlaybackController();

const samplePlayable = PlayableSourceSchema.parse({
  id: 'sample-playable-1',
  kind: 'playable',
  label: 'Flower MP4',
  origin: 'url',
  mediaType: 'video',
  mimeType: 'video/mp4',
  codecHints: [],
  playableType: 'remote-url',
  handle: {
    url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  },
});

renderShell();

const playbackVideoEl = document.getElementById('playback-video');
const playbackStateEl = document.getElementById('playback-state');
const playbackUrlInput = document.getElementById('playback-url-input');
const loadPlaybackBtn = document.getElementById('load-playback-btn');
const playPlaybackBtn = document.getElementById('play-playback-btn');
const pausePlaybackBtn = document.getElementById('pause-playback-btn');
const stopPlaybackBtn = document.getElementById('stop-playback-btn');

const playbackRuntime = createHtmlVideoPlaybackRuntime({
  controller: playbackController,
  videoEl: playbackVideoEl,
});

playbackUrlInput.value = samplePlayable.handle.url;
syncStatePanel();

playbackController.subscribe(syncStatePanel);

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
    console.error('[media-playback] Failed to load playback source', error);
  }
});

playPlaybackBtn.addEventListener('click', async () => {
  try {
    await playbackRuntime.play();
  } catch (error) {
    console.error('[media-playback] Failed to play video', error);
  }
});

pausePlaybackBtn.addEventListener('click', () => {
  playbackRuntime.pause();
});

stopPlaybackBtn.addEventListener('click', () => {
  playbackRuntime.stop();
});

function renderShell() {
  app.innerHTML = `
    <section class="hero">
      <a class="back-link" href="/media-lab.html">Back to Media Lab</a>
      <p class="eyebrow" style="margin-top: 18px;">Playback</p>
      <h1>Playable source lab</h1>
      <p>
        Focused test page for remote playable sources, playback state
        transitions, and HTML video runtime integration.
      </p>
    </section>

    <div class="grid">
      <section class="panel">
        <p class="eyebrow">Goal</p>
        <h2>Current primitive</h2>
        <ul class="list">
          <li>Exercise a real remote playable source through the playback domain.</li>
          <li>Keep the video element runtime outside the controller.</li>
          <li>Show loading, ready, playing, paused, and error state transitions.</li>
        </ul>
      </section>

      <section class="panel">
        <p class="eyebrow">Playback</p>
        <h2>Remote URL playback</h2>
        <div class="control-stack">
          <label class="field-label" for="playback-url-input">Remote media URL</label>
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
        <p class="eyebrow">Schema</p>
        <h2>Sample PlayableSource</h2>
        <pre><code>${escapeHtml(JSON.stringify(samplePlayable, null, 2))}</code></pre>
      </section>
    </div>
  `;
}

function syncStatePanel() {
  playbackStateEl.textContent = JSON.stringify(
    playbackController.getState(),
    null,
    2,
  );
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}
