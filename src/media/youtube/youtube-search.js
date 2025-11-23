import { devDebug } from '../../utils/dev/dev-utils.js';
// ============================================================================
// YOUTUBE SEARCH MODULE
// ============================================================================

import { onClickOutside } from '../../utils/ui/clickOutside.js';
import { isHidden, showElement, hideElement } from '../../utils/ui/ui-utils.js';
import { handleVideoSelection } from '../../firebase/watch-sync.js';

// ===== ELEMENTS =====

let searchContainer = null;
let searchBtn = null;
let searchQuery = null;
let searchResults = null;

// ===== STATE =====
let isInitialized = false;
let _initializing = false;
let searchResultsCache = [];
let lastSearchQuery = '';
let focusedResultIndex = -1;

let cleanupFunctions = [];

// ===== API CONFIGURATION =====
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

// ===== PUBLIC API =====

/**
 * Initialize YouTube search UI
//  * @param {Function} handleVideoSelection - Callback when user selects a video
 */
export async function initializeSearchUI() {
  if (isInitialized || _initializing) return false;
  _initializing = true;

  // Use robust access for dynamically loaded search elements
  const { initializeYouTubeElements } = await import('../../elements.js');
  const elements = await initializeYouTubeElements();

  searchContainer = elements.searchContainer;
  searchBtn = elements.searchBtn;
  searchQuery = elements.searchQuery;
  searchResults = elements.searchResults;

  if (!searchContainer || !searchBtn || !searchQuery || !searchResults) {
    console.error('YouTube search elements not found in DOM');
    _initializing = false;
    return false;
  }

  // Hide search section when Google One Tap prompt is visible
  try {
    const { onOneTapStatusChange } = await import('../../firebase/onetap.js');
    const unsubscribeOneTap = onOneTapStatusChange((status) => {
      if (status === 'displayed') {
        hideElement(searchContainer);
      } else {
        showElement(searchContainer);
      }
    });
    cleanupFunctions.push(unsubscribeOneTap);
  } catch (e) {
    console.warn('Could not set up One Tap search section visibility:', e);
  }

  const isDirectUrl = (str) => {
    return /^https?:\/\//i.test(str);
  };

  const focusResult = (index) => {
    const items = searchResults?.querySelectorAll('.search-result-item') || [];
    items.forEach((item, i) => {
      if (i === index) {
        item.classList.add('focused');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('focused');
      }
    });
    focusedResultIndex = index ?? -1;
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
    if (hasLoadedSearchResults() && query === lastSearchQuery) {
      displaySearchResults(searchResultsCache);
    } else if (!isDirectUrl(query)) {
      await searchYouTube(query);
    } else {
      // Treat as direct video link
      if (handleVideoSelection) {
        await handleVideoSelection({
          url: query,
          title: query,
          channel: '',
          thumbnail: '',
          id: query,
        });
      }

      hideElement(searchResults);
      searchQuery.value = '';
      hideElement(searchQuery);
      focusedResultIndex = -1;
      return;
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
        hideElement(searchResults);
        focusedResultIndex = -1;
        return;
      }
      const query = searchQuery.value.trim();
      if (query) {
        if (hasLoadedSearchResults() && query === lastSearchQuery) {
          displaySearchResults(searchResultsCache);
        } else if (!isDirectUrl(query)) {
          await searchYouTube(query);
        } else {
          // Treat as direct video link
          if (handleVideoSelection) {
            await handleVideoSelection({
              url: query,
              title: query,
              channel: '',
              thumbnail: '',
              id: query,
            });
          }
          hideElement(searchResults);
          focusedResultIndex = -1;

          searchQuery.value = '';
          hideElement(searchQuery);
          return;
        }
      }
    } else if (e.key === 'Escape') {
      if (isSearchResultsElVisible()) clearSearchResults();
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

  const closeQueryCleanup = onClickOutside(
    searchQuery,
    () => hideElement(searchQuery),
    {
      ignore: [searchBtn],
      esc: false, // already handled
    }
  );

  cleanupFunctions.push(closeQueryCleanup);

  const closeSearchResultsCleanup = onClickOutside(
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

  devDebug('YouTube search UI initialized');

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

  searchResultsCache = [];
  lastSearchQuery = query;

  if (!YOUTUBE_API_KEY) {
    showError('YouTube API key not configured');
    return;
  }

  // Show loading state
  searchBtn.disabled = true;
  searchResults.innerHTML =
    '<div class="search-loading">Searching YouTube...</div>';
  showElement(searchResults);

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
      searchResultsCache = [];
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
    searchResultsCache = [];
    focusedResultIndex = -1;
    return;
  }

  searchResults.innerHTML = '';

  results.forEach((video) => {
    const resultItem = document.createElement('div');
    resultItem.className = 'search-result-item';
    resultItem.innerHTML = `
      <img src="${video.thumbnail}" alt="${video.title}" class="result-thumbnail">
      <div class="search-result-info">
        <div class="search-result-title">${video.title}</div>
        <div class="search-result-channel">${video.channel}</div>
      </div>
    `;

    resultItem.onclick = async () => {
      if (handleVideoSelection) {
        await handleVideoSelection(video);

        // Hide search results after selection
        hideElement(searchResults);
        focusedResultIndex = -1;

        // Clear search input
        if (!searchQuery) {
          console.error('Search query element not initialized');
          return;
        }
        searchQuery.value = '';
        hideElement(searchQuery);
      }
    };

    searchResults.appendChild(resultItem);
  });

  showElement(searchResults);

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
  searchResultsCache = [];
  focusedResultIndex = -1;

  if (!searchResults) {
    console.error('Search results element not initialized');
    return;
  }
  searchResults.innerHTML = `<div class="search-error">${message}</div>`;
  showElement(searchResults);
}

/**
 * Clear search results
 */
export function clearSearchResults() {
  searchResultsCache = [];
  focusedResultIndex = -1;

  if (!searchResults) return;
  searchResults.innerHTML = '';
  hideElement(searchResults);
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

// UTILS
function isSearchResultsElVisible() {
  return !isHidden(searchResults);
}

function hasLoadedSearchResults() {
  return searchResultsCache.length > 0;
}
