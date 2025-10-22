// elements.js - Centralized DOM element exports

export const installBtn = document.getElementById('installBtn');

export const localVideo = document.getElementById('localVideo');
export const remoteVideo = document.getElementById('remoteVideo');
export const sharedVideo = document.getElementById('sharedVideo');

export const videoInputSelect = document.querySelector(
  'select-media-device[type="videoinput"]'
);
export const audioInputSelect = document.querySelector(
  'select-media-device[type="audioinput"]'
);
export const audioOutputSelect = document.querySelector(
  'select-media-device[type="audiooutput"]'
);

export const startChatBtn = document.getElementById('startChat');
export const hangUpBtn = document.getElementById('hangUp');
export const copyLinkBtn = document.getElementById('copyLink');
export const pipBtn = document.getElementById('pipBtn');
export const switchCameraSelfBtn = document.getElementById(
  'switchCameraSelfBtn'
);

export const statusDiv = document.getElementById('status');
export const linkContainer = document.getElementById('linkContainer');
export const watchContainer = document.getElementById('watchContainer');
export const ytContainer = document.getElementById('yt-player-div');
export const chatContainer = document.getElementById('videos'); // document.querySelector('.video-container');

export const syncStatus = document.getElementById('syncStatus');

export const shareLink = document.getElementById('shareLink');
export const streamUrlInput = document.getElementById('streamUrl');

export const mutePartnerBtn = document.getElementById('mutePartnerBtn');
export const fullscreenPartnerBtn = document.getElementById(
  'fullscreenPartnerBtn'
);
export const muteSelfBtn = document.getElementById('muteSelfBtn');
export const videoSelfBtn = document.getElementById('videoSelfBtn');
export const fullscreenSelfBtn = document.getElementById('fullscreenSelfBtn');

export const titleHeader = document.getElementById('titleHeader');
export const titleLink = document.getElementById('titleLink');
export const titleText = document.getElementById('titleText');

// export const videoFileInput = document.getElementById('videoFile');
// export const uploadProgress = document.getElementById('uploadProgress');
// const uploadBtn = document.getElementById('uploadBtn'); // Temporarily disabled
