/**
 * Auto-redirect iOS standalone PWAs from gh-pages to Firebase Hosting.
 * This ensures auth works reliably (redirect flow requires Firebase's /__/auth/handler).
 *
 * Call this early in app initialization (before UI setup).
 * Only redirects once per session to avoid loops.
 */

const STORAGE_KEY = 'pwa_redirected_to_hosting';

export function redirectIOSPWAToHosting() {
  // Only redirect in production (gh-pages or hosting, not dev)
  if (import.meta.env.DEV) return;

  // Detect iOS standalone PWA
  const isIOSStandalone =
    (window.matchMedia &&
      window.matchMedia('(display-mode: standalone)').matches) ||
    navigator.standalone === true;

  if (!isIOSStandalone) return;

  // Check if we're on gh-pages (not already on Firebase Hosting)
  const isGitHubPages = window.location.hostname.includes('github.io');
  if (!isGitHubPages) return;

  // Check if we've already redirected this session (avoid loops)
  const hasRedirected = sessionStorage.getItem(STORAGE_KEY);
  if (hasRedirected) return;

  // Get target Firebase Hosting URL from env
  const hostingURL = import.meta.env.VITE_APP_HOSTING_URL;
  if (!hostingURL) {
    console.warn(
      '[PWA Redirect] VITE_APP_HOSTING_URL not set; skipping redirect.'
    );
    return;
  }

  // Mark as redirected for this session
  sessionStorage.setItem(STORAGE_KEY, 'true');

  // Preserve current path and query
  const targetURL =
    hostingURL + window.location.pathname + window.location.search;

  console.log(
    '[PWA Redirect] iOS standalone PWA on gh-pages → redirecting to Firebase Hosting:',
    targetURL
  );

  // Replace current location (no back-button history entry)
  window.location.replace(targetURL);
}
