import { isYouTubeUrl } from './youtube.js';
import { loadStream } from './watch-sync-legacy.js';
import { db } from '../../storage/firebaseRealTimeDB.js';
import { getRoomId } from '../connect/connection.js';
import { isHostedVideoUrl } from './utils.js';
import { performSearch } from './youtube-search-ui.js';

// export async function videoInputHandler(video) {
//   console.warn('videoInputHandler');
//   // Get elements
//   const sharedVideo = document.getElementById('sharedVideo');
//   const streamUrlInput = document.getElementById('streamUrl');
//   const syncStatus = document.getElementById('syncStatus');

//   // Update URL input with selected video
//   if (streamUrlInput) {
//     streamUrlInput.value = video.url;
//   }

//   // Update status
//   if (syncStatus) {
//     syncStatus.textContent = `Loading "${video.title}"...`;
//   }

//   try {
//     // Check if we have an active room for syncing
//     const roomId = getRoomId();

//     if (roomId) {
//       // We're in a call - use the sync-enabled loadStream function
//       await loadStream({
//         roomId,
//         url: video.url,
//         sharedVideo,
//         syncStatus: syncStatus || {
//           textContent: `Loading "${video.title}"...`,
//         },
//       });
//     } else {
//       // No active call - just play the video locally
//       await playVideoLocally(video.url, sharedVideo, syncStatus);
//     }

//     if (import.meta.env.DEV) {
//       console.log('Video loaded from search selection:', video.title);
//     }
//   } catch (error) {
//     console.error('Failed to load selected video:', error);
//     if (syncStatus) {
//       syncStatus.textContent = 'Failed to load video. Please try again.';
//     }
//   }
// }

// async function playVideoLocally(url, sharedVideo, syncStatus) {
//   if (isYouTubeUrl(url)) {
//     const vid = getYouTubeId(url);
//     showYouTubePlayer(vid, sharedVideo, () => {
//       // No sync needed when playing locally
//     });
//     if (syncStatus) {
//       syncStatus.textContent = 'YouTube video loaded (local playback)';
//     }
//   } else {
//     hideYouTubePlayer(sharedVideo);
//     sharedVideo.src = url;
//     sharedVideo.style.display = 'block';
//     if (syncStatus) {
//       syncStatus.textContent = 'Video loaded (local playback)';
//     }
//   }
// }

export async function handleSelectVideo(inputString) {
  console.warn('handleSelectVideo, inputString', inputString);
  const roomId = getRoomId();
  const sharedVideo = document.getElementById('sharedVideo');
  const syncStatus = document.getElementById('syncStatus');

  if (isYouTubeUrl(inputString)) {
    loadStream({ roomId, inputString, sharedVideo, syncStatus });
    return;
    //db.ref(`rooms/${roomId}/stream`).set({ url });
    //   } else if (isYouTubeUrl) {
    //     db.ref(`rooms/${roomId}/stream`).set({ url });
  } else {
    await performSearch(inputString);
  }
}

async function playVideoLocally(url, sharedVideo, syncStatus) {
  if (isYouTubeUrl(url)) {
    const vid = getYouTubeId(url);
    showYouTubePlayer(vid, sharedVideo, () => {
      // No sync needed when playing locally
    });
    if (syncStatus) {
      syncStatus.textContent = 'YouTube video loaded (local playback)';
    }
  } else {
    hideYouTubePlayer(sharedVideo);
    sharedVideo.src = url;
    sharedVideo.style.display = 'block';
    if (syncStatus) {
      syncStatus.textContent = 'Video loaded (local playback)';
    }
  }
}
