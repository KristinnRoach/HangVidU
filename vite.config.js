// vite.config.js

import { defineConfig } from 'vite';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig(({ mode }) => {
  // Allow overriding base path for different prod hosts (gh-pages vs Firebase Hosting)
  // Usage: BUILD_TARGET=hosting pnpm build -> basePath '/'
  const target = process.env.BUILD_TARGET || process.env.VITE_BUILD_TARGET;
  const basePath =
    mode === 'production' ? (target === 'hosting' ? '/' : '/HangVidU/') : '/';

  return {
    base: basePath,

    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          ...(mode === 'development' && {
            experiments: path.resolve(__dirname, 'experiments.html'),
          }),
        },
      },
    },

    plugins: [
      ...(mode === 'development' ? [mkcert()] : []),
      VitePWA({
        includeAssets: ['index.html', 'favicon.ico'],
        registerType: 'autoUpdate',
        strategies: 'injectManifest',
        srcDir: 'src',
        filename: 'sw.js',
        devOptions: {
          enabled: false, // injectManifest with ES modules doesn't work in dev
          type: 'module',
        },
        workbox: {
          cleanupOutdatedCaches: true,
          navigateFallback: `${basePath}index.html`, // fallback for SPA navigation (accounts for base path)
          navigateFallbackDenylist: [
            new RegExp(`^${basePath.replace(/\//g, '\\/')}index\\.html$`), // Don't fallback for index.html itself (prevents cache error)
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
              src: `${basePath}screenshot-wide.png`,
              sizes: '1280x720',
              form_factor: 'wide',
              type: 'image/png',
            },
            {
              src: `${basePath}screenshot-narrow.png`,
              sizes: '540x720',
              form_factor: 'narrow',
              type: 'image/png',
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
