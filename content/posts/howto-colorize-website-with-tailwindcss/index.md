---
title: 'Howto Colorize Website With Tailwindcss'
date: 2023-05-12T16:55:27+03:00
draft: false
tags: ['hugo', 'tailwindcss']
params:
  image: 'index.png'
---

Always dealing with the server and architectural components of web applications, it was always difficult for me to create
custom styles. Therefore, when I decided to tackle styles on my own blog, I decided to use Tailwindcss.
Tailwindcss is a CSS framework that allows you to create custom styles using only HTML classes. It
provides a set of classes that can be used to create custom styles.

In this post, I will tell you how I used Tailwindcss to style my website and blog.

<!--more-->

## Install Tailwindcss

To start, you need to initialize npm and install Tailwindcss:

```shell
npm init -y
npm install --save-exact tailwindcss postcss autoprefixer postcss-cli
```

I didn't use dev dependencies because we don't need to build the website using npm and we don't need to separate our
code for development and production. For this, we will continue to use Hugo.

Now let's initialize Tailwindcss:

```shell
npx tailwindcss init
```

This will create a file `tailwind.config.js` in the root of our project. In this file, we can configure Tailwindcss.
Let's edit it to look like the following:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./content/**/*.html', './layouts/**/*.html'],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: 'class',
};
```

Here we specify to Tailwindcss where it can find our HTML files. We also specify that we want to use a dark theme based
on class.

Now let's create a file `postcss.config.js` in the root of our project:

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

This file is used to configure PostCSS, which we will use to process our style files.

## Integrating Tailwindcss with Hugo

To make Tailwindcss work, we need to create a file assets/css/styles.scss with the following content:

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

In this file, we import the base styles, components, and utilities of Tailwindcss. We also define all the custom styles
for our website. In my case, I defined styles for the `pre` tag to make it look like a code block.

Now we need to add the following code to the `layouts/partials/head.html` file:

```html
{{ $styles := resources.Get "css/styles.scss" | toCSS | postCSS }} {{ if .Site.IsServer }}
<link rel="stylesheet" href="{{ $styles.RelPermalink }}" />
{{ else }} {{ $styles := $styles | minify | fingerprint | resources.PostProcess }}
<link rel="preload" href="{{ $styles.RelPermalink }}" as="style" onload="this.onload=null;this.rel='stylesheet'" />
<noscript>
  <link rel="stylesheet" href="{{ $styles.RelPermalink }}" integrity="{{ $styles.Data.Integrity }}" />
</noscript>
{{ end }}
```

This code loads our styles into the HTML file that will be used during development. In the production version, the
styles will be loaded asynchronously. Additionally, in the production version, the styles will be minified and a
fingerprint will be added. This is done to prevent browsers from caching old versions of the styles.

Now we can run Hugo and make sure the styles are being loaded.

I won't describe all the classes provided by Tailwindcss. Instead, you can see how I used them in my
[repository](https://github.com/andrewmolyuk/andrew.molyuk.com).

## Conclusion

Tailwindcss is a great tool for creating custom styles. It allows you to create styles using only HTML classes. This
simplifies the process of creating custom styles and reduces the amount of CSS code. Tailwindcss also has a large
community and many plugins that can be used to extend its functionality. I'm very happy to use Tailwindcss to style my
website and blog. I hope you enjoyed this post and that you can use it to style your own website.

If you have any questions or suggestions, please let me know. Thank you for reading!
