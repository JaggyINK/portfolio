// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  base: '/',
  server: { hmr: { overlay: false } },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // empêche MoonScene d’être mis dans un chunk séparé
          "MoonScene": ["./src/scene/MoonScene.jsx"]
        }
      }
    }
  }
})
