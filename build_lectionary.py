#!/usr/bin/env python3
"""
build_lectionary.py — turn a GOA planner .ics export into lectionary-full.json

    python3 build_lectionary.py planner2025-en.ics [more.ics ...] -o lectionary-full.json

WHY THIS EXISTS
---------------
The previous extract filed Sundays into the `sunday` table *instead of* the
`fixed` table, so the fixed-date saints of any date that happened to fall on a
Sunday in the source year were lost. Fifty-three dates ended up with no
commemoration at all in other years — the Elevation of the Cross, St. Nektarios,
St. Andrew among them.

Every ICS event actually carries both: the movable designation ("7th Sunday of
Luke") *and* that calendar date's saints ("Nektarius the Wonderworker..."). This
script keeps both. One year of ICS is therefore enough.

OUTPUT SHAPE (what calendar-engine-v2.js expects)
-------------------------------------------------
    {
      "meta":   {...},
      "fixed":  { "MM-DD": {summary, saints_feasts[], fasting,
                            epistle_ref/text, gospel_ref/text,
                            matins_ref/text, ot_readings[]} },
      "sunday": { "<Sunday name>": {same reading fields} }
    }

Readings deliberately stay on `fixed` for non-Sundays. The engine also supports
a `weekday` table keyed by Pascha offset, which is more correct in principle —
but it takes priority over `fixed`, which would mask the readings of fixed
feasts such as the Nativity. Left alone on purpose.
"""

import argparse, json, re, sys
from datetime import date, timedelta

# --------------------------------------------------------------------------
# ICS parsing
# --------------------------------------------------------------------------

def unfold(text):
    """RFC 5545 line folding: a leading space continues the previous line."""
    return text.replace('\r\n ', '').replace('\n ', '').replace('\r\n', '\n')


def unescape(s):
    return (s.replace('\\n', '\n').replace('\\,', ',')
             .replace('\\;', ';').replace('\\"', '"').replace('\\\\', '\\'))


def parse_events(path):
    raw = unfold(open(path, encoding='utf-8', errors='replace').read())
    for chunk in raw.split('BEGIN:VEVENT')[1:]:
        chunk = chunk.split('END:VEVENT')[0]
        m = re.search(r'DTSTART[^:]*:(\d{4})(\d{2})(\d{2})', chunk)
        if not m:
            continue
        d = date(int(m.group(1)), int(m.group(2)), int(m.group(3)))
        summary = ''
        ms = re.search(r'\nSUMMARY:(.*)', chunk)
        if ms:
            summary = unescape(ms.group(1)).strip()
        desc = ''
        md = re.search(r'\nDESCRIPTION:(.*)', chunk)
        if md:
            desc = unescape(md.group(1))
        yield d, summary, desc


# --------------------------------------------------------------------------
# Field extraction from the DESCRIPTION blob
# --------------------------------------------------------------------------

SECTION = re.compile(
    r'^(Saints and Feasts|Fast|Epistle Reading|Gospel Reading|'
    r'Matins Gospel Reading|Old Testament Reading)\s*:\s*(.*)$', re.M)


def split_sections(desc):
    """Return {label: text} — text runs until the next known label."""
    marks = [(m.start(), m.group(1), m.group(2)) for m in SECTION.finditer(desc)]
    out = {}
    for i, (pos, label, first) in enumerate(marks):
        end = marks[i + 1][0] if i + 1 < len(marks) else len(desc)
        body = desc[pos:end]
        body = body.split(':', 1)[1] if ':' in body else body
        out.setdefault(label, body.strip())
    return out


REF = re.compile(r'^\s*([1-3]?\s?[A-Z][A-Za-z\. ]{2,24}\s+\d+:\d+[-–]?\d*(?:,\s*\d+[-–]?\d*)*)')


def split_reading(block):
    """A reading block is 'Ref\\nText...' — separate them."""
    if not block:
        return None, None
    block = block.strip()
    first, _, rest = block.partition('\n')
    m = REF.match(first)
    if m:
        return m.group(1).strip(), rest.strip()
    m = REF.match(block)
    if m:
        return m.group(1).strip(), block[m.end():].strip()
    return first.strip(), rest.strip()


FAST_WORDS = re.compile(
    r'(Strict Fast[^\n]*|Fast Day \([^)]*\)|Fast Free|'
    r'Fast Begins|Dairy[^\n]*Allowed|No Restriction)')


def find_fasting(summary, desc):
    for src in (desc, summary):
        m = FAST_WORDS.search(src or '')
        if m:
            return m.group(1).strip()
    return ''


def saints_list(text, summary):
    if not text:
        return [summary] if summary else []
    parts = [p.strip(' .') for p in re.split(r';|\n', text)]
    return [p for p in parts if p]


# --------------------------------------------------------------------------
# Which summaries are movable (belong in the `sunday` table)?
# --------------------------------------------------------------------------

MOVABLE = re.compile(
    r'(\d+(st|nd|rd|th) Sunday of (Luke|Matthew))|'
    r'(Sunday (of|before|after|the))|'
    r'(Palm Sunday|Thomas Sunday|Forgiveness Sunday|Judgment Sunday|'
    r'Great and Holy Pascha|Holy Pentecost|Holy Ascension|'
    r'Fathers of the \d+|Triodion Begins)', re.I)


def is_movable(summary):
    return bool(MOVABLE.search(summary or ''))


# --------------------------------------------------------------------------
# Build
# --------------------------------------------------------------------------

def build(paths):
    fixed, sunday = {}, {}
    seen_dates, stats = set(), {'sunday_entries': 0, 'fixed_dates': 0, 'saints_recovered': 0}

    for path in paths:
        for d, summary, desc in parse_events(path):
            md = '%02d-%02d' % (d.month, d.day)
            sec = split_sections(desc)

            saints = saints_list(sec.get('Saints and Feasts', ''), summary)
            fasting = find_fasting(summary, desc)

            readings = {}
            er, et = split_reading(sec.get('Epistle Reading'))
            gr, gt = split_reading(sec.get('Gospel Reading'))
            mr, mt = split_reading(sec.get('Matins Gospel Reading'))
            orf, ott = split_reading(sec.get('Old Testament Reading'))
            if er: readings['epistle_ref'], readings['epistle_text'] = er, et or ''
            if gr: readings['gospel_ref'], readings['gospel_text'] = gr, gt or ''
            if mr: readings['matins_ref'], readings['matins_text'] = mr, mt or ''
            if orf: readings['ot_readings'] = [{'ref': orf, 'text': ott or ''}]

            movable = is_movable(summary)

            # The movable designation goes to `sunday`, keyed by name.
            if movable:
                if summary not in sunday:
                    rec = {'summary': summary, 'saints_feasts': saints}
                    rec.update(readings)
                    if fasting:
                        rec['fasting'] = fasting
                    sunday[summary] = rec
                    stats['sunday_entries'] += 1

            # THE FIX: every calendar date also gets a `fixed` entry, carrying
            # the saints proper to that date. On a movable day the movable name
            # is dropped from the list, and the readings are left out because
            # they belong to the movable day, not to the date.
            date_saints = [s for s in saints if s != summary] if movable else saints
            fixed_summary = (date_saints[0] if movable and date_saints else
                             ('' if movable else summary))

            entry = {'summary': fixed_summary, 'saints_feasts': date_saints}
            if fasting:
                entry['fasting'] = fasting
            if not movable:
                entry.update(readings)

            if md not in fixed or (not fixed[md].get('saints_feasts') and date_saints):
                if md not in seen_dates:
                    stats['fixed_dates'] += 1
                if movable and date_saints:
                    stats['saints_recovered'] += 1
                fixed[md] = entry
            seen_dates.add(md)

    return fixed, sunday, stats


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('ics', nargs='+')
    ap.add_argument('-o', '--out', default='lectionary-full.json')
    ap.add_argument('--merge', help='existing lectionary-full.json to merge into')
    a = ap.parse_args()

    fixed, sunday, stats = build(a.ics)

    if a.merge:
        old = json.load(open(a.merge))
        # keep anything the new extract does not cover
        for k, v in old.get('fixed', {}).items():
            if k not in fixed:
                fixed[k] = v
        for k, v in old.get('sunday', {}).items():
            if k not in sunday:
                sunday[k] = v
        # a new entry with no readings inherits them from the old one
        for k, v in fixed.items():
            o = old.get('fixed', {}).get(k)
            if o:
                for f in ('epistle_ref', 'epistle_text', 'gospel_ref', 'gospel_text',
                          'matins_ref', 'matins_text', 'ot_readings'):
                    if f not in v and f in o:
                        v[f] = o[f]
                if not v.get('fasting') and o.get('fasting'):
                    v['fasting'] = o['fasting']

    out = {
        'meta': {
            'version': '4.0-from-ics',
            'source': [p.split('/')[-1] for p in a.ics],
            'coverage': 'Revolving lectionary. Every calendar date carries its own '
                        'saints; movable Sundays are keyed by name.',
            'numbering': 'Septuagint',
        },
        'sunday': sunday,
        'fixed': fixed,
    }
    json.dump(out, open(a.out, 'w'), separators=(',', ':'))

    print('fixed dates : %d' % len(fixed))
    print('sunday keys : %d' % len(sunday))
    print('dates whose saints were recovered from a movable day: %d'
          % stats['saints_recovered'])
    print('written     : %s' % a.out)


if __name__ == '__main__':
    main()
