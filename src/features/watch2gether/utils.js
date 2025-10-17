export function isHostedVideoUrl(url) {
  if (!url || typeof url !== 'string') return false;

  try {
    new URL(url); // Basic URL validation
    return /\.(mp4|webm|ogg|avi|mov|wmv|flv|mkv)(\?|$)/i.test(url);
  } catch {
    return false;
  }
}
