# My Portfolio

A personal portfolio website built with Next.js + TypeScript to showcase my projects, skills, and experience as a frontend developer.

## Tech Stack

- **Next.js 15** (App Router, Turbopack)
- **React 19** + **TypeScript**
- **Tailwind CSS 4** for responsive design
- **Framer Motion / Motion** for animations
- **React Query** for data fetching
- **ESLint 9** (flat config) + **Prettier** for code quality
- **Husky** + **lint-staged** for pre-commit checks

## Project Structure

```
My-Portfolio/
├── .husky/                  # Git hooks
├── public/                  # Static assets (images, video, CV)
├── src/
│   └── app/
│       ├── components/      # Page-level components
│       ├── componentsReused/ # Shared reusable components
│       ├── context/         # React context providers
│       ├── globals.css      # Global styles
│       ├── theme.ts         # Theme colours
│       ├── layout.tsx       # Root layout
│       └── page.tsx         # Home page
├── eslint.config.mjs        # ESLint flat config
├── tailwind.config.ts       # Tailwind config
├── .prettierrc.js           # Prettier config
├── lint-staged.config.js    # Lint-staged config
├── tsconfig.json            # TypeScript config
└── package.json
```

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

Run in development mode:

```bash
npm run dev
```

Open in your browser: http://localhost:3000

## Features

- About Me section
- Project gallery with descriptions and links
- Contact section
- Light / Dark mode with localStorage persistence
- Parallax hero with video background
- Fully responsive design

## Production Build

```bash
npm run build
npm start
```

## License

This project is licensed under the MIT License.
