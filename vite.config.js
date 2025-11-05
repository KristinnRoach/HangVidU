// vite.config.js

import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig(({ mode }) => {
  const basePath = mode === 'production' ? '/HangVidU/' : '/';

  return {
    base: basePath,

    plugins: [
      ...(mode === 'development' ? [mkcert()] : []),
      VitePWA({
        includeAssets: ['favicon.ico'],
        registerType: 'autoUpdate',
        strategies: 'generateSW',
        injectRegister: 'script',
        devOptions: {
          enabled: true, // enable service worker & manifest during dev for install prompt testing
        },
        workbox: {
          cleanupOutdatedCaches: true,
        },
        // strategies: 'injectManifest',
        // srcDir: './service-worker',
        // filename: 'sw.js',
        // injectManifest: {
        //   minify: false,
        //   enableWorkboxModulesLogs: true,
        // },

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
      https: true, // use trusted dev cert from mkcert
      host: true, // To expose to LAN devices as well
      allowedHosts: ['.ngrok-free.app'],
    },
  };
});
