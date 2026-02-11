import { defineConfig, type Plugin } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import { fileURLToPath, URL } from 'node:url';

function itunesProxy(): Plugin {
  return {
    name: 'itunes-proxy',
    configureServer(server) {
      server.middlewares.use('/api/search', async (req, res) => {
        const url = new URL(req.url ?? '', 'http://localhost');
        const response = await fetch(
          `https://itunes.apple.com/search${url.search}`,
        );
        const data = await response.text();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      });
    },
  };
}

export default defineConfig({
  plugins: [
    vue(),
    svgLoader({
      svgoConfig: {
        multipass: true,
      },
    }),
    itunesProxy(),
  ],
  server: {
    port: 8080,
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
