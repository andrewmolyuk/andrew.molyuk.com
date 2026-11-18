// The products shown under What I'm Building, after bunderlog.

/** bunderlog's own site and GitHub organization, which the Hero and the first project card link to,
 *  and what it does in plain words, for the Hero and the link-preview card. */
export const BUNDERLOG = {
  site: 'https://bunderlog.com',
  github: 'https://github.com/bunderlog',
  what: 'Claude Code sessions that know what the project decided and check every change against it',
  /** Its measured result, for the first project card and the CV: in how many sessions of three weeks'
   *  real use Claude checked the project's rules before writing code, on its own and with louie. */
  rulesChecked: { alone: { checked: 5, of: 79 }, withLouie: { checked: 15, of: 22 } },
}

/** A share of sessions as a whole percentage: 5 of 79 is "6%". */
export function percent({ checked, of }: { checked: number; of: number }): string {
  return `${Math.round((checked / of) * 100)}%`
}

export interface Project {
  title: string
  icon: string
  /** Shown only when it isn't live, which all the rest are. */
  status?: string
  site?: string
  github?: string
  desc: string
  /** A figure the project has, if any. */
  fact?: string
  tags: string[]
}

/** The products after bunderlog; the first FEATURED_COUNT show at once, the rest behind "More projects". */
export const PROJECTS: Project[] = [
  {
    title: 'instrumenta',
    icon: '/projects/instrumenta.svg',
    status: 'in internal production', // no live site, and its repository is private
    desc: 'Agent pipeline that takes a Jira ticket to an open pull request, unattended, at the company I work for.',
    fact: '149 tickets → 122 merged PRs in 90 days · 95% never failed QA',
    tags: ['Claude Code', 'Workflows', 'Subagents', 'Playwright', 'Jira', 'Bitbucket'],
  },
  {
    title: 'chainofsale',
    icon: '/projects/chainofsale.svg',
    site: 'https://chainofsale.com', // its repository is private
    desc: 'Supply-chain check for ad systems: each seller the publisher doesn’t confirm, with the exact ads.txt line that fixes it.',
    fact: '1,700+ ad systems ranked by chain health',
    tags: ['Go', 'PostgreSQL', 'Vue 3', 'Tailwind CSS', 'Kamal', 'Cloudflare Workers'],
  },
  {
    title: 'servienta',
    icon: '/projects/servienta.svg',
    site: 'https://servienta.com',
    github: 'https://github.com/servienta/servienta',
    desc: 'Every endpoint an application talks to, in one container: readable from automated tests and reset between runs.',
    fact: '8 protocols · a 5-transport file server',
    tags: ['Go', 'Docker', 'Vue 3', 'Hono', 'Cloudflare Workers', 'Cloudflare D1'],
  },
  {
    title: 'checkmeup',
    icon: '/projects/checkmeup.svg',
    site: 'https://checkmeup.net',
    github: 'https://github.com/checkmeup/checkmeup',
    desc: 'Cron, uptime, SSL, domain and port monitors with Telegram, Slack and SMS alerts, and white-label status pages.',
    tags: ['Go', 'Chi', 'sqlc', 'PostgreSQL', 'Vue 3', 'Kamal'],
  },
  {
    title: 'clockcover',
    icon: '/projects/clockcover.svg',
    site: 'https://clockcover.com',
    github: 'https://github.com/clockcover/clockcover',
    desc: 'Finds missed time-clock entries and routes them to the right manager before they pile up at month-end.',
    tags: ['Hono', 'Cloudflare Workers', 'Drizzle', 'D1', 'Vue 3', 'Tailwind CSS'],
  },
  {
    title: 'staffcomplete',
    icon: '/projects/staffcomplete.svg',
    site: 'https://staffcomplete.io',
    github: 'https://github.com/staff-complete/staffcomplete',
    desc: 'Onboarding, role changes and offboarding across a company’s systems, each event queued, dispatched and audited.',
    tags: ['Hono', 'tRPC', 'Drizzle', 'PostgreSQL RLS', 'pg-boss', 'Vue 3'],
  },
  {
    title: 'pass.molyuk.com',
    icon: '/projects/pass-molyuk.svg',
    site: 'https://pass.molyuk.com',
    github: 'https://github.com/andrewmolyuk/pass.molyuk.com',
    desc: 'One-time links to a secret encrypted in the browser: the server never sees the secret, the key or the PIN.',
    tags: ['TypeScript', 'Web Crypto', 'Cloudflare Workers', 'Cloudflare D1'],
  },
  {
    title: 'tools.molyuk.com',
    icon: '/projects/tools-molyuk.svg',
    site: 'https://tools.molyuk.com',
    github: 'https://github.com/andrewmolyuk/tools.molyuk.com',
    desc: 'Everyday developer tools in one place: IDs, hashes, JWT and X.509, regex, cron, CIDR, TOTP, diff and more.',
    fact: '36 tools, nearly all running in the browser',
    tags: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'vue-i18n', 'Cloudflare Workers'],
  },
]

export const FEATURED_COUNT = 4
