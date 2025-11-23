/**
 * Auto-redirect iOS standalone PWAs from gh-pages to Firebase Hosting.
 * This ensures auth works reliably (redirect flow requires Firebase's /__/auth/handler).
 * TODO: check whether this should also apply to Android PWAs or other platforms.
 * Call this early in app initialization (before UI setup).
 * Only redirects once per session to avoid loops.
 */
export function redirectIOSPWAToHosting() {
  // Only redirect in production (gh-pages or hosting, not dev)
  if (import.meta.env.DEV) return;

  // Detect standalone PWA
  const isStandalonePWA =
    (window.matchMedia &&
      window.matchMedia('(display-mode: standalone)').matches) ||
    navigator.standalone === true;

  // Detect iOS device
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent || '');

  if (!isStandalonePWA || !isIOS) return;

  // Check if we're on gh-pages (not already on Firebase Hosting)
  const isGitHubPages = window.location.hostname.includes('github.io');
  if (!isGitHubPages) return;

  // Get target Firebase Hosting URL from env
  const hostingURL = import.meta.env.VITE_APP_HOSTING_URL;
  if (!hostingURL) {
    console.warn(
      '[PWA Redirect] VITE_APP_HOSTING_URL not set; skipping redirect.'
    );
    return;
  }

  // Normalize hostingURL: remove trailing slash
  const normalizedHostingURL = hostingURL.replace(/\/$/, '');

  // Validate and check if we're already on the target host (avoid redirect loop)
  let targetHost;
  try {
    targetHost = new URL(normalizedHostingURL).hostname;
  } catch (error) {
    console.error(
      '[PWA Redirect] Invalid VITE_APP_HOSTING_URL:',
      hostingURL,
      error
    );
    return;
  }
  if (window.location.hostname === targetHost) return;

  // Strip GitHub Pages base path when redirecting to Firebase Hosting
  // GitHub Pages uses /HangVidU/, Firebase Hosting uses /
  const ghPagesBase = '/HangVidU/';
  let targetPath = window.location.pathname;

  if (targetPath.startsWith(ghPagesBase)) {
    // Strip /HangVidU/ prefix, keeping the rest of the path
    targetPath = '/' + targetPath.slice(ghPagesBase.length);
  } else if (targetPath === '/HangVidU') {
    // Handle root path without trailing slash
    targetPath = '/';
  }

  // Preserve path, query, and hash
  let targetURL;
  try {
    targetURL = new URL(
      targetPath + window.location.search + window.location.hash,
      normalizedHostingURL
    ).toString();
  } catch (error) {
    console.error('[PWA Redirect] Failed to construct target URL:', error);
    return;
  }

  console.log(
    '[PWA Redirect] iOS standalone PWA on gh-pages → redirecting to Firebase Hosting:',
    targetURL
  );

  // Replace current location (no back-button history entry)
  window.location.replace(targetURL);
}
