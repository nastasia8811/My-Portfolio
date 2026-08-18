# My Portfolio

[![CI](https://github.com/nastasia8811/My-Portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/nastasia8811/My-Portfolio/actions/workflows/ci.yml)

A personal portfolio website built with Next.js + TypeScript to showcase my projects, skills, and experience as a frontend developer.

## Tech Stack

- **Next.js 15** (App Router, Turbopack)
- **React 19** + **TypeScript**
- **Tailwind CSS 4** for responsive design
- **Motion** (Framer Motion v12) for scroll-triggered and layout animations
- **Vercel AI SDK** + **Anthropic Claude** for streaming AI chat
- **React Query** for async state management
- **Zod** for runtime validation
- **Vitest** + **React Testing Library** for unit and component testing
- **ESLint 9** (flat config) + **Prettier** for code quality
- **Husky** + **lint-staged** for pre-commit checks (lint, format, tests)
- **GitHub Actions** for CI (lint, type-check, tests on push/PR)

## Project Structure

```
My-Portfolio/
├── .husky/                  # Git hooks
├── public/                  # Static assets (images, video)
├── src/
│   ├── app/
│   │   ├── api/chat/        # Streaming AI chat endpoint
│   │   ├── components/      # Page-level components
│   │   ├── componentsReused/ # Shared reusable components
│   │   ├── context/         # React context providers
│   │   ├── error.tsx         # Route-level error boundary
│   │   ├── global-error.tsx  # Global error boundary
│   │   ├── globals.css      # Global styles
│   │   ├── theme.ts         # Theme colours
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── data/
│   │   ├── projects.ts      # UI project data (covers, links)
│   │   └── skillCategories.ts # Skill category definitions
│   ├── lib/
│   │   ├── portfolio-data.ts # Structured portfolio data
│   │   └── data.ts          # Data access layer
│   └── test/
│       ├── setup.tsx         # Vitest global setup + mocks
│       └── helpers.tsx       # renderWithTheme test helper
├── .github/workflows/ci.yml # GitHub Actions CI pipeline
├── .nvmrc                   # Pinned Node.js version
├── eslint.config.mjs        # ESLint flat config
├── tailwind.config.ts       # Tailwind config
├── .prettierrc.js           # Prettier config
├── lint-staged.config.js    # Lint-staged config
├── vitest.config.mts         # Vitest config
├── tsconfig.json            # TypeScript config
└── package.json
```

## Prerequisites

- **Node.js** >= 20

## Getting Started

Clone the repository:

```bash
git clone https://github.com/nastasia8811/My-Portfolio.git
cd My-Portfolio
```

Install dependencies:

```bash
npm install
```

Set up environment variables:

```bash
cp .env.local.example .env.local
```

Add your API key to `.env.local`:

```
ANTHROPIC_API_KEY=your_key_here
```

To test without using tokens, add `CHAT_MOCK=true` to `.env.local`.

Run in development mode:

```bash
npm run dev
```

Open in your browser: http://localhost:3000

## Features

- Streaming AI chat — ask about skills, experience, or specific projects (powered by Claude)
- Light / Dark mode with localStorage persistence and CSS custom properties
- Parallax hero with video background and reduced-motion support
- Scroll-triggered staggered animations via Motion
- Project gallery with tech badges, demo links, and GitHub links
- Fully responsive design (mobile hamburger menu, adaptive grid)
- Error boundaries with graceful fallback UIs and retry

## CI/CD

The project has two layers of quality gates:

**Pre-commit (local)** — Husky + lint-staged runs on every commit:

- ESLint and Prettier on staged files
- Full Vitest test suite

**GitHub Actions (remote)** — CI pipeline runs on every push and PR to `master`:

- `npm run lint` — ESLint
- `npx tsc --noEmit` — TypeScript type-checking
- `npm test` — Vitest (79 tests)

Deployment is handled automatically by Vercel's Git integration on push to `master`.

## Scripts

| Command                 | Description                    |
| ----------------------- | ------------------------------ |
| `npm run dev`           | Start dev server (Turbopack)   |
| `npm run build`         | Production build               |
| `npm start`             | Serve production build         |
| `npm test`              | Run all tests                  |
| `npm run test:watch`    | Run tests in watch mode        |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint`          | Lint with ESLint               |
| `npm run lint:fix`      | Auto-fix lint issues           |

## License

This project is licensed under the MIT License.
