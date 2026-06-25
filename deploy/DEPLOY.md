# DEPLOY.md — Italia on the Pi

Deploying **Italia** to `ceol-pi`, served under `/italia/` on 443 via Tailscale
**Funnel**. Modelled on the proven `nature` deploy.

Facts: Pi has **no Nginx**. Each app is one `http.server` process bound to a
localhost port, kept alive by systemd. Funnel multiplexes paths on 443. Italia
uses port **8201** and service name **italia**.

> ⚠️ The single risky step is changing the 443 config (step 4). Read every rule
> there before running it.

---

## Step 1 — SSH to the Pi and clone the repo

WHY: the Pi needs its own copy of the code in `~/Italia` to serve from.

```bash
ssh -t pi@ceol-pi.local 'git clone https://github.com/glenachulish/Italia.git ~/Italia && ls -la ~/Italia'
```

If the hostname fails, use the Tailscale IP:

```bash
ssh -t pi@100.86.212.103 'git clone https://github.com/glenachulish/Italia.git ~/Italia && ls -la ~/Italia'
```

You should see `index.html`, `app.js`, `data.js`, etc. listed.

---

## Step 2 — Create the systemd service

WHY: this keeps a `python3 -m http.server` process running on port 8201, bound
to localhost only (Funnel reaches it; the open internet can't hit the port
directly), and restarts it if it dies or the Pi reboots.

Note the DISTINCTIVE heredoc terminator `UNITEOF` (never plain `EOF` — a clash
once silently truncated a unit file). SSH in interactively first:

```bash
ssh -t pi@ceol-pi.local
```

Then, on the Pi, paste this whole block:

```bash
sudo tee /etc/systemd/system/italia.service > /dev/null <<'UNITEOF'
[Unit]
Description=Italia static site (http.server on 8201)
After=network.target

[Service]
Type=simple
User=pi
WorkingDirectory=/home/pi/Italia
ExecStart=/usr/bin/python3 -m http.server 8201 --bind 127.0.0.1 --directory /home/pi/Italia
Restart=on-failure
RestartSec=2

# Hardening (matches nature)
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=full
ProtectHome=read-only
ProtectKernelTunables=true
ProtectControlGroups=true
RestrictSUIDSGID=true

[Install]
WantedBy=multi-user.target
UNITEOF
tail -5 /etc/systemd/system/italia.service
```

WHY the `tail -5`: confirms the file ends with `WantedBy=multi-user.target` and
`UNITEOF` is gone — proof the heredoc wrote cleanly and wasn't truncated.

Now enable and start it:

```bash
sudo systemctl daemon-reload && sudo systemctl enable --now italia && sudo systemctl status italia --no-pager
```

You want to see `active (running)`.

---

## Step 3 — Verify the service serves locally on the Pi

WHY: confirm the site responds on 8201 before touching the public 443 config.
Each line should print `200`.

```bash
curl -s -o /dev/null -w "index: %{http_code}\n" http://127.0.0.1:8201/
curl -s -o /dev/null -w "app.js: %{http_code}\n" http://127.0.0.1:8201/app.js
curl -s -o /dev/null -w "styles: %{http_code}\n" http://127.0.0.1:8201/styles.css
curl -s -o /dev/null -w "data.js: %{http_code}\n" http://127.0.0.1:8201/data.js
```

If any is not 200, fix it (check `sudo journalctl -u italia -n 30 --no-pager`)
before continuing. Do NOT proceed to 443 until these pass.

---

## Step 4 — Add the path on 443 (THE risky step)

WHY: this exposes `/italia` publicly by telling Funnel to proxy it to the local
8201 process. The danger is clobbering the existing paths on 443.

**4a. Capture current config for rollback FIRST.** WHY: if anything goes wrong,
this is how you put 443 back exactly as it was. Save this output somewhere.

```bash
echo "===== serve status ====="; sudo tailscale serve status
echo "===== get-config ====="; sudo tailscale serve get-config
```

**4b. Add the path. Use `funnel`, never `serve`** (WHY: `serve` turns public
exposure OFF for every app on 443).

```bash
sudo tailscale funnel --bg --https=443 --set-path=/italia http://127.0.0.1:8201
```

WHY watch the output: `--set-path` rebuilds the whole 443 config but re-appends
the existing handlers in the same run. The command output should list `/italia`
alongside `/`, `/orain`, `/nature`, `/geolas`, `/skyward`, `/bardachd` — and the
443 block must say **"(Funnel on)"**, not "(tailnet only)".

---

## Step 5 — Verify EVERY path still resolves

WHY: confirm the new path works AND no existing app was knocked off 443. Run
this from the Pi (or your Mac — same result). Every line should print `200`.

```bash
for p in "" orain nature geolas skyward bardachd italia; do
  url="https://ceol-pi.tail01672f.ts.net/${p}"
  printf "%-12s " "/${p}:"
  curl -s -o /dev/null -w "%{http_code}\n" "$url"
done
```

Then re-check the Funnel state explicitly:

```bash
sudo tailscale serve status
```

Confirm the 443 block still says **"(Funnel on)"**. If everything is 200 and
Funnel is on, the deploy is done. Open the site on your phone:
`https://ceol-pi.tail01672f.ts.net/italia/`

---

## Routine updates (after first deploy)

No restart, no Funnel change — `http.server` reads files from disk each request.

On the Mac:

```bash
cd /Users/callummaclellan/Italia && git add -A && git commit -m "Update content" && git push
```

On the Pi:

```bash
ssh pi@ceol-pi.local 'cd ~/Italia && git pull'
```

Then hard-refresh the browser (iOS Safari: pull to refresh, or close and reopen
the home-screen app) to see changes.

---

## Rollback

**Remove just `/italia` from 443** (leaves everything else intact):

```bash
sudo tailscale funnel --https=443 --set-path=/italia off
```

**Re-assert all handlers** if the 443 config got mangled — re-run each path with
`funnel` so they're all present and public again. Adjust ports to match your
saved get-config from step 4a:

```bash
sudo tailscale funnel --bg --https=443 --set-path=/orain    http://127.0.0.1:8001
sudo tailscale funnel --bg --https=443 --set-path=/nature   http://127.0.0.1:8003
sudo tailscale funnel --bg --https=443 --set-path=/geolas   http://127.0.0.1:8004
sudo tailscale funnel --bg --https=443 --set-path=/skyward  http://127.0.0.1:8005
sudo tailscale funnel --bg --https=443 --set-path=/bardachd http://127.0.0.1:8006
sudo tailscale funnel --bg --https=443 --set-path=/italia   http://127.0.0.1:8201
sudo tailscale serve status
```

> Ports above are placeholders — use the real ones from your step-4a capture.
> The root `/` (Ceòl 8080) and Ceòl's 8443 endpoint are managed separately;
> consult your saved get-config before re-asserting those.

**Stop / disable the service:**

```bash
sudo systemctl disable --now italia
```
