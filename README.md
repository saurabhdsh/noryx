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
