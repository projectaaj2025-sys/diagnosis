const requestedLanguage = new URLSearchParams(location.search).get('lang');
const playerLanguage = ['en','kk'].includes(requestedLanguage) ? requestedLanguage : 'ru';
const languageIndex = ['ru','en','kk'].indexOf(playerLanguage);
document.documentElement.lang = playerLanguage;
function instrumentText(text){return instrumentLabels[text]?.[languageIndex-1] ?? text}
function unit(text){return (playerLanguage==='en'?instrumentUnits:playerLanguage==='kk'?instrumentKkUnits:{})[text] ?? text}
const TAU = Math.PI * 2, D2R = Math.PI / 180, R2D = 180 / Math.PI;
const app = document.getElementById('app');
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

function fmt(x, n = 2) {
  if (x === null || x === undefined || !isFinite(x)) return '—';
  if (n === 0) return String(Math.round(x));
  let s = x.toFixed(n);
  if (s.indexOf('.') >= 0) s = s.replace(/0+$/, '').replace(/\.$/, '');
  s = s.replace(/^-0(\.0+)?$/, '0');
  return playerLanguage==='en'?s:s.replace('.', ',');   // русская запись: десятичный разделитель — запятая
}

function sci(x, n = 2) {
  if (!isFinite(x) || x === 0) return '0';
  const e = Math.floor(Math.log10(Math.abs(x)));
  const sup = String(e).replace(/[0-9-]/g, d => ({ '0': '\u2070', '1': '\u00b9', '2': '\u00b2', '3': '\u00b3', '4': '\u2074', '5': '\u2075', '6': '\u2076', '7': '\u2077', '8': '\u2078', '9': '\u2079', '-': '\u207b' }[d]));
  return fmt(x / Math.pow(10, e), n) + '\u00b710' + sup;
}

/* ------------------------- рисование на canvas ------------------------- */
/* ---------- страховка: ни одна надпись на canvas не выходит за кадр ---------- */
(function clampCanvasText() {
  const P = (typeof CanvasRenderingContext2D !== 'undefined') ? CanvasRenderingContext2D.prototype : null;
  if (!P || P.__clamped) return;
  const orig = P.fillText;
  P.fillText = function (txt, x, y) {
    try {
      if (this.canvas && this.canvas.dataset && this.canvas.dataset.freetext === '1') return orig.apply(this, arguments);
      const str = String(txt);
      const w = this.measureText(str).width;
      const m = (this.font || '').match(/(\d+(?:\.\d+)?)px/);
      const fs = m ? parseFloat(m[1]) : 13;
      const tr = this.getTransform ? this.getTransform() : { a: 1 };
      const k = (tr && tr.a) || 1;
      const W = (this.canvas && this.canvas.width ? this.canvas.width / k : 1e6);
      const H = (this.canvas && this.canvas.height ? this.canvas.height / k : 1e6);
      if (!(W > 8) || !(H > 8)) return orig.apply(this, arguments);
      const al = this.textAlign;
      let tx = x;
      if (W > w + 6) {
        if (al === 'center') tx = Math.min(Math.max(x, w / 2 + 2), W - w / 2 - 2);
        else if (al === 'right' || al === 'end') tx = Math.min(Math.max(x, w + 2), W - 2);
        else tx = Math.min(Math.max(x, 2), W - w - 2);
      } else {
        /* подпись шире кадра: прижимаем внутрь, текст не начинается «за кадром» */
        if (al === 'center') tx = Math.max(x, w / 2 + 2);
        else if (al === 'right' || al === 'end') tx = Math.max(x, w + 2);
        else tx = Math.max(x, 2);
      }
      const ty = Math.min(Math.max(y, fs * .95), H - 1.5);
      return orig.call(this, str, tx, ty);
    } catch (e) { return orig.apply(this, arguments); }
  };
  P.__clamped = true;
})();

const G = {
  bg(ctx, W, H, step = 34) {
    ctx.clearRect(0, 0, W, H);
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#101c31'); g.addColorStop(1, '#0a1220');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(120,160,220,.10)'; ctx.lineWidth = 1;
    for (let x = 0; x < W; x += step) { ctx.beginPath(); ctx.moveTo(x + .5, 0); ctx.lineTo(x + .5, H); ctx.stroke(); }
    for (let y = 0; y < H; y += step) { ctx.beginPath(); ctx.moveTo(0, y + .5); ctx.lineTo(W, y + .5); ctx.stroke(); }
  },
  line(ctx, x1, y1, x2, y2, col = '#8fb6ea', w = 2, dash = null) {
    ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.setLineDash(dash || []);
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.restore();
  },
  arrow(ctx, x1, y1, x2, y2, col = '#ffd166', w = 2.4, head = 10) {
    const a = Math.atan2(y2 - y1, x2 - x1);
    ctx.save(); ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 - Math.cos(a) * head * .7, y2 - Math.sin(a) * head * .7); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - Math.cos(a - .42) * head, y2 - Math.sin(a - .42) * head);
    ctx.lineTo(x2 - Math.cos(a + .42) * head, y2 - Math.sin(a + .42) * head);
    ctx.closePath(); ctx.fill(); ctx.restore();
  },
  dot(ctx, x, y, r, col = '#fff', ring = null) {
    ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = col; ctx.fill();
    if (ring) { ctx.strokeStyle = ring; ctx.lineWidth = 1.6; ctx.stroke(); }
  },
  txt(ctx, s, x, y, o = {}) {
    ctx.save();
    const size = o.size || 13;
    ctx.fillStyle = o.col || '#e8f0ff';
    ctx.font = `${o.weight || 500} ${size}px system-ui,-apple-system,Segoe UI,Roboto,sans-serif`;
    const align = o.align || 'left'; ctx.textAlign = align; ctx.textBaseline = o.base || 'alphabetic';
    /* страховка: подпись не должна уезжать за пределы кадра */
    const tr = ctx.getTransform ? ctx.getTransform() : { a: 1, e: 0 };
    const scale = tr.a || 1;
    const W = (ctx.canvas && ctx.canvas.width ? ctx.canvas.width / scale : 1e6);
    const H = (ctx.canvas && ctx.canvas.height ? ctx.canvas.height / scale : 1e6);
    let tx = x, ty = y, w = 0;
    try { w = ctx.measureText(String(s)).width; } catch (e) { w = String(s).length * size * .55; }
    if (align === 'center') tx = Math.min(Math.max(x, w / 2 + 3), W - w / 2 - 3);
    else if (align === 'right' || align === 'end') tx = Math.min(Math.max(x, w + 3), W - 3);
    else tx = Math.min(Math.max(x, 3), W - w - 3);
    if (W > w + 8) tx = Math.min(Math.max(tx, 3), W - w - 3);   // если текст шире кадра — не дёргаем
    ty = Math.min(Math.max(y, size), H - 3);
    ctx.fillText(s, tx, ty); ctx.restore();
  },
  panel(ctx, x, y, w, h, o = {}) {
    ctx.save(); ctx.fillStyle = o.fill || 'rgba(255,255,255,.06)';
    ctx.strokeStyle = o.stroke || 'rgba(160,200,255,.22)'; ctx.lineWidth = 1;
    const r = o.r === undefined ? 10 : o.r;
    ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
  },
  bar(ctx, x, y, w, h, col) { ctx.fillStyle = col; ctx.fillRect(x, y, w, h); }
};

/* ------------------------------ звук ------------------------------ */
let _ac = null;
function AC() {
  if (_ac) return _ac;
  const C = window.AudioContext || window.webkitAudioContext;
  if (!C) return null;
  try { _ac = new C(); } catch (e) { return null; }
  return _ac;
}
function tone(f, dur = 0.9, vol = 0.16, type = 'sine') {
  const ac = AC(); if (!ac) return false;
  try {
    if (ac.state === 'suspended') ac.resume();
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = type; o.frequency.value = f;
    const t0 = ac.currentTime;
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(vol, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0008, t0 + dur);
    o.connect(g); g.connect(ac.destination); o.start(t0); o.stop(t0 + dur + 0.05);
    return true;
  } catch (e) { return false; }
}
function note(f) {
  const names = ['до', 'до#', 'ре', 'ре#', 'ми', 'фа', 'фа#', 'соль', 'соль#', 'ля', 'ля#', 'си'];
  if (!f || f < 20) return '—';
  const n = Math.round(12 * Math.log2(f / 440) + 69);
  return names[((n % 12) + 12) % 12] + ' ' + (Math.floor(n / 12) - 1) + ' окт. (' + f.toFixed(0) + ' Гц)';
}

const MATH_RULES = [
  // радикалы
  ['√(F₁² + F₂² + 2F₁F₂·cos φ)', '<span class="rad"><span class="rs">√</span><span class="rr">F₁² + F₂² + 2F₁F₂·cos φ</span></span>'],
  ['√(T/μ)', '<span class="rad"><span class="rs">√</span><span class="rr">' + fr('T', 'μ') + '</span></span>'],
  ['√(L/g)', '<span class="rad"><span class="rs">√</span><span class="rr">' + fr('L', 'g') + '</span></span>'],
  ['√T', '<span class="rad"><span class="rs">√</span><span class="rr">T</span></span>'],
  // дроби
  ['sin α / sin β', fr('sin α', 'sin β')],
  ['n₂ / n₁', fr('n₂', 'n₁')],
  ['at²/2', fr('at²', '2')],
  ['M·q / (z·F)', fr('M·q', 'z·F')],
  ['M·q/(z·F)', fr('M·q', 'z·F')],
  ['1/F = 1/d + 1/f', fr('1', 'F') + ' = ' + fr('1', 'd') + ' + ' + fr('1', 'f')],
  ['(1/2L)', fr('1', '2L')],
  ['(1 + θ₀²/16)', '(1 + ' + fr('θ₀²', '16') + ')'],
  ['θ₀²/16', fr('θ₀²', '16')],
  ['x = v₀t + at²/2', 'x = v₀t + ' + fr('at²', '2')],
  ['h/8400', fr('h', '8400')],
  ['h/1000', fr('h', '1000')],
  ['v·t/2', fr('v·t', '2')],
  ['R / sin p₀', fr('R', 'sin p₀')],
  ['R/sin p₀', fr('R', 'sin p₀')],
  ['v₀²/(2g)', fr('v₀²', '2g')],
  ['N = A/t', 'N = ' + fr('A', 't')],
  ['f = v/2L', 'f = ' + fr('v', '2L')],
  ['ΔI / I', fr('ΔI', 'I')],
  ['ΔI/I', fr('ΔI', 'I')],
  ['L / h = x / (H − h)', fr('L', 'h') + ' = ' + fr('x', 'H − h')],
  ['L/h = x/(H−h)', fr('L', 'h') + ' = ' + fr('x', 'H − h')],
  ['Aₚ / A₃', fr('Aₚ', 'A₃')],
  ['Aₚ/A₃', fr('Aₚ', 'A₃')],
  ['a/2', fr('a', '2')],
  ['10/256', fr('10', '256')],
  ['1000/L', fr('1000', 'L')],
  ['2π√(L/g)', '2π<span class="rad"><span class="rs">√</span><span class="rr">' + fr('L', 'g') + '</span></span>']
];
function fr(n, d) { return '<span class="fr"><span class="n">' + n + '</span><span class="d">' + d + '</span></span>'; }
function mathify(el) {
  if (!el || el.dataset.m) return;
  let h = el.innerHTML;
  if (h.indexOf('/') < 0 && h.indexOf('√') < 0) { el.dataset.m = '1'; return; }
  if (/<(span|sup|sub|b|i|br)\b/i.test(h)) { el.dataset.m = '1'; return; }
  let out = h, touched = false;
  for (let i = 0; i < MATH_RULES.length; i++) {
    const r = MATH_RULES[i];
    if (out.indexOf(r[0]) >= 0) { out = out.split(r[0]).join(r[1]); touched = true; }
  }
  if (touched) out = out;
  if (out.indexOf('/') >= 0) {
    const GEN = /(?<![A-Za-zΑ-Ωα-ωА-Яа-я0-9₀-₉])([A-Za-zΑ-Ωα-ω0-9][A-Za-zΑ-Ωα-ω0-9₀-₉²³ⁿ·]{0,4})\s?\/\s?([A-Za-zΑ-Ωα-ω0-9][A-Za-zΑ-Ωα-ω0-9₀-₉²³ⁿ·]{0,4})(?![A-Za-zΑ-Ωα-ω0-9₀-₉])/g;
    if (GEN.test(out)) { out = out.replace(GEN, (m, a, c) => fr(a, c)); touched = true; }
  }
  if (touched) el.innerHTML = out;
  el.dataset.m = '1';
}
/* пометить «длинные» строки вывода: они переезжают под подпись */
function polishReadout(root) {
  if (!root) return;
  const rows = root.querySelectorAll('.kv');
  for (let i = 0; i < rows.length; i++) {
    const b = rows[i].querySelector('b');
    if (!b) continue;
    const txt = (b.textContent || '').trim();
    rows[i].classList.toggle('long', txt.length > 30);
    const lab = (rows[i].querySelector('span') && rows[i].querySelector('span').textContent || '').toLowerCase();
    if (/итог|результат|вывод|ответ|оценка|совпад|безопасн|запас/.test(lab)) rows[i].classList.add('key');
    mathify(b);
  }
}
function typesetAll(root) {
  (root || document).querySelectorAll('.f').forEach(mathify);
}

/* ---------- демонстрационные прогоны: что делает кнопка «Пуск» там, где нет анимации ---------- */
const SIM_DEMOS = {
  vectors: { dur: 7, run(st, p) { st.p.a1 = 180 * p; st.p.a2 = 180 * (1 - p); } },
  refraction: { dur: 8, run(st, p) { st.p.a = 5 + 80 * (1 - Math.abs(2 * p - 1)); } },
  eye: { dur: 8, run(st, p) { st.p.d = 500 - 470 * p; } },
  hearing: { dur: 10, run(st, p) { st.p.f = 60 * Math.pow(1600 / 60, p); } },
  atmos: { dur: 9, run(st, p) { st.p.h = 9000 * (1 - Math.abs(2 * p - 1)); } },
  earthsun: { dur: 12, run(st, p) { st.p.day = 1 + 364 * p; } },
  drag: { dur: 9, run(st, p) { st.p.v = 20 + 160 * (1 - Math.abs(2 * p - 1)); } },
  efficiency: { dur: 8, run(st, p) { st.p.P = 5 * Math.pow(400, p); } },
  music: { dur: 9, run(st, p) { st.p.T = 20 + 280 * (1 - Math.abs(2 * p - 1)); } },
  shadow: { dur: 8, run(st, p) { st.p.Hs = .6 + 5.4 * (1 - Math.abs(2 * p - 1)); } },
  weber: { dur: 9, run(st, p) { st.p.I = 2 * Math.pow(50, p); } },
  binocular: { dur: 9, run(st, p) { st.p.D = 6 - 5.75 * p; } }
};

/* дополнения контента: автопоказ для статичных моделей */
if (typeof SIM_DEMOS_EXTRA !== 'undefined') Object.assign(SIM_DEMOS, SIM_DEMOS_EXTRA);

/* --------------------------- платформа симуляторов --------------------------- */
let ACTIVE = null, LAST = 0;
function loop(ts) {
  requestAnimationFrame(loop);
  const a = ACTIVE; if (!a) { LAST = ts; return; }
  const dt = Math.min(0.05, Math.max(0, (ts - LAST) / 1000 || 0)); LAST = ts;
  if (a.def.kind !== 'html') {
    if (!a.paused) {
      if (a.def.step) { a.st.t += dt; a.def.step(a.st, dt); }
      else if (a.demo && !a.demo.done) {      /* «Пуск» без анимации: показываем, как меняется результат */
        a.demo.el += dt;
        const pr = Math.min(1, a.demo.el / a.demo.dur);
        a.demo.fn(a.st, pr);
        if (typeof syncMaybe === 'function') syncMaybe(a.st);
        if (pr >= 1) { a.demo.done = true; a.paused = true; updatePlayLabel(a); }
      }
    }
    if (a.def.draw) a.def.draw(a.ctx, a.st, a.w, a.h);
    a.acc += dt;
    if (a.acc > 0.1) {
      a.acc = 0;
      const html = a.def.readout ? a.def.readout(a.st) : '';
      if (html !== a.lastR) { a.readEl.innerHTML = html; a.lastR = html; polishReadout(a.readEl); }
    }
  }
}

function mountSim(hostId, simId) {
  const host = document.getElementById(hostId); if (!host) return;
  const def = SIMS[simId]; if (!def) { host.innerHTML = '<div class="empty">Симулятор не найден</div>'; return; }
  const st = Object.assign({ t: 0 }, def.init ? def.init() : {});
  st.p = st.p || {};
  (def.params || []).forEach(p => { if (st.p[p.key] === undefined) st.p[p.key] = p.val; });
  (def.selects || []).forEach(s => { if (st.p[s.key] === undefined) st.p[s.key] = s.val; });

  const isHtml = def.kind === 'html';
  host.innerHTML = isHtml
    ? `${stageHead(def, simId)}<div class="htmlbox" id="hb_${simId}"><div id="h_${simId}"></div></div><div class="ctrls" id="ct_${simId}" style="display:none"></div><div class="readout" id="ro_${simId}" style="display:block"></div>`
    : `<div class="simwrap">
        <div>
          ${stageHead(def, simId)}
          <div class="canvasbox"><canvas id="cv_${simId}"></canvas></div>
          <div class="simhint">${def.hint ? '💡 ' + (languageIndex ? experimentLibrary[simId].guide[languageIndex] : def.hint) + ' ' : ''}<b>${instrumentText(SIM_DEMOS[simId] ? 'Кнопка «Пуск» сама пройдёт все значения — смотрите, как меняется результат.' : 'Кнопка «Пуск» запускает модель, «Пауза» останавливает её.')}</b></div>
        </div>
        <div>
          <div class="ctrls" id="ct_${simId}"></div>
          <div class="readout" id="ro_${simId}"></div>
        </div>
      </div>`;
  const ctrls = $('#ct_' + simId, host), readEl = $('#ro_' + simId, host);

  /* элементы управления */
  let html = '';
  (def.params || []).forEach(p => {
    html += `<div class="ctrl"><label><span>${instrumentText(p.label)}</span><b id="lb_${simId}_${p.key}">${fmt(st.p[p.key], p.dec === undefined ? 1 : p.dec)}${p.unit ? ' ' + unit(p.unit) : ''}</b></label>
      <input type="range" min="${p.min}" max="${p.max}" step="${p.step}" value="${st.p[p.key]}" data-k="${p.key}" data-dec="${p.dec === undefined ? 1 : p.dec}" data-unit="${unit(p.unit || '')}"></div>`;
  });
  (def.selects || []).forEach(s => {
    html += `<div class="ctrl"><label><span>${instrumentText(s.label)}</span></label><select class="sbtn" data-sel="${s.key}" style="width:100%">
      ${s.options.map(o => `<option value="${o.v}" ${o.v === st.p[s.key] ? 'selected' : ''}>${instrumentText(o.label)}</option>`).join('')}</select></div>`;
  });
  if ((def.actions || []).length) {
    html += `<div class="ctrl"><div class="segbtns">` + def.actions.map((a, i) =>
      `<button class="sbtn ${a.primary ? 'pri' : ''}" data-act="${i}">${instrumentText(a.label)}</button>`).join('') + `</div></div>`;
  }
  if (!def.static) {
    html += `<div class="ctrl"><div class="segbtns">
      <button class="sbtn" data-play="1">${instrumentText('▶ Пуск')}</button>
      <button class="sbtn" data-reset="1">${instrumentText('↺ Сброс')}</button></div></div>`;
  }
  html += `<div class="ctrl"><label><span>${instrumentText('Масштаб кадра')} <i style="color:#8fa3c0;font-style:normal">${instrumentText('— крупнее подписи')}</i></span></label>
    <div class="segbtns zoombar">
      <button class="sbtn on" data-zoom="1">100 %</button>
      <button class="sbtn" data-zoom="1.25">125 %</button>
      <button class="sbtn" data-zoom="1.5">150 %</button>
      <button class="sbtn" data-theater="1">${instrumentText('⛶ Во весь экран')}</button>
    </div></div>`;
  ctrls.innerHTML = html;

  $$('input[type=range]', ctrls).forEach(inp => {
    inp.addEventListener('input', () => {
      const k = inp.dataset.k, v = parseFloat(inp.value);
      st.p[k] = v;
      $('#lb_' + simId + '_' + k, ctrls).textContent = fmt(v, parseInt(inp.dataset.dec)) + (inp.dataset.unit ? ' ' + inp.dataset.unit : '');
      if (ACTIVE && ACTIVE.st === st && ACTIVE.demo && !ACTIVE.demo.done) { ACTIVE.demo.done = true; ACTIVE.paused = true; updatePlayLabel(ACTIVE); }
      if (def.onChange) def.onChange(st, k, v);
    });
  });
  $$('select[data-sel]', ctrls).forEach(sel => sel.addEventListener('change', () => {
    st.p[sel.dataset.sel] = sel.value;
    if (ACTIVE && ACTIVE.st === st && ACTIVE.demo && !ACTIVE.demo.done) { ACTIVE.demo.done = true; ACTIVE.paused = true; updatePlayLabel(ACTIVE); }
    if (def.onChange) def.onChange(st, sel.dataset.sel, sel.value);
  }));
  /* синхронизация ползунков с программным изменением параметров (пресеты, автоподогрев) */
  const syncControls = () => {
    $$('input[type=range]', ctrls).forEach(inp => {
      const k = inp.dataset.k;
      if (st.p[k] === undefined) return;
      inp.value = st.p[k];
      const lb = $('#lb_' + simId + '_' + k, ctrls);
      if (lb) lb.textContent = fmt(st.p[k], parseInt(inp.dataset.dec)) + (inp.dataset.unit ? ' ' + inp.dataset.unit : '');
    });
    $$('select[data-sel]', ctrls).forEach(sel => { const k = sel.dataset.sel; if (st.p[k] !== undefined) sel.value = st.p[k]; });
  };
  _syncers.push({ st, f: syncControls });
  $$('button[data-act]', ctrls).forEach(b => b.addEventListener('click', () => {
    const a = def.actions[parseInt(b.dataset.act)];
    if (!a || !a.run) return;
    a.run(st, {
      tone, AC,
      sync: () => { syncControls(); if (def.draw && ACTIVE && ACTIVE.st === st) def.draw(ACTIVE.ctx, st, ACTIVE.w, ACTIVE.h); },
      notify: t => { const n = document.createElement('div'); n.className = 'note'; n.textContent = t; readEl.prepend(n); setTimeout(() => n.remove(), 4500); }
    });
    syncControls();
    if (def.draw && ACTIVE && ACTIVE.st === st) def.draw(ACTIVE.ctx, st, ACTIVE.w, ACTIVE.h);
  }));
  const playB = $('button[data-play]', ctrls);
  if (playB) playB.addEventListener('click', () => {
    const a = ACTIVE; if (!a || a.st !== st) return;
    const demo = SIM_DEMOS[simId];
    if (a.def.step) {                                  /* анимация модели: пуск / пауза */
      a.paused = !a.paused;
    } else if (demo) {                                 /* показ: модель сама проходит все значения */
      if (a.demo && !a.demo.done && !a.paused) { a.demo.done = true; a.paused = true; }
      else { a.demo = { el: 0, dur: demo.dur, fn: demo.run, done: false }; a.paused = false; }
    } else { a.paused = !a.paused; }
    updatePlayLabel(a);
  });
  const rstB = $('button[data-reset]', ctrls);
  if (rstB) rstB.addEventListener('click', () => {
    const fresh = Object.assign({ t: 0 }, def.init ? def.init() : {}); fresh.p = Object.assign({}, st.p);
    Object.keys(st).forEach(k => delete st[k]); Object.assign(st, fresh);
    syncControls();
    if (ACTIVE) { ACTIVE.paused = false; if (playB) playB.textContent = instrumentText('⏸ Пауза'); }
    if (def.draw && ACTIVE) def.draw(ACTIVE.ctx, st, ACTIVE.w, ACTIVE.h);
  });

  if (isHtml) {
    ACTIVE = null;
    def.mount(document.getElementById('h_' + simId), st, { tone, note, fmt, G, apiNotify: t => { const n = document.createElement('div'); n.className = 'note'; n.textContent = t; readEl.prepend(n); } });
    if (def.readout) { const ro = def.readout(st); readEl.innerHTML = ro; polishReadout(readEl); typesetAll(host); }
    attachZoom(host);
    return;
  }

  const cv = $('#cv_' + simId, host);
  let box = { ctx: null, w: 10, h: 10 };
  const fit = () => {
    const boxEl = cv.parentElement;
    const asp = def.aspect || 0.6;
    const zoom = parseFloat(boxEl.dataset.zoom || '1') || 1;
    const big = !!(document.fullscreenElement || document.webkitFullscreenElement || boxEl.classList.contains('theater'));
    const vw = document.documentElement.clientWidth || window.innerWidth || 1024;
    /* ширина кадра: не шире колонки и никогда не шире экрана (иначе сетка «распирает» страницу) */
    const colW = boxEl.clientWidth || boxEl.getBoundingClientRect().width || vw - 40;
    const roomW = Math.max(260, vw - (vw < 620 ? 40 : 64));
    let availW = big ? Math.max(320, (window.innerWidth || 1100) - 30) : Math.max(260, Math.min(Math.round(colW), roomW));
    if (big) {
      const panelEl = boxEl.querySelector('.theater-panel');
      if (panelEl) { const pw = Math.round(panelEl.getBoundingClientRect().width || 352); availW = Math.max(280, availW - pw - 16); }
    }
    const availH = big ? Math.max(200, (window.innerHeight || 700) - 34) : 1e9;
    let cw = availW, ch = Math.round(cw * asp);
    if (big && ch > availH) { ch = availH; cw = Math.round(ch / asp); }
    /* логический размер меньше CSS-размера в zoom раз → все подписи в кадре крупнее */
    const w = Math.max(300, Math.round(cw / zoom)), h = Math.round(w * asp);
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.style.width = cw + 'px'; cv.style.height = ch + 'px';
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    const ctx = cv.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    box = { ctx, w, h };
    if (ACTIVE && ACTIVE.cv === cv) { ACTIVE.ctx = ctx; ACTIVE.w = w; ACTIVE.h = h; if (def.draw) def.draw(ctx, st, w, h); }
  };
  /* кнопки «масштаб кадра»: увеличивают подписи внутри симулятора */
  const zbox = cv.parentElement;
  zbox.dataset.zoom = zbox.dataset.zoom || '1';
  ctrls.addEventListener('click', ev => {
    const b = ev.target.closest('button[data-zoom]'); if (!b) return;
    zbox.dataset.zoom = b.dataset.zoom;
    ctrls.querySelectorAll('button[data-zoom]').forEach(x => x.classList.toggle('on', x === b));
    fit();
  });
  fit();
  ACTIVE = { def, st, cv, paused: true, ctx: box.ctx, w: box.w, h: box.h, readEl, lastR: null, acc: 1, playB: playB, simId: simId, demo: null };
  if (def.draw) def.draw(ACTIVE.ctx, st, ACTIVE.w, ACTIVE.h);
  if (playB) updatePlayLabel(ACTIVE);
  if (window.ResizeObserver) { const ro = new ResizeObserver(() => fit()); ro.observe(cv.parentElement); }
  window.addEventListener('resize', fit);
      const ro = def.readout && def.readout(st); if (ro) { readEl.innerHTML = ro; ACTIVE.lastR = ro; }
  polishReadout(readEl); typesetAll(host);
  attachZoom(host);
}


/* подпись кнопки «Пуск»: Пуск → Пауза/Стоп → Продолжить */
function updatePlayLabel(a) {
  const b = a && a.playB; if (!b) return;
  const demo = SIM_DEMOS[a.simId];
  if (demo) b.textContent = (a.demo && !a.demo.done && !a.paused) ? instrumentText('⏹ Стоп') : instrumentText('▶ Пуск');
  else if (a.def && a.def.step) b.textContent = a.paused ? instrumentText('▶ Пуск') : instrumentText('⏸ Пауза');
  else b.textContent = a.paused ? instrumentText('▶ Пуск') : instrumentText('⏸ Пауза');
  b.classList.toggle('pri', !a.paused);
}

/* «во весь экран» внутри страницы: вместе с кадром открываются ползунки и вывод значений.
   Работает и в iframe, где полноэкранный режим браузера запрещён. */
function attachZoom(host) {
  const box = host.querySelector('.canvasbox') || host.querySelector('.htmlbox');
  if (!box) return;
  const cvEl = box.querySelector('canvas');
  const simId = cvEl ? (cvEl.id || '').replace(/^cv_/, '') : (box.id || '').replace(/^hb_/, '');
  const def = SIMS[simId] || {};
  if (!box.querySelector('.fsbtn')) {
    const b = document.createElement('button');
    b.className = 'fsbtn'; b.type = 'button'; b.innerHTML = instrumentText('⛶ Во весь экран');
    box.appendChild(b);
  }
  const btn = box.querySelector('.fsbtn');

  /* что показываем рядом с кадром: подсказку, органы управления и вывод значений */
  const loose = [host.querySelector('.simhint'), host.querySelector('.ctrls'), host.querySelector('.readout')]
    .filter(el => el && el.offsetParent !== null || (el && el.classList.contains('readout')));
  const homes = loose.map(el => ({ el: el, parent: el.parentNode, next: el.nextSibling }));

  const fsEl = () => document.fullscreenElement || document.webkitFullscreenElement;
  const on = () => box.classList.contains('theater') || fsEl() === box;
  const paint = () => {
    const on2 = on();
    const label = on2 ? instrumentText('✕ Выйти (Esc)') : instrumentText('⛶ Во весь экран');
    if (btn) btn.innerHTML = label;
    host.querySelectorAll('button[data-theater]').forEach(b => { b.classList.toggle('on', on2); b.innerHTML = label; });
    document.body.classList.toggle('theater-open', on2);
  };
  const resize = () => [30, 120, 380].forEach(t => setTimeout(() => window.dispatchEvent(new Event('resize')), t));

  const buildPanel = () => {
    let panel = box.querySelector('.theater-panel');
    if (!panel) {
      panel = document.createElement('div');
      panel.className = 'theater-panel';
      panel.innerHTML = `<div class="theater-head">${(def.title || 'Симулятор')}<span>${instrumentText('ползунки и вывод — здесь же')}</span></div>`;
      box.appendChild(panel);
    }
    loose.forEach(el => { if (el) panel.appendChild(el); });
    /* у html-симуляторов масштаб кадра не действует — прячем его в театре */
    if (def.kind === 'html') panel.querySelectorAll('button[data-zoom]').forEach(b => { b.style.display = 'none'; });
    return panel;
  };
  const restore = () => {
    homes.forEach(h => {
      try {
        if (h.next && h.next.parentNode === h.parent) h.parent.insertBefore(h.el, h.next);
        else h.parent.appendChild(h.el);
      } catch (e) {}
    });
    const panel = box.querySelector('.theater-panel');
    if (panel) panel.remove();
  };

  const enter = () => {
    if (box.classList.contains('theater')) return;
    box.classList.add('theater');
    buildPanel();
    paint();
    try { (box.requestFullscreen || box.webkitRequestFullscreen || function () { }).call(box)?.catch?.(() => {}); } catch (e) {}
    resize();
  };
  const exit = () => {
    restore();
    box.classList.remove('theater');
    paint();
    try { if (fsEl()) (document.exitFullscreen || document.webkitExitFullscreen).call(document); } catch (e) {}
    resize();
  };
  const toggle = () => (box.classList.contains('theater') ? exit() : enter());

  if (btn && !btn.dataset.b) { btn.dataset.b = '1'; btn.addEventListener('click', ev => { ev.stopPropagation(); toggle(); }); }
  if (!box.dataset.kb) {
    box.dataset.kb = '1';
    document.addEventListener('keydown', ev => { if (ev.key === 'Escape' && box.classList.contains('theater')) exit(); });
    const sync = () => { if (!fsEl() && box.classList.contains('theater')) { restore(); box.classList.remove('theater'); } paint(); resize(); };
    document.addEventListener('fullscreenchange', sync);
    document.addEventListener('webkitfullscreenchange', sync);
  }
  const zbtn = host.querySelector('button[data-theater]');
  if (zbtn && !zbtn.dataset.b) { zbtn.dataset.b = '1'; zbtn.addEventListener('click', toggle); }
  paint();
}
function stageHead(def, simId) {
  const t = (def && def.title) || 'Симулятор';
  const icon = (t.match(/^\s*([^\p{L}\p{N}\s]+)/u) || ['', '🔬'])[1];
  const name = t.replace(/^\s*[^\p{L}\p{N}\s]+\s*/u, '').trim() || t;
  return `<div class="stagehead"><span class="dot"></span>${icon} ${name}<span class="stagesub">${instrumentText(def && def.kind === 'html' ? 'интерактивная модель · нажимайте и двигайте' : 'живая модель · ползунки справа')}</span></div>`;
}
// Standalone local player. Only the instrument named by the allowlisted registry is mounted.
const requested=new URLSearchParams(location.search).get('sim');
if(Object.hasOwn(SIMS,requested)){if(languageIndex)SIMS[requested].title=experimentLibrary[requested].title[languageIndex];document.title=SIMS[requested].title;mountSim('app',requested);if(ACTIVE)requestAnimationFrame(loop)}else app.textContent=instrumentText('Выберите симулятор в конспекте.');
