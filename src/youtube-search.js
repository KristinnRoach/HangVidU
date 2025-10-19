// ============================================================================
// YOUTUBE SEARCH MODULE
// ============================================================================
// Simplified YouTube search UI with API integration

// ===== STATE =====
let searchResultsCache = [];
let onVideoSelectCallback = null;
let hasLoadedResults = false;
let isDisplayingSearchResults = false;
let lastSearchQuery = '';

// ===== API CONFIGURATION =====
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

// ===== PUBLIC API =====

/**
 * Initialize YouTube search UI
 * @param {Function} onVideoSelect - Callback when user selects a video
 */
export function initializeSearchUI(onVideoSelect) {
  onVideoSelectCallback = onVideoSelect;

  // Get DOM elements
  const searchContainer = document.querySelector('.search-section');
  const searchBtn = document.getElementById('searchBtn');
  const searchQuery = document.getElementById('searchQuery');
  const searchResults = document.getElementById('searchResults');

  if (!searchBtn || !searchQuery || !searchResults) {
    console.error('YouTube search elements not found in DOM');
    return;
  }

  // Add search button event listener
  searchBtn.onclick = async () => {
    const query = searchQuery.value.trim();
    if (!query) {
      showError('Please enter a search term');
      return;
    }

    await searchYouTube(query);
  };

  searchContainer.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
      const query = searchQuery.value.trim();
      if (query) {
        if (hasLoadedResults && query === lastSearchQuery) {
          displaySearchResults(searchResultsCache);
        } else {
          await searchYouTube(query);
        }
      }
    } else if (e.key === 'Escape' && isDisplayingSearchResults) {
      searchResults.style.display = 'none';
    }
  });

  // Check API availability
  if (!YOUTUBE_API_KEY) {
    searchBtn.disabled = true;
    searchBtn.title = 'YouTube API key not configured';
    console.warn('YouTube API key not found. Search will not be available.');
  }

  if (import.meta.env.DEV) {
    console.log('YouTube search UI initialized');
  }
}

/**
 * Search YouTube videos
 * @param {string} query - Search query
 */
async function searchYouTube(query) {
  lastSearchQuery = query;

  const searchBtn = document.getElementById('searchBtn');
  const searchResults = document.getElementById('searchResults');

  if (!YOUTUBE_API_KEY) {
    showError('YouTube API key not configured');
    return;
  }

  // Show loading state
  searchBtn.disabled = true;
  searchBtn.textContent = 'Searching...';
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
    searchBtn.textContent = 'Search';
  }
}

/**
 * Display search results in the UI
 * @param {Array} results - Array of video objects
 */
function displaySearchResults(results) {
  const searchResults = document.getElementById('searchResults');

  if (!results || results.length === 0) {
    searchResults.innerHTML = '<div class="no-results">No results found</div>';
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
        // Clear search input
        const searchQuery = document.getElementById('searchQuery');
        if (searchQuery) searchQuery.value = '';
      }
    };

    searchResults.appendChild(resultItem);
  });

  searchResults.style.display = 'block';
  isDisplayingSearchResults = true;
}

/**
 * Show error message in search results
 * @param {string} message - Error message
 */
function showError(message) {
  const searchResults = document.getElementById('searchResults');
  searchResults.innerHTML = `<div class="search-error">${message}</div>`;
  searchResults.style.display = 'block';
}

/**
 * Clear search results
 */
export function clearSearchResults() {
  const searchResults = document.getElementById('searchResults');
  if (searchResults) {
    searchResults.innerHTML = '';
    searchResults.style.display = 'none';
  }
  searchResultsCache = [];
}

/**
 * Check if YouTube API is available
 */
export function isSearchAvailable() {
  return !!YOUTUBE_API_KEY;
}
