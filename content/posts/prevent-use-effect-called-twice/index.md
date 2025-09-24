---
  title: 'Prevent UseEffect Hook Called Twice'
  date: 2024-03-27T22:15:25+02:00
  image: 'index.png'
  tags: ['react', 'strict']
  draft: false
---

Two years ago, the folks released React version 18 and made changes to Strict Mode.

> ... React 18 introduces a new development-only check to Strict Mode. This new check will automatically unmount and remount every component, whenever a component mounts for the first time, ...

<!--more-->

[Read more here](https://react.dev/blog/2022/03/29/react-v18#new-strict-mode-behaviors)

Lately, I've been getting into frontend work and was a bit surprised by this change. To be honest, it's blatantly bad design for such a popular and widely used framework. I'm sure I'm not the only one who was puzzled and disappointed by this.

When Strict Mode is enabled (which should be done in any case), React performs additional runtime checks in the development environment to ensure that your application is safe and reliable. Starting from version 18, this also includes mounting each component (triggering the execution of useEffect), unmounting, and finally remounting (triggering the execution of useEffect for the second time). React does this to ensure that your effects are resilient to remounting, so that certain hidden optimizations can be safely performed. But what if that's not entirely true?

I can think of a million reasons why this can be really problematic, starting from authentication or logging. But what's especially annoying is the official recommendation to disable Strict Mode if you're not in production.

> ... you can deploy your app to a staging environment (which runs in production mode) or temporarily opt out of Strict Mode and its development-only remounting checks.

Wow! Unexpected, right?

In the end, I decided to ignore the documentation and solve this by creating a small hook with a simple solution.

```js
import type { EffectCallback } from 'react'
import { useEffect, useRef } from 'react'

export const useStrictEffect = (effect: EffectCallback) => {
  const isMounted = useRef(false)

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      effect()
    }
  }, [effect])
}
```

Enjoy! Don't care about the name :)
