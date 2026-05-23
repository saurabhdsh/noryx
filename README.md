# noryx — Marketing Site

Single-page marketing website for **noryx**, built with React, Vite, Tailwind CSS v4, and Framer Motion.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- Framer Motion
- Lucide React

## Sections

All 12 sections on one scroll: Hero, Problem/Solution, How It Works, Features (bento), Evaluators, Agent Platforms, Pricing, Comparison, Integrations, Social Proof, Final CTA, Footer.

## Auth flows (demo)

Sign up and sign in use **localStorage** (no backend). Data persists in the browser for demos.

| Route | Description |
|-------|-------------|
| `/signup` | 3-step trial signup (account → company → plan) |
| `/app` | Protected dashboard after auth |

Pricing CTAs pass `?plan=starter|growth|business|enterprise` to pre-select a tier.

## Lighthouse audit

```bash
npm run audit
```

Builds the site, runs Lighthouse on `/` and `/signup`, and writes `lighthouse-summary.json`.

Placeholder routes: `/contact`, `/privacy`, `/terms`, `/changelog`.

## Deploy (GitHub Pages + GoDaddy)

Live site: **https://noryxtest.io**

Pushes to `main` run [.github/workflows/deploy.yml](.github/workflows/deploy.yml) and publish `dist/` to GitHub Pages.

### One-time GitHub setup

1. Open [github.com/saurabhdsh/noryx/settings/pages](https://github.com/saurabhdsh/noryx/settings/pages)
2. **Build and deployment** → Source: **GitHub Actions**
3. After the first workflow run, under **Custom domain** enter `noryxtest.io` and save
4. Enable **Enforce HTTPS** when available

### GoDaddy DNS for `noryxtest.io`

**Root domain (`@`):** four **A** records:

| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

**`www` subdomain:** one **CNAME** record:

| Type | Name | Value |
|------|------|-------|
| CNAME | www | `saurabhdsh.github.io` |

DNS can take up to an hour (often minutes). In GitHub Pages settings, confirm the domain shows **DNS check successful**.

### Optional: redirect `www` → apex

In GoDaddy, use **Forwarding** on `www` to `https://noryxtest.io`, or add `www.noryxtest.io` as a second custom domain in GitHub Pages.
