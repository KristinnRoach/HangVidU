// src/shared/media/constraints.js

import { devDebug } from '../../shared/utils/dev/dev-utils.js';

const userMediaAudioConstraints = {
  default: {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
  },
  withVoiceIsolationIfSupported: {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
    voiceIsolation: true,
    restrictOwnAudio: true,
    googHighpassFilter: true,
    googTypingNoiseDetection: true,
    highpassFilter: true,
    typingNoiseDetection: true,
  },
};

function getAudioConstraints() {
  const supported = navigator.mediaDevices.getSupportedConstraints();

  // Check if all enhanced audio features are supported
  const enhancedPropsToCheck = [
    'voiceIsolation',
    'highpassFilter',
    'typingNoiseDetection',
  ];

  const allEnhancedSupported = enhancedPropsToCheck.every(
    (prop) => supported[prop],
  );

  if (allEnhancedSupported) {
    return userMediaAudioConstraints.withVoiceIsolationIfSupported;
  }

  return userMediaAudioConstraints.default;
}

// 720p, not 1080p: on a 1:1 call (esp. to a phone) 720p is visually
// indistinguishable but roughly halves decoded pixels/sec, cutting the
// receiver's decode battery cost and bitrate. See issue on adaptive
// per-peer encoder caps (videoSender.setParameters) for a finer-grained option.
const desktopVideoConstraints = {
  landscape: {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    frameRate: { min: 10, ideal: 30 },
  },
  portrait: {
    width: { ideal: 720 },
    height: { ideal: 1280 },
    frameRate: { min: 10, ideal: 30 },
  },
};

const isPortraitOrientation = () => {
  const mediaQuery = window.matchMedia?.('(orientation: portrait)');
  if (mediaQuery) {
    return mediaQuery.matches;
  }

  const screenOrientation = window.screen?.orientation?.type;
  if (typeof screenOrientation === 'string') {
    return screenOrientation.includes('portrait');
  }

  return window.innerHeight >= window.innerWidth;
};

function getVideoConstraints(facingMode, orientation = null) {
  if (orientation === null) {
    orientation = isPortraitOrientation() ? 'portrait' : 'landscape';
  }

  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  if (isMobile) {
    devDebug('getVideoConstraints() - mobile minimal: ', {
      facingMode,
    });
    return { facingMode };
  }

  const constraints = desktopVideoConstraints[orientation];

  devDebug('getVideoConstraints() - desktop: ', {
    facingMode,
    ...constraints,
  });

  return {
    facingMode,
    ...constraints,
  };
}

export { getVideoConstraints, getAudioConstraints };
