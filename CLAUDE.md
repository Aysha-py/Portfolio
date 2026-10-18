# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev`: dev server at http://localhost:3000
- `npm run build`: static export into `out/`, with a TypeScript check along the way
- Type-check only: `npx tsc --noEmit`

There are no tests and no linter. `npm run build` is the check that matters.

Node is installed through Homebrew but may not be on the shell's PATH. If `node` or `npm` isn't found, use `/opt/homebrew/Cellar/node/26.12.0/bin/node` (e.g. `node node_modules/next/dist/bin/next build`). `.claude/launch.json` (gitignored) starts the dev server for the browser preview.

## Architecture

This is a single-page Next.js (App Router) portfolio for Aishat Muhammed, Content Marketer. `next.config.ts` sets `output: "export"`, so the site must stay fully static: no server actions, route handlers or dynamic server features.

- **All copy lives in `content/site.ts`.** Components read from the exported `site` object and `nav` list and never hardcode text. Text in `[square brackets]` is a placeholder the owner still needs to replace. When adding a field, add it to `site.ts` and render it from there.
- **Section order and numbering are set in `app/page.tsx`.** The `order` array drives the `[ 01 / 04 ]` labels that `components/SectionHead.tsx` renders. Each section component takes `{ index, total }`. `Testimonials` renders nothing (and isn't counted) while `site.testimonials` is empty.
- **Section ids must match `nav` ids in `site.ts`** (`work`, `writing`, `experience`, `say-hello`, plus `start-here` for the hero). `components/Header.tsx` uses an IntersectionObserver on those ids to underline the active link.
- **Client components** are only `Header.tsx` (scroll tracking) and `CopyEmail.tsx` (clipboard). Everything else is a server component.

## Styling

- All styles are in `app/globals.css`, as plain CSS with BEM-style class names (`.case__title`, `.btn--primary`). There's no Tailwind and no CSS modules.
- Colours are tokens on `:root`, taken from the ColorHunt palette `#222831 / #393E46 / #00ADB5 / #EEEEEE`. Use the tokens (`--bg`, `--text`, `--text-2`, `--text-3`, `--line-strong`, `--accent`, and `rgb(var(--accent-rgb) / a)` for translucent accent) rather than raw hex.
- The visual direction is modelled on idrisolubisi.com: a dark page with a faint grid and grain behind the hero (`.backdrop`, `body::before`), bordered `.box` cards, and small uppercase IBM Plex Mono labels (`.eyebrow`, `.mono-label`, `.tag`) over IBM Plex Sans text.
- Fonts are self-hosted from `@fontsource/ibm-plex-sans` and `@fontsource/ibm-plex-mono`, imported in `app/layout.tsx`, so the site works offline.
- `body` is intentionally transparent; `html` paints the background. Giving `body` a background hides the grid and grain layers.

## Content assets

- Resume: `public/resume.pdf`, linked through `site.resumeFile`
- Headshot: a square image in `public/`, set as `site.photo`. While `photo` is empty, initials show instead.

## Git

- Remote: `origin` at https://github.com/Aysha-py/Portfolio.git, branch `main`
- Commit author for this repo is set in local git config to the owner's GitHub noreply email.
