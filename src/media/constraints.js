// src/media/constraints.js

export const userMediaAudioConstraints = {
  default: {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,

    // Browser should ignore the below constraints if not available
    voiceIsolation: true,
    restrictOwnAudio: true,
    googHighpassFilter: true, // chromium
    googTypingNoiseDetection: true, // chromium
    highpassFilter: true,
    typingNoiseDetection: true,
  },
};

export const userMediaVideoConstraints = {
  desktop: {
    landscape: {
      width: { min: 1280, ideal: 1920, max: 2560 }, // Todo: When mobile testing set up:
      height: { min: 720, ideal: 1080, max: 1440 }, // -> consider using () => window.innerWidth, window.innerHeight
      frameRate: { min: 15, ideal: 30, max: 60 },
      aspectRatio: { ideal: 16 / 9 },
      resizeMode: 'none',
    },
    portrait: {
      width: { min: 720, ideal: 1080, max: 1440 },
      height: { min: 1280, ideal: 1920, max: 2560 },
      frameRate: { min: 15, ideal: 30, max: 60 },
      aspectRatio: { ideal: 9 / 16 },
      resizeMode: 'none',
    },
  },
  mobile: {
    portrait: {
      width: { min: 720, ideal: 1080, max: 1440 },
      height: { min: 1280, ideal: 1920, max: 2560 },
      aspectRatio: { ideal: 9 / 16 },
      frameRate: { min: 15, ideal: 30, max: 60 },
      resizeMode: 'none',
    },
    landscape: {
      width: { min: 1280, ideal: 1920, max: 2560 },
      height: { min: 720, ideal: 1080, max: 1440 },
      aspectRatio: { ideal: 16 / 9 },
      frameRate: { min: 15, ideal: 30, max: 60 },
      resizeMode: 'none',
    },
  },
  relyOnBrowserDefaults: true,
};

export function isPortraitOrientation() {
  return (
    window.screen?.orientation?.type?.includes('portrait') ||
    window.orientation === 0 ||
    window.orientation === 180
  );
}

export function getOrientationAwareVideoConstraints(facingMode) {
  const orientation = isPortraitOrientation() ? 'portrait' : 'landscape';
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  if (!isMobile) {
    return {
      facingMode,
      ...userMediaVideoConstraints.desktop[orientation],
    };
  }

  return {
    facingMode,
    ...userMediaVideoConstraints.mobile[orientation],
  };
}
