// youtube.js
// Minimal YouTube embed/sync helpers for Watch Together mode

let ytPlayer = null;
let ytReady = false;
let ytCurrentId = null;

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
  // Remove old iframe if any
  const old = document.getElementById('yt-iframe');
  if (old) old.remove();
  // Create new div for YouTube
  let ytDiv = document.getElementById('yt-player-div');
  if (!ytDiv) {
    ytDiv = document.createElement('div');
    ytDiv.id = 'yt-player-div';
    sharedVideo.parentNode.insertBefore(ytDiv, sharedVideo);
  }
  ytDiv.innerHTML = '<div id="yt-iframe"></div>';
  ytDiv.style.display = '';
  ytPlayer = new YT.Player('yt-iframe', {
    height: '360',
    width: '640',
    videoId,
    events: {
      onReady: () => {
        ytReady = true;
      },
      onStateChange: onStateChangeCb,
    },
  });
  ytCurrentId = videoId;
}

export function hideYouTubePlayer(sharedVideo) {
  const ytDiv = document.getElementById('yt-player-div');
  if (ytDiv) ytDiv.style.display = 'none';
  sharedVideo.style.display = '';
  ytPlayer = null;
  ytReady = false;
  ytCurrentId = null;
}

export function getYTPlayer() {
  return ytPlayer;
}
export function getYTReady() {
  return ytReady;
}
