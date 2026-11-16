# andrew.molyuk.com: one page that tells who Andrew is, what he builds now, and how to reach him

## Problem

A hiring manager, recruiter or prospective consulting client who hears Andrew's name can't tell,
in the minute they give it, who he is, what he works on now, whether the experience behind it is
real, and how to start a conversation.

## Users

- Hiring managers and recruiters for architecture and AI engineering roles.
- Prospective consulting clients: architecture, systems that must stay up under load, AI
  adoption from first agents to a team that ships with them.
- Not for: developers looking for bunderlog's documentation, which lives on bunderlog.com and its
  GitHub; the page links there and stops.

## Success signal

Qualitative: messages about a role or consulting in the areas above arrive, mostly in Telegram,
and their authors mention the site. No baseline is measured; Cloudflare Web Analytics counts
visits, not contacts.

## Scope

- One page in English, in six sections in this order: Hero, Experience, Technical Focus, What I'm
  Building, Recommendations, Let's talk; a header with the `andrew@molyuk.com:~$` prompt, linking
  to each but Hero and offering Telegram, and a footer.
- A CV, made from the same data as the page, as a page of its own (`cv.html`) and a PDF the page
  links to.
- The page is in the built HTML itself, so a crawler that runs no JavaScript reads all of it.
- Hero: his photo, that he is open to roles and consulting, his name, a role line, his current
  job from the timeline as a fact, the roles he is looking for and where, Telegram as the main
  action and the CV beside it, four figures each tied to its source (one of them from his AI work),
  a sentence that says in plain words what bunderlog does, and beside the text a sample Claude Code
  session showing bunderlog at work, opened on its first steps.
- Experience: a career timeline of roles, team sizes and results, then How I Think About Systems:
  three principles, each tied to the role it came from.
- Technical Focus: AI Engineering at the core, the disciplines around it with their tools, listed
  beside the graph; only the discipline in focus opens its description.
- What I'm Building: bunderlog first as the current focus, with the measured result it has; then
  four more products in a grid, each in a sentence, with its stack and a figure where it has one,
  and the rest folded under "More projects". Each project's name leads to the live product, and a
  GitHub mark after it to its public repository.
- Recommendations: three from LinkedIn, quoted word for word, and a link to the rest.
- Let's talk: Telegram as the one main way in; the email address in full, to copy; LinkedIn,
  GitHub, WhatsApp and the CV as the rest; the local time in Israel in the footer.
- Sharing and discovery: title, description and image for link previews, a schema.org Person,
  `robots.txt`, `sitemap.xml` and `llms.txt`.
- The content itself (texts, figures, projects, roles, principles, handles) lives in the code; this
  PRD sets what the page must do with it, not what it says.

## Non-goals

- A blog, articles or case-study pages: one page only.
- Other languages (Russian, Hebrew) and a light theme.
- A contact form, a CMS or any back end: content changes in the code.
- Counting clicks on the contact links.
- Documentation for bunderlog or the other projects.
- A CV in any other format, or one that goes further back than the timeline: the roles before 2006
  are one line.

## Anti-goals

- The WhatsApp phone number sits in the page's HTML, scripts or styles in a form a scraper reads as
  a phone number.
- A figure (requests a second, events a day, money, percentages) stands with no company it can be
  checked against.
- The years in the field, the current role, or the length of the current role are out of date
  because nobody edited them.
- The first screen waits on fonts or scripts before it shows text.

## Acceptance criteria

### Page

- With JavaScript off, the built `index.html` shows the whole page: every section with its heading
  and text.
  → test: scripts/build.test.ts "holds every section and its heading without running JavaScript" (headings
  only)
- The sections come in the order Hero, Experience, Technical Focus, What I'm Building,
  Recommendations, Let's talk; the header's links Experience, Skills, Projects, Recommendations and
  Contact each lead to their section, and the one for the section in the middle of the screen is
  lit. On a phone the links sit behind a Menu button.
  → test: scripts/build.test.ts "puts the sections in order: Hero, Experience, Skills, Projects, Recommendations, Contact"
  → test: scripts/build.test.ts "links the header to every section"
- The header offers a Telegram button on every screen: "Message" with an icon, or the icon alone on a
  phone.
  → test: scripts/build.test.ts "offers Telegram in the header, on every screen"
- The header shows the `andrew@molyuk.com:~$` prompt at its left on every screen, linking to the
  email address; at 375, 820 and 1280 px its left and right edges line up with the sections'
  content.
  → test: scripts/build.test.ts "shows the prompt in the header, on every screen, linking to the email"
  (the prompt only, not the alignment)
- On a 1280×800 viewport, without scrolling, the page shows Andrew's photo, "Open to roles and
  consulting", the name, the role line "System Architect / Distributed Systems → AI Engineering",
  the current job and company, what he is looking for, and a "Message me on Telegram" button that
  opens Telegram in a new tab, ahead of a "CV (PDF)" button, and under them the four figures, each
  with its source, whole.
- On a 375 px wide viewport, every section fits the width: the page doesn't scroll sideways, and no
  card's content runs past its edge.
- On an 820 px wide viewport, the timeline and Let's talk stack into one column rather than squeeze
  four or two of them into it; the timeline's bars show from 1024 px.
- Every text color is at least 4.5:1 against every background it sits on (WCAG AA).
  → test: scripts/build.test.ts "meet WCAG AA, 4.5:1, on every background" (the color tokens, not their
  tints)
- No text is smaller than 12 px, except the captions under the decorative stickers in the Hero
  session and the labels inside the Technical Focus graph, which scale with it: screen readers skip
  the captions, and the list beside the graph repeats every label in readable text.
- With "reduce motion" set in the system, nothing on the page is still moving one second after it
  has loaded.

### Hero

- Each of the four figures shows its source under it: ~23B events/day and 100K req/s steady from
  Vidcrunch, 3M req/s peak from Screenz, both companies on the career timeline; 69 merged PRs from
  instrumenta, over 90 days. On a phone they sit two by two.
- The current job under the role line is the timeline's role with no end date, put as a fact from
  its summary ("Today at CGS Tower Networks: leading AI across the company, and the architect of
  its WebUI."), so it changes when the timeline does.
- "Looking for:" names the roles, the consulting and the location, the same words as the CV's.
- On every screen, the sample session shows its first four steps and a button that opens the rest,
  and opening it leaves the column beside it where it was. In the text, after the current job, one
  sentence says in plain words what bunderlog does, its name linking to bunderlog.com.
- With two columns, the closed session runs from the top of the name to the bottom of the figures.
- The Hero is as tall as its content, not the screen: on a tall screen, Experience shows under it.
- The role line breaks, when it must, before "→ AI Engineering", never inside it.

### Years and current role

- On the page, every count of years in the field equals the current year minus 1991; in the meta
  description, the link-preview tags and `llms.txt`, which change only with a build, it is a floor
  ("35+") that is still true.
  → test: src/lib/career.test.ts "counts from 1991" (covers the computed count only)
- The role with no end date shows its years as "<start>–now", and its bar on the timeline reaches
  the right edge, which is the current month.
  → test: src/lib/career.test.ts "shows a finished role as a range and the current one as running"
  → test: src/lib/career.test.ts "runs the current role to the right edge"
- Opened on a later date than its build, the page shows that date's years in the field, footer
  year and timeline, and the browser reports no hydration mismatch.
- The timeline is a calendar axis from the first role's start to the current month: each role's bar
  starts at its start date and is as wide as its length; roles are listed in order, and no two bars
  overlap.
  → test: src/lib/career.test.ts "sizes bars by time: eight years at Vidcrunch outweigh five at BestTV"
  (one pair only)
  → test: src/lib/career.test.ts "keeps roles in order without overlapping"

### Experience

- Under the timeline, How I Think About Systems sets out three principles; each names where it
  came from: a role on the timeline with its years, or "from all of it, 1991–now", and exactly one
  comes from the whole career.
  → test: src/lib/career.test.ts "each come from a real role, or from the whole career"
  → test: src/lib/career.test.ts "are found from their role and captioned with it" (one role's
  caption only)
- Pointing at a principle lights its row on the timeline, and pointing at a row lights its
  principle.

### Technical Focus

- Every discipline links only to the core. Pointing at a discipline, or tabbing to it, lights it
  and its line to the core, dims the other disciplines, and opens its description in the list,
  where every discipline's tools always show; pointing at the core lights every discipline and opens
  the core's description. The closed descriptions stay in the page's HTML.
  → test: src/lib/skillsGraph.test.ts "is on for the hovered node itself"
  → test: src/lib/skillsGraph.test.ts "hovering the central "ai" node highlights every other node too"
  → test: src/lib/skillsGraph.test.ts "dims nodes with no edge to the hovered node"
  → test: src/lib/skillsGraph.test.ts "the edge touching the hovered node lights up"
  (these cover the highlight for pointing only, not tabbing or the list)
- On a touch screen, a tap on a node lights it, and a second tap clears it.
- A screen reader reads each node as a button with its label and description.
  → test: src/lib/skillsGraph.test.ts "combines label and description for a regular skill" (one
  skill's label only)

### What I'm Building

- bunderlog is the first project card, and its measured result (how often Claude checks the
  project's rules, without and with louie) is set as a figure, as large as the Hero's.
- Four more projects follow in two columns on a wide screen and one on a phone; the rest sit under
  "More projects (n)", closed until clicked but in the page's HTML. Each card shows a one- or
  two-sentence description, its stack, and a figure only where the project has one; a status badge
  shows only when the status isn't "live".
  → test: scripts/build.test.ts "shows four projects after bunderlog and folds the rest under More projects"
- A project's name links to its live product, or links nowhere when it has none (instrumenta); a
  GitHub mark after it links to its repository when the repository is public, and is left out
  when it isn't (chainofsale, instrumenta).
  → test: scripts/build.test.ts "links each project name to its live site, and the GitHub mark after it to its public repository"
- Every link that leaves the site opens in a new tab with `rel="noopener noreferrer"`.
  → test: scripts/build.test.ts "opens every link that leaves the site in a new tab, with noopener noreferrer"
- Every link on the page answers with a page, not an error (checked by hand: it needs the network).

### Recommendations

- Three recommendations from Andrew's LinkedIn profile, quoted word for word with every cut marked
  "…", each signed with its author's name, how they worked with Andrew and at which company of the
  timeline, and the year it was written, with a link to the rest on LinkedIn.

### CV

- The CV lists every role of the timeline, newest first, with its title, team, years and result;
  the roles before 2006 in a line; the projects shown at once on the page; the skills; education;
  languages; and the same "Looking for" as the Hero. It is prerendered like the page.
  → test: scripts/build.test.ts "lists every role on the timeline, prerendered like the page"
- Each project on the CV shows its address as a link, without "https://": its live site, or its
  public repository when it has none; a project with neither shows no address (instrumenta).
  → test: scripts/build.test.ts "gives each project its address as a link: the live site, or the repository when it has none"
- The PDF the page links to is printed from the CV as it is now: a CV that changed since fails the
  build test until `mise run cv` prints it again.
  → test: scripts/build.test.ts "ships a PDF printed from this very CV; after a change, `mise run cv` prints it again"

### Let's talk

- Telegram is the one contact set as a card, and the card carries an outlined "Message me" button,
  lighter than the header's filled one; under it, the email address in full with a button that
  copies it; then LinkedIn, GitHub, WhatsApp and the CV as plain links in one group, which may wrap.
- No file in the built site contains the WhatsApp number's digits in order, whether together or
  separated only by spaces, dashes, dots or brackets, with or without the country code. The number
  is deliberately not written here; the test takes it from the source.
  → test: scripts/build.test.ts "appears in no built file, together or split by spaces, dashes, dots or brackets"
- Clicking "whatsapp" opens `wa.me/<the number>` in a new tab.
- The footer shows the current time in Israel with its UTC offset ("UTC+2"), and it is never more
  than a minute behind.
- The footer links to the site's repository with the plain word "source", no arrow, styled like
  the links in Let's talk; it doesn't name the site's stack.
  → test: scripts/build.test.ts "links the footer to the source, without naming the stack" (not the
  styling)

### Sharing and speed

- The built `index.html` has a title, a meta description, Open Graph and Twitter tags whose image
  is a 1200×630 PNG (and `og:image:width` and `og:image:height` say so), a canonical URL, and a
  schema.org Person whose `sameAs` lists GitHub, LinkedIn and Telegram.
  → test: scripts/build.test.ts "has a title, description, canonical URL and link-preview tags with a 1200×630 image"
  → test: scripts/build.test.ts "describes Andrew as a schema.org Person linked to his profiles"
- The link-preview image is the Hero as a 1200×630 card, made from the same data: the photo, that
  he is open to roles and consulting, the name, the role line, what bunderlog does and the four
  figures with their sources. A card that changed since its picture was taken fails the build test
  until `mise run og` takes it again.
  → test: scripts/build.test.ts "ships a link-preview image taken of this very card; after a change, `mise run og` takes it again"
- `robots.txt` allows every crawler and names `sitemap.xml`, which lists `https://andrew.molyuk.com/`.
  → test: scripts/build.test.ts "lets every crawler in and points it to the sitemap of the one page"
- `llms.txt` links to every section the header links to, and to the same profiles as the Person.
  → test: scripts/build.test.ts "lists every section and profile in llms.txt"
- Text is visible in a fallback font before the web fonts load (`font-display: swap`), and
  Lighthouse's mobile preset against https://andrew.molyuk.com/ puts Largest Contentful Paint at
  2.5 s or less, the median of three runs.
