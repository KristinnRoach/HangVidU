// src/media/constraints.js

import { devDebug } from '../utils/dev/dev-utils';

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

const getFallbackAudioConstraints = () => userMediaAudioConstraints.default;

const userMediaVideoConstraints = {
  desktop: {
    landscape: {
      width: { ideal: 1920 },
      height: { ideal: 1080 }, // Todo: When mobile testing set up: -> consider using () => window.innerWidth, window.innerHeight
      frameRate: { min: 10, ideal: 30 },
      // aspectRatio: { ideal: 16 / 9 },
    },
    portrait: {
      width: { ideal: 1080 },
      height: { ideal: 1920 },
      frameRate: { min: 10, ideal: 30 },
      // aspectRatio: { ideal: 9 / 16 },
    },
  },
  mobile: {
    portrait: {
      width: { ideal: 1080 },
      height: { ideal: 1920 },
      // aspectRatio: { ideal: 9 / 16 },
      frameRate: { ideal: 30 },
    },
    landscape: {
      width: { ideal: 1920 },
      height: { ideal: 1080 },
      // aspectRatio: { ideal: 16 / 9 },
      frameRate: { ideal: 30 },
    },
  },
};

const isPortraitOrientation = () => {
  const mediaQuery = window.matchMedia?.('(orientation: portrait)');
  if (mediaQuery) {
    const result = mediaQuery.matches;
    console.log('isPortraitOrientation check:', {
      source: 'matchMedia',
      result,
    });
    return result;
  }

  const screenOrientation = window.screen?.orientation?.type;
  if (typeof screenOrientation === 'string') {
    const result = screenOrientation.includes('portrait');
    console.log('isPortraitOrientation check:', {
      source: 'screen.orientation',
      screenOrientation,
      result,
    });
    return result;
  }

  const result = window.innerHeight >= window.innerWidth;
  console.log('isPortraitOrientation check:', {
    source: 'innerSizeFallback',
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    result,
  });
  return result;
};

function getVideoConstraints(facingMode, orientation = null) {
  if (orientation === null) {
    orientation = isPortraitOrientation() ? 'portrait' : 'landscape';
  }

  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  if (isMobile) {
    devDebug('getVideoConstraints() - mobile minimal constraints', {
      facingMode,
      orientation,
    });
    return { facingMode };
  }

  const deviceType = 'desktop';
  const constraints = userMediaVideoConstraints[deviceType][orientation];

  devDebug('getVideoConstraints() - ', { facingMode, orientation, deviceType });
  devDebug('Video constraints:', constraints);

  return {
    facingMode,
    ...constraints,
  };
}

export {
  getVideoConstraints,
  getAudioConstraints,
  getFallbackAudioConstraints,
};
