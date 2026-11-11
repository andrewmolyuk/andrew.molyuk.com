# This repo is set up as any project is: its Git hooks in `.githooks/` run `hathi`

Date: 2026-11-11

## Decision

- The repo runs `hathi`. The `commit-msg`, `pre-commit` and `pre-push` hooks in `.githooks/` call
  `hathi check <hook>`, and `.hathi.yml` holds its settings: the Conventional Commits types in
  full, with every other Check on with its defaults.
- Secrets in commits are checked by hathi's `no-secrets-in-commits` Check, run from the
  `pre-commit` hook. The repo had no Git hooks or secret check of its own before.
- An earlier baloo left nothing in this clone, so the setup removed nothing.

## Consequences

Each clone turns the hooks on once with `git config core.hooksPath .githooks`.
