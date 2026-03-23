import {
  Input,
  Output,
  Conversion,
  MATROSKA,
  BlobSource,
  Mp4OutputFormat,
  BufferTarget,
} from 'mediabunny';
import { ensureEac3Support } from './eac3-lazy.js';
import { DEFAULT_AAC_BITRATE } from './config.js';
import {
  getTrackCodecCandidates,
  trackNeedsAc3Decoder,
} from './codec-utils.js';

/**
 * @typedef {Object} ConvertResult
 * @property {Blob} blob - The converted MP4 blob
 * @property {boolean} hadInputAudio - Whether the input file contained audio
 * @property {boolean} hasOutputAudio - Whether the output file contains audio
 * @property {string[]} droppedAudioCodecs - Audio codecs that couldn't be converted
 */

/**
 * Convert an MKV file to MP4 in the browser.
 * Video tracks are transmuxed (copied) when the codec is MP4-compatible.
 * Audio is transcoded to AAC when the browser can decode the source codec.
 *
 * Pass `withAc3: true` to load the AC3/EAC3 WASM decoder for codecs the
 * browser can't handle natively. Without it, those tracks are discarded.
 *
 * @param {File|Blob} file - MKV file to convert
 * @param {{ onProgress?: (progress: number) => void, withAc3?: boolean }} [options]
 * @returns {Promise<ConvertResult>}
 */
export async function convertToMp4(file, { onProgress, withAc3 = false } = {}) {
  const input = new Input({
    formats: [MATROSKA],
    source: new BlobSource(file),
  });
  const output = new Output({
    format: new Mp4OutputFormat(),
    target: new BufferTarget(),
  });

  const conversion = await Conversion.init({
    input,
    output,
    audio: async (audioTrack) => {
      const trackCodecs = await getTrackCodecCandidates(audioTrack);

      if (trackCodecs.has('aac') || trackCodecs.has('mp4a.40.2')) {
        return { codec: 'aac' };
      }

      if (trackNeedsAc3Decoder(trackCodecs)) {
        if (!withAc3) return { discard: true };

        const eac3Support = await ensureEac3Support();
        const canEncode = await eac3Support.canEncodeAac({
          sampleRate: audioTrack.sampleRate,
          numberOfChannels: audioTrack.numberOfChannels,
          bitrate: DEFAULT_AAC_BITRATE,
        });
        if (!canEncode) return { discard: true };

        return {
          codec: 'aac',
          sampleRate: audioTrack.sampleRate,
          numberOfChannels: audioTrack.numberOfChannels,
          bitrate: DEFAULT_AAC_BITRATE,
        };
      }

      return { discard: true };
    },
  });

  const hadInputAudio = conversion.utilizedTracks.some((track) => track.type === 'audio')
    || conversion.discardedTracks.some((t) => t.track.type === 'audio');
  const droppedAudio = conversion.discardedTracks.filter(
    (t) => t.track.type === 'audio',
  );
  const droppedAudioCodecs = droppedAudio.map((t) => t.track.codec);
  const hasOutputAudio = conversion.utilizedTracks.some(
    (track) => track.type === 'audio',
  );

  if (conversion.discardedTracks.length > 0) {
    console.debug(
      '[convertToMp4] Discarded tracks:',
      conversion.discardedTracks.map((t) => ({
        type: t.track.type,
        codec: t.track.codec,
        reason: t.reason,
      })),
    );
  }

  if (!conversion.isValid) {
    const reasons = conversion.discardedTracks
      .map((t) => `${t.track.type}(${t.reason})`)
      .join(', ');
    throw new Error('Conversion not possible: ' + reasons);
  }

  if (onProgress) conversion.onProgress = onProgress;
  await conversion.execute();

  return {
    blob: new Blob([output.target.buffer], { type: 'video/mp4' }),
    hadInputAudio,
    hasOutputAudio,
    droppedAudioCodecs,
  };
}
