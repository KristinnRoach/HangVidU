import { parseStreamSource } from '../schemas/source-schema.js';

/**
 * Thin DOM runtime for exercising live camera preview with a real HTMLVideoElement.
 * Keeps DOM and media-device concerns out of the live-stream controller itself.
 *
 * @param {{
 *   controller: {
 *     attach: (source: unknown) => void,
 *     activate: () => void,
 *     stop: () => void,
 *   },
 *   videoEl: HTMLVideoElement,
 * }} params
 */
export function createCameraPreviewRuntime({ controller, videoEl }) {
  let currentStream = null;

  async function start() {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

    const source = parseStreamSource({
      id: `camera-preview-${Date.now()}`,
      kind: 'stream',
      label: 'Local Camera Preview',
      origin: 'capture',
      mimeType: stream.getVideoTracks()[0]?.getSettings?.().mimeType || null,
      streamType: 'camera',
      handle: {
        streamId: stream.id,
        trackIds: stream.getTracks().map((track) => track.id),
      },
    });

    if (currentStream) stop();

    currentStream = stream;
    videoEl.srcObject = stream;
    controller.attach(source);
    controller.activate();

    return source;
  }

  async function safeStart() {
    try {
      return await start();
    } catch (error) {
      controller.fail(getErrorMessage(error, 'Camera preview failed to start'));
      throw error;
    }
  }

  function stop() {
    if (currentStream) {
      currentStream.getTracks().forEach((track) => track.stop());
      currentStream = null;
    }
    videoEl.srcObject = null;
    controller.stop();
  }

  function destroy() {
    stop();
  }

  return {
    start: safeStart,
    stop,
    destroy,
  };
}

function getErrorMessage(error, fallback) {
  return error instanceof Error && error.message ? error.message : fallback;
}
