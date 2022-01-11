---
title: "Миграция на Hugo"
date: 2022-01-09T13:50:10+02:00 

tags: ["Hugo"]
---

Неожиданным образом на меня обрушилась корона и появилось время заняться интересующими меня в последнее
время [Go](https://go.dev/) и [Hugo](https://gohugo.io/). Поэтому сегодня я решил таки окончательно разобраться с
миграцией вебсайта страницы с [React](https://reactjs.org/) на [Hugo](https://gohugo.io/) и дополнением его блогом.

<!--more-->

Из материалов использованных при переходе оказались полезными к прочтению:

- [Creating a Hugo Theme From Scratch](https://retrolog.io/blog/creating-a-hugo-theme-from-scratch/)
- [Hugo Markdown Support](https://www.markdownguide.org/tools/hugo/)
- [Hugo Documentation](https://gohugo.io/documentation/)
- [Syntax Highlighting](https://gohugo.io/content-management/syntax-highlighting/)

В процессе добавлю некоторые замечания/конфигурации, которые были не прозрачны, по крайней мере, с самого начала.

Если нет необходимости в категоризации контента (пока) - отключаем категории и оставляем только таги в `config.toml`

```toml
[taxonomies]
    tag = "tags"
```

С подсветкой активной страницы пришлось поприседать, пока не стало понятно, что этот механизм не работает на одиночных
страницах. Варианты решения - самостоятельная реализация проверки

```go
{{ range.Site.Menus.main }}

{{ $IsMenuActive := or (and (eq .URL "/") ($currentPage.IsHome))
    (and (not (eq .URL "/")) (hasPrefix $currentPage.RelPermalink .URL)) }}

<li><a href = "{{ .URL }}" class = "{{ if $IsMenuActive }} active {{end}}">
```

Чтобы показать упорядоченный контент для заглавной страницы, создаем контент в папке `info` a в темплейте заглавной
страницы делаем следующее

```go
{{ range (where (where.Site.Pages "Section" "info") "Kind" "page").ByParam "weight" }}
```

а также исключаем эти страницы от показа через Front Matter

```yaml
headless: true
```

и запрещаем листинг в `_index.md` в папке `info`

```yaml
_build:
  render: false
  list: never
```

фильтруем страницы в sitemap.xml темплейте, чтобы этот контент туда не попадал

```go
{{ range where.Data.Pages "Section" "ne" "info"}}
```

Для того чтобы переименовать RSS файл добавляем в конфигурацию следующее

```toml
[outputFormats]
  [outputFormats.RSS]
    mediatype = "application/rss"
    baseName = "rss"
```

А чтобы сделать RSS рабочим только для корневой папки на сайте правим `config.toml`

```toml
[outputs]
    page = ["HTML"]
    home = ["HTML", "RSS"]
    section = ["HTML"]
    taxonomyTerm = ["HTML"]
    taxonomy = ["HTML"]
```

В RSS решил включать только блоговые странички, правим оригинальный темплейт и фильтруем по типу секции

```go
{{- $pages = where $pctx.RegularPages "Section" "blog" -}}
```

В целом переход оказался безболезненным и быстрым. После понимания основных концепций и их их реализации никаких
проблем не возникало. Буду ли я рекомендовать [Hugo](https://gohugo.io/) всем - однозначно нет. Для работы с
генератором необходим техническкий бэкграунд, но с таковым он становится очень мощным и гибким инструментом для 
управления статическим сайтом.