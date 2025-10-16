// tests/unit/session-restoration-logic.test.js - Unit test for shouldRestoreSession logic

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock the localStorage functions
const mockLoadState = vi.fn();
const mockClearState = vi.fn();

// Mock the page reload manager
vi.mock('../../src/storage/localStorage.js', () => ({
  loadState: mockLoadState,
  clearState: mockClearState,
}));

describe('shouldRestoreSession Logic', () => {
  let PageReloadManager;
  let manager;

  beforeEach(async () => {
    vi.clearAllMocks();

    // Import after mocks are set up
    const module = await import(
      '../../src/features/session/page-reload-manager.js'
    );
    PageReloadManager = module.PageReloadManager;
    manager = new PageReloadManager();
  });

  it('should restore session for "connecting" state', () => {
    mockLoadState.mockReturnValue({
      roomId: 'test-room',
      connectionState: 'connecting',
      lastActivity: Date.now() - 1000, // 1 second ago
    });

    const result = manager.shouldRestoreSession();
    expect(result).toBe(true);
  });

  it('should restore session for "connected" state', () => {
    mockLoadState.mockReturnValue({
      roomId: 'test-room',
      connectionState: 'connected',
      lastActivity: Date.now() - 1000,
    });

    const result = manager.shouldRestoreSession();
    expect(result).toBe(true);
  });

  it('should restore session for "reconnecting" state', () => {
    mockLoadState.mockReturnValue({
      roomId: 'test-room',
      connectionState: 'reconnecting',
      lastActivity: Date.now() - 1000,
    });

    const result = manager.shouldRestoreSession();
    expect(result).toBe(true);
  });

  it('should restore session for "disconnected" state', () => {
    mockLoadState.mockReturnValue({
      roomId: 'test-room',
      connectionState: 'disconnected',
      lastActivity: Date.now() - 1000,
    });

    const result = manager.shouldRestoreSession();
    expect(result).toBe(true);
  });

  it('should NOT restore session for "idle" state', () => {
    mockLoadState.mockReturnValue({
      roomId: 'test-room',
      connectionState: 'idle',
      lastActivity: Date.now() - 1000,
    });

    const result = manager.shouldRestoreSession();
    expect(result).toBe(false);
  });

  it('should NOT restore session without roomId', () => {
    mockLoadState.mockReturnValue({
      connectionState: 'connected',
      lastActivity: Date.now() - 1000,
    });

    const result = manager.shouldRestoreSession();
    expect(result).toBe(false);
  });

  it('should NOT restore old sessions (over 5 minutes)', () => {
    mockLoadState.mockReturnValue({
      roomId: 'test-room',
      connectionState: 'connected',
      lastActivity: Date.now() - 6 * 60 * 1000, // 6 minutes ago
    });

    const result = manager.shouldRestoreSession();
    expect(result).toBe(false);
    expect(mockClearState).toHaveBeenCalled();
  });

  it('should handle missing savedState', () => {
    mockLoadState.mockReturnValue(null);

    const result = manager.shouldRestoreSession();
    expect(result).toBe(false);
  });

  it('should handle missing connectionState (backward compatibility)', () => {
    mockLoadState.mockReturnValue({
      roomId: 'test-room',
      // No connectionState property
      lastActivity: Date.now() - 1000,
    });

    const result = manager.shouldRestoreSession();
    // Should default to false when connectionState is undefined
    expect(result).toBe(false);
  });
});
