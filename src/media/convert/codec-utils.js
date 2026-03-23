/**
 * Collect normalized codec identifiers from a MediaBunny audio track.
 * @param {import('mediabunny').InputAudioTrack} track
 * @returns {Promise<Set<string>>}
 */
export async function getTrackCodecCandidates(track) {
  const candidates = new Set();

  if (track?.codec) candidates.add(normalizeCodec(track.codec));

  if (typeof track?.getCodecParameterString === 'function') {
    try {
      const codecParam = await track.getCodecParameterString();
      if (codecParam) candidates.add(normalizeCodec(codecParam));
    } catch {
      // Some inputs may not expose a codec parameter string. Ignore.
    }
  }

  return candidates;
}

/**
 * Check if any codec in the set belongs to the AC-3/E-AC-3 family.
 * @param {Set<string>} trackCodecs - Normalized codec identifiers
 * @returns {boolean}
 */
export function trackNeedsAc3Decoder(trackCodecs) {
  for (const codec of trackCodecs) {
    if (isAc3FamilyCodec(codec)) return true;
  }
  return false;
}

function normalizeCodec(codec) {
  return String(codec ?? '')
    .trim()
    .toLowerCase();
}

function isAc3FamilyCodec(codec) {
  const normalized = normalizeCodec(codec);
  return (
    normalized === 'ac3' ||
    normalized === 'eac3' ||
    normalized === 'ac-3' ||
    normalized === 'ec-3'
  );
}
