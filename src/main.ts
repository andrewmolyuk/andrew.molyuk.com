import { createApp, createSSRApp } from 'vue'
import './style.css'
import App from './App.vue'
import { RENDERED_ON, fromDay } from './lib/today'

// The build prerenders the page into #app (scripts/prerender.js), and the app takes over that markup
// instead of drawing it again, starting from the date it was rendered on; the dev server serves an
// empty #app, which is drawn from scratch.
const root = document.querySelector<HTMLElement>('#app')!
const renderedOn = root.dataset.renderedOn
const app = renderedOn ? createSSRApp(App).provide(RENDERED_ON, fromDay(renderedOn)) : createApp(App)
app.mount(root)
