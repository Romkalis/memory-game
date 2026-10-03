import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  plugins: [
    ViteImageOptimizer({
      png: { quality: 82, compressionLevel: 9, effort: 10 },
      jpeg: { quality: 82, mozjpeg: true },
      jpg: { quality: 82, mozjpeg: true },
      tiff: { quality: 82 },
      webp: { quality: 82, effort: 5 },
      avif: { quality: 55, effort: 5 },
      includePublic: true,
      logStats: true,
    }),
  ],
})