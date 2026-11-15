import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import App from './App.vue'
import { RENDERED_ON, fromDay, toDay } from './lib/today'

/** The page as HTML, and the day it was rendered on, for scripts/prerender.js to put into the built index.html. */
export async function render(): Promise<{ html: string; renderedOn: string }> {
  const renderedOn = toDay(new Date())
  const app = createSSRApp(App).provide(RENDERED_ON, fromDay(renderedOn))
  return { html: await renderToString(app), renderedOn }
}
