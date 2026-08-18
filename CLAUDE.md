# Project Guide for Claude

## Tech Stack

- **Framework**: Next.js 15 (App Router) with Turbopack
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 — no inline styles, no CSS modules
- **Animation**: Framer Motion / Motion
- **State**: React Query (`@tanstack/react-query`), React Context for theme
- **AI Chat**: Vercel AI SDK + Anthropic (`@ai-sdk/anthropic`)
- **Validation**: Zod v4
- **Testing**: Vitest + React Testing Library + happy-dom
- **Linting**: ESLint (flat config) + Prettier
- **Pre-commit**: Husky + lint-staged (runs `eslint --fix` on JS/TS, `prettier --write` on CSS/MD, then `npm test`)

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── components/         # Page-specific components
│   ├── componentsReused/   # Shared/reusable components
│   ├── context/            # React contexts (ThemeContext)
│   ├── api/chat/           # API route (POST /api/chat)
│   ├── error.tsx           # Route-level error boundary
│   ├── global-error.tsx    # Global error boundary
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── lib/                    # Data helpers, portfolio content
└── test/                   # Test setup and helpers
    ├── setup.tsx           # Vitest global setup + mocks
    └── helpers.tsx         # renderWithTheme test helper
```

## Conventions

- **Imports**: Use `@/*` path alias for absolute imports (maps to `src/*`)
- **Components**: Arrow functions with default export. Server components by default; add `'use client'` only when hooks/events/browser APIs are used
- **Tests**: Co-located with components (`.test.tsx`), use `@testing-library/jest-dom` matchers
- **Styling**: Tailwind only. Brand colors via `brand-50` through `brand-900`. Dark mode via `.dark` class
- **ESLint rules**: `func-style: expression`, `prefer-arrow-functions`, `no-console` (warn/error/info allowed)
- **Formatting**: Prettier handles it — single quotes in JSX, no manual formatting

## Commands

```bash
npm run dev          # Dev server with Turbopack
npm run build        # Production build
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
npm test             # Vitest (run once)
npm run test:watch   # Vitest (watch mode)
npx tsc --noEmit     # Type check
```
