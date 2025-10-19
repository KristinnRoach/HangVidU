// ============================================================================
// YOUTUBE PLAYER MODULE
// ============================================================================
// Simplified YouTube player integration for watch-together functionality

let ytPlayer = null;
let ytReady = false;
let ytLoadingCallbacks = [];

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
// YOUTUBE URL HELPERS
// ============================================================================

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

export async function loadYouTubeVideo({ 
  url, 
  containerId, 
  onReady, 
  onStateChange 
}) {
  const videoId = extractYouTubeId(url);

  if (!videoId) {
    throw new Error('Invalid YouTube URL');
  }

  // Wait for YouTube API
  await waitForYouTubeAPI();

  // Get or create container
  let container = document.getElementById(containerId);
  if (!container) {
    throw new Error(`Container #${containerId} not found`);
  }

  // Destroy existing player if any
  if (ytPlayer) {
    try {
      ytPlayer.destroy();
    } catch (error) {
      console.warn('Error destroying previous YouTube player:', error);
    }
    ytPlayer = null;
  }

  // Create new player
  return new Promise((resolve, reject) => {
    try {
      ytPlayer = new window.YT.Player(containerId, {
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 1,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onReady: (event) => {
            ytReady = true;
            if (onReady) onReady(event);
            resolve(ytPlayer);
          },
          onStateChange: (event) => {
            if (onStateChange) onStateChange(event);
          },
          onError: (event) => {
            console.error('YouTube player error:', event.data);
            reject(new Error(`YouTube error: ${event.data}`));
          },
        },
      });
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
