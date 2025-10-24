// ============================================================================
// YOUTUBE PLAYER MODULE
// ============================================================================

import {
  enterWatchMode,
  exitWatchMode,
  showSharedVideo,
  hideSharedVideo,
} from './main';

const YT_CONTAINER_ID = 'yt-player-div';
const YT_PLAYER_ROOT_ID = 'yt-player-root';

let ytPlayer = null;
let ytReady = false;
let ytLoadingCallbacks = [];

export const getYTContainer = () => {
  const el = document.getElementById(YT_CONTAINER_ID);
  if (!el) throw new Error(`Container #${YT_CONTAINER_ID} not found`);
  return el;
};

// ============================================================================
// YOUTUBE API INITIALIZATION
// ============================================================================

// Wait for YouTube IFrame API to be ready
export function waitForYouTubeAPI() {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve();
    } else {
      // YouTube API calls this when ready
      window.onYouTubeIframeAPIReady = () => {
        resolve();
      };
    }
  });
}

// ============================================================================
//  HELPERS
// ============================================================================

export function showYouTubePlayer() {
  const wrapper = getYTContainer();

  if (!document.getElementById(YT_PLAYER_ROOT_ID)) {
    const root = document.createElement('div');
    root.id = YT_PLAYER_ROOT_ID;
    wrapper.appendChild(root);
  }
  // Remove any blur state so the player can receive pointer/keyboard events
  wrapper.classList.remove('hidden');
  wrapper.classList.remove('blurred');

  enterWatchMode();
}

export function hideYouTubePlayer() {
  if (isYTVisible()) {
    getYTContainer().classList.add('hidden');
  }

  exitWatchMode();
}

export function isYTVisible() {
  const ytContainer = getYTContainer();
  return ytContainer && !ytContainer.classList.contains('hidden');
}

export function isYouTubeUrl(url) {
  if (!url) return false;
  return url.includes('youtube.com') || url.includes('youtu.be');
}

export function extractYouTubeId(url) {
  if (!url) return null;

  // Handle different YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([\w-]+)/,
    /(?:youtu\.be\/)([\w-]+)/,
    /(?:youtube\.com\/embed\/)([\w-]+)/,
    /(?:youtube\.com\/shorts\/)([\w-]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) return match[1];
  }

  return null;
}

// ============================================================================
// YOUTUBE PLAYER MANAGEMENT
// ============================================================================

export async function loadYouTubeVideo({ url, onReady, onStateChange }) {
  const videoId = extractYouTubeId(url);

  if (!videoId) {
    throw new Error('Invalid YouTube URL');
  }

  await waitForYouTubeAPI();

  if (ytPlayer) {
    try {
      ytPlayer.destroy();
    } catch (error) {
      console.warn('Error destroying previous YouTube player:', error);
    }
    ytPlayer = null;
  }

  showYouTubePlayer();

  // Regain event listener control for document
  const blurIframe = (allowSpace = true) => {
    const ytContainer = getYTContainer();
    const iframe = ytPlayer.getIframe();

    if (iframe && ytContainer) {
      // Instead of calling iframe.blur() (which can confuse YouTube's
      // internal keyboard handling), move focus to the wrapper element.
      // Use tabindex=-1 so it can be focused programmatically.
      try {
        ytContainer.tabIndex = -1;
        ytContainer.focus({ preventScroll: true });
      } catch (e) {
        // fallback to direct blur if focusing wrapper fails
        if (document.activeElement === iframe) {
          try {
            iframe.blur();
          } catch (er) {
            /* ignore */
          }
        }
      }
      ytContainer.classList.add('blurred');

      if (allowSpace) {
        // Allow spacebar to play and regain focus
        const onKeydown = (event) => {
          if (event.code === 'Space') {
            const ytContainer = getYTContainer();
            const iframe = ytPlayer.getIframe();
            // if already focused on iframe, do nothing
            if (
              document.activeElement === iframe ||
              document.activeElement === ytContainer
            ) {
              return;
            }
            event.preventDefault();

            console.debug('Space pressed, refocusing iframe');

            setTimeout(() => {
              try {
                ytContainer.classList.remove('blurred');
              } catch (e) {
                /* ignore */
              }
            }, 0);

            if (ytPlayer.getPlayerState() !== window.YT.PlayerState.PLAYING) {
              playYouTubeVideo();
            } else {
              pauseYouTubeVideo();
            }
          }
        };
        document.addEventListener('keydown', onKeydown, { once: true });
      }
    }
  };

  const focusIframe = () => {
    const ytContainer = getYTContainer();
    const iframe = ytPlayer.getIframe();

    if (ytContainer && iframe) {
      ytContainer.classList.remove('blurred');
      if (document.activeElement !== iframe) {
        try {
          iframe.focus();
        } catch (e) {
          /* ignore */
        }
      }
    }
  };

  // Create new player
  return new Promise((resolve, reject) => {
    try {
      // Create the player inside the dedicated root so the iframe replaces
      // that child element and not the outer wrapper.
      ytPlayer = new window.YT.Player(YT_PLAYER_ROOT_ID, {
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 1, // Show player controls
          fs: 1, // Show fullscreen button (1 = show)
          rel: 0, // Show related videos at end (0 = no)
          modestbranding: 1, // Minimal YouTube branding
          disablekb: 0, // Disable keyboard controls (0 = enabled)
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            ytReady = true;
            if (onReady) onReady(event);
            resolve(ytPlayer);
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              blurIframe(false);
            }
            if (event.data === window.YT.PlayerState.PAUSED) {
              blurIframe();
            }
            if (event.data === window.YT.PlayerState.PLAYING) {
              focusIframe();
            }

            if (onStateChange) onStateChange(event);
          },
          onError: (event) => {
            console.error('YouTube player error:', event.data);
            reject(new Error(`YouTube error: ${event.data}`));
          },
        },
      });

      showYouTubePlayer();
    } catch (error) {
      reject(error);
    }
  });
}

export function getYouTubePlayer() {
  return ytPlayer;
}

export function isYouTubeReady() {
  return ytReady;
}

export function destroyYouTubePlayer() {
  if (ytPlayer) {
    try {
      ytPlayer.destroy();
    } catch (error) {
      console.warn('Error destroying YouTube player:', error);
    }
    ytPlayer = null;
    ytReady = false;
  }
}

// ============================================================================
// YOUTUBE PLAYER CONTROL
// ============================================================================

export function playYouTubeVideo() {
  if (ytPlayer && ytReady) {
    ytPlayer.playVideo();
  }
}

export function pauseYouTubeVideo() {
  if (ytPlayer && ytReady) {
    ytPlayer.pauseVideo();
  }
}

export function seekYouTubeVideo(seconds) {
  if (ytPlayer && ytReady) {
    ytPlayer.seekTo(seconds, true);
  }
}

export function getYouTubeCurrentTime() {
  if (ytPlayer && ytReady) {
    return ytPlayer.getCurrentTime();
  }
  return 0;
}

export function getYouTubePlayerState() {
  if (ytPlayer && ytReady) {
    return ytPlayer.getPlayerState();
  }
  return -1; // unstarted
}

// YouTube player states
export const YT_STATE = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
};
