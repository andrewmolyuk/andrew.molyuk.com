---
title: 'Двойной вызов useEffect в React 18+'
date: 2024-03-27T22:15:25+02:00
tags: ['react', 'useEffect', 'strict']
draft: false
---

Два года назад ребята выпустили 18 версию React и с ним внесли изменения в Strict Mode.

> ... React 18 introduces a new development-only check to Strict Mode. This new check will automatically unmount and remount every component, whenever a component mounts for the first time, ...

[Читать полностью тут](https://react.dev/blog/2022/03/29/react-v18#new-strict-mode-behaviors)

В последнее время я увлекся немного фронтовой работой и был немного удивлен такому изменению. Если быть честным, то это откровенно плохой дизайн для такого популярного и широко использумого фреймворка. Я уверен, что не у меня одного это вызвало недоумение и разочарование.

Когда включен Strict Mode (что следует сделать в любом случае), React выполняет дополнительные проверки во время выполнения в среде разработки, чтобы убедиться, что Ваше приложение безопасно и надежно. Начиная с версии 18, это также включает в себя монтирование каждого компонента (вызывающее выполнение useEffect), размонтирование и, наконец, повторное монтирование (вызывающее выполнение useEffect во второй раз). React делает это, чтобы убедиться, что Ваши эффекты устойчивы к перемонтированию, чтобы можно было безопасно выполнить определенные скрытые оптимизации. Но что, если это не совсем так?

Я могу придумать миллион причин когда это действительно мешает, начиная с аутентикации или логирования. Но особенно раздражает официальная рекомендация убирать строгий режим если Вы не в проде.

> ... you can deploy your app to a staging environment (which runs in production mode) or temporarily opt out of Strict Mode and its development-only remounting checks.

Охренеть! Неожиданно, однако!

В итоге я решил забить на документацию и решить это созданием небольшого хука с простейшим решением.

```js
import type { EffectCallback } from 'react';
import { useEffect, useRef } from 'react';

export const useStrictEffect = (effect: EffectCallback) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      effect();
    }
  }, [effect]);
};
```

Наслаждайтесь! К названию не придираемся :)
