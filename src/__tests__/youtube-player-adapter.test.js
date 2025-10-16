// youtube-player-adapter.test.js - Tests for YouTubePlayerAdapter

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  YouTubePlayerAdapter,
  createYouTubePlayerAdapter,
  getYouTubePlayerAdapter,
  cleanupYouTubePlayerAdapter,
} from '../features/watch2gether/youtube-player-adapter.js';

// Mock YouTube API
global.YT = {
  Player: vi.fn(),
  PlayerState: {
    UNSTARTED: -1,
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
    CUED: 5,
  },
};

// Mock DOM methods
global.document = {
  createElement: vi.fn(() => ({
    src: '',
    onerror: null,
    remove: vi.fn(),
  })),
  head: {
    appendChild: vi.fn(),
  },
  body: {
    appendChild: vi.fn(),
  },
  getElementById: vi.fn(() => ({
    innerHTML: '',
    style: { display: '' },
  })),
  querySelector: vi.fn(),
};

describe('YouTubePlayerAdapter', () => {
  let adapter;
  let mockPlayer;

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();

    // Mock YouTube player
    mockPlayer = {
      playVideo: vi.fn(),
      pauseVideo: vi.fn(),
      seekTo: vi.fn(),
      getCurrentTime: vi.fn(() => 10.5),
      getPlayerState: vi.fn(() => YT.PlayerState.PAUSED),
      getDuration: vi.fn(() => 120),
      destroy: vi.fn(),
    };

    global.YT.Player.mockImplementation(() => mockPlayer);
    global.window = { YT: global.YT };

    adapter = new YouTubePlayerAdapter('test-container');
  });

  afterEach(() => {
    if (adapter) {
      adapter.cleanup();
    }
  });

  describe('Initialization', () => {
    it('should create adapter with correct container ID', () => {
      expect(adapter.containerId).toBe('test-container');
      expect(adapter.isReady).toBe(false);
      expect(adapter.eventQueue).toEqual([]);
    });

    it('should initialize player state correctly', () => {
      const state = adapter.getCompleteState();
      expect(state.currentTime).toBe(0);
      expect(state.duration).toBe(0);
      expect(state.playerState).toBe('unstarted');
      expect(state.isReady).toBe(false);
    });
  });

  describe('Event Queuing', () => {
    it('should queue events when player is not ready', () => {
      adapter.queueEvent({ type: 'play', currentTime: 10 });
      adapter.queueEvent({ type: 'pause', currentTime: 15 });

      expect(adapter.eventQueue).toHaveLength(2);
      // Pause has higher priority (2) than play (1), so it comes first
      expect(adapter.eventQueue[0].type).toBe('pause');
      expect(adapter.eventQueue[1].type).toBe('play');
    });

    it('should prioritize seek events over play/pause', () => {
      adapter.queueEvent({ type: 'play', currentTime: 10 });
      adapter.queueEvent({ type: 'seek', time: 20 });
      adapter.queueEvent({ type: 'pause', currentTime: 15 });

      expect(adapter.eventQueue[0].type).toBe('seek'); // Highest priority
      expect(adapter.eventQueue[1].type).toBe('pause'); // Medium priority
      expect(adapter.eventQueue[2].type).toBe('play'); // Lower priority
    });

    it('should reject invalid events', () => {
      adapter.queueEvent(null);
      adapter.queueEvent({ type: null });
      adapter.queueEvent({});

      expect(adapter.eventQueue).toHaveLength(0);
    });

    it('should limit queue size', () => {
      // Fill queue beyond max size
      for (let i = 0; i < 55; i++) {
        adapter.queueEvent({ type: 'play', currentTime: i });
      }

      expect(adapter.eventQueue).toHaveLength(50); // maxQueueSize
    });
  });

  describe('Player Controls', () => {
    beforeEach(() => {
      // Simulate player ready
      adapter.isReady = true;
      adapter.player = mockPlayer;
    });

    it('should play video', async () => {
      const result = await adapter.play();

      expect(result).toBe(true);
      expect(mockPlayer.playVideo).toHaveBeenCalled();
    });

    it('should pause video', async () => {
      const result = await adapter.pause();

      expect(result).toBe(true);
      expect(mockPlayer.pauseVideo).toHaveBeenCalled();
    });

    it('should seek to specific time', async () => {
      const result = await adapter.seekTo(30);

      expect(result).toBe(true);
      expect(mockPlayer.seekTo).toHaveBeenCalledWith(30, true);
    });

    it('should play at specific time', async () => {
      mockPlayer.getCurrentTime.mockReturnValue(5); // Current time different from target

      const result = await adapter.play(25);

      expect(result).toBe(true);
      expect(mockPlayer.seekTo).toHaveBeenCalledWith(25, true);
      expect(mockPlayer.playVideo).toHaveBeenCalled();
    });

    it('should pause at specific time', async () => {
      mockPlayer.getCurrentTime.mockReturnValue(5); // Current time different from target

      const result = await adapter.pause(25);

      expect(result).toBe(true);
      expect(mockPlayer.seekTo).toHaveBeenCalledWith(25, true);
      expect(mockPlayer.pauseVideo).toHaveBeenCalled();
    });
  });

  describe('State Management', () => {
    beforeEach(() => {
      adapter.isReady = true;
      adapter.player = mockPlayer;
    });

    it('should get current time', () => {
      const time = adapter.getCurrentTime();
      expect(time).toBe(10.5);
      expect(mockPlayer.getCurrentTime).toHaveBeenCalled();
    });

    it('should get player state', () => {
      const state = adapter.getPlayerState();
      expect(state).toBe('paused');
      expect(mockPlayer.getPlayerState).toHaveBeenCalled();
    });

    it('should get duration', () => {
      const duration = adapter.getDuration();
      expect(duration).toBe(120);
      expect(mockPlayer.getDuration).toHaveBeenCalled();
    });

    it('should map YouTube player states correctly', () => {
      const stateMap = [
        [YT.PlayerState.UNSTARTED, 'unstarted'],
        [YT.PlayerState.ENDED, 'ended'],
        [YT.PlayerState.PLAYING, 'playing'],
        [YT.PlayerState.PAUSED, 'paused'],
        [YT.PlayerState.BUFFERING, 'buffering'],
        [YT.PlayerState.CUED, 'cued'],
      ];

      stateMap.forEach(([ytState, expectedState]) => {
        mockPlayer.getPlayerState.mockReturnValue(ytState);
        expect(adapter.getPlayerState()).toBe(expectedState);
      });
    });
  });

  describe('Event Handling', () => {
    it('should add and remove state change callbacks', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      const cleanup1 = adapter.onStateChange(callback1);
      const cleanup2 = adapter.onStateChange(callback2);

      expect(adapter.stateChangeCallbacks).toHaveLength(2);

      cleanup1();
      expect(adapter.stateChangeCallbacks).toHaveLength(1);

      cleanup2();
      expect(adapter.stateChangeCallbacks).toHaveLength(0);
    });

    it('should call ready callbacks immediately if already ready', () => {
      adapter.isReady = true;
      const callback = vi.fn();

      adapter.onReady(callback);

      expect(callback).toHaveBeenCalled();
    });

    it('should handle state change events with enhanced data', () => {
      adapter.isReady = true;
      adapter.player = mockPlayer;
      adapter.playerState.videoId = 'test-video';

      const callback = vi.fn();
      adapter.onStateChange(callback);

      const mockEvent = { data: YT.PlayerState.PLAYING };
      adapter.handleStateChange(mockEvent);

      expect(callback).toHaveBeenCalledWith({
        ...mockEvent,
        stateData: expect.objectContaining({
          playerState: 'playing',
          currentTime: 10.5,
          duration: 120,
          videoId: 'test-video',
        }),
      });
    });
  });

  describe('Bidirectional Sync', () => {
    beforeEach(() => {
      adapter.isReady = true;
      adapter.player = mockPlayer;
    });

    it('should setup bidirectional sync with callback', () => {
      const onLocalAction = vi.fn();
      const syncHandler = adapter.setupBidirectionalSync(onLocalAction);

      expect(syncHandler).toHaveProperty('cleanup');
      expect(syncHandler).toHaveProperty('processRemoteSync');
      expect(typeof syncHandler.cleanup).toBe('function');
      expect(typeof syncHandler.processRemoteSync).toBe('function');
    });

    it('should process remote sync events', async () => {
      const onLocalAction = vi.fn();
      const syncHandler = adapter.setupBidirectionalSync(onLocalAction);

      await syncHandler.processRemoteSync({
        type: 'play',
        currentTime: 30,
      });

      expect(mockPlayer.seekTo).toHaveBeenCalledWith(30, true);
      expect(mockPlayer.playVideo).toHaveBeenCalled();
    });

    it('should enable user controls', () => {
      const mockContainer = {
        innerHTML: '',
        querySelector: vi.fn(),
      };

      const controlsHandler = adapter.enableUserControls(mockContainer);

      expect(controlsHandler).toHaveProperty('controls');
      expect(controlsHandler).toHaveProperty('cleanup');
      expect(controlsHandler.controls).toHaveProperty('play');
      expect(controlsHandler.controls).toHaveProperty('pause');
      expect(controlsHandler.controls).toHaveProperty('seek');
    });
  });

  describe('Error Handling', () => {
    it('should handle YouTube API errors gracefully', () => {
      const error = new Error('HTML5 player error');
      error.name = 'YouTubePlayerError';

      expect(() => adapter.handleAPIError(error)).not.toThrow();
      expect(adapter.lastError).toBe(error);
    });

    it('should identify retryable YouTube API errors', () => {
      const retryableError = new Error('HTML5 player error');
      const nonRetryableError = new Error('Invalid video ID');

      expect(adapter.isYouTubeAPIError(retryableError)).toBe(true);
      expect(adapter.isYouTubeAPIError(nonRetryableError)).toBe(false);
    });
  });

  describe('Cleanup', () => {
    it('should clean up all resources', () => {
      adapter.isReady = true;
      adapter.player = mockPlayer;
      adapter.queueEvent({ type: 'play', currentTime: 10 });

      const callback = vi.fn();
      adapter.onStateChange(callback);

      adapter.cleanup();

      expect(adapter.player).toBe(null);
      expect(adapter.isReady).toBe(false);
      expect(adapter.eventQueue).toHaveLength(0);
      expect(adapter.stateChangeCallbacks).toHaveLength(0);
      expect(mockPlayer.destroy).toHaveBeenCalled();
    });
  });
});

describe('Factory Functions', () => {
  afterEach(() => {
    // Clean up any created adapters
    cleanupYouTubePlayerAdapter('factory-test');
  });

  it('should create new adapter', () => {
    const adapter = createYouTubePlayerAdapter('factory-test');

    expect(adapter).toBeInstanceOf(YouTubePlayerAdapter);
    expect(adapter.containerId).toBe('factory-test');
  });

  it('should return existing adapter', () => {
    const adapter1 = createYouTubePlayerAdapter('factory-test');
    const adapter2 = createYouTubePlayerAdapter('factory-test');

    expect(adapter1).toBe(adapter2);
  });

  it('should get existing adapter', () => {
    const created = createYouTubePlayerAdapter('factory-test');
    const retrieved = getYouTubePlayerAdapter('factory-test');

    expect(retrieved).toBe(created);
  });

  it('should return null for non-existent adapter', () => {
    const adapter = getYouTubePlayerAdapter('non-existent');
    expect(adapter).toBe(null);
  });

  it('should clean up adapter', () => {
    const adapter = createYouTubePlayerAdapter('factory-test');
    const cleanupSpy = vi.spyOn(adapter, 'cleanup');

    cleanupYouTubePlayerAdapter('factory-test');

    expect(cleanupSpy).toHaveBeenCalled();
  });
});
