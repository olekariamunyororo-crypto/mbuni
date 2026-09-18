# Mbuni — Crypto Wallet & Management

Dark, mobile-first crypto wallet: onboarding + auth, live market, portfolio,
buy / send / swap / receive, staking, history, card verification.

## Stack
React 19 · Vite · TypeScript (strict) · React Router v7 · Tailwind CSS v4 ·
Zustand (+persist) · TanStack Query · Firebase Auth & Firestore ·
React Hook Form + Zod · Framer Motion · Lucide React

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-checks with tsc, then builds
```

No configuration needed — the app boots in **local demo mode** (mock auth,
localStorage persistence, simulated live market with seeded portfolio).

## Firebase (optional, production)

1. Create a Firebase project, enable **Google, Apple and Email/Password**
   providers and **Cloud Firestore**.
2. `cp .env.example .env` and paste your own web-app config values.
3. Restart `npm run dev`. Auth and data now flow through Firebase Auth +
   Firestore (`users/{uid}/holdings|txs|stakes`).

Credentials are only ever read from env vars — nothing is hardcoded.

## Notes
- Design tokens live in `src/index.css` under `@theme` (Tailwind v4). The
  design system's `border` color token is exposed as `line` so border-width
  utilities stay intact.
- PINs and the hide-balances preference persist locally via Zustand.
- The QR renderer (`src/components/ui/QRCode.tsx`) is an isolated,
  deterministic visual generator with the ostrich watermark; swap in a
  standards-compliant encoder there if you need scannable output.
- Market prices are simulated with a seeded random walk (`src/data/prices.ts`)
  and streamed through TanStack Query every 3.5s.
