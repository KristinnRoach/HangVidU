export function handleMediaError(error, updateStatus) {
  let userMessage = 'Error: Could not access camera/mic.';

  if (error.name === 'NotAllowedError') {
    userMessage +=
      ' Permission denied. Please allow access to your camera and microphone.';
  } else if (
    error.name === 'NotFoundError' ||
    error.name === 'DevicesNotFoundError'
  ) {
    userMessage += ' No camera or microphone found on this device.';
  } else if (
    error.name === 'NotReadableError' ||
    error.name === 'TrackStartError'
  ) {
    userMessage +=
      ' Camera or microphone is already in use by another application.';
  } else if (
    error.name === 'OverconstrainedError' ||
    error.name === 'ConstraintNotSatisfiedError'
  ) {
    userMessage +=
      ' The requested media device is not available or does not support the requested constraints.';
  } else if (error.name === 'NotSupportedError') {
    userMessage +=
      ' Your browser or device does not support video/audio capture, or HTTPS is required.';
  } else {
    userMessage += ' ' + error.message;
  }

  console.error('Media error:', userMessage, error);

  if (typeof updateStatus === 'function') {
    updateStatus(userMessage);
  }
}
