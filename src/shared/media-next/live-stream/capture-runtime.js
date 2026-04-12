import { parseStreamSource } from '../schemas/source-schema.js';

/**
 * Thin DOM runtime for exercising capture-based StreamSource variants.
 * Keeps media-device and element concerns out of the live-stream controller.
 *
 * @param {{
 *   controller: {
 *     attach: (source: unknown) => void,
 *     activate: () => void,
 *     stop: () => void,
 *     fail: (error: string) => void,
 *   },
 *   getStream: () => Promise<MediaStream>,
 *   sourceFactory: (stream: MediaStream) => unknown,
 *   videoEl?: HTMLVideoElement | null,
 *   audioEl?: HTMLMediaElement | null,
 * }} params
 */
export function createCaptureRuntime({
  controller,
  getStream,
  sourceFactory,
  videoEl = null,
  audioEl = null,
}) {
  let currentStream = null;

  async function start() {
    let nextStream = null;

    try {
      nextStream = await getStream();
      const source = parseStreamSource(sourceFactory(nextStream));

      stop();

      currentStream = nextStream;
      if (videoEl) videoEl.srcObject = nextStream;
      if (audioEl) audioEl.srcObject = nextStream;
      controller.attach(source);
      controller.activate();
      return source;
    } catch (error) {
      if (nextStream && nextStream !== currentStream) {
        releaseStream(nextStream);
      } else if (currentStream === nextStream) {
        releaseStream(currentStream);
        if (videoEl) videoEl.srcObject = null;
        if (audioEl) audioEl.srcObject = null;
        currentStream = null;
      }
      controller.fail(getErrorMessage(error, 'Media capture failed to start'));
      throw error;
    }
  }

  function stop() {
    if (currentStream) {
      releaseStream(currentStream);
      currentStream = null;
    }
    if (videoEl) videoEl.srcObject = null;
    if (audioEl) audioEl.srcObject = null;
    controller.stop();
  }

  function destroy() {
    stop();
  }

  return {
    start,
    stop,
    destroy,
  };
}

function getErrorMessage(error, fallback) {
  return error instanceof Error && error.message ? error.message : fallback;
}

function releaseStream(stream) {
  stream.getTracks().forEach((track) => track.stop());
}
