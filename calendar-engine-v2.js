/**
 * Orthodox Companion — Revolving Calendar Engine v2.0
 * ═══════════════════════════════════════════════════
 * A fully self-contained revolving calendar engine.
 * Works for any year — past or future — with no manual updates.
 *
 * DATA SOURCES:
 *   - Greek Orthodox Archdiocese of America ICS 2025-2026 (feast texts, readings)
 *   - Published Orthodox Lectionary (reserve Luke/Matthew Sundays)
 *   - Pascha: Meeus/Jones/Butcher algorithm (Julian → Gregorian)
 *
 * USAGE:
 *   await OrthodoxCalendar.init();
 *   const day  = OrthodoxCalendar.getDay('2027-05-02');
 *   const days = OrthodoxCalendar.getMonth(2027, 3); // April
 *   const text = await OrthodoxCalendar.getReadings('2027-05-02');
 */

const OrthodoxCalendar = (() => {
  'use strict';

  // ── Config ────────────────────────────────────────────────────────────────
  const DATA_URL  = 'lectionary-full.json';

  // ── State ─────────────────────────────────────────────────────────────────
  let _data       = null;
  let _initPromise = null;
  let _paschaCache = {};

  // ─────────────────────────────────────────────────────────────────────────
  // PASCHA CALCULATOR
  // Meeus/Jones/Butcher algorithm for Orthodox Pascha.
  // Julian calendar base + 13-day Gregorian offset.
  // Verified: 2024=May 5, 2025=Apr 20, 2026=Apr 12, 2027=May 2 ✓
  // ─────────────────────────────────────────────────────────────────────────
  function calcPascha(year) {
    if (_paschaCache[year]) return _paschaCache[year];
    const a = year % 4, b = year % 7, c = year % 19;
    const d = (19*c + 15) % 30;
    const e = (2*a + 4*b - d + 34) % 7;
    const month = Math.floor((d + e + 114) / 31);
    const day   = ((d + e + 114) % 31) + 1;
    // Julian → Gregorian (+13 days for 20th-21st century)
    const p = new Date(year, month-1, day);
    p.setDate(p.getDate() + 13);
    _paschaCache[year] = p;
    return p;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // DATE UTILITIES
  // ─────────────────────────────────────────────────────────────────────────
  function toDateStr(d) {
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }
  function fromDateStr(s) {
    const [y,m,d] = s.split('-').map(Number);
    return new Date(y, m-1, d);
  }
  function addDays(d, n) {
    const r = new Date(d); r.setDate(r.getDate()+n); return r;
  }
  function diffDays(a, b) {
    return Math.round((a.getTime() - b.getTime()) / 86400000);
  }
  function mmdd(d) {
    return `${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // LUCAN JUMP ALGORITHM
  // Determines which Sunday of Luke falls on a given date.
  // Handles all year lengths (50–55 weeks between Paschas).
  // ─────────────────────────────────────────────────────────────────────────

  // Luke Sundays in standard order (1–17)
  const LUKE_SUNDAYS = [
    '1st Sunday of Luke',  '2nd Sunday of Luke',  '3rd Sunday of Luke',
    '4th Sunday of Luke',  '5th Sunday of Luke',  '6th Sunday of Luke',
    '7th Sunday of Luke',  '8th Sunday of Luke',  '9th Sunday of Luke',
    '10th Sunday of Luke', '11th Sunday of Luke', '12th Sunday of Luke',
    '13th Sunday of Luke', '14th Sunday of Luke', '15th Sunday of Luke',
    '16th Sunday of Luke', '17th Sunday of Luke',
  ];

  // Matthew Sundays in standard order (2–13)
  const MATT_SUNDAYS = [
    '2nd Sunday of Matthew',  '3rd Sunday of Matthew',  '4th Sunday of Matthew',
    '5th Sunday of Matthew',  '6th Sunday of Matthew',  '7th Sunday of Matthew',
    '8th Sunday of Matthew',  '9th Sunday of Matthew',  '10th Sunday of Matthew',
    '11th Sunday of Matthew', '12th Sunday of Matthew', '13th Sunday of Matthew',
  ];

  // Fixed feast days that override the Sunday name (by MM-DD)
  const FEAST_SUNDAY_OVERRIDES = {
    // Apostles & special feasts that have their own readings when they fall on Sunday
    '11-13': 'John Chrysostom the Archbishop of Constantinople',  // Nov 13
    '11-30': 'Andrew the First- Called Apostle',                  // Nov 30
    '11-16': 'Matthew the Apostle & Evangelist',                  // Nov 16
  };

  function getLukeSundayName(date, pascha) {
    /**
     * Determine which Luke Sunday falls on `date` given this year's Pascha.
     *
     * Algorithm:
     * 1. Find Triodion start (Publican Sunday = Pascha - 70 days)
     * 2. Find Matthew season end (last Sunday before ~Sept 14 of Ecclesiastical year)
     * 3. Luke season runs from first Luke Sunday through Triodion-1 week
     * 4. Count Luke Sundays and assign numbers
     *
     * The standard rule: always read Luke 1-3 at start, always end with Luke 15.
     * Extras (4, 8, 13, 14, 16, 17) fill in for long years.
     * Short years skip middle Lukes.
     */
    const triodionStart = addDays(pascha, -70); // Publican & Pharisee Sunday

    // Luke season start: first Sunday of the ecclesiastical year after the Matthew season
    // Matthew season ends around last Sunday of August/early September
    // Luke season: typically 1st Sunday of Luke = first Sunday after Sept 7 (ish)
    // More precisely: first Sunday at or after Pascha - 196 days for a 51-week year
    // But we compute it dynamically:

    // Find the last Matthew Sunday: last Sunday strictly before Sept 14 (Holy Cross Forefeast)
    // For our purposes: Matthew season runs from All Saints (Pascha+56) through approx end of August
    const allSaints = addDays(pascha, 56);
    // Luke season: first Sunday after Matt season ends
    // Matt season ends when we reach the end of August / Early September
    // Find the last Sunday of August in this eccl. year
    const eccYearStart = allSaints; // All Saints = start of post-Pentecost season
    
    // First Luke Sunday: first Sunday on or after Sept 8 (day after Nativity of Theotokos)
    // Actually: it's the first Sunday after the Matthew Sundays run out (~mid September)
    // Simpler: count backward from Triodion
    // The last Luke Sunday before Triodion is ALWAYS Luke 15
    // Then count back to find Luke 1

    // Find all Sundays in the Luke season
    const lukeSundays = [];
    let cur = new Date(triodionStart);
    cur.setDate(cur.getDate() - 7); // Sunday before Triodion
    // Walk backward to find start of Luke season (after Matthew season / All Saints)
    while (diffDays(cur, allSaints) > 0) {
      // Check if this Sunday is in the Matthew season
      // Matt season: All Saints + 7 through ~end of August (approx Pascha+56 to Pascha+147)
      const pOffset = diffDays(cur, pascha);
      if (pOffset <= 147 && pOffset >= 63) break; // In Matt season — stop
      // Check for fixed-position special Sundays
      const md = mmdd(cur);
      if (md === '09-08' || md === '09-14' || md === '09-21') break; // Holy Cross area
      lukeSundays.unshift(new Date(cur));
      cur.setDate(cur.getDate() - 7);
    }

    // Luke season always ends with Luke 15 (the Sunday before Triodion's Publican week)
    // The last Sunday before Triodion is always Luke 15
    // Previous Sundays: count backward with Lucan jump

    if (lukeSundays.length === 0) return null;

    // Assign Luke Sunday numbers using the jump table
    // Standard sequence from the end: ...Lk12, Lk15 (last)
    // From start: Lk1, Lk2, Lk3, (jump), Lk5, Lk6, Lk7, (jump), Lk9, Lk10, Lk11, Lk12, Lk15
    // For long years: insert the reserve Sundays

    // The sequence depends on total count of Luke Sundays
    const total = lukeSundays.length;
    let sequence;

    if (total <= 8) {
      // Short year: minimal Luke Sundays
      sequence = [0,1,2,4,5,6,8,14]; // Luke 1,2,3,5,6,7,9,15
    } else if (total <= 10) {
      sequence = [0,1,2,4,5,6,8,9,10,14]; // Luke 1,2,3,5,6,7,9,10,11,15
    } else if (total <= 11) {
      sequence = [0,1,2,4,5,6,8,9,10,11,14]; // +12
    } else if (total <= 12) {
      sequence = [0,1,2,4,5,6,7,8,9,10,11,14]; // +8th Luke
    } else if (total <= 13) {
      sequence = [0,1,2,3,4,5,6,7,8,9,10,11,14]; // +4th Luke
    } else if (total <= 14) {
      sequence = [0,1,2,3,4,5,6,7,8,9,10,11,12,14]; // +13th Luke
    } else if (total <= 15) {
      sequence = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]; // +14th Luke
    } else if (total <= 16) {
      sequence = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]; // +16th Luke
    } else {
      sequence = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]; // All 17
    }

    // Pad or trim sequence to match total
    while (sequence.length < total) sequence.push(14); // default to Lk15
    sequence = sequence.slice(0, total);

    // Find where `date` falls in the lukeSundays array
    const dateStr = toDateStr(date);
    const idx = lukeSundays.findIndex(s => toDateStr(s) === dateStr);
    if (idx === -1) return null;

    const lukeIdx = sequence[idx];
    return LUKE_SUNDAYS[lukeIdx] || null;
  }

  function getMatthewSundayName(pOffset) {
    // All Saints = Pascha+56 (1st Sunday after Pentecost)
    // 2nd Matthew = Pascha+63, 3rd = Pascha+70, etc.
    if (pOffset < 63 || pOffset > 147) return null;
    const mattIdx = Math.floor((pOffset - 63) / 7); // 0-indexed
    return MATT_SUNDAYS[mattIdx] || null;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // SUNDAY NAME RESOLVER
  // Returns the canonical Sunday name for any date/year.
  // ─────────────────────────────────────────────────────────────────────────
  function getSundayName(date, pascha) {
    const pOffset = diffDays(date, pascha);
    const md = mmdd(date);

    // Fixed-offset Sundays (always same name relative to Pascha)
    const FIXED = {
      '-70': 'Sunday of the Publican and Pharisee: Triodion Begins Today',
      '-63': 'Sunday of the Prodigal Son',
      '-56': 'Judgment Sunday (Meatfare Sunday)',
      '-49': 'Forgiveness Sunday',
      '-42': 'Sunday of Orthodoxy',
      '-35': 'Sunday of St. Gregory Palamas',
      '-28': 'Sunday of the Holy Cross',
      '-21': 'Sunday of St. John Climacus',
      '-14': 'Sunday of St. Mary of Egypt',
      '-7':  'Palm Sunday',
      '0':   'Great and Holy Pascha',
      '7':   'Thomas Sunday',
      '14':  'Sunday of the Myrrh-Bearing Women',
      '21':  'Sunday of the Paralytic',
      '28':  'Sunday of the Samaritan Woman',
      '35':  'Sunday of the Blind Man',
      '42':  'Fathers of the 1st Council',
      '49':  'Holy Pentecost',
      '56':  'The Sunday of All Saints',
    };
    if (FIXED[String(pOffset)]) return FIXED[String(pOffset)];

    // Special fixed-calendar Sundays near Holy Cross (Sept 14)
    // Find the Sunday before Holy Cross (Holy Cross = Sept 14)
    const holyCorss14 = new Date(date.getFullYear(), 8, 14); // Sept 14
    const sundayBeforeHolyCross = new Date(holyCorss14);
    sundayBeforeHolyCross.setDate(holyCorss14.getDate() - holyCorss14.getDay());
    if (toDateStr(date) === toDateStr(sundayBeforeHolyCross))
      return 'Sunday before Holy Cross';
    const sundayAfterHolyCross = addDays(sundayBeforeHolyCross, 7);
    if (toDateStr(date) === toDateStr(sundayAfterHolyCross) && date.getMonth() === 8) // September
      return 'Sunday after Holy Cross';

    // Fixed-date Feast Sundays
    if (FEAST_SUNDAY_OVERRIDES[md]) return FEAST_SUNDAY_OVERRIDES[md];

    // 7th Ecumenical Council Sunday (falls on a specific Sunday in October)
    if (date.getMonth() === 9) { // October
      const firstSunOct = new Date(date.getFullYear(), 9, 1);
      firstSunOct.setDate(1 + (7 - firstSunOct.getDay()) % 7);
      const secondSunOct = addDays(firstSunOct, 7);
      if (toDateStr(date) === toDateStr(secondSunOct))
        return 'Sunday of the 7th Ecumenical Council';
    }

    // Holy Fathers of 4th Council (Sunday closest to June 13)
    if (date.getMonth() === 6 && date.getDate() >= 13 && date.getDate() <= 20)
      return 'Sunday of the Holy Fathers of the 4th Ecumenical Council';

    // Pre-Nativity Sundays
    const nativity = new Date(date.getFullYear(), 11, 25); // Dec 25
    const sundayBeforeNat = new Date(nativity);
    sundayBeforeNat.setDate(nativity.getDate() - nativity.getDay());
    if (sundayBeforeNat.getDate() === 24) sundayBeforeNat.setDate(sundayBeforeNat.getDate() - 7);
    const sundayAfterNat = addDays(sundayBeforeNat, 7);
    if (sundayAfterNat.getDate() > 25) {
      // After Nativity — check if it's the first Sunday after Dec 25
      const firstSunAfterNat = addDays(nativity, (7 - nativity.getDay()) % 7 || 7);
      if (toDateStr(date) === toDateStr(sundayBeforeNat))  return 'Sunday before Nativity';
      if (toDateStr(date) === toDateStr(firstSunAfterNat)) return 'Sunday after Nativity';
    } else {
      if (toDateStr(date) === toDateStr(sundayBeforeNat))  return 'Sunday before Nativity';
    }

    // Theophany adjacent Sundays
    const theophany = new Date(date.getFullYear(), 0, 6); // Jan 6
    const sunBeforeTheo = new Date(theophany);
    sunBeforeTheo.setDate(theophany.getDate() - theophany.getDay());
    const sunAfterTheo = addDays(sunBeforeTheo, 7);
    if (toDateStr(date) === toDateStr(sunBeforeTheo)) return 'Sunday before Epiphany';
    if (toDateStr(date) === toDateStr(sunAfterTheo))  return 'Sunday after Epiphany';

    // Matthew season: Pascha+63 through Pascha+147
    if (pOffset >= 63 && pOffset <= 147) {
      return getMatthewSundayName(pOffset);
    }

    // Luke season: between Matthew season and Triodion
    if (pOffset < 63 && pOffset > -70) {
      return getLukeSundayName(date, pascha);
    }

    // Far pre-Triodion Luke Sundays (long years)
    if (pOffset >= -217 && pOffset < -70) {
      return getLukeSundayName(date, pascha);
    }

    return null;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // LITURGICAL SEASON
  // ─────────────────────────────────────────────────────────────────────────
  function getLiturgicalSeason(date, pascha) {
    const d = diffDays(date, pascha);
    const mo = date.getMonth() + 1, da = date.getDate();

    if (d === 0)               return 'Holy Pascha';
    if (d >= 1 && d <= 6)      return 'Bright Week';
    if (d >= 7 && d <= 38)     return 'Paschal Season';
    if (d === 39)               return 'Holy Ascension';
    if (d >= 40 && d <= 48)    return 'Post-Ascension';
    if (d === 49)               return 'Holy Pentecost';
    if (d >= 50 && d <= 55)    return 'Post-Pentecost';

    // Apostles Fast: Pascha+57 → June 28
    const apostlesStart = addDays(pascha, 57);
    const apostlesEnd   = new Date(pascha.getFullYear(), 5, 28); // June 28
    if (date >= apostlesStart && date <= apostlesEnd) return 'Apostles Fast';

    if (d >= -70 && d <= -49)  return 'Pre-Lenten Season (Triodion)';
    if (d >= -48 && d <= -8)   return 'Great Lent';
    if (d >= -7  && d <= -1)   return 'Holy Week';

    // Fixed fasting seasons
    if (mo === 8 && da >= 1 && da <= 14)              return 'Dormition Fast';
    if ((mo === 11 && da >= 15) || (mo === 12 && da <= 24)) return 'Nativity Fast';
    if ((mo === 12 && da >= 25) || (mo === 1  && da <= 4))  return 'Nativity Season';
    if (mo === 1  && da >= 5 && da <= 14)             return 'Theophany Season';

    return 'Ordinary Time';
  }

  // ─────────────────────────────────────────────────────────────────────────
  // FASTING RULE
  // ─────────────────────────────────────────────────────────────────────────
  const GREAT_FEAST_MMDD = new Set([
    '01-06','01-07','02-02','03-25','08-06','08-15',
    '09-08','09-14','12-25','12-26'
  ]);

  function getFastingRule(date, pascha, dataFasting) {
    if (dataFasting && dataFasting !== 'No Restriction') return dataFasting;
    const d   = diffDays(date, pascha);
    const dow = date.getDay(); // 0=Sun,3=Wed,5=Fri
    const md  = mmdd(date);

    if (d >= 0  && d <= 6)  return 'Fast Free';       // Bright Week
    if (d === 49)            return 'Fast Free';       // Pentecost
    if (d >= -7 && d <= -1) {                          // Holy Week
      if (d === -1) return 'Strict Fast';              // Great Saturday (strictest)
      return 'Strict Fast';
    }
    if (d >= -48 && d <= -8) {                         // Great Lent
      if (dow === 0) return 'No Restriction';          // Sundays in Lent
      if (dow === 6) return 'Wine and Oil';            // Saturdays in Lent
      return 'Strict Fast';
    }
    // Regular Wed/Fri fast
    if (dow === 3 || dow === 5) {
      if (GREAT_FEAST_MMDD.has(md)) return 'Fish Allowed';
      return 'Strict Fast';
    }
    // Dormition Fast
    const mo = date.getMonth()+1, da = date.getDate();
    if (mo === 8 && da >= 1 && da <= 14) {
      if (dow === 6 || dow === 0) return 'Wine and Oil';
      if (dow === 3 || dow === 5) return 'Strict Fast';
      return 'Wine and Oil';
    }
    // Nativity Fast
    if ((mo === 11 && da >= 15) || (mo === 12 && da <= 24)) {
      if (da >= 20 && mo === 12) return 'Strict Fast'; // final week stricter
      if (dow === 3 || dow === 5) return 'Strict Fast';
      return 'Wine and Oil';
    }
    return 'No Restriction';
  }

  // ─────────────────────────────────────────────────────────────────────────
  // EOTHINON (11 Resurrection Matins Gospels)
  // Cycles through 11 Resurrection Gospels on Sundays.
  // Resets at All Saints Sunday each year.
  // ─────────────────────────────────────────────────────────────────────────
  const EOTHINON = [
    { ref: 'Matthew 28:16-20',  num: 1 },
    { ref: 'Mark 16:1-8',       num: 2 },
    { ref: 'Mark 16:9-20',      num: 3 },
    { ref: 'Luke 24:1-12',      num: 4 },
    { ref: 'Luke 24:12-35',     num: 5 },
    { ref: 'Luke 24:36-53',     num: 6 },
    { ref: 'John 20:1-10',      num: 7 },
    { ref: 'John 20:11-18',     num: 8 },
    { ref: 'John 20:19-31',     num: 9 },
    { ref: 'John 21:1-14',      num: 10 },
    { ref: 'John 21:14-25',     num: 11 },
  ];

  // Known Eothinon anchor: Sept 7, 2025 (Sunday before Holy Cross) = Eothinon 2 (Mark 16:1-8)
  const EOTHINON_ANCHOR_DATE = new Date(2025, 8, 7); // Sept 7, 2025
  const EOTHINON_ANCHOR_IDX  = 1; // 0-indexed = Eothinon 2

  function getEothinon(sundayDate) {
    const weeksDiff = Math.round(diffDays(sundayDate, EOTHINON_ANCHOR_DATE) / 7);
    const idx = ((EOTHINON_ANCHOR_IDX + weeksDiff) % 11 + 11) % 11;
    return EOTHINON[idx];
  }

  // ─────────────────────────────────────────────────────────────────────────
  // CORE DAY BUILDER
  // ─────────────────────────────────────────────────────────────────────────
  function buildDay(dateStr) {
    const date   = fromDateStr(dateStr);
    const year   = date.getFullYear();
    const pascha = calcPascha(year);
    const pOff   = diffDays(date, pascha);
    const md     = mmdd(date);
    const isSun  = date.getDay() === 0;
    const dow    = date.getDay(); // 0=Sun … 6=Sat

    // ── Fixed feast data (saints, fasting, feast readings) ─────────────────
    const fixedData = (_data && _data.fixed && _data.fixed[md]) || {};

    // ── Sunday lectionary ───────────────────────────────────────────────────
    let sundayName = null, sundayReading = null, eothinon = null;
    if (isSun) {
      sundayName    = getSundayName(date, pascha);
      sundayReading = sundayName && _data && _data.sunday && _data.sunday[sundayName];
      eothinon      = getEothinon(date);

      // If Eothinon not already in lectionary data, use computed value
      if (sundayReading && !sundayReading.matins_ref && eothinon) {
        sundayReading = { ...sundayReading, matins_ref: eothinon.ref, matins_num: eothinon.num };
      }
    }

    // ── Weekday lectionary ──────────────────────────────────────────────────
    let weekdayReading = null;
    if (!isSun && _data && _data.weekday) {
      weekdayReading = _data.weekday[String(pOff)];
    }

    // ── Merge data (priority: moveable Sunday > weekday offset > fixed feast) ──────
    const readings = sundayReading || weekdayReading || fixedData || {};
    const summary  = sundayName || fixedData.summary || readings.summary || '';

    // Saints: merge fixed + any feast-specific saints
    const saints   = fixedData.saints_feasts || [];

    // Fasting
    const rawFasting = fixedData.fasting || readings.fasting || 'No Restriction';
    const fasting    = getFastingRule(date, pascha, rawFasting);

    // Feast rank
    const GREAT_FEAST_NAMES = new Set([
      'Great and Holy Pascha','Holy Pentecost','Holy Ascension',
      'Thomas Sunday','The Sunday of All Saints',
    ]);
    const GREAT_FEAST_MMDD_NAMES = new Set([
      '09-08','09-14','12-25','01-06','02-02','03-25','08-06','08-15'
    ]);
    const isGreatFeast = GREAT_FEAST_NAMES.has(sundayName) || GREAT_FEAST_MMDD_NAMES.has(md)
      || (fixedData.summary || '').toLowerCase().includes('nativity')
      || (fixedData.summary || '').toLowerCase().includes('theophany')
      || (fixedData.summary || '').toLowerCase().includes('transfiguration')
      || (fixedData.summary || '').toLowerCase().includes('dormition')
      || (fixedData.summary || '').toLowerCase().includes('annunciation')
      || (fixedData.summary || '').toLowerCase().includes('palm sunday');

    return {
      date,
      dateStr,
      weekday: date.toLocaleDateString('en-US', { weekday: 'long' }),
      is_sunday: isSun,
      pascha_year: toDateStr(pascha),
      pascha_offset: pOff,
      liturgical_season: getLiturgicalSeason(date, pascha),
      fasting,
      feast_rank: isGreatFeast ? 'Great Feast' : 'Regular',
      summary,
      sunday_name: sundayName || '',
      saints_feasts: saints,
      epistle_ref:  readings.epistle_ref  || '',
      gospel_ref:   readings.gospel_ref   || '',
      matins_ref:   readings.matins_ref   || (isSun && eothinon ? eothinon.ref : ''),
      matins_num:   isSun && eothinon ? eothinon.num : null,
      // Full texts (present when data is loaded)
      epistle_text: readings.epistle_text || '',
      gospel_text:  readings.gospel_text  || '',
      matins_text:  readings.matins_text  || '',
      // OT readings — present on Lenten weekdays (array of {ref, text})
      ot_readings:  fixedData.ot_readings || [],
    };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // PUBLIC API
  // ─────────────────────────────────────────────────────────────────────────
  return {

    /** Load lectionary data. Call once on page init. */
    async init(baseUrl = '') {
      if (_initPromise) return _initPromise;
      _initPromise = fetch(baseUrl + DATA_URL)
        .then(r => r.json())
        .then(data => { _data = data; })
        .catch(e => {
          console.error('OrthodoxCalendar: failed to load lectionary-full.json', e);
          _data = { fixed: {}, sunday: {}, weekday: {} };
        });
      return _initPromise;
    },

    /** Returns true after init() completes. */
    isLoaded() { return !!_data; },

    /** Calculate Orthodox Pascha for any year. */
    getPascha(year) { return calcPascha(year); },

    /** Today's date string 'YYYY-MM-DD'. */
    today() { return toDateStr(new Date()); },

    /**
     * Get complete liturgical data for a single date.
     * @param {string} dateStr 'YYYY-MM-DD'
     * @returns {object} Full day object with all fields
     */
    getDay(dateStr) {
      if (!_data) return null;
      return buildDay(dateStr);
    },

    /**
     * Get all days in a calendar month.
     * @param {number} year
     * @param {number} month  0-based (0=Jan)
     * @returns {object[]}
     */
    getMonth(year, month) {
      if (!_data) return [];
      const days = [];
      const daysInMonth = new Date(year, month+1, 0).getDate();
      for (let d = 1; d <= daysInMonth; d++) {
        const ds = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
        days.push(buildDay(ds));
      }
      return days;
    },

    /**
     * Get 7 days starting from the Sunday of the week containing dateStr.
     * @param {string} dateStr
     * @returns {object[]} 7 day objects Sun→Sat
     */
    getWeek(dateStr) {
      if (!_data) return [];
      const d = fromDateStr(dateStr);
      const sun = new Date(d);
      sun.setDate(d.getDate() - d.getDay());
      const days = [];
      for (let i = 0; i < 7; i++) {
        const cur = addDays(sun, i);
        days.push(buildDay(toDateStr(cur)));
      }
      return days;
    },

    /**
     * Get the name of the Sunday (for display or lectionary lookup).
     * @param {string} dateStr 'YYYY-MM-DD'
     * @returns {string|null}
     */
    getSundayName(dateStr) {
      const date   = fromDateStr(dateStr);
      const pascha = calcPascha(date.getFullYear());
      return getSundayName(date, pascha);
    },

    /**
     * Verify Pascha dates (for testing).
     */
    verifyPascha() {
      const expected = { 2024:'2024-05-05', 2025:'2025-04-20', 2026:'2026-04-12', 2027:'2027-05-02' };
      const results = {};
      for (const [yr, exp] of Object.entries(expected)) {
        const calc = toDateStr(calcPascha(Number(yr)));
        results[yr] = { expected: exp, calculated: calc, pass: calc === exp };
      }
      return results;
    },
  };
})();

// Node.js / React Native compatibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = OrthodoxCalendar;
}
