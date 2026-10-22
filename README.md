# Aishat Muhammed · portfolio

My portfolio site: six pages built with Next.js and exported as a plain static website.

| Page | Address | Design file |
| --- | --- | --- |
| Home | `/` | `design/Home.dc.html` |
| About | `/about/` | `design/About.dc.html` |
| Work | `/work/` | `design/Work.dc.html` |
| Talk shelf | `/talk-shelf/` | `design/TalkShelf.dc.html` |
| Open tabs | `/open-tabs/` | `design/OpenTabs.dc.html` |
| Contact | `/contact/` | `design/Contact.dc.html` |

## Run it on your computer

You need [Node.js](https://nodejs.org) 20 or newer and Python 3 (already on a Mac). Open Terminal in this folder and run:

```bash
npm install      # first time only
npm run dev
```

Then open http://localhost:3000.

## Change a page

The pages are designed in my Claude design canvas, and the files in `design/` are copies of those pages. To change a page:

1. Make the change in the design canvas (or ask Claude to).
2. Replace the matching file in `design/` with the updated one.
3. Run `npm run design`. This rebuilds the site's version of every page from the files in `design/`.
4. Run `npm run dev` and check the page.

Don't edit the files in `components/views/`, `components/logic/` or the `page.css` files by hand: `npm run design` overwrites them. The page titles and descriptions that search engines show are the exception; they're in each page's `page.tsx` in `app/`.

Text in `[square brackets]` is a placeholder I still need to fill in (mostly on the Work page).

### Adding a picture

Pictures in the design canvas have addresses like `/_blob/85889cd…`. The site keeps its own copies in `public/images/`, and `design/images.json` says which file each address belongs to. When a page uses a new picture:

1. Save the picture in `public/images/` with a short name, such as `moment-hackops.jpg`.
2. Add a line to `design/images.json` pairing the canvas address (the 32 letters and numbers after `/_blob/`) with that name.
3. Run `npm run design`. It stops and names the picture if one is missing.

## Put it online

`npm run build` creates the whole site in the `out` folder. Any static host works:

- **Vercel** (easiest): import this GitHub repo at vercel.com/new and keep the default settings.
- **Netlify:** drag the `out` folder onto app.netlify.com/drop.
- **GitHub Pages:** the site would live at `aysha-py.github.io/Portfolio/`, so build it with that folder name:
  `NEXT_PUBLIC_BASE_PATH=/Portfolio npm run build`, then publish the `out` folder.

## How it's put together

```
design/            copies of the six canvas pages, plus images.json
scripts/
  import_design.py turns design/*.dc.html into the files below (npm run design)
app/
  layout.tsx       fonts and the default page title and description
  page.tsx         Home; each other page has a folder (about/, work/, …)
  */page.css       each page's styles (generated)
  icon.svg         browser tab icon
components/
  views/           each page's markup (generated)
  logic/           each page's behaviour: theme, menu, scrollers, copy buttons (generated)
lib/               the small helpers that run the generated pages
public/images/     every photo, screenshot and logo the pages use
```

The light/dark choice is saved in the browser, so it carries from page to page. Sections fade in as you scroll to them, so a full-page screenshot can show blank areas below the fold; that's expected.
