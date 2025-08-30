import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

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
      shared: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query', '@mui/x-data-grid']
    })
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
