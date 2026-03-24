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
    try {
      const stream = await getStream();
      const source = parseStreamSource(sourceFactory(stream));

      stop();

      currentStream = stream;
      if (videoEl) videoEl.srcObject = stream;
      if (audioEl) audioEl.srcObject = stream;
      controller.attach(source);
      controller.activate();
      return source;
    } catch (error) {
      controller.fail(getErrorMessage(error, 'Media capture failed to start'));
      throw error;
    }
  }

  function stop() {
    if (currentStream) {
      currentStream.getTracks().forEach((track) => track.stop());
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
