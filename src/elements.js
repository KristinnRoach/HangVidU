// elements.js - Centralized DOM element exports

export const installBtn = document.getElementById('install-btn');

export const localVideoEl = document.getElementById('local-video-el');
export const localBoxEl = document.getElementById('local-video-box');
export const remoteVideoEl = document.getElementById('remote-video-el');
export const remoteBoxEl = document.getElementById('remote-video-box');
export const sharedVideoEl = document.getElementById('shared-video-el');
export const sharedBoxEl = document.getElementById('shared-video-box');

export const chatControls = document.getElementById('chat-controls');
export const callBtn = document.getElementById('call-btn');
export const hangUpBtn = document.getElementById('hang-up-btn');
export const switchCameraBtn = document.getElementById('switch-camera-btn');

export const statusDiv = document.getElementById('status');
export const linkContainer = document.getElementById('link-container');
export const chatContainer = document.getElementById('videos');

export const syncStatus = document.getElementById('sync-status');

export const shareLink = document.getElementById('share-link');
export const streamUrlInput = document.getElementById('stream-url-input');

export const mutePartnerBtn = document.getElementById('mute-btn');
export const fullscreenPartnerBtn = document.getElementById(
  'fullscreenPartnerBtn'
);
export const micBtn = document.getElementById('mic-btn');
export const cameraBtn = document.getElementById('camera-btn');

export const fullscreenAppBtn = document.getElementById('fullscreen-app-btn');

export const titleHeader = document.getElementById('titleHeader');
export const titleLink = document.getElementById('titleLink');
export const titleText = document.getElementById('titleText');

// const getElement = (id) => {
//   const el = document.getElementById(id);
//   if (!el) {
//     console.error(`Element with id: ${id} not found.`);
//     return null;
//   }

//   return el;
// };

// export const videoInputSelect
// export const audioInputSelect
// export const audioOutputSelect

// export const videoFileInput = document.getElementById('videoFile');
// export const uploadProgress = document.getElementById('uploadProgress');
// const uploadBtn = document.getElementById('uploadBtn'); // Temporarily disabled
