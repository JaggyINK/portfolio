import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  base: '/', // important pour un déploiement propre sur Vercel
  server: {
    hmr: { overlay: false }, // ok, Vercel s’en fout, c’est que pour le dev
  },
})
