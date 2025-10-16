// youtube-search.js - YouTube Data API integration for video search

import {
  getYouTubeConfig,
  setYouTubeQuotaExceeded,
} from '../../config/api-config.js';

// ===== SEARCH STATE =====
const state = {
  searchCache: new Map(),
  cacheTimeout: 5 * 60 * 1000, // 5 minutes
  maxCacheSize: 50,
  rateLimiter: {
    requests: [],
    maxRequests: 100, // YouTube API default quota
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
  },
};

// ===== PUBLIC API =====

/**
 * Search for YouTube videos using the Data API
 * @param {string} query - Search query string
 * @param {Object} options - Search options
 * @returns {Promise<Array>} Array of video results
 */
export async function searchVideos(query, options = {}) {
  if (!query || typeof query !== 'string') {
    throw new Error('Search query is required');
  }

  const config = getYouTubeConfig();
  if (!config.isAvailable) {
    throw new Error('YouTube API not available');
  }

  // Check rate limiting
  if (!isRateLimitAllowed()) {
    throw new Error('Rate limit exceeded');
  }

  // Check cache first
  const cacheKey = getCacheKey(query, options);
  const cached = getCachedResults(cacheKey);
  if (cached) {
    if (import.meta.env.DEV) {
      console.log('Returning cached search results for:', query);
    }
    return cached;
  }

  try {
    const results = await performSearch(query, options);

    // Cache results
    setCachedResults(cacheKey, results);

    // Track rate limiting
    trackRequest();

    return results;
  } catch (error) {
    handleSearchError(error);
    throw error;
  }
}

/**
 * Get video details by ID
 * @param {string} videoId - YouTube video ID
 * @returns {Promise<Object>} Video details
 */
export async function getVideoDetails(videoId) {
  if (!videoId) {
    throw new Error('Video ID is required');
  }

  const config = getYouTubeConfig();
  if (!config.isAvailable) {
    throw new Error('YouTube API not available');
  }

  // Check cache first
  const cacheKey = `video-${videoId}`;
  const cached = getCachedResults(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const url = new URL(`${config.baseUrl}/videos`);
    url.searchParams.set('part', 'snippet,contentDetails,statistics');
    url.searchParams.set('id', videoId);
    url.searchParams.set('key', config.apiKey);

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const video = formatVideoDetails(data.items[0]);
      setCachedResults(cacheKey, video);
      trackRequest();
      return video;
    }

    throw new Error('Video not found');
  } catch (error) {
    handleSearchError(error);
    throw error;
  }
}

/**
 * Check if YouTube search is available
 * @returns {boolean} True if search is available
 */
export function isSearchAvailable() {
  const config = getYouTubeConfig();
  return config.isAvailable && isRateLimitAllowed();
}

/**
 * Get search service status
 * @returns {Object} Service status information
 */
export function getSearchStatus() {
  const config = getYouTubeConfig();

  return {
    isAvailable: config.isAvailable,
    hasApiKey: !!config.apiKey,
    cacheSize: state.searchCache.size,
    rateLimitStatus: getRateLimitStatus(),
  };
}

/**
 * Clear search cache
 */
export function clearSearchCache() {
  state.searchCache.clear();

  if (import.meta.env.DEV) {
    console.log('Search cache cleared');
  }
}

/**
 * Reset quota exceeded status (for testing or manual reset)
 */
export function resetQuotaStatus() {
  setYouTubeQuotaExceeded(false);

  if (import.meta.env.DEV) {
    console.log('YouTube quota status reset');
  }
}

// ===== PRIVATE HELPERS =====

/**
 * Perform actual search request to YouTube API
 * @param {string} query - Search query
 * @param {Object} options - Search options
 * @returns {Promise<Array>} Search results
 */
async function performSearch(query, options) {
  const config = getYouTubeConfig();
  const url = new URL(`${config.baseUrl}/search`);

  // Set search parameters
  url.searchParams.set('part', 'snippet');
  url.searchParams.set('type', 'video');
  url.searchParams.set('q', query);
  url.searchParams.set('maxResults', options.maxResults || 10);
  url.searchParams.set('key', config.apiKey);

  // Optional parameters
  if (options.order) {
    url.searchParams.set('order', options.order);
  }
  if (options.videoDuration) {
    url.searchParams.set('videoDuration', options.videoDuration);
  }
  if (options.videoDefinition) {
    url.searchParams.set('videoDefinition', options.videoDefinition);
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    if (response.status === 403) {
      const errorData = await response.json().catch(() => ({}));
      const errorReason = errorData.error?.errors?.[0]?.reason;

      if (errorReason === 'quotaExceeded') {
        setYouTubeQuotaExceeded(true);
        throw new Error('YouTube API quota exceeded');
      } else if (
        errorReason === 'keyInvalid' ||
        errorReason === 'keyRestricted'
      ) {
        setYouTubeQuotaExceeded(true); // Treat as unavailable
        throw new Error('YouTube API key is invalid or restricted');
      } else {
        // Generic 403 error - likely quota or permission issue
        setYouTubeQuotaExceeded(true);
        throw new Error(
          'YouTube API access denied - quota exceeded or key restricted'
        );
      }
    }
    throw new Error(`Search request failed: ${response.status}`);
  }

  const data = await response.json();

  if (!data.items) {
    return [];
  }

  return data.items.map(formatSearchResult);
}

/**
 * Format search result from YouTube API response
 * @param {Object} item - YouTube API search result item
 * @returns {Object} Formatted search result
 */
function formatSearchResult(item) {
  const snippet = item.snippet;

  return {
    videoId: item.id.videoId,
    title: snippet.title,
    description: snippet.description,
    thumbnail:
      snippet.thumbnails.medium?.url || snippet.thumbnails.default?.url,
    channelTitle: snippet.channelTitle,
    publishedAt: snippet.publishedAt,
    url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
  };
}

/**
 * Format video details from YouTube API response
 * @param {Object} item - YouTube API video details item
 * @returns {Object} Formatted video details
 */
function formatVideoDetails(item) {
  const snippet = item.snippet;
  const contentDetails = item.contentDetails;
  const statistics = item.statistics;

  return {
    videoId: item.id,
    title: snippet.title,
    description: snippet.description,
    thumbnail:
      snippet.thumbnails.medium?.url || snippet.thumbnails.default?.url,
    channelTitle: snippet.channelTitle,
    publishedAt: snippet.publishedAt,
    duration: contentDetails.duration,
    viewCount: statistics.viewCount,
    likeCount: statistics.likeCount,
    url: `https://www.youtube.com/watch?v=${item.id}`,
  };
}

/**
 * Generate cache key for search query
 * @param {string} query - Search query
 * @param {Object} options - Search options
 * @returns {string} Cache key
 */
function getCacheKey(query, options) {
  const optionsStr = JSON.stringify(options);
  return `search-${query}-${optionsStr}`;
}

/**
 * Get cached search results
 * @param {string} cacheKey - Cache key
 * @returns {Array|null} Cached results or null
 */
function getCachedResults(cacheKey) {
  const cached = state.searchCache.get(cacheKey);

  if (!cached) {
    return null;
  }

  // Check if cache entry is expired
  if (Date.now() - cached.timestamp > state.cacheTimeout) {
    state.searchCache.delete(cacheKey);
    return null;
  }

  return cached.results;
}

/**
 * Set cached search results
 * @param {string} cacheKey - Cache key
 * @param {Array} results - Search results to cache
 */
function setCachedResults(cacheKey, results) {
  // Implement LRU eviction if cache is full
  if (state.searchCache.size >= state.maxCacheSize) {
    const firstKey = state.searchCache.keys().next().value;
    state.searchCache.delete(firstKey);
  }

  state.searchCache.set(cacheKey, {
    results,
    timestamp: Date.now(),
  });
}

/**
 * Check if rate limit allows new request
 * @returns {boolean} True if request is allowed
 */
function isRateLimitAllowed() {
  const now = Date.now();
  const windowStart = now - state.rateLimiter.windowMs;

  // Clean old requests
  state.rateLimiter.requests = state.rateLimiter.requests.filter(
    (timestamp) => timestamp > windowStart
  );

  return state.rateLimiter.requests.length < state.rateLimiter.maxRequests;
}

/**
 * Track API request for rate limiting
 */
function trackRequest() {
  state.rateLimiter.requests.push(Date.now());
}

/**
 * Get rate limit status
 * @returns {Object} Rate limit information
 */
function getRateLimitStatus() {
  const now = Date.now();
  const windowStart = now - state.rateLimiter.windowMs;

  // Clean old requests
  state.rateLimiter.requests = state.rateLimiter.requests.filter(
    (timestamp) => timestamp > windowStart
  );

  return {
    requestsUsed: state.rateLimiter.requests.length,
    requestsRemaining:
      state.rateLimiter.maxRequests - state.rateLimiter.requests.length,
    windowMs: state.rateLimiter.windowMs,
  };
}

/**
 * Handle search API errors
 * @param {Error} error - Error to handle
 */
function handleSearchError(error) {
  if (import.meta.env.DEV) {
    console.error('YouTube search error:', error);
  }

  // Handle specific error types
  if (error.message.includes('quota exceeded')) {
    setYouTubeQuotaExceeded(true);
  }
}
