import {
  createDetector,
  SupportedModels,
  util,
} from '@tensorflow-models/face-landmarks-detection';
import { setBackend } from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';

const model = SupportedModels.MediaPipeFaceMesh;

export const initializeWebGL = () => setBackend('webgl');

export async function createFaceMesh() {
  const detector = await createDetector(model, {
    runtime: 'tfjs',
    maxFaces: 1,
    refineLandmarks: false,
  });
  const edges = util.getAdjacentPairs(model);
  const triangles: number[][] = [];
  // The published connections list contains three directed edges per triangle.
  for (let i = 0; i < edges.length; i += 3) {
    triangles.push([edges[i]![0]!, edges[i + 1]![0]!, edges[i + 2]![0]!]);
  }
  return {
    detect: (video: HTMLVideoElement) => detector.estimateFaces(video),
    triangles,
  };
}
