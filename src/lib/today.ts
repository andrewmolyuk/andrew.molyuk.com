import { inject, onMounted, ref, type InjectionKey, type Ref } from 'vue'

/** The date the page was prerendered on, given by src/entry-server.ts and read back by src/main.ts. */
export const RENDERED_ON: InjectionKey<Date> = Symbol('rendered-on')

/**
 * Today, for everything the page counts from the date: the years in the field, the timeline, the
 * footer's year. It starts as the date the page was prerendered on, so the browser takes over that
 * markup exactly as it is, and turns to the real today once mounted. Starting from the real today
 * instead would leave the timeline drawn as of the build: Vue corrects a mismatched text while
 * hydrating, but not a mismatched style.
 */
export function useToday(): Readonly<Ref<Date>> {
  const today = ref(inject(RENDERED_ON, () => new Date(), true))
  onMounted(() => {
    today.value = new Date()
  })
  return today
}
