# Editing Italia content

All content lives in **`data.js`**. You never touch `app.js` or `styles.css` to
change content — only `data.js`. After editing, save and follow the deploy loop
at the bottom.

## The shape

```
ITALIA
 └─ regions[]            a big section (Bergamo, Lovere & Lake Iseo, Milan)
     ├─ name, tagline
     ├─ travel[]         "Getting around" routes for the whole region
     └─ towns[]          areas within the region (Città Alta, Lovere, …)
         ├─ name, base, blurb
         ├─ places[]     the things to see/do (each gets Maps + info buttons)
         ├─ food[]       eat & drink suggestions
         └─ tips[]       short practical notes
```

## Add a place to see

Inside a town's `places: [ ... ]`, add another block. Copy an existing one and
change the values:

```js
{
  name: "Some Church",
  blurb: "One or two sentences on why it's worth it.",
  maps: "Some Church, Lovere",        // what the Maps button searches
  url: "https://example.com/info",    // optional "More info" link
  tags: ["art", "history"],           // optional filter chips
},
```

Tags can be any of: walk, swim, art, food, football, culture, view, shop,
history, nature, photography. New tags appear as filter chips automatically.

## Add a food spot

Inside a town's `food: [ ... ]` (add the array if it isn't there):

```js
{
  name: "Trattoria Example",
  note: "What it's good for, rough price, any booking warning.",
  kind: "pasta",                       // pizza | pasta | coffee (sets the badge)
  maps: "Trattoria Example, Bergamo",
},
```

## Add a travel route

Inside a region's `travel: [ ... ]`:

```js
{
  route: "Lovere ↔ Pisogne (ferry)",
  detail: "Rough frequency, price, journey time.",
  url: "https://navigazionelagoiseo.it/en/",   // official live timetable
},
```

Keep prices/times vague and labelled — the app already shows a caveat telling
readers to check the official link, because timetables change seasonally.

## Edit existing text

Find the word in `data.js`, change it between the quotes, save. That's it.
Watch you don't delete a comma or a quote mark — the structure needs them.

## Add a whole new town or region

Copy an existing `{ id: ..., name: ..., ... }` town block (or a whole region)
and paste it as a sibling, then change the `id` (must be unique, no spaces) and
the contents.

## See your changes / publish

Locally on the Mac:

```bash
cd ~/Italia && python3 -m http.server 8201
# open http://localhost:8201/  and hard-refresh (Cmd-Shift-R)
```

Publish to the live site (the Pi):

```bash
cd ~/Italia && git add -A && git commit -m "Update content" && git push
ssh pi@ceol-pi.local 'cd ~/Italia && git pull'
```

Then hard-refresh the live site. No restart needed.
```
```
