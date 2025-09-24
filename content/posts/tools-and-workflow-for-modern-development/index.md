---
  title: 'Tools and Workflow for Modern Development'
  description: 'A comprehensive toolchain for modern development workflows, focusing on automation, code quality, and streamlined releases.'
  date: 2025-09-24T22:39:10+03:00
  image: 'index.png'
  tags: ['github', 'release', 'tools', 'best practices']
  draft: false
---

This article explores the comprehensive toolchain that powers modern development workflows, focusing on automation, code quality, and streamlined releases. These tools form an integrated ecosystem that handles everything from initial project setup to production deployment and ongoing maintenance.

Across most of my projects, this standardized approach ensures consistency, reduces manual overhead, and maintains high code quality standards. The workflow has been refined through practical experience with various project types, from small utilities to complex monorepos.

## Project Setup & Package Management

### Bun

**[Bun](https://bun.sh/)** serves as the primary package manager for JavaScript and TypeScript projects, offering superior performance and efficient dependency handling compared to traditional alternatives.

It is recommended to use Bun for all JavaScript/TypeScript projects due to its speed and efficiency. The note about keeping the `bun.lock` file in version control ensures consistent dependency versions across different environments. Bun is incredibly fast and can significantly reduce install times compared to npm or yarn.

### TurboRepo

**[TurboRepo](https://turbo.build/)** manages monorepos effectively, enabling multiple packages to be developed, tested, and deployed together while maintaining clear boundaries and shared configurations.

Monorepos are not always necessary, especially for small projects. However, I prefer to start with a monorepo structure even for single-package projects to allow for easy expansion in the future without major restructuring.

Here is an example of a basic TurboRepo configuration in a `turbo.json` file:

```json
{
  "$schema": "https://turborepo.com/schema.json",
  "tasks": {
    "lint": {},
    "test": {},
    "dev": { "cache": false, "persistent": true },
    "update": { "cache": false }
  }
}
```

### Makefile

**[Makefile](https://www.gnu.org/software/make/)** provides a unified interface for project tasks including building, testing, and releasing. This approach creates consistency across different project types and simplifies onboarding for new team members.

There a lot of commands you can add to the Makefile, but here are the most common ones I usually include:

```Makefile
.PHONY: install lint test build update next
SHELL := /bin/bash
DEFAULT_GOAL := build

install:
	bun install

lint: install
	bunx eslint . --ext .ts,.json,.md --fix
	bunx prettier --write "**/*.md" "**/*.json" "**/*.ts" --log-level warn
	bunx tsc --noEmit

test: lint
	CI=CI bunx vitest --coverage

build: test
	rm -Rf dist
	bunx tsc --build

update:
	bunx npm-check-updates -u
	bun install

next:
	git pull origin main
	git checkout main
	git merge next
	git push -u origin main
```

## Code Quality & Consistency

### Prettier

**[Prettier](https://prettier.io/)** handles automatic code formatting across all files, ensuring visual consistency regardless of individual developer preferences or editor configurations.

It's a recommended practice to integrate Prettier with your code editor to enable automatic formatting on file save. This helps maintain a consistent code style throughout the development process.

The Prettier configuration is stored in a `.prettierrc` file at the root of the repository. Here is an example configuration:

```json
{
  "$schema": "https://json.schemastore.org/prettierrc",
  "semi": false,
  "singleQuote": true,
  "printWidth": 140,
  "overrides": [{ "files": ".*rc", "options": { "parser": "json" } }]
}
```

### ESLint

**[ESLint](https://eslint.org/)** with specialized plugins for JSON and Markdown maintains code quality standards while catching potential issues during development rather than in production.

Here is an example of an ESLint configuration in a `.eslintrc.config.mts` file:

```ts
// @ts-check
import eslint from '@eslint/js'
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended'
import * as tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import markdownPlugin from 'eslint-plugin-markdown'
import jsoncPlugin from 'eslint-plugin-jsonc'

export default [
  // Ignore built files and dependencies
  { ignores: ['dist/**', 'coverage/**', 'node_modules/**'] },

  // Prettier plugin configuration
  prettierPluginRecommended,

  // Base recommended configuration
  eslint.configs.recommended,

  // TypeScript ESLint plugin configuration
  {
    files: ['**/*.ts'],
    plugins: { '@typescript-eslint': tsPlugin },
    // merge rules from both presets (fall back to empty objects)
    rules: {
      ...(tsPlugin.configs.strict && tsPlugin.configs.strict.rules ? tsPlugin.configs.strict.rules : {}),
      ...(tsPlugin.configs.stylistic && tsPlugin.configs.stylistic.rules ? tsPlugin.configs.stylistic.rules : {}),
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        process: 'readonly',
        global: 'readonly',
        __dirname: 'readonly',
        Buffer: 'readonly',
        structuredClone: 'readonly',
      },
    },
  },

  // Markdown files: run ESLint over fenced code blocks
  {
    files: ['**/*.md', '**/*.md/*'],
    plugins: { markdown: markdownPlugin },
    processor: 'markdown/markdown',
  },

  // JSONC plugin - lint JSON files
  ...jsoncPlugin.configs['flat/recommended-with-jsonc'],
]
```

### Husky

**[Husky](https://typicode.github.io/husky/#/)** manages Git hooks to enforce quality gates, ensuring that commit messages follow established conventions and code passes basic checks before being committed.

Husky is configured to run Commitlint on `commit-msg` hook to validate commit messages before they are created. This prevents invalid commit messages from being added to the repository.

### Commitlint

**[Commitlint](https://commitlint.js.org/)** automatically validates commit message format, supporting the semantic release process by enforcing conventional commit standards.

Here is an example of a Commitlint configuration in a `.commitlintrc` file:

```json
{
  "extends": ["@commitlint/config-conventional"],
  "rules": {
    "type-enum": [2, "always", ["feat", "fix", "docs", "style", "refactor", "perf", "test", "chore", "revert", "build", "ci"]],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "scope-case": [2, "always", "lower-case"],
    "subject-case": [2, "never", ["sentence-case", "start-case", "pascal-case", "upper-case"]],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "header-max-length": [2, "always", 140],
    "body-leading-blank": [1, "always"],
    "body-max-line-length": [2, "always", 140],
    "footer-leading-blank": [1, "always"],
    "footer-max-line-length": [2, "always", 140]
  }
}
```

## Git Workflow & Branch Management

### GitHub Flow

The **[GitHub Flow](https://guides.github.com/introduction/flow/)** provides a straightforward, branch-based workflow that balances simplicity with robust change management practices.

Nothing to add here, just read the official documentation if you are not familiar with it.

## Commit Message Conventions

**[Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)** structure commit messages in a standardized format, enabling automated tooling to understand changes and make intelligent decisions about version bumps and release notes.

### Next Branch

A dedicated **next** branch serves as a staging environment for integration testing before changes reach the main branch, allowing for final validation in a production-like environment.

There are nothing special about the `next` branch. It is just a regular branch that I use for integration testing before merging into `main`. You can name it differently or even skip it if your project is simple enough.

Usually, I create the `next` branch from `main` and when a few features or fixes are tested and verified in `next`, I open a pull request to merge `next` into `main`. This way, `main` always has stable and production-ready code.

### Branch Protection Rules

**[Branch protection rules](https://docs.github.com/en/github/administering-a-repository/about-protected-branches)** in GitHub ensure all changes undergo proper review and testing before integration, maintaining code quality and reducing the risk of introducing bugs.

There are many options you can enable in the branch protection rules, but at the very least, I usually require:

- Restrict deletions
- Require linear history
- Require signed commits
- Require a pull request before merging
- Require status checks to pass and add [Codacy Static Code Analysis](https://blog.codacy.com/static-code-analysis) as status check that is required
- Block force pushes
- Require code scanning results and add [CodeQL](https://codeql.github.com/) as status check that is required

CodeQL requires additional setup in the repository's Advanced Security settings, otherwise it won't work. So don't forget to configure it.

In the general settings of the repository, I also enable the following options:

- Enable release immutability
- Allow rebase merging and disable squash merging and merge commits
- Automatically delete head branches
- Auto-close issues with merged linked pull requests

Of course you can adjust these settings based on your team's workflow and preferences.

## Testing & Quality Assurance

### Unit Tests & Coverage Reports

**Coverage reports** provide visibility into test comprehensiveness, helping identify areas that need additional testing attention.

You are free to use any testing framework you prefer, such as [Jest](https://jestjs.io/) or [Mocha](https://mochajs.org/), but I often use [vitest](https://vitest.dev/) for its speed and simplicity, especially in projects using Bun.

After running tests, I generate coverage reports in `lcov` format using `vitest` and upload them to Codacy for analysis.

I hold test files in the separate `tests` directory at the root of the repository and usually ignore them in the Codacy analysis to focus on production code quality.

Here is my usual vitest configuration in the `vite.config.ts` file:

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: ['node_modules', 'dist', 'example', 'scripts'],
    coverage: {
      reporter: ['lcovonly', 'text'],
      include: ['src/**/*.ts'],
      exclude: ['**/types.ts'],
      all: true,
    },
  },
})
```

### Codacy Static Code Analysis

**[Codacy](https://www.codacy.com/)** offers continuous code quality and security analysis, providing automated feedback on code health and potential vulnerabilities.

So you are welcome to open a free account on Codacy and connect your GitHub repository to get automated code reviews and maintain high standards.

Here is an example of a Codacy configuration in a `.codacy.yml` file:

```yaml
engines:
  duplication:
    enabled: true
    exclude_paths:
      - 'tests/**'
  metric:
    enabled: true
    exclude_paths:
      - 'tests/**'
```

### Test Github Actions

**[GitHub Actions](https://docs.github.com/en/actions)** test workflows execute automatically on pull requests and branch pushes, running the complete test suite defined in the project's Makefile to catch issues early.

Here is an example of a GitHub Actions workflow for tests defined in `.github/workflows/test.yml`:

```yaml
name: Test

on:
  push:
    branches: [next]
  pull_request:
    types: [opened, synchronize, reopened]

permissions:
  contents: read

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
        with:
          fetch-depth: 0

      - name: Validate commit messages
        uses: wagoid/commitlint-github-action@v6
        with:
          configFile: .commitlintrc

      - uses: actions/setup-node@v5
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: 'bun.lock'
          registry-url: 'https://registry.npmjs.org/'

      - uses: oven-sh/setup-bun@v2.0.2

      - run: make test

      - uses: codacy/codacy-coverage-reporter-action@v1.3.0
        with:
          project-token: ${{ secrets.CODACY_PROJECT_TOKEN }}
          coverage-reports: coverage/lcov.info
```

## Release Automation & Deployment

### Semantic Release

**[Semantic Release](https://semantic-release.gitbook.io/semantic-release/)** automates the entire release process by analyzing commit messages to determine appropriate version bumps (major, minor, patch) and generating comprehensive release notes automatically.

I don't hold the CHANGELOG.md file in the repository. Instead, I rely on the release notes generated by semantic-release and published. Here is an example of Semantic Release configuration in a `.releaserc` file:

```json
{
  "branches": ["main"],
  "plugins": [
    ["@semantic-release/commit-analyzer", { "preset": "conventionalcommits" }],
    ["@semantic-release/release-notes-generator", { "preset": "conventionalcommits" }],
    "@semantic-release/git",
    "@semantic-release/github",
    "@semantic-release/npm"
  ]
}
```

### Release Github Actions

**[GitHub Actions](https://docs.github.com/en/actions)** release workflows trigger on main branch updates, executing the semantic-release process to publish new versions without manual intervention.

Here's an example of a GitHub Actions workflow for releases defined in `.github/workflows/release.yml`:

```yaml
name: Release

on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      issues: write
      pull-requests: write
      id-token: write
    steps:
      - uses: actions/checkout@v5
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v5
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: 'bun.lock'
          registry-url: 'https://registry.npmjs.org/'

      - uses: oven-sh/setup-bun@v2.0.2

      - run: make build

      - run: bunx semantic-release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}

      - uses: codacy/codacy-coverage-reporter-action@v1.3.0
        with:
          project-token: ${{ secrets.CODACY_PROJECT_TOKEN }}
          coverage-reports: coverage/lcov.info
```

## Maintenance & Dependencies

### Dependabot

**[Dependabot](https://github.com/dependabot)** maintains project health by automatically creating pull requests for dependency updates, ensuring projects stay current with security patches and feature improvements.

Here's an example configuration for Dependabot in a `.github/dependabot.yml` file:

```yaml
version: 2
updates:
  # Enable version updates for npm
  - package-ecosystem: 'npm'
    directory: '/'
    schedule:
      interval: 'weekly'
    open-pull-requests-limit: 5

  # Enable version updates for GitHub Actions
  - package-ecosystem: 'github-actions'
    directory: '/'
    schedule:
      interval: 'weekly'
    open-pull-requests-limit: 5
```

## Conclusion

This toolchain provides a robust framework for managing modern software development projects, emphasizing automation, code quality, and streamlined workflows. By adopting these tools and practices, teams can enhance productivity, reduce errors, and maintain high standards throughout the development lifecycle.

Feel free to adapt and customize this setup to fit your specific project needs and team preferences.
