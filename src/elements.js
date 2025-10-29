// elements.js - Centralized DOM element exports

export const lobbyDiv = document.getElementById('lobby');
export const createLinkBtn = document.getElementById('create-link-btn');
export const copyLinkBtn = document.getElementById('copy-link-btn');

export const videosWrapper = document.getElementById('videos');
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

export const installBtn = document.getElementById('install-btn');

export const statusDiv = document.getElementById('status');
export const syncStatus = document.getElementById('sync-status');

export const mutePartnerBtn = document.getElementById('mute-btn');
export const fullscreenPartnerBtn = document.getElementById(
  'fullscreen-partner-btn'
);
export const micBtn = document.getElementById('mic-btn');
export const cameraBtn = document.getElementById('camera-btn');

export const appPipBtn = document.getElementById('app-pip-btn');

export const appTitleH1 = document.getElementById('app-title-h1');
export const appTitleA = document.getElementById('app-title-a');
export const appTitleSpan = document.getElementById('app-title-span');

// const getElement = (id) => {
//   const el = document.getElementById(id);
//   if (!el) {
//     console.error(`Element with id: ${id} not found.`);
//     return null;
//   }
//   return el;
// };
