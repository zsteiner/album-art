import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    vue(),
    svgLoader({
      svgoConfig: {
        multipass: true,
      },
    }),
  ],
  server: {
    port: 8080,
    proxy: {
      '/api/search': {
        target: 'https://itunes.apple.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/search/, '/search'),
      },
    },
  },
  preview: {
    port: 8080,
  },
  build: {
    sourcemap: true,
  },
  test: {
    environment: 'happy-dom',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
