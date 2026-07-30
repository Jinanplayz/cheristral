import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));
const allDeps = Object.keys(pkg.dependencies || {});

export default defineConfig({
  optimizeDeps: {
    include: allDeps,
  },
  plugins: [react()],
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    // Raise the warning threshold slightly; vendor chunk is intentionally split below
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Split big, stable libraries into their own cacheable chunks
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'motion': ['framer-motion'],
          'icons': ['lucide-react'],
          // Radix Dialog powers the mobile nav drawer. Without naming it, Rollup
          // folded ~40 KB of it into a chunk it happened to call "Footer", which
          // meant any Footer edit invalidated the Radix cache too.
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-slot'],
        },
      },
    },
  },
});
