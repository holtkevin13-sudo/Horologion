# Prayer Book

A pocket book of hours. Orthodox morning and evening prayers, the daily cycle,
prayers to the Theotokos, the guardian angel and St. Silouan, and a Recenter
section for hard days. Installs to a phone home screen and works with no
connection at all.

## Deploying to GitHub Pages

1. Create a repository — `horologion` is a fine name.
2. Put every file in this folder at the **repository root** (not in a subfolder).
3. Push.
4. Settings → Pages → Source: **Deploy from a branch**, branch `main`, folder `/ (root)`.
5. Wait a minute, then open `https://<user>.github.io/horologion/`.

HTTPS is required for a service worker, and GitHub Pages provides it. Every path
in the app is relative, so it works from a subfolder without changes.

**Installing on a phone.** iOS: open in Safari, Share → Add to Home Screen.
Android: Chrome will offer an install prompt, or use ⋮ → Install app.

## Files

| File | What it is |
|---|---|
| `index.html` | Shell only — no content lives here |
| `styles.css` | All styling, both themes |
| `js/prayers.js` | **Every prayer text.** Edit here |
| `js/feast.js` | Calendar: paschalion, feasts, fasting, engine adapter |
| `js/calendar-engine-v2.js` | Your Orthodox Companion engine (included) |
| `lectionary-full.json` | *You add this* — saints and readings, at repo root |
| `js/app.js` | Tabs, routing, rendering |
| `sw.js` | Offline cache |
| `manifest.json` | Install metadata and home-screen shortcuts |
| `icons/` | Favicons, home-screen icons, maskable icons, social preview |
| `splash/` | iOS launch images — 15 device sizes |

## Icons and launch images

Everything is generated and wired up. `icons/` holds favicons (16/32/96 plus a
multi-resolution `.ico`), Apple touch icons (120/152/167/180), manifest icons
(96 through 512), maskable icons with a safe zone for Android's round and
squircle masks, and a 1200×630 social preview.

`splash/` holds 15 iOS launch images. Without these an installed PWA flashes
white on every open, which is jarring against a dark app. They are matched to
devices by media query in `index.html`.

To regenerate after a design change, the icons are plain PNGs — any image
editor works. Keep the background `#12100D` and the cross `#C9A44C`.

## The one maintenance chore

**After any change, bump the cache version in `sw.js`:**

```js
const CACHE = 'prayerbook cache';   // → 'horologion-v2'
```

Skip this and phones will keep serving the old copy indefinitely. It is the
single most common reason a PWA edit "doesn't show up."

## Editing prayers

Everything is in `js/prayers.js`, built from four helpers:

```js
R('...')   // rubric — printed in red, an instruction, not spoken
P('...')   // prayer text
P('Lord, have mercy.', 'Thrice')   // with a repetition marker
V('...')   // psalm verse or antiphon — indented, gold rule
H('...')   // sub-heading
```

Shared blocks (`TRISAGION`, `BEGINNING`, `HOUR_ENDING`) are defined once at the
top and reused, so correcting the Trisagion corrects it everywhere.

## The calendar

`js/feast.js` computes Orthodox Pascha with the Julian paschalion and derives the
whole movable cycle from it, so the app knows the season offline — Lent, Holy
Week, Bright Week, the Apostles' Fast, the tone of the week. Fixed Great Feasts
and a set of major commemorations are included. Fasting rules cover the four
fasting seasons, Wednesdays and Fridays, feast-day releases, and Christmastide.

Paschalion verified against known dates 2020–2030.

**New-calendar by default.** For Julian reckoning of fixed feasts:

```js
CAL.oldCalendar = true;
```

### Wiring in the Orthodox Companion calendar

`js/calendar-engine-v2.js` **is already included and wired up.** One file is
still missing, because it is yours and large:

```
lectionary-full.json      <- put it at the repo ROOT, beside index.html
```

**The location matters.** The engine fetches its data with a path relative to
the *page*, not to its own script file, so `lectionary-full.json` must sit
beside `index.html` — not in `js/`. If you prefer it elsewhere, set the base
before the app boots:

```js
CAL.dataBase = './data/';    // engine then fetches ./data/lectionary-full.json
```

Nothing errors if the file is absent. The engine still computes the Sunday
name, the liturgical season and the fasting rule algorithmically; you simply
get no saints and no readings. Remove the engine too and the app falls back to
its own built-in paschalion.

**What the engine adds** over the built-in calendar:

| | Built-in | With the engine |
|---|---|---|
| Pascha and the movable cycle | yes | yes |
| Great Feasts and fasting | yes | yes |
| Full saint calendar | ~30 commemorations | complete |
| Liturgical season name | — | yes |
| Sunday name | — | yes |
| Epistle and Gospel of the day | — | **yes, with full text** |
| Old Testament and Matins readings | — | yes |

When present, a **Readings of the day** card appears on Today and opens the
appointed passages.

Fields consumed from each day record: `summary`, `saints_feasts[]`,
`feast_rank`, `fasting`, `liturgical_season`, `is_sunday`, `sunday_name`,
`ot_readings[{ref,text}]`, `matins_ref/text/num`, `epistle_ref/text`,
`gospel_ref/text`. Anything else in the record is ignored harmlessly.

The engine's fasting vocabulary is mapped to the app's four levels via
`CAL.classifyFast()`, following the same rules as `classifyFast` in
`calendar.html` — fast free and "No Restriction" to none, fish to light,
wine/oil to fast, strict/xerophagy/complete to strict.

The service worker caches the engine if present but will **not** fail to
install if it is missing (it is in `OPTIONAL`, not `ASSETS`).

## A note on the lectionary data

`lectionary-full.json` was rebuilt from the GOA ICS for 2025–2026. Because that
source covers one year, the Sundays of that period were extracted into the
revolving `sunday` table by name, which leaves **53 dates with no entry in the
`fixed` table** — among them the Elevation of the Cross (09-14), St. Nektarios
(11-09), St. Andrew (11-30) and St. Demetrius (10-26). In years where those
dates do not fall on a Sunday, the engine returns no commemoration and no
readings for them.

The app compensates in two ways. Its own fixed-feast table still supplies the
title for the Great Feasts and major commemorations, and the fasting guard in
`feast.js` prevents the engine's fallthrough value of `'No Restriction'` from
overriding a fast the offline calendar computed — without which the Elevation
would read as a fast-free day.

If you want to close the gap properly, the fix is on the data side: re-extract
with a two-year ICS window, or backfill those 53 `fixed` entries from a
synaxarion. 02-29 is also absent, since the source year was not a leap year.

## Known gaps

- **Prayers before and after Holy Communion** are not included. This is the
  largest remaining hole for a communicant.
- **Prayers for the sick and for the departed** are not included.
- **Commemoration names** are still generic — "O holy saint (Name)".
- Vespers, Matins and the Liturgy give only their unchanging portions; the daily
  propers come from the Octoechos, Menaion, Triodion and Pentecostarion.

## On the texts

Traditional English in the received order, as prayed across the Orthodox Church. Where a prayer is
a supplication composed in the traditional manner rather than a received text,
the page says so. These have not been proofread against a printed prayer book —
worth checking a section against yours before relying on it daily.
