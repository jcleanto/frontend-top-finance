import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
// import { dependencies } from './package.json';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'frontend_top_finance',
      filename: 'remoteEntry.js',
      exposes: {
        './ListFinancePage': './src/finance/crud/list.finance.page.tsx',
        './CreateFinancePage': './src/finance/crud/create.finance.page.tsx',
        './EditFinancePage': './src/finance/crud/edit.finance.page.tsx',
      },
      shared: [
        'react',
        'react-dom',
        'react-router-dom',
        '@tanstack/react-query',
        '@mui/x-data-grid',
        // added all for testing
        // '@emotion/react',
        // '@emotion/styled',
        // '@hookform/resolvers',
        // '@mui/icons-material',
        // '@mui/material',
        // 'axios',
        // 'react-hook-form',
        // 'react-toastify',
        // 'zod'
      ]
      // shared: [dependencies.react],
    })
  ],
  preview: {
    port: 5002,
    strictPort: true,
  },
  server: {
    host: 'localhost',
    port: 5002,
    strictPort: true,
    origin: "http://localhost:5002",
    fs: { allow: ['.', '../shared'] }
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
