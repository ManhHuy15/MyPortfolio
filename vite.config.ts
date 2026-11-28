import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const assistantApiUrl = env.VITE_ASSISTANT_API_URL?.trim();

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      port: 3000,
      open: true,
      proxy: assistantApiUrl
        ? {
            '/api': {
              target: assistantApiUrl,
              changeOrigin: true,
            },
          }
        : undefined,
    },
  };
});
