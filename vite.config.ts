import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/roulette-board/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser'
  }
})
