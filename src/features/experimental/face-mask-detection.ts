// One scheduler per reused model: cancellation cannot interrupt ml5 inference.
// A new capture must wait for the previous inference rather than overlap it.
type Model<T> = { detect: (video: HTMLVideoElement) => Promise<T> };
type Request<T> = {
  video: HTMLVideoElement;
  onResults: (results: T) => void;
  onError: (error: unknown) => void;
};
const detectors = new WeakMap<object, unknown>();

function createDetector<T>(model: Model<T>) {
  let request: Request<T> | undefined;
  let running = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const run = async () => {
    if (running || !request) return;
    const current = request;
    running = true;
    try {
      // Avoid doing optional inference while the page or input is suspended.
      if (!document.hidden && current.video.readyState >= 2) {
        const results = await model.detect(current.video);
        if (request === current) current.onResults(results);
      }
    } catch (error) {
      if (request === current) {
        request = undefined;
        current.onError(error);
      }
    } finally {
      running = false;
      // Match the renderer's target; slow inference never queues extra work.
      if (request) timer = setTimeout(() => void run(), 1000 / 20);
    }
  };
  return {
    detectStart(
      video: HTMLVideoElement,
      onResults: (results: T) => void,
      onError: (error: unknown) => void,
    ) {
      clearTimeout(timer);
      request = { video, onResults, onError };
      void run();
    },
    detectStop() {
      request = undefined;
      clearTimeout(timer);
    },
  };
}

export function faceMaskDetection<T>(model: Model<T>) {
  let detector = detectors.get(model);
  if (!detector) {
    detector = createDetector(model);
    detectors.set(model, detector);
  }
  return detector as ReturnType<typeof createDetector<T>>;
}
