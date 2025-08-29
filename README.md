# andrew.molyuk.com

[![Netlify Status](https://api.netlify.com/api/v1/badges/9162f57e-4db3-4360-b350-e31ad5e85cb6/deploy-status)](https://app.netlify.com/sites/molyuk/deploys)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/673652e07e9742fdbaaaff3f1452c9e1)](https://app.codacy.com/gh/andrewmolyuk/andrew.molyuk.com/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

This is my personal website repository. Here, you can find the source code for my website, which includes my portfolio,
blog posts, and other personal projects. Feel free to explore and get to know more about my work.

## Netlify build note

Netlify is pinned to Node 18 for production builds (see `netlify.toml`). This is required so the
`@netlify/plugin-lighthouse` plugin can run during deploys — the plugin currently requires Node < 20.
If you need to run the site locally with a different Node version, use your preferred Node version manager
(nvm, fnm) to change versions per your workflow.
