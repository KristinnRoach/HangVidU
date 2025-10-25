// ============================================================================
// YOUTUBE SEARCH MODULE
// ============================================================================

import { closeOnClickOutside } from './utils/clickOutside.js';
import setupShowHideOnInactivity from './utils/showHideOnInactivity.js';
import { isHidden, showElement, hideElement } from './utils/ui-utils.js';

// ===== ELEMENTS =====

let searchContainer = null;
let searchBtn = null;
let searchQuery = null;
let searchResults = null;

// ===== STATE =====
let isInitialized = false;
let _initializing = false;
let searchResultsCache = [];
let onVideoSelectCallback = null;
let hasLoadedResults = false;
let isDisplayingSearchResults = false;
let lastSearchQuery = '';
let focusedResultIndex = -1;

let cleanupFunctions = [];

// ===== API CONFIGURATION =====
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

// ===== PUBLIC API =====

/**
 * Initialize YouTube search UI
 * @param {Function} handleVideoSelection - Callback when user selects a video
 */
export function initializeSearchUI(handleVideoSelection) {
  if (isInitialized || _initializing) return false;
  _initializing = true;

  onVideoSelectCallback = handleVideoSelection;

  // Get DOM elements
  searchContainer = document.querySelector('.search-section');
  searchBtn = document.getElementById('searchBtn');
  searchQuery = document.getElementById('searchQuery');
  searchResults = document.getElementById('searchResults');

  if (!searchContainer || !searchBtn || !searchQuery || !searchResults) {
    console.error('YouTube search elements not found in DOM');
    _initializing = false;
    return false;
  }

  const isDirectUrl = (str) => {
    return /^https?:\/\//i.test(str);
  };

  const focusResult = (index) => {
    const items = searchResults.querySelectorAll('.search-result-item');
    items.forEach((item, i) => {
      if (i === index) {
        item.classList.add('focused');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('focused');
      }
    });
    focusedResultIndex = index;
  };

  // Add search button event listener
  searchBtn.onclick = async () => {
    const query = searchQuery.value.trim();

    if (isHidden(searchQuery)) {
      // Toggle visibility
      showElement(searchQuery);
      searchQuery.focus();
      return;
    }

    if (!query) {
      clearSearchResults();
      hideElement(searchQuery);
      return;
    }
    if (
      hasLoadedResults &&
      query === lastSearchQuery &&
      searchResultsCache.length
    ) {
      displaySearchResults(searchResultsCache);
    } else if (!isDirectUrl(query)) {
      await searchYouTube(query);
    } else {
      // Treat as direct video link
      if (onVideoSelectCallback) {
        onVideoSelectCallback({
          url: query,
          title: query,
          channel: '',
          thumbnail: '',
          id: query,
        });
      }

      searchResults.style.display = 'none';
      searchQuery.value = '';

      // enterWatchMode();
    }
  };

  searchContainer.addEventListener('keydown', async (e) => {
    const items = searchResults.querySelectorAll('.search-result-item');
    if (items.length > 0 && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      // e.preventDefault();

      // Navigate results
      if (e.key === 'ArrowDown') {
        let next = focusedResultIndex + 1;
        if (next >= items.length) next = 0;
        focusResult(next);
      } else if (e.key === 'ArrowUp') {
        let prev = focusedResultIndex - 1;
        if (prev < 0) prev = focusedResultIndex === -1 ? 0 : items.length - 1;
        focusResult(prev);
      }
      return;
    }

    if (e.key === 'Enter') {
      // If a result is focused, select it
      if (items.length > 0 && focusedResultIndex >= 0) {
        items[focusedResultIndex].click();
        hideElement(searchQuery);
        return;
      }
      const query = searchQuery.value.trim();
      if (query) {
        if (
          hasLoadedResults &&
          query === lastSearchQuery &&
          searchResultsCache.length
        ) {
          displaySearchResults(searchResultsCache);
        } else if (!isDirectUrl(query)) {
          await searchYouTube(query);
        } else {
          // Treat as direct video link
          if (onVideoSelectCallback) {
            onVideoSelectCallback({
              url: query,
              title: query,
              channel: '',
              thumbnail: '',
              id: query,
            });
          }
          searchResults.style.display = 'none';
          searchQuery.value = '';
          hideElement(searchQuery);
          return;
        }
      }
    } else if (e.key === 'Escape') {
      if (isDisplayingSearchResults) clearSearchResults();
      else if (searchQuery.value) searchQuery.value = '';
      else hideElement(searchQuery);
    }
  });

  searchQuery.addEventListener('input', () => {
    if (searchQuery.value.trim() === '') {
      clearSearchResults();
    }
    focusedResultIndex = -1;
  });

  const closeQueryCleanup = closeOnClickOutside(
    searchQuery,
    () => hideElement(searchQuery),
    {
      ignore: [searchBtn],
      esc: false, // already handled
    }
  );

  cleanupFunctions.push(closeQueryCleanup);

  const closeSearchResultsCleanup = closeOnClickOutside(
    searchResults,
    () => hideElement(searchResults),
    {
      ignore: [searchBtn],
      esc: false, // already handled
    }
  );

  cleanupFunctions.push(closeSearchResultsCleanup);

  // Check API availability
  if (!YOUTUBE_API_KEY) {
    searchBtn.disabled = true;
    searchBtn.title = 'YouTube API key not configured';
    console.warn('YouTube API key not found. Search will not be available.');
  }

  if (import.meta.env.DEV) {
    console.log('YouTube search UI initialized');
  }

  _initializing = false;
  isInitialized = true;
  return true;
}

/**
 * Search YouTube videos
 * @param {string} query - Search query
 */
async function searchYouTube(query) {
  if (!searchBtn || !searchResults) {
    console.error('Search elements not initialized');
    return;
  }

  lastSearchQuery = query;

  if (!YOUTUBE_API_KEY) {
    showError('YouTube API key not configured');
    return;
  }

  // Show loading state
  searchBtn.disabled = true;
  searchResults.innerHTML =
    '<div class="search-loading">Searching YouTube...</div>';
  searchResults.style.display = 'block';
  hasLoadedResults = false;

  try {
    const response = await fetch(
      `${YOUTUBE_API_BASE_URL}/search?part=snippet&maxResults=10&q=${encodeURIComponent(
        query
      )}&type=video&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('YouTube API quota exceeded. Please try again later.');
      } else if (response.status === 400) {
        throw new Error('Invalid API key or request.');
      } else {
        throw new Error(`YouTube API error: ${response.status}`);
      }
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      showError('No videos found');
      hasLoadedResults = false;
      return;
    }

    // Cache results and display
    searchResultsCache = data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      channel: item.snippet.channelTitle,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));

    displaySearchResults(searchResultsCache);
    hasLoadedResults = true;
  } catch (error) {
    console.error('YouTube search failed:', error);
    showError(error.message || 'Search failed. Please try again.');
  } finally {
    searchBtn.disabled = false;
  }
}

/**
 * Display search results in the UI
 * @param {Array} results - Array of video objects
 */
function displaySearchResults(results) {
  if (!searchResults) {
    console.error('Search results element not initialized');
    return;
  }

  if (!results || results.length === 0) {
    searchResults.innerHTML = '<div class="no-results">No results found</div>';
    focusedResultIndex = -1;
    return;
  }

  searchResults.innerHTML = '';

  results.forEach((video) => {
    const resultItem = document.createElement('div');
    resultItem.className = 'search-result-item';
    resultItem.innerHTML = `
        <img src="${video.thumbnail}" alt="${video.title}" class="result-thumbnail">
        <div class="result-info">
          <div class="result-title">${video.title}</div>
          <div class="result-channel">${video.channel}</div>
        </div>
      `;

    resultItem.onclick = () => {
      if (onVideoSelectCallback) {
        onVideoSelectCallback(video);
        // Hide search results after selection
        searchResults.style.display = 'none';
        focusedResultIndex = -1;

        // Clear search input
        if (!searchQuery) {
          console.error('Search query element not initialized');
          return;
        }
        searchQuery.value = '';
      }
    };

    searchResults.appendChild(resultItem);
  });

  searchResults.style.display = 'block';
  isDisplayingSearchResults = true;

  // Focus the first result
  focusedResultIndex = 0;

  const items = searchResults.querySelectorAll('.search-result-item');
  items.forEach((item, i) => {
    if (i === focusedResultIndex) {
      item.classList.add('focused');
      item.scrollIntoView({ block: 'nearest' });
    } else {
      item.classList.remove('focused');
    }
  });
}

/**
 * Show error message in search results
 * @param {string} message - Error message
 */
function showError(message) {
  if (!searchResults) {
    console.error('Search results element not initialized');
    return;
  }
  searchResults.innerHTML = `<div class="search-error">${message}</div>`;
  searchResults.style.display = 'block';
}

/**
 * Clear search results
 */
export function clearSearchResults() {
  searchResultsCache = [];

  if (!searchResults) return;

  searchResults.innerHTML = '';
  searchResults.style.display = 'none';
  isDisplayingSearchResults = false;
  focusedResultIndex = -1;
}

/**
 * Check if YouTube API is available
 */
export function isSearchAvailable() {
  return !!YOUTUBE_API_KEY;
}

export function cleanupSearchUI() {
  clearSearchResults();
  cleanupFunctions.forEach((cleanupFn) => cleanupFn());
}
