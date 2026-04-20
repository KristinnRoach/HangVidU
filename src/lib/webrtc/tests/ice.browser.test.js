// src/lib/webrtc/tests/ice.browser.test.js
//
// Unit tests for the signaling-agnostic ICE helper. The lib takes an
// IceTransport, so the tests stub one by hand — no Firebase mocks needed.

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { setupIceCandidates, drainIceCandidateQueue } from '../ice.js';

/**
 * Build a stub IceTransport that captures the remote-candidate callback so
 * tests can drive the listener directly.
 */
function createMockTransport() {
  const transport = {
    sendCandidate: vi.fn(),
    onRemoteCandidate: vi.fn((cb) => {
      transport._remoteCandidateCallback = cb;
    }),
    _remoteCandidateCallback: null,
  };
  return transport;
}

describe('ICE Candidate Queuing', () => {
  let mockPc;
  let mockCandidates;
  let transport;
  let addIceCandidateSpy;

  beforeEach(() => {
    mockPc = {
      signalingState: 'stable',
      remoteDescription: null,
      onicecandidate: null,
      addIceCandidate: vi.fn().mockResolvedValue(undefined),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    addIceCandidateSpy = mockPc.addIceCandidate;
    transport = createMockTransport();

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
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('interface validation', () => {
    it('throws when pc is missing', () => {
      expect(() => setupIceCandidates(null, transport)).toThrow(/pc is required/);
    });

    it('throws when transport is missing or incomplete', () => {
      expect(() => setupIceCandidates(mockPc, null)).toThrow(/transport/);
      expect(() =>
        setupIceCandidates(mockPc, { sendCandidate: () => {} }),
      ).toThrow(/onRemoteCandidate/);
    });
  });

  describe('when remote description is already set', () => {
    it('should add candidates immediately without queuing', () => {
      mockPc.remoteDescription = { type: 'offer', sdp: 'mock-sdp' };

      setupIceCandidates(mockPc, transport);

      mockCandidates.forEach((c) => transport._remoteCandidateCallback(c));

      expect(addIceCandidateSpy).toHaveBeenCalledTimes(3);
      expect(addIceCandidateSpy).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining(mockCandidates[0]),
      );
    });
  });

  describe('when remote description is not yet set (RACE CONDITION)', () => {
    it('should queue candidates until remote description is set', () => {
      mockPc.remoteDescription = null;

      setupIceCandidates(mockPc, transport);

      transport._remoteCandidateCallback(mockCandidates[0]);
      transport._remoteCandidateCallback(mockCandidates[1]);

      expect(addIceCandidateSpy).not.toHaveBeenCalled();
      expect(mockPc.addEventListener).toHaveBeenCalledWith(
        'signalingstatechange',
        expect.any(Function),
      );
    });

    it('should drain queue when remote description is set (manual drain)', () => {
      mockPc.remoteDescription = null;

      setupIceCandidates(mockPc, transport);
      mockCandidates.forEach((c) => transport._remoteCandidateCallback(c));

      expect(addIceCandidateSpy).not.toHaveBeenCalled();

      mockPc.remoteDescription = { type: 'answer', sdp: 'mock-answer-sdp' };
      drainIceCandidateQueue(mockPc);

      expect(addIceCandidateSpy).toHaveBeenCalledTimes(3);
    });

    it('should drain queue automatically via signalingstatechange listener', () => {
      mockPc.remoteDescription = null;

      setupIceCandidates(mockPc, transport);

      transport._remoteCandidateCallback(mockCandidates[0]);
      transport._remoteCandidateCallback(mockCandidates[1]);

      expect(addIceCandidateSpy).not.toHaveBeenCalled();

      const autoDrainListener = mockPc.addEventListener.mock.calls.find(
        (call) => call[0] === 'signalingstatechange',
      )?.[1];
      expect(autoDrainListener).toBeDefined();

      mockPc.remoteDescription = { type: 'answer', sdp: 'mock-answer-sdp' };
      autoDrainListener();

      expect(addIceCandidateSpy).toHaveBeenCalledTimes(2);
      expect(mockPc.removeEventListener).toHaveBeenCalledWith(
        'signalingstatechange',
        autoDrainListener,
      );
    });

    it('should add new candidates immediately after queue is drained', () => {
      mockPc.remoteDescription = null;

      setupIceCandidates(mockPc, transport);

      transport._remoteCandidateCallback(mockCandidates[0]);
      expect(addIceCandidateSpy).not.toHaveBeenCalled();

      mockPc.remoteDescription = { type: 'answer', sdp: 'mock-answer-sdp' };
      drainIceCandidateQueue(mockPc);
      expect(addIceCandidateSpy).toHaveBeenCalledTimes(1);

      transport._remoteCandidateCallback(mockCandidates[1]);
      transport._remoteCandidateCallback(mockCandidates[2]);

      expect(addIceCandidateSpy).toHaveBeenCalledTimes(3);
    });
  });

  describe('local candidate forwarding', () => {
    it('forwards local candidates through transport.sendCandidate', () => {
      mockPc.remoteDescription = { type: 'offer', sdp: 'mock-sdp' };
      setupIceCandidates(mockPc, transport);

      const candidate = {
        toJSON: () => ({
          candidate: 'test',
          sdpMid: '0',
          sdpMLineIndex: 0,
        }),
      };
      mockPc.onicecandidate({ candidate });

      expect(transport.sendCandidate).toHaveBeenCalledWith({
        candidate: 'test',
        sdpMid: '0',
        sdpMLineIndex: 0,
      });
    });

    it('does not call sendCandidate on end-of-candidates signal', () => {
      setupIceCandidates(mockPc, transport);
      mockPc.onicecandidate({ candidate: null });
      expect(transport.sendCandidate).not.toHaveBeenCalled();
    });
  });

  describe('error handling', () => {
    it('should handle closed peer connection gracefully', () => {
      mockPc.remoteDescription = { type: 'offer', sdp: 'mock-sdp' };
      mockPc.signalingState = 'closed';

      setupIceCandidates(mockPc, transport);
      transport._remoteCandidateCallback(mockCandidates[0]);

      expect(addIceCandidateSpy).not.toHaveBeenCalled();
    });

    it('should handle null/empty candidates', () => {
      mockPc.remoteDescription = { type: 'offer', sdp: 'mock-sdp' };

      setupIceCandidates(mockPc, transport);
      transport._remoteCandidateCallback(null);

      expect(addIceCandidateSpy).not.toHaveBeenCalled();
    });

    it('should continue processing queue even if one candidate fails', () => {
      mockPc.remoteDescription = null;
      addIceCandidateSpy.mockImplementation((candidate) => {
        if (candidate.candidate.includes('50002')) {
          throw new Error('Invalid candidate');
        }
        return Promise.resolve();
      });

      setupIceCandidates(mockPc, transport);
      mockCandidates.forEach((c) => transport._remoteCandidateCallback(c));

      mockPc.remoteDescription = { type: 'answer', sdp: 'mock-answer-sdp' };
      drainIceCandidateQueue(mockPc);

      expect(addIceCandidateSpy).toHaveBeenCalledTimes(3);
    });
  });

  describe('multiple drain calls', () => {
    it('should be idempotent (safe to call drain multiple times)', () => {
      mockPc.remoteDescription = null;

      setupIceCandidates(mockPc, transport);
      transport._remoteCandidateCallback(mockCandidates[0]);
      transport._remoteCandidateCallback(mockCandidates[1]);

      mockPc.remoteDescription = { type: 'answer', sdp: 'mock-answer-sdp' };
      drainIceCandidateQueue(mockPc);
      drainIceCandidateQueue(mockPc);
      drainIceCandidateQueue(mockPc);

      expect(addIceCandidateSpy).toHaveBeenCalledTimes(2);
    });
  });
});
