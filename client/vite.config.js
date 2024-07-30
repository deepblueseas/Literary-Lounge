import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        presets: ['@babel/preset-react'],
      },
    }),
  ],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3001',
        secure: false,
        changeOrigin: true,
      },
    },
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
    loader: 'jsx',
    include: /src\/.*\.js$/,
  },
  build: {
    rollupOptions: {
      input: '/src/main.jsx', // Ensure this points to your main entry file
    },
  },
});
