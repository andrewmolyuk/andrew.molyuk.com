import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [vue(), tailwindcss()],
  // Three pages: the site, the CV that `mise run cv` prints to PDF, and the link-preview card that
  // `mise run og` takes a picture of. The server build that prerenders them (scripts/prerender.js)
  // names its own entry.
  build: isSsrBuild ? {} : { rolldownOptions: { input: { main: 'index.html', cv: 'cv.html', og: 'og.html' } } },
}))
