import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/playground/', // Your repository name
  build: {
    outDir: 'docs', // Using docs instead of dist for GitHub Pages
  },
  rollupOptions: {
    input: {
      main: 'index.html',
      react: 'react-page.html'
    }
  }
});