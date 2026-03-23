let eac3Support = null;

/**
 * Lazy-load the AC3/EAC3 WASM decoder and register it with MediaBunny.
 * Subsequent calls return the cached support object.
 * @returns {Promise<{ canEncodeAac: (opts: { sampleRate: number, numberOfChannels: number, bitrate: number }) => Promise<boolean> }>}
 */
export async function ensureEac3Support() {
  if (eac3Support) return eac3Support;

  const { registerAc3Decoder } = await import('@mediabunny/ac3');
  registerAc3Decoder();

  const { canEncodeAudio } = await import('mediabunny');

  const canEncodeAac = async ({ sampleRate, numberOfChannels, bitrate }) => {
    return canEncodeAudio('aac', {
      sampleRate,
      numberOfChannels,
      bitrate,
    });
  };

  eac3Support = { canEncodeAac };
  return eac3Support;
}

/**
 * Prompt the user before loading the large EAC3 WASM module.
 * @returns {boolean} true if the user accepted
 */
export function promptUserForEac3Support() {
  return window.confirm(
    'The video contains EAC3 audio, which requires loading additional support (large download + high CPU usage). Do you want to proceed? Cancel to drop the audio and continue with only video.',
  );
}
