// vite.config.js

import { defineConfig } from 'vite';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import mkcert from 'vite-plugin-mkcert';
import solid from 'vite-plugin-solid';
import devtools from 'solid-devtools/vite';

export default defineConfig(({ mode }) => {
  // Firebase Hosting is the only production target.
  const basePath = '/';

  return {
    base: basePath,

    build: {
      // AC3 support is intentionally emitted as a large, on-demand chunk.
      // Keep warnings focused on regressions beyond the current expected ceiling.
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          ...(mode === 'development' && {
            // These are currently only local:
            media: path.resolve(__dirname, 'media-lab.html'),
            mediaPlayback: path.resolve(__dirname, 'media-playback.html'),
            mediaCapture: path.resolve(__dirname, 'media-capture.html'),
          }),
        },
      },
    },

    plugins: [
      ...(mode === 'development' ? [mkcert()] : []),
      devtools({
        /* features options - all disabled by default */
        autoname: true, // e.g. enable autoname
      }),
      solid(),
      VitePWA({
        includeAssets: ['index.html', 'favicon.ico'],
        registerType: 'prompt',
        strategies: 'injectManifest',
        srcDir: 'src',
        filename: 'sw.js',
        injectManifest: {
          // Don't include the large EAC3 WASM modules in the precache manifest; they'll be loaded on demand.
          globIgnores: ['**/assets/mediabunny-ac3-*.*'],
        },
        devOptions: {
          enabled: false, // injectManifest with ES modules doesn't work in dev
          type: 'module',
        },
        workbox: {
          cleanupOutdatedCaches: true,
          navigateFallback: `${basePath}index.html`, // fallback for SPA navigation (accounts for base path)
          navigateFallbackDenylist: [
            new RegExp(`^${basePath.replaceAll('/', '\\/')}index\\.html$`), // Don't fallback for index.html itself (prevents cache error)
            /^\/__\//, // Exclude Firebase auth handler paths (/__/auth/handler, etc.)
            /^\/auth\//, // Exclude any other auth-related paths
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
      }),
    ],
    server: {
      port: 5173, // Vite default - keep it simple
      https: true, // use trusted dev cert from mkcert
      host: true, // To expose to LAN devices as well
      allowedHosts: [
        'haunted-salley-cunningly.ngrok-free.dev',
        '192.168.8.100',
        '169.254.123.79',
      ],

      proxy: {
        // Proxy Firebase Auth handler and init.json requests
        '/__/auth': {
          target: 'https://vidu-aae11.firebaseapp.com', // Your project's default auth domain
          changeOrigin: true,
          rewrite: (path) => path, // Don't rewrite the path
        },
        '/__/firebase/init.json': {
          target: 'https://vidu-aae11.firebaseapp.com', // Your project's default auth domain
          changeOrigin: true,
          rewrite: (path) => path, // Don't rewrite the path
        },
      },
    },

    // Preview server configuration (for testing production builds locally)
    preview: {
      port: 4173,
      // Enable HTTPS if PREVIEW_HTTPS env var is set
      https: process.env.PREVIEW_HTTPS === '1' ? true : false,
      host: true,
    },
  };
});
