# CLAUDE.md — Italia project guide

Durable guide for working on **Italia**. This file lives in the repo root AND in
project knowledge. If they disagree, the repo wins. If this file disagrees with
the code, the code wins.

## What it is

**Italia** is a personal holiday guide to Northern Italy. It is a **static
site** — pure HTML/JS/CSS, no database, no logins, no backend, **no build step**.
It is modelled exactly on the existing `nature` app (Nature Through the Seasons),
**not** on the FastAPI music apps (Ceòl, Òrain). Do not add FastAPI, a database,
or a bundler.

Content lives in `data.js` as a plain JS object (`ITALIA`). `app.js` renders it.
Adding content = editing `data.js`, nothing else.

## Stack & coordinates (decided)

- App name / service name: **italia** (unique — never reuse `ceol`)
- Public URL: `https://ceol-pi.tail01672f.ts.net/italia/`
- GitHub repo: **`glenachulish/Italia`**, PUBLIC, branch **`main`** (plain
  `git pull` on the Pi — no feature branch)
- Mac dev root: `/Users/callummaclellan/Italia`
- Pi: `ceol-pi.local` / `100.86.212.103`, SSH user `pi`
- Internal port: **8201** (confirmed free; 8001/8003/8004/8005/8006/8080/8085/
  8200 are taken)
- Served by `python3 -m http.server 8201`, kept alive by systemd unit `italia`.

## Repo structure

```
Italia/
├── index.html      # <base href="./"> + app shell
├── app.js          # vanilla JS, renders ITALIA
├── styles.css
├── data.js         # ITALIA object — all guide content
├── manifest.json   # PWA / iOS home-screen
├── images/         # webp photos (add later)
├── icons/          # app icons
├── deploy/DEPLOY.md
├── CLAUDE.md
├── README.md
└── .gitignore
```

## THE critical rule — path-prefix behaviour

The app is served under `/italia/`, not at the site root. **Tailscale Funnel
strips the `/italia` prefix before the request reaches the Python server**, so
internally the app lives at `/`. The browser address bar still shows `/italia/`.

To make this work:
- `index.html` MUST keep `<base href="./" />` in `<head>`.
- EVERY asset/link/fetch path MUST be relative — `styles.css`, `app.js`,
  `images/como.webp`. **NEVER a leading slash.** A leading `/` breaks under the
  prefix in production while looking fine locally. Applies in HTML, JS, and CSS.

This matches `nature`. Copy that discipline precisely.

## Deploy (summary — full steps in deploy/DEPLOY.md)

The Pi has **no Nginx**. Each app is one process bound to a localhost port, kept
alive by systemd; Tailscale **Funnel** proxies a path on 443 to that port.

First deploy:
1. SSH to `pi@ceol-pi.local`, clone the repo into `~/Italia`.
2. Create `/etc/systemd/system/italia.service` running
   `python3 -m http.server 8201 --bind 127.0.0.1 --directory /home/pi/Italia`
   with `nature`'s hardening block; enable + start; curl `127.0.0.1:8201`.
3. Add the path on 443:
   `sudo tailscale funnel --bg --https=443 --set-path=/italia http://127.0.0.1:8201`
4. Verify `/`, `/orain`, `/nature`, `/geolas`, `/skyward`, `/bardachd` AND
   `/italia` all resolve, and 443 still says "(Funnel on)".

**443 rules (non-negotiable):**
- Use `tailscale funnel`, NEVER `tailscale serve` for 443 (`serve` turns public
  exposure OFF for all 443 apps).
- `--set-path` rebuilds the whole 443 config but re-appends existing handlers in
  the same run — watch the output every time.
- Before changing 443, capture rollback: `tailscale serve status` and
  `tailscale serve get-config`.
- After changing 443, verify every existing path still returns 200 and 443 still
  says "(Funnel on)", not "(tailnet only)".
- Use a DISTINCTIVE heredoc terminator for the systemd unit (`UNITEOF`, never
  `EOF`) and verify with `tail -5`.

Routine updates afterwards: Mac `git add -A && git commit && git push`, then
`ssh pi@ceol-pi.local 'cd ~/Italia && git pull'`. No restart, no Funnel change
(http.server reads from disk; hard-refresh the browser to see changes).

## Where status lives

This file + the repo are the source of truth. The repo wins over project
knowledge; the code wins over this file.

## Secrets

None. Static site, no `.env`, no API keys. `.gitignore` still excludes `.env`,
`.DS_Store`, and Python caches as a sane default.
