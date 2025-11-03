// src/webrtc/ice.test.js

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { setupIceCandidates, drainIceCandidateQueue } from '../ice.js';

// Mock Firebase database functions
vi.mock('firebase/database', () => ({
  getDatabase: vi.fn(() => ({})),
  ref: vi.fn(() => ({})),
  push: vi.fn(() => ({})),
  set: vi.fn(() => Promise.resolve()),
  onChildAdded: vi.fn(),
  get: vi.fn(() => Promise.resolve({ exists: () => false, val: () => null })),
  onValue: vi.fn(),
  off: vi.fn(),
}));

vi.mock('../../firebase/firebase', () => ({
  app: {},
}));

vi.mock('../storage/fb-rtdb/rtdb', () => ({
  rtdb: {},
  trackRTDBListener: vi.fn(),
}));

vi.mock('../../utils/dev-utils.js', () => ({
  devDebug: vi.fn(),
}));

describe('ICE Candidate Queuing', () => {
  let mockPc;
  let mockCandidates;
  let onChildAddedCallback;
  let addIceCandidateSpy;

  beforeEach(async () => {
    // Import after mocks are set up
    const { onChildAdded } = await import('firebase/database');

    // Mock RTCPeerConnection
    mockPc = {
      signalingState: 'stable',
      remoteDescription: null,
      onicecandidate: null,
      addIceCandidate: vi.fn().mockResolvedValue(undefined),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    addIceCandidateSpy = mockPc.addIceCandidate;

    // Mock candidates from Firebase
    mockCandidates = [
      {
        candidate: 'candidate:1 1 UDP 2122260223 192.168.1.1 50001 typ host',
        sdpMid: '0',
        sdpMLineIndex: 0,
      },
      {
        candidate: 'candidate:2 1 UDP 2122260222 192.168.1.1 50002 typ host',
        sdpMid: '0',
        sdpMLineIndex: 0,
      },
      {
        candidate: 'candidate:3 1 UDP 2122260221 192.168.1.1 50003 typ host',
        sdpMid: '0',
        sdpMLineIndex: 0,
      },
    ];

    // Capture the onChildAdded callback so we can simulate Firebase events
    onChildAdded.mockImplementation((ref, callback) => {
      onChildAddedCallback = callback;
    });

    // Mock RTCIceCandidate constructor
    global.RTCIceCandidate = class RTCIceCandidate {
      constructor(candidateInit) {
        Object.assign(this, candidateInit);
      }
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('when remote description is already set', () => {
    it('should add candidates immediately without queuing', () => {
      // Setup: remote description exists from the start
      mockPc.remoteDescription = { type: 'offer', sdp: 'mock-sdp' };

      setupIceCandidates(mockPc, 'joiner', 'test-room');

      // Simulate receiving 3 candidates from Firebase
      mockCandidates.forEach((candidate) => {
        onChildAddedCallback({ val: () => candidate });
      });

      // All candidates should be added immediately
      expect(addIceCandidateSpy).toHaveBeenCalledTimes(3);
      expect(addIceCandidateSpy).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining(mockCandidates[0])
      );
      expect(addIceCandidateSpy).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining(mockCandidates[1])
      );
      expect(addIceCandidateSpy).toHaveBeenNthCalledWith(
        3,
        expect.objectContaining(mockCandidates[2])
      );
    });
  });

  describe('when remote description is not yet set (RACE CONDITION)', () => {
    it('should queue candidates until remote description is set', () => {
      // Setup: no remote description yet
      mockPc.remoteDescription = null;

      setupIceCandidates(mockPc, 'initiator', 'test-room');

      // Simulate receiving 2 candidates BEFORE remote description
      onChildAddedCallback({ val: () => mockCandidates[0] });
      onChildAddedCallback({ val: () => mockCandidates[1] });

      // Should NOT add candidates yet (queued)
      expect(addIceCandidateSpy).not.toHaveBeenCalled();

      // Verify that signalingstatechange listener was attached for auto-drain
      expect(mockPc.addEventListener).toHaveBeenCalledWith(
        'signalingstatechange',
        expect.any(Function)
      );
    });

    it('should drain queue when remote description is set (manual drain)', () => {
      mockPc.remoteDescription = null;

      setupIceCandidates(mockPc, 'initiator', 'test-room');

      // Queue 3 candidates
      mockCandidates.forEach((candidate) => {
        onChildAddedCallback({ val: () => candidate });
      });

      expect(addIceCandidateSpy).not.toHaveBeenCalled();

      // Now set remote description
      mockPc.remoteDescription = { type: 'answer', sdp: 'mock-answer-sdp' };

      // Manually drain the queue
      drainIceCandidateQueue(mockPc);

      // All queued candidates should be added
      expect(addIceCandidateSpy).toHaveBeenCalledTimes(3);
      expect(addIceCandidateSpy).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining(mockCandidates[0])
      );
      expect(addIceCandidateSpy).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining(mockCandidates[1])
      );
      expect(addIceCandidateSpy).toHaveBeenNthCalledWith(
        3,
        expect.objectContaining(mockCandidates[2])
      );
    });

    it('should drain queue automatically via signalingstatechange listener', () => {
      mockPc.remoteDescription = null;

      setupIceCandidates(mockPc, 'initiator', 'test-room');

      // Queue 2 candidates
      onChildAddedCallback({ val: () => mockCandidates[0] });
      onChildAddedCallback({ val: () => mockCandidates[1] });

      expect(addIceCandidateSpy).not.toHaveBeenCalled();

      // Capture the auto-drain listener
      const autoDrainListener = mockPc.addEventListener.mock.calls.find(
        (call) => call[0] === 'signalingstatechange'
      )?.[1];

      expect(autoDrainListener).toBeDefined();

      // Simulate setting remote description
      mockPc.remoteDescription = { type: 'answer', sdp: 'mock-answer-sdp' };

      // Trigger the auto-drain listener
      autoDrainListener();

      // Queue should be drained automatically
      expect(addIceCandidateSpy).toHaveBeenCalledTimes(2);
      expect(mockPc.removeEventListener).toHaveBeenCalledWith(
        'signalingstatechange',
        autoDrainListener
      );
    });

    it('should add new candidates immediately after queue is drained', () => {
      mockPc.remoteDescription = null;

      setupIceCandidates(mockPc, 'initiator', 'test-room');

      // Queue first candidate
      onChildAddedCallback({ val: () => mockCandidates[0] });
      expect(addIceCandidateSpy).not.toHaveBeenCalled();

      // Set remote description and drain
      mockPc.remoteDescription = { type: 'answer', sdp: 'mock-answer-sdp' };
      drainIceCandidateQueue(mockPc);

      expect(addIceCandidateSpy).toHaveBeenCalledTimes(1);

      // New candidates arrive AFTER draining
      onChildAddedCallback({ val: () => mockCandidates[1] });
      onChildAddedCallback({ val: () => mockCandidates[2] });

      // Should be added immediately (no more queuing)
      expect(addIceCandidateSpy).toHaveBeenCalledTimes(3);
    });
  });

  describe('error handling', () => {
    it('should handle closed peer connection gracefully', () => {
      mockPc.remoteDescription = { type: 'offer', sdp: 'mock-sdp' };
      mockPc.signalingState = 'closed';

      setupIceCandidates(mockPc, 'joiner', 'test-room');

      // Simulate receiving candidate on closed connection
      onChildAddedCallback({ val: () => mockCandidates[0] });

      // Should not attempt to add candidate
      expect(addIceCandidateSpy).not.toHaveBeenCalled();
    });

    it('should handle null/empty candidates', () => {
      mockPc.remoteDescription = { type: 'offer', sdp: 'mock-sdp' };

      setupIceCandidates(mockPc, 'joiner', 'test-room');

      // Simulate receiving null candidate (end-of-candidates signal)
      onChildAddedCallback({ val: () => null });

      expect(addIceCandidateSpy).not.toHaveBeenCalled();
    });

    it('should continue processing queue even if one candidate fails', () => {
      mockPc.remoteDescription = null;

      // Make the second candidate fail
      addIceCandidateSpy.mockImplementation((candidate) => {
        if (candidate.candidate.includes('50002')) {
          throw new Error('Invalid candidate');
        }
        return Promise.resolve();
      });

      setupIceCandidates(mockPc, 'initiator', 'test-room');

      // Queue all candidates
      mockCandidates.forEach((candidate) => {
        onChildAddedCallback({ val: () => candidate });
      });

      // Set remote description and drain
      mockPc.remoteDescription = { type: 'answer', sdp: 'mock-answer-sdp' };
      drainIceCandidateQueue(mockPc);

      // All candidates should be attempted (3 calls despite 1 failure)
      expect(addIceCandidateSpy).toHaveBeenCalledTimes(3);
    });
  });

  describe('multiple drain calls', () => {
    it('should be idempotent (safe to call drain multiple times)', () => {
      mockPc.remoteDescription = null;

      setupIceCandidates(mockPc, 'initiator', 'test-room');

      // Queue candidates
      onChildAddedCallback({ val: () => mockCandidates[0] });
      onChildAddedCallback({ val: () => mockCandidates[1] });

      mockPc.remoteDescription = { type: 'answer', sdp: 'mock-answer-sdp' };

      // Drain multiple times
      drainIceCandidateQueue(mockPc);
      drainIceCandidateQueue(mockPc);
      drainIceCandidateQueue(mockPc);

      // Should only add candidates once
      expect(addIceCandidateSpy).toHaveBeenCalledTimes(2);
    });
  });
});
