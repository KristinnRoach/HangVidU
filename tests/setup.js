// Stub globalThis.__vitest_worker__.metaEnv for tests so Firebase config does not throw
try {
  if (typeof globalThis.__vitest_worker__ === 'object') {
    if (!globalThis.__vitest_worker__.metaEnv)
      globalThis.__vitest_worker__.metaEnv = {};
    Object.assign(globalThis.__vitest_worker__.metaEnv, {
      VITE_FIREBASE_API_KEY: 'dummy',
      VITE_FIREBASE_AUTH_DOMAIN: 'dummy',
      VITE_FIREBASE_PROJECT_ID: 'dummy',
      VITE_APP_GOOGLE_CLIENT_ID: 'dummy',
    });
  }
} catch {}
// tests/setup.js

import { vi } from 'vitest';

// Mock WebRTC APIs globally for all tests
global.RTCPeerConnection = class RTCPeerConnection {
  constructor(config) {
    this.signalingState = 'stable';
    this.remoteDescription = null;
    this.localDescription = null;
    this.onicecandidate = null;
    this.addIceCandidate = vi.fn();
    this.addEventListener = vi.fn();
    this.removeEventListener = vi.fn();
  }

  setRemoteDescription(desc) {
    this.remoteDescription = desc;
    return Promise.resolve();
  }

  setLocalDescription(desc) {
    this.localDescription = desc;
    return Promise.resolve();
  }

  createOffer() {
    return Promise.resolve({ type: 'offer', sdp: 'mock-offer-sdp' });
  }

  createAnswer() {
    return Promise.resolve({ type: 'answer', sdp: 'mock-answer-sdp' });
  }

  close() {
    this.signalingState = 'closed';
  }
};

global.RTCIceCandidate = class RTCIceCandidate {
  constructor(candidateInit) {
    Object.assign(this, candidateInit);
  }
};

global.RTCSessionDescription = class RTCSessionDescription {
  constructor(descriptionInit) {
    Object.assign(this, descriptionInit);
  }
};
