---
title: "Миграция на Hugo"
date: 2022-01-09T13:50:10+02:00 
draft: false 
tags: ["Hugo"]
---

Неожиданным образом на меня обрушилась корона и появилось время заняться интересующими меня в последнее время [Go](https://go.dev/) и [Hugo](https://gohugo.io/). Поэтому сегодня я решил таки окончательно разобраться с
миграцией вебсайта страницы с [React](https://reactjs.org/) на [Hugo](https://gohugo.io/) и дополнением его блогом.

<!--more-->

Из материалов использованных при переходе оказались полезными к прочтению:

- [Creating a Hugo Theme From Scratch](https://retrolog.io/blog/creating-a-hugo-theme-from-scratch/)
- [Hugo Markdown Support](https://www.markdownguide.org/tools/hugo/)
- [Hugo Documentation](https://gohugo.io/documentation/)
- [Syntax Highlighting](https://gohugo.io/content-management/syntax-highlighting/)

В процессе добавлю некоторые замечания/конфигурации, которые были не прозрачны, по крайней мере, с самого начала.

- Отключаем категории и оставляем только таги в config.toml

```toml
[taxonomies]
    tag = "tags"
```
