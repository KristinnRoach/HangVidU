import {
  PlayableSourceSchema,
  StreamSourceSchema,
  createPlaybackController,
  createLiveStreamController,
} from '../index.js';

const app = document.getElementById('app');

const playbackController = createPlaybackController();
const liveStreamController = createLiveStreamController();

const samplePlayable = PlayableSourceSchema.parse({
  id: 'sample-playable-1',
  kind: 'playable',
  label: 'Sample MP4',
  origin: 'local-file',
  mimeType: 'video/mp4',
  playableType: 'file',
  handle: {
    fileId: 'sample-file-id',
    fileName: 'sample.mp4',
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

playbackController.load(samplePlayable);
playbackController.play();
liveStreamController.attach(sampleStream);
liveStreamController.activate();

render();

function render() {
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
        <h2>Source split</h2>
        <ul class="list">
          <li><code>PlayableSource</code> is for file, blob, service-worker, or remote URL playback.</li>
          <li><code>StreamSource</code> is for live capture like camera, microphone, screen, and system audio.</li>
          <li>The public UI layer should depend on state and events, not implementation details.</li>
        </ul>
      </section>

      <section class="panel">
        <p class="eyebrow">Playback</p>
        <h2>Placeholder controller state</h2>
        <pre><code>${escapeHtml(JSON.stringify(playbackController.getState(), null, 2))}</code></pre>
      </section>

      <section class="panel">
        <p class="eyebrow">Live Stream</p>
        <h2>Placeholder controller state</h2>
        <pre><code>${escapeHtml(JSON.stringify(liveStreamController.getState(), null, 2))}</code></pre>
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
    </div>
  `;
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}
