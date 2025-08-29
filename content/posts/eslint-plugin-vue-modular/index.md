---
title: 'eslint-plugin-vue-modular: Enforcing modular architecture in Vue 3'
date: 2025-08-29T12:00:00+03:00
draft: false
tags: ['vue', 'eslint', 'architecture', 'opensource']
image: 'index.png'
---

This post explains why I created eslint-plugin-vue-modular, how it helps enforce modular architecture in Vue 3 projects,
and shows concrete examples of rules, configuration, and typical violations and fixes.

Code repository: [eslint-plugin-vue-modular on GitHub](https://github.com/andrewmolyuk/eslint-plugin-vue-modular)

## Why this plugin

One of my projects reached a point where the codebase needed strict boundaries between features and modules. Developers
started importing deeply into other features, UI-kit components accumulated business logic, and the top-level `src`
layout became inconsistent across teams. I created eslint-plugin-vue-modular to codify the desired structure and make
those rules enforceable by CI and local editors.

## What it does

The plugin enforces modular architecture principles in Vue 3 projects by providing a set of ESLint rules. These rules
help maintain clear boundaries between features, prevent deep imports, and ensure that UI components remain
presentation-focused.

I created this plugin to address the challenges I faced in my own projects and to promote best practices in the Vue
community.

## Installation and usage (short)

The package is published on npm and can be added as a devDependency. Use the plugin's bundled presets (`recommended` /
`strict`) or enable individual rules.

### Flat config (ESLint v9+, recommended)

```js
// eslint.config.js
import pluginVueModular from 'eslint-plugin-vue-modular';

export default [
  {
    files: ['**/*.js', '**/*.ts', '**/*.vue'],
    plugins: { 'vue-modular': pluginVueModular },
    rules: {
      'vue-modular/no-cross-feature-imports': 'error',
      'vue-modular/no-business-logic-in-ui-kit': 'error',
      'vue-modular/enforce-src-structure': 'error',
      // optional
      'vue-modular/no-deep-nesting': 'warn',
    },
  },
];
```

### Legacy config (ESLint v8 and below)

```js
// .eslintrc.js
module.exports = {
  plugins: ['vue-modular'],
  extends: ['plugin:vue-modular/recommended'],
  rules: {
    'vue-modular/no-cross-feature-imports': 'error',
    'vue-modular/enforce-module-exports': 'error',
  },
};
```

## Rules and examples

1. no-cross-feature-imports

Problem: importing implementation details from another feature instead of its public API.

Bad

```js
// feature-a/components/SomeList.vue
import { formatDate } from '../../feature-b/utils/format';
```

Good

```js
// feature-a/components/SomeList.vue
import { formatDate } from '../../feature-b'; // use feature public API (index.js)
```

1. enforce-module-exports

Problem: modules without `index.js`/`index.ts` force consumers to import deep paths.

Bad

```js
// feature-b/components/Button.vue
// consumed directly: import Button from 'src/feature-b/components/Button.vue'
```

Good

```js
// feature-b/index.js
export { default as Button } from './components/Button.vue';

// consumer
import { Button } from 'src/feature-b';
```

1. no-business-logic-in-ui-kit

Problem: shared UI components that include business logic create tight coupling.

Bad

```vue
<!-- ui/Button.vue -->
<script setup>
// fetches data directly — business logic
const { fetchItems } = useItemsService();
const items = await fetchItems();
</script>
```

Good

```vue
<!-- ui/Button.vue -->
<script setup>
// presentation only; logic is passed in via props or composables from the feature
defineProps({ onClick: Function });
</script>
```

Auto-detection of tests

The plugin treats files matching common test patterns as test files (`**/*.spec.*`, `**/__tests__/**`), which are
allowed to import from anywhere. This keeps tests flexible while preserving runtime boundaries in production code.

Extending and presets

There are two bundled presets: `recommended` (core architecture rules) and `strict` (includes naming and style rules).
Rules are designed to be extendable — teams can add custom path mappings or relax specific checks if needed.

Examples and migration tips

## Conclusion

I created eslint-plugin-vue-modular to enforce modular boundaries in a project that needed them; the repo and
documentation are available on GitHub if you want to try it or browse the rules:
[eslint-plugin-vue-modular on GitHub](https://github.com/andrewmolyuk/eslint-plugin-vue-modular)
