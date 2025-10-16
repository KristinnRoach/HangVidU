// api-config.js - Centralized API configuration management

// ===== CONFIGURATION STATE =====
const config = {
  _initialized: false,
  youtube: {
    apiKey: null,
    baseUrl: 'https://www.googleapis.com/youtube/v3',
    quotaExceeded: false,
  },
  sync: {
    // SYNC IMPLEMENTATION: Firebase is the ONLY working implementation
    // false = Firebase Sync (PRODUCTION - reliable, tested)
    // true  = WebRTC Sync (BROKEN - do not use, data channel issues)
    //
    // DECISION: Continue using Firebase for all signaling and sync operations
    useWebRTC: false, // DO NOT CHANGE - WebRTC sync is non-functional
  },
};

// ===== PUBLIC API =====

/**
 * Initialize API configuration from environment variables
 * Must be called before using any API services
 */
export function initializeApiConfig() {
  if (config._initialized) return;
  config._initialized = true;

  config.youtube.apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  if (import.meta.env.DEV) {
    console.log('API Configuration initialized:', {
      youtube: {
        hasApiKey: !!config.youtube.apiKey,
        baseUrl: config.youtube.baseUrl,
      },
      sync: {
        system: config.sync.useWebRTC ? 'WebRTC' : 'Firebase Legacy',
      },
    });
  }
}

/**
 * Get YouTube API configuration
 * @returns {Object} YouTube API config object
 */
export function getYouTubeConfig() {
  return {
    apiKey: config.youtube.apiKey,
    baseUrl: config.youtube.baseUrl,
    isAvailable: !!config.youtube.apiKey && !config.youtube.quotaExceeded,
  };
}

/**
 * Mark YouTube API as quota exceeded
 * Used for graceful degradation when API limits are hit
 */
export function setYouTubeQuotaExceeded(exceeded = true) {
  config.youtube.quotaExceeded = exceeded;

  if (import.meta.env.DEV) {
    console.warn('YouTube API quota status changed:', exceeded);
  }
}

/**
 * Get sync configuration
 * @returns {Object} Sync config object
 */
export function getSyncConfig() {
  return {
    useWebRTC: config.sync.useWebRTC,
  };
}

/**
 * Validate that required API keys are configured
 * @returns {Object} Validation result with missing keys
 */
export function validateApiConfig() {
  const missing = [];
  const warnings = [];

  if (!config.youtube.apiKey) {
    missing.push('VITE_YOUTUBE_API_KEY');
    warnings.push('YouTube search functionality will not be available');
  }

  return {
    isValid: missing.length === 0,
    missing,
    warnings,
  };
}

// ===== PRIVATE HELPERS =====

/**
 * Check if we're in development mode
 * @returns {boolean} True if in development
 */
function isDevelopment() {
  return import.meta.env.DEV;
}
