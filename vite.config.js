import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/otp-client/',  // Set this base path to the repository name
  build: {
    outDir: 'dist',      // The output directory for the build
    sourcemap: true,     // Enable source maps for easier debugging (optional)
  },
  server: {
    open: true,          // Automatically open the app in the browser when running `vite`
  },
});
