// Example: Improved YouTube search using consistent element access pattern

// Instead of mixing getElementById and querySelector, use consistent pattern
const getElement = (id) => {
  const el = document.getElementById(id);
  if (!el) {
    console.warn(`Element with id: ${id} not found.`);
    return null;
  }
  return el;
};

const getElementBySelector = (selector) => {
  const el = document.querySelector(selector);
  if (!el) {
    console.warn(`Element with selector: ${selector} not found.`);
    return null;
  }
  return el;
};

// BEFORE (from youtube-search.js):
// searchContainer = document.querySelector('.search-section');
// searchBtn = document.getElementById('searchBtn');
// searchQuery = document.getElementById('searchQuery');
// searchResults = document.getElementById('searchResults');

// AFTER - Consistent and safe:
let searchContainer = null;
let searchBtn = null;
let searchQuery = null;
let searchResults = null;

function initializeYouTubeSearch() {
  // Use consistent helper functions
  searchContainer = getElementBySelector('.search-section');
  searchBtn = getElement('searchBtn');
  searchQuery = getElement('searchQuery');
  searchResults = getElement('searchResults');

  // Check all required elements
  const requiredElements = {
    searchContainer,
    searchBtn,
    searchQuery,
    searchResults,
  };

  const missingElements = Object.entries(requiredElements)
    .filter(([name, element]) => !element)
    .map(([name]) => name);

  if (missingElements.length > 0) {
    console.error('YouTube search elements not found in DOM:', missingElements);
    return false;
  }

  // All elements exist, safe to setup event listeners
  setupSearchEventListeners();
  return true;
}

function setupSearchEventListeners() {
  // Safe to use - we've already verified elements exist
  searchBtn.addEventListener('click', handleSearch);
  searchQuery.addEventListener('keydown', handleSearchKeydown);
  searchContainer.addEventListener('keydown', handleContainerKeydown);
}

async function handleSearch() {
  const query = searchQuery.value.trim();
  if (!query) return;

  try {
    // Clear previous results safely
    if (searchResults) {
      searchResults.innerHTML = '';
    }

    if (isDirectUrl(query)) {
      await handleDirectUrl(query);
    } else {
      await performYouTubeSearch(query);
    }
  } catch (error) {
    console.error('Search failed:', error);
    updateSearchStatus('Search failed. Please try again.');
  }
}

function handleSearchKeydown(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleSearch();
  }
}

function handleContainerKeydown(e) {
  // Safe element access for dynamic content
  const items = searchResults?.querySelectorAll('.search-result-item') || [];

  if (items.length > 0 && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
    e.preventDefault();
    navigateSearchResults(items, e.key === 'ArrowDown' ? 1 : -1);
  }
}

function navigateSearchResults(items, direction) {
  // Implementation with safe element access
  const currentIndex = Array.from(items).findIndex((item) =>
    item.classList.contains('focused')
  );

  let newIndex = currentIndex + direction;
  newIndex = Math.max(0, Math.min(newIndex, items.length - 1));

  // Remove previous focus
  items.forEach((item) => item.classList.remove('focused'));

  // Add new focus
  if (items[newIndex]) {
    items[newIndex].classList.add('focused');
    items[newIndex].scrollIntoView({ block: 'nearest' });
  }
}

function updateSearchStatus(message) {
  // Could integrate with main status system
  console.log('YouTube Search:', message);

  // Or create a search-specific status area
  const searchStatus = getElement('search-status');
  if (searchStatus) {
    searchStatus.textContent = message;
  }
}

async function performYouTubeSearch(query) {
  updateSearchStatus('Searching...');

  try {
    // Your YouTube API call here
    const results = await searchYouTube(query);
    displaySearchResults(results);
    updateSearchStatus(`Found ${results.length} results`);
  } catch (error) {
    updateSearchStatus('Search failed');
    throw error;
  }
}

function displaySearchResults(results) {
  if (!searchResults) {
    console.error('Search results container not available');
    return;
  }

  // Clear previous results
  searchResults.innerHTML = '';

  results.forEach((video, index) => {
    const resultItem = document.createElement('div');
    resultItem.className = 'search-result-item';
    resultItem.innerHTML = `
      <img src="${video.thumbnail}" alt="${video.title}" />
      <div class="video-info">
        <h3>${video.title}</h3>
        <p>${video.channel}</p>
      </div>
    `;

    // Safe event listener attachment
    resultItem.addEventListener('click', () => handleVideoSelection(video));

    searchResults.appendChild(resultItem);
  });

  // Focus first result if available
  const firstItem = searchResults.querySelector('.search-result-item');
  if (firstItem) {
    firstItem.classList.add('focused');
  }
}

// Helper functions
function isDirectUrl(str) {
  return /^https?:\/\//i.test(str);
}

async function handleDirectUrl(url) {
  updateSearchStatus('Loading video...');
  // Handle direct URL logic
}

async function handleVideoSelection(video) {
  updateSearchStatus(`Loading: ${video.title}`);
  // Handle video selection logic
}

async function searchYouTube(query) {
  // Mock implementation - replace with actual API call
  return [
    {
      title: 'Sample Video 1',
      channel: 'Sample Channel',
      thumbnail: 'https://via.placeholder.com/120x90',
      url: 'https://youtube.com/watch?v=sample1',
    },
    {
      title: 'Sample Video 2',
      channel: 'Another Channel',
      thumbnail: 'https://via.placeholder.com/120x90',
      url: 'https://youtube.com/watch?v=sample2',
    },
  ];
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeYouTubeSearch);
} else {
  initializeYouTubeSearch();
}

export {
  initializeYouTubeSearch,
  handleSearch,
  displaySearchResults,
  updateSearchStatus,
};
