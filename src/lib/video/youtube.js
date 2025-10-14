// youtube.js - YouTube player feature

// ===== FEATURE STATE =====
const youtubeState = {
  player: null,
  ready: false,
  currentId: null,
};

// ===== PUBLIC API =====

export function isYouTubeUrl(url) {
  return /(?:youtu.be\/|youtube.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/.test(
    url
  );
}

export function getYouTubeId(url) {
  const match = url.match(
    /(?:youtu.be\/|youtube.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/
  );
  return match ? match[1] : null;
}

export function showYouTubePlayer(videoId, sharedVideo, onStateChangeCb) {
  sharedVideo.style.display = 'none';

  const old = document.getElementById('yt-iframe');
  if (old) old.remove();

  let ytDiv = document.getElementById('yt-player-div');
  if (!ytDiv) {
    ytDiv = document.createElement('div');
    ytDiv.id = 'yt-player-div';
    sharedVideo.parentNode.insertBefore(ytDiv, sharedVideo);
  }

  ytDiv.innerHTML = '<div id="yt-iframe"></div>';
  ytDiv.style.display = '';

  youtubeState.player = new YT.Player('yt-iframe', {
    height: '360',
    width: '640',
    videoId,
    events: {
      onReady: () => {
        youtubeState.ready = true;
      },
      onStateChange: onStateChangeCb,
    },
  });
  youtubeState.currentId = videoId;
}

export function hideYouTubePlayer(sharedVideo) {
  const ytDiv = document.getElementById('yt-player-div');
  if (ytDiv) ytDiv.style.display = 'none';

  sharedVideo.style.display = '';

  youtubeState.player = null;
  youtubeState.ready = false;
  youtubeState.currentId = null;
}

export function getYTPlayer() {
  return youtubeState.player;
}

export function getYTReady() {
  return youtubeState.ready;
}
