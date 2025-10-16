// youtube-search-ui.js - YouTube search UI functionality

import {
  searchVideos,
  isSearchAvailable,
  getSearchStatus,
} from './youtube-search.js';

// ===== UI STATE =====
const state = {
  searchInput: null,
  searchButton: null,
  searchResults: null,
  isSearching: false,
  currentResults: [],
  onVideoSelect: null,
  availabilityCheckInterval: null,
};

// ===== PUBLIC API =====

/**
 * Initialize YouTube search UI
 * @param {Function} onVideoSelectCallback - Callback when video is selected
 */
export function initializeSearchUI(onVideoSelectCallback) {
  state.onVideoSelect = onVideoSelectCallback;

  // Get DOM elements
  state.searchInput = document.getElementById('searchQuery');
  state.searchButton = document.getElementById('searchBtn');
  state.searchResults = document.getElementById('searchResults');

  if (!state.searchInput || !state.searchButton || !state.searchResults) {
    console.warn('Search UI elements not found');
    return;
  }

  setupEventListeners();
  updateSearchAvailability();
  startAvailabilityMonitoring();

  if (import.meta.env.DEV) {
    console.log('YouTube search UI initialized');
  }
}

/**
 * Perform search and display results
 * @param {string} query - Search query
 */
export async function performSearch(query) {
  if (!query || query.trim().length === 0) {
    clearSearchResults();
    return;
  }

  if (state.isSearching) {
    return; // Prevent multiple simultaneous searches
  }

  try {
    state.isSearching = true;
    updateSearchButton(true);
    showSearchLoading();

    const results = await searchVideos(query.trim(), {
      maxResults: 10,
      order: 'relevance',
    });

    state.currentResults = results;
    displaySearchResults(results);

    if (import.meta.env.DEV) {
      console.log(`Found ${results.length} search results for: ${query}`);
    }
  } catch (error) {
    console.error('Search failed:', error);
    showSearchError(error.message);
  } finally {
    state.isSearching = false;
    updateSearchButton(false);
  }
}

/**
 * Clear search results and hide results container
 */
export function clearSearchResults() {
  if (state.searchResults) {
    state.searchResults.style.display = 'none';
    state.searchResults.innerHTML = '';
  }
  state.currentResults = [];
}

/**
 * Update search availability based on API status
 */
export function updateSearchAvailability() {
  const isAvailable = isSearchAvailable();
  const status = getSearchStatus();

  if (state.searchInput && state.searchButton) {
    state.searchInput.disabled = !isAvailable;
    state.searchButton.disabled = !isAvailable;

    if (!isAvailable) {
      if (!status.hasApiKey) {
        state.searchInput.placeholder =
          'YouTube search unavailable - no API key';
        showSearchUnavailableMessage('no-api-key');
      } else {
        state.searchInput.placeholder =
          'YouTube search temporarily unavailable';
        showSearchUnavailableMessage('quota-exceeded');
      }
    } else {
      state.searchInput.placeholder = 'Search YouTube videos...';
      // Clear any unavailable message when search becomes available
      if (
        state.searchResults &&
        state.searchResults.innerHTML.includes('search-unavailable')
      ) {
        clearSearchResults();
      }
    }
  }
}

// ===== PRIVATE HELPERS =====

/**
 * Set up event listeners for search UI
 */
function setupEventListeners() {
  // Search button click
  state.searchButton.addEventListener('click', handleSearchClick);

  // Enter key in search input
  state.searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  });

  // Clear results when input is cleared
  state.searchInput.addEventListener('input', (event) => {
    if (event.target.value.trim().length === 0) {
      clearSearchResults();
    }
  });
}

/**
 * Handle search button click
 */
async function handleSearchClick() {
  const query = state.searchInput.value;
  await performSearch(query);
}

/**
 * Update search button state
 * @param {boolean} isLoading - Whether search is in progress
 */
function updateSearchButton(isLoading) {
  if (state.searchButton) {
    state.searchButton.disabled = isLoading || !isSearchAvailable();
    state.searchButton.textContent = isLoading ? 'Searching...' : 'Search';
  }
}

/**
 * Show loading state in search results
 */
function showSearchLoading() {
  if (state.searchResults) {
    state.searchResults.style.display = 'block';
    state.searchResults.innerHTML = `
      <div class="search-loading">
        Searching YouTube videos...
      </div>
    `;
  }
}

/**
 * Show error message in search results
 * @param {string} message - Error message to display
 */
function showSearchError(message) {
  if (state.searchResults) {
    state.searchResults.style.display = 'block';

    let userMessage = 'Search failed. Please try again.';

    if (message.includes('quota exceeded')) {
      userMessage =
        'YouTube search quota exceeded. Please try again later or use manual URL input.';
    } else if (message.includes('API not available')) {
      userMessage =
        'YouTube search is currently unavailable. Please use manual URL input.';
    }

    state.searchResults.innerHTML = `
      <div class="search-error">
        ${userMessage}
      </div>
    `;
  }
}

/**
 * Show search unavailable message with helpful guidance
 * @param {string} reason - Reason for unavailability ('no-api-key' or 'quota-exceeded')
 */
function showSearchUnavailableMessage(reason) {
  if (!state.searchResults) return;

  let title, message, suggestion;

  if (reason === 'no-api-key') {
    title = 'YouTube Search Unavailable';
    message = 'YouTube search requires an API key to function.';
    suggestion =
      'You can still watch videos by pasting YouTube URLs directly in the input field below.';
  } else if (reason === 'quota-exceeded') {
    title = 'YouTube Search Temporarily Unavailable';
    message = 'The YouTube search quota has been exceeded for today.';
    suggestion =
      'You can still watch videos by pasting YouTube URLs directly in the input field below.';
  } else {
    title = 'YouTube Search Unavailable';
    message = 'YouTube search is currently not available.';
    suggestion =
      'You can still watch videos by pasting YouTube URLs directly in the input field below.';
  }

  state.searchResults.style.display = 'block';
  state.searchResults.innerHTML = `
    <div class="search-unavailable">
      <div class="search-unavailable-title">${title}</div>
      <div class="search-unavailable-message">${message}</div>
      <div class="search-unavailable-suggestion">${suggestion}</div>
      <div class="search-unavailable-examples">
        <strong>Supported formats:</strong>
        <ul>
          <li>https://www.youtube.com/watch?v=VIDEO_ID</li>
          <li>https://youtu.be/VIDEO_ID</li>
          <li>Direct video file URLs</li>
        </ul>
      </div>
    </div>
  `;
}

/**
 * Display search results in the UI
 * @param {Array} results - Array of search results
 */
function displaySearchResults(results) {
  if (!state.searchResults) return;

  if (results.length === 0) {
    state.searchResults.style.display = 'block';
    state.searchResults.innerHTML = `
      <div class="search-no-results">
        No videos found. Try a different search term.
      </div>
    `;
    return;
  }

  const resultsHTML = results
    .map((result) => createSearchResultHTML(result))
    .join('');

  state.searchResults.style.display = 'block';
  state.searchResults.innerHTML = resultsHTML;

  // Add click listeners to result items
  const resultItems = state.searchResults.querySelectorAll(
    '.search-result-item'
  );
  resultItems.forEach((item, index) => {
    item.addEventListener('click', () => handleVideoSelect(results[index]));
  });
}

/**
 * Create HTML for a single search result
 * @param {Object} result - Search result object
 * @returns {string} HTML string
 */
function createSearchResultHTML(result) {
  return `
    <div class="search-result-item" data-video-id="${result.videoId}">
      <img 
        src="${result.thumbnail}" 
        alt="${escapeHtml(result.title)}"
        class="search-result-thumbnail"
        loading="lazy"
      />
      <div class="search-result-info">
        <div class="search-result-title">${escapeHtml(result.title)}</div>
        <div class="search-result-channel">${escapeHtml(
          result.channelTitle
        )}</div>
        <div class="search-result-description">${escapeHtml(
          result.description
        )}</div>
      </div>
    </div>
  `;
}

/**
 * Handle video selection from search results
 * @param {Object} video - Selected video object
 */
function handleVideoSelect(video) {
  if (state.onVideoSelect) {
    state.onVideoSelect(video);
  }

  // Clear search results after selection
  clearSearchResults();

  // Clear search input
  if (state.searchInput) {
    state.searchInput.value = '';
  }

  if (import.meta.env.DEV) {
    console.log('Video selected:', video.title, video.url);
  }
}

/**
 * Start monitoring search availability
 */
function startAvailabilityMonitoring() {
  // Check availability every 5 minutes
  state.availabilityCheckInterval = setInterval(() => {
    updateSearchAvailability();
  }, 5 * 60 * 1000);
}

/**
 * Stop monitoring search availability
 */
function stopAvailabilityMonitoring() {
  if (state.availabilityCheckInterval) {
    clearInterval(state.availabilityCheckInterval);
    state.availabilityCheckInterval = null;
  }
}

/**
 * Cleanup search UI resources
 */
export function cleanupSearchUI() {
  stopAvailabilityMonitoring();
  clearSearchResults();

  if (import.meta.env.DEV) {
    console.log('YouTube search UI cleaned up');
  }
}

/**
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
  if (!text) return '';

  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
