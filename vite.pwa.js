// Shared VitePWA config for the app build (vite.config.js) and tests
// (vitest.config.js). Single source so the two configs can't drift.
import { VitePWA } from 'vite-plugin-pwa';

export function pwaPlugin(basePath = '/') {
  return VitePWA({
    includeAssets: ['index.html', 'favicon.ico'],
    registerType: 'autoUpdate',
    strategies: 'injectManifest',
    srcDir: 'src',
    filename: 'sw.js',
    injectManifest: {
      // Large EAC3 WASM modules load on demand, so keep them out of precache.
      globIgnores: ['**/assets/mediabunny-ac3-*.*'],
      // The sw build runs after sentryVitePlugin's delete hook, so its map
      // would ship to production. The sw isn't Sentry-instrumented anyway.
      sourcemap: false,
    },
    devOptions: {
      enabled: false, // injectManifest with ES modules doesn't work in dev
      type: 'module',
    },
    workbox: {
      cleanupOutdatedCaches: true,
      navigateFallback: `${basePath}index.html`, // SPA fallback (accounts for base path)
      navigateFallbackDenylist: [
        new RegExp(`^${basePath.replaceAll('/', '\\/')}index\\.html$`), // don't fallback for index.html itself
        /^\/__\//, // Firebase auth handler paths (/__/auth/handler, etc.)
        /^\/auth\//, // other auth-related paths
      ],
    },
    manifest: {
      name: 'HangVidU',
      short_name: 'HangVidU',
      description: 'Peer-to-peer video chat with watch-together mode',

      start_url: basePath,
      scope: basePath,

      display: 'standalone',
      theme_color: '#82b5ecff',
      background_color: '#1a1a1a',

      icons: [
        {
          src: `${basePath}icons/play-arrows-v1/icon-192.png`,
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: `${basePath}icons/play-arrows-v1/icon-512.png`,
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: `${basePath}icons/play-arrows-v1/icon-512.png`,
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
      screenshots: [
        {
          src: `${basePath}screenshot-1280x800.webp`,
          sizes: '1280x800',
          form_factor: 'wide',
          type: 'image/webp',
        },
        {
          src: `${basePath}screenshot-720x1444.webp`,
          sizes: '720x1444',
          form_factor: 'narrow',
          type: 'image/webp',
        },
      ],
    },
  });
}
