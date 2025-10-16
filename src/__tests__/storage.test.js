import { describe, it, expect, beforeEach, vi } from 'vitest';
import { saveState, loadState, clearState } from '../storage/localStorage.js';

describe('localStorage persistence', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should save state to localStorage', () => {
    const state = {
      roomId: 'test123',
      role: 'initiator',
      isInitiator: true, // Backward compatibility
      isAudioMuted: false,
    };

    saveState(state);

    const stored = JSON.parse(localStorage.getItem('hangvidu_session'));
    expect(stored.roomId).toBe('test123');
    expect(stored.role).toBe('initiator');
    expect(stored.isInitiator).toBe(true); // Backward compatibility
    expect(stored.timestamp).toBeDefined();
  });

  it('should load valid state from localStorage', () => {
    const state = {
      roomId: 'test123',
      role: 'initiator',
      isInitiator: true, // Backward compatibility
    };

    saveState(state);
    const loaded = loadState();

    expect(loaded.roomId).toBe('test123');
    expect(loaded.role).toBe('initiator');
    expect(loaded.isInitiator).toBe(true); // Backward compatibility
  });

  it('should return null if no state exists', () => {
    const loaded = loadState();
    expect(loaded).toBeNull();
  });

  it('should return null and clear state if expired', () => {
    const state = {
      roomId: 'test123',
      timestamp: Date.now() - 25 * 60 * 60 * 1000, // 25 hours ago
    };

    localStorage.setItem('hangvidu_session', JSON.stringify(state));

    const loaded = loadState();
    expect(loaded).toBeNull();
    expect(localStorage.getItem('hangvidu_session')).toBeNull();
  });

  it('should handle corrupted localStorage data', () => {
    localStorage.setItem('hangvidu_session', 'invalid json{');

    const loaded = loadState();
    expect(loaded).toBeNull();
    expect(localStorage.getItem('hangvidu_session')).toBeNull();
  });

  it('should clear state from localStorage', () => {
    saveState({ roomId: 'test123' });
    expect(localStorage.getItem('hangvidu_session')).toBeTruthy();

    clearState();
    expect(localStorage.getItem('hangvidu_session')).toBeNull();
  });
});
