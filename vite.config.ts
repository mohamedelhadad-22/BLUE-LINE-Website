import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue'
import path from "path";
import { fileURLToPath } from "url";
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// Alternative to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteImageOptimizer({
      // Optimize PNG files
      png: {
        quality: 80, // 0-100
      },
      // Optimize JPEG files
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      // Optimize WebP files
      webp: {
        quality: 80,
      },
      // Convert images to WebP
      // This will create .webp versions alongside original images
      cache: true,
      cacheLocation: '.cache',
    }),
  ],
  base: '/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'vue-router'],
          'i18n': ['vue-i18n'],
          'validation': ['@vuelidate/core', '@vuelidate/validators'],
        },
      },
    },
  },
});
