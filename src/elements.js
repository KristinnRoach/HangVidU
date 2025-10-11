// elements.js - Centralized DOM element exports

export const localVideo = document.getElementById('localVideo');
export const remoteVideo = document.getElementById('remoteVideo');
export const sharedVideo = document.getElementById('sharedVideo');

export const startChatBtn = document.getElementById('startChat');
export const hangUpBtn = document.getElementById('hangUp');
export const copyLinkBtn = document.getElementById('copyLink');
export const pipBtn = document.getElementById('pipBtn');
export const toggleMuteBtn = document.getElementById('toggleMute');
export const toggleVideoBtn = document.getElementById('toggleVideo');
export const toggleModeBtn = document.getElementById('toggleMode');
export const loadStreamBtn = document.getElementById('loadStream');

export const statusDiv = document.getElementById('status');
export const linkContainer = document.getElementById('linkContainer');
export const watchContainer = document.getElementById('watchContainer');
export const videoContainer = document.querySelector('.video-container');

export const shareLink = document.getElementById('shareLink');
export const streamUrlInput = document.getElementById('streamUrl');
export const videoFileInput = document.getElementById('videoFile');

export const syncStatus = document.getElementById('syncStatus');
export const uploadProgress = document.getElementById('uploadProgress');

// Reference - deleted after refactor:
// ===== DOM ELEMENTS =====
// const elements = {
//   // Videos
//   localVideo: document.getElementById('localVideo'),
//   remoteVideo: document.getElementById('remoteVideo'),
//   sharedVideo: document.getElementById('sharedVideo'),

//   // Buttons
//   startChatBtn: document.getElementById('startChat'),
//   hangUpBtn: document.getElementById('hangUp'),
//   copyLinkBtn: document.getElementById('copyLink'),
//   pipBtn: document.getElementById('pipBtn'),
//   toggleMuteBtn: document.getElementById('toggleMute'),
//   toggleVideoBtn: document.getElementById('toggleVideo'),
//   toggleModeBtn: document.getElementById('toggleMode'),
//   loadStreamBtn: document.getElementById('loadStream'),

//   // Containers
//   statusDiv: document.getElementById('status'),
//   linkContainer: document.getElementById('linkContainer'),
//   watchContainer: document.getElementById('watchContainer'),
//   videoContainer: document.querySelector('.video-container'),

//   // Inputs
//   shareLink: document.getElementById('shareLink'),
//   streamUrlInput: document.getElementById('streamUrl'),
//   videoFileInput: document.getElementById('videoFile'),

//   // Status
//   syncStatus: document.getElementById('syncStatus'),
//   uploadProgress: document.getElementById('uploadProgress'),
// };
