// vite.config.js

import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  base: '/HangVidU/',
  plugins: [
    ...(mode === 'development' ? [basicSsl()] : []),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'HangVidU',
        short_name: 'HangVidU',
        description: 'Peer-to-peer video chat with watch-together mode',
        theme_color: '#82b5ecff',
        background_color: '#1a1a1a',
        start_url: '/HangVidU/',
        scope: '/HangVidU/',
        display: 'standalone',
        icons: [
          {
            src: '/HangVidU/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/HangVidU/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/HangVidU/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  server: {
    https: true, // ?!?!?
    host: true, // To expose to LAN devices as well
    allowedHosts: ['.ngrok-free.app'],
  },
});
