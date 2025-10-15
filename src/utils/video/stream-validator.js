// src/utils/video/stream-validator.js - Video stream validation utilities

/**
 * Check if a video element is actually displaying video content
 * @param {HTMLVideoElement} videoElement 
 * @param {Object} options - Configuration options
 * @returns {Promise<Object>} Validation result
 */
export async function validateVideoStream(videoElement, options = {}) {
  const {
    timeout = 5000,
    checkInterval = 500,
    minWidth = 32,
    minHeight = 32,
    blackThreshold = 10 // Threshold for detecting black frames
  } = options;

  return new Promise((resolve) => {
    const startTime = Date.now();
    let checkCount = 0;
    
    const checkVideo = () => {
      checkCount++;
      const elapsed = Date.now() - startTime;
      
      // Timeout check
      if (elapsed > timeout) {
        resolve({
          isValid: false,
          reason: 'timeout',
          message: 'Video validation timed out',
          checks: checkCount
        });
        return;
      }
      
      // Basic checks
      if (!videoElement.srcObject) {
        setTimeout(checkVideo, checkInterval);
        return;
      }
      
      // Check if video has loaded
      if (videoElement.readyState < 2) { // HAVE_CURRENT_DATA
        setTimeout(checkVideo, checkInterval);
        return;
      }
      
      // Check video dimensions
      if (videoElement.videoWidth < minWidth || videoElement.videoHeight < minHeight) {
        setTimeout(checkVideo, checkInterval);
        return;
      }
      
      // Check if video is actually playing (not frozen)
      const currentTime = videoElement.currentTime;
      setTimeout(() => {
        if (videoElement.currentTime === currentTime && !videoElement.paused) {
          // Video might be frozen
          resolve({
            isValid: false,
            reason: 'frozen',
            message: 'Video appears to be frozen',
            checks: checkCount
          });
          return;
        }
        
        // Check for black frames using canvas analysis
        checkForBlackFrame(videoElement, blackThreshold)
          .then(isBlack => {
            if (isBlack) {
              resolve({
                isValid: false,
                reason: 'black',
                message: 'Video is showing black frames',
                checks: checkCount
              });
            } else {
              resolve({
                isValid: true,
                reason: 'valid',
                message: 'Video stream is valid',
                checks: checkCount,
                dimensions: {
                  width: videoElement.videoWidth,
                  height: videoElement.videoHeight
                }
              });
            }
          })
          .catch(() => {
            // If canvas check fails, assume video is valid if other checks passed
            resolve({
              isValid: true,
              reason: 'valid_no_canvas',
              message: 'Video stream appears valid (canvas check failed)',
              checks: checkCount
            });
          });
      }, 100); // Small delay to check for movement
    };
    
    checkVideo();
  });
}

/**
 * Check if video is showing black frames using canvas analysis
 * @param {HTMLVideoElement} videoElement 
 * @param {number} threshold - Brightness threshold (0-255)
 * @returns {Promise<boolean>} True if video is black
 */
async function checkForBlackFrame(videoElement, threshold = 10) {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = Math.min(videoElement.videoWidth, 320);
      canvas.height = Math.min(videoElement.videoHeight, 240);
      
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      let totalBrightness = 0;
      let pixelCount = 0;
      
      // Sample every 4th pixel for performance
      for (let i = 0; i < data.length; i += 16) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Calculate brightness using luminance formula
        const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
        totalBrightness += brightness;
        pixelCount++;
      }
      
      const averageBrightness = totalBrightness / pixelCount;
      resolve(averageBrightness < threshold);
      
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Check if a MediaStream has active video tracks
 * @param {MediaStream} stream 
 * @returns {Object} Stream analysis
 */
export function analyzeMediaStream(stream) {
  if (!stream) {
    return {
      hasVideo: false,
      hasAudio: false,
      videoTracks: 0,
      audioTracks: 0,
      activeVideoTracks: 0,
      activeAudioTracks: 0
    };
  }
  
  const videoTracks = stream.getVideoTracks();
  const audioTracks = stream.getAudioTracks();
  
  const activeVideoTracks = videoTracks.filter(track => track.enabled && track.readyState === 'live');
  const activeAudioTracks = audioTracks.filter(track => track.enabled && track.readyState === 'live');
  
  return {
    hasVideo: videoTracks.length > 0,
    hasAudio: audioTracks.length > 0,
    videoTracks: videoTracks.length,
    audioTracks: audioTracks.length,
    activeVideoTracks: activeVideoTracks.length,
    activeAudioTracks: activeAudioTracks.length,
    videoEnabled: activeVideoTracks.length > 0,
    audioEnabled: activeAudioTracks.length > 0
  };
}

/**
 * Monitor video stream health continuously
 * @param {HTMLVideoElement} videoElement 
 * @param {Function} onStatusChange - Callback for status changes
 * @param {Object} options - Configuration options
 * @returns {Function} Cleanup function
 */
export function monitorVideoStream(videoElement, onStatusChange, options = {}) {
  const {
    checkInterval = 2000,
    maxFailures = 3,
    autoRecover = true
  } = options;
  
  let failureCount = 0;
  let lastStatus = null;
  let isMonitoring = true;
  
  const monitor = async () => {
    if (!isMonitoring) return;
    
    try {
      const result = await validateVideoStream(videoElement, {
        timeout: 3000,
        checkInterval: 200
      });
      
      if (result.isValid) {
        if (failureCount > 0) {
          failureCount = 0;
          onStatusChange?.({
            status: 'recovered',
            message: 'Video stream recovered',
            result
          });
        } else if (lastStatus !== 'valid') {
          onStatusChange?.({
            status: 'valid',
            message: 'Video stream is healthy',
            result
          });
        }
        lastStatus = 'valid';
      } else {
        failureCount++;
        
        if (failureCount >= maxFailures) {
          onStatusChange?.({
            status: 'failed',
            message: `Video stream validation failed: ${result.message}`,
            result,
            failureCount
          });
          lastStatus = 'failed';
        } else {
          onStatusChange?.({
            status: 'warning',
            message: `Video stream issue detected: ${result.message} (${failureCount}/${maxFailures})`,
            result,
            failureCount
          });
          lastStatus = 'warning';
        }
      }
    } catch (error) {
      console.warn('Video stream monitoring error:', error);
    }
    
    if (isMonitoring) {
      setTimeout(monitor, checkInterval);
    }
  };
  
  // Start monitoring
  setTimeout(monitor, 1000); // Initial delay
  
  // Return cleanup function
  return () => {
    isMonitoring = false;
  };
}