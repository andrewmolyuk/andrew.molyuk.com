---
title: 'Переезжаем на Netlify'
date: 2023-05-27T15:14:30+03:00
tags: ['hugo', 'netlify', 'деплой', 'godaddy']
draft: false
---

Я хотел, чтобы мой сайт был доступен под следующими именами: andrew.molyuk.com и
molyuk.com и я не смог этого сделать на Github Pages. Поэтому я решил
использовать Netlify. Как оказалось, развернуть Hugo на Netlify очень просто. В
этом посте я расскажу вам, как я это сделал.

Для начала нам нужно создать аккаунт на Netlify. После этого нам нужно создать
новый сайт. Нажмите на кнопку "Add a new site" и продолжите согласно
инструкциям. В принципе это все, что нам нужно сделать на Netlify, чтобы сайт
стал публично доступен.

<!--more-->

Дополнительно я поправил команду сборки, чтобы Netlify мог собрать мой сайт.
Теперь она выглядит следующим образом:

![netlify-repository.webp](netlify-repository.webp)

Чтобы мой сайт был доступен под следующими именами: andrew.molyuk.com и
molyuk.com мне нужно было настроить DNS-записи. Я зашел в аккаунт GoDaddy и
добавил соответствующие DNS-записи. Вот как это выглядело:

![netlify-godaddy.webp](netlify-godaddy.webp)

Затем я добавил и верифицировал домены на Netlify. В итоге получилось следующее:

![netlify-domains.webp](netlify-domains.webp)

На этом все - теперь мой сайт доступен по адресам: andrew.molyuk.com и
molyuk.com и я могу публиковать новые посты, не заботясь о том, как их
развернуть.

Есть небольшой нюанс, который я хотел бы упомянуть. Когда я строил свой сайт на
Netlify, я столкнулся с тем, что моя локальная версия Hugo отличается от той,
что использовалась на Netlify. Это привело к падениям сборки. Я решил эту
проблему, добавив переменную окружения `HUGO_VERSION` в настройки Netlify и
указав в ее значении номер версии Hugo. В моем случае это была версия `0.111.3`.
Теперь моя сборка работает как на локальной машине, так и на Netlify.

![netlify-hugo.webp](netlify-hugo.webp)

Кроме всего прочего, Netlify предоставляет бейдж о состоянии сборки, который
можно поместить в файл README.md.

```markdown
[![Netlify Status](https://api.netlify.com/api/v1/badges/9162f57e-4db3-4360-b350-e31ad5e85cb6/deploy-status)](https://app.netlify.com/sites/molyuk/deploys)
```

## Заключение

Я надеюсь, что этот пост поможет вам развернуть ваш сайт на Netlify. Если у вас
есть какие-либо вопросы, пожалуйста, не стесняйтесь спрашивать в комментариях
ниже. Спасибо за чтение!
