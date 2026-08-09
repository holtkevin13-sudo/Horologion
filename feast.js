/* ============================================================
   HOROLOGION — the calendar

   Everything here works offline. Pascha is computed with the
   Julian paschalion, and the movable cycle is derived from it,
   so the app knows the season with no network at all.

   Dates follow the civil (Gregorian) calendar. If your parish
   keeps the Julian reckoning for fixed feasts, set
   CAL.oldCalendar = true below and fixed dates shift by 13 days.

   To layer your own commemorations on top of this, see
   CAL.provider at the bottom of the file.
   ============================================================ */

var CAL = (function(){

  var oldCalendar = false;   // true = Julian reckoning for fixed feasts

  function ymd(d){ return d.getFullYear() + '-' + pad(d.getMonth()+1) + '-' + pad(d.getDate()); }
  function pad(n){ return n < 10 ? '0' + n : String(n); }
  function addDays(d, n){ var x = new Date(d.getTime()); x.setDate(x.getDate() + n); return x; }
  function daysBetween(a, b){
    var ms = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())
           - Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    return Math.round(ms / 86400000);
  }

  /* ---- The paschalion ----------------------------------------
     Meeus's Julian algorithm. Returns Orthodox Pascha on the
     civil calendar. The 13-day offset holds for 1900-2099.     */
  function pascha(year){
    var a = year % 4, b = year % 7, c = year % 19;
    var d = (19 * c + 15) % 30;
    var e = (2 * a + 4 * b - d + 34) % 7;
    var month = Math.floor((d + e + 114) / 31);
    var day = ((d + e + 114) % 31) + 1;
    var julian = new Date(year, month - 1, day);
    return addDays(julian, 13);
  }

  /* ---- Movable cycle, counted from Pascha ---- */
  var MOVABLE = [
    [-70, 'Sunday of the Publican and the Pharisee', 'sunday'],
    [-63, 'Sunday of the Prodigal Son', 'sunday'],
    [-57, 'Saturday of Souls', 'commem'],
    [-56, 'Sunday of the Last Judgment (Meatfare)', 'sunday'],
    [-49, 'Forgiveness Sunday (Cheesefare)', 'sunday'],
    [-48, 'Clean Monday \u2014 Great Lent begins', 'season'],
    [-42, 'Sunday of Orthodoxy', 'sunday'],
    [-35, 'Sunday of St. Gregory Palamas', 'sunday'],
    [-28, 'Sunday of the Holy Cross', 'sunday'],
    [-21, 'Sunday of St. John Climacus', 'sunday'],
    [-14, 'Sunday of St. Mary of Egypt', 'sunday'],
    [ -8, 'Lazarus Saturday', 'feast'],
    [ -7, 'Palm Sunday', 'great'],
    [ -6, 'Great and Holy Monday', 'holyweek'],
    [ -5, 'Great and Holy Tuesday', 'holyweek'],
    [ -4, 'Great and Holy Wednesday', 'holyweek'],
    [ -3, 'Great and Holy Thursday', 'holyweek'],
    [ -2, 'Great and Holy Friday', 'holyweek'],
    [ -1, 'Great and Holy Saturday', 'holyweek'],
    [  0, 'PASCHA \u2014 The Resurrection of Christ', 'pascha'],
    [  1, 'Bright Monday', 'bright'],
    [  2, 'Bright Tuesday', 'bright'],
    [  3, 'Bright Wednesday', 'bright'],
    [  4, 'Bright Thursday', 'bright'],
    [  5, 'Bright Friday', 'bright'],
    [  6, 'Bright Saturday', 'bright'],
    [  7, 'Thomas Sunday (Antipascha)', 'sunday'],
    [  9, 'Radonitsa \u2014 commemoration of the departed', 'commem'],
    [ 39, 'The Ascension of the Lord', 'great'],
    [ 48, 'Saturday of Souls before Pentecost', 'commem'],
    [ 49, 'Pentecost \u2014 the Descent of the Holy Spirit', 'great'],
    [ 50, 'Monday of the Holy Spirit', 'feast'],
    [ 56, 'Sunday of All Saints', 'sunday'],
    [ 57, 'The Apostles\u2019 Fast begins', 'season'],
    [ 63, 'Sunday of All Saints of Russia', 'sunday']
  ];

  /* ---- Fixed feasts. Great Feasts marked 'great'. ---- */
  var FIXED = {
    '09-08': ['The Nativity of the Most Holy Theotokos', 'great'],
    '09-14': ['The Universal Elevation of the Precious Cross', 'great'],
    '11-21': ['The Entry of the Theotokos into the Temple', 'great'],
    '12-25': ['The Nativity of our Lord Jesus Christ', 'great'],
    '01-06': ['The Theophany of our Lord', 'great'],
    '02-02': ['The Meeting of the Lord in the Temple', 'great'],
    '03-25': ['The Annunciation of the Most Holy Theotokos', 'great'],
    '08-06': ['The Transfiguration of our Lord', 'great'],
    '08-15': ['The Dormition of the Most Holy Theotokos', 'great'],
    '01-01': ['The Circumcision of the Lord; St. Basil the Great', 'feast'],
    '01-07': ['The Synaxis of St. John the Forerunner', 'feast'],
    '01-30': ['The Three Hierarchs', 'feast'],
    '04-23': ['St. George the Great Martyr', 'feast'],
    '05-21': ['Sts. Constantine and Helen', 'feast'],
    '06-24': ['The Nativity of St. John the Forerunner', 'feast'],
    '06-29': ['Sts. Peter and Paul, the Chief Apostles', 'feast'],
    '07-20': ['The Holy Prophet Elias', 'feast'],
    '08-29': ['The Beheading of St. John the Forerunner', 'feast'],
    '09-24': ['St. Silouan the Athonite', 'feast'],
    '10-01': ['The Protection of the Most Holy Theotokos', 'feast'],
    '11-08': ['The Synaxis of the Archangel Michael', 'feast'],
    '11-15': ['The Nativity Fast begins', 'season'],
    '12-06': ['St. Nicholas the Wonderworker', 'feast'],
    '08-01': ['The Dormition Fast begins', 'season'],
    '01-17': ['St. Anthony the Great', 'feast'],
    '03-09': ['The Forty Martyrs of Sebaste', 'feast'],
    '05-08': ['St. John the Theologian', 'feast'],
    '07-05': ['St. Sergius of Radonezh', 'feast'],
    '10-26': ['St. Demetrius the Great Martyr', 'feast'],
    '12-04': ['St. Barbara the Great Martyr', 'feast']
  };

  /* ---- Fasting ---- */
  function fastOf(date, p, rank, key0){
    var mm = date.getMonth(), dd = date.getDate();
    // The twelve days of the Nativity
    if((mm === 11 && dd >= 25) || (mm === 0 && dd <= 4))
      return {level:'none', text:'Christmastide \u2014 fast-free'};
    var off = daysBetween(p, date);
    var dow = date.getDay();
    var key = pad(date.getMonth()+1) + '-' + pad(date.getDate());

    // Two feasts are kept as strict fasts despite their rank
    if(key === '09-14') return {level:'strict', text:'Elevation of the Cross \u2014 strict fast'};
    if(key === '08-29') return {level:'strict', text:'Beheading of the Forerunner \u2014 strict fast'};
    // A Great Feast outside Lent and the Dormition fast releases the fast
    if((rank === 'great' || rank === 'pascha') && !(off >= -48 && off <= -1) && !(mm === 7 && dd <= 14))
      return {level:'none', text:'Great Feast \u2014 fast released'};
    if(off === -7) return {level:'light', text:'Palm Sunday \u2014 fish permitted'};

    if(off >= 1 && off <= 7) return {level:'none', text:'Bright Week \u2014 no fasting'};
    if(off >= 50 && off <= 56) return {level:'none', text:'Fast-free week after Pentecost'};
    if(off >= -48 && off <= -1) return {level:'strict', text:'Great Lent'};
    if(off >= -49 && off <= -43) return {level:'light', text:'Cheesefare week \u2014 no meat'};
    if(off >= -62 && off <= -57) return {level:'none', text:'Fast-free week'};

    var apostles = daysBetween(addDays(p, 57), date);
    if(apostles >= 0 && date.getMonth() === 5 && date.getDate() <= 28)
      return {level:'fast', text:'The Apostles\u2019 Fast'};
    if(date.getMonth() === 7 && date.getDate() <= 14)
      return {level:'strict', text:'The Dormition Fast'};
    if((date.getMonth() === 10 && date.getDate() >= 15) || (date.getMonth() === 11 && date.getDate() <= 24))
      return {level:'fast', text:'The Nativity Fast'};
    if(key === '09-14' || key === '08-29') return {level:'strict', text:'Strict fast'};
    if(key === '01-05' || key === '12-24') return {level:'strict', text:'Eve of the feast \u2014 strict fast'};

    if(dow === 3 || dow === 5) return {level:'fast', text:'Wednesday and Friday fast'};
    return {level:'none', text:'No fast appointed'};
  }

  /* ---- Tone of the week (the eight-week Octoechos cycle) ---- */
  function tone(date, p){
    var off = daysBetween(p, date);
    if(off >= 0 && off <= 7) return null;                 // Bright Week has no tone
    var weeks = Math.floor((off - 8) / 7);
    if(off < 0) return null;                              // Lenten cycle differs
    var t = ((weeks % 8) + 8) % 8 + 1;
    return t > 8 ? t - 8 : t;
  }

  function shiftFixed(date){
    return oldCalendar ? addDays(date, -13) : date;
  }

  /* ---- The public call ---- */
  function day(date){
    date = date || new Date();
    var p = pascha(date.getFullYear());
    // Pascha of the previous year still governs early-January offsets
    if(daysBetween(p, date) < -80) p = pascha(date.getFullYear() - 1);

    var off = daysBetween(p, date);
    var out = { date:date, pascha:p, offset:off, titles:[], rank:'', tone:tone(date, p) };

    for(var i = 0; i < MOVABLE.length; i++){
      if(MOVABLE[i][0] === off){ out.titles.push(MOVABLE[i][1]); out.rank = MOVABLE[i][2]; }
    }
    var f = shiftFixed(date);
    var key = pad(f.getMonth()+1) + '-' + pad(f.getDate());
    if(FIXED[key]){
      out.titles.push(FIXED[key][0]);
      if(FIXED[key][1] === 'great' || !out.rank) out.rank = FIXED[key][1];
    }
    if(date.getDay() === 0 && !out.titles.length){
      out.titles.push('The Lord\u2019s Day');
      out.rank = 'sunday';
    }
    out.fast = fastOf(date, p, out.rank, key);
    out.title = out.titles.join(' \u00b7 ');
    return out;
  }

  /* ---- Orthodox Companion engine adapter ----------------------
     If calendar-engine-v2.js is present alongside the app, it is
     loaded and preferred: it carries the full saint calendar, the
     lectionary and the readings. The offline paschalion above
     remains the fallback, so nothing breaks if it is absent.

     The engine's contract, as used by orthodoxcompanion.com:
       OrthodoxCalendar.init()          -> Promise
       OrthodoxCalendar.today()         -> 'YYYY-MM-DD'
       OrthodoxCalendar.getDay(dateStr) -> day record
     Day record fields consumed here: summary, saints_feasts[],
     feast_rank, fasting, liturgical_season, is_sunday, sunday_name,
     ot_readings[{ref,text}], matins_ref/text/num, epistle_ref/text,
     gospel_ref/text, pascha_year.                                 */

  var engine = null, readyCbs = [], booted = false;

  /* Where the engine and its lectionary live, relative to index.html. */
  var ENGINE_SRC = './js/calendar-engine-v2.js';
  var DATA_BASE  = './';          // lectionary-full.json sits beside index.html

  /* The engine swallows a failed data fetch and installs an empty dataset,
     so confirm a real record came back before trusting it. */
  function adopt(){
    try {
      var probe = OrthodoxCalendar.getDay(OrthodoxCalendar.today());
      // Even without lectionary-full.json the engine computes the season,
      // the fasting rule and the Sunday name, so accept any real record.
      if(probe && (probe.summary || probe.liturgical_season || probe.epistle_ref || (probe.saints_feasts || []).length)){
        engine = OrthodoxCalendar;
      }
    } catch(e){}
  }

  function classifyFast(f, dateStr){
    if(!f || f === '' || f === 'No Restriction') return 'none';
    var l = f.toLowerCase();
    if(l.indexOf('fast free') > -1) return 'none';
    if(l.indexOf('complete') > -1 || l.indexOf('total abstinence') > -1) return 'strict';
    if(l.indexOf('fish') > -1) return 'light';
    if(l.indexOf('wine') > -1 || l.indexOf('oil') > -1) return 'fast';
    if(l.indexOf('strict') > -1 || l.indexOf('xerophagy') > -1 || l.indexOf('fast day') > -1) return 'strict';
    if(dateStr && dateStr.slice(5) === '01-05') return 'strict';
    return 'fast';
  }

  function clean(t){
    return String(t || '').replace(/\\"/g, '"').replace(/\\\//g, '').replace(/\s{2,}/g, ' ').trim();
  }

  /* Load the engine if it is there; resolve either way. */
  function boot(cb){
    if(booted){ cb(); return; }
    readyCbs.push(cb);
    if(readyCbs.length > 1) return;

    function done(){
      booted = true;
      var q = readyCbs; readyCbs = [];
      q.forEach(function(f){ try { f(); } catch(e){} });
    }
    if(typeof document === 'undefined'){ done(); return; }

    var el = document.createElement('script');
    el.src = ENGINE_SRC;
    el.async = true;
    el.onload = function(){
      if(typeof OrthodoxCalendar === 'undefined'){ done(); return; }
      try {
        // The engine resolves its data file against this base, not against
        // its own script URL, so it must be passed explicitly.
        var p = OrthodoxCalendar.init(DATA_BASE);
        if(p && p.then){
          p.then(function(){ adopt(); done(); }).catch(function(){ done(); });
        } else { adopt(); done(); }
      } catch(e){ done(); }
    };
    el.onerror = function(){ done(); };            // absent is fine
    document.head.appendChild(el);
  }

  /* Merge an engine record over the offline day. */
  function enrich(local, rec, dateStr){
    if(!rec) return local;
    var out = {};
    for(var k in local) out[k] = local[k];

    if(rec.summary) out.title = rec.summary;
    out.saints = (rec.saints_feasts || []).filter(function(x){ return x && x !== rec.summary; });
    if(rec.feast_rank === 'Great Feast') out.rank = 'great';
    else if(rec.is_sunday && !out.rank) out.rank = 'sunday';
    if(rec.sunday_name) out.sundayName = rec.sunday_name;
    if(rec.liturgical_season) out.season = rec.liturgical_season;
    /* The engine returns the literal string 'No Restriction' both when a day
       genuinely has no fast AND when it simply has no data for that date —
       and 53 dates a year (the Sundays of the source ICS period) have no
       fixed-table entry. On those days the offline rule is the better answer,
       so never let a bare 'No Restriction' override a fast we computed.
       An explicit 'Fast Free' is a real statement and is honoured. */
    if(rec.fasting){
      var bare = (rec.fasting === 'No Restriction');
      if(!(bare && local.fast && local.fast.level !== 'none')){
        out.fast = { level: classifyFast(rec.fasting, dateStr), text: rec.fasting };
      }
    }

    var r = [];
    (rec.ot_readings || []).forEach(function(o){
      if(o && o.ref) r.push({type:'Old Testament', ref:o.ref, text:clean(o.text)});
    });
    if(rec.matins_ref) r.push({type:'Matins Gospel', ref:rec.matins_ref, text:clean(rec.matins_text), num:rec.matins_num});
    if(rec.epistle_ref) r.push({type:'Epistle', ref:rec.epistle_ref, text:clean(rec.epistle_text)});
    if(rec.gospel_ref)  r.push({type:'Gospel',  ref:rec.gospel_ref,  text:clean(rec.gospel_text)});
    out.readings = r;
    out.source = 'engine';
    return out;
  }

  /* The call the app makes. Synchronous, always returns something. */
  function today(date){
    date = date || new Date();
    var local = day(date);
    if(!engine) return local;
    try {
      var ds = ymd(date);
      return enrich(local, engine.getDay(ds), ds);
    } catch(e){ return local; }
  }

  return {
    day: day,              // offline only
    today: today,          // offline, enriched by the engine when present
    ready: boot,
    pascha: pascha,
    ymd: ymd,
    classifyFast: classifyFast,
    get engine(){ return engine; },
    get loaded(){ return !!engine; },
    set enginePath(p){ ENGINE_SRC = p; },
    set dataBase(p){ DATA_BASE = p; },
    set oldCalendar(v){ oldCalendar = !!v; },
    get oldCalendar(){ return oldCalendar; }
  };
})();

if(typeof module !== 'undefined') module.exports = CAL;
