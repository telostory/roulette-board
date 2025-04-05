import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/roulette-board/' : '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    assetsDir: 'assets',
    emptyOutDir: true,
    copyPublicDir: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
