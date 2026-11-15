import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [vue(), tailwindcss()],
  // Two pages: the site, and the CV that `mise run cv` prints to PDF. The server build that
  // prerenders them (scripts/prerender.js) names its own entry.
  build: isSsrBuild ? {} : { rolldownOptions: { input: { main: 'index.html', cv: 'cv.html' } } },
}))
