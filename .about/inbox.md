# Inbox

## Raw colors left in components

2026-11-15 · louie:verify

`src/components/ExperienceSection.vue` still uses `text-[#5a5a68]` and `bg-[#5a5a68]` for the "35
years" line, and `ContactSection.vue` uses `group-hover:text-white` on the Telegram line, where the
Tailwind Guideline wants theme tokens. Settled by a token for that grey (or `faint` if it reads the
same) and `text-heading` for the hover, checked by eye on the timeline and the card.

## Links to the recommendation authors' profiles

2026-11-15 · UI/UX review

Each recommendation's author name could link to their LinkedIn profile, so a reader can check who
wrote it. Settled by the three profile URLs from Andrew, or a decision not to link them.
