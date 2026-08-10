/* ============================================================
   HOROLOGION — app shell
   Four tabs: Today, Rule, Hours, Recenter.
   Content lives in prayers.js; the calendar lives in feast.js.
   ============================================================ */

/* ---- storage that never throws ---- */
var mem = {};
var store = {
  get: function(k, d){ try { var v = localStorage.getItem(k); return v === null ? d : v; } catch(e){ return (k in mem) ? mem[k] : d; } },
  set: function(k, v){ try { localStorage.setItem(k, v); } catch(e){ mem[k] = v; } }
};

var app = document.getElementById('app');
var tabbar = document.getElementById('tabbar');
var view = {name:'today'};

function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

/* Names the reader has set in Settings, substituted into the prayer texts.
   Escaping happens after substitution, so a name is never treated as markup. */
function personalize(t){
  t = String(t);
  if(t.indexOf('(') === -1) return t;
  var p = patronName();
  var l = store.get('living', '').trim();
  var d = store.get('departed', '').trim();
  if(p) t = t.replace(/\(Name\)/g, p);
  t = t.replace(/\(Living\)/g,   l || 'whom I now call to mind');
  t = t.replace(/\(Departed\)/g, d || 'whom I now call to mind');
  return t;
}

/* The three-bar cross: titulus, crossbeam, and the footrest raised
   toward the thief at the Lord's right hand. */
function CROSS(){
  return '<svg viewBox="0 0 20 32" fill="none" stroke="currentColor" stroke-width="1.5" '
       + 'stroke-linecap="square" aria-hidden="true" focusable="false">'
       + '<path d="M10 2.5V29.5"/><path d="M6.2 7.5H13.8"/>'
       + '<path d="M2.8 13.5H17.2"/><path d="M4.6 21.4L15.4 24.8"/></svg>';
}
var ICONS = {
  today:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.2v2.6M12 19.2v2.6M2.2 12h2.6M19.2 12h2.6M5.1 5.1l1.8 1.8M17.1 17.1l1.8 1.8M18.9 5.1l-1.8 1.8M6.9 17.1l-1.8 1.8"/></svg>',
  rule:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M4 4.6h6.4c1 0 1.6.6 1.6 1.5v13c0-.9-.6-1.5-1.6-1.5H4zM20 4.6h-6.4c-1 0-1.6.6-1.6 1.5v13c0-.9.6-1.5 1.6-1.5H20z"/></svg>',
  hours:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><circle cx="12" cy="12" r="8.6"/><path d="M12 7v5.2l3.4 2"/></svg>',
  recenter:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" aria-hidden="true"><path d="M12 20.4S4.2 15.6 4.2 10.1A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7.8 2.1c0 5.5-7.8 10.3-7.8 10.3z"/></svg>'
};

var COG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">'
  + '<circle cx="12" cy="12" r="3.1"/>'
  + '<path d="M19.4 14.4a1.6 1.6 0 0 0 .32 1.77l.06.06a1.9 1.9 0 1 1-2.7 2.7l-.05-.06a1.6 1.6 0 0 0-1.78-.32 1.6 1.6 0 0 0-.97 1.47v.17a1.9 1.9 0 1 1-3.8 0v-.09a1.6 1.6 0 0 0-1.05-1.47 1.6 1.6 0 0 0-1.77.32l-.06.06a1.9 1.9 0 1 1-2.7-2.7l.06-.06a1.6 1.6 0 0 0 .32-1.77 1.6 1.6 0 0 0-1.47-.98h-.17a1.9 1.9 0 1 1 0-3.8h.09a1.6 1.6 0 0 0 1.47-1.05 1.6 1.6 0 0 0-.32-1.77l-.06-.06a1.9 1.9 0 1 1 2.7-2.7l.06.06a1.6 1.6 0 0 0 1.77.32h.08A1.6 1.6 0 0 0 10.5 3.6v-.17a1.9 1.9 0 1 1 3.8 0v.09a1.6 1.6 0 0 0 .97 1.47 1.6 1.6 0 0 0 1.78-.32l.05-.06a1.9 1.9 0 1 1 2.7 2.7l-.06.06a1.6 1.6 0 0 0-.32 1.77v.08a1.6 1.6 0 0 0 1.47.97h.17a1.9 1.9 0 1 1 0 3.8h-.09a1.6 1.6 0 0 0-1.47.97z"/></svg>';

var ARROW_UP = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';

var TABS = [
  {id:'today',    label:'Today'},
  {id:'rule',     label:'Rule'},
  {id:'hours',    label:'Hours'},
  {id:'recenter', label:'Recenter'}
];

function renderTabs(){
  var cur = tabOf(view);
  tabbar.innerHTML = TABS.map(function(t){
    return '<button onclick="tab(\'' + t.id + '\')"' + (cur === t.id ? ' aria-current="page"' : '') + '>'
         + ICONS[t.id] + '<span>' + t.label + '</span><span class="tabmark"></span></button>';
  }).join('');
}
function tabOf(v){
  if(v.name === 'today' || v.name === 'rope' || v.name === 'about'
     || v.name === 'readings' || v.name === 'settings') return 'today';
  if(v.name === 'rule' || v.name === 'hours' || v.name === 'recenter') return v.name;
  var c = v.cat;
  if(c === 'recenter') return 'recenter';
  if(RULE_CATS.indexOf(c) > -1) return 'rule';
  if(HOUR_CATS.indexOf(c) > -1) return 'hours';
  return 'today';
}

var RULE_CATS = ['morning','evening','occasional','commem'];
var HOUR_CATS = ['midnight','first','third','sixth','ninth','compline','vespers','matins','typika'];

/* ---- the day ---- */
function clockStr(){ return new Date().toLocaleTimeString([], {hour:'numeric', minute:'2-digit'}); }
function dayIndex(){
  var d = new Date(), s = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d - s) / 86400000);
}
function inWindow(o){
  if(!o.key || o.from === undefined) return false;
  var h = new Date().getHours();
  return h >= o.from && h < o.to;
}

function feastCard(){
  var f = CAL.today(new Date());
  var d = f.date.toLocaleDateString([], {weekday:'long', month:'long', day:'numeric'});
  var lvl = f.fast.level;
  var h = '<div class="feast" data-rank="' + esc(f.rank || '') + '">'
        + '<div class="fdate">' + esc(d) + '</div>';
  if(f.title) h += '<div class="ftitle">' + esc(f.title) + '</div>';
  if(f.saints && f.saints.length){
    h += '<div class="fsaints">' + f.saints.slice(0, 4).map(function(x){
      return '\u2629 ' + esc(x);
    }).join('<br>') + '</div>';
  }
  h += '<div class="fmeta fast-' + esc(lvl) + '"><span><b>' + esc(f.fast.text) + '</b></span>';
  if(f.season) h += '<span>' + esc(f.season) + '</span>';
  if(f.tone) h += '<span>Tone ' + f.tone + '</span>';
  h += '<span>' + esc(clockStr()) + '</span></div></div>';

  if(f.readings && f.readings.length){
    h += '<button class="readings" onclick="go(\'readings\')">'
       + '<span class="rd-txt"><span class="t">The readings of the day</span>'
       + '<span class="d">' + f.readings.map(function(r){ return esc(r.ref); }).join(' \u00b7 ') + '</span></span>'
       + '<span class="rc-go">\u2192</span></button>';
  }
  return h;
}

/* ---- readings of the day (present only with the calendar engine) ---- */
function renderReadings(){
  var f = CAL.today(new Date());
  var h = topbar('Readings', 'tab(\'today\')');
  h += '<div class="reader"><div class="eyebrow kicker">' + esc(f.title || '') + '</div>'
     + '<h2>The readings of the day</h2>'
     + '<div class="by">Appointed by the lectionary</div>';
  if(!f.readings || !f.readings.length){
    h += '<p>No readings are available offline. They appear when the calendar engine is installed alongside the app.</p>';
  } else {
    f.readings.forEach(function(r){
      h += '<div class="sub-h">' + esc(r.type) + (r.num ? ' \u2014 Eothinon ' + esc(r.num) : '') + '</div>';
      h += '<div class="rubric">' + esc(r.ref) + '</div>';
      if(r.text) h += '<p>' + esc(r.text) + '</p>';
      else h += '<p class="verse">Text not available offline.</p>';
    });
  }
  h += '<div class="endmark">' + CROSS() + '</div></div>';
  paint(h);
}

/* ---- Today ---- */
function renderToday(){
  var w = WORD[dayIndex() % WORD.length];
  var h = '<div class="mast"><div><h1><span class="cross">' + CROSS() + '</span>Horologion</h1></div>'
        + '<button class="cog" onclick="go(\'settings\')" aria-label="Settings">' + COG + '</button></div>';

  h += feastCard();

  var now = currentOffice();
  if(now){
    h += '<div class="spine" style="margin-bottom:1.8rem">'
       + '<button class="hour" data-now="1" onclick="go(\'' + now.key + '\')">'
       + '<span class="nm">' + esc(now.name) + '<span class="nowtag">now</span>'
       + '<span class="sub">' + esc(now.sub) + '</span></span>'
       + '<span class="begin">Begin \u2192</span></button></div>';
  }

  h += '<div class="word"><div class="eyebrow" style="margin-bottom:.9rem">The day\u2019s word</div>'
     + '<blockquote>' + esc(w.v) + '</blockquote>'
     + '<div class="attr">' + esc(w.r) + '</div>'
     + '<div class="saying">' + esc(w.s) + '<div class="attr">' + esc(w.a) + '</div></div></div>';

  h += '<div class="sectionhead">Intercessions</div>';
  h += '<div class="grid">'
     + tile('theotokos','To the Theotokos','Six prayers to the Mother of God')
     + tile('angel','To My Guardian Angel','Morning, evening, troparion')
     + tile('patron', patronLabel(), patronHint())
     + '<button class="tile" onclick="go(\'rope\')"><span class="t">Prayer Rope</span><span class="d">Count the Jesus Prayer</span></button>'
     + '</div>';

  h += '<div class="foot">Rubrics in red are instructions, not spoken.</div>';

  paint(h);
}
function patronName(){
  /* Accept "Nicholas", "St. Nicholas" or "Saint Nicholas" alike. */
  var p = store.get('patron','').trim().replace(/^(st\.?|saint)\s+/i, '');
  return p ? p.charAt(0).toUpperCase() + p.slice(1) : '';
}
function patronLabel(){
  var p = patronName();
  return p ? 'To St. ' + p : 'To My Patron Saint';
}
function patronHint(){
  var n = patronName();
  if(!n) return 'Set your saint in Settings';
  return SAINT_LIB[n.toLowerCase().split(/\s+/)[0]]
    ? 'Troparion and prayer'
    : 'Prayer to the saint whose name you bear';
}
function tile(k, t, d){
  return '<button class="tile" onclick="go(\'' + k + '\')"><span class="t">' + t + '</span><span class="d">' + d + '</span></button>';
}
function currentOffice(){
  var all = [];
  CYCLE.forEach(function(g){ g.rows.forEach(function(r){ all.push(r); }); });
  RULE.forEach(function(r){ all.push(r); });
  for(var i = 0; i < all.length; i++){ if(inWindow(all[i])) return all[i]; }
  return null;
}

/* ---- Rule ---- */
function renderRule(){
  var h = '<div class="pagehead"><h2>Your rule of prayer</h2>'
        + '<p>Kept at home, from the prayer book. For most laymen this is the whole of the daily rule, '
        + 'and its length is set with your spiritual father.</p></div>';
  h += '<div class="spine" style="margin-top:1.4rem">';
  RULE.forEach(function(o){ h += hourRow(o); });
  h += '</div>';
  h += '<div class="sectionhead">Through the day</div>';
  h += '<ul class="idx">' + PRAYERS.occasional.map(function(p, i){
    return '<li><button onclick="open_(\'occasional\',' + i + ')"><span class="n">\u00b7</span>'
         + '<span class="l">' + esc(p.title) + '<small>' + esc(p.by) + '</small></span></button></li>';
  }).join('')
  + '<li><button onclick="go(\'commem\')"><span class="n">\u00b7</span>'
  + '<span class="l">Those I Remember<small>The living and the departed, by name</small></span></button></li>'
  + '</ul>';
  paint(h);
}

/* ---- Hours ---- */
function renderHours(){
  var h = '<div class="pagehead"><h2>The daily cycle</h2>'
        + '<p>Served in church. The liturgical day begins at sunset, and the nine services fall into '
        + 'three groups of three. A layman is not obliged to read them.</p></div>';
  CYCLE.forEach(function(g){
    h += '<div class="grouplabel">' + esc(g.label) + '</div>';
    h += '<div class="spine">';
    g.rows.forEach(function(o){ h += hourRow(o); });
    h += '</div><p class="groupnote">' + esc(g.note) + '</p>';
  });
  h += '<div class="foot"><button class="footlink" onclick="go(\'about\')">Read how this book is arranged \u2192</button></div>';
  paint(h);
}
function hourRow(o){
  var on = inWindow(o) ? '1' : '0';
  return '<button class="hour" data-now="' + on + '" onclick="go(\'' + o.key + '\')">'
       + '<span class="nm">' + esc(o.name) + (on === '1' ? '<span class="nowtag">now</span>' : '')
       + '<span class="sub">' + esc(o.sub) + '</span></span>'
       + (on === '1' ? '<span class="begin">Begin \u2192</span>' : '<span class="tm">' + esc(o.time) + '</span>')
       + '</button>';
}

/* ---- category index ---- */
var SEQ = {morning:1, evening:1, midnight:1, compline:1, first:1, third:1, sixth:1, ninth:1, typika:1};

function renderList(cat, isRoot){
  var items = PRAYERS[cat] || [];
  if(items.length === 1){ return renderReader(cat, 0); }
  /* A tab's own root page needs no back button — the tab bar is the way out. */
  var h = isRoot
    ? '<div class="pagehead"><h2>' + esc(CATS[cat]) + '</h2></div>'
    : topbar(CATS[cat], 'tab(\'' + tabOf({name:'list', cat:cat}) + '\')');
  if(INTRO[cat]) h += '<p class="intro">' + esc(INTRO[cat]) + '</p>';
  h += '<ul class="idx">';
  items.forEach(function(p, i){
    h += '<li><button onclick="open_(\'' + cat + '\',' + i + ')">'
       + (SEQ[cat] ? '<span class="n">' + (i + 1 < 10 ? '0' : '') + (i + 1) + '</span>' : '<span class="n">\u00b7</span>')
       + '<span class="l">' + esc(p.title) + '<small>' + esc(p.by) + '</small></span></button></li>';
  });
  h += '</ul>';
  paint(h, listScroll[cat] || 0);
}
function topbar(title, backAction){
  return '<div class="topbar"><button class="back" onclick="' + backAction + '">\u2190 Back</button>'
       + '<span class="ttl">' + esc(title) + '</span>'
       + '<button class="homecross" onclick="tab(\'today\')" aria-label="Today">' + CROSS() + '</button>'
       + '<span class="prog"><i id="progbar"></i></span></div>';
}

/* ---- reader ---- */
function blockHTML(b){
  var c = personalize(b.c);
  if(b.t === 'r') return '<div class="rubric">' + esc(c) + '</div>';
  if(b.t === 'v') return '<p class="verse">' + esc(c) + '</p>';
  if(b.t === 'h') return '<div class="sub-h">' + esc(c) + '</div>';
  return '<p>' + esc(c) + (b.x ? '<span class="times">' + esc(b.x) + '</span>' : '') + '</p>';
}
function renderReader(cat, i){
  var items = PRAYERS[cat], p = items[i], many = items.length > 1;
  var back = many
    ? (cat === 'recenter' ? 'tab(\'recenter\')' : 'go(\'' + cat + '\')')
    : 'tab(\'' + tabOf({name:'read', cat:cat}) + '\')';
  var h = topbar(CATS[cat], back);
  h += '<div class="reader">';
  if(many) h += '<div class="eyebrow kicker">' + (i + 1) + ' of ' + items.length + '</div>';
  h += '<h2>' + esc(p.title) + '</h2><div class="by">' + esc(p.by) + '</div>';
  p.body.forEach(function(b){ h += blockHTML(b); });
  h += '<div class="endmark">' + CROSS() + '</div>';
  if(many){
    h += '<div class="pager">'
       + '<button ' + (i === 0 ? 'disabled' : 'onclick="open_(\'' + cat + '\',' + (i - 1) + ')"') + '>\u2190 Previous</button>'
       + '<button ' + (i === items.length - 1 ? 'disabled' : 'onclick="open_(\'' + cat + '\',' + (i + 1) + ')"') + '>Next \u2192</button>'
       + '</div>';
  }
  h += '</div>';
  paint(h);
}

/* ---- prayer rope ---- */
var rope = { n: parseInt(store.get('rope','0'), 10) || 0, goal: parseInt(store.get('ropegoal','100'), 10) || 100 };
function renderRope(){
  var h = topbar('Prayer Rope', 'tab(\'today\')');
  h += '<div class="rope"><div class="eyebrow">' + rope.goal + '-knot rule</div>'
     + '<div class="count">' + rope.n + '</div>'
     + '<div class="knot">' + (rope.n >= rope.goal ? 'rule complete' : (rope.goal - rope.n) + ' remaining') + '</div>'
     + '<button class="tapzone" onclick="knot()">Lord Jesus Christ, Son of God,<br>have mercy on me, a sinner.</button>'
     + '<div class="pager">'
     + [33,100,300].map(function(g){
         return '<button onclick="setGoal(' + g + ')"' + (rope.goal === g ? ' style="color:var(--gold);border-color:var(--gold-dim)"' : '') + '>' + g + '</button>';
       }).join('')
     + '</div><button class="reset" onclick="resetRope()">Start over</button>'
     + '<div class="foot">Tap the prayer each time you say it. The count is kept on this device only.</div></div>';
  paint(h);
}
function knot(){
  rope.n++;
  store.set('rope', String(rope.n));
  if(navigator.vibrate){ try { navigator.vibrate(rope.n % rope.goal === 0 ? [30,40,30] : 8); } catch(e){} }
  var c = document.querySelector('.count'), k = document.querySelector('.knot');
  if(c) c.textContent = rope.n;
  if(k) k.textContent = rope.n >= rope.goal ? 'rule complete' : (rope.goal - rope.n) + ' remaining';
}
function setGoal(g){ rope.goal = g; store.set('ropegoal', String(g)); renderRope(); }
function resetRope(){ rope.n = 0; store.set('rope','0'); renderRope(); }


/* ---- settings ---- */
function field(key, label, placeholder, hint){
  var v = store.get(key, '');
  return '<div class="field"><label for="f-' + key + '">' + esc(label) + '</label>'
       + '<input id="f-' + key + '" type="text" value="' + esc(v) + '" '
       + 'placeholder="' + esc(placeholder) + '" autocapitalize="words" autocomplete="off" '
       + 'spellcheck="false" oninput="setField(\'' + key + '\', this.value)">'
       + (hint ? '<div class="hint">' + esc(hint) + '</div>' : '') + '</div>';
}
/* Store on input but never re-render — re-rendering would steal focus mid-word. */
function setField(key, val){ store.set(key, val); }

function renderSettings(){
  var theme = document.documentElement.getAttribute('data-theme') === 'paper' ? 'paper' : 'vigil';
  var h = topbar('Settings', 'tab(\'today\')');
  h += '<div class="reader" style="padding-top:1.4rem">';

  h += '<div class="sectionhead" style="margin-top:0">Appearance</div>';
  h += '<div class="seg">'
     + '<button onclick="setTheme(\'vigil\')" aria-pressed="' + (theme === 'vigil') + '">Vigil</button>'
     + '<button onclick="setTheme(\'paper\')" aria-pressed="' + (theme === 'paper') + '">Paper</button>'
     + '</div>'
     + '<div class="hint" style="margin-bottom:.5rem">Vigil is dark, for a room lit by a lampada. Paper is light, for daylight.</div>';

  h += '<div class="sectionhead">Your commemorations</div>';
  h += field('patron', 'Patron saint', 'Nicholas',
             'The saint whose name you bear. Entered here, the name appears in the morning prayers and in the prayers to your patron.');
  h += field('living', 'The living', 'Names, separated by commas',
             'Read in the prayer for the living.');
  h += field('departed', 'The departed', 'Names, separated by commas',
             'Read in the prayer for the departed. Memory eternal.');
  h += '<div class="hint" style="margin:-.6rem 0 0">These names are kept on this device only. Nothing is sent anywhere, and nothing leaves your phone.</div>';

  h += '<div class="sectionhead">About this book</div>';
  h += '<button class="setlink" onclick="go(\'about\')">The shape of the day<span class="rc-go">\u2192</span></button>';
  h += '<button class="setlink" onclick="go(\'patron\')">Prayers to your patron saint<span class="rc-go">\u2192</span></button>';
  h += '<button class="setlink" onclick="go(\'commem\')">Those I remember<span class="rc-go">\u2192</span></button>';

  h += '<div class="foot">Traditional English in the received order. Rubrics in red are instructions, not spoken.<br>'
     + 'The calendar computes Pascha offline, so the app works with no connection.</div>';
  h += '</div>';
  paint(h);
}
function setTheme(t){
  document.documentElement.setAttribute('data-theme', t);
  store.set('theme', t);
  var m = document.querySelector('meta[name="theme-color"]');
  if(m) m.setAttribute('content', t === 'paper' ? '#E8E1D1' : '#12100D');
  render();
}

/* ---- scroll to top ---- */
var toTopEl = null;
function makeToTop(){
  if(toTopEl || typeof document.createElement !== 'function') return;
  toTopEl = document.createElement('button');
  if(!toTopEl || !toTopEl.setAttribute) { toTopEl = null; return; }
  toTopEl.className = 'totop';
  toTopEl.setAttribute('aria-label', 'Back to top');
  toTopEl.innerHTML = ARROW_UP;
  toTopEl.onclick = function(){
    try { window.scrollTo({top:0, behavior:'smooth'}); } catch(e){ window.scrollTo(0,0); }
  };
  document.body.appendChild(toTopEl);
}
function syncToTop(){
  if(!toTopEl) return;
  var deep = window.scrollY > 700;
  if(deep) toTopEl.classList.add('on'); else toTopEl.classList.remove('on');
}

/* ---- screen wake lock while praying ---- */
var lock = null;
function holdScreen(on){
  if(!('wakeLock' in navigator)) return;
  if(on){
    if(lock) return;
    navigator.wakeLock.request('screen').then(function(l){
      lock = l;
      l.addEventListener('release', function(){ lock = null; });
    }).catch(function(){});
  } else if(lock){
    try { lock.release(); } catch(e){}
    lock = null;
  }
}
document.addEventListener('visibilitychange', function(){
  if(document.visibilityState === 'visible' && (view.name === 'read' || view.name === 'rope')) holdScreen(true);
});

/* ---- reading progress ---- */
function onScroll(){
  var bar = document.getElementById('progbar');
  if(!bar) return;
  var max = document.body.scrollHeight - window.innerHeight;
  bar.style.width = (max > 40 ? Math.min(100, (window.scrollY / max) * 100) : 0) + '%';
}
function onScrollAll(){ onScroll(); syncToTop(); }
window.addEventListener('scroll', onScrollAll, {passive:true});

/* ---- theme ---- */
function toggleTheme(){
  var t = document.documentElement.getAttribute('data-theme') === 'paper' ? 'vigil' : 'paper';
  document.documentElement.setAttribute('data-theme', t);
  store.set('theme', t);
  var m = document.querySelector('meta[name="theme-color"]');
  if(m) m.setAttribute('content', t === 'paper' ? '#E8E1D1' : '#12100D');
  render();
}

/* ---- navigation ---- */
var listScroll = {};
function paint(html, scrollTo){
  app.innerHTML = html;
  app.className = 'wrap fade';
  renderTabs();
  window.scrollTo(0, scrollTo || 0);
  onScroll(); syncToTop();
}
function tab(id){
  if(view.name === 'list') listScroll[view.cat] = window.scrollY;
  view = {name:id};
  push(); render();
}
function go(k){
  if(view.name === 'list') listScroll[view.cat] = window.scrollY;
  if(k === 'rope' || k === 'readings' || k === 'settings'){ view = {name:k}; }
  else if(k === 'today' || k === 'rule' || k === 'hours'){ view = {name:k}; }
  else { view = {name:'list', cat:k}; }
  push(); render();
}
function open_(cat, i){
  if(view.name === 'list') listScroll[cat] = window.scrollY;
  view = {name:'read', cat:cat, i:i};
  push(); render();
}
function push(){
  try { history.pushState({v:view}, '', location.pathname + location.search); } catch(e){}
}
window.addEventListener('popstate', function(e){
  view = (e.state && e.state.v) ? e.state.v : {name:'today'};
  render();
});

/* The patron slot is regenerated each render so a name typed in Settings
   is reflected immediately, in the tile label and in the prayers alike. */
function buildPatron(){
  var n = patronName();
  var key = n.toLowerCase().split(/\s+/)[0];
  if(!n){ PRAYERS.patron = [PATRON_UNSET]; CATS.patron = 'My Patron Saint'; return; }
  var list = (SAINT_LIB[key] || []).slice();
  list.push(PATRON_PRAYER);
  PRAYERS.patron = list;
  CATS.patron = 'To St. ' + n;
}

function render(){
  buildPatron();
  holdScreen(view.name === 'read' || view.name === 'rope');
  if(view.name === 'today') renderToday();
  else if(view.name === 'rule') renderRule();
  else if(view.name === 'hours') renderHours();
  else if(view.name === 'recenter') renderList('recenter', true);
  else if(view.name === 'rope') renderRope();
  else if(view.name === 'about') renderList('about');
  else if(view.name === 'readings') renderReadings();
  else if(view.name === 'settings') renderSettings();
  else if(view.name === 'list') renderList(view.cat);
  else renderReader(view.cat, view.i);
}

/* ---- boot ---- */
document.documentElement.setAttribute('data-theme', store.get('theme','vigil'));

/* Home-screen shortcuts arrive as ./?go=morning */
var start = {name:'today'};
try {
  var q = (location.search.match(/[?&]go=([a-z]+)/) || [])[1];
  if(q === 'recenter' || q === 'rule' || q === 'hours') start = {name:q};
  else if(q && PRAYERS[q]) start = {name:'list', cat:q};
} catch(e){}
view = start;

try { history.replaceState({v:view}, '', location.pathname); } catch(e){}
makeToTop();
render();
CAL.ready(function(){ if(view.name === 'today') renderToday(); });
setInterval(function(){ if(view.name === 'today') renderToday(); }, 60000);
