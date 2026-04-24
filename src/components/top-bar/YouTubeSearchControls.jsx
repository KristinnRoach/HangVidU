import { For, Show, createSignal, onCleanup, onMount } from 'solid-js';
import { handleVideoSelection } from '../../features/watch/watch-sync.js';
import { onClickOutside } from '../../shared/components/ui/utils/clickOutside.js';
import { useI18n } from '../../shared/i18n/index.js';
import { initIcons } from '../../shared/components/ui/icons.js';
import { ensureYouTubeAPILoaded } from '../../shared/media/youtube/youtube-player.js';
import { devDebug } from '../../shared/utils/dev/dev-utils.js';

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

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

export default function YouTubeSearchControls() {
  const { t } = useI18n();
  const [isInputVisible, setIsInputVisible] = createSignal(false);
  const [isResultsVisible, setIsResultsVisible] = createSignal(false);
  const [query, setQuery] = createSignal('');
  const [results, setResults] = createSignal([]);
  const [status, setStatus] = createSignal('idle');
  const [statusMessage, setStatusMessage] = createSignal('');
  const [focusedResultIndex, setFocusedResultIndex] = createSignal(-1);
  let lastSearchQuery = '';
  let searchResultsCache = [];
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
    await handleVideoSelection(video);
    hideResults();
    setFocusedResultIndex(-1);
    setQuery('');
    setIsInputVisible(false);
  }

  async function searchYouTube(nextQuery) {
    searchResultsCache = [];
    lastSearchQuery = nextQuery;
    setResults([]);
    setStatus('loading');
    setStatusMessage('Searching YouTube...');
    showResults();

    if (!YOUTUBE_API_KEY) {
      setStatus('error');
      setStatusMessage('YouTube API key not configured');
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
          throw new Error('YouTube API quota exceeded. Please try again later.');
        }
        if (response.status === 400) {
          throw new Error('Invalid API key or request.');
        }
        throw new Error(`YouTube API error: ${response.status}`);
      }

      const data = await response.json();
      if (!data.items || data.items.length === 0) {
        setStatus('empty');
        setStatusMessage('No videos found');
        searchResultsCache = [];
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

      setResults(searchResultsCache);
      setStatus('idle');
      setStatusMessage('');
      showResults();
      focusResult(0);
    } catch (error) {
      console.error('YouTube search failed:', error);
      searchResultsCache = [];
      setResults([]);
      setFocusedResultIndex(-1);
      setStatus('error');
      setStatusMessage(error.message || 'Search failed. Please try again.');
      showResults();
    }
  }

  async function handleSearchQuery(nextQuery) {
    if (!nextQuery) {
      clearSearchResults();
      setIsInputVisible(false);
      return;
    }

    if (searchResultsCache.length > 0 && nextQuery === lastSearchQuery) {
      setResults(searchResultsCache);
      setStatus('idle');
      setStatusMessage('');
      showResults();
      focusResult(0);
      return;
    }

    if (!isDirectUrl(nextQuery) && !isGoogleDriveUrl(nextQuery)) {
      await searchYouTube(nextQuery);
      return;
    }

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

    const cleanupInputOutside = onClickOutside(
      inputEl,
      () => setIsInputVisible(false),
      { ignore: [searchBtnEl], esc: false },
    );
    const cleanupResultsOutside = onClickOutside(resultsEl, hideResults, {
      ignore: [searchBtnEl],
      esc: false,
    });

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
              : 'YouTube API key not configured'
          }
          aria-label={t('media.youtube.search')}
          disabled={!YOUTUBE_API_KEY || status() === 'loading'}
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
