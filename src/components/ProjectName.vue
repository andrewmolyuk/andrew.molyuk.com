<script setup lang="ts">
const props = defineProps<{
  name: string
  icon: string
  /** The live product; the name links here. */
  site?: string
  /** The public repository; a GitHub mark at the end links here. Left out when it's private. */
  github?: string
}>()

const host = props.site ? new URL(props.site).host : undefined
</script>

<template>
  <div class="flex flex-wrap items-center gap-x-3 gap-y-1.5">
    <img :src="icon" alt="" width="28" height="28" class="size-7 shrink-0 rounded-md" />
    <a
      v-if="site"
      :href="site"
      target="_blank"
      rel="noopener noreferrer"
      class="text-heading hover:text-accent font-mono text-[15px] font-medium"
      >{{ name }}</a
    >
    <span v-else class="text-heading font-mono text-[15px] font-medium">{{ name }}</span>
    <a
      v-if="site && host !== name"
      :href="site"
      target="_blank"
      rel="noopener noreferrer"
      class="text-muted hover:text-accent font-mono text-[12.5px]"
      >{{ host }}</a
    >
    <a
      v-if="github"
      :href="github"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="`${name} on GitHub`"
      :title="`${name} on GitHub`"
      class="text-muted hover:text-accent transition-colors duration-200"
    >
      <!-- The GitHub mark, from Octicons (MIT). -->
      <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
        <path
          d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
        />
      </svg>
    </a>
  </div>
</template>
