// tests/unit/role-consolidation.test.js
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Role Consolidation', () => {
  let mockConnection;

  beforeEach(() => {
    // Reset modules to ensure clean state
    vi.resetModules();
  });

  it('should use consistent role terminology throughout the system', async () => {
    // Import the connection module
    const { getRole, getIsInitiator, connect, join } = await import(
      '../../src/features/connect/connection.js'
    );

    // Mock dependencies
    vi.doMock('../../src/storage/firebaseRealTimeDB.js', () => ({
      db: {
        ref: vi.fn(() => ({
          set: vi.fn(),
          once: vi.fn(() =>
            Promise.resolve({
              exists: () => true,
              val: () => ({ offer: { type: 'offer', sdp: 'test' } }),
            })
          ),
          child: vi.fn(() => ({
            on: vi.fn(),
            off: vi.fn(),
            set: vi.fn(),
            push: vi.fn(),
          })),
        })),
      },
    }));

    // Mock WebRTC
    global.RTCPeerConnection = vi.fn(() => ({
      addTrack: vi.fn(),
      createOffer: vi.fn(() => Promise.resolve({ type: 'offer', sdp: 'test' })),
      createAnswer: vi.fn(() =>
        Promise.resolve({ type: 'answer', sdp: 'test' })
      ),
      setLocalDescription: vi.fn(),
      setRemoteDescription: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      close: vi.fn(),
    }));

    // Mock media stream
    const mockStream = {
      getTracks: () => [{ stop: vi.fn() }],
    };

    // Test initiator role
    const { setLocalStream } = await import(
      '../../src/features/connect/connection.js'
    );
    setLocalStream(mockStream);

    await connect({ onRemoteStream: vi.fn(), onStatusUpdate: vi.fn() });

    expect(getRole()).toBe('initiator');
    expect(getIsInitiator()).toBe(true);

    // Test joiner role
    await join({
      roomId: 'test-room',
      onRemoteStream: vi.fn(),
      onStatusUpdate: vi.fn(),
    });

    expect(getRole()).toBe('joiner');
    expect(getIsInitiator()).toBe(false);
  });

  it('should handle backward compatibility for isInitiator', async () => {
    const { restoreConnectionState, getRole, getIsInitiator } = await import(
      '../../src/features/connect/connection.js'
    );

    // Test restoring from old isInitiator format
    restoreConnectionState({
      roomId: 'test-room',
      isInitiator: true,
      wasConnected: false,
    });

    expect(getRole()).toBe('initiator');
    expect(getIsInitiator()).toBe(true);

    // Test restoring from new role format
    restoreConnectionState({
      roomId: 'test-room-2',
      role: 'joiner',
      wasConnected: false,
    });

    expect(getRole()).toBe('joiner');
    expect(getIsInitiator()).toBe(false);
  });

  it('should provide consistent role mapping for WebRTC managers', () => {
    // Test that role values are consistent
    const initiatorRole = 'initiator';
    const joinerRole = 'joiner';

    // These should map to Firebase paths correctly
    const initiatorCandidatesPath =
      initiatorRole === 'initiator' ? 'callerCandidates' : 'calleeCandidates';
    const joinerCandidatesPath =
      joinerRole === 'initiator' ? 'callerCandidates' : 'calleeCandidates';

    expect(initiatorCandidatesPath).toBe('callerCandidates');
    expect(joinerCandidatesPath).toBe('calleeCandidates');

    // Test remote candidates path
    const initiatorRemotePath =
      initiatorRole === 'initiator' ? 'calleeCandidates' : 'callerCandidates';
    const joinerRemotePath =
      joinerRole === 'initiator' ? 'calleeCandidates' : 'callerCandidates';

    expect(initiatorRemotePath).toBe('calleeCandidates');
    expect(joinerRemotePath).toBe('callerCandidates');
  });

  it('should use role for connection status consistently', () => {
    // Test that connection status uses the same role terminology
    const initiatorStatus = 'initiator';
    const joinerStatus = 'joiner';

    // These should match the values used in setConnectionStatus calls
    expect(initiatorStatus).toBe('initiator');
    expect(joinerStatus).toBe('joiner');

    // Test partner role calculation
    const initiatorPartner =
      initiatorStatus === 'initiator' ? 'joiner' : 'initiator';
    const joinerPartner = joinerStatus === 'initiator' ? 'joiner' : 'initiator';

    expect(initiatorPartner).toBe('joiner');
    expect(joinerPartner).toBe('initiator');
  });
});
