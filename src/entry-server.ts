import { createSSRApp, type Component } from 'vue'
import { renderToString } from 'vue/server-renderer'
import App from './App.vue'
import CvPage from './CvPage.vue'
import OgCard from './OgCard.vue'
import { RENDERED_ON, fromDay, toDay } from './lib/today'

/** A page as HTML, and the day it was rendered on, for scripts/prerender.js to put into its built HTML file. */
async function render(page: Component): Promise<{ html: string; renderedOn: string }> {
  const renderedOn = toDay(new Date())
  const app = createSSRApp(page).provide(RENDERED_ON, fromDay(renderedOn))
  return { html: await renderToString(app), renderedOn }
}

/** The built HTML files and the page each one holds. */
export const PAGES = {
  'index.html': () => render(App),
  'cv.html': () => render(CvPage),
  'og.html': () => render(OgCard),
}
