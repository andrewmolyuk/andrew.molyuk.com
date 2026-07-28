---
title: 'I Built Checkmeup So I Would Never Again Hear About My Own Outage From a Customer'
date: 2026-07-28T12:00:00+03:00
tags: ['monitoring', 'uptime', 'devops', 'checkmeup', 'side project', 'saas']
draft: false
image: 'index.png'
---

A while ago one of my production systems went down quietly. No crash logs, no alert, nothing dramatic — a cronjob just stopped firing and an endpoint started failing checks that nobody was running. I only found out when a customer emailed asking why things looked broken. By then it had been down for hours. That's the moment "it's probably fine" stops being an acceptable monitoring strategy, and the moment I decided to build the tool I actually wanted instead of settling for a half-fit off-the-shelf dashboard.

That tool is [Checkmeup](https://checkmeup.net/), and it's now running in production, watching my own projects. This post is both the origin story and a full walkthrough of what it does.

<!--more-->

## Why I Built It Instead of Just Picking a Tool

When you're a solo developer or a small team juggling several client projects, you don't have an on-call rotation or a dedicated SRE staring at dashboards. You have your own attention, split across everything you're supposed to be building. Things fail silently: a scheduled backup job dies, an SSL certificate quietly expires, a background worker stops picking up jobs. None of that shows up as a 500 error — it just shows up as "why didn't this work" a few days later, usually reported by someone else first.

I looked at the existing monitoring tools and kept running into the same mismatch: either they were built for large teams with per-seat pricing and enterprise sales calls, or they did one thing (just uptime, or just cron pings) and left me stitching together two or three subscriptions to cover everything I actually needed. What I wanted was one place that watched HTTP endpoints, cron jobs, SSL certs, domain expiry, and raw TCP ports, alerted me wherever I already look (Telegram, Slack, email, SMS), and gave me a status page to point clients at instead of a Slack thread. So I wrote it.

## What Checkmeup Actually Monitors

Checkmeup covers five monitor types, and they're deliberately the five failure modes that actually take down small production systems:

### Cron and heartbeat monitoring

This is the one that would have caught my original outage. Instead of Checkmeup polling you, your job pings Checkmeup when it finishes:

```bash
curl -s https://checkmeup.net/ping/<your-monitor-token>
```

You can attach custom metadata to the ping — build number, exit state, row counts, whatever helps you debug later — up to 20 key/value pairs:

```bash
curl -s "https://checkmeup.net/ping/<token>?build=142&state=success"
```

If the ping doesn't arrive within its configured grace period (anywhere from 1 minute to 1 hour), you get alerted. It works against schedule presets or a full custom cron expression, and every run is logged so you can see execution history instead of just a current status dot.

### Uptime monitoring

Standard HTTP/HTTPS checks, down to a 1-minute interval on paid plans (5, 10, or 30 minutes on the free tier). You choose the method (GET, HEAD, POST), which status codes count as healthy, and a timeout between 1 and 30 seconds. Response times get tracked over time, which turns out to be its own early-warning signal — a slow endpoint today is often a dead one tomorrow.

Two features I leaned on more than I expected, both available even on the free plan:

- **Keyword monitoring** — search the response body for a required or forbidden string, so "the page returned 200 but the body says 'Internal Error'" doesn't slip through.
- **JSON assertions** — assert on a specific field in a JSON response, e.g. `$.status` equals `ok`, with comparators like equals, not-equals, contains, greater-than, and less-than. Useful for health-check endpoints that return a body instead of just a status code.

### SSL certificate expiry monitoring

Daily checks against port 443, with warnings at 30, 14, and 7 days before expiry, plus an immediate alert if a check fails outright. Forgetting to renew a cert is one of those incidents that's entirely preventable and entirely embarrassing when it isn't prevented.

### Domain expiry monitoring

Same threshold structure (30/14/7 days), but tracked independently of the SSL cert, because a domain lapsing is a different (and worse) failure mode than a certificate lapsing, and I wanted them alerted on separately.

### TCP port monitoring

Raw socket checks for anything that doesn't speak HTTP — mail servers, databases, message queues. It supports two modes: "open" (this port should be reachable — classic uptime) and "closed" (this port should *not* be reachable — a lightweight security check for services that shouldn't be publicly exposed).

## Getting Alerted Where You Already Look

A monitor that fails silently into an unread dashboard is not meaningfully different from no monitor at all, so alerting channels got as much attention as the checks themselves:

- **Telegram** — message `@checkmeupnet_bot`, send `/start`, paste your Chat ID into Settings → Notification channels. Configurable alert caps (default 3 per incident) stop a flapping check from paging you fifty times.
- **Slack** — create an Incoming Webhook under Apps → Incoming Webhooks in your workspace, drop the URL into Checkmeup, done.
- **Email** — supports shared inboxes, with a test-send before you save so you're not discovering a typo during an actual incident.
- **SMS** — E.164-formatted numbers on paid plans, with monthly credits included and an explicit consent checkbox.
- **Webhooks** — a generic HTTPS endpoint if you want to wire alerts into something custom (PagerDuty, a status bot, your own incident tooling). Every payload is signed:

```json
{
  "eventType": "down",
  "monitorName": "api.example.com",
  "monitorType": "uptime",
  "reason": "HTTP 503",
  "timestamp": "2026-07-10T14:32:00Z"
}
```

Verify it with the `X-Checkmeup-Signature` header, an HMAC-SHA256 hex digest of the payload, before you trust it.

## Status Pages and Incident Management

The other piece I didn't think I needed until I had it: branded, public status pages built directly on top of the same monitors, no separate tool required. Visitors see live status and 90 days of incident history with nothing to log in to and nothing to install. Embeddable status badges let you drop live status into a README or client wiki.

When something does go wrong, I can declare an incident with a severity level (Minor, Major, Critical) and walk it through investigation states as I work the problem, independent of the raw monitor status — which means I control the narrative on the status page instead of it just flipping between green and red with no context.

**Maintenance windows** suspend checks for selected monitors, scheduled ahead of time or started immediately, so planned work doesn't trigger false alerts or tank your uptime stats.

## A Public API for Everything

There's a read-only public API if you want to pull monitor status into your own tooling instead of (or alongside) the dashboard:

```bash
curl -H "X-API-Key: cmu_live_..." \
  https://checkmeup.net/api/v1/public/monitors/cron/<monitor-id>/status
```

which returns something like:

```json
{
  "id": "5e2b...",
  "name": "Nightly export",
  "type": "cron",
  "status": "up",
  "lastCheckedAt": "2026-07-03T20:33:47Z",
  "lastPingMetadata": { "build": "142", "state": "success" }
}
```

Swap `cron` for `uptime`, `ssl`, `domain`, or `port` for the other monitor types. It's rate-limited to 60 requests/minute, which is plenty for pulling status into an internal dashboard or a build pipeline gate.

## Pricing: Start Free, Pay Only When You Grow

I built this to scale with how much you're actually running, not to punish you for having more than one teammate:

| Plan | Cost | Monitors | Check Interval | Status Pages | Notification Channels | SMS Credits/mo |
| --- | --- | --- | --- | --- | --- | --- |
| Hobby | Free | 10 | 5 min | 1 | 5 | — |
| Solo | $9/mo | 30 | 1 min | 3 | 20 | 10 |
| Startup | $29/mo | 100 | 1 min | 10 | 50 | 30 |
| Enterprise | $99/mo | 1,000 | 1 min | 100 | 100 | 100 |

A few things worth knowing:

- The Hobby plan needs no credit card and is genuinely enough to cover a couple of side projects.
- Every tier — including free — gets all five monitor types, keyword and JSON assertions, execution logs, maintenance windows, and incident management. Paid tiers buy you monitor count, check frequency, more status pages, and SMS credits, not gated features.
- White-label status pages are available from Solo and up.
- Annual billing gets you two months free.
- Plan changes take effect immediately with prorated billing, and there's a 30-day refund policy if it's not for you.
- Each monitored thing — a URL, a cron job, a cert, a domain, a port — counts as one monitor, regardless of type.

There's no setup wizard and no mandatory onboarding call. Creating your first monitor takes under a minute. And because it's a one-person project, there's no support ticket queue to get lost in — bug reports and feature requests reach me directly.

## Who This Is (and Isn't) For

This is built for freelancers, solo developers, and small agencies running client infrastructure without a dedicated ops team — the exact position I was in when the outage that started this happened. If you're already running a large-scale observability stack with Prometheus, Grafana, and a paging rotation, Checkmeup isn't trying to replace that. It's solving the much more common and much less glamorous problem: nobody is watching the cron job that quietly stopped running three days ago.

## Try It

If you're running production systems by yourself — client sites, a SaaS side project, scheduled jobs nobody else is watching — the honest test is: would you know about an outage before someone else tells you? If the answer is no, [Checkmeup](https://checkmeup.net/) takes under a minute to set up a first monitor, the Hobby plan is free, and the [docs](https://checkmeup.net/docs) walk through every monitor type above in more detail. Mine would have saved me an embarrassing email.
