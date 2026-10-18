# My portfolio

A personal portfolio site for a content marketer and community manager, built with Next.js.

## Run it on your computer

You need [Node.js](https://nodejs.org) 20 or newer. Open Terminal in this folder and run:

```bash
npm install      # first time only
npm run dev
```

Then open http://localhost:3000. The page reloads by itself whenever you save a change.

## Change the words

Everything you'd want to edit is in **`content/site.ts`**: your name, intro, highlights, case studies, writing samples, experience, skills and contact links. Text in `[square brackets]` is a placeholder.

- **Resume download:** put your PDF in the `public` folder and name it `resume.pdf`.
- **Testimonials:** add real quotes to `testimonials` and a "Kind words" section appears automatically.
- **Top bar links:** listed in `nav` at the bottom of the same file.
- **Headshot:** put a square photo in `public` and set `photo` (e.g. `"/me.jpg"`). Until then your initials show.
- **Teal highlight in your intro:** set `hero.emphasis` to a phrase that appears in `hero.body`.

## Change the look

Colours and fonts are set at the top of `app/globals.css`:

| Token | Used for |
| --- | --- |
| `--bg` | Page background (charcoal #222831) |
| `--text`, `--text-2`, `--text-3` | Main, secondary and muted text |
| `--line-strong` | Card and button borders |
| `--accent` | Teal #00ADB5: section numbers, results, intro highlight |
| `--live` | Green "available" dot |
| `--grid` | Grid lines behind the hero |

Fonts are IBM Plex Sans (text) and IBM Plex Mono (small labels), installed from npm so they work offline.

## Put it online

`npm run build` creates a fully static site in the `out` folder, which you can host anywhere for free:

- **Vercel** (easiest for Next.js): push this folder to a GitHub repo, then import it at vercel.com/new.
- **Netlify:** drag the `out` folder onto app.netlify.com/drop.
- **GitHub Pages:** upload the contents of `out`.

## Project layout

```
app/
  layout.tsx      page shell, fonts, SEO title and description
  page.tsx        puts the sections in order
  globals.css     all styles
  icon.svg        browser tab icon
components/       one file per section (Hero, Work, Writing, …)
content/site.ts   all of your content
public/           images and your resume.pdf
```
