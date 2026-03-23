let eac3Support = null;

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

// since EAC3 support requires loading a large WASM module, we ask the user for permission first
export function promptUserForEac3Support() {
  return window.confirm(
    'The video contains EAC3 audio, which requires loading additional support (large download + high CPU usage). Do you want to proceed? Cancel to drop the audio and continue with only video.',
  );
}
