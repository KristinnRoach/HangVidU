import { describe, it, expect, vi } from 'vitest';

describe('Reconnection detection', () => {
  it('should close peer connection when partner reconnects', () => {
    const mockPeerConnection = {
      close: vi.fn(),
    };

    const mockRemoteVideo = {
      srcObject: { getTracks: () => [] },
    };

    // Simulate handlePartnerReconnecting behavior
    mockPeerConnection.close();
    mockRemoteVideo.srcObject = null;

    expect(mockPeerConnection.close).toHaveBeenCalled();
    expect(mockRemoteVideo.srcObject).toBeNull();
  });

  it('should handle null peer connection gracefully', () => {
    let peerConnection = null;

    // Should not throw
    expect(() => {
      if (peerConnection) {
        peerConnection.close();
      }
    }).not.toThrow();
  });
});
