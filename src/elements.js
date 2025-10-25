// elements.js - Centralized DOM element exports

export const installBtn = document.getElementById('installBtn');

export const localVideo = document.getElementById('localVideo');
export const remoteVideo = document.getElementById('remoteVideo');
export const sharedVideo = document.getElementById('sharedVideo');

export const chatControls = document.getElementById('chat-controls');
export const callBtn = document.getElementById('call-btn');
export const hangUpBtn = document.getElementById('hang-up-btn');
export const copyLinkBtn = document.getElementById('copyLink');
export const pipBtn = document.getElementById('pipBtn');
export const switchCameraSelfBtn = document.getElementById(
  'switchCameraSelfBtn'
);

export const statusDiv = document.getElementById('status');
export const linkContainer = document.getElementById('linkContainer');
export const watchContainer = document.getElementById('watchContainer');
export const chatContainer = document.getElementById('videos');

export const syncStatus = document.getElementById('syncStatus');

export const shareLink = document.getElementById('shareLink');
export const streamUrlInput = document.getElementById('streamUrl');

export const mutePartnerBtn = document.getElementById('mute-btn');
export const fullscreenPartnerBtn = document.getElementById(
  'fullscreenPartnerBtn'
);
export const micBtn = document.getElementById('mic-btn');
export const cameraBtn = document.getElementById('camera-btn');
export const fullscreenSelfBtn = document.getElementById('fullscreenSelfBtn');

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
