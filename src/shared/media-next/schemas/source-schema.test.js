import { describe, expect, it } from 'vitest';
import { parsePlayableSource } from './source-schema.js';

describe('PlayableSourceSchema', () => {
  it('rejects capture as a playable origin', () => {
    expect(() =>
      parsePlayableSource({
        id: 'playable-1',
        kind: 'playable',
        label: 'Remote clip',
        origin: 'capture',
        mediaType: 'video',
        mimeType: 'video/mp4',
        codecHints: [],
        playableType: 'remote-url',
        handle: {
          url: 'https://example.com/video.mp4',
        },
      }),
    ).toThrow();
  });
});
