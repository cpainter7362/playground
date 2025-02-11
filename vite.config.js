import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/playground/',
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        main: 'index.html',
        contact: 'contact.html',
        gallery: 'gallery.html',
        react: 'react-page.html'
      }
    }
  }
});