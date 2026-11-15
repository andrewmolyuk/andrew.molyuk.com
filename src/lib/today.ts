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

/**
 * A date as its calendar day, "YYYY-MM-DD", and back, both in local time. The render date travels
 * from the build to the browser this way, not as an instant: an instant near midnight falls on
 * another day, month or year in the visitor's time zone, and the browser would start from a date
 * the prerendered markup doesn't show.
 */
export function toDay(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export function fromDay(day: string): Date {
  const [y, m, d] = day.split('-').map(Number)
  return new Date(y, m - 1, d)
}
