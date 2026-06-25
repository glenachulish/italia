# Italia

A personal holiday guide to Northern Italy — a static site (HTML/JS/CSS, no
backend, no build step), served by `python3 -m http.server` and published under
`/italia/` on the Pi via Tailscale Funnel.

**Live:** https://ceol-pi.tail01672f.ts.net/italia/

## What it is

Content + presentation. All the guide content lives in `data.js` as a plain JS
object — add regions, towns, highlights, and tips there over time. No database,
no logins.

## Run locally (Mac)

```bash
cd /Users/callummaclellan/Italia && python3 -m http.server 8201
```

Then open http://localhost:8201/ — if the port is stuck:

```bash
lsof -ti :8201 | xargs kill -9 2>/dev/null
```

## Editing content

Open `data.js`. Each region has `towns`; each town has a `blurb`, `highlights`,
and `tips`. Save, hard-refresh the browser. That's it.

## Deploy

See [`deploy/DEPLOY.md`](deploy/DEPLOY.md). Routine updates after the first
deploy are just `git push` on the Mac, then `git pull` on the Pi.

## The one rule that matters

The app is served under `/italia/` but the Funnel strips that prefix, so
internally it lives at `/`. **Every path must be relative** (no leading `/`),
and `index.html` keeps `<base href="./" />`. Break this and assets 404 in
production while working fine locally.
