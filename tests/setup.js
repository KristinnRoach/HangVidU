// tests/setup.js - Vitest setup file

import { vi } from 'vitest';

// Mock Firebase for unit tests
global.mockFirebase = {
  ref: (path) => ({
    set: vi.fn().mockResolvedValue(),
    on: vi.fn(),
    off: vi.fn(),
    once: vi.fn().mockResolvedValue({ val: () => null }),
    child: vi.fn().mockReturnThis(),
    push: vi.fn().mockResolvedValue({ key: 'mock-key' }),
    remove: vi.fn().mockResolvedValue(),
    update: vi.fn().mockResolvedValue(),
    onDisconnect: vi.fn().mockReturnValue({
      set: vi.fn().mockResolvedValue(),
      remove: vi.fn().mockResolvedValue()
    })
  })
};

// Mock WebRTC APIs
global.RTCPeerConnection = vi.fn().mockImplementation(() => ({
  createOffer: vi.fn().mockResolvedValue({ type: 'offer', sdp: 'mock-sdp' }),
  createAnswer: vi.fn().mockResolvedValue({ type: 'answer', sdp: 'mock-sdp' }),
  setLocalDescription: vi.fn().mockResolvedValue(),
  setRemoteDescription: vi.fn().mockResolvedValue(),
  addIceCandidate: vi.fn().mockResolvedValue(),
  addTrack: vi.fn(),
  getSenders: vi.fn().mockReturnValue([]),
  getReceivers: vi.fn().mockReturnValue([]),
  close: vi.fn(),
  connectionState: 'new',
  iceConnectionState: 'new',
  ontrack: null,
  onicecandidate: null,
  onconnectionstatechange: null,
  oniceconnectionstatechange: null
}));

global.RTCIceCandidate = vi.fn().mockImplementation((init) => ({
  candidate: init?.candidate || 'mock-candidate',
  sdpMLineIndex: init?.sdpMLineIndex || 0,
  sdpMid: init?.sdpMid || '0',
  toJSON: vi.fn().mockReturnValue({
    candidate: init?.candidate || 'mock-candidate',
    sdpMLineIndex: init?.sdpMLineIndex || 0,
    sdpMid: init?.sdpMid || '0'
  })
}));

// Mock MediaStream
global.MediaStream = vi.fn().mockImplementation(() => ({
  getTracks: vi.fn().mockReturnValue([]),
  getVideoTracks: vi.fn().mockReturnValue([{
    kind: 'video',
    enabled: true,
    stop: vi.fn(),
    applyConstraints: vi.fn().mockResolvedValue()
  }]),
  getAudioTracks: vi.fn().mockReturnValue([{
    kind: 'audio',
    enabled: true,
    stop: vi.fn()
  }]),
  addTrack: vi.fn(),
  removeTrack: vi.fn()
}));

// Mock navigator.mediaDevices
Object.defineProperty(global.navigator, 'mediaDevices', {
  value: {
    getUserMedia: vi.fn().mockResolvedValue(new MediaStream()),
    enumerateDevices: vi.fn().mockResolvedValue([
      {
        deviceId: 'mock-video-1',
        kind: 'videoinput',
        label: 'Mock Camera (Front)',
        groupId: 'mock-group-1'
      },
      {
        deviceId: 'mock-video-2',
        kind: 'videoinput', 
        label: 'Mock Camera (Back)',
        groupId: 'mock-group-2'
      },
      {
        deviceId: 'mock-audio-1',
        kind: 'audioinput',
        label: 'Mock Microphone',
        groupId: 'mock-group-3'
      }
    ])
  },
  writable: true
});

// Mock DOM elements commonly used in tests
global.document.createElement = vi.fn().mockImplementation((tagName) => {
  const element = {
    tagName: tagName.toUpperCase(),
    style: {},
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    click: vi.fn(),
    focus: vi.fn(),
    blur: vi.fn(),
    setAttribute: vi.fn(),
    getAttribute: vi.fn(),
    removeAttribute: vi.fn(),
    appendChild: vi.fn(),
    removeChild: vi.fn(),
    querySelector: vi.fn(),
    querySelectorAll: vi.fn().mockReturnValue([]),
    textContent: '',
    innerHTML: '',
    value: '',
    checked: false,
    disabled: false,
    hidden: false
  };

  // Special handling for video elements
  if (tagName === 'video') {
    Object.assign(element, {
      srcObject: null,
      currentTime: 0,
      duration: 0,
      paused: true,
      play: vi.fn().mockResolvedValue(),
      pause: vi.fn(),
      load: vi.fn()
    });
  }

  // Special handling for canvas elements
  if (tagName === 'canvas') {
    Object.assign(element, {
      width: 640,
      height: 480,
      getContext: vi.fn().mockReturnValue({
        fillStyle: '',
        font: '',
        fillRect: vi.fn(),
        fillText: vi.fn()
      }),
      captureStream: vi.fn().mockReturnValue(new MediaStream())
    });
  }

  return element;
});

// Mock localStorage
global.localStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};

// Mock URL constructor
global.URL = vi.fn().mockImplementation((url) => {
  const mockUrl = new URL(url, 'http://localhost');
  return {
    ...mockUrl,
    searchParams: {
      get: vi.fn().mockImplementation((key) => {
        const params = new URLSearchParams(mockUrl.search);
        return params.get(key);
      })
    }
  };
});

// Mock crypto for room ID generation
global.crypto = {
  randomUUID: vi.fn().mockReturnValue('mock-uuid-12345'),
  getRandomValues: vi.fn().mockImplementation((array) => {
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
    return array;
  })
};