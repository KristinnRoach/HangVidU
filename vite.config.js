import { defineConfig } from 'vite';

export default defineConfig({
  // Base path for GitHub Pages (change 'HangVidU' to your repo name)
  base: '/HangVidU/',
  
  // Minimal config - Vite handles the rest automatically
  server: {
    port: 3000,
    open: true
  }
});