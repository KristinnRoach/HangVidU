// api-config.js - Centralized API configuration management

// ===== CONFIGURATION STATE =====
const config = {
  youtube: {
    apiKey: null,
    baseUrl: 'https://www.googleapis.com/youtube/v3',
    quotaExceeded: false,
  },
};

// ===== PUBLIC API =====

/**
 * Initialize API configuration from environment variables
 * Must be called before using any API services
 */
export function initializeApiConfig() {
  // YouTube API configuration
  config.youtube.apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  if (import.meta.env.DEV) {
    console.log('API Configuration initialized:', {
      youtube: {
        hasApiKey: !!config.youtube.apiKey,
        baseUrl: config.youtube.baseUrl,
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
