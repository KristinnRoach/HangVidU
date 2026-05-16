import { For, Show, createSignal, onCleanup, onMount } from 'solid-js';
import { onClickOutside } from '../../../../shared/utils/ui-utils/clickOutside.js';
import { useI18n } from '../../../../shared/i18n/index.js';
import { initIcons } from '../../../../components/base-legacy/icons.js';
import { ensureYouTubeAPILoaded } from '../youtube-player.js';
import { devDebug } from '../../../../shared/utils/dev/dev-utils.js';

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';
const YOUTUBE_SEARCH_CACHE_KEY = 'youtube-search-results-cache-v1';
const YOUTUBE_SEARCH_CACHE_LIMIT = 10;

let hasLoadedSearchCache = false;
const youtubeSearchResultsCache = new Map();

function isDirectUrl(str) {
  return /^https?:\/\//i.test(str);
}

function isGoogleDriveUrl(url) {
  return /https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)(?:\/|\?|$)/.test(
    url,
  );
}

function extractGoogleDriveFileId(url) {
  const match = url.match(
    /https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)(?:\/|\?|$)/,
  );
  return match ? match[1] : null;
}

function toGoogleDriveDirectLink(url) {
  const fileId = extractGoogleDriveFileId(url);
  return fileId
    ? `https://drive.google.com/uc?export=download&id=${fileId}`
    : null;
}

function normalizeSearchQuery(searchQuery) {
  return searchQuery.trim().toLowerCase();
}

function cloneResults(searchResults) {
  return searchResults.map((item) => ({ ...item }));
}

function loadSearchCache() {
  if (hasLoadedSearchCache) return;
  hasLoadedSearchCache = true;

  try {
    const rawCache = sessionStorage.getItem(YOUTUBE_SEARCH_CACHE_KEY);
    if (!rawCache) return;

    const parsedCache = JSON.parse(rawCache);
    if (!Array.isArray(parsedCache)) return;

    for (const entry of parsedCache) {
      if (typeof entry?.query === 'string' && Array.isArray(entry.results)) {
        youtubeSearchResultsCache.set(entry.query, entry.results);
      }
    }
  } catch (error) {
    console.warn('[YouTubeSearchControls] failed to read search cache:', error);
  }
}

function persistSearchCache() {
  try {
    sessionStorage.setItem(
      YOUTUBE_SEARCH_CACHE_KEY,
      JSON.stringify(
        [...youtubeSearchResultsCache.entries()].map(([query, results]) => ({
          query,
          results,
        })),
      ),
    );
  } catch (error) {
    console.warn(
      '[YouTubeSearchControls] failed to persist search cache:',
      error,
    );
  }
}

function getCachedSearchResults(searchQuery) {
  loadSearchCache();

  const cacheKey = normalizeSearchQuery(searchQuery);
  if (!youtubeSearchResultsCache.has(cacheKey)) return null;

  const cachedResults = youtubeSearchResultsCache.get(cacheKey);
  youtubeSearchResultsCache.delete(cacheKey);
  youtubeSearchResultsCache.set(cacheKey, cachedResults);
  persistSearchCache();

  return cloneResults(cachedResults);
}

function cacheSearchResults(searchQuery, searchResults) {
  loadSearchCache();

  const cacheKey = normalizeSearchQuery(searchQuery);
  youtubeSearchResultsCache.delete(cacheKey);
  youtubeSearchResultsCache.set(cacheKey, cloneResults(searchResults));

  while (youtubeSearchResultsCache.size > YOUTUBE_SEARCH_CACHE_LIMIT) {
    const oldestCacheKey = youtubeSearchResultsCache.keys().next().value;
    youtubeSearchResultsCache.delete(oldestCacheKey);
  }

  persistSearchCache();
}

export default function YouTubeSearchControls() {
  const { t } = useI18n();
  const [isInputVisible, setIsInputVisible] = createSignal(false);
  const [isResultsVisible, setIsResultsVisible] = createSignal(false);
  const [query, setQuery] = createSignal('');
  const [results, setResults] = createSignal([]);
  const [status, setStatus] = createSignal('idle');
  const [statusMessage, setStatusMessage] = createSignal('');
  const [focusedResultIndex, setFocusedResultIndex] = createSignal(-1);
  let searchResultsCache = [];
  let activeSearchRequestId = 0;
  let rootEl;
  let inputEl;
  let resultsEl;
  let searchBtnEl;

  function showResults() {
    setIsResultsVisible(true);
  }

  function hideResults() {
    setIsResultsVisible(false);
  }

  function clearSearchResults() {
    activeSearchRequestId += 1;
    searchResultsCache = [];
    setResults([]);
    setStatus('idle');
    setStatusMessage('');
    setFocusedResultIndex(-1);
    hideResults();
  }

  function focusResult(index) {
    setFocusedResultIndex(index ?? -1);
    queueMicrotask(() => {
      resultsEl
        ?.querySelector(`[data-result-index="${index}"]`)
        ?.scrollIntoView({ block: 'nearest' });
    });
  }

  async function selectVideo(video) {
    const { handleVideoSelection } =
      await import('../../../watch/watch-sync.js');
    const didLoad = await handleVideoSelection(video);
    if (!didLoad) return;

    hideResults();
    setFocusedResultIndex(-1);
    setQuery('');
    setIsInputVisible(false);
  }

  async function searchYouTube(nextQuery) {
    const searchRequestId = ++activeSearchRequestId;
    searchResultsCache = [];
    setResults([]);
    setStatus('loading');
    setStatusMessage(t('media.youtube.searching'));
    showResults();

    if (!YOUTUBE_API_KEY) {
      setStatus('error');
      setStatusMessage(t('media.youtube.api_key_missing'));
      return;
    }

    try {
      const response = await fetch(
        `${YOUTUBE_API_BASE_URL}/search?part=snippet&maxResults=10&q=${encodeURIComponent(
          nextQuery,
        )}&type=video&key=${YOUTUBE_API_KEY}`,
      );

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error(t('media.youtube.quota_exceeded'));
        }
        if (response.status === 400) {
          throw new Error(t('media.youtube.invalid_request'));
        }
        throw new Error(
          t('media.youtube.api_error', { status: response.status }),
        );
      }

      const data = await response.json();
      if (searchRequestId !== activeSearchRequestId) return;

      if (!data.items || data.items.length === 0) {
        setStatus('empty');
        setStatusMessage(t('media.youtube.no_results'));
        searchResultsCache = [];
        cacheSearchResults(nextQuery, searchResultsCache);
        setFocusedResultIndex(-1);
        return;
      }

      searchResultsCache = data.items.map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        channel: item.snippet.channelTitle,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      }));
      cacheSearchResults(nextQuery, searchResultsCache);

      setResults(searchResultsCache);
      setStatus('idle');
      setStatusMessage('');
      showResults();
      focusResult(0);
    } catch (error) {
      if (searchRequestId !== activeSearchRequestId) return;

      console.error('YouTube search failed:', error);
      searchResultsCache = [];
      setResults([]);
      setFocusedResultIndex(-1);
      setStatus('error');
      setStatusMessage(error.message || t('media.youtube.search_failed'));
      showResults();
    }
  }

  async function handleSearchQuery(nextQuery) {
    if (!nextQuery) {
      clearSearchResults();
      setIsInputVisible(false);
      return;
    }

    if (!isDirectUrl(nextQuery) && !isGoogleDriveUrl(nextQuery)) {
      const cachedResults = getCachedSearchResults(nextQuery);
      if (cachedResults) {
        searchResultsCache = cachedResults;
        setResults(searchResultsCache);
        setStatus(searchResultsCache.length > 0 ? 'idle' : 'empty');
        setStatusMessage(
          searchResultsCache.length > 0 ? '' : t('media.youtube.no_results'),
        );
        showResults();
        if (searchResultsCache.length > 0) focusResult(0);
        else setFocusedResultIndex(-1);
        devDebug('Using cached YouTube search results:', nextQuery);
        return;
      }

      await searchYouTube(nextQuery);
      return;
    }

    activeSearchRequestId += 1;
    let url = nextQuery;
    devDebug('Direct URL entered:', url);
    if (isGoogleDriveUrl(nextQuery)) {
      url = toGoogleDriveDirectLink(nextQuery);
      devDebug('Extracted Google Drive direct link:', url);
    }

    await selectVideo({
      url,
      title: nextQuery,
      channel: '',
      thumbnail: '',
      id: nextQuery,
    });
  }

  async function handleSearchClick() {
    if (!isInputVisible()) {
      setIsInputVisible(true);
      queueMicrotask(() => inputEl?.focus());
      return;
    }

    await handleSearchQuery(query().trim());
  }

  async function handleKeyDown(event) {
    const currentResults = results();

    if (
      currentResults.length > 0 &&
      (event.key === 'ArrowDown' || event.key === 'ArrowUp')
    ) {
      event.preventDefault();
      if (event.key === 'ArrowDown') {
        const next = (focusedResultIndex() + 1) % currentResults.length;
        focusResult(next);
      } else {
        const currentIndex = focusedResultIndex();
        const previous =
          currentIndex <= 0 ? currentResults.length - 1 : currentIndex - 1;
        focusResult(previous);
      }
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      if (currentResults.length > 0 && focusedResultIndex() >= 0) {
        await selectVideo(currentResults[focusedResultIndex()]);
        return;
      }
      await handleSearchQuery(query().trim());
      return;
    }

    if (event.key === 'Escape') {
      if (isResultsVisible()) clearSearchResults();
      else if (query()) setQuery('');
      else setIsInputVisible(false);
    }
  }

  onMount(() => {
    initIcons(rootEl);
    ensureYouTubeAPILoaded().catch((error) => {
      console.warn(
        'YouTube IFrame API preload failed; it will retry on video playback:',
        error,
      );
    });

    const cleanupInputOutside = inputEl
      ? onClickOutside(inputEl, () => setIsInputVisible(false), {
          ignore: [searchBtnEl],
          esc: false,
        })
      : () => {};
    const cleanupResultsOutside = resultsEl
      ? onClickOutside(resultsEl, hideResults, {
          ignore: [searchBtnEl],
          esc: false,
        })
      : () => {};

    onCleanup(() => {
      cleanupInputOutside();
      cleanupResultsOutside();
    });
  });

  return (
    <div ref={rootEl} class='search-section' onKeyDown={handleKeyDown}>
      <div class='search-controls'>
        <input
          ref={inputEl}
          classList={{ hidden: !isInputVisible() }}
          type='search'
          id='searchQuery'
          placeholder={t('media.youtube.placeholder')}
          autocomplete='off'
          spellcheck={false}
          value={query()}
          onInput={(event) => {
            const nextQuery = event.currentTarget.value;
            setQuery(nextQuery);
            if (nextQuery.trim() === '') {
              clearSearchResults();
            }
            setFocusedResultIndex(-1);
          }}
        />
        <button
          ref={searchBtnEl}
          type='button'
          id='searchBtn'
          title={
            YOUTUBE_API_KEY
              ? t('media.youtube.search')
              : t('media.youtube.api_key_missing')
          }
          aria-label={t('media.youtube.search')}
          disabled={status() === 'loading'}
          onClick={handleSearchClick}
        >
          <i data-lucide='search' />
        </button>
      </div>
      <div
        ref={resultsEl}
        id='searchResults'
        class='search-results'
        classList={{ hidden: !isResultsVisible() }}
        aria-live='polite'
      >
        <Show when={status() === 'loading'}>
          <div class='search-loading'>{statusMessage()}</div>
        </Show>
        <Show when={status() === 'error'}>
          <div class='search-error'>{statusMessage()}</div>
        </Show>
        <Show when={status() === 'empty'}>
          <div class='search-no-results'>{statusMessage()}</div>
        </Show>
        <For each={results()}>
          {(video, index) => (
            <div
              class='search-result-item'
              classList={{ focused: focusedResultIndex() === index() }}
              data-result-index={index()}
              onClick={() => selectVideo(video)}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                class='search-result-thumbnail'
              />
              <div class='search-result-info'>
                <div class='search-result-title'>{video.title}</div>
                <div class='search-result-channel'>{video.channel}</div>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
