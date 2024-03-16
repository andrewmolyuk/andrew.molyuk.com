---
title: "Раскрасим сайт с Tailwindcss"
date: 2023-05-12T16:55:27+03:00
blog/tags: [ "hugo", "tailwindcss" ]
cover:
  image: "29681523075_5b751dfe8c_o.webp"
  title: "Ed Mitchell"
  link: "https://nos.twnsnd.co/post/182684842680/ed-mitchell"
draft: false
---

Всегда занимаясь серверной и архитектурной составляющей веб-приложений, мне всегда было сложно создавать
пользовательские стили. Поэтому, когда я решил заняться стилями на собственном блоге, я решил использовать Tailwindcss.
Tailwindcss - это CSS-фреймворк, который позволяет создавать пользовательские стили, используя только HTML-классы. Он
предоставляет набор классов, которые можно использовать для создания пользовательских стилей.

В этом посте я расскажу вам, как я использовал Tailwindcss для стилизации своего сайта и блога.

<!--more-->

## Установка Tailwindcss

Для начала надо инициализировать npm и установить Tailwindcss:

```shell
npm init -y
npm install --save-exact tailwindcss postcss autoprefixer postcss-cli
```

Я не использовал dev-зависимости, потому как у нас нет необходимости в построении вебсайта с помощью npm и нам не нужно
разделять наш код на разработку и продакшн. Для этого мы будем продолжать использовать Hugo.

Теперь инициализируем Tailwindcss:

```shell
npx tailwindcss init
```

Это создаст файл `tailwind.config.js` в корне нашего проекта. В этом файле мы можем настроить Tailwindcss. Отредактируем
его до следующего вида:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./content/**/*.html", "./layouts/**/*.html"],
    theme: {
        extend: {},
    },
    plugins: [],
    darkMode: "class"
}
```

Здесь мы указываем Tailwindcss, где он может найти наши HTML-файлы. Также мы указываем, что мы хотим использовать темную
тему на основе класса.

Теперь создадим файл `postcss.config.js` в корне нашего проекта:

```js
module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    }
}
```

Этот файл используется для настройки PostCSS, который мы будем использовать для обработки наших файлов со стилями.

## Интеграция Tailwindcss с Hugo

Для того чтобы Tailwindcss заработал, нам нужно создать файл `assets/css/styles.scss` со следующим содержимым:

```scss
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  pre {
    @apply p-4 shadow-md bg-gray-100 my-6 rounded-md;
  }
}
```

В этом файле мы импортируем базовые стили, компоненты и утилиты Tailwindcss. Также здесь мы определяем все кастомные
стили для нашего сайта. В моем случае я определил стили для тега `pre` чтобы он выглядел как блок кода.

Теперь необходимо добавить следующий код в файл `layouts/partials/head.html`:

```html
{{ $styles := resources.Get "css/styles.scss" | toCSS | postCSS }}
{{ if .Site.IsServer }}
<link rel="stylesheet" href="{{ $styles.RelPermalink }}">
{{ else }}
{{ $styles := $styles | minify | fingerprint | resources.PostProcess }}
<link rel="preload" href="{{ $styles.RelPermalink }}" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript>
    <link rel="stylesheet" href="{{ $styles.RelPermalink }}" integrity="{{ $styles.Data.Integrity }}">
</noscript>
{{ end }}
```

Этот код загружает наши стили в HTML-файл, который будет использоваться во время разработки. В продакшн-версии стили
будут загружаться асинхронно. Также в продакшн-версии стили будут минифицированы и будет добавлен fingerprint. Это нужно
для того, чтобы браузеры не кэшировали старые версии стилей.

Теперь мы можем запустить Hugo и убедиться, что стили загружаются.

Я не буду описывать все классы, которые предоставляет Tailwindcss. Вместо этого вы можете посмотреть, как я использовал
их в моем [репозитории](https://github.com/andrewmolyuk/andrew.molyuk.com).

## Заключение

Tailwindcss - это отличный инструмент для создания пользовательских стилей. Он позволяет создавать стили, используя
только HTML-классы. Это упрощает создание пользовательских стилей и уменьшает количество CSS-кода. Также Tailwindcss
имеет большое сообщество и множество плагинов, которые можно использовать для расширения его функциональности. Я очень
рад использовать Tailwindcss для стилизации своего сайта и блога. Я надеюсь, что вам понравился этот пост и вы сможете
его использовать для стилизации своего сайта.

Если у вас есть какие-либо вопросы или предложения, пожалуйста, оставьте комментарий ниже. Спасибо за чтение!