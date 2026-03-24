import { parsePlayableSource } from '../schemas/source-schema.js';

/**
 * Thin DOM runtime for exercising playback with a real HTMLVideoElement.
 * Keeps DOM concerns out of the playback controller itself.
 *
 * @param {{
 *   controller: {
 *     load: (source: unknown) => void,
 *     play: () => void,
 *     pause: () => void,
 *     stop: () => void,
 *     fail: (error: string) => void,
 *     syncMetrics: (metrics: { currentTime: number, duration: number | null }) => void,
 *     getState: () => unknown,
 *   },
 *   videoEl: HTMLVideoElement,
 * }} params
 */
export function createHtmlVideoPlaybackRuntime({ controller, videoEl }) {
  const eventController = new AbortController();
  bindVideoElementEvents(eventController.signal);

  async function load(sourceInput) {
    const source = parsePlayableSource(sourceInput);
    const url = resolvePlayableUrl(source);

    clearVideo();
    videoEl.src = url;
    controller.load(source);
    videoEl.load();

    return source;
  }

  async function play() {
    try {
      await videoEl.play();
      controller.play();
    } catch (error) {
      controller.fail(getErrorMessage(error, 'Playback failed to start'));
      throw error;
    }
  }

  function pause() {
    videoEl.pause();
    controller.pause();
  }

  function stop() {
    videoEl.pause();
    clearVideo();
    controller.stop();
  }

  function destroy() {
    eventController.abort();
    stop();
  }

  function clearVideo() {
    videoEl.removeAttribute('src');
    videoEl.load();
  }

  function bindVideoElementEvents(signal) {
    videoEl.addEventListener('loadedmetadata', () => {
      controller.syncMetrics({
        currentTime: videoEl.currentTime,
        duration: Number.isFinite(videoEl.duration) ? videoEl.duration : null,
      });
    }, { signal });

    videoEl.addEventListener('timeupdate', () => {
      controller.syncMetrics({
        currentTime: videoEl.currentTime,
        duration: Number.isFinite(videoEl.duration) ? videoEl.duration : null,
      });
    }, { signal });

    videoEl.addEventListener('ended', () => {
      controller.pause();
      controller.syncMetrics({
        currentTime: videoEl.currentTime,
        duration: Number.isFinite(videoEl.duration) ? videoEl.duration : null,
      });
    }, { signal });

    videoEl.addEventListener('error', () => {
      controller.fail('Video element failed to load or play the current source');
    }, { signal });
  }

  return {
    load,
    play,
    pause,
    stop,
    destroy,
  };
}

function resolvePlayableUrl(source) {
  if (
    source.playableType === 'remote-url' ||
    source.playableType === 'blob-url' ||
    source.playableType === 'sw-url'
  ) {
    return source.handle.url;
  }

  throw new Error(
    `html video runtime does not yet support playableType="${source.playableType}"`,
  );
}

function getErrorMessage(error, fallback) {
  return error instanceof Error && error.message ? error.message : fallback;
}
