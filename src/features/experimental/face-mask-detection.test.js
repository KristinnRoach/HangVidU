import { afterEach, expect, it, vi } from 'vite-plus/test';
import { faceMaskDetection } from './face-mask-detection';

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

function setup() {
  vi.useFakeTimers();
  vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
  const video = { readyState: 2 };
  const model = { detect: vi.fn().mockResolvedValue([]) };
  const detector = faceMaskDetection(model);
  const results = vi.fn();
  const error = vi.fn();
  return { video, model, detector, results, error };
}

it('paces inference and treats empty results as successful detection', async () => {
  const { detector, model, video, results, error } = setup();
  detector.detectStart(video, results, error);
  await vi.advanceTimersByTimeAsync(49);
  expect(model.detect).toHaveBeenCalledOnce();
  expect(results).toHaveBeenCalledWith([]);
  await vi.advanceTimersByTimeAsync(1);
  expect(model.detect).toHaveBeenCalledTimes(2);
  detector.detectStop();
  await vi.advanceTimersByTimeAsync(1000);
  expect(model.detect).toHaveBeenCalledTimes(2);
  expect(error).not.toHaveBeenCalled();
});

it('waits for cancelled inference before starting on the reused model', async () => {
  const { detector, model, video, results, error } = setup();
  let finish;
  model.detect.mockImplementationOnce(
    () =>
      new Promise((resolve) => {
        finish = resolve;
      }),
  );
  detector.detectStart(video, results, error);
  detector.detectStop();
  const next = faceMaskDetection(model);
  const nextResults = vi.fn();
  next.detectStart({ readyState: 2 }, nextResults, error);
  await vi.advanceTimersByTimeAsync(1000);
  expect(model.detect).toHaveBeenCalledOnce();
  finish(['stale']);
  await vi.advanceTimersByTimeAsync(50);
  expect(results).not.toHaveBeenCalled();
  expect(nextResults).toHaveBeenCalledWith([]);
  expect(model.detect).toHaveBeenCalledTimes(2);
  next.detectStop();
});

it('reports inference rejection once and permits explicit retry', async () => {
  const { detector, model, video, results, error } = setup();
  model.detect.mockRejectedValueOnce(new Error('Inference failed'));
  detector.detectStart(video, results, error);
  await vi.advanceTimersByTimeAsync(1000);
  expect(error).toHaveBeenCalledOnce();
  expect(error).toHaveBeenCalledWith(
    expect.objectContaining({ message: 'Inference failed' }),
  );
  expect(model.detect).toHaveBeenCalledOnce();
  detector.detectStart(video, results, error);
  await vi.advanceTimersByTimeAsync(0);
  expect(results).toHaveBeenCalledWith([]);
  detector.detectStop();
});

it('ignores rejection from an obsolete source', async () => {
  const { detector, model, video, results, error } = setup();
  let reject;
  model.detect.mockImplementationOnce(
    () =>
      new Promise((_resolve, failed) => {
        reject = failed;
      }),
  );
  detector.detectStart(video, results, error);
  detector.detectStop();
  detector.detectStart({ readyState: 2 }, results, error);
  reject(new Error('Old source failed'));
  await vi.advanceTimersByTimeAsync(50);
  expect(error).not.toHaveBeenCalled();
  expect(results).toHaveBeenCalledWith([]);
  detector.detectStop();
});

it('skips hidden or unavailable input and resumes when ready', async () => {
  const { detector, model, video, results, error } = setup();
  const hidden = vi.spyOn(document, 'hidden', 'get').mockReturnValue(true);
  detector.detectStart(video, results, error);
  await vi.advanceTimersByTimeAsync(100);
  expect(model.detect).not.toHaveBeenCalled();
  hidden.mockReturnValue(false);
  video.readyState = 1;
  await vi.advanceTimersByTimeAsync(100);
  expect(model.detect).not.toHaveBeenCalled();
  video.readyState = 2;
  await vi.advanceTimersByTimeAsync(50);
  expect(model.detect).toHaveBeenCalledOnce();
  detector.detectStop();
});
