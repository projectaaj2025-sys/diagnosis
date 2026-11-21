/* ==== sims1.js ==== */
/* ================= СИМУЛЯТОРЫ: МАТЕМАТИКА, ИНФОРМАТИКА, ХИМИЯ ================= */
const SIMS = {};
function defSim(id, def) { SIMS[id] = def; }

/* ---------- 1. Векторы: сложение сил (математика / геометрия) ---------- */
defSim('vectors', {
  title: '🧭 Векторы и сложение сил',
  aspect: .64,
  theoryNote: 'Математика даёт <b>правило параллелограмма и тригонометрию</b>, физика — <b>смысл</b>: сила, скорость, перемещение складываются как векторы. Меняя углы, видно: при α₂−α₁ = 180° силы вычитаются, при 0° — складываются.',
  hint: 'Меняйте модули и углы двух сил. Жёлтая стрелка — равнодействующая R = F₁ + F₂.',
  params: [
    { key: 'F1', label: 'Модуль силы F₁', min: 1, max: 10, step: .1, val: 6, unit: 'Н', dec: 1 },
    { key: 'a1', label: 'Угол α₁', min: 0, max: 360, step: 1, val: 30, unit: '°', dec: 0 },
    { key: 'F2', label: 'Модуль силы F₂', min: 1, max: 10, step: .1, val: 8, unit: 'Н', dec: 1 },
    { key: 'a2', label: 'Угол α₂', min: 0, max: 360, step: 1, val: 115, unit: '°', dec: 0 }
  ],
  draw(g, st, W, H) {
    const p = st.p;
    G.bg(g, W, H);
    const x1 = p.F1 * Math.cos(p.a1 * D2R), y1 = p.F1 * Math.sin(p.a1 * D2R);
    const x2 = p.F2 * Math.cos(p.a2 * D2R), y2 = p.F2 * Math.sin(p.a2 * D2R);
    const rx = x1 + x2, ry = y1 + y2, R = Math.hypot(rx, ry);
    const O = { x: W * .40, y: H * .70 };
    const m = Math.max(1, Math.hypot(x1, y1), Math.hypot(x2, y2), R);
    const s = Math.min(W * .36, H * .56) / m;
    const P = (x, y) => ({ x: O.x + x * s, y: O.y - y * s });
    const A = P(x1, y1), B = P(x2, y2), C = P(rx, ry);
    // оси
    G.line(g, 14, O.y, W - 14, O.y, 'rgba(150,190,240,.35)', 1, [4, 5]);
    G.line(g, O.x, 16, O.x, H - 14, 'rgba(150,190,240,.35)', 1, [4, 5]);
    G.txt(g, 'x', W - 20, O.y - 8, { size: 12, col: '#7ea4d8' });
    G.txt(g, 'y', O.x + 8, 22, { size: 12, col: '#7ea4d8' });
    // параллелограмм
    G.line(g, A.x, A.y, C.x, C.y, 'rgba(255,255,255,.42)', 1.6, [6, 5]);
    G.line(g, B.x, B.y, C.x, C.y, 'rgba(255,255,255,.42)', 1.6, [6, 5]);
    G.arrow(g, O.x, O.y, A.x, A.y, '#4cc9f0', 3);
    G.arrow(g, O.x, O.y, B.x, B.y, '#f72585', 3);
    G.arrow(g, O.x, O.y, C.x, C.y, '#ffd166', 3.6, 13);
    G.txt(g, 'F₁ = ' + fmt(p.F1, 1) + ' Н', A.x + 8, A.y - 6, { col: '#4cc9f0', size: 13, weight: 700 });
    G.txt(g, 'F₂ = ' + fmt(p.F2, 1) + ' Н', B.x + 8, B.y - 6, { col: '#f72585', size: 13, weight: 700 });
    G.txt(g, 'R = ' + fmt(R, 2) + ' Н', C.x + 10, C.y + 16, { col: '#ffd166', size: 14, weight: 700 });
    G.txt(g, 'масштаб: 1 Н = ' + fmt(s, 1) + ' px', 14, H - 14, { size: 12, col: '#7ea4d8' });
    G.panel(g, W - 176, 14, 162, 52);
    G.txt(g, 'угол между силами', W - 168, 34, { size: 11.5, col: '#9fb8dd' });
    const phi = Math.abs(((p.a2 - p.a1) % 360 + 360) % 360);
    G.txt(g, 'φ = ' + fmt(phi, 0) + '°', W - 168, 56, { size: 15, weight: 700, col: '#8fe3ff' });
  },
  readout(st) {
    const p = st.p;
    const x1 = p.F1 * Math.cos(p.a1 * D2R), y1 = p.F1 * Math.sin(p.a1 * D2R);
    const x2 = p.F2 * Math.cos(p.a2 * D2R), y2 = p.F2 * Math.sin(p.a2 * D2R);
    const rx = x1 + x2, ry = y1 + y2, R = Math.hypot(rx, ry);
    const phi = Math.abs(((p.a2 - p.a1) % 360 + 360) % 360) * D2R;
    const Rcos = Math.sqrt(p.F1 * p.F1 + p.F2 * p.F2 + 2 * p.F1 * p.F2 * Math.cos(phi));
    return `<div class="kv"><span>Проекции F₁</span><b>${fmt(x1, 2)} ; ${fmt(y1, 2)} Н</b></div>
    <div class="kv"><span>Проекции F₂</span><b>${fmt(x2, 2)} ; ${fmt(y2, 2)} Н</b></div>
    <div class="kv"><span>Проекции R</span><b>${fmt(rx, 2)} ; ${fmt(ry, 2)} Н</b></div>
    <div class="kv"><span>|R| по теореме косинусов</span><b>${fmt(Rcos, 2)} Н</b></div>
    <div class="kv"><span>Направление R</span><b>${fmt((Math.atan2(ry, rx) * R2D + 360) % 360, 1)}°</b></div>
    <div class="note">Тригонометрия: F<sub>x</sub> = F·cos α, F<sub>y</sub> = F·sin α. Дальше математика даёт теорему косинусов, а физика — правило сложения сил и условие равновесия (R = 0).</div>`;
  }
});

/* ---------- 2. Закон преломления (математика / геометрия + оптика) ---------- */
defSim('refraction', {
  title: '🔍 Углы, синусы и преломление света',
  aspect: .58,
  theoryNote: 'Законы отражения и преломления формулируются <b>через углы</b> (геометрия) и рассчитываются <b>через синусы</b> (тригонометрия). Физика добавляет смысл: sin α / sin β = n — оптическая плотность среды.',
  hint: 'Увеличивайте угол падения: при переходе из плотной среды в воздух наступает полное внутреннее отражение.',
  params: [
    { key: 'a', label: 'Угол падения α', min: 0, max: 89, step: 1, val: 40, unit: '°', dec: 0 },
    { key: 'n1', label: 'Показатель преломления n₁ (сверху)', min: 1, max: 2.4, step: .01, val: 1, dec: 2 },
    { key: 'n2', label: 'Показатель преломления n₂ (снизу)', min: 1, max: 2.4, step: .01, val: 1.33, dec: 2 }
  ],
  actions: [
    { label: 'Воздух → вода', run: (st, api) => { st.p.n1 = 1; st.p.n2 = 1.33; st.p.a = 40; api.sync(); } },
    { label: 'Вода → воздух', run: (st, api) => { st.p.n1 = 1.33; st.p.n2 = 1; st.p.a = 45; api.sync(); } },
    { label: 'Стекло → воздух (полное отражение)', primary: true, run: (st, api) => { st.p.n1 = 1.5; st.p.n2 = 1; st.p.a = 50; api.sync(); } }
  ],
  draw(g, st, W, H) {
    const p = st.p, a = p.a * D2R;
    G.bg(g, W, H);
    const O = { x: W * .5, y: H * .52 };
    // среды
    g.fillStyle = `rgba(60,140,255,${Math.min(.22, (p.n1 - 1) * .35)})`; g.fillRect(0, 0, W, O.y);
    g.fillStyle = `rgba(80,220,190,${Math.min(.22, (p.n2 - 1) * .35)})`; g.fillRect(0, O.y, W, H - O.y);
    G.line(g, 0, O.y, W, O.y, '#9fd0ff', 2.4);
    G.line(g, O.x, 20, O.x, H - 16, 'rgba(255,255,255,.5)', 1.4, [6, 6]);
    G.txt(g, 'среда 1: n₁ = ' + fmt(p.n1, 2), 14, 24, { col: '#bfe0ff', size: 13 });
    G.txt(g, 'среда 2: n₂ = ' + fmt(p.n2, 2), 14, H - 14, { col: '#b6f2e4', size: 13 });
    const L = Math.min(W * .46, H * .46);
    const sA = Math.sin(a), cA = Math.cos(a);
    // падающий луч
    G.arrow(g, O.x - L * sA, O.y - L * cA, O.x, O.y, '#ffd166', 3, 12);
    G.txt(g, 'падающий', O.x - L * sA - 4, O.y - L * cA - 8, { col: '#ffd166', size: 12.5 });
    // отражённый
    G.arrow(g, O.x, O.y, O.x + L * sA, O.y - L * cA, 'rgba(255,255,255,.45)', 2, 10);
    const sinB = p.n1 / p.n2 * sA;
    if (sinB <= 1) {
      const b = Math.asin(sinB);
      G.arrow(g, O.x, O.y, O.x + L * Math.sin(b), O.y + L * Math.cos(b), '#4cc9f0', 3, 12);
      G.txt(g, 'преломлённый (β = ' + fmt(b * R2D, 1) + '°)', O.x + L * Math.sin(b) - 30, O.y + L * Math.cos(b) + 20, { col: '#4cc9f0', size: 12.5 });
      // дуги углов
      g.strokeStyle = '#ffd166'; g.lineWidth = 1.6;
      g.beginPath(); g.arc(O.x, O.y, 62, -Math.PI / 2 - a, -Math.PI / 2); g.stroke();
      g.strokeStyle = '#4cc9f0';
      g.beginPath(); g.arc(O.x, O.y, 62, Math.PI / 2 - b, Math.PI / 2); g.stroke();
    } else {
      G.arrow(g, O.x, O.y, O.x + L * sA, O.y - L * cA, '#8affe0', 3.4, 13);
      G.panel(g, O.x - 165, O.y + 62, 330, 50, { fill: 'rgba(255,80,80,.18)', stroke: 'rgba(255,140,140,.55)' });
      G.txt(g, 'ПОЛНОЕ ВНУТРЕННЕЕ ОТРАЖЕНИЕ', O.x, O.y + 86, { align: 'center', size: 14, weight: 700, col: '#ffb3b3' });
      G.txt(g, 'свет не выходит из среды n₁ — луч отражается целиком', O.x, O.y + 104, { align: 'center', size: 11.5, col: '#ffd0d0' });
    }
    const crit = p.n1 > p.n2 ? Math.asin(p.n2 / p.n1) * R2D : null;
    if (crit) {
      G.line(g, O.x, O.y, O.x + L * Math.sin(crit * D2R), O.y + L * Math.cos(crit * D2R), 'rgba(255,120,120,.55)', 1.4, [5, 5]);
      G.txt(g, 'предельный угол ' + fmt(crit, 1) + '°', O.x + L * Math.sin(crit * D2R) + 6, O.y + L * Math.cos(crit * D2R), { col: '#ff9d9d', size: 11.5 });
    }
  },
  readout(st) {
    const p = st.p, a = p.a * D2R, sinB = p.n1 / p.n2 * Math.sin(a);
    const crit = p.n1 > p.n2 ? Math.asin(p.n2 / p.n1) * R2D : null;
    let rows = `<div class="kv"><span>sin α</span><b>${fmt(Math.sin(a), 3)}</b></div>`;
    if (sinB <= 1) {
      const b = Math.asin(sinB);
      rows += `<div class="kv"><span>β</span><b>${fmt(b * R2D, 2)}°</b></div>
      <div class="kv"><span>sin β</span><b>${fmt(sinB, 3)}</b></div>
      <div class="kv"><span>sin α / sin β</span><b>${fmt(p.n2 / p.n1, 3)}</b></div>`;
    } else rows += `<div class="kv"><span>β</span><b>нет луча</b></div>`;
    return rows + `<div class="kv"><span>Предельный угол для n₁→n₂</span><b>${crit ? fmt(crit, 1) + '°' : 'не существует'}</b></div>
    <div class="note">Математика: углы измеряем, синусы считаем, получаем пропорцию <span class="f">sin α / sin β = n₂/n₁</span>. Физика: так работают линзы, очки, лупа, оптоволокно (полное внутреннее отражение) и миражи.</div>`;
  }
});

/* ---------- 3. Графики движения (алгебра / функции / информатика) ---------- */
defSim('kinematics', {
  title: '📈 Графики движения: физика + алгебра',
  aspect: .55,
  theoryNote: 'Уравнение движения — это <b>квадратичная функция</b> (парабола), а скорость — <b>линейная функция</b>. Физика задаёт смысл коэффициентов (v₀ — начальная скорость, a — ускорение), алгебра — способ их исследовать, информатика — построить график по точкам.',
  hint: 'Ползунки — это коэффициенты функции. Смотрите, как форма параболы связана с ускорением.',
  params: [
    { key: 'v0', label: 'Начальная скорость v₀', min: -5, max: 20, step: .2, val: 2, unit: 'м/с', dec: 1 },
    { key: 'a', label: 'Ускорение a', min: -4, max: 4, step: .1, val: 1.2, unit: 'м/с²', dec: 1 }
  ],
  init: () => ({ T: 8 }),
  step(st, dt) { if (st.t > st.T) { st.t = 0; } },   // время ведёт движок приложения (st.t += dt)
  draw(g, st, W, H) {
    const p = st.p, tmax = st.T, tc = st.t;
    G.bg(g, W, H);
    const xOf = t => p.v0 * t + p.a * t * t / 2;
    const vOf = t => p.v0 + p.a * t;
    let xmax = 1, vmax = 1;
    for (let t = 0; t <= tmax; t += .1) { xmax = Math.max(xmax, Math.abs(xOf(t))); vmax = Math.max(vmax, Math.abs(vOf(t))); }
    /* --- левая панель: движение --- */
    const LW = W * .40;
    G.panel(g, 10, 12, LW - 16, H - 26, { fill: 'rgba(255,255,255,.04)' });
    const road = H - 46, sc = (LW - 60) / xmax;
    G.line(g, 26, road, LW - 26, road, '#7ea4d8', 2);
    for (let i = 0; i <= 10; i++) { const x = 26 + i * (LW - 52) / 10; G.line(g, x, road, x, road + 5, 'rgba(150,190,240,.5)', 1); G.txt(g, fmt(i * xmax / 10, 0), x, road + 18, { size: 10, col: '#7ea4d8', align: 'center' }); }
    G.txt(g, 'x, м', LW - 30, road + 32, { size: 10.5, col: '#7ea4d8', align: 'right' });
    const bx = 26 + Math.max(0, xOf(Math.min(tc, tmax))) * sc;
    G.dot(g, bx, road - 12, 8, '#ffd166', '#fff');
    G.arrow(g, bx, road - 12, bx + Math.sign(vOf(tc)) * Math.min(38, Math.abs(vOf(tc)) * 3), road - 12, '#4cc9f0', 2.4, 9);
    G.txt(g, 't = ' + fmt(tc, 2) + ' с', 26, 34, { size: 12.5, col: '#cfe2ff' });
    G.txt(g, 'x = ' + fmt(xOf(tc), 2) + ' м', 26, 52, { size: 12.5, col: '#ffd166' });
    G.txt(g, 'v = ' + fmt(vOf(tc), 2) + ' м/с', 26, 70, { size: 12.5, col: '#4cc9f0' });
    G.txt(g, 'стрелка — вектор скорости', 26, H - 16, { size: 11, col: '#7ea4d8' });
    /* --- правая панель: графики --- */
    const gx0 = W * .46, gy0 = 16, gw = W - gx0 - 20, gh = H - 34;
    G.panel(g, gx0, gy0, gw, gh, { fill: 'rgba(255,255,255,.04)' });
    const px = t => gx0 + 34 + t / tmax * (gw - 46);
    const pyX = v => H - 24 - (v / xmax * .5 + .5) * (gh - 30);
    const pyV = v => H - 24 - (v / vmax * .5 + .5) * (gh - 30);
    G.line(g, gx0 + 34, H - 24 - (gh - 30) / 2, gx0 + gw - 12, H - 24 - (gh - 30) / 2, 'rgba(150,190,240,.4)', 1, [4, 5]);
    G.txt(g, 'x(t) — парабола', gx0 + 40, gy0 + 20, { size: 12, col: '#ffd166' });
    G.txt(g, 'v(t) — прямая', gx0 + 40, gy0 + 36, { size: 12, col: '#4cc9f0' });
    g.save(); g.beginPath();
    for (let t = 0; t <= tmax; t += .05) { const X = px(t), Y = pyX(xOf(t)); t ? g.lineTo(X, Y) : g.moveTo(X, Y); }
    g.strokeStyle = '#ffd166'; g.lineWidth = 2.6; g.stroke();
    g.beginPath();
    for (let t = 0; t <= tmax; t += .05) { const X = px(t), Y = pyV(vOf(t)); t ? g.lineTo(X, Y) : g.moveTo(X, Y); }
    g.strokeStyle = '#4cc9f0'; g.lineWidth = 2.4; g.stroke(); g.restore();
    G.dot(g, px(tc), pyX(xOf(tc)), 5, '#ffd166', '#fff');
    G.dot(g, px(tc), pyV(vOf(tc)), 5, '#4cc9f0', '#fff');
    G.line(g, px(tc), gy0 + 6, px(tc), H - 24, 'rgba(255,255,255,.35)', 1, [3, 4]);
    G.txt(g, 't, с', gx0 + gw - 20, H - 10, { size: 11, col: '#7ea4d8' });
  },
  readout(st) {
    const p = st.p, tc = st.t;
    const x = p.v0 * tc + p.a * tc * tc / 2, v = p.v0 + p.a * tc;
    return `<div class="kv"><span>Уравнение координаты (по учебнику § 4, 9 класс)</span><b>x = ${fmt(p.v0, 1)}t ${p.a >= 0 ? '+' : '−'} ${fmt(Math.abs(p.a) / 2, 2)}t²</b></div>
    <div class="kv"><span>Коэффициент при t² (он равен a/2)</span><b>a = ${fmt(p.a, 1)} м/с² → a/2 = ${fmt(p.a / 2, 2)} м/с²</b></div>
    <div class="kv"><span>Уравнение скорости</span><b>v = ${fmt(p.v0, 1)} ${p.a >= 0 ? '+' : '−'} ${fmt(Math.abs(p.a), 1)}t</b></div>
    <div class="kv"><span>x при t = ${fmt(tc, 2)} с</span><b>${fmt(x, 2)} м</b></div>
    <div class="kv"><span>v при t = ${fmt(tc, 2)} с</span><b>${fmt(v, 2)} м/с</b></div>
    <div class="kv"><span>Вид графика x(t)</span><b>${Math.abs(p.a) < .05 ? 'прямая (равномерное)' : p.a > 0 ? 'парабола ветвями вверх' : 'парабола ветвями вниз'}</b></div>
    <div class="note">Одна функция — три предмета: <b>алгебра</b> исследует квадратичную зависимость, <b>физика</b> читает по ней ускорение, <b>информатика</b> строит график по точкам в цикле — так рождается компьютерная модель.</div>`;
  }
});

/* ---------- 4. Численное моделирование маятника (информатика) ---------- */
function resetPendulum(st) {
  const th0 = (st.p.th0 || 35) * D2R;
  st.ref = { th: th0, w: 0 };
  st.sel = { th: th0, w: 0 };
  st.broken = false; st.resets = 0; st.trace = [];
}
defSim('pendulum', {
  title: '💻 Модель маятника: шаг, метод, ошибка',
  aspect: .62,
  theoryNote: 'Уравнение θ″ = −(g/L)·sin θ аналитически решается только для малых углов. Информатика даёт другой путь: <b>численное моделирование</b>. Уменьшая шаг h, мы повышаем точность — это и есть вычислительный эксперимент.',
  hint: 'Сравните два маятника: эталон (мелкий шаг, метод Рунге–Кутты) и вашу модель. Следите за ошибкой энергии.',
  params: [
    { key: 'h', label: 'Шаг интегрирования h', min: 1, max: 120, step: 1, val: 30, unit: 'мс', dec: 0 },
    { key: 'L', label: 'Длина нити L', min: .3, max: 2, step: .05, val: 1, unit: 'м', dec: 2 },
    { key: 'th0', label: 'Начальный угол θ₀', min: 5, max: 85, step: 1, val: 35, unit: '°', dec: 0 }
  ],
  selects: [{ key: 'method', label: 'Численный метод', val: 'euler', options: [{ v: 'euler', label: 'Метод Эйлера (простой)' }, { v: 'rk4', label: 'Рунге–Кутта 4-го порядка' }] }],
  actions: [{ label: '↺ Вернуть маятники в начальное положение', run: (st) => { resetPendulum(st); } }],
  init: () => ({ ref: null, sel: null, E0: 1, err: 0, broken: false, resets: 0, trace: [], tAcc: 0, cross: [], prevTh: null, Tmeas: 0 }),
  step(st, dt) {
    const p = st.p, th0 = p.th0 * D2R;
    if (!st.ref || st.th0c !== p.th0 || st.Lc !== p.L) {
      st.th0c = p.th0; st.Lc = p.L; resetPendulum(st);
      st.tAcc = 0; st.cross = []; st.prevTh = null; st.Tmeas = 0;
      st.E0 = 9.81 / p.L * (1 - Math.cos(th0));   // потенциальная энергия в начальный момент
    }
    const acc = (th) => -9.81 / p.L * Math.sin(th);
    // эталон: RK4, шаг 1 мс
    let n = Math.min(400, Math.ceil(dt / .001));
    const hr = dt / n;
    for (let i = 0; i < n; i++) { const r = rk4(st.ref, hr, p.L); st.ref = r; }
    // модель пользователя
    const hm = Math.min(p.h / 1000, dt);
    let n2 = Math.min(200, Math.max(1, Math.ceil(dt / hm))), hs = dt / n2;
    for (let i = 0; i < n2; i++) {
      st.sel = (st.p.method === 'rk4') ? rk4(st.sel, hs, p.L) : euler(st.sel, hs, p.L);
      if (!isFinite(st.sel.th) || !isFinite(st.sel.w) || Math.abs(st.sel.th) > 3.4) { st.sel = { th: th0, w: 0 }; st.broken = true; st.resets++; break; }
    }
    st.warn = st.broken;
    /* измеряем период эталонного маятника: моменты прохождения положения равновесия */
    st.tAcc += dt;
    if (st.prevTh !== null && Math.abs(st.ref.th) > 1e-9 && (st.prevTh > 0) !== (st.ref.th > 0)) {
      // линейная интерполяция момента прохождения положения равновесия (точнее, чем шаг 1/60 с)
      const tc = st.tAcc - dt + dt * (st.prevTh / (st.prevTh - st.ref.th));
      st.cross.push(tc); if (st.cross.length > 5) st.cross.shift();
      if (st.cross.length >= 2) {
        const N = st.cross.length;
        st.Tmeas = 2 * (st.cross[N - 1] - st.cross[0]) / (N - 1);   // два прохода через нуль = полный период
      }
    }
    st.prevTh = st.ref.th;
    const Es = .5 * st.sel.w ** 2 + 9.81 / p.L * (1 - Math.cos(st.sel.th));
    st.err = (Es - st.E0) / Math.max(.05, st.E0) * 100;
    st.traceT = (st.traceT || 0) + dt;
    if (st.traceT > .12) { st.traceT = 0; st.trace.push(st.err); if (st.trace.length > 120) st.trace.shift(); }
    function euler(s, h, L) { const a = -9.81 / L * Math.sin(s.th); return { th: s.th + s.w * h, w: s.w + a * h }; }
    function rk4(s, h, L) {
      const f = (th, w) => [w, -9.81 / L * Math.sin(th)];
      const [k1t, k1w] = f(s.th, s.w), [k2t, k2w] = f(s.th + h / 2 * k1t, s.w + h / 2 * k1w);
      const [k3t, k3w] = f(s.th + h / 2 * k2t, s.w + h / 2 * k2w), [k4t, k4w] = f(s.th + h * k3t, s.w + h * k3w);
      return { th: s.th + h / 6 * (k1t + 2 * k2t + 2 * k3t + k4t), w: s.w + h / 6 * (k1w + 2 * k2w + 2 * k3w + k4w) };
    }
  },
  draw(g, st, W, H) {
    G.bg(g, W, H);
    const p = st.p;
    if (!st.ref) return;
    const drawP = (x0, s, col, label, sub) => {
      const px = x0, py = H * .30;
      G.line(g, px - 44, py, px + 44, py, '#7ea4d8', 3);
      const l = (H * .30) * Math.min(1, p.L / 2) + 26;
      const ex = px + Math.sin(s.th) * l * (1 / Math.max(1, p.L / 2) * 1), ey = py + Math.cos(s.th) * l;
      G.line(g, px, py, px + Math.sin(s.th) * l, py + Math.cos(s.th) * l, 'rgba(200,225,255,.55)', 1.6);
      G.dot(g, px + Math.sin(s.th) * l, py + Math.cos(s.th) * l, 13, col, '#fff');
      G.txt(g, label, px, py - 16, { align: 'center', size: 13, weight: 700, col: col });
      G.txt(g, sub, px, py + H * .30 + 34, { align: 'center', size: 11.5, col: '#9fb8dd' });
    };
    drawP(W * .27, st.ref, '#4cc9f0', 'эталон', 'RK4, h = 1 мс');
    drawP(W * .73, st.sel, st.warn ? '#ff6b6b' : '#ffd166', 'ваша модель',
      (p.method === 'rk4' ? 'Рунге–Кутта' : 'Эйлер') + ', h = ' + fmt(p.h, 0) + ' мс');
    // график ошибки
    const gy = H * .58, gh = H * .34;
    G.panel(g, 14, gy - 6, W - 28, gh + 14, { fill: 'rgba(255,255,255,.04)' });
    G.txt(g, 'ошибка энергии модели, %', 22, gy + 10, { size: 11.5, col: '#9fb8dd' });
    G.txt(g, '0', 22, gy + gh * .72, { size: 10.5, col: '#7ea4d8' });
    G.line(g, 14, gy + gh * .7, W - 14, gy + gh * .7, 'rgba(150,190,240,.4)', 1, [4, 4]);
    const tr = st.trace || [], sc = gh * .55;
    g.save(); g.beginPath();
    tr.forEach((e, i) => { const X = 20 + i * ((W - 44) / 119), Y = gy + gh * .7 - Math.max(-1.4, Math.min(1.4, e)) * sc; i ? g.lineTo(X, Y) : g.moveTo(X, Y); });
    g.strokeStyle = Math.abs(st.err) > 1 ? '#ff6b6b' : '#8affe0'; g.lineWidth = 2; g.stroke(); g.restore();
  },
  readout(st) {
    const p = st.p;
    const E = st.err || 0;
    const cls = Math.abs(E) < .5 ? 'ok' : Math.abs(E) < 5 ? 'warn' : 'bad';
    return `<div class="kv"><span>Шаг h</span><b>${fmt(p.h, 0)} мс = ${fmt(p.h / 1000, 3)} с</b></div>
    <div class="kv"><span>Метод</span><b>${p.method === 'rk4' ? 'Рунге–Кутта (4)' : 'Эйлер (1 порядок)'}</b></div>
    <div class="kv"><span>Отклонение энергии</span><b><span class="badge ${cls}">${fmt(E, 2)} %</span></b></div>
    <div class="kv"><span>Период по формуле малых колебаний T₀ = 2π√(L/g)</span><b>${fmt(2 * Math.PI * Math.sqrt(st.p.L / 9.81), 3)} с</b></div>
    <div class="kv"><span>Уточнение для большого угла: T ≈ T₀·(1 + θ₀²/16)</span><b>${fmt(2 * Math.PI * Math.sqrt(st.p.L / 9.81) * (1 + Math.pow(st.p.th0 * D2R, 2) / 16), 3)} с (θ₀ = ${fmt(st.p.th0, 0)}°)</b></div>
    <div class="kv"><span>Период, измеренный по эталонной модели</span><b>${st.Tmeas > .05 ? fmt(st.Tmeas, 3) + ' с (отличие от формулы малых колебаний ' + fmt((st.Tmeas / (2 * Math.PI * Math.sqrt(st.p.L / 9.81)) - 1) * 100, 1) + ' %)' : 'измеряется…'}</b></div>
    <div class="kv"><span>Аварийных перезапусков</span><b>${st.resets || 0}</b></div>
    <div class="note">${st.warn
      ? '⚠️ Модель «взорвалась»: шаг слишком велик, метод Эйлера теряет устойчивость. Уменьшите h или выберите Рунге–Кутту.'
      : Math.abs(E) < 1
        ? '✅ Численное решение практически совпадает с эталоном: энергия сохраняется. Увеличьте h — и точность начнёт падать, зато расчёт станет быстрее. Это классический компромисс «точность ↔ время счёта» в информатике.'
        : Math.abs(E) < 15
          ? '⚠️ Заметное расхождение с эталоном: шаг великоват для метода Эйлера. Уменьшите h в 2–3 раза или переключитесь на Рунге–Кутту — ошибка резко упадёт.'
          : '❌ Метод Эйлера сильно «разгоняет» маятник: энергия модели растёт с каждым шагом. Уменьшите h или смените метод — так в вычислительной физике выбирают между точностью и скоростью.'}</div>`;
  }
});

/* ---------- 5. Электролиз (химия) ---------- */
defSim('electrolysis', {
  title: '⚗️ Электролиз раствора CuSO₄',
  aspect: .6,
  theoryNote: 'Физика даёт <b>силу тока, заряд и электрон</b>, химия — <b>ионы, валентность и молярную массу</b>. Объединённый закон Фарадея: m = (M / (z·F))·I·t связывает оба предмета в одну формулу.',
  hint: 'Увеличьте силу тока: ионы движутся быстрее, масса меди на катоде растёт быстрее.',
  params: [{ key: 'I', label: 'Сила тока I', min: 0, max: 5, step: .1, val: 2, unit: 'А', dec: 1 }],
  actions: [{ label: '↺ Обнулить счётчики и смыть медь', run: (st) => { st.q = 0; st.m = 0; st.el = 0; st.cu = 0; st.ions.forEach(i => { i.u = .5; }); } }],
  init: () => ({
    ions: [], q: 0, m: 0, cu: 0, el: 0,
    make: function () { this.ions = []; for (let i = 0; i < 46; i++) this.ions.push({ u: Math.random(), v: Math.random(), cat: i % 2 === 0, ph: Math.random() * TAU }); }
  }),
  step(st, dt) {
    if (!st.ions.length) st.make();
    const p = st.p, I = p.I;
    st.el = (st.el || 0) + dt;
    st.q += I * dt;
    const dm = 0.3294 * I * dt; // мг
    st.m += dm;
    for (const ion of st.ions) {
      ion.u += (ion.cat ? -1 : 1) * (0.02 + I * 0.055) * dt * (1 + .25 * Math.sin(st.t * 3 + ion.ph));
      ion.v += Math.sin(st.t * 4 + ion.ph) * .004;
      ion.u = Math.max(.02, Math.min(.98, ion.u));
      if (ion.cat && ion.u <= .02) { st.cu++; ion.u = .5; ion.v = .2 + Math.random() * .6; }
      if (!ion.cat && ion.u >= .98) { ion.u = .5; ion.v = .2 + Math.random() * .6; }
    }
  },
  draw(g, st, W, H) {
    G.bg(g, W, H);
    const beaker = { x: W * .16, y: H * .24, w: W * .68, h: H * .60 };
    // стакан и раствор
    G.panel(g, beaker.x, beaker.y, beaker.w, beaker.h, { fill: 'rgba(60,150,255,.16)', stroke: 'rgba(180,220,255,.5)', r: 12 });
    G.txt(g, 'раствор CuSO₄', beaker.x + 10, beaker.y + beaker.h - 10, { size: 12, col: '#a9d3ff' });
    // электроды
    const cx = beaker.x + beaker.w * .18, ax = beaker.x + beaker.w * .82;
    G.bar(g, cx - 7, beaker.y + 6, 14, beaker.h - 30, '#c9a227');
    G.bar(g, ax - 7, beaker.y + 6, 14, beaker.h - 30, '#8b93a8');
    // слой меди на катоде
    const coat = Math.min(9, st.m / 220);
    if (coat > .2) G.bar(g, cx - 7 - coat, beaker.y + 6, coat, beaker.h - 30, '#e0873c');
    G.txt(g, 'катод «−»', cx, beaker.y + beaker.h + 18, { align: 'center', size: 12.5, col: '#ffd166' });
    G.txt(g, 'анод «+»', ax, beaker.y + beaker.h + 18, { align: 'center', size: 12.5, col: '#e08080' });
    // ионы
    st.ions.forEach(ion => {
      const x = beaker.x + 24 + ion.u * (beaker.w - 48);
      const y = beaker.y + 26 + ion.v * (beaker.h - 58);
      G.dot(g, x, y, ion.cat ? 5.4 : 6.2, ion.cat ? '#4cc9f0' : '#ffd166', ion.cat ? '#bfeaff' : '#fff0c2');
    });
    G.dot(g, W * .30, H * .09, 6, '#4cc9f0', '#fff'); G.txt(g, 'Cu²⁺ (катион) → к катоду', W * .32, H * .11, { size: 12, col: '#8fd7ff' });
    G.dot(g, W * .70, H * .09, 7, '#ffd166', '#fff'); G.txt(g, 'SO₄²⁻ (анион) → к аноду', W * .72, H * .11, { size: 12, col: '#ffe6a0' });
    // батарея
    G.line(g, cx, beaker.y + 6, cx, 40); G.line(g, ax, beaker.y + 6, ax, 40);
    G.line(g, cx, 40, W * .44, 40); G.line(g, ax, 40, W * .56, 40);
    G.line(g, W * .44, 24, W * .44, 56, '#fff', 3); G.line(g, W * .56, 26, W * .56, 54, '#fff', 1.6);
    G.txt(g, 'I = ' + fmt(st.p.I, 1) + ' А', W * .5, 20, { align: 'center', size: 12.5, col: '#cfe2ff' });
  },
  readout(st) {
    const p = st.p;
    return `<div class="kv"><span>Сила тока I</span><b>${fmt(p.I, 1)} А</b></div>
    <div class="kv"><span>Время t</span><b>${fmt(st.el || 0, 1)} с</b></div>
    <div class="kv"><span>Прошёл заряд q = I·t</span><b>${fmt(st.q, 1)} Кл</b></div>
    <div class="kv"><span>Масса меди m = k·I·t</span><b>${fmt(st.m, 1)} мг</b></div>
    <div class="kv"><span>Электронов, прошедших через раствор</span><b>${sci(st.q / 1.6e-19, 2)}</b></div>
    <div class="note">Одна формула — два предмета: <span class="f">q = I·t</span> (физика), <span class="f">m = M·q / (z·F)</span> (химия), F = 96 485 Кл/моль. Так же считают гальваническое покрытие деталей, очистку металлов и работу аккумулятора.</div>`;
  }
});

/* ---------- 6. Диффузия и МКТ (химия / биология) ---------- */
defSim('diffusion', {
  title: '🌫 Диффузия: молекулы в движении',
  aspect: .58,
  theoryNote: 'Молекулярно-кинетическая теория объясняет и химическое <b>перемешивание веществ</b>, и биологический <b>газообмен</b>: скорость диффузии растёт с температурой, потому что растёт средняя скорость молекул (v ~ √T).',
  hint: 'Уберите перегородку и повышайте температуру: следите за графиком перемешивания.',
  params: [{ key: 'T', label: 'Температура', min: 0, max: 100, step: 1, val: 20, unit: '°C', dec: 0 }],
  actions: [
    { label: '⬛ Убрать перегородку', primary: true, run: (st) => { st.barrier = false; } },
    { label: '▮ Вернуть перегородку и перемешать заново', run: (st) => { st.barrier = true; st.mix = []; st.mixT = 0; st.ps.forEach((q, i) => { q.cat = i % 2 === 0; q.x = (i % 2 === 0 ? 0.05 + Math.random() * .42 : 0.53 + Math.random() * .42); q.y = .08 + Math.random() * .84; }); } }
  ],
  init: () => ({
    ps: [], barrier: true, mix: [], mixT: 0,
    make: function () {
      this.ps = [];
      for (let i = 0; i < 130; i++) this.ps.push({ x: i % 2 === 0 ? .05 + Math.random() * .42 : .53 + Math.random() * .42, y: .08 + Math.random() * .84, cat: i % 2 === 0, a: Math.random() * TAU, ph: Math.random() * TAU });
    }
  }),
  step(st, dt) {
    if (!st.ps.length) st.make();
    const T = st.p.T, v = (.05 + .16 * Math.sqrt((T + 273) / 293)) ;
    for (const q of st.ps) {
      q.a += (Math.random() - .5) * 6 * dt;
      q.x += Math.cos(q.a) * v * dt; q.y += Math.sin(q.a) * v * dt;
      if (q.y < .06) { q.y = .06; q.a = -q.a; }
      if (q.y > .94) { q.y = .94; q.a = -q.a; }
      if (q.x < .03) { q.x = .03; q.a = Math.PI - q.a; }
      if (q.x > .97) { q.x = .97; q.a = Math.PI - q.a; }
      if (st.barrier) {
        if (q.x > .47 && q.x < .53) { q.x = q.cat ? .47 : .53; q.a = Math.PI - q.a; }
      }
    }
    const blueLeft = st.ps.filter(q => q.cat && q.x < .5).length, all = st.ps.filter(q => q.cat).length;
    st.M = Math.abs(2 * (blueLeft / all) - 1);
    st.mixT += dt;
    if (st.mixT > .35) { st.mixT = 0; st.mix.push(st.M); if (st.mix.length > 90) st.mix.shift(); }
  },
  draw(g, st, W, H) {
    G.bg(g, W, H);
    const box = { x: 16, y: 16, w: W - 32, h: H - 74 };
    G.panel(g, box.x, box.y, box.w, box.h, { fill: 'rgba(255,255,255,.035)' });
    if (st.barrier) G.line(g, box.x + box.w * .5, box.y + 6, box.x + box.w * .5, box.y + box.h - 6, '#9fd0ff', 3);
    for (const q of st.ps) {
      const x = box.x + q.x * box.w, y = box.y + q.y * box.h;
      G.dot(g, x, y, 4.6, q.cat ? '#4cc9f0' : '#ff7b54', q.cat ? '#c9ecff' : '#ffd6c9');
    }
    G.txt(g, '«синие» молекулы (например, пары духов / O₂)', box.x + 8, box.y + box.h - 10, { size: 11.5, col: '#8fd7ff' });
    G.txt(g, '«оранжевые» молекулы (воздух / CO₂)', box.x + 8, box.y + box.h - 26, { size: 11.5, col: '#ffb499' });
    // график перемешивания
    const gy = box.y + box.h + 14, gh = H - gy - 12;
    G.line(g, 16, gy + gh, W - 16, gy + gh, 'rgba(150,190,240,.4)', 1, [4, 4]);
    g.save(); g.beginPath();
    (st.mix || []).forEach((m, i) => { const X = 16 + i * ((W - 32) / 89); const Y = gy + gh - m * gh; i ? g.lineTo(X, Y) : g.moveTo(X, Y); });
    g.strokeStyle = '#8affe0'; g.lineWidth = 2.2; g.stroke(); g.restore();
    G.txt(g, 'перемешивание 0–100 %', 20, gy + 12, { size: 11, col: '#9fb8dd' });
  },
  readout(st) {
    const p = st.p, vr = Math.sqrt((p.T + 273) / 293);
    const M = (1 - (st.M || 0)) * 100;
    return `<div class="kv"><span>Перемешивание</span><b>${fmt(M, 0)} %</b></div>
    <div class="kv"><span>Относит. скорость молекул (v ~ √T)</span><b>${fmt(vr, 2)} × от 20 °C</b></div>
    <div class="kv"><span>Перегородка</span><b>${st.barrier ? 'есть' : 'убрана'}</b></div>
    <div class="kv"><span>Число молекул в модели</span><b>${st.ps.length}</b></div>
    <div class="note">При 100 °C средняя скорость молекул примерно в <b>1,13 раза</b> больше, чем при 20 °C, поэтому диффузия идёт быстрее. В биологии это газообмен в альвеолах и осмос в корнях, в химии — скорость реакции, в физике — броуновское движение.</div>`;
  }
});

/* ---------- 7. Агрегатные состояния: диалектика (философия / химия / география) ---------- */
defSim('phases', {
  title: '🧊 Плавление и кипение: количество → качество',
  aspect: .6,
  theoryNote: 'На графике видны <b>ступеньки</b>: тепло подводится, а температура не меняется — идёт фазовый переход. Это наглядная иллюстрация закона диалектики «переход количества в качество» и единства противоположностей (плавление ⇄ кристаллизация).',
  hint: 'Теплота растёт автоматически. Смотрите на столбик термометра и на площадки графика.',
  params: [{ key: 'Q', label: 'Подведённая теплота Q (на 1 кг)', min: 0, max: 3100, step: 5, val: 0, unit: 'кДж/кг', dec: 0 }],
  actions: [
    { label: '❄ Заморозить снова', run: (st, api) => { st.p.Q = 0; st.manual = false; api.sync(); } },
    { label: '▶ Включить автоподогрев', primary: true, run: (st) => { st.manual = false; } }
  ],
  onChange(st, k, v) { if (k === 'Q') st.manual = true; },
  step(st, dt) {
    if (!st.manual) { st.p.Q = (st.p.Q + 200 * dt) % 3100; syncMaybe(st); }
  },
  draw(g, st, W, H) {
    const Q = st.p.Q;
    const s = phase(Q);
    G.bg(g, W, H);
    // сосуд
    const vx = W * .10, vy = H * .18, vw = W * .30, vh = H * .62;
    G.panel(g, vx, vy, vw, vh, { fill: 'rgba(90,170,255,.14)', stroke: 'rgba(180,220,255,.45)' });
    const lvl = vh * Math.min(1, s.water);
    G.bar(g, vx + 2, vy + vh - lvl, vw - 4, lvl, 'rgba(80,170,255,.45)');
    // «лёд»
    const cubes = Math.round(s.ice * 9);
    for (let i = 0; i < cubes; i++) {
      const cx = vx + 16 + (i % 3) * (vw / 3.4), cy = vy + vh - 26 - Math.floor(i / 3) * 26;
      G.bar(g, cx, cy, 22, 20, 'rgba(210,240,255,.75)');
    }
    // пузыри и пар
    for (let i = 0; i < 12; i++) {
      const ph = (st.t * (.4 + s.boil * 1.6) + i * .37) % 1;
      if (s.boil > .05) G.dot(g, vx + 14 + ((i * 37) % (vw - 28)), vy + vh - ph * (vh - 20), 2 + 3 * s.boil, 'rgba(200,235,255,' + (0.8 - ph * .6) + ')');
      if (s.evap > .02) G.dot(g, vx + 20 + ((i * 53) % (vw - 40)), vy - 6 - ph * 40, 3 + 4 * s.evap, 'rgba(190,225,255,' + (0.55 - ph * .4) + ')');
    }
    G.txt(g, 'вещество: вода', vx, vy - 6, { size: 12.5, col: '#a9d3ff' });
    // термометр
    const tx = W * .48, ty = H * .18, th = H * .62;
    G.panel(g, tx, ty, 26, th, { fill: 'rgba(255,255,255,.07)' });
    const frac = (s.T + 20) / 140;
    G.bar(g, tx + 6, ty + th - frac * th, 14, frac * th, s.T >= 100 ? '#ff7b54' : s.T <= 0 ? '#4cc9f0' : '#ffd166');
    for (let T = -20; T <= 120; T += 20) {
      const y = ty + th - ((T + 20) / 140) * th;
      G.line(g, tx + 26, y, tx + 34, y, 'rgba(180,210,250,.5)', 1);
      G.txt(g, T + '°', tx + 38, y + 4, { size: 10.5, col: '#93aed6' });
    }
    G.txt(g, fmt(s.T, 0) + ' °C', tx - 4, ty + th + 18, { size: 13.5, weight: 700, col: '#ffd166' });
    G.txt(g, s.name, tx - 22, ty + th + 38, { size: 13, weight: 700, col: '#8affe0' });
    // график T(Q)
    const gx = W * .62, gy = H * .18, gw = W * .34, gh = H * .62;
    G.panel(g, gx, gy, gw, gh, { fill: 'rgba(255,255,255,.04)' });
    const PX = q => gx + 30 + q / 3100 * (gw - 44), PY = T => gy + gh - 18 - (T + 20) / 140 * (gh - 30);
    g.save(); g.beginPath();
    for (let q = 0; q <= 3100; q += 10) { const S = phase(q); const X = PX(q), Y = PY(S.T); q ? g.lineTo(X, Y) : g.moveTo(X, Y); }
    g.strokeStyle = '#4cc9f0'; g.lineWidth = 2.6; g.stroke(); g.restore();
    G.txt(g, 'T, °C', gx + 8, gy + 16, { size: 11.5, col: '#9fb8dd' });
    G.txt(g, 'Q, кДж/кг', gx + gw - 16, gy + gh - 4, { size: 11.5, col: '#9fb8dd', align: 'right' });
    G.txt(g, 'плавление', PX(200) - 24, PY(0) + 16, { size: 11, col: '#ffd166' });
    G.txt(g, 'кипение', PX(1900) - 22, PY(100) + 16, { size: 11, col: '#ff9d7b' });
    G.dot(g, PX(Q), PY(s.T), 6, '#ffd166', '#fff');
    G.line(g, PX(Q), gy + 6, PX(Q), gy + gh - 6, 'rgba(255,255,255,.3)', 1, [3, 4]);
    function phase(q) {
      const r = { T: -20, ice: 1, water: 0, evap: 0, boil: 0, name: 'лёд' };
      if (q < 42) { r.T = -20 + q / 42 * 20; r.ice = 1; r.water = 0; r.name = 'лёд нагревается'; }
      else if (q < 376) { r.T = 0; r.ice = 1 - (q - 42) / 334; r.water = (q - 42) / 334; r.name = 'ПЛАВЛЕНИЕ: T = 0 °C'; }
      else if (q < 796) { r.T = (q - 376) / 420 * 100; r.ice = 0; r.water = 1; r.name = 'вода нагревается'; }
      else if (q < 3056) { r.T = 100; r.ice = 0; r.water = 1; r.evap = (q - 796) / 2260; r.boil = Math.min(1, r.evap * 3); r.name = 'КИПЕНИЕ: T = 100 °C'; }
      else { r.T = 100 + (q - 3056) / 40 * 20; r.water = 1; r.evap = 1; r.name = 'пар нагревается'; }
      return r;
    }
  },
  readout(st) {
    const Q = st.p.Q;
    let T, name;
    if (Q < 42) { T = -20 + Q / 42 * 20; name = 'лёд, нагрев'; } else if (Q < 376) { T = 0; name = 'плавление (Q расходуется на разрушение кристалла)'; }
    else if (Q < 796) { T = (Q - 376) / 420 * 100; name = 'вода, нагрев'; } else if (Q < 3056) { T = 100; name = 'кипение (Q расходуется на парообразование)'; }
    else { T = 100 + (Q - 3056) / 40 * 20; name = 'перегретый пар'; }
    return `<div class="kv"><span>Подведённая теплота</span><b>${fmt(Q, 0)} кДж/кг</b></div>
    <div class="kv"><span>Температура</span><b>${fmt(T, 0)} °C</b></div>
    <div class="kv"><span>Что происходит</span><b>${name}</b></div>
    <div class="kv"><span>Сравните</span><b>плавление 334 ÷ кипение 2260 кДж/кг</b></div>
    <div class="note">Обратите внимание: чтобы расплавить лёд, нужно 334 кДж/кг, а чтобы превратить ту же воду в пар — 2260 кДж/кг, почти в 7 раз больше. Здесь же «работает» и <b>физика атмосферы</b>: испарение охлаждает, конденсация греет — отсюда дождь, туман и погода.</div>`;
  }
});

/* синхронизация слайдера с автоизменением параметра (автоподогрев, пресеты) */
let _syncers = [];
function syncMaybe(st) { for (let i = 0; i < _syncers.length; i++) { const s = _syncers[i]; if (s.st === st) s.f(); } }
function clearSyncers() { _syncers = []; }


/* ==== sims2.js ==== */
/* ============ СИМУЛЯТОРЫ: БИОЛОГИЯ, ГЕОГРАФИЯ, АСТРОНОМИЯ, ТЕХНИКА ============ */
/* Атмосфера: стандартная барометрическая формула для тропосферы (до 11 км)
   p = p₀·(1 − 0,0065·h/288,15)^5,255 и температура кипения по уравнению Клапейрона–Клаузиуса. */
function airPressurePa(h) { return 101325 * Math.pow(1 - .0065 * Math.min(11000, h) / 288.15, 5.255); }
function boilTempC(p) {
  const Rv = 461.5, Lv = 2.26e6, T0 = 373.15;
  const invT = 1 / T0 - (Rv / Lv) * Math.log(p / 101325);
  return 1 / invT - 273.15;
}

/* Положение максимума бегущей волны в улитке (доля длины от основания).
   Шкала Гринвуда (биология слуха): f = 165,4·(10^(0,06·x) − 0,88), x — мм от вершины (0…35 мм).
   Обратная функция: x = (1/0,06)·lg(f/165,4 + 0,88); доля от основания = 1 − x/35. */
function cochPos(f) {
  const x = Math.log10(Math.max(20, f) / 165.4 + .88) / .06;
  return Math.max(.02, Math.min(.99, 1 - x / 35));
}

/* ---------- 8. Глаз, линза и очки (биология + геометрия) ---------- */
defSim('eye', {
  title: '👁 Глаз, линза и очки',
  aspect: .56,
  theoryNote: 'Глаз — это <b>оптическая система</b> из биологии, а работает она по формуле тонкой линзы из физики: D = 1/d + 1/f. Отсюда и очки: изменили оптическую силу системы — изображение вернулось на сетчатку.',
  hint: 'Двигайте «оптическую силу глаза» (это аккомодация — работа ресничной мышцы) и длину глаза: изображение уходит с сетчатки и становится размытым.',
  params: [
    { key: 'd', label: 'Расстояние до предмета', min: 15, max: 500, step: 5, val: 500, unit: 'см', dec: 0 },
    { key: 'De', label: 'Оптическая сила глаза', min: 38, max: 52, step: .1, val: 41.9, unit: 'дптр', dec: 1 },
    { key: 'L', label: 'Длина глаза (до сетчатки)', min: 20, max: 28, step: .1, val: 24, unit: 'мм', dec: 1 },
    { key: 'Dg', label: 'Очки (оптическая сила)', min: -6, max: 6, step: .25, val: 0, unit: 'дптр', dec: 2 }
  ],
  actions: [
    { label: 'Здоровый глаз, далёкий предмет', run: (st, a) => { st.p.d = 500; st.p.De = 41.9; st.p.L = 24; st.p.Dg = 0; a.sync(); } },
    { label: 'Здоровый глаз читает книгу', run: (st, a) => { st.p.d = 25; st.p.De = 45.7; st.p.L = 24; st.p.Dg = 0; a.sync(); } },
    { label: 'Близорукость', run: (st, a) => { st.p.d = 500; st.p.De = 41.9; st.p.L = 26; st.p.Dg = 0; a.sync(); } },
    { label: 'Дальнозоркость', run: (st, a) => { st.p.d = 25; st.p.De = 41.9; st.p.L = 22.5; st.p.Dg = 0; a.sync(); } },
    { label: '👓 Подобрать очки', primary: true, run: (st, a) => { const need = 1000 / st.p.L + 100 / st.p.d - st.p.De; st.p.Dg = Math.round(need * 4) / 4; a.sync(); a.notify('Очки подобраны автоматически: ' + fmt(st.p.Dg, 2) + ' дптр. Формула: Dочк = 1000/L + 1/d − Dглаза.'); } }
  ],
  draw(g, st, W, H) {
    const p = st.p, S = 15.5;
    G.bg(g, W, H);
    const x0 = W * .30, yc = H * .48;
    const Lmm = p.L, fmm = 1000 / (p.De + p.Dg - 100 / p.d);
    const pupilR = 2.2;                     // мм, полрадиуса зрачка
    // глазное яблоко
    g.save();
    g.beginPath(); g.arc(x0 + Lmm * S / 2, yc, Lmm * S / 2, -Math.PI / 2.05, Math.PI / 2.05); g.closePath();
    g.fillStyle = 'rgba(200,230,255,.13)'; g.fill(); g.strokeStyle = 'rgba(190,220,255,.5)'; g.lineWidth = 2; g.stroke();
    // сетчатка (тонкая линия — плоскость, где фокусируется изображение)
    g.beginPath(); g.arc(x0 + Lmm * S / 2, yc, Lmm * S / 2 + 2, -Math.PI / 3.05, Math.PI / 3.05);
    g.strokeStyle = '#ff8fa3'; g.lineWidth = 3; g.stroke();
    g.restore();
    G.txt(g, 'сетчатка', x0 + Lmm * S + 14, yc - Lmm * S * .42, { size: 12, col: '#ff9db1' });
    G.txt(g, 'роговица и хрусталик', x0 - 6, yc - Lmm * S * .5 - 12, { size: 12, col: '#bfe0ff' });
    // хрусталик
    g.save(); g.fillStyle = 'rgba(120,200,255,.35)'; g.strokeStyle = '#7fd0ff'; g.lineWidth = 2;
    g.beginPath(); g.ellipse(x0, yc, 7, Lmm * S * .30, 0, 0, TAU); g.fill(); g.stroke(); g.restore();
    // лучи
    const dmm = p.d * 10, objX = Math.max(14, x0 - Math.min(W * .30, dmm * S * .35));
    const hObj = 8;                         // мм — половина высоты предмета
    const objY = yc - hObj * S * .9;        // стрелка предмета направлена вверх
    G.arrow(g, objX, yc, objX, objY, '#8affe0', 3, 10);
    G.txt(g, 'предмет', objX - 8, yc - 8, { size: 12, col: '#8affe0' });
    const ty = objY;
    const hpx = objY < yc ? (yc - objY) : (objY - yc);   // высота предмета в пикселях
    const xR = x0 + Lmm * S;                             // плоскость сетчатки
    const xImg = x0 + fmm * S;                           // где сходятся лучи (может быть слева, если рассеиваются)
    const imgY = fmm > 0 ? yc + (fmm / dmm) * hpx        // действительное, перевёрнутое
                         : yc - (Math.abs(fmm) / dmm) * hpx; // мнимое, прямое
    const rayEnds = [];
    // три луча: параллельный оси, через центр линзы, через край зрачка
    [objY, yc, yc - pupilR * S].forEach(yl => {
      G.line(g, objX, ty, x0, yl, 'rgba(255,209,102,.85)', 1.5);
      let dx, dy;
      if (fmm > 0) { dx = xImg - x0; dy = imgY - yl; }
      else { dx = x0 - xImg; dy = yl - imgY; }
      if (Math.abs(dx) < 1) dx = 1;
      const k = (xR - x0) / dx;
      const yEnd = yl + dy * k;
      const xMid = fmm > 0 ? xImg : xR;
      G.line(g, x0, yl, xMid, yl + dy * ((xMid - x0) / dx), 'rgba(255,209,102,.85)', 1.4);
      if (fmm > 0 && xImg < xR - 2) G.line(g, xImg, imgY, xR, yEnd, 'rgba(255,209,102,.5)', 1.2);
      rayEnds.push(yEnd);
    });
    // точка изображения
    if (fmm > 0 && xImg > x0 && xImg < W - 6) {
      G.arrow(g, xImg, yc, xImg, imgY, '#ffd166', 2.6, 9);
      G.txt(g, 'изображение', Math.min(xImg + 6, W - 120), imgY + 16, { size: 11, col: '#ffd166' });
    } else if (fmm <= 0) {
      G.txt(g, 'лучи расходятся — изображения за линзой нет', W * .30, H * .14, { size: 12.5, col: '#ff9d9d' });
    }
    // плоскость линзы
    G.line(g, x0, yc - Lmm * S * .55, x0, yc + Lmm * S * .55, 'rgba(140,200,255,.5)', 1.4, [5, 4]);
    // световое пятно на сетчатке: разброс лучей в плоскости сетчатки
    const blurPx = Math.max(...rayEnds) - Math.min(...rayEnds);
    const spotC = (Math.max(...rayEnds) + Math.min(...rayEnds)) / 2;
    if (isFinite(blurPx) && blurPx > 1.5) {
      g.save();
      g.fillStyle = 'rgba(255,240,180,' + Math.min(.8, .16 + blurPx / 50) + ')';
      g.beginPath(); g.ellipse(xR, spotC, 5, Math.min(Lmm * S / 2, Math.max(1.5, blurPx / 2)), 0, 0, TAU); g.fill(); g.restore();
    }
    G.panel(g, 12, H - 64, 258, 52);
    G.txt(g, 'сходимость лучей: ' + (fmm > 0 ? fmt(fmm, 1) + ' мм' : 'лучи расходятся') + ', сетчатка ' + fmt(Lmm, 1) + ' мм', 20, H - 42, { size: 12, col: '#cfe2ff' });
    G.txt(g, blurPx < 2.5 ? '✅ резкое изображение на сетчатке' : '❌ размытое пятно ' + fmt(blurPx / S, 2) + ' мм — нужно изменить оптическую силу', 20, H - 22, { size: 12.5, weight: 700, col: blurPx < 2.5 ? '#8affe0' : '#ff9d9d' });
  },
  readout(st) {
    const p = st.p, dm = p.d / 100, V = p.De + p.Dg - 1 / dm;
    const fmm = 1000 / V, blur = 2.2 * Math.abs(p.L / fmm - 1);
    const blurPx = blur * 15.5;   // для подписи в канвасе (масштаб 15,5 px/мм)
    const need = 1000 / p.L + 1 / dm - p.De;
    const V0 = p.De - 1 / dm, f0 = 1000 / V0;
    let verdict = 'резкое зрение';
    if (blur >= 2.5) verdict = fmm > p.L ? 'изображение ЗА сетчаткой (дальнозоркость в этих условиях)' : 'изображение ПЕРЕД сетчаткой (близорукость в этих условиях)';
    return `<div class="kv"><span>Оптическая сила системы</span><b>${fmt(p.De + p.Dg, 1)} дптр</b></div>
    <div class="kv"><span>Сходимость лучей V = D − 1/d</span><b>${fmt(V, 2)} дптр</b></div>
    <div class="kv"><span>Где изображение</span><b>${fmt(fmm, 1)} мм от хрусталика</b></div>
    <div class="kv"><span>Диаметр пятна на сетчатке</span><b>${fmt(blur, 1)} мм</b></div>
    <div class="kv"><span>Итог</span><b><span class="badge ${blur < 2.5 ? 'ok' : 'bad'}">${verdict}</span></b></div>
    <div class="kv"><span>Нужные очки: D = 1000/L + 1/d − Dглаза</span><b>${Math.abs(need) < .25 ? 'не нужны — глаз фокусирует сам (точный расчёт ' + fmt(need, 2) + ' дптр)' : (need > 0 ? '+' : '') + fmt(need, 2) + ' дптр (' + (need > 0 ? 'собирающие — при дальнозоркости' : 'рассеивающие — при близорукости') + ')'}</b></div>
    <div class="note">Математика: <span class="f">1/F = 1/d + 1/f</span>. Биология: мышцы меняют кривизну хрусталика (аккомодация) — оптическая сила глаза меняется от ~42 до ~46 дптр. Физика объясняет, почему близоруким нужны рассеивающие линзы (D &lt; 0), а дальнозорким — собирающие (D &gt; 0). Модель учебная: глаз представлен одной тонкой линзой.</div>`;
  }
});

/* ---------- 9. Сердце — насос (биология + механика) ---------- */
defSim('heart', {
  title: '❤️ Сердце как насос',
  aspect: .58,
  theoryNote: 'Кровообращение — это <b>гидродинамика</b>: давление, работа, мощность. Физика считает работу сердца A = p·V и мощность P = A·ν, биология объясняет, зачем нужно тренировать выносливость, а математика помогает посчитать минутный объём крови.',
  hint: 'Сравните состояние покоя и бега: растёт и частота, и объём каждого сокращения — значит, растёт минутный объём крови.',
  params: [
    { key: 'hr', label: 'Пульс (частота сокращений)', min: 45, max: 190, step: 1, val: 70, unit: 'уд/мин', dec: 0 },
    { key: 'sv', label: 'Ударный объём (за одно сокращение)', min: 40, max: 140, step: 1, val: 70, unit: 'мл', dec: 0 },
    { key: 'bp', label: 'Систолическое давление', min: 90, max: 180, step: 1, val: 120, unit: 'мм рт.ст.', dec: 0 }
  ],
  actions: [
    { label: '😴 Покой', run: (st, a) => { st.p.hr = 65; st.p.sv = 70; st.p.bp = 118; a.sync(); } },
    { label: '🚶 Ходьба', run: (st, a) => { st.p.hr = 105; st.p.sv = 95; st.p.bp = 135; a.sync(); } },
    { label: '🏃 Бег', primary: true, run: (st, a) => { st.p.hr = 170; st.p.sv = 130; st.p.bp = 165; a.sync(); } }
  ],
  init: () => ({ ph: 0, last: 0, parts: [], path: null, beats: 0, hist: [] }),
  step(st, dt) {
    const p = st.p;
    st.ph += dt * p.hr / 60;
    if (st.ph >= 1) { st.ph -= 1; st.beats++; launch(st); }
    // частицы крови
    for (const q of st.parts) {
      const g2 = q.s < .30 ? 1 : q.s < .58 ? .38 : q.s < .86 ? .10 : .5;
      q.s += dt * (0.55 + p.hr / 200) * g2;
      if (q.s > 1) q.s -= 1;
    }
    st.hist.push(p.bp);
    if (st.hist.length > 500) st.hist.shift();
    function launch(s) {
      for (let i = 0; i < 3; i++) s.parts.push({ s: .0, off: i - 1, red: false });
      if (s.parts.length > 90) s.parts.splice(0, s.parts.length - 90);
    }
  },
  draw(g, st, W, H) {
    G.bg(g, W, H);
    const p = st.p;
    const Hx = W * .16, Hy = H * .42;
    // путь крови (полилиния + «калибр» сосуда)
    const path = [
      [Hx, Hy - 8], [Hx + W * .06, Hy - H * .18], [W * .34, H * .16], [W * .44, H * .22],
      [W * .50, H * .40], [W * .46, H * .62], [W * .56, H * .76], [W * .68, H * .70],
      [W * .74, H * .52], [W * .82, H * .40], [W * .92, H * .40], [W * .96, H * .48],
      [W * .80, H * .60], [W * .62, H * .60], [W * .30, H * .58], [Hx + W * .02, Hy + H * .16], [Hx, Hy + 10]
    ];
    // сосуды: артерия (толстая) / капилляры (тонкие)
    for (let i = 0; i < path.length - 1; i++) {
      const wide = i < 4 || i > 12;
      G.line(g, path[i][0], path[i][1], path[i + 1][0], path[i + 1][1], wide ? 'rgba(255,120,130,.35)' : 'rgba(200,140,255,.28)', wide ? 7 : 3, null);
    }
    if (!st.path) st.path = path;
    // частицы
    (st.parts || []).forEach(q => {
      const pt = polyPoint(path, q.s), nxt = polyPoint(path, Math.min(1, q.s + .01));
      const a = Math.atan2(nxt.y - pt.y, nxt.x - pt.x);
      const x = pt.x - Math.sin(a) * q.off * 5, y = pt.y + Math.cos(a) * q.off * 5;
      const oxy = q.s > .30 && q.s < .86;
      G.dot(g, x, y, 3.6, oxy ? '#8b5cf6' : '#ff5d73', oxy ? '#d9c2ff' : '#ffc9d0');
    });
    // сердце
    const pulse = .5 + .5 * Math.cos(st.ph * TAU), sz = 1 + .07 * pulse;
    g.save(); g.translate(Hx, Hy); g.scale(sz, sz);
    g.fillStyle = '#ff4d6d'; g.strokeStyle = '#ffb3c1'; g.lineWidth = 2.5;
    g.beginPath();
    g.moveTo(0, 26);
    g.bezierCurveTo(-30, 4, -22, -26, 0, -12);
    g.bezierCurveTo(22, -26, 30, 4, 0, 26);
    g.closePath(); g.fill(); g.stroke(); g.restore();
    G.txt(g, 'сердце', Hx, Hy + 44, { size: 12.5, col: '#ffb3c1', align: 'center' });
    G.txt(g, 'артерия (О₂)', W * .34, H * .11, { size: 11.5, col: '#ff9d9d' });
    G.txt(g, 'капилляры: обмен веществ', W * .46, H * .86, { size: 11.5, col: '#c9a6ff' });
    G.txt(g, 'вены (CO₂)', W * .80, H * .56, { size: 11.5, col: '#8b5cf6' });
    // пульсовая волна
    const gy = H * .74, gh = H * .22, gx = W * .12, gw = W * .84;
    G.panel(g, gx - 8, gy - 8, gw + 16, gh + 16, { fill: 'rgba(255,255,255,.04)' });
    G.txt(g, 'давление в аорте, мм рт.ст.', gx, gy + 8, { size: 11, col: '#9fb8dd' });
    const pulseY = tt => {
      const per = 60 / p.hr, x = (tt % per) / per;
      const sys = p.bp, dia = Math.max(50, p.bp - 45);
      const wave = sys * Math.exp(-Math.pow((x - .12) / .07, 2)) + dia * (x < .35 ? 1 : 1 - .35 * (x - .35));
      return gy + gh - (wave - 40) / 180 * gh;
    };
    g.save(); g.beginPath();
    for (let i = 0; i <= 400; i++) { const tt = i / 400 * 3, X = gx + i / 400 * gw, Y = pulseY(tt); i ? g.lineTo(X, Y) : g.moveTo(X, Y); }
    g.strokeStyle = '#ff6b81'; g.lineWidth = 2.2; g.stroke(); g.restore();
    const cur = pulseY(1.5);
    G.dot(g, gx + gw * .5, cur, 4.5, '#ffd166');
    G.txt(g, p.bp + '/' + Math.max(50, p.bp - 45), gx + 4, gy + gh - 6, { size: 13, weight: 700, col: '#ff9d9d' });
    G.txt(g, 'сокращений в модели: ' + (st.beats || 0), gx + gw - 4, gy + 12, { size: 11.5, col: '#9fb8dd', align: 'right' });
  },
  readout(st) {
    const p = st.p;
    const moc = p.hr * p.sv / 1000;                     // л/мин
    const work = p.bp * 133.3 / 1e6 * (p.sv / 1e6) * 1e6; // ≈ Дж: p(Па)·V(м³)
    const pw = work * p.hr / 60;                        // Вт
    const perBeat = 60 / p.hr;
    return `<div class="kv"><span>Минутный объём (МОК)</span><b>${fmt(moc, 1)} л/мин</b></div>
    <div class="kv"><span>Работа одного сокращения</span><b>${fmt(work, 2)} Дж</b></div>
    <div class="kv"><span>Мощность сердца</span><b>${fmt(pw, 2)} Вт</b></div>
    <div class="kv"><span>Период между ударами</span><b>${fmt(perBeat, 2)} с</b></div>
    <div class="kv"><span>Вся кровь (≈5 л) пройдёт круг за</span><b>${fmt(5 / Math.max(.1, moc), 2)} мин</b></div>
    <div class="note">Физика: механическая работа A = p·ΔV и мощность P = A·T⁻¹. Биология: за сутки сердце перекачивает около 7000 литров, а при беге МОК возрастает в 3–4 раза. Математика: МОК = ЧСС × УО — простое произведение двух параметров.</div>`;
  }
});
function polyPoint(pts, s) {
  const seg = 1 / (pts.length - 1), i = Math.min(pts.length - 2, Math.floor(s / seg)), f = (s - i * seg) / seg;
  return { x: pts[i][0] + (pts[i + 1][0] - pts[i][0]) * f, y: pts[i][1] + (pts[i + 1][1] - pts[i][1]) * f };
}

/* ---------- 10. Звук и слух (биология + музыка) ---------- */
defSim('hearing', {
  title: '👂 Звук, улитка и диапазон слуха',
  aspect: .6,
  theoryNote: 'Волна несёт <b>частоту и амплитуду</b> (физика, 9 класс § 30), барабанная перепонка и улитка превращают их в нервный сигнал (биология), а музыка использует те же частоты как ноты (искусство). Место возбуждения волосковых клеток считается по биологической шкале Гринвуда.',
  hint: 'Слушайте тон и следите за «бегущей волной» в улитке: высокие частоты возбуждают основание улитки, низкие — её вершину.',
  params: [
    { key: 'f', label: 'Частота звука', min: 60, max: 1600, step: 1, val: 440, unit: 'Гц', dec: 0 },
    { key: 'dB', label: 'Громкость', min: 20, max: 100, step: 1, val: 65, unit: 'дБ', dec: 0 }
  ],
  actions: [{ label: '🔊 Включить тон (0,9 с)', primary: true, run: (st, a) => { a.tone(st.p.f, .9, Math.min(.28, .02 + (st.p.dB - 20) / 300)); a.notify('Тон ' + fmt(st.p.f, 0) + ' Гц, ' + fmt(st.p.dB, 0) + ' дБ. Ля первой октавы — 440 Гц.'); } }],
  draw(g, st, W, H) {
    const p = st.p;
    G.bg(g, W, H);
    // 1. осциллограмма бегущей волны
    const ax = 20, aw = W - 40, ay = H * .26, amp = (p.dB - 20) / 80 * (H * .10) + 2;
    G.line(g, ax, ay, ax + aw, ay, 'rgba(150,190,240,.3)', 1, [4, 4]);
    g.save(); g.beginPath();
    for (let i = 0; i <= 500; i++) {
      const t = i / 500, x = ax + t * aw;
      const y = ay - Math.sin(TAU * (p.f / 200) * t * 4 - st.t * 6) * amp;
      i ? g.lineTo(x, y) : g.moveTo(x, y);
    }
    g.strokeStyle = '#4cc9f0'; g.lineWidth = 2.4; g.stroke(); g.restore();
    G.txt(g, 'звуковая волна: частота ' + fmt(p.f, 0) + ' Гц = ' + note(p.f), ax, ay - 42, { size: 12.5, col: '#8fd7ff' });
    G.txt(g, 'период T = ' + fmt(1000 / p.f, 2) + ' мс   длина волны λ = v/f = ' + fmt(343 / p.f * 100, 1) + ' см', ax, ay - 24, { size: 12, col: '#9fb8dd' });
    // 2. ухо
    const ey = H * .62, ex = W * .12;
    G.txt(g, 'ухо: перепонка → слуховые косточки → улитка', ex, H * .38, { size: 12.5, col: '#cfe2ff' });
    // перепонка
    const vib = Math.sin(st.t * TAU * Math.min(12, p.f / 40)) * amp * .35;
    G.line(g, ex + 26, ey - 44, ex + 26, ey + 44, '#ffd166', 3.5);
    g.save(); g.translate(ex + 26 + vib, ey); G.line(g, 0, -40, 0, 40, '#fff0b3', 2); g.restore();
    G.line(g, ex + 26, ey, ex + 70, ey - 14, '#cfe2ff', 2.5);
    G.dot(g, ex + 74, ey - 15, 6, '#cfe2ff'); G.dot(g, ex + 88, ey - 8, 5, '#cfe2ff');
    G.line(g, ex + 76, ey - 11, ex + 90, ey - 4, '#cfe2ff', 2);
    G.txt(g, 'косточки', ex + 46, ey + 58, { size: 11, col: '#9fb8dd' });
    // улитка (развёрнутая)
    const cx = W * .34, cw = W * .60, cy = ey, ch = 90;
    G.panel(g, cx - 10, cy - ch / 2 - 22, cw + 20, ch + 40, { fill: 'rgba(255,255,255,.04)' });
    G.txt(g, 'улитка (развёрнута): где «звучит» нерв', cx, cy - ch / 2 - 6, { size: 11.5, col: '#9fb8dd' });
    g.save();
    g.beginPath(); g.moveTo(cx, cy + ch / 2);
    for (let i = 0; i <= 200; i++) { const t = i / 200; g.lineTo(cx + t * cw, cy + ch / 2 - (t < .5 ? t * ch * 1.5 : 0) - (1 - t) * 6); }
    g.strokeStyle = 'rgba(180,215,255,.35)'; g.lineWidth = 26; g.stroke();
    // бегущая волна
    const pk = cochPos(p.f);
    const wob = .02 * Math.sin(st.t * 4);
    g.beginPath();
    for (let i = 0; i <= 200; i++) {
      const t = i / 200;
      const env = Math.exp(-Math.pow((t - pk - wob) / .14, 2)) * (ch / 2);
      const y = cy + ch / 2 - 13 - env * (1 - .4 * t) * Math.sin((t * 26 - st.t * 9) * 1);
      i ? g.lineTo(cx + t * cw, y) : g.moveTo(cx + t * cw, y);
    }
    g.strokeStyle = '#ff6b9d'; g.lineWidth = 2.6; g.stroke(); g.restore();
    G.txt(g, 'основание (высокие: 20 кГц)', cx - 4, cy + ch / 2 + 34, { size: 10.5, col: '#9fb8dd' });
    G.txt(g, 'вершина (низкие: 20 Гц)', cx + cw, cy + ch / 2 + 34, { size: 10.5, col: '#9fb8dd', align: 'right' });
    // 3. шкала диапазона
    const sx = W * .12, sw = W * .76, sy = H * .92;
    G.line(g, sx, sy, sx + sw, sy, 'rgba(150,190,240,.5)', 2);
    [[20, '20 Гц'], [200, '200'], [2000, '2 кГц'], [20000, '20 кГц']].forEach(([v, l]) => {
      const x = sx + Math.log(v / 20) / Math.log(20000 / 20) * sw;
      G.line(g, x, sy - 5, x, sy + 5, 'rgba(180,215,255,.6)', 1.4); G.txt(g, l, x, sy + 20, { size: 10.5, col: '#9fb8dd', align: 'center' });
    });
    const px = sx + Math.log(p.f / 20) / Math.log(20000 / 20) * sw;
    G.dot(g, px, sy, 6, '#ffd166', '#fff');
    G.line(g, px, sy - 26, px, sy - 6, '#ffd166', 1.6, [3, 3]);
    G.txt(g, fmt(p.f, 0) + ' Гц', px, sy - 32, { size: 12, col: '#ffd166', align: 'center', weight: 700 });
    const vs = sx + Math.log(1000 / 20) / Math.log(1000) * sw, ve = sx + Math.log(4000 / 20) / Math.log(1000) * sw;
    G.line(g, vs, sy + 30, ve, sy + 30, 'rgba(138,255,224,.65)', 5);
    G.txt(g, 'голос человека', (vs + ve) / 2, sy + 46, { size: 10.5, col: '#8affe0', align: 'center' });
  },
  readout(st) {
    const p = st.p;
    const pk = cochPos(p.f);
    return `<div class="kv"><span>Частота / период</span><b>${fmt(p.f, 0)} Гц / ${fmt(1000 / p.f, 2)} мс</b></div>
    <div class="kv"><span>Длина волны в воздухе (343 м/с)</span><b>${fmt(343 / p.f, 2)} м</b></div>
    <div class="kv"><span>Нота (ближайшая)</span><b>${note(p.f)}</b></div>
    <div class="kv"><span>Место возбуждения в улитке (шкала Гринвуда)</span><b>${fmt(pk * 100, 0)} % от основания (${fmt((1 - pk) * 35, 1)} мм от вершины из 35 мм)</b></div>
    <div class="kv"><span>Частота, «закреплённая» за этим местом</span><b>${fmt(165.4 * (Math.pow(10, .06 * (1 - pk) * 35) - .88), 0)} Гц — совпадает с частотой звука</b></div>
    <div class="kv"><span>Опасность для слуха</span><b><span class="badge ${p.dB < 75 ? 'ok' : p.dB < 90 ? 'warn' : 'bad'}">${p.dB < 75 ? 'безопасно' : p.dB < 90 ? 'наушники — на грани' : 'риск потери слуха'}</span></b></div>
    <div class="note">Высокие частоты «читаются» у основания улитки, низкие — у вершины. Поэтому на концерте или в наушниках первым страдает восприятие высоких звуков. Громче 85 дБ (метро) — уже риск, а болевой порог около 120 дБ.</div>`;
  }
});

/* ---------- 11. Атмосферное давление и кипение (география + технология) ---------- */
defSim('atmos', {
  title: '⛰ Давление воздуха и кипение воды в горах',
  aspect: .58,
  theoryNote: 'Физика объясняет, почему <b>с высотой падает давление</b> и почему в горах вода кипит при более низкой температуре. География подсказывает, где это важно (Памир, Тянь-Шань), а трудовое обучение — почему в горах еда варится дольше.',
  hint: 'Поднимайте «путешественника» и следите за барометром и термометром у воды.',
  params: [{ key: 'h', label: 'Высота над уровнем моря', min: 0, max: 9000, step: 25, val: 200, unit: 'м', dec: 0 }],
  actions: [
    { label: '🏠 Экибастуз (200 м)', run: (st, a) => { st.p.h = 200; a.sync(); } },
    { label: '🏔 Эльбрус (5642 м)', run: (st, a) => { st.p.h = 5642; a.sync(); } },
    { label: '✈️ Самолёт (10 000 м)', primary: true, run: (st, a) => { st.p.h = 9000; a.sync(); a.notify('На высоте 10 км давление в салоне всё равно поддерживают примерно как на 2000 м — иначе пассажирам было бы плохо.'); } }
  ],
  draw(g, st, W, H) {
    const p = st.p, h = p.h;
    G.bg(g, W, H);
    const pr = airPressurePa(h), mmHg = pr / 133.3, T = 15 - 6.5 * h / 1000, Tb = boilTempC(pr);
    // гора
    const baseY = H - 40, topY = 30;
    const px = x => baseY - (x / 9000) * (baseY - topY);
    g.save(); g.beginPath();
    g.moveTo(0, baseY);
    g.lineTo(W * .12, px(700)); g.lineTo(W * .20, px(1600)); g.lineTo(W * .30, px(2400));
    g.lineTo(W * .40, px(3800)); g.lineTo(W * .50, px(5000)); g.lineTo(W * .58, px(4400));
    g.lineTo(W * .66, px(5600)); g.lineTo(W * .74, px(6200)); g.lineTo(W * .84, px(7000));
    g.lineTo(W * .92, px(8000)); g.lineTo(W, px(8600)); g.lineTo(W, baseY); g.closePath();
    g.fillStyle = 'rgba(120,150,190,.30)'; g.fill();
    g.strokeStyle = 'rgba(200,225,255,.5)'; g.lineWidth = 2; g.stroke(); g.restore();
    for (let x = 0; x <= 9000; x += 1000) {
      G.line(g, 8, px(x), W - 8, px(x), 'rgba(150,190,240,.13)', 1, [4, 6]);
      G.txt(g, x + ' м', W - 12, px(x) - 3, { size: 10.5, col: '#7ea4d8', align: 'right' });
    }
    // отметки давления
    G.txt(g, 'давление  ' + fmt(pr / 1000, 1) + ' кПа  =  ' + fmt(mmHg, 0) + ' мм рт.ст.', 12, 22, { size: 13.5, weight: 700, col: '#ffd166' });
    G.txt(g, 't воздуха  ' + fmt(T, 1) + ' °C', 12, 42, { size: 12.5, col: '#8fd7ff' });
    G.txt(g, 'кипение воды при ' + fmt(Tb, 1) + ' °C', 12, 61, { size: 12.5, col: '#ff9d9d' });
    // шарик/человечек
    const px1 = W * .60, py1 = px(h) - 18;
    G.dot(g, px1, py1, 11, '#ffd166', '#fff');
    G.line(g, 12, py1, px1 - 14, py1, 'rgba(255,209,102,.5)', 1.4, [5, 4]);
    G.txt(g, 'вы здесь: ' + fmt(h, 0) + ' м', 16, py1 - 8, { size: 12, col: '#ffd166' });
    // барометр
    const bx = W * .14, by = baseY - 96, bs = 74;
    G.panel(g, bx, by, bs, bs, { fill: 'rgba(255,255,255,.08)', r: 37 });
    const ang = Math.PI * (1 - Math.min(1, Math.max(0, (mmHg - 300) / 520)));
    G.line(g, bx + bs / 2, by + bs / 2, bx + bs / 2 + Math.cos(ang) * (bs / 2 - 10), by + bs / 2 + Math.sin(ang) * (bs / 2 - 10), '#ff6b6b', 2.6);
    G.dot(g, bx + bs / 2, by + bs / 2, 3.4, '#fff');
    G.txt(g, fmt(mmHg, 0), bx + bs / 2, by + bs - 6, { align: 'center', size: 12, weight: 700, col: '#ffd166' });
    G.txt(g, 'барометр', bx + bs / 2, by + bs + 16, { align: 'center', size: 11, col: '#9fb8dd' });
    // кастрюля с водой
    const kx = W * .34, ky = baseY - 30;
    G.panel(g, kx, ky - 34, 74, 34, { fill: 'rgba(90,170,255,.25)', stroke: 'rgba(200,230,255,.6)', r: 6 });
    const boil = Math.max(0, 1 - Tb / 100);
    for (let i = 0; i < 16; i++) {
      const ph = (st.t * .8 + i * .29) % 1;
      if (Tb < 99.5) G.dot(g, kx + 8 + (i * 17) % 58, ky - 6 - ph * 30, 1.6 + boil * 2.6, 'rgba(210,235,255,' + (.75 - ph * .6) + ')');
    }
    G.txt(g, 'вода кипит при ' + fmt(Tb, 1) + ' °C', kx + 37, ky - 46, { align: 'center', size: 11.5, col: '#ff9d9d' });
    G.txt(g, 'на 1 кг пара всё равно нужно 2260 кДж!', 12, H - 12, { size: 12, col: '#9fb8dd' });
  },
  readout(st) {
    const h = st.p.h, pr = airPressurePa(h), mmHg = pr / 133.3, T = 15 - 6.5 * h / 1000, Tb = boilTempC(pr);
    const hhalf = 8400 * Math.LN2;
    return `<div class="kv"><span>Давление</span><b>${fmt(pr, 0)} Па = ${fmt(pr / 1000, 1)} кПа</b></div>
    <div class="kv"><span>В мм ртутного столба</span><b>${fmt(mmHg, 0)} мм рт.ст.</b></div>
    <div class="kv"><span>Доля от давления у моря</span><b>${fmt(pr / 101325 * 100, 1)} %</b></div>
    <div class="kv"><span>Температура воздуха</span><b>${fmt(T, 1)} °C</b></div>
    <div class="kv"><span>Температура кипения воды</span><b>${fmt(Tb, 1)} °C</b></div>
    <div class="note">Математика: давление убывает по <b>показательному закону</b> p = p₀·e^(−h/8400), поэтому каждые ${fmt(hhalf, 0)} м давление падает примерно вдвое. География: так рождаются ветры — воздух перетекает из области высокого давления в область низкого. Технология: в горах воду греют в скороварке — там давление поднимают, и кипение идёт при 110–120 °C, поэтому еда готовится быстрее.</div>`;
  }
});

/* ---------- 12. Земля, Солнце и времена года (астрономия + география) ---------- */
defSim('earthsun', {
  title: '🌍 Наклон оси, сезоны и высота Солнца',
  aspect: .58,
  theoryNote: 'Астрономия объясняет, что ось Земли наклонена и не меняет направления в пространстве; география показывает следствие — разную длину дня и высоту Солнца; физика добавляет, что поток энергии зависит от угла падения лучей.',
  hint: 'Двигайте день года и время суток. Наклон оси 0° — и сезонов не будет вовсе: проверьте!',
  params: [
    { key: 'day', label: 'День года (1 января = 1)', min: 1, max: 365, step: 1, val: 172, dec: 0 },
    { key: 'lat', label: 'Широта местности', min: -80, max: 80, step: 1, val: 52, unit: '° с.ш.', dec: 0 },
    { key: 'tilt', label: 'Наклон земной оси', min: 0, max: 45, step: .5, val: 23.4, unit: '°', dec: 1 },
    { key: 'hour', label: 'Время суток', min: 0, max: 24, step: .25, val: 12, unit: 'ч', dec: 2 }
  ],
  actions: [
    { label: '❄️ 22 декабря', run: (st, a) => { st.p.day = 356; a.sync(); } },
    { label: '🌷 21 марта', run: (st, a) => { st.p.day = 80; a.sync(); } },
    { label: '☀️ 21 июня', primary: true, run: (st, a) => { st.p.day = 172; a.sync(); } },
    { label: '🍂 23 сентября', run: (st, a) => { st.p.day = 266; a.sync(); } }
  ],
  draw(g, st, W, H) {
    const p = st.p;
    const dec = -p.tilt * Math.cos(TAU * (p.day + 10) / 365) * D2R;
    const phi = p.lat * D2R;
    G.bg(g, W, H);
    /* --- орбита --- */
    const ox = W * .26, oy = H * .46, orb = Math.min(W * .19, H * .30);
    g.save(); g.beginPath(); g.ellipse(ox, oy, orb, orb * .62, 0, 0, TAU); g.strokeStyle = 'rgba(150,190,240,.4)'; g.lineWidth = 1.6; g.setLineDash([5, 5]); g.stroke(); g.restore();
    G.dot(g, ox, oy, 15, '#ffd166', '#fff7d6');
    G.txt(g, 'Солнце', ox, oy + 32, { align: 'center', size: 12, col: '#ffd166' });
    const ang = -TAU * (p.day - 1) / 365 + Math.PI / 2;
    const Ex = ox + Math.cos(ang) * orb, Ey = oy + Math.sin(ang) * orb * .62;
    // ось Земли (наклон в плоскости чертежа, фиксирован в пространстве)
    const axl = orb * .42, tiltR = p.tilt * D2R;
    const Ex1 = Ex - Math.sin(tiltR) * axl, Ey1 = Ey - Math.cos(tiltR) * axl;
    const Ex2 = Ex + Math.sin(tiltR) * axl, Ey2 = Ey + Math.cos(tiltR) * axl;
    G.line(g, Ex1, Ey1, Ex2, Ey2, '#8affe0', 2.6);
    G.dot(g, Ex, Ey, 9, '#3b82f6', '#bfe0ff');
    G.txt(g, 'N', Ex1 + 6, Ey1 - 4, { size: 11, col: '#8affe0' });
    // терминатор: день/ночь
    g.save(); g.beginPath(); g.arc(Ex, Ey, 9, Math.atan2(-Math.sin(ang), -Math.cos(ang)) - Math.PI / 2, Math.atan2(-Math.sin(ang), -Math.cos(ang)) + Math.PI / 2); g.lineTo(Ex, Ey); g.closePath();
    g.fillStyle = 'rgba(10,15,30,.75)'; g.fill(); g.restore();
    G.line(g, ox, oy, Ex, Ey, 'rgba(255,209,102,.22)', 1.2, [4, 5]);
    const months = ['1 янв', '1 мар', '1 май', '1 июл', '1 сен', '1 ноя'];
    G.txt(g, 'орбита Земли (вид сверху): ' + months[Math.min(5, Math.floor((p.day - 1) / 61))], ox, oy + orb * .62 + 46, { align: 'center', size: 12, col: '#9fb8dd' });
    /* --- местный горизонт --- */
    const hx = W * .62, hy = H * .74, hw = W * .34;
    G.line(g, hx - 10, hy, hx + hw, hy, '#7ea4d8', 2.4);
    G.txt(g, 'горизонт', hx - 6, hy + 16, { size: 11, col: '#9fb8dd' });
    const noonAlt = (90 - p.lat + dec * R2D);
    // дуга видимого пути Солнца
    g.save(); g.strokeStyle = 'rgba(255,209,102,.45)'; g.lineWidth = 2; g.setLineDash([6, 5]);
    g.beginPath();
    let started = false;
    for (let hhh = 0; hhh <= 24.001; hhh += .1) {
      const az2 = (hhh - 12) * 15 * D2R;
      const alt2 = Math.asin(Math.max(-1, Math.sin(phi) * Math.sin(dec) + Math.cos(phi) * Math.cos(dec) * Math.cos(az2)));
      if (alt2 <= 0) { started = false; continue; }
      const x = hx + hw / 2 + Math.sin(az2) * hw * .5, y = hy - Math.sin(alt2) * H * .40 - 10;
      started ? g.lineTo(x, y) : g.moveTo(x, y); started = true;
    }
    g.stroke(); g.restore();
    // Солнце в текущий момент
    const hourAng = (p.hour - 12) * 15 * D2R;
    const alt = Math.asin(Math.max(-1, Math.sin(phi) * Math.sin(dec) + Math.cos(phi) * Math.cos(dec) * Math.cos(hourAng)));
    const sx = hx + hw / 2 + Math.sin(hourAng) * hw * .5, sy = hy - Math.max(0, Math.sin(alt)) * H * .40 - 14;
    if (alt > 0) { G.dot(g, sx, sy, 13, '#ffd166', '#fff7d6'); G.txt(g, 'Солнце: высота ' + fmt(alt * R2D, 1) + '°', sx, sy - 24, { align: 'center', size: 12, col: '#ffd166' }); }
    else G.txt(g, 'Солнце под горизонтом (ночь)', hx + hw / 2, hy - 26, { align: 'center', size: 12.5, col: '#9fb8dd' });
    // домик и тень
    const dx = hx + hw * .16, dy = hy, dw = 46, dh = 34;
    G.bar(g, dx, dy - dh, dw, dh, 'rgba(200,225,255,.55)');
    g.save(); g.beginPath(); g.moveTo(dx - 6, dy - dh); g.lineTo(dx + dw / 2, dy - dh - 22); g.lineTo(dx + dw + 6, dy - dh); g.closePath();
    g.fillStyle = 'rgba(255,143,163,.6)'; g.fill(); g.restore();
    const altDeg = Math.max(1, alt * R2D), shadow = dh / Math.tan(altDeg * D2R);
    if (alt > 0 && shadow < hw) {
      G.line(g, dx + dw, dy, dx + dw + Math.min(shadow, hw * .8), dy, 'rgba(120,200,255,.75)', 5);
      G.txt(g, 'тень ' + fmt(Math.min(shadow, 999), 1) + ' м при доме 1 м', dx + dw + 6, dy + 16, { size: 11, col: '#8fd7ff' });
    }
    G.panel(g, hx + hw - 150, 14, 142, 44);
    G.txt(g, 'день: ' + fmt(dayLen(phi, dec), 1) + ' ч', hx + hw - 142, 34, { size: 12.5, col: '#cfe2ff' });
    G.txt(g, 'полдень: ' + fmt(noonAlt, 1) + '°', hx + hw - 142, 52, { size: 12.5, col: '#ffd166' });
    function dayLen(ph, dc) {
      const x = -Math.tan(ph) * Math.tan(dc);
      if (x <= -1) return 24; if (x >= 1) return 0;
      return 2 * Math.acos(x) * R2D / 15;
    }
  },
  readout(st) {
    const p = st.p, dec = -p.tilt * Math.cos(TAU * (p.day + 10) / 365);
    const phi = p.lat * D2R, dR = dec * D2R;
    const x = -Math.tan(phi) * Math.tan(dR);
    const L = x <= -1 ? 24 : x >= 1 ? 0 : 2 * Math.acos(x) * R2D / 15;
    const noon = 90 - p.lat + dec;
    let special = '';
    if (x <= -1) special = 'полярный день';
    else if (x >= 1) special = 'полярная ночь';
    return `<div class="kv"><span>Склонение Солнца δ</span><b>${fmt(dec, 1)}°</b></div>
    <div class="kv"><span>Высота Солнца в полдень</span><b>${fmt(noon, 1)}°</b></div>
    <div class="kv"><span>Длительность дня</span><b>${fmt(L, 2)} ч ${special ? '(' + special + ')' : ''}</b></div>
    <div class="kv"><span>Восход / закат</span><b>${fmt(12 - L / 2, 1)} ч / ${fmt(12 + L / 2, 1)} ч</b></div>
    <div class="kv"><span>Сезон для северного полушария</span><b>${dec > 15 ? 'лето' : dec < -15 ? 'зима' : dec > 0 ? 'весна' : 'осень'}</b></div>
    <div class="note">Физика: поток энергии на площадку пропорционален <b>sin(высоты Солнца)</b> и длине дня — летом лучи падают круче и греют сильнее. Астрономия объясняет наклон оси, география — различия климата, а <b>длина тени</b> (тангенс угла) — та же тригонометрия, что и на уроках алгебры. Попробуйте поставить наклон 0° — времена года исчезнут.</div>`;
  }
});

/* ---------- 13. Вес, масса и гравитация на планетах (астрономия + физкультура) ---------- */
defSim('gravity', {
  title: '🪐 Масса, вес и сила тяжести',
  aspect: .58,
  theoryNote: 'Масса — мера инертности (в килограммах), вес — сила, с которой тело давит на опору (в ньютонах): P = m·g. Одно тело — одна масса, но разные веса на Луне, Марсе и Юпитере.',
  hint: 'Сравните падение мяча на разных планетах: чем больше g, тем быстрее падение и выше вес.',
  params: [{ key: 'm', label: 'Масса груза', min: .1, max: 60, step: .1, val: 5, unit: 'кг', dec: 1 }],
  selects: [{
    key: 'planet', label: 'Планета / небесное тело', val: 'earth',
    options: [{ v: 'earth', label: 'Земля — g = 9,81 Н/кг' }, { v: 'moon', label: 'Луна — g = 1,62 Н/кг' }, { v: 'mars', label: 'Марс — g = 3,71 Н/кг' }, { v: 'jupiter', label: 'Юпитер — g = 24,8 Н/кг' }]
  }],
  init: () => ({ y: 0, v: 0, trail: [] }),
  step(st, dt) {
    const g0 = { earth: 9.81, moon: 1.62, mars: 3.71, jupiter: 24.8 }[st.p.planet] || 9.81;
    st.v += g0 * dt; st.y += st.v * dt;
    if (st.y > 1) { st.y = 0; st.v = 0; }
  },
  draw(g, st, W, H) {
    const pl = st.p.planet, g0 = { earth: 9.81, moon: 1.62, mars: 3.71, jupiter: 24.8 }[pl];
    const name = { earth: 'Земля', moon: 'Луна', mars: 'Марс', jupiter: 'Юпитер' }[pl];
    const col = { earth: '#4cc9f0', moon: '#cbd5e1', mars: '#ff7b54', jupiter: '#ffd166' }[pl];
    G.bg(g, W, H);
    // динамометр
    const sx = W * .22, sy = 30, sh = H * .56;
    G.panel(g, sx - 26, sy, 56, sh, { fill: 'rgba(255,255,255,.07)' });
    G.line(g, sx - 40, sy + 6, sx + 40, sy + 6, '#cfe2ff', 3);
    const ext = Math.min(sh - 30, st.p.m * g0 * 1.1);
    G.line(g, sx, sy + 6, sx, sy + 6 + ext, '#ff9d7b', 2.6);
    const by = sy + 6 + ext;
    G.bar(g, sx - 20, by, 40, 26, 'rgba(120,170,255,.5)');
    G.txt(g, fmt(st.p.m, 1) + ' кг', sx, by + 44, { align: 'center', size: 12, col: '#cfe2ff' });
    G.txt(g, 'динамометр', sx, sy + sh + 16, { align: 'center', size: 11.5, col: '#9fb8dd' });
    [0, 10, 20, 30].forEach(v => {
      const y = sy + 6 + Math.min(sh - 30, v * 1.1);
      G.line(g, sx + 26, y, sx + 34, y, 'rgba(180,215,255,.5)', 1); G.txt(g, v + ' Н', sx + 38, y + 4, { size: 10.5, col: '#7ea4d8' });
    });
    // падение мяча
    const bx = W * .60, b0 = 40, bh = H - 120;
    G.line(g, bx - 40, b0, bx + 40, b0, 'rgba(150,190,240,.4)', 1.4);
    G.line(g, bx, b0, bx, b0 + bh, 'rgba(150,190,240,.4)', 1.4, [5, 5]);
    const ypos = b0 + Math.min(1, st.y) * bh;
    G.dot(g, bx, ypos, 12, col, '#fff');
    G.txt(g, 'падение с высоты 1 м', bx, b0 - 14, { align: 'center', size: 12, col: '#cfe2ff' });
    const tfall = Math.sqrt(2 * 1 / g0);
    G.panel(g, bx - 150, H - 76, 300, 56, { fill: 'rgba(255,255,255,.06)' });
    G.txt(g, name + ': g = ' + fmt(g0, 2) + ' Н/кг', bx - 140, H - 54, { size: 12.5, col });
    G.txt(g, 'P = ' + fmt(st.p.m, 1) + ' кг × ' + fmt(g0, 2) + ' = ' + fmt(st.p.m * g0, 1) + ' Н', bx - 140, H - 34, { size: 12.5, col: '#ffd166' });
    G.txt(g, 'падение с 1 м за ' + fmt(tfall, 2) + ' с', bx - 140, H - 16, { size: 11.5, col: '#9fb8dd' });
    // полоски веса на разных планетах
    const rows = [['Луна', 1.62, '#cbd5e1'], ['Марс', 3.71, '#ff7b54'], ['Земля', 9.81, '#4cc9f0'], ['Юпитер', 24.8, '#ffd166']];
    G.txt(g, 'тот же груз на разных телах:', 14, H - 92, { size: 11.5, col: '#9fb8dd' });
    rows.forEach(([n, gg, c], i) => {
      const y = H - 80 + i * 15, w = Math.min(W * .30, st.p.m * gg * 1.1);
      G.bar(g, 14, y, w, 9, c);
      G.txt(g, n + ' — ' + fmt(st.p.m * gg, 1) + ' Н', 18 + w, y + 8, { size: 10.5, col: '#cfe2ff' });
    });
  },
  readout(st) {
    const m = st.p.m, g0 = { earth: 9.81, moon: 1.62, mars: 3.71, jupiter: 24.8 }[st.p.planet];
    return `<div class="kv"><span>Масса (не меняется!)</span><b>${fmt(m, 2)} кг</b></div>
    <div class="kv"><span>Вес P = m·g</span><b>${fmt(m * g0, 2)} Н</b></div>
    <div class="kv"><span>Ускорение свободного падения</span><b>${fmt(g0, 2)} Н/кг</b></div>
    <div class="kv"><span>Время падения с 1 м</span><b>${fmt(Math.sqrt(2 / g0), 3)} с</b></div>
    <div class="kv"><span>Высота прыжка при v₀ = 3 м/с (h = v₀²/2g)</span><b>${fmt(9 / (2 * g0), 2)} м</b></div>
    <div class="note">На Луне космонавт подпрыгивает в 6 раз выше — это и есть «лунные прыжки» из видеозаписей миссии «Аполлон». Масса всегда одна и та же, а вес зависит от планеты: на Юпитере нагруженный школьный рюкзак весил бы как взрослый человек.</div>`;
  }
});

/* ---------- 14. Сопротивление воздуха, мощность и расход топлива (техника + экология) ---------- */
defSim('drag', {
  title: '🚗 Сопротивление воздуха: почему 130 км/ч дороже 90',
  aspect: .56,
  theoryNote: 'Сила сопротивления воздуха растёт <b>как квадрат скорости</b> (математика: квадратичная функция), мощность — как куб. Трудовая обучение и техника объясняют, зачем обтекаемая форма, а экология — сколько CO₂ добавляет быстрая езда.',
  hint: 'Увеличьте скорость и посмотрите, как взлетают сила, мощность и расход топлива.',
  params: [
    { key: 'v', label: 'Скорость', min: 20, max: 180, step: 1, val: 90, unit: 'км/ч', dec: 0 },
    { key: 'm', label: 'Масса автомобиля', min: 700, max: 2500, step: 10, val: 1400, unit: 'кг', dec: 0 },
    { key: 'CdA', label: 'Обтекаемость (C·A)', min: .35, max: 1.2, step: .01, val: .65, unit: 'м²', dec: 2 }
  ],
  draw(g, st, W, H) {
    const p = st.p, V = p.v / 3.6;
    const F = .5 * 1.2 * p.CdA * V * V, Fr = 0.012 * p.m * 9.81;
    G.bg(g, W, H);
    // автомобиль
    const cx = W * .14, cy = H * .30, cw = W * .30, ch2 = 34;
    g.save();
    g.fillStyle = 'rgba(120,190,255,.7)'; g.strokeStyle = '#bfe0ff'; g.lineWidth = 2;
    g.beginPath();
    g.moveTo(cx, cy + ch2); g.lineTo(cx, cy + 8);
    g.quadraticCurveTo(cx + 6, cy - 6, cx + cw * .28, cy - 6);
    g.quadraticCurveTo(cx + cw * .44, cy - 30, cx + cw * .62, cy - 28);
    g.quadraticCurveTo(cx + cw * .82, cy - 26, cx + cw * .90, cy + 6);
    g.quadraticCurveTo(cx + cw, cy + 10, cx + cw, cy + ch2);
    g.closePath(); g.fill(); g.stroke(); g.restore();
    G.dot(g, cx + cw * .22, cy + ch2 + 8, 10, '#0d1626', '#cfe2ff');
    G.dot(g, cx + cw * .80, cy + ch2 + 8, 10, '#0d1626', '#cfe2ff');
    // стрелки сил — под автомобилем, чтобы не закрывать рисунок
    const sF = Math.min(W * .17, 34 + F * .16), sR = Math.min(W * .13, 26 + Fr * .3);
    const y1 = cy + ch2 + 44, y2 = y1 + 44;
    G.arrow(g, cx + 6, y1, cx + 6 + sF, y1, '#ff6b6b', 3.4, 12);
    G.txt(g, 'F сопротивления воздуха = ' + fmt(F, 0) + ' Н', cx + 6, y1 - 10, { size: 12.5, col: '#ff9d9d' });
    G.arrow(g, cx + 6, y2, cx + 6 + sR, y2, '#8b5cf6', 3, 10);
    G.txt(g, 'трение качения = ' + fmt(Fr, 0) + ' Н', cx + 6, y2 - 10, { size: 11.5, col: '#c4b5fd' });
    gTxtWrap(g, 'масштаб стрелок разный: сопротивление растёт как v², трение — почти не меняется', 16, H - 12, { size: 11.5, col: '#7ea4d8' }, W - 24);
    // графики
    const gx = W * .58, gy = 30, gw = W * .38, gh = H * .52;
    G.panel(g, gx, gy, gw, gh, { fill: 'rgba(255,255,255,.04)' });
    G.txt(g, 'F(v) — квадратичная функция', gx + 10, gy + 18, { size: 11.5, col: '#9fb8dd' });
    const FX = v => gx + 34 + (v - 20) / 160 * (gw - 46);
    const FY = f => gy + gh - 20 - f / (.5 * 1.2 * 1.2 * 180 * 180 / 12.96 * 1.15 + 1) * (gh - 44);
    const Fmax = .5 * 1.2 * p.CdA * (180 / 3.6) ** 2 * 1.1;
    const FY2 = f => gy + gh - 20 - f / Fmax * (gh - 44);
    g.save(); g.beginPath();
    for (let v = 20; v <= 180; v += 2) { const X = FX(v), Y = FY2(.5 * 1.2 * p.CdA * (v / 3.6) ** 2); v === 20 ? g.moveTo(X, Y) : g.lineTo(X, Y); }
    g.strokeStyle = '#ff6b6b'; g.lineWidth = 2.4; g.stroke(); g.restore();
    G.dot(g, FX(p.v), FY2(F), 5.5, '#ffd166', '#fff');
    G.txt(g, 'скорость, км/ч', gx + gw - 14, gy + gh - 4, { size: 11, col: '#7ea4d8', align: 'right' });
    // столбики мощности
    const by = H * .78, bw = W * .60;
    const P = (F + Fr) * V;
    G.txt(g, 'затраченная мощность: ' + fmt(P / 1000, 1) + ' кВт', 16, H * .72, { size: 12.5, col: '#ffd166' });
    const rows = [[90, '90 км/ч'], [130, '130 км/ч'], [p.v, 'ваша скорость']];
    rows.forEach(([v, lab], i) => {
      const Vv = v / 3.6, FF = .5 * 1.2 * p.CdA * Vv * Vv + .012 * p.m * 9.81, Pp = FF * Vv;
      const w = Math.min(bw, Pp / 45);
      const y = H * .76 + i * 22;
      G.bar(g, 16, y, w, 14, i === 2 ? '#ffd166' : '#4c9ef0');
      G.txt(g, lab + ' — ' + fmt(Pp / 1000, 1) + ' кВт', 22 + w, y + 12, { size: 11.5, col: '#e8f0ff' });
    });
  },
  readout(st) {
    const p = st.p, V = p.v / 3.6;
    const F = .5 * 1.2 * p.CdA * V * V, Fr = .012 * p.m * 9.81, P = (F + Fr) * V;
    const E100 = P * (3600 * 100 / p.v), litres = E100 / (0.28 * 32e6);
    const F90 = .5 * 1.2 * p.CdA * (25) ** 2;
    return `<div class="kv"><span>Сопротивление воздуха</span><b>${fmt(F, 0)} Н</b></div>
    <div class="kv"><span>Трение качения</span><b>${fmt(Fr, 0)} Н</b></div>
    <div class="kv"><span>Мощность на движение</span><b>${fmt(P / 1000, 2)} кВт</b></div>
    <div class="kv"><span>Расход (КПД 28 %)</span><b>${fmt(litres, 2)} л на 100 км</b></div>
    <div class="kv"><span>CO₂</span><b>${fmt(litres * 23.1, 0)} г на км</b></div>
    <div class="kv"><span>Сила при 90 км/ч для сравнения</span><b>${fmt(F90, 0)} Н</b></div>
    <div class="note">Скорость выросла в 2 раза — сопротивление выросло в 4 раза, а мощность и расход топлива — примерно в 8 раз. Отсюда обтекаемые кузова, спойлеры, «зелёный» стиль вождения и экологические нормы расхода. Физика, математика (пропорциональность v² и v³), техника и экология — в одной задаче.</div>`;
  }
});

/* ---------- 15. Рычаг: выигрыш в силе (трудовое обучение + математика) ---------- */
defSim('lever', {
  title: '🔧 Рычаг и правило моментов',
  aspect: .52,
  theoryNote: 'Рычаг — «золотое правило механики»: во сколько раз выигрываем в силе, во столько же проигрываем в перемещении. Математика даёт пропорцию, а на уроках труда рычаг — это тачка, ножницы, гаечный ключ и кусачки.',
  hint: 'Задайте силу руки F₂ и смотрите, в какую сторону наклонится рычаг: правило моментов работает буквально на глазах.',
  params: [
    { key: 'F1', label: 'Сила нагрузки F₁ (что поднимаем)', min: 10, max: 500, step: 5, val: 200, unit: 'Н', dec: 0 },
    { key: 'd1', label: 'Плечо нагрузки d₁', min: .05, max: 1, step: .01, val: .3, unit: 'м', dec: 2 },
    { key: 'd2', label: 'Плечо руки d₂', min: .05, max: 1.6, step: .01, val: 1.2, unit: 'м', dec: 2 },
    { key: 'F2', label: 'Сила руки F₂', min: 10, max: 500, step: 5, val: 60, unit: 'Н', dec: 0 }
  ],
  actions: [
    {
      label: '⚖️ Подобрать силу для равновесия', primary: true,
      run: (st, a) => {
        st.p.F2 = Math.round(Math.min(500, st.p.F1 * st.p.d1 / st.p.d2));
        a.sync(); a.notify('Нужное усилие: F₂ = F₁·d₁/d₂ = ' + fmt(st.p.F1 * st.p.d1 / st.p.d2, 1) + ' Н. Теперь моменты равны — рычаг в равновесии.');
      }
    },
    { label: '🛒 Тачка (выигрыш в силе)', run: (st, a) => { st.p.F1 = 300; st.p.d1 = .4; st.p.d2 = 1.4; st.p.F2 = 60; a.sync(); } },
    { label: '✂️ Кусачки (короткое плечо)', run: (st, a) => { st.p.F1 = 120; st.p.d1 = .02; st.p.d2 = .12; st.p.F2 = 25; a.sync(); } }
  ],
  init: () => ({ dir: 0 }),
  step(st, dt) {
    const p = st.p, M1 = p.F1 * p.d1, M2 = p.F2 * p.d2;
    st.target = Math.max(-1, Math.min(1, (M1 - M2) / Math.max(1, (M1 + M2) * .5)));
    st.dir += (st.target - st.dir) * Math.min(1, dt * 3);
  },
  draw(g, st, W, H) {
    const p = st.p, y = H * .60, cx = W * .50;
    const M1 = p.F1 * p.d1, M2 = p.F2 * p.d2;
    G.bg(g, W, H);
    G.panel(g, cx - 13, y, 26, H - y - 10, { fill: 'rgba(255,255,255,.10)' });
    G.txt(g, 'опора (точка вращения)', cx, H - 4, { align: 'center', size: 11.5, col: '#9fb8dd' });
    const L1 = Math.min(W * .40, p.d1 * 235), L2 = Math.min(W * .40, p.d2 * 235);
    const dy = (st.dir || 0) * 30;
    const yl = x => { const t = (x - (cx - L1)) / (L1 + L2); return y + dy - t * 2 * dy; };
    G.line(g, cx - L1, yl(cx - L1), cx + L2, yl(cx + L2), '#ffd166', 7);
    G.dot(g, cx, y, 11, '#8fb6ea', '#fff');
    // груз слева
    const by = yl(cx - L1);
    const legLen = Math.min(64, 32 + p.F1 * .1);
    G.line(g, cx - L1, by, cx - L1, by + legLen, 'rgba(200,225,255,.75)', 1.6);
    G.bar(g, cx - L1 - 26, by + legLen, 52, 30, 'rgba(120,190,255,.6)');
    G.txt(g, 'F₁ = ' + p.F1 + ' Н', cx - L1, by - 10, { align: 'center', size: 12.5, col: '#8fd7ff' });
    G.line(g, cx - L1, y - 20, cx, y - 20, 'rgba(255,209,102,.65)', 1.4, [4, 4]);
    G.txt(g, 'd₁ = ' + fmt(p.d1, 2) + ' м', (cx - L1 + cx) / 2, y - 26, { align: 'center', size: 12, col: '#ffd166' });
    // сила руки справа
    const hy = yl(cx + L2);
    const aLen = Math.min(78, 22 + p.F2 * .15);
    G.arrow(g, cx + L2, hy - aLen, cx + L2, hy - 6, '#8affe0', 3, 11);
    G.txt(g, 'F₂ = ' + p.F2 + ' Н', cx + L2, hy - aLen - 10, { align: 'center', size: 12.5, col: '#8affe0' });
    G.line(g, cx, y - 20, cx + L2, y - 20, 'rgba(255,209,102,.65)', 1.4, [4, 4]);
    G.txt(g, 'd₂ = ' + fmt(p.d2, 2) + ' м', (cx + L2 + cx) / 2, y - 26, { align: 'center', size: 12, col: '#ffd166' });
    // моменты
    G.panel(g, 14, 12, 360, 82);
    G.txt(g, 'M₁ = F₁·d₁ = ' + fmt(M1, 1) + ' Н·м', 22, 34, { size: 12.5, col: '#8fd7ff' });
    G.txt(g, 'M₂ = F₂·d₂ = ' + fmt(M2, 1) + ' Н·м', 22, 54, { size: 12.5, col: '#8affe0' });
    const d = (M1 - M2) / Math.max(1, M1) * 100;
    G.txt(g, Math.abs(d) < 3 ? '⚖️ равновесие: M₁ = M₂' : d > 0 ? '⬇ груз перевешивает: усилия не хватает' : '⬆ рука перевешивает: груз поднимается', 22, 76, { size: 12.5, weight: 700, col: Math.abs(d) < 3 ? '#8affe0' : '#ffd166' });
    G.panel(g, W - 214, 12, 200, 62);
    G.txt(g, 'выигрыш в силе d₂/d₁ = ' + fmt(p.d2 / p.d1, 2) + '×', W - 206, 36, { size: 12, col: '#cfe2ff' });
    G.txt(g, 'нужно F₂ = ' + fmt(M1 / p.d2, 1) + ' Н', W - 206, 56, { size: 12.5, weight: 700, col: '#ffd166' });
  },
  readout(st) {
    const p = st.p, M1 = p.F1 * p.d1, M2 = p.F2 * p.d2, need = M1 / p.d2;
    const d = (M1 - M2) / Math.max(1, M1) * 100;
    return `<div class="kv"><span>Момент нагрузки M₁</span><b>${fmt(M1, 1)} Н·м</b></div>
    <div class="kv"><span>Момент усилия M₂</span><b>${fmt(M2, 1)} Н·м</b></div>
    <div class="kv"><span>Нужное усилие</span><b>${fmt(need, 1)} Н</b></div>
    <div class="kv"><span>Ваше усилие</span><b>${fmt(p.F2, 0)} Н — ${Math.abs(d) < 3 ? 'точно в равновесии' : d > 0 ? 'не хватает ' + fmt(need - p.F2, 1) + ' Н' : 'запас ' + fmt(p.F2 - need, 1) + ' Н'}</b></div>
    <div class="kv"><span>Выигрыш в силе</span><b>${fmt(p.d2 / p.d1, 2)} ×</b></div>
    <div class="kv"><span>Во столько же раз вырастет путь</span><b>${fmt(p.d2 / p.d1, 2)} ×</b></div>
    <div class="note">Правило моментов: <span class="f">F₁·d₁ = F₂·d₂</span> — это пропорция, то есть математика. «Золотое правило механики»: выигрывая в силе, проигрываем в перемещении, поэтому работа не меняется. Тачка, весло, ножницы, гаечный ключ, качели — все устроены по одному чертежу.</div>`;
  }
});

/* ---------- 16. КПД: куда уходит энергия (техника + экология + экономика) ---------- */
defSim('efficiency', {
  title: '⚡ КПД: куда уходит энергия',
  aspect: .56,
  theoryNote: 'КПД = полезная энергия / затраченная. Физика даёт формулу, техника — устройство, экономика считает деньги, а экология — сколько CO₂ «ушло в воздух» вместе с потерями.',
  hint: 'Переключайте устройства с одинаковой полезной мощностью и смотрите, как различаются затраты и потери.',
  selects: [{
    key: 'dev', label: 'Устройство', val: 'lamp',
    options: [
      { v: 'lamp', label: 'Лампа накаливания — КПД 5 %' },
      { v: 'led', label: 'Светодиодная лампа — КПД 35 %' },
      { v: 'motor', label: 'Электродвигатель — КПД 85 %' },
      { v: 'ice', label: 'Двигатель автомобиля — КПД 28 %' },
      { v: 'human', label: 'Человек на велосипеде — КПД 25 %' }
    ]
  }],
  params: [{ key: 'P', label: 'Полезная мощность', min: 5, max: 2000, step: 5, val: 60, unit: 'Вт', dec: 0 }],
  draw(g, st, W, H) {
    const eff = { lamp: .05, led: .35, motor: .85, ice: .28, human: .25 }[st.p.dev];
    const names = { lamp: 'лампа накаливания', led: 'светодиодная лампа', motor: 'электродвигатель', ice: 'ДВС автомобиля', human: 'человек на велосипеде' };
    const P = st.p.P, Pz = P / eff, loss = Pz - P;
    G.bg(g, W, H);
    G.txt(g, names[st.p.dev], 16, 24, { size: 15.5, weight: 700, col: '#ffd166' });
    G.txt(g, 'КПД = ' + fmt(eff * 100, 0) + ' %   ·   полезная мощность ' + fmt(P, 0) + ' Вт   ·   затраченная ' + fmt(Pz, 0) + ' Вт', 16, 44, { size: 12.5, col: '#cfe2ff' });
    // диаграмма потоков энергии
    const top = 62, bot = H * .58, cy = (top + bot) / 2, maxH = bot - top;
    const x0 = W * .05, x1 = W * .50, x2 = W * .95;
    const sc = maxH / Pz;
    const hIn = Math.max(34, Pz * sc), hUse = Math.max(12, P * sc), hLoss = Math.max(12, loss * sc);
    G.bar(g, x0, cy - hIn / 2, x1 - x0, hIn, 'rgba(160,190,230,.28)');
    g.save(); g.strokeStyle = 'rgba(180,210,245,.4)'; g.lineWidth = 1; g.strokeRect(x0 + .5, cy - hIn / 2 + .5, x1 - x0 - 1, hIn - 1); g.restore();
    G.txt(g, 'затраченная энергия', x0 + 12, cy - hIn / 2 + 20, { size: 12, col: '#cfe2ff' });
    G.txt(g, fmt(Pz, 0) + ' Вт', x0 + 12, cy + 6, { size: 18, weight: 700, col: '#e8f0ff' });
    const total = hLoss + hUse + 4, yTop = cy - total / 2;
    G.bar(g, x1, yTop, x2 - x1, hLoss, 'rgba(255,107,107,.72)');
    G.bar(g, x1, yTop + hLoss + 4, x2 - x1, hUse, 'rgba(76,201,240,.9)');
    G.txt(g, 'потери в тепло: ' + fmt(loss, 0) + ' Вт', x1 + 12, yTop + Math.max(18, hLoss / 2 + 5), { size: 13, weight: 700, col: '#300a0a' });
    G.txt(g, 'полезная работа: ' + fmt(P, 0) + ' Вт (' + fmt(eff * 100, 0) + ' %)', x1 + 12, yTop + hLoss + 4 + Math.max(16, hUse / 2 + 5), { size: 13, weight: 700, col: '#04121f' });
    G.txt(g, 'Вся энергия сохраняется: ' + fmt(Pz, 0) + ' = ' + fmt(P, 0) + ' + ' + fmt(loss, 0) + ' (Вт)', x0 + 12, bot + 18, { size: 12, col: '#9fb8dd' });
    // сравнение устройств
    const yb = H * .74;
    G.txt(g, 'Сравнение: чтобы получить ' + fmt(P, 0) + ' Вт пользы, нужно затратить', x0, yb - 8, { size: 12, col: '#9fb8dd' });
    const rows = [['накаливания 5 %', P / .05, '#ff9d7b'], ['LED 35 %', P / .35, '#8affe0'], ['двигатель 85 %', P / .85, '#4cc9f0']];
    const bw2 = (W - x0 * 2) / 3 - 16;
    rows.forEach(([n, pz, c], i) => {
      const x = x0 + i * (bw2 + 16);
      G.bar(g, x, yb, bw2, 12, c);
      G.txt(g, n, x, yb + 26, { size: 11, col: '#9fb8dd' });
      G.txt(g, fmt(pz, 0) + ' Вт', x, yb + 44, { size: 13.5, weight: 700, col: c });
    });
  },
  readout(st) {
    const eff = { lamp: .05, led: .35, motor: .85, ice: .28, human: .25 }[st.p.dev];
    const P = st.p.P, Pz = P / eff, loss = Pz - P;
    const kWh = Pz * 24 / 1000, money = kWh * 22, co2 = kWh * 0.6;
    return `<div class="kv"><span>КПД</span><b>${fmt(eff * 100, 0)} %</b></div>
    <div class="kv"><span>Затраченная мощность</span><b>${fmt(Pz, 0)} Вт</b></div>
    <div class="kv"><span>Потери (нагрев)</span><b>${fmt(loss, 0)} Вт</b></div>
    <div class="kv"><span>За сутки работы</span><b>${fmt(kWh, 2)} кВт·ч</b></div>
    <div class="kv"><span>Стоимость за сутки (≈22 ₸/кВт·ч)</span><b>${fmt(money, 0)} ₸</b></div>
    <div class="kv"><span>Выбросы CO₂ за сутки</span><b>${fmt(co2, 2)} кг</b></div>
    <div class="note">У лампы накаливания 95 % энергии уходит в тепло — это не «плохая» лампа, а закон сохранения энергии: вся электроэнергия превращается в тепло и свет, просто полезного света мало. Замена на LED снижает расход электричества в 7 раз при том же свете — так физика экономит деньги и уменьшает вредные выбросы.</div>`;
  }
});

/* ---------- 17. Закон Ома в быту (техника + безопасность) ---------- */
defSim('ohm', {
  title: '🔌 Закон Ома и перегрузка сети',
  aspect: .54,
  theoryNote: 'Закон Ома I = U/R связывает физику и электротехнику, а правило Q = I²Rt объясняет, почему нельзя включать много мощных приборов в один удлинитель: греется провод.',
  hint: 'Уменьшайте сопротивление (подключайте приборы параллельно) — ток растёт, а вместе с ним выделяемое тепло.',
  params: [
    { key: 'U', label: 'Напряжение', min: 3, max: 24, step: .5, val: 12, unit: 'В', dec: 1 },
    { key: 'R', label: 'Сопротивление прибора', min: 2, max: 120, step: 1, val: 12, unit: 'Ом', dec: 0 }
  ],
  actions: [{ label: '🔌 Подключить второй прибор параллельно', primary: true, run: (st, a) => { st.par = !st.par; a.notify(st.par ? 'Второе сопротивление подключено параллельно: общее сопротивление уменьшилось, и сила тока выросла.' : 'Второй прибор отключён.'); } }],
  init: () => ({ q: 0, par: false }),
  step(st, dt) { st.q += dt; },
  draw(g, st, W, H) {
    const p = st.p, R = st.par ? p.R / 2 : p.R, I = p.U / R, P = p.U * I;
    G.bg(g, W, H);
    const x0 = W * .12, x1 = W * .74, y0 = H * .24, y1 = H * .68;
    // батарея
    G.line(g, x0, y0, x0, y1, '#8fb6ea', 3); G.line(g, x1, y0, x1, y1, '#8fb6ea', 3);
    G.line(g, x0, y0, x1, y0, '#8fb6ea', 3); G.line(g, x0, y1, x1, y1, '#8fb6ea', 3);
    G.line(g, x0 - 20, y0, x0 + 2, y0, '#fff', 3); G.line(g, x0 - 14, y0 + 10, x0 + 8, y0 + 10, '#8fb6ea', 3);
    G.txt(g, 'источник U = ' + fmt(p.U, 1) + ' В', x0 - 26, y0 - 14, { size: 12, col: '#cfe2ff' });
    // лампа/прибор (зигзаг)
    const mx = (x0 + x1) / 2;
    G.bar(g, mx - 22, y0 - 16, 44, 32, 'rgba(20,30,50,.9)');
    G.line(g, mx - 18, y0, mx + 18, y0, '#ffd166', 2);
    g.save(); g.strokeStyle = '#ffd166'; g.lineWidth = 2.4; g.beginPath();
    for (let i = 0; i <= 6; i++) { const x = mx - 16 + i * 32 / 6; g.lineTo(x, y0 + (i % 2 ? 9 : -9)); }
    g.stroke(); g.restore();
    G.txt(g, 'R = ' + fmt(R, 1) + ' Ом', mx, y0 - 26, { align: 'center', size: 12.5, col: '#ffd166' });
    // свечение
    const glow = Math.min(1, P / 30);
    const rad = g.createRadialGradient(mx, y0, 4, mx, y0, 70 + glow * 40);
    rad.addColorStop(0, 'rgba(255,230,150,' + (.18 + glow * .55) + ')'); rad.addColorStop(1, 'rgba(255,230,150,0)');
    g.fillStyle = rad; g.beginPath(); g.arc(mx, y0, 70 + glow * 40, 0, TAU); g.fill();
    // ток — бегущие точки
    const speed = Math.min(220, 18 + I * 12);
    const per = (x1 - x0) * 2 + (y1 - y0) * 2;
    for (let k = 0; k < 26; k++) {
      let s = ((st.q * speed + k * per / 26) % per);
      let x, y;
      if (s < x1 - x0) { x = x0 + s; y = y0; }
      else if (s < (x1 - x0) + (y1 - y0)) { x = x1; y = y0 + (s - (x1 - x0)); }
      else if (s < 2 * (x1 - x0) + (y1 - y0)) { x = x1 - (s - (x1 - x0) - (y1 - y0)); y = y1; }
      else { x = x0; y = y1 - (s - 2 * (x1 - x0) - (y1 - y0)); }
      G.dot(g, x, y, 3.2, '#4cc9f0');
    }
    // параллельный прибор
    if (st.par) {
      const px = W * .88;
      G.line(g, x1, y0, px, y0, '#8fb6ea', 3); G.line(g, x1, y1, px, y1, '#8fb6ea', 3);
      G.line(g, px, y0, px, y1, '#8fb6ea', 3);
      G.bar(g, px - 12, (y0 + y1) / 2 - 14, 24, 28, 'rgba(20,30,50,.9)');
      g.save(); g.strokeStyle = '#ff9d7b'; g.lineWidth = 2.4; g.beginPath();
      for (let i = 0; i <= 5; i++) { const y = (y0 + y1) / 2 - 12 + i * 24 / 5; g.lineTo(px + (i % 2 ? 8 : -8), y); }
      g.stroke(); g.restore();
      G.txt(g, 'второй прибор ' + fmt(p.R, 0) + ' Ом', px, (y0 + y1) / 2 + 34, { align: 'center', size: 11.5, col: '#ff9d7b' });
    }
    G.panel(g, W * .12, H * .80, W * .76, 64);
    G.txt(g, 'I = U / R = ' + fmt(I, 2) + ' А', W * .14, H * .80 + 24, { size: 13.5, weight: 700, col: '#8fd7ff' });
    G.txt(g, 'P = U · I = ' + fmt(P, 1) + ' Вт', W * .40, H * .80 + 24, { size: 13.5, weight: 700, col: '#ffd166' });
    G.txt(g, 'Q = I²Rt = ' + fmt(I * I * R * 60, 0) + ' Дж за 1 мин (нагрев провода)', W * .14, H * .80 + 46, { size: 12.5, col: '#ff9d9d' });
    G.txt(g, 'Правило: I ≤ 16 А в бытовой розетке', W * .62, H * .80 + 46, { size: 11.5, col: '#9fb8dd' });
  },
  readout(st) {
    const p = st.p, R = st.par ? p.R / 2 : p.R, I = p.U / R, P = p.U * I;
    return `<div class="kv"><span>Общее сопротивление</span><b>${fmt(R, 2)} Ом</b></div>
    <div class="kv"><span>Сила тока I = U/R</span><b>${fmt(I, 2)} А</b></div>
    <div class="kv"><span>Мощность P = U·I</span><b>${fmt(P, 1)} Вт</b></div>
    <div class="kv"><span>Количество теплоты за 1 мин</span><b>${fmt(I * I * R * 60, 0)} Дж</b></div>
    <div class="kv"><span>Второй прибор подключён</span><b>${st.par ? 'да (параллельно)' : 'нет'}</b></div>
    <div class="note">При параллельном подключении общее сопротивление падает и ток растёт — так и происходит перегрузка. Именно поэтому в квартирах стоят автоматы на 16 А: если ток больше, они размыкают цепь и предотвращают нагрев проводов и пожар.</div>`;
  }
});


/* ==== sims3.js ==== */
/* ============ СИМУЛЯТОРЫ: МУЗЫКА, ИЗО, ИСТОРИЯ, ЛИТЕРАТУРА, ПСИХОЛОГИЯ, ИНФОРМАТИКА ============ */

/* ---------- 18. Струна музыкального инструмента (музыка + физика) ---------- */
const STRING_MU = { ukulele: .002, guitar: .005, violin: .0012, bass: .02 };
function stringFreq(p) { return 1 / (2 * p.L) * Math.sqrt(p.T / STRING_MU[p.str]); }
defSim('music', {
  title: '🎸 Струна: натяжение, длина и нота',
  aspect: .58,
  theoryNote: 'Звук — это волна (физика), струна колеблется по закону Гука и формуле <span class="f">f = (1/2L)·√(T/μ)</span>, а музыкант, поворачивая колок, меняет натяжение T и «настраивает» ноту. Математика здесь — корень и обратная пропорциональность.',
  hint: 'Натяните струну или укоротите её — частота растёт. Нажмите «Слушать ноту», чтобы услышать результат.',
  params: [
    { key: 'T', label: 'Натяжение струны T', min: 20, max: 300, step: 1, val: 80, unit: 'Н', dec: 0 },
    { key: 'L', label: 'Длина струны L', min: .25, max: .75, step: .01, val: .65, unit: 'м', dec: 2 }
  ],
  selects: [
    {
      key: 'str', label: 'Струна (линейная плотность μ)', val: 'guitar', options: [
        { v: 'ukulele', label: 'Укулеле — μ = 0,002 кг/м' },
        { v: 'guitar', label: 'Гитара — μ = 0,005 кг/м' },
        { v: 'violin', label: 'Скрипка — μ = 0,0012 кг/м' },
        { v: 'bass', label: 'Бас-гитара — μ = 0,02 кг/м' }
      ]
    },
    { key: 'mode', label: 'Что показываем', val: '1', options: [{ v: '1', label: 'Основной тон (1-я гармоника)' }, { v: '2', label: '2-я гармоника' }, { v: '3', label: '3-я гармоника' }, { v: 'all', label: 'Все обертоны — тембр' }] }
  ],
  actions: [{ label: '🔊 Слушать ноту (1 с)', primary: true, run: (st, a) => { const f = stringFreq(st.p); a.tone(Math.max(40, Math.min(3000, f)), 1, .2, 'triangle'); a.notify('Играет ' + fmt(f, 0) + ' Гц — ' + note(f)); } }],
  draw(g, st, W, H) {
    const p = st.p, mu = { ukulele: .002, guitar: .005, violin: .0012, bass: .02 }[p.str];
    const f = stringFreq(p);
    G.bg(g, W, H);
    const x0 = W * .10, x1 = W * .90, y = H * .40, len = x1 - x0;
    G.txt(g, 'f = (1/2L)·√(T/μ) = ' + fmt(f, 1) + ' Гц — ' + note(f), x0, H * .13, { size: 14, weight: 700, col: '#ffd166' });
    G.txt(g, 'λ = 2L = ' + fmt(2 * p.L, 2) + ' м,  T = ' + fmt(1 / f * 1000, 1) + ' мс', x0, H * .13 + 20, { size: 12, col: '#9fb8dd' });
    // подставки
    G.bar(g, x0 - 8, y - 34, 8, 68, 'rgba(200,225,255,.55)');
    G.bar(g, x1, y - 34, 8, 68, 'rgba(200,225,255,.55)');
    // струна
    const modes = p.mode === 'all' ? [1, 2, 3] : [parseInt(p.mode)];
    const A = 16;
    const yOf = x => {
      let v = 0;
      modes.forEach(n => { v += (A / n) * Math.sin(Math.PI * n * (x - x0) / len) * Math.cos(st.t * (2 + n) * 3 + n); });
      return y - v;
    };
    g.save();
    g.beginPath();
    for (let i = 0; i <= 200; i++) { const X = x0 + i / 200 * len, Y = yOf(X); i ? g.lineTo(X, Y) : g.moveTo(X, Y); }
    g.strokeStyle = '#ffd166'; g.lineWidth = 2.4; g.stroke(); g.restore();
    // узлы и пучности
    const n1 = modes[0];
    for (let k = 1; k < n1; k++) { const X = x0 + len * k / n1; G.dot(g, X, y, 3.4, '#8fd7ff'); }
    G.txt(g, '● узлы (точки не движутся)', x0, H * .62, { size: 11.5, col: '#8fd7ff' });
    // шкала звуков
    const sx = W * .10, sw = W * .80, sy = H * .78;
    G.line(g, sx, sy, sx + sw, sy, 'rgba(150,190,240,.5)', 2);
    const fmin = 60, fmax = 1400;
    [[82, 'E₂'], [110, 'A₂'], [147, 'D₃'], [196, 'G₃'], [247, 'B₃'], [330, 'E₄'], [440, 'A₄'], [587, 'D₅'], [880, 'A₅']].forEach(([v, l]) => {
      const X = sx + Math.log(v / fmin) / Math.log(fmax / fmin) * sw;
      if (X < sx || X > sx + sw) return;
      G.line(g, X, sy - 6, X, sy + 6, 'rgba(180,215,255,.6)', 1.4);
      G.txt(g, l, X, sy + 20, { size: 10.5, col: '#9fb8dd', align: 'center' });
    });
    const px = sx + Math.log(Math.max(fmin, Math.min(fmax, f)) / fmin) / Math.log(fmax / fmin) * sw;
    G.dot(g, px, sy, 6, '#ff6b9d', '#fff');
    G.txt(g, fmt(f, 0) + ' Гц', px, sy - 14, { size: 12, col: '#ff9dbd', align: 'center', weight: 700 });
    G.txt(g, 'нотная шкала (гитара):', sx, sy + 40, { size: 11.5, col: '#9fb8dd' });
  },
  readout(st) {
    const p = st.p, mu = { ukulele: .002, guitar: .005, violin: .0012, bass: .02 }[p.str];
    const f = 1 / (2 * p.L) * Math.sqrt(p.T / mu);
    const f2 = 1 / (2 * p.L) * Math.sqrt(4 * p.T / mu);
    return `<div class="kv"><span>Частота f</span><b>${fmt(f, 1)} Гц</b></div>
    <div class="kv"><span>Нота</span><b>${note(f)}</b></div>
    <div class="kv"><span>Скорость волны в струне v = √(T/μ)</span><b>${fmt(Math.sqrt(p.T / mu), 1)} м/с</b></div>
    <div class="kv"><span>Длина волны λ = 2L</span><b>${fmt(2 * p.L, 2)} м</b></div>
    <div class="kv"><span>Если натянуть в 4 раза сильнее</span><b>${fmt(f2, 0)} Гц — октава выше</b></div>
    <div class="note">Струна колеблется по закону Гука (сила упругости), а её звук описывается волновой физикой. <b>Математика</b>: частота обратно пропорциональна длине и пропорциональна корню из натяжения, поэтому для октавы натяжение нужно увеличить в 4 раза. <b>Музыка</b>: из этих пропорций выросли строй, лады и деление октавы на 12 полутонов, а из смеси обертонов складывается <b>тембр</b> — голос скрипки отличается от гитары.</div>`;
  }
});

/* ---------- 19. Свет, тень и полутень (ИЗО + геометрия + астрономия) ---------- */
defSim('shadow', {
  title: '🎨 Геометрия тени: свет и светотень',
  aspect: .56,
  theoryNote: 'Тень строится <b>подобием треугольников</b> — это геометрия. Художник использует те же законы для светотени, а астрономия добавляет, что высота Солнца зависит от времени и сезона.',
  hint: 'Опустите источник ниже — тень вырастет. Переключите источник на «лампу-шар» и увидите полутень.',
  params: [
    { key: 'Hs', label: 'Высота источника', min: .6, max: 6, step: .05, val: 3, unit: 'м', dec: 2 },
    { key: 'xo', label: 'Расстояние до предмета', min: 1, max: 7, step: .1, val: 3, unit: 'м', dec: 1 },
    { key: 'ho', label: 'Высота предмета', min: .3, max: 3, step: .05, val: 1.4, unit: 'м', dec: 2 }
  ],
  selects: [{ key: 'src', label: 'Источник света', val: 'point', options: [{ v: 'point', label: 'Точечный (яркая лампа, Солнце)' }, { v: 'ext', label: 'Протяжённый (лампа-шар, облачное небо)' }] }],
  draw(g, st, W, H) {
    const p = st.p, xmax = 14, S = (W - 60) / xmax, y0 = H * .82;
    G.bg(g, W, H);
    const X = x => 30 + x * S, Y = y => y0 - y * S * .62;
    // земля
    G.line(g, 10, y0, W - 10, y0, '#8fb6ea', 2.4);
    G.txt(g, 'земля', 16, y0 + 20, { size: 11.5, col: '#7ea4d8' });
    const Hs = p.Hs, ho = p.ho, xo = p.xo;
    // источник
    const sx = 0.6 - (p.src === 'ext' ? 0.34 : 0), sw2 = p.src === 'ext' ? .68 : 0;
    if (p.src === 'point') G.dot(g, X(0.6), Y(Hs), 10, '#ffd166', '#fff7d6');
    else { G.bar(g, X(sx), Y(Hs), sw2 * S, 16, '#ffd166'); G.dot(g, X(sx), Y(Hs) + 8, 8, '#ffd166'); G.dot(g, X(sx + sw2), Y(Hs) + 8, 8, '#ffd166'); }
    G.txt(g, p.src === 'point' ? 'точечный источник' : 'протяжённый источник', X(0.6) - 10, Y(Hs) - 22, { size: 12, col: '#ffd166' });
    // предмет
    G.bar(g, X(xo) - 8, Y(ho), 16, y0 - Y(ho), 'rgba(200,225,255,.65)');
    G.dot(g, X(xo), Y(ho), 5, '#ff9d7b');
    G.txt(g, 'h = ' + fmt(ho, 2) + ' м', X(xo) + 12, Y(ho) - 6, { size: 11.5, col: '#cfe2ff' });
    // лучи и тень
    if (Hs <= ho) {
      G.txt(g, 'источник ниже предмета — тень уходит в бесконечность', W * .40, H * .22, { size: 13, col: '#ff9d9d' });
    } else {
      const k = ho / (Hs - ho);
      const tip = xo + k * xo;                                  // конец тени (точечный источник)
      const xNear = 0.6 + (p.src === 'ext' ? 0.34 : 0), xFar = 0.6 - (p.src === 'ext' ? 0.34 : 0);
      const kNear = ho / (Hs - ho), kFar = kNear;
      const tipU = p.src === 'ext' ? xo + ho * (xo - xNear) / (Hs - ho) : tip;
      const tipP = p.src === 'ext' ? xo + ho * (xo - xFar) / (Hs - ho) : tip;
      const xEnd = Math.min(xmax - .2, p.src === 'ext' ? tipP : tip);
      // закрашенная тень
      g.save();
      g.beginPath(); g.moveTo(X(xo), y0); g.lineTo(X(Math.min(xmax - .2, tipU)), y0);
      g.lineTo(X(xo), Y(ho)); g.closePath();
      g.fillStyle = 'rgba(5,10,22,.75)'; g.fill(); g.restore();
      if (p.src === 'ext') {
        g.save();
        g.beginPath(); g.moveTo(X(Math.min(xmax - .2, tipU)), y0); g.lineTo(X(xEnd), y0);
        g.lineTo(X(xo), Y(ho)); g.closePath();
        g.fillStyle = 'rgba(5,10,22,.35)'; g.fill(); g.restore();
        G.txt(g, 'полутень', X((tipU + xEnd) / 2), y0 + 40, { size: 11.5, col: '#9fb8dd', align: 'center' });
      }
      // лучи
      G.line(g, X(0.6), Y(Hs), X(xo), Y(ho), 'rgba(255,209,102,.85)', 1.8);
      G.line(g, X(xo), Y(ho), X(xEnd), y0, 'rgba(255,209,102,.85)', 1.8);
      if (p.src === 'ext') {
        G.line(g, X(0.6 + 0.34), Y(Hs), X(xo), Y(ho), 'rgba(255,209,102,.5)', 1.4);
        G.line(g, X(xo), Y(ho), X(Math.min(xmax - .2, tipU)), y0, 'rgba(255,209,102,.5)', 1.4);
        G.line(g, X(0.6 - 0.34), Y(Hs), X(xo), Y(ho), 'rgba(255,209,102,.5)', 1.4);
        G.line(g, X(xo), Y(ho), X(xEnd), y0, 'rgba(255,209,102,.5)', 1.4);
      }
      G.txt(g, 'тень ' + fmt(xEnd - xo, 2) + ' м' + (xEnd >= xmax - .3 ? ' (и дальше!)' : ''), X((xo + xEnd) / 2), y0 + 20, { size: 12.5, col: '#8fd7ff', align: 'center' });
      const alpha = Math.atan2(Hs - ho, xo) * R2D;
      G.panel(g, 12, 12, 300, 60);
      G.txt(g, 'подобие треугольников:', 20, 32, { size: 11.5, col: '#9fb8dd' });
      G.txt(g, 'L = h · x / (H − h) = ' + fmt(ho, 2) + '·' + fmt(xo, 1) + '/' + fmt(Hs - ho, 2) + ' = ' + fmt(tip - xo, 2) + ' м', 20, 50, { size: 11.5, col: '#ffd166' });
      G.txt(g, 'угол лучей к горизонту: ' + fmt(alpha, 1) + '°', 20, 66, { size: 11.5, col: '#8affe0' });
    }
  },
  readout(st) {
    const p = st.p, k = p.ho / (p.Hs - p.ho), Lt = k * p.xo;
    if (p.Hs - p.ho < .02) return `<div class="kv"><span>Соотношение высот</span><b>источник ${fmt(p.Hs, 2)} м ${p.Hs < p.ho ? 'ниже' : 'на уровне'} предмета ${fmt(p.ho, 2)} м</b></div>
    <div class="kv"><span>Длина тени</span><b>тени на земле нет: последний луч, идущий над предметом, горизонтален или направлен вверх</b></div>
    <div class="kv"><span>Почему</span><b>в формуле L = h·x/(H − h) знаменатель обращается в нуль — тень «уходит в бесконечность»</b></div>
    <div class="kv"><span>Физический смысл</span><b>свет снизу или сбоку не отбрасывает тень на землю — предмет просто не перекрывает поток света к поверхности</b></div>
    <div class="kv"><span>Что делать</span><b>поднимите источник выше предмета (H &gt; h)</b></div>
    <div class="note">Подобие треугольников работает только при H &gt; h. Если источник поднять ровно на высоту предмета, лучи скользят по его верхушке параллельно земле, и граница тени уходит на бесконечность — предельный переход, знакомый по математике (деление на величину, стремящуюся к нулю).</div>`;
    return `<div class="kv"><span>Длина тени (точечный источник)</span><b>${fmt(Lt, 2)} м</b></div>
    <div class="kv"><span>Отношение тени к предмету</span><b>${fmt(Lt / p.ho, 2)} ×</b></div>
    <div class="kv"><span>Угол лучей к горизонту</span><b>${fmt(Math.atan2(p.Hs - p.ho, p.xo) * R2D, 1)}°</b></div>
    <div class="kv"><span>Тип источника</span><b>${p.src === 'point' ? 'точечный → резкая тень' : 'протяжённый → тень + полутень'}</b></div>
    <div class="note">Геометрия: треугольники «источник–верх предмета–конец тени» и «предмет–основание–конец тени» подобны, отсюда пропорция L/h = x/(H−h). ИЗО: художник строит светотень (блик, полутень, собственная тень, рефлекс, падающая тень) по тем же правилам. Астрономия: зимой Солнце стоит низко, поэтому в полдень тени длинные — это видно на симуляторе «Земля, Солнце и времена года».</div>`;
  }
});

/* ---------- 20. Ощущения и закон Вебера (психология + логарифмы) ---------- */
defSim('weber', {
  title: '🧠 Ощущение и стимул: закон Вебера',
  aspect: .54,
  theoryNote: 'Психология изучает, как физический стимул превращается в ощущение. Оказалось, что важна не абсолютная прибавка, а её <b>доля</b>: ΔI/I ≈ const. Поэтому громкость и яркость измеряют в логарифмических шкалах (дБ), а математика даёт нам логарифм.',
  hint: 'Меняйте фон: одна и та же прибавка «работает» по-разному при слабом и сильном сигнале.',
  params: [
    { key: 'I', label: 'Сила стимула (фон), условные единицы', min: 2, max: 100, step: 1, val: 10, dec: 0 },
    { key: 'dI', label: 'Прибавка стимула ΔI', min: 0, max: 30, step: .5, val: 3, dec: 1 }
  ],
  init: () => ({ hist: [] }),
  draw(g, st, W, H) {
    const p = st.p, ratio = p.dI / p.I, JND = .1;   // для яркости порог ≈ 0.1
    G.bg(g, W, H);
    // фон и стимул
    const bx = W * .10, bw = W * .34, cy = H * .30, bh = 70;
    G.panel(g, bx - 10, cy - 34, bw + 20, bh + 58, { fill: 'rgba(255,255,255,.04)' });
    G.txt(g, 'физический стимул (яркость лампы)', bx - 4, cy - 16, { size: 11.5, col: '#9fb8dd' });
    G.bar(g, bx, cy, bw * (p.I / 100), bh, 'rgba(255,209,102,.55)');
    G.bar(g, bx + bw * (p.I / 100), cy, Math.min(bw * (1 - p.I / 100), bw * p.dI / 100), bh, 'rgba(138,255,224,.85)');
    G.txt(g, 'I = ' + fmt(p.I, 0), bx + 2, cy + bh + 18, { size: 12, col: '#ffd166' });
    G.txt(g, '+ΔI = ' + fmt(p.dI, 1), bx + bw * (p.I / 100) + 4, cy + bh + 18, { size: 12, col: '#8affe0' });
    const seen = ratio >= JND;
    G.panel(g, bx - 10, cy + bh + 30, bw + 20, 44, { fill: seen ? 'rgba(138,255,224,.12)' : 'rgba(255,107,107,.12)', stroke: seen ? 'rgba(138,255,224,.4)' : 'rgba(255,150,150,.4)' });
    G.txt(g, seen ? '✅ человек заметит разницу' : '❌ разница не заметна', bx + bw / 2 - 10, cy + bh + 58, { size: 13, weight: 700, col: seen ? '#8affe0' : '#ff9d9d' });
    G.txt(g, 'ΔI / I = ' + fmt(ratio, 3) + (seen ? ' ≥ 0,1 — порог пройден' : ' < 0,1 — ниже порога'), bx - 4, cy + bh + 90, { size: 12, col: '#cfe2ff' });
    // кривая ощущения (логарифм)
    const gx = W * .56, gy = H * .16, gw = W * .38, gh = H * .62;
    G.panel(g, gx, gy, gw, gh, { fill: 'rgba(255,255,255,.04)' });
    G.txt(g, 'ощущение S = k · ln(I / I₀) — логарифм', gx + 10, gy + 18, { size: 11.5, col: '#9fb8dd' });
    const PX = I => gx + 22 + I / 100 * (gw - 36), PY = S => gy + gh - 26 - S * (gh - 60);
    g.save(); g.beginPath();
    for (let I = 2; I <= 100; I += 1) { const S = Math.log(I / 2) / Math.log(50), X = PX(I), Y = PY(S); I === 2 ? g.moveTo(X, Y) : g.lineTo(X, Y); }
    g.strokeStyle = '#4cc9f0'; g.lineWidth = 2.6; g.stroke(); g.restore();
    G.dot(g, PX(p.I), PY(Math.log(p.I / 2) / Math.log(50)), 6, '#ffd166', '#fff');
    G.dot(g, PX(Math.min(100, p.I + p.dI)), PY(Math.log(Math.min(100, p.I + p.dI) / 2) / Math.log(50)), 6, '#8affe0', '#fff');
    G.txt(g, 'сила стимула', gx + gw - 10, gy + gh - 4, { size: 11, col: '#7ea4d8', align: 'right' });
    G.txt(g, 'Видно: чтобы ощущение выросло на одну и ту же «ступеньку»,', gx + 10, gy + gh + 4, { size: 11.5, col: '#9fb8dd' });
    G.txt(g, 'стимул нужно умножать, а не прибавлять.', gx + 10, gy + gh + 20, { size: 11.5, col: '#9fb8dd' });
    G.txt(g, 'это же объясняет шкалу децибел и звёздные величины', W * .12, H - 12, { size: 12, col: '#8affe0' });
  },
  readout(st) {
    const p = st.p, ratio = p.dI / p.I;
    const need = Math.ceil(0.1 * p.I * 10) / 10;
    return `<div class="kv"><span>Отношение ΔI / I</span><b>${fmt(ratio, 3)}</b></div>
    <div class="kv"><span>Порог различия (для яркости)</span><b>≈ 0,10</b></div>
    <div class="kv"><span>Минимальная заметная прибавка при вашем фоне</span><b>${fmt(need, 1)} ед.</b></div>
    <div class="kv"><span>Прибавка в 1 ед. заметна при фоне</span><b>до ${fmt(10, 0)} ед.</b></div>
    <div class="note">Закон Вебера–Фехнера: ощущение растёт <b>логарифмически</b>. Поэтому в сумерках видна одна свеча, а в яркий день она не заметна; поэтому громкость измеряют в дБ, а звёзды — в звёздных величинах (математика: логарифмы). Физика описывает стимул, психология — восприятие, а вместе это уже <b>психофизика</b> — область на стыке наук.</div>`;
  }
});

/* ---------- 21. Двоичный код и точность измерения (информатика + измерения) ---------- */
defSim('binary', {
  title: '🔢 Нули и единицы: точность измерения',
  aspect: .5,
  kind: 'html',
  theoryNote: 'Компьютер хранит числа в двоичном виде (информатика), а физика ставит задачу: измерить напряжение с нужной точностью. Связь — в разрядности: n бит дают 2ⁿ уровней и шаг квантования.',
  mount(host, st) {
    let bits = [0, 1, 0, 1, 1, 0, 0, 1];
    let U = 7.4;
    const W8 = [128, 64, 32, 16, 8, 4, 2, 1];
    function render() {
      const dec = bits.reduce((s, b, i) => s + b * W8[i], 0);
      const step = 10 / 256;
      const code = Math.min(255, Math.round(U / step));
      const back = code * step;
      const err = Math.abs(U - back);
      host.innerHTML = `
      <div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(260px,1fr);gap:16px">
        <div>
          <div style="font-size:14px;color:var(--muted);margin-bottom:8px">8-битный регистр: нажимайте на разряды</div>
          <div style="display:flex;gap:7px;flex-wrap:wrap">
            ${bits.map((b, i) => `<button class="sbtn ${b ? 'pri' : ''}" data-bit="${i}" style="min-width:52px;font-family:ui-monospace,monospace">
              <div style="font-size:11px;opacity:.75">${W8[i]}</div><div style="font-size:19px">${b}</div></button>`).join('')}
          </div>
          <div class="readout" style="margin-top:12px">
            <div class="kv"><span>Двоичное число</span><b>${bits.join('')}</b></div>
            <div class="kv"><span>В десятичной системе</span><b>${dec}</b></div>
            <div class="kv"><span>Число возможных комбинаций</span><b>2⁸ = 256</b></div>
            <div class="kv"><span>Если это «цена деления» при 10 В</span><b>10/256 = ${step.toFixed(4)} В</b></div>
          </div>
          <div class="note">Один бит — это 2 уровня («да/нет», «есть ток / нет тока»). N бит дают 2<sup>N</sup> уровней. Восемь бит — это диапазон 0…255, как у яркости канала цвета в графическом редакторе.</div>
        </div>
        <div>
          <div style="font-size:14px;color:var(--muted);margin-bottom:8px">Аналого-цифровой преобразователь (АЦП): измеряем напряжение</div>
          <div class="ctrl"><label><span>Напряжение на датчике</span><b id="ub">${U.toFixed(2)} В</b></label>
            <input type="range" min="0" max="10" step="0.01" value="${U}" id="usl"></div>
          <div class="readout">
            <div class="kv"><span>Ближайший код (8 бит)</span><b>${code} → ${code.toString(2).padStart(8, '0')}</b></div>
            <div class="kv"><span>Компьютер «увидит»</span><b>${back.toFixed(3)} В</b></div>
            <div class="kv"><span>Ошибка измерения</span><b>±${err.toFixed(3)} В (${(err / 10 * 100).toFixed(2)} %)</b></div>
            <div class="kv"><span>Погрешность 12-битного АЦП</span><b>±${(10 / 4096 / 2).toFixed(4)} В</b></div>
            <div class="kv"><span>Погрешность 4-битного АЦП</span><b>±${(10 / 16 / 2).toFixed(3)} В</b></div>
          </div>
          <div class="note">Чем больше разрядов, тем точнее измерение — но тем больше данных. Так связываются <b>информатика</b> (разрядность, кодирование) и <b>физика</b> (точность прибора, погрешность измерения).</div>
        </div>
      </div>`;
      host.querySelectorAll('button[data-bit]').forEach(b => b.addEventListener('click', () => { const i = +b.dataset.bit; bits[i] = bits[i] ? 0 : 1; render(); }));
      host.querySelector('#usl').addEventListener('input', e => { U = +e.target.value; render(); });
    }
    render();
  }
});

/* ---------- 22. Хронология физики и техники (история + культура) ---------- */
defSim('timeline', {
  title: '📜 Хронология: физика меняет мир',
  aspect: .5,
  kind: 'html',
  theoryNote: 'История физики показывает, что наука — часть культуры: открытие становится технологией, технология меняет общество, а новое общество ставит науке новые задачи.',
  mount(host) {
    const events = [
      { y: '≈ 250 до н.э.', t: 'Архимед: рычаг и закон плавания', d: 'Сформулировано правило рычага и закон Архимеда. Впервые математика, физика и техника соединились в инженерных машинах: военные метательные машины, подъёмные краны.', tags: ['Техника', 'Математика'], effect: 'Машины античности, корабли, водоподъёмные устройства.' },
      { y: '1609', t: 'Галилей: телескоп и падение тел', d: 'Галилей доказал, что тяжёлые и лёгкие тела падают одинаково, и впервые использовал наблюдения в телескоп для астрономии.', tags: ['Астрономия', 'Математика'], effect: 'Начало экспериментальной физики и гелиоцентрической картины мира.' },
      { y: '1687', t: 'Ньютон: закон всемирного тяготения', d: 'Одна формула объяснила и падение яблока, и движение Луны. Физика стала точной наукой, описывающей и земные, и небесные явления.', tags: ['Астрономия', 'Математика'], effect: 'Предсказание положения планет, морская навигация.' },
      { y: '1783', t: 'Братья Монгольфье: полёт теплового аэростата', d: 'Знание о том, что тёплый воздух легче, превратилось в первый полёт человека.', tags: ['География', 'Химия'], effect: 'Воздухоплавание, метеорология, наблюдения с высоты.' },
      { y: '1831', t: 'Фарадей: электромагнитная индукция', d: 'Открытие связи магнетизма и электричества — начало всей электротехники.', tags: ['Техника', 'Химия'], effect: 'Генераторы, трансформаторы, электролиз, гальваника.' },
      { y: '1869', t: 'Менделеев: периодическая система', d: 'Химический опыт и идеи строения атома объединились в систему, которая предсказала новые элементы.', tags: ['Химия', 'Естествознание'], effect: 'Химическая промышленность, материаловедение, удобрения.' },
      { y: '1905', t: 'Эйнштейн: теория относительности', d: 'Новое понимание пространства и времени. Потребовала уточнения физика GPS-спутников и космических полётов.', tags: ['Философия', 'Астрономия'], effect: 'Точная навигация, астрофизика, ядерная энергетика.' },
      { y: '1913', t: 'Бор: модель атома', d: 'Соединение физики атома и химии: стало ясно, почему элементы так реагируют.', tags: ['Химия', 'Философия'], effect: 'Спектральный анализ, окна и лампы, лазеры в перспективе.' },
      { y: '1957–1961', t: 'Спутник и полёт Гагарина', d: 'Законы движения, ракетная техника и материалы: физика стала космической практикой.', tags: ['Техника', 'Астрономия', 'История'], effect: 'Связь, телевидение, спутниковая навигация и прогноз погоды.' },
      { y: '1960-е', t: 'Лазеры и полупроводники', d: 'Квантовая физика превратилась в лазер и транзистор, а информатика — в массовый продукт.', tags: ['Информатика', 'Техника'], effect: 'Компьютеры, интернет, CD/DVD, оптоволокно, медицина.' },
      { y: '2000-е — наши дни', t: 'Зелёная энергетика и нанотехнологии', d: 'Солнечные панели, ветрогенераторы, аккумуляторы и «умные» сети — ответ физики на экологические вызовы.', tags: ['Экология', 'Техника'], effect: 'Снижение выбросов CO₂, новые материалы, энергосбережение.' }
    ];
    host.innerHTML = `
      <div style="display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:16px" class="tlgrid">
        <div>
          <div style="font-size:14px;color:var(--muted);margin-bottom:8px">Нажимайте на события</div>
          <div style="position:relative;padding-left:18px">
            <div style="position:absolute;left:6px;top:6px;bottom:6px;width:2px;background:linear-gradient(#4cc9f0,#8affe0,#ffd166)"></div>
            ${events.map((e, i) => `<div class="tlev" data-i="${i}" style="position:relative;margin-bottom:7px;cursor:pointer">
              <div style="position:absolute;left:-16px;top:9px;width:10px;height:10px;border-radius:50%;background:#4cc9f0;box-shadow:#0d1626 0 0 0 3px"></div>
              <div class="sbtn" style="width:100%;text-align:left;padding:8px 12px">
                <b style="font-family:monospace;color:#1d4ed8">${e.y}</b> — ${e.t}</div></div>`).join('')}
          </div>
        </div>
        <div id="tldetail"></div>
      </div>`;
    const det = host.querySelector('#tldetail');
    function show(i) {
      const e = events[i];
      det.innerHTML = `
        <div class="readout">
          <div style="font-family:monospace;color:#1d4ed8;font-weight:700;font-size:15px">${e.y}</div>
          <div style="font-size:17px;font-weight:700;margin:6px 0 10px">${e.t}</div>
          <p style="font-size:14.6px;line-height:1.55;color:#3c4a63">${e.d}</p>
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin:10px 0">${e.tags.map(t => `<span class="pill accent">${t}</span>`).join('')}</div>
          <div class="note"><b>Что это дало:</b> ${e.effect}</div>
          <div class="note" style="background:#fff7ed;border-color:#fde3c4">💭 <b>Вопрос для обсуждения:</b> какой предмет из школьной программы «работал» на это открытие? Как изменилась жизнь людей?</div>
        </div>`;
      host.querySelectorAll('.tlev').forEach(d => d.style.opacity = .55);
      host.querySelector('.tlev[data-i="' + i + '"]').style.opacity = 1;
    }
    host.querySelectorAll('.tlev').forEach(d => d.addEventListener('click', () => show(+d.dataset.i)));
    show(0);
  }
});

/* ---------- 23. Физика в литературном тексте (литература + филология) ---------- */
defSim('text', {
  title: '📖 Физика в художественном тексте',
  aspect: .5,
  kind: 'html',
  theoryNote: 'Литература описывает явления словами, а физика объясняет их законами. Отрывок становится задачей: нужно найти явление, назвать закон и посчитать.',
  mount(host, st, api) {
    const cards = [
      {
        tag: 'Качели и маятник', q: '«Качели взлетают всё выше — и вдруг замирают на миг, будто нехотя, и снова падают вниз…»',
        phys: 'Колебания: потенциальная и кинетическая энергия переходят друг в друга; в высшей точке скорость равна нулю. Период маятника T = 2π√(L/g) не зависит от массы.',
        ask: 'Почему на качелях «замирание» в верхней точке длится дольше, чем у самой нижней точки?',
        ans: 'В верхней точке скорость ≈ 0, поэтому тело проходит её медленно; в нижней точке скорость максимальна, и там «пролетают» быстро.'
      },
      {
        tag: 'Тепловые явления', q: '«Туман осел на стекле, и по нему поползли длинные прозрачные следы…»',
        phys: 'Конденсация: пар превращается в жидкость при охлаждении. При конденсации теплота выделяется (у воды 2260 кДж/кг).',
        ask: 'Почему в рассказе «туман осел», если пар обычно поднимается вверх?',
        ans: 'У стекла холоднее, воздух рядом охлаждается, пар конденсируется на поверхности — капли «оседают».'
      },
      {
        tag: 'Свет и тени', q: '«Полдень. Тени стали короткими и тёмными, как будто кто-то подтянул их к самым ногам…»',
        phys: 'Тень строится подобием треугольников; её длина L = h·x/(H−h). В полдень Солнце выше, поэтому тени короче.',
        ask: 'Оцените: во сколько раз укоротилась тень, если Солнце поднялось с 30° до 60°?',
        ans: 'Длина тени ≈ h/tan α, значит отношение tan30°/tan60° = 0,577/1,732 ≈ 0,33 — тень стала примерно в 3 раза короче.'
      },
      {
        tag: 'Давление и глубина', q: '«…на глубине вода сжала грудь так, что дышать стало трудно» (морские приключения).',
        phys: 'Гидростатическое давление p = ρgh растёт на 1 атм каждые ~10 м глубины. Давление действует и на лёгкие — нужен водолазный аппарат, где воздух подают под давлением.',
        ask: 'Какое давление испытывает ныряльщик на глубине 20 м?',
        ans: 'p = 1000·9,81·20 ≈ 196 000 Па ≈ 2 атм сверх атмосферного, то есть около 3 атм абсолютное.'
      },
      {
        tag: 'Звук и голос', q: '«…и голоса их растворились в тумане, хотя всё ещё слышались»',
        phys: 'Звук — волна, её скорость в воздухе 343 м/с; в тумане (более плотная влажная среда) скорость чуть выше, а слышимость зависит от температуры и ветра (рефракция звука).',
        ask: 'Почему в туманную ночь звук слышно дальше?',
        ans: 'Влажный воздух и слои разной температуры искривляют путь луча звука; он «прижимается» к земле и уходит дальше от источника.'
      }
    ];
    host.innerHTML = `
      <div class="flashcards">
        ${cards.map((c, i) => `<div class="fc" data-i="${i}">
          <div style="font-size:10.5px;color:#1d4ed8;font-weight:700;text-transform:uppercase;letter-spacing:.05em">${c.tag}</div>
          <div class="qtext">${c.q}</div>
          <div class="ans"><b>Физика:</b> ${c.phys}<br><br><b>Вопрос:</b> ${c.ask}<br><b>Ответ:</b> ${c.ans}</div>
          <div class="tagm">нажмите, чтобы открыть разбор ▾</div>
        </div>`).join('')}
      </div>
      <div style="margin-top:16px" class="readout">
        <h3 style="font-size:16px;margin-bottom:8px">Мини-расчёт: сколько секунд на одних качелях?</h3>
        <div class="ctrl"><label><span>Длина подвеса L</span><b id="Lb">3,0 м</b></label>
          <input type="range" min="0.5" max="6" step="0.1" value="3" id="Lsl"></div>
        <div class="kv"><span>Период одного полного колебания T = 2π√(L/g)</span><b id="Tb">3,47 с</b></div>
        <div class="kv"><span>Частота</span><b id="Fb">0,29 Гц</b></div>
        <div class="kv"><span>Сколько колебаний за 1 минуту</span><b id="Nb">17</b></div>
        <div class="note">Одна и та же формула — для маятника часов, для качелей и для сердечных сокращений (модель). Физика даёт закон, математика — вычисление, литература — образ, который делает закон живым.</div>
      </div>`;
    host.querySelectorAll('.fc').forEach(c => c.addEventListener('click', () => c.classList.toggle('open')));
    const sl = host.querySelector('#Lsl');
    sl.addEventListener('input', () => {
      const L = +sl.value, T = TAU * Math.sqrt(L / 9.81);
      host.querySelector('#Lb').textContent = fmt(L, 1) + ' м';
      host.querySelector('#Tb').textContent = fmt(T, 2) + ' с';
      host.querySelector('#Fb').textContent = fmt(1 / T, 2) + ' Гц';
      host.querySelector('#Nb').textContent = Math.round(60 / T);
    });
  }
});



/* ---------- ОПЫТ: бинокулярное зрение (биология + психология + геометрия) ---------- */
defSim('binocular', {
  title: '👀 Опыт: бинокулярное зрение и объём',
  aspect: .6,
  theoryNote: 'Физика и математика дают геометрию: два глаза — это базис <b>b ≈ 6,5 см</b>, а угол конвергенции считается как <b>γ = 2·arctg(b / 2D)</b>. Биология объясняет, зачем два глаза (мозг сравнивает две картинки и строит глубину), психология — что такое диспаратность и порог различения, а астрономия пользуется тем же приёмом: годичный параллакс — это «бинокулярное зрение» размером с орбиту Земли.',
  hint: 'Опыт 1: попробуйте попасть пальцем в кончик носа с закрытым глазом — точность падает. Опыт 2: смотрите на две картинки «крест-накрест» — ближний квадрат «выйдет» из экрана. Опыт 3: нажмите «Пуск» и следите, как растёт угол конвергенции при приближении предмета.',
  params: [
    { key: 'D', label: 'Расстояние до предмета D', min: .25, max: 6, step: .05, val: 1, unit: 'м', dec: 2 },
    { key: 'b', label: 'База между зрачками b', min: .04, max: .085, step: .005, val: .065, unit: 'м (6,5 см)', dec: 3 }
  ],
  selects: [
    { key: 'mode', label: 'Что показываем', val: 'both', options: [
      { v: 'both', label: 'Схема сверху + что видит каждый глаз' },
      { v: 'top', label: 'Только схема сверху (конвергенция)' },
      { v: 'pair', label: 'Только стереопара (опыт с глубиной)' }
    ] },
    { key: 'how', label: 'Как смотреть стереопару', val: 'cross', options: [
      { v: 'cross', label: 'Крест-накрест: левым глазом — на правую картинку' },
      { v: 'parallel', label: 'Параллельно: левым глазом — на левую' },
      { v: 'anaglyph', label: 'Красно-синие очки' }
    ] }
  ],
  actions: [
    { label: '📏 Опыт 1: палец к носу', run: (st, a) => { st.p.D = .25; a.sync(); a.notify('Опыт 1. Приблизьте палец к носу. Посмотрите на него одним глазом, потом двумя: с одним глазом «попасть» в кончик носа заметно труднее — мозг лишился второй картинки.'); } },
    { label: '🧪 Опыт 2: карандаши', run: (st, a) => { st.p.D = 1; a.sync(); a.notify('Опыт 2. Два карандаша: сведите их кончики. Одним глазом промахи заметно больше — так проверяют вклад бинокулярного зрения.'); } },
    { label: '🖼 Опыт 3: стереопара', run: (st, a) => { st.p.mode = 'pair'; a.sync(); a.notify('Опыт 3. Смотрите на две картинки так, чтобы они слились в одну: ближний квадрат «выйдет» из экрана, дальний уйдёт вглубь. Разница между картинками — это диспаратность, её и переводит мозг в глубину.'); }, primary: true },
    { label: '🔭 Так измеряют звёзды', run: (st, a) => { st.p.mode = 'top'; st.p.b = .065; st.p.D = 6; a.sync(); a.notify('Тот же треугольник, но базис — диаметр орбиты Земли (300 млн км): так измеряют расстояния до звёзд методом параллакса.'); } }
  ],
  init: () => ({ ph: 0 }),
  step(st, dt) { st.ph += dt; },
  draw(g, st, W, H) {
    const p = st.p;
    const D = Math.max(.05, p.D), b = p.b;
    const gamma = 2 * Math.atan(b / (2 * D));                  /* угол конвергенции, рад */
    const gamDeg = gamma * 180 / Math.PI;
    const dispMin = (b / D) * 3437.75;                          /* диспаратность в угловых минутах */
    const delta = 20 / 206265;                                  /* стереопорог 20 угловых секунд */
    const dD = D * D * delta / b;                               /* минимальный различимый перепад глубины, м */
    const work = (b / delta);                                   /* предел стереоскопии, м */

    G.bg(g, W, H);
    const mode = p.mode || 'both';
    const showTop = mode !== 'pair', showPair = mode !== 'top';

    /* ---------- А. схема сверху: конвергенция ---------- */
    const topH = showPair ? H * .46 : H * .88;
    const tw = W * (showTop && showPair ? .54 : .96), tx = 16, ty = 14;
    if (showTop) {
      G.panel(g, tx, ty, tw, topH, { fill: 'rgba(120,200,255,.06)' });
      G.txt(g, 'Вид сверху: два глаза и предмет', tx + 12, ty + 20, { size: 12, col: '#cfe2ff', weight: 600 });
      const eyeY = ty + topH - 34, cxL = tx + tw * .5 - b * tw * 5, cxR = tx + tw * .5 + b * tw * 5;
      const ox = tx + tw * .5, oy = ty + 46;
      /* лучи от глаз к предмету */
      G.line(g, cxL, eyeY, ox, oy, 'rgba(255,209,102,.85)', 1.8);
      G.line(g, cxR, eyeY, ox, oy, 'rgba(255,209,102,.85)', 1.8);
      /* базис */
      G.line(g, cxL, eyeY + 16, cxR, eyeY + 16, '#4cc9f0', 1.6);
      G.txt(g, 'b = ' + fmt(b * 100, 1) + ' см', (cxL + cxR) / 2, eyeY + 32, { align: 'center', size: 11.5, col: '#4cc9f0' });
      /* расстояние */
      G.line(g, ox, oy, ox, eyeY, 'rgba(120,255,190,.45)', 1.2, [5, 5]);
      G.txt(g, 'D = ' + (D < 1 ? fmt(D * 100, 0) + ' см' : fmt(D, 2) + ' м'), ox + 8, (oy + eyeY) / 2, { size: 11.5, col: '#7effbe' });
      /* глаза */
      G.dot(g, cxL, eyeY, 9, '#dbe9ff', '#4cc9f0'); G.dot(g, cxR, eyeY, 9, '#dbe9ff', '#4cc9f0');
      G.dot(g, cxL + 2, eyeY, 3.4, '#123'); G.dot(g, cxR - 2, eyeY, 3.4, '#123');
      G.txt(g, 'левый', cxL, eyeY + 32, { align: 'center', size: 10.5, col: '#8fb6ea' });
      G.txt(g, 'правый', cxR, eyeY + 32, { align: 'center', size: 10.5, col: '#8fb6ea' });
      /* предмет */
      G.dot(g, ox, oy, 7, '#ffd166');
      G.txt(g, 'предмет', ox, oy - 12, { align: 'center', size: 11, col: '#ffd166' });
      /* угол конвергенции */
      const arcR = Math.min(70, Math.max(24, tw * .16));
      g.save(); g.strokeStyle = 'rgba(126,255,190,.9)'; g.lineWidth = 2;
      g.beginPath(); g.arc(ox, oy, arcR, Math.PI / 2 - gamma / 2, Math.PI / 2 + gamma / 2); g.stroke(); g.restore();
      G.txt(g, 'γ = ' + fmt(gamDeg, 1) + '°', ox + arcR + 6, oy + 16, { size: 12.5, col: '#7effbe', weight: 600 });
      G.txt(g, 'чем ближе предмет, тем больше угол', tx + 12, ty + topH - 8, { size: 10.5, col: '#8fb6ea' });
    }

    /* ---------- Б. стереопара: что видит каждый глаз ---------- */
    if (showPair) {
      const pw = (W - 44) * .5, ph = showTop ? H - topH - 30 : H * .86, py = showTop ? topH + 26 : 14;
      const nearShift = Math.max(0, Math.min(26, (b / D) * 190));      /* «сырая» диспаратность для картинки */
      const farShift = nearShift * .25;
      const how = p.how || 'cross';
      const shots = [{ x: 16, s: -1 }, { x: 28 + pw, s: 1 }];
      shots.forEach((sh, k) => {
        G.panel(g, sh.x, py, pw, ph, { fill: 'rgba(255,255,255,.05)' });
        G.txt(g, k === 0 ? 'что видит левый глаз' : 'что видит правый глаз', sh.x + 12, py + 19, { size: 12, col: '#cfe2ff', weight: 600 });
        /* «сетчатка»: ближний и дальний объект */
        const rx = sh.x + 14, ry = py + 34, rw = pw - 28, rh = ph - 62;
        G.panel(g, rx, ry, rw, rh, { fill: 'rgba(10,20,36,.6)', stroke: 'rgba(160,200,255,.18)', r: 8 });
        const cx = rx + rw * .5, cy = ry + rh * .58;
        /* дальний квадрат — почти на одном месте в обоих кадрах */
        const fw2 = Math.min(rw, rh) * .26, os = how === 'anaglyph' ? 1 : sh.s;
        const farX = cx + os * farShift * .4, nearX = cx + os * nearShift;
        if (how === 'anaglyph') {
          g.save(); g.globalAlpha = .85;
          g.fillStyle = '#ff5a5a'; g.fillRect(farX - fw2 / 2, cy + rh * .16 - fw2 / 2, fw2, fw2); g.restore();
          g.save(); g.globalAlpha = .85;
          g.fillStyle = '#2ee6ff'; g.fillRect(farX - fw2 / 2 + 7, cy + rh * .16 - fw2 / 2, fw2, fw2); g.restore();
          G.txt(g, 'красный и голубой сдвинуты — в очках виден объём', rx + rw * .5, ry + rh - 8, { align: 'center', size: 10, col: '#9fb8dd' });
        } else {
          g.save(); g.fillStyle = '#7cc4ff'; g.globalAlpha = .55;
          g.fillRect(farX - fw2 / 2, cy + rh * .16 - fw2 / 2, fw2, fw2); g.restore();
          G.txt(g, 'дальний', farX, cy + rh * .16 - fw2 / 2 - 5, { align: 'center', size: 10, col: '#8fb6ea' });
        }
        const nw = fw2 * 1.25;
        g.save(); g.fillStyle = how === 'anaglyph' ? '#ffd166' : '#ffd166'; g.globalAlpha = .95;
        g.fillRect(nearX - nw / 2, cy - nw / 2, nw, nw); g.restore();
        G.txt(g, 'ближний', nearX, cy - nw / 2 - 6, { align: 'center', size: 10.5, col: '#ffd166' });
        G.line(g, cx, cy + rh * .42, nearX, cy - nw / 2 + 4, 'rgba(255,209,102,.5)', 1, [4, 4]);
      });
      const tip = how === 'anaglyph'
        ? 'Наденьте красно-синие очки: сдвиг между красным и голубым мозг превратит в объём.'
        : (how === 'parallel'
          ? 'Смотрите «сквозь» экран, пока две картинки не сольются: ближний квадрат покажется ближе.'
          : 'Смотрите крест-накрест (левый глаз — на правую картинку): ближний квадрат «выйдет» из экрана.');
      gTxtWrap(g, tip, W / 2, H - 6, { align: 'center', size: 11, col: '#9fb8dd' }, W - 24);
    }

    /* ---------- В. шкала диспаратности ---------- */
    if (showTop && showPair) { /* подсказка в схеме сверху */ }
  },
  readout(st) {
    const p = st.p, D = Math.max(.05, p.D), b = p.b;
    const gamma = 2 * Math.atan(b / (2 * D));
    const gamDeg = gamma * 180 / Math.PI, gamMin = gamma * 3437.75;
    const delta = 20 / 206265;
    const dD = D * D * delta / b;
    const limit = b / delta;
    const near = D <= 1.5;
    return `<div class="kv long"><span>Угол конвергенции (сведения глаз) γ = 2·arctg(b / 2D)</span><b>${fmt(gamDeg, 2)}° = ${fmt(gamMin, 0)} угловых минут</b></div>
      <div class="kv"><span>С какой картинкой сравнивает мозг (диспаратность)</span><b>${fmt((b / D) * 3437.75, 0)} угл. мин</b></div>
      <div class="kv long"><span>Различимый перепад глубины ΔD = D²·δ / b при стереопороге δ = 20″</span><b>${dD < .01 ? fmt(dD * 1000, 1) + ' мм' : fmt(dD * 100, 1) + ' см'}</b></div>
      <div class="kv"><span>Предел стереоскопического зрения при базе ${fmt(b * 100, 1)} см</span><b>≈ ${fmt(limit / 1000, 1)} км</b></div>
      <div class="kv"><span>Есть ли объём на этом расстоянии</span><b>${near ? 'да — стерео работает отлично' : (D < 10 ? 'да, но точность падает как D²' : 'нет — работают другие признаки глубины')}</b></div>
      <div class="kv"><span>Что произойдёт с одним закрытым глазом</span><b>точность хуже: остаются только монокулярные признаки</b></div>
      <div class="note">Откройте опыт: <b>«Опыт 1: палец к носу»</b> — проверка роли двух глаз; <b>«Опыт 2: карандаши»</b> — как промахиваются одним глазом; <b>«Опыт 3: стереопара»</b> — где диспаратность превращается в глубину.
        Сравните с симулятором <b>«Параллакс»</b> в астрономии: там базис — орбита Земли, а формула та же.</div>`;
  }
});

/* ==== sims4.js ==== */
/* ================= СИМУЛЯТОРЫ: ТЕПЛОТА (8 кл.), БИОЛОГИЯ, ГЕОГРАФИЯ, ТЕХНИКА, ЭКОЛОГИЯ, МАТЕМАТИКА, АСТРОНОМИЯ =================
   Добавлены по программе учебников Н.А. Закировой:
   8 кл. § 7–8 (Q = c·m·Δt, Q = q·m), 8 кл. § 5 (теплопередача в организме),
   7 кл. § 5 (точность измерений, стандартный вид числа), 7 кл. § 5–8 (масштаб — география),
   9 кл. § 30 (звук, эхо), 9 кл. § 12 (параллакс), 9 кл. § 43 (экологическая культура, шум),
   8 кл. § 29–30 (сопротивление, нагрев), 7 кл. § 33–36 (простые механизмы → конструкции). */

/* Перенос текста по ширине (для подписей внутри canvas) */
/* перенос длинной подписи с сохранением оформления G.txt */
function gTxtWrap(g, text, x, y, o, maxW) {
  o = o || {};
  const size = o.size || 13;
  const tr = (g.getTransform ? g.getTransform() : null) || { a: 1 };
  const k = tr.a || 1;
  const W = ((g.canvas && g.canvas.width ? g.canvas.width / k : 1e6));
  const lim = Math.min(maxW || (W - 20), W - 16);
  const al = o.align || 'left';
  let ax = x;
  if (al === 'center' || al === 'right' || al === 'end') ax = x; else ax = Math.max(x, 8);
  return wrapText(g, text, ax, y, lim, size, o.col || '#8fb6ea', al);
}

function wrapText(g, text, x, y, maxW, size, col, align) {
  const str = String(text);
  const tr = (g.getTransform ? g.getTransform() : null) || { a: 1 };
  const k = tr.a || 1;
  const W = (g.canvas && g.canvas.width ? g.canvas.width / k : 1e6);
  const H = (g.canvas && g.canvas.height ? g.canvas.height / k : 1e6);
  const pad = 8;
  /* рабочая ширина: не шире запрошенной и никогда не шире кадра */
  let limit = Math.min(maxW || (W - 2 * pad), W - 2 * pad);
  if (!(limit > 40)) limit = Math.max(60, W - 2 * pad);
  const meas = t => { try {
      g.save(); g.font = `500 ${size}px system-ui,-apple-system,Segoe UI,Roboto,sans-serif`;
      const w = g.measureText(t).width; g.restore(); return w;
    } catch (e) { return t.length * size * .58; } };
  /* перенос по словам */
  const lines = [];
  let line = '';
  str.split(' ').forEach(wd => {
    const probe = line ? line + ' ' + wd : wd;
    if (meas(probe) > limit && line) { lines.push(line); line = wd; } else line = probe;
  });
  if (line) lines.push(line);
  /* если слово само шире строки — дробим по символам */
  const fixed = [];
  lines.forEach(l => {
    let cur = l;
    let guard = 0;
    while (meas(cur) > limit && cur.length > 1 && guard++ < 60) {
      let cut = cur.length;
      while (cut > 1 && meas(cur.slice(0, cut)) > limit) cut--;
      fixed.push(cur.slice(0, cut));
      cur = cur.slice(cut);
    }
    if (cur) fixed.push(cur);
  });
  /* блок не должен вылезать за нижний край кадра */
  const lineH = size + 4;
  let y0 = y;
  const bottom = y0 + (fixed.length - 1) * lineH;
  if (bottom > H - 3) y0 = Math.max(size + 2, H - 3 - (fixed.length - 1) * lineH);
  fixed.forEach((l, i) => G.txt(g, l, x, y0 + i * lineH, { size: size, col: col, align: align || 'center' }));
  return fixed.length;
}

/* ============================ 1. КОЛИЧЕСТВО ТЕПЛОТЫ (8 класс, § 7–8) ============================ */
const C_WATER = 4200, T_BOIL = 100, HEAT_ACC = 20;
const FUELS = {
  gas: { q: 4.4e7, name: 'Природный газ', gen: 'природного газа' },
  wood: { q: 1.0e7, name: 'Сухие дрова', gen: 'сухих дров' },
  coal: { q: 2.7e7, name: 'Каменный уголь', gen: 'каменного угля' },
  petrol: { q: 4.6e7, name: 'Бензин', gen: 'бензина' }
};
defSim('heating', {
  title: '🔥 Сколько теплоты нужно, чтобы вскипятить воду',
  aspect: .58,
  theoryNote: 'Физика даёт формулу <b>Q = c·m·Δt</b> (§ 7, 8 класс), математика — прямую пропорциональность и график, технология — расчёт мощности и расхода энергии, география — откуда берётся топливо. Одна формула «работает» и на кухне, и на ТЭЦ.',
  hint: 'График T(t) — прямая линия: температура растёт пропорционально времени. Увеличьте массу воды вдвое — время нагрева вырастет тоже вдвое, а увеличив мощность вдвое — сократится вдвое.',
  params: [
    { key: 'm', label: 'Масса воды', min: .1, max: 5, step: .1, val: 1.5, unit: 'кг', dec: 1 },
    { key: 'P', label: 'Мощность нагревателя', min: 200, max: 3000, step: 50, val: 1500, unit: 'Вт', dec: 0 },
    { key: 'T0', label: 'Начальная температура воды', min: 0, max: 40, step: 1, val: 20, unit: '°C', dec: 0 }
  ],
  selects: [{
    key: 'fuel', label: 'Топливо для сравнения (8 класс, § 8)', val: 'gas',
    options: [
      { v: 'gas', label: 'Природный газ — q = 4,4·10⁷ Дж/кг' },
      { v: 'wood', label: 'Сухие дрова — q = 1,0·10⁷ Дж/кг' },
      { v: 'coal', label: 'Каменный уголь — q = 2,7·10⁷ Дж/кг' },
      { v: 'petrol', label: 'Бензин — q = 4,6·10⁷ Дж/кг' }
    ]
  }],
  init: () => ({ T: 20, tau: 0, trace: [], bub: [], boiled: false }),
  onChange(st, k) { if (k === 'm' || k === 'P' || k === 'T0') { st.T = st.p.T0; st.tau = 0; st.trace = []; st.boiled = false; } },
  step(st, dt) {
    const p = st.p, dts = dt * HEAT_ACC;
    const need = C_WATER * p.m * (T_BOIL - p.T0) / p.P;
    if (st.tau < need) {
      st.tau = Math.min(need, st.tau + dts);
      st.T = p.T0 + p.P * st.tau / (C_WATER * p.m);
    } else { st.boiled = true; st.T = T_BOIL; }
    if (!st.trace.length || st.tau - st.trace[st.trace.length - 1].t > need / 220) st.trace.push({ t: st.tau, T: st.T });
    if (st.trace.length > 400) st.trace.shift();
    // пузырьки пара
    if (st.T > 55 && Math.random() < (st.T - 55) / 300) st.bub.push({ u: .1 + Math.random() * .8, r: 2 + Math.random() * 3, v: .3 + Math.random() * .8 });
    st.bub.forEach(b => { b.u -= dt * b.v * (st.boiled ? .35 : .22); });
    st.bub = st.bub.filter(b => b.u > 0).slice(-40);
  },
  draw(g, st, W, H) {
    const p = st.p, need = C_WATER * p.m * (T_BOIL - p.T0) / p.P;
    G.bg(g, W, H);
    /* --- левая половина: плита и кастрюля --- */
    const cx = W * .21, potW = Math.min(150, W * .2), potB = H * .70, potH = H * .30;
    G.panel(g, cx - potW * .75, potB + 6, potW * 1.5, H * .10, { fill: 'rgba(255,255,255,.05)' });
    // спираль плиты
    const glow = p.P / 3000;
    G.bar(g, cx - potW * .55, potB + 14, potW * 1.1, 10, `rgba(255,${Math.round(120 + 90 * (1 - glow))},80,${.35 + .6 * glow})`);
    for (let i = 0; i < 3; i++) {
      g.save(); g.beginPath(); g.strokeStyle = `rgba(255,${Math.round(90 + 120 * (1 - glow))},60,${.5 + .5 * glow})`; g.lineWidth = 3;
      g.arc(cx - potW * .28 + i * potW * .28, potB + 19, 7, 0, TAU); g.stroke(); g.restore();
    }
    // кастрюля
    g.save();
    g.fillStyle = 'rgba(190,215,255,.14)'; g.strokeStyle = 'rgba(200,225,255,.55)'; g.lineWidth = 2;
    g.beginPath();
    g.moveTo(cx - potW / 2, potB - potH); g.lineTo(cx + potW / 2, potB - potH);
    g.lineTo(cx + potW * .42, potB); g.lineTo(cx - potW * .42, potB); g.closePath();
    g.fill(); g.stroke();
    g.restore();
    // вода
    const wl = (potB) - (potB - potH + 16) * (st.T / 100);
    g.save(); g.fillStyle = 'rgba(90,180,255,.30)';
    g.beginPath(); g.moveTo(cx - potW * .47, potB - 2); g.lineTo(cx + potW * .47, potB - 2);
    g.lineTo(cx + potW * .44, wl); g.lineTo(cx - potW * .44, wl); g.closePath(); g.fill(); g.restore();
    st.bub.forEach(b => G.dot(g, cx - potW * .40 + b.u * potW * .8, potB - 6 - (1 - b.u) * 10, b.r, 'rgba(220,245,255,.55)'));
    G.txt(g, fmt(st.T, 0) + ' °C', cx, potB - potH - 14, { align: 'center', size: 16, weight: 700, col: st.boiled ? '#ffd166' : '#9fe0ff' });
    G.txt(g, fmt(p.m, 1) + ' кг воды', cx, potB + H * .12, { align: 'center', size: 12.5, col: '#cfe2ff' });
    G.txt(g, fmt(p.P, 0) + ' Вт', cx, potB + H * .12 + 17, { align: 'center', size: 12, col: '#9fb8dd' });
    if (st.boiled) for (let i = 0; i < 3; i++) {
      g.save(); g.strokeStyle = 'rgba(200,230,255,.45)'; g.lineWidth = 2; g.beginPath();
      const px = cx - 14 + i * 14, ph = (st.t * 40 + i * 25) % 40;
      g.moveTo(px, potB - potH - 6 - ph); g.quadraticCurveTo(px + 6, potB - potH - 16 - ph, px, potB - potH - 26 - ph); g.stroke(); g.restore();
    }
    /* --- правая половина: график T(t) --- */
    const gx = W * .44, gy = H * .12, gw = W * .52, gh = H * .76;
    const tmax = Math.max(30, need * 1.25);
    G.panel(g, gx - 34, gy - 18, gw + 46, gh + 52, { fill: 'rgba(255,255,255,.04)' });
    G.line(g, gx, gy, gx, gy + gh, 'rgba(160,200,255,.5)', 1.6);
    G.line(g, gx, gy + gh, gx + gw, gy + gh, 'rgba(160,200,255,.5)', 1.6);
    G.txt(g, 'T, °C', gx - 24, gy - 6, { size: 10.5, col: '#7ea4d8' });
    for (let v = 0; v <= 100; v += 20) {
      const y = gy + gh - (v / 110) * gh;
      G.line(g, gx - 5, y, gx + gw, y, 'rgba(150,190,240,.13)', 1);
      G.txt(g, v + ' °C', gx - 9, y + 4, { align: 'right', size: 10.5, col: '#7ea4d8' });
    }
    for (let i = 0; i <= 5; i++) { const t = tmax * i / 5, x = gx + (t / tmax) * gw; G.txt(g, fmt(t, 0) + ' с', x, gy + gh + 16, { align: 'center', size: 10.5, col: '#7ea4d8' }); }
    G.line(g, gx, gy + gh - (100 / 110) * gh, gx + gw, gy + gh - (100 / 110) * gh, 'rgba(255,209,102,.45)', 1.4, [5, 5]);
    G.txt(g, 'кипение 100 °C', gx + gw - 4, gy + gh - (100 / 110) * gh - 6, { align: 'right', size: 11, col: '#ffd166' });
    const X = t => gx + (Math.min(t, tmax) / tmax) * gw, Y = T => gy + gh - (Math.min(T, 110) / 110) * gh;
    G.line(g, X(0), Y(p.T0), X(need), Y(100), 'rgba(120,220,180,.85)', 2.4);
    G.line(g, X(need), Y(100), X(tmax), Y(100), 'rgba(120,220,180,.35)', 2, [4, 4]);
    g.save(); g.strokeStyle = 'rgba(120,220,180,.5)'; g.setLineDash([4, 4]);
    g.beginPath(); g.moveTo(X(need), Y(100)); g.lineTo(X(need), gy + gh); g.stroke(); g.restore();
    G.txt(g, 'τ = ' + fmt(need, 0) + ' с', X(need) + 7, gy + gh - 8, { size: 11.5, col: '#7ee0b4' });
    if (st.trace.length > 1) {
      g.save(); g.strokeStyle = 'rgba(255,120,60,.95)'; g.lineWidth = 2.6; g.beginPath();
      st.trace.forEach((q, i) => { const x = X(q.t), y = Y(q.T); i ? g.lineTo(x, y) : g.moveTo(x, y); });
      g.stroke(); g.restore();
    }
    G.dot(g, X(st.tau), Y(st.T), 5.5, '#ff7b3a', '#fff');
    G.txt(g, 'T = ' + fmt(st.T, 1) + ' °C', X(st.tau) + 12, Y(st.T) + 4, { size: 12, col: '#ffb08a', weight: 600 });
    G.txt(g, 'Температура растёт пропорционально времени — прямая', gx + gw / 2, gy + 12, { align: 'center', size: 11, col: '#8fb6ea' });
    G.txt(g, 'время ускорено в ' + HEAT_ACC + ' раз (модель)', cx, potB + H * .12 + 34, { align: 'center', size: 10.5, col: '#5f7ba3' });
  },
  readout(st) {
    const p = st.p, dT = T_BOIL - p.T0, Q = C_WATER * p.m * dT, tau = Q / p.P, tauReal = tau / .7;
    const fuel = FUELS[p.fuel] || FUELS.gas;
    return `<div class="kv"><span>Изменение температуры Δt</span><b>${fmt(dT, 0)} °C (от ${fmt(p.T0, 0)} до 100 °C)</b></div>
    <div class="kv"><span>Теплота Q = c·m·Δt</span><b>${fmt(Q / 1000, 0)} кДж = ${sci(Q, 2)} Дж</b></div>
    <div class="kv"><span>Время нагрева τ = Q/P (идеально)</span><b>${fmt(tau, 0)} с = ${fmt(tau / 60, 1)} мин</b></div>
    <div class="kv"><span>С учётом КПД плиты 70 %</span><b>${fmt(tauReal, 0)} с = ${fmt(tauReal / 60, 1)} мин</b></div>
    <div class="kv"><span>Электроэнергия: P·τ</span><b>${fmt(p.P * tauReal / 3.6e6, 3)} кВт·ч</b></div>
    <div class="kv"><span>Масса ${fuel.gen} для того же Q</span><b>${fmt(Q / fuel.q * 1000, 1)} г (q = ${sci(fuel.q, 1)} Дж/кг)</b></div>
    <div class="kv"><span>Сейчас</span><b>${fmt(st.T, 1)} °C, прошло ${fmt(st.tau, 0)} с${st.boiled ? ' — вода кипит, температура не растёт' : ''}</b></div>
    <div class="note">Пока вода кипит, температура не меняется, хотя теплота продолжает поступать: она расходуется на парообразование (8 класс, § 11). Удельная теплоёмкость воды <span class="f">c = 4200 Дж/(кг·°C)</span> — одна из самых больших, поэтому вода хорошо «держит» тепло: это важно и в технике, и в организме.</div>`;
  }
});

/* ============================ 2. ДЫХАНИЕ (8 класс, § 5–6, 9 класс, § 29) ============================ */
const ALT_OPTS = [
  { v: '0', label: 'Уровень моря (Павлодар, 0 м)' },
  { v: '1000', label: 'Плоскогорье (1000 м)' },
  { v: '2000', label: 'Алматы (≈2000 м)' },
  { v: '3000', label: 'Высокогорье (3000 м)' },
  { v: '4000', label: 'Перевал (4000 м)' }
];
const airPressure = h => 101.3 * Math.exp(-h / 8000);                 // кПа
const alvPO2 = h => Math.max(2, .209 * airPressure(h) - 6);           // кПа, упрощённо
const hbSat = po2 => { const n = 2.7, p50 = 3.55, a = Math.pow(po2, n); return a / (a + Math.pow(p50, n)); };
defSim('breath', {
  title: '🫁 Дыхание: парциальное давление и гемоглобин',
  aspect: .58,
  theoryNote: 'Химия даёт молекулы O₂ и диффузию, физика — парциальное давление и газовые законы, биология — газообмен и транспорт кислорода, география — почему в горах воздух «разрежен», а физкультура — почему тренировки увеличивают объём лёгких.',
  hint: 'Поднимитесь с уровня моря на 4000 м и следите за кривой насыщения гемоглобина: количество молекул O₂ во вдохе падает несильно, а насыщение крови — заметно.',
  params: [
    { key: 'Vt', label: 'Дыхательный объём (один вдох)', min: 300, max: 900, step: 10, val: 500, unit: 'мл', dec: 0 },
    { key: 'f', label: 'Частота дыхания', min: 8, max: 30, step: 1, val: 15, unit: 'вдох/мин', dec: 0 },
    { key: 'Hb', label: 'Гемоглобин крови', min: 100, max: 180, step: 1, val: 150, unit: 'г/л', dec: 0 }
  ],
  selects: [{ key: 'alt', label: 'Высота над уровнем моря', val: '0', options: ALT_OPTS }],
  init: () => ({ ph: 0, vox: [] }),
  step(st, dt) {
    st.ph += dt * (st.p.f / 60) * TAU;
    if (st.vox.length < 26) for (let i = 0; i < 26; i++) st.vox.push({ u: Math.random(), v: Math.random(), s: .4 + Math.random() * .8 });
    st.vox.forEach(o => { o.u += dt * .12 * o.s; o.v += dt * .10 * o.s; if (o.u > 1) { o.u = 0; o.v = Math.random(); } if (o.v > 1) o.v = 0; });
  },
  draw(g, st, W, H) {
    const p = st.p, h = parseFloat(p.alt), pres = airPressure(h), po2 = alvPO2(h), sat = hbSat(po2);
    const infl = (Math.sin(st.ph) + 1) / 2;
    G.bg(g, W, H);
    G.txt(g, 'Один вдох = ' + fmt(p.Vt, 0) + ' мл · ' + fmt(p.f, 0) + ' вдохов в минуту', 16, 20, { size: 12.5, col: '#cfe2ff', weight: 600 });
    /* --- лёгкие (левая колонка) --- */
    const cx = W * .17, cy = H * .28, rx = W * .072, ry = H * .15;
    G.line(g, cx, cy - ry * 1.5, cx, cy - ry * .35, 'rgba(160,220,255,.5)', 2);
    G.txt(g, 'трахея', cx + 7, cy - ry * 1.4, { size: 10, col: '#7ea4d8' });
    [-1, 1].forEach(sg => {
      const w = rx * (.62 + .38 * infl), hh = ry * (.62 + .38 * infl);
      g.save(); g.beginPath();
      g.ellipse(cx + sg * (rx * .95), cy, w, hh, sg * .12, 0, TAU);
      g.fillStyle = 'rgba(255,140,150,' + (.22 + .16 * infl) + ')'; g.fill();
      g.strokeStyle = 'rgba(255,170,180,.65)'; g.lineWidth = 2; g.stroke(); g.restore();
      for (let i = 0; i < 4; i++) {
        const a = -1.0 + i * .65;
        G.dot(g, cx + sg * (rx * .95) + Math.cos(a) * w * .45, cy + Math.sin(a) * hh * .5, 3.2, 'rgba(255,200,210,.4)');
      }
    });
    G.txt(g, infl > .5 ? 'вдох' : 'выдох', cx, cy + ry * 1.45, { align: 'center', size: 12.5, col: '#ffb3bd', weight: 700 });
    /* --- альвеола и капилляр (низ левой колонки) --- */
    const ax0 = 14, ay0 = H * .52, aw = W * .35, ah = H * .40;
    G.panel(g, ax0, ay0, aw, ah, { fill: 'rgba(120,200,255,.07)' });
    G.txt(g, 'Альвеола и капилляр', ax0 + 10, ay0 + 18, { size: 11, col: '#cfe2ff', weight: 600 });
    const acx = ax0 + aw * .28, acy = ay0 + ah * .45, ar = Math.min(26, ah * .2);
    g.save(); g.beginPath(); g.arc(acx, acy, ar, 0, TAU);
    g.fillStyle = 'rgba(160,220,255,.16)'; g.fill(); g.strokeStyle = 'rgba(160,220,255,.6)'; g.lineWidth = 1.6; g.stroke(); g.restore();
    G.txt(g, 'альвеола', acx, acy + 4, { align: 'center', size: 10, col: '#cfe2ff' });
    G.line(g, acx + ar + 4, acy, ax0 + aw - 14, acy, 'rgba(255,110,120,.55)', 9);
    G.txt(g, 'кровь', ax0 + aw - 16, acy - 10, { align: 'right', size: 9.5, col: '#ff9aa2' });
    st.vox.forEach(o => { const x = acx + ar + 6 + o.u * (aw * .55), y = acy + (o.v - .5) * 12; G.dot(g, x, y, 2.4, o.u < .3 ? '#7fe1ff' : '#ff9aa2'); });
    wrapText(g, 'O₂ идёт из воздуха в кровь по градиенту давления — это диффузия', ax0 + aw / 2, acy + ah * .22, aw - 22, 10.5, '#8fb6ea');
    /* --- кривая насыщения гемоглобина (правая колонка) --- */
    const gx = W * .52, gy = H * .16, gw = W * .43, gh = H * .60;
    G.panel(g, gx - 32, gy - 24, gw + 46, gh + 84, { fill: 'rgba(255,255,255,.04)' });
    G.txt(g, 'Кривая насыщения гемоглобина', gx - 4, gy - 8, { size: 11.5, col: '#cfe2ff', weight: 600 });
    G.line(g, gx, gy, gx, gy + gh, 'rgba(160,200,255,.5)', 1.6);
    G.line(g, gx, gy + gh, gx + gw, gy + gh, 'rgba(160,200,255,.5)', 1.6);
    const PX = v => gx + (v / 14) * gw, PY = s => gy + gh - s * gh;
    for (let v = 0; v <= 14; v += 2) { G.line(g, PX(v), gy, PX(v), gy + gh, 'rgba(150,190,240,.12)', 1); G.txt(g, v, PX(v), gy + gh + 15, { align: 'center', size: 10, col: '#7ea4d8' }); }
    for (let s2 = 0; s2 <= 1; s2 += .25) { G.line(g, gx, PY(s2), gx + gw, PY(s2), 'rgba(150,190,240,.12)', 1); G.txt(g, fmt(s2 * 100, 0) + ' %', gx - 7, PY(s2) + 4, { align: 'right', size: 10, col: '#7ea4d8' }); }
    g.save(); g.strokeStyle = 'rgba(255,120,140,.95)'; g.lineWidth = 2.8; g.beginPath();
    for (let v = 0; v <= 14; v += .2) { const x = PX(v), y = PY(hbSat(v)); v ? g.lineTo(x, y) : g.moveTo(x, y); }
    g.stroke(); g.restore();
    G.line(g, PX(13.3), gy, PX(13.3), gy + gh, 'rgba(140,220,255,.30)', 1.2, [4, 4]);
    G.txt(g, 'в покое', PX(13.3) - 4, gy + 12, { align: 'right', size: 9.5, col: '#8fd2ff' });
    g.save(); g.strokeStyle = 'rgba(120,255,190,.9)'; g.setLineDash([4, 4]); g.beginPath();
    g.moveTo(gx, PY(sat)); g.lineTo(PX(po2), PY(sat)); g.lineTo(PX(po2), gy + gh); g.stroke(); g.restore();
    G.dot(g, PX(po2), PY(sat), 6, '#7effbe', '#0a1220');
    const nearRight = PX(po2) > gx + gw * .55;
    G.txt(g, fmt(sat * 100, 1) + ' %', PX(po2) + (nearRight ? -10 : 10), PY(sat) - 8, { size: 12.5, col: '#7effbe', weight: 700, align: nearRight ? 'right' : 'left' });
    G.txt(g, 'PO₂, кПа →', gx + gw / 2, gy + gh + 32, { align: 'center', size: 10.5, col: '#7ea4d8' });
    wrapText(g, 'Насыщение гемоглобина: физика (парциальное давление) + химия (связывание O₂) + биология (транспорт крови)', gx + gw / 2 - 4, gy + gh + 52, gw + 30, 10, '#8fb6ea');
    G.txt(g, 'давление воздуха ' + fmt(pres, 0) + ' кПа · O₂ в воздухе 21 %', W - 14, H - 10, { align: 'right', size: 10.5, col: '#8fb6ea' });
  },
  readout(st) {
    const p = st.p, h = parseFloat(p.alt), pres = airPressure(h), po2 = alvPO2(h), sat = hbSat(po2);
    const mod = p.Vt * p.f / 1000;                      // л/мин
    const o2min = mod * .209;                           // л O₂ в минуту
    const nInhale = (p.Vt / 22400) * .209 * 6.022e23;   // молекул O₂ за вдох
    const satSea = hbSat(alvPO2(0));
    const caO2 = 1.34 * p.Hb * sat;                     // мл O₂ на литр артериальной крови
    const delivered = caO2 * 5;                         // МОК 5 л/мин
    return `<div class="kv"><span>Давление воздуха на высоте ${fmt(h, 0)} м</span><b>${fmt(pres, 1)} кПа (${fmt(pres / 101.3 * 100, 0)} % от нормы)</b></div>
    <div class="kv"><span>Парциальное давление O₂ в альвеолах</span><b>${fmt(po2, 1)} кПа</b></div>
    <div class="kv"><span>Минутный объём дыхания: V·f</span><b>${fmt(mod, 2)} л/мин</b></div>
    <div class="kv"><span>Молекул O₂ за один вдох</span><b>${sci(nInhale, 2)} (${fmt(o2min, 2)} л O₂ в минуту)</b></div>
    <div class="kv"><span>Насыщение гемоглобина</span><b>${fmt(sat * 100, 1)} %</b></div>
    <div class="kv"><span>Гемоглобин переносит (1,34 мл O₂ на 1 г Hb)</span><b>${fmt(caO2, 0)} мл O₂ на литр крови</b></div>
    <div class="kv"><span>Доставка кислорода тканям (кровоток 5 л/мин)</span><b>${fmt(delivered / 1000, 2)} л/мин</b></div>
    <div class="kv"><span>Потребность организма в покое ≈ 0,25 л/мин</span><b>запас ${fmt(delivered / 1000 / .25, 1)} ×</b></div>
    <div class="kv"><span>Чтобы доставить столько же O₂, как на уровне моря</span><b>${fmt(satSea / sat, 2)} × масса гемоглобина или кровотока</b></div>
    <div class="note">В горах молекул O₂ во вдохе почти столько же (их доля в воздухе остаётся 21 %), но <b>парциальное давление</b> падает — и диффузия в кровь идёт слабее. Организм компенсирует: учащает дыхание, повышает гемоглобин (у жителей высокогорья — до 180 г/л). Это одна из причин, почему спортсмены тренируются в горах.</div>`;
  }
});

/* ============================ 3. МАСШТАБ И ТОЧНОСТЬ ИЗМЕРЕНИЙ (7 класс, § 5, 12; география) ============================ */
const MAP_SCALES = [
  { v: '10000', m: 10000, label: 'План города — 1 : 10 000' },
  { v: '50000', m: 50000, label: 'Топографическая карта — 1 : 50 000' },
  { v: '200000', m: 200000, label: 'Карта области — 1 : 200 000' },
  { v: '1000000', m: 1000000, label: 'Карта страны — 1 : 1 000 000' },
  { v: '25000000', m: 25000000, label: 'Карта мира — 1 : 25 000 000' }
];
defSim('scale', {
  title: '🗺 Масштаб: как измерить расстояние на карте',
  aspect: .56,
  theoryNote: 'Физика учит измерять величины и оценивать погрешность (7 класс, § 5), математика даёт пропорцию, география — карту и её масштаб. Одна линейка — и три предмета работают вместе.',
  hint: 'Сдвиньте длину отрезка на карте и сравните: на карте масштаба 1 : 25 000 000 один сантиметр — это 250 км, а цена ошибки в 1 мм — 25 км.',
  params: [{ key: 'len', label: 'Длина отрезка на карте', min: .5, max: 60, step: .5, val: 12, unit: 'см', dec: 1 }],
  selects: [{ key: 'sc', label: 'Масштаб карты', val: '50000', options: MAP_SCALES.map(o => ({ v: o.v, label: o.label })) }],
  init: () => ({ bl: [] }),
  step(st, dt) { st.t = (st.t || 0) + dt; },
  draw(g, st, W, H) {
    const p = st.p, M = (MAP_SCALES.find(o => o.v === p.sc) || MAP_SCALES[1]).m;
    const sReal = p.len * M / 100;                 // см карты → м местности
    G.bg(g, W, H);
    /* --- карта с сантиметровой сеткой --- */
    const u = Math.max(10, Math.min(30, (W * .52) / 14));  // 1 см карты в пикселях
    const mapX = 26, mapY = 40, mapW = u * 14, mapH = Math.min(H * .62, u * 8);
    G.panel(g, mapX - 12, mapY - 26, mapW + 24, mapH + 74, { fill: 'rgba(120,200,255,.06)' });
    G.txt(g, 'Карта, 1 см = 1 клетка', mapX, mapY - 10, { size: 12, col: '#cfe2ff', weight: 600 });
    g.save();
    for (let i = 0; i <= 14; i++) { G.line(g, mapX + i * u, mapY, mapX + i * u, mapY + mapH, 'rgba(150,190,240,.16)', 1); }
    for (let j = 0; j <= 8; j++) { G.line(g, mapX, mapY + j * u, mapX + mapW, mapY + j * u, 'rgba(150,190,240,.16)', 1); }
    // река-ориентир (синусоида) — «фон карты»
    g.save(); g.strokeStyle = 'rgba(90,180,255,.35)'; g.lineWidth = 6; g.beginPath();
    for (let x = 0; x <= mapW; x += 3) g.lineTo(mapX + x, mapY + mapH * .72 + Math.sin(x / 46) * mapH * .07);
    g.stroke(); g.restore();
    // маршрут: горизонтальная ломаная длиной len клеток
    const y0 = mapY + mapH * .42, path = [[0, 0], [.4, -.35], [.75, -.1], [1, -.45]];
    g.save(); g.strokeStyle = '#ffd166'; g.lineWidth = 3; g.setLineDash([]); g.beginPath();
    for (let i = 0; i <= 60; i++) {
      const t = i / 60 * p.len, cell = t / 1, xx = mapX + (t / 14) * mapW;
      const seg = Math.min(path.length - 1, Math.floor(t / Math.max(.5, p.len) * path.length));
      const a = path[seg], b = path[Math.min(path.length - 1, seg + 1)];
      const k = (t - seg * (p.len / path.length)) / Math.max(.001, p.len / path.length);
      const yy = y0 + (a[1] + (b[1] - a[1]) * k) * mapH * .55;
      i ? g.lineTo(xx, yy) : g.moveTo(xx, yy);
    }
    g.stroke(); g.restore();
    G.dot(g, mapX, y0, 4, '#7effbe'); G.dot(g, mapX + (p.len / 14) * mapW, y0 - mapH * .45 * .5 + 0, 4, '#ff7b3a');
    G.txt(g, p.len.toFixed(1).replace('.', ',') + ' см на карте', mapX + 6, mapY + 16, { size: 12, col: '#ffd166', weight: 600 });
    /* масштабная линейка карты */
    const lx = mapX, ly = mapY + mapH + 28, lw = u * 4;
    G.txt(g, 'Масштаб: в 1 см — ' + fmt(M / 100000, M >= 1000000 ? 0 : 1) + ' км (1 : ' + M.toLocaleString('ru-RU') + ')', mapX, ly - 4, { size: 11.5, col: '#8fb6ea' });
    [0, '#0a1220', '#e8f0ff', '#0a1220', '#e8f0ff'].forEach((c, i) => G.bar(g, lx + i * (lw / 4), ly + 2, lw / 4, 9, i % 2 ? '#e8f0ff' : '#0a1220'));
    g.save(); g.strokeStyle = 'rgba(200,225,255,.6)'; g.strokeRect(lx, ly + 2, lw, 9); g.restore();
    G.txt(g, '0', lx, ly + 26, { size: 10, col: '#7ea4d8' });
    G.txt(g, fmt(M / 25000, 0) + ' км', lx + lw, ly + 26, { align: 'right', size: 10, col: '#7ea4d8' });
    /* --- реальное расстояние и сравнение --- */
    const rx = W * .60, ry = 60, rw = W * .36;
    G.panel(g, rx - 12, ry - 30, rw + 24, H * .84, { fill: 'rgba(255,255,255,.05)' });
    G.txt(g, 'Это же расстояние на местности', rx, ry - 8, { size: 12, col: '#cfe2ff', weight: 600 });
    const km = M / 100000;                       // км в 1 см карты
    const bars = [
      { n: 'Длина вашего маршрута', v: sReal, c: '#ffd166' },
      { n: 'Цена 1 мм на карте (погрешность)', v: M * .0001, c: '#ff7b54' },
      { n: 'Футбольное поле', v: 100, c: '#4cc9f0' },
      { n: 'Стадион по кругу', v: 400, c: '#4cc9f0' },
      { n: 'Шаг человека (0,7 м)', v: .7, c: '#9fe0ff' }
    ];
    const vmax = Math.max.apply(null, bars.map(b => b.v));
    bars.forEach((b, i) => {
      const y = ry + 16 + i * (H * .125);
      G.txt(g, b.n, rx, y, { size: 11.5, col: '#9fb8dd' });
      const w = Math.max(2, (b.v / vmax) * rw);
      G.bar(g, rx, y + 8, rw, 11, 'rgba(255,255,255,.05)');
      G.bar(g, rx, y + 8, w, 11, b.c);
      G.txt(g, b.v >= 1000 ? fmt(b.v / 1000, 2) + ' км' : fmt(b.v, b.v < 10 ? 1 : 0) + ' м', rx + 6, y + 30, { size: 11.5, col: b.c, weight: 600 });
    });
    const yb = ry + 16 + 5 * (H * .125) + 14;
    G.txt(g, 'Шагов: ' + fmt(sReal / .7, 0) + ' · пешком: ' + fmt(sReal / 1000 / 5 * 60, 0) + ' мин', rx, yb, { size: 11.5, col: '#cfe2ff' });
    wrapText(g, 'Три предмета вместе: география (карта) + математика (пропорция L·M) + физика (измерение и погрешность)', W / 2, H - 34, W - 40, 10.5, '#8fb6ea');
  },
  readout(st) {
    const p = st.p, M = (MAP_SCALES.find(o => o.v === p.sc) || MAP_SCALES[1]).m;
    const sReal = p.len * M / 100, err = M * .0001;
    return `<div class="kv"><span>Масштаб карты</span><b>1 : ${M.toLocaleString('ru-RU')} (в 1 см — ${fmt(M / 100000, M >= 1000000 ? 0 : 1)} км)</b></div>
    <div class="kv"><span>Отрезок на карте</span><b>${fmt(p.len, 1)} см</b></div>
    <div class="kv"><span>Реальное расстояние S = L·M</span><b>${fmt(sReal, sReal < 1000 ? 1 : 0)} м ${sReal >= 1000 ? '= ' + fmt(sReal / 1000, 2) + ' км' : ''}</b></div>
    <div class="kv"><span>Погрешность измерения 1 мм на карте</span><b>±${fmt(err, err < 100 ? 1 : 0)} м на местности</b></div>
    <div class="kv"><span>Относительная погрешность</span><b>${fmt(err / sReal * 100, 2)} %</b></div>
    <div class="kv"><span>Сколько шагов (шаг 70 см)</span><b>${fmt(sReal / .7, 0)}</b></div>
    <div class="kv"><span>Пешком 5 км/ч / велосипед 15 км/ч / авто 90 км/ч</span><b>${fmt(sReal / 1000 / 5 * 60, 0)} мин / ${fmt(sReal / 1000 / 15 * 60, 0)} мин / ${fmt(sReal / 1000 / 90 * 60, 1)} мин</b></div>
    <div class="note">Чем мельче масштаб (больше второе число), тем меньше подробностей и <b>больше</b> ошибка на местности. Точность линейки здесь такая же физическая величина, как цена деления мензурки: 1 мм на карте 1 : 1 000 000 — это целый километр на местности. Именно поэтому масштаб всегда указывают вместе с точностью измерений.</div>`;
  }
});

/* ============================ 4. ЭХО, ЭХОЛОТ, СЕЙСМИКА (9 класс, § 30) ============================ */
const ECHO_MEDIA = [
  { v: 'air', m: 340, label: 'Воздух (20 °C) — 340 м/с', src: 'человек', ref: 'утёс', unit: 'м' },
  { v: 'water', m: 1480, label: 'Вода — 1480 м/с', src: 'катер', ref: 'дно', unit: 'м' },
  { v: 'steel', m: 5000, label: 'Сталь — 5000 м/с', src: 'ультразвуковой дефектоскоп', ref: 'трещину в рельсе', unit: 'мм' },
  { v: 'crust', m: 6000, label: 'Земная кора (продольные волны) — 6000 м/с', src: 'сейсмостанция', ref: 'границу слоёв', unit: 'км' }
];
defSim('echo', {
  title: '📡 Эхо, эхолот и сейсмика: расстояние по времени',
  aspect: .58,
  theoryNote: 'Физика даёт формулу <b>S = v·t/2</b> (9 класс, § 29–30), география — эхолот, измеряющий глубину океана, геология — сейсмические волны и строение Земли, информатика — эхограмма как график сигнала.',
  hint: 'Сравните среду: в воде звук в 4,3 раза быстрее, чем в воздухе, поэтому эхо моря приходит раньше. Обратите внимание: расстояние по времени считается в «полтора» хода — туда и обратно.',
  params: [{ key: 's', label: 'Расстояние до отражателя', min: 5, max: 20000, step: 5, val: 680, unit: 'м', dec: 0 }],
  selects: [{ key: 'med', label: 'Среда и наблюдатель', val: 'air', options: ECHO_MEDIA.map(o => ({ v: o.v, label: o.label })) }],
  init: () => ({ ph: 0, packets: [] }),
  step(st, dt) {
    st.ph += dt;
    if (st.ph > 1.6) { st.ph = 0; st.packets.push({ a: 0 }); }
    if (st.packets.length > 3) st.packets.shift();
  },
  draw(g, st, W, H) {
    const p = st.p, md = ECHO_MEDIA.find(o => o.v === p.med) || ECHO_MEDIA[0], v = md.m, t = 2 * p.s / v;
    G.bg(g, W, H);
    const sx = 70, refX = W - 90, scY = H * .40;
    const unitTxt = t < .001 ? fmt(t * 1e6, 0) + ' мкс' : t < 1 ? fmt(t * 1000, 0) + ' мс' : fmt(t, 2) + ' с';
    /* сцена */
    G.line(g, 20, scY + 60, W - 20, scY + 60, 'rgba(150,190,240,.25)', 1.4);
    if (p.med === 'water') { for (let x = 24; x < W - 20; x += 26) G.line(g, x, scY + 60, x + 12, scY + 60, 'rgba(120,200,255,.55)', 2); }
    if (p.med === 'crust') { G.bar(g, 20, scY + 60, W - 40, H - scY - 78, 'rgba(180,140,90,.16)'); for (let i = 0; i < 22; i++) G.line(g, 24 + i * 36, scY + 64, 24 + i * 36 + 18, H - 20, 'rgba(200,170,120,.10)', 2); }
    if (p.med === 'steel') { G.bar(g, 20, scY + 30, W - 40, 30, 'rgba(170,190,215,.22)'); G.txt(g, 'рельс', 30, scY + 50, { size: 11, col: '#cfe2ff' }); }
    G.dot(g, sx, scY + 30, 8, '#ffd166'); G.txt(g, md.src, sx, scY + 14, { align: 'center', size: 11, col: '#ffd166' });
    G.line(g, refX, scY - 30, refX, scY + 60, 'rgba(200,225,255,.6)', 3);
    G.txt(g, md.ref, refX + 6, scY - 16, { size: 11, col: '#cfe2ff' });
    /* пакеты волн: туда и обратно (визуальная скорость), время — физическое */
    st.packets.forEach(pk => {
      const u = Math.min(1, pk.a / 1), r = pk.a % 2;
      const prog = r < 1 ? r : 2 - r;                       // 0..1..0
      const x = sx + (refX - sx) * (r < 1 ? u : 1) * (r < 1 ? 1 : 1) - 0;
      const xx = r < 1 ? sx + (refX - sx) * r : refX - (refX - sx) * (r - 1);
      g.save(); g.strokeStyle = r < 1 ? 'rgba(120,255,190,.95)' : 'rgba(255,150,120,.95)'; g.lineWidth = 2.4;
      for (let i = 0; i < 5; i++) {
        g.beginPath(); const bx = xx - i * 7 * (r < 1 ? 1 : -1) + 12 * (r < 1 ? 1 : -1);
        g.moveTo(bx, scY - 6 + Math.sin(i * 1.4) * 6); g.lineTo(bx + 5, scY - 6 - Math.sin(i * 1.4) * 6); g.stroke();
      }
      g.restore();
    });
    G.txt(g, (st.packets.length && (st.packets[st.packets.length - 1].a % 2) > 1 ? '↩ эхо возвращается' : '→ импульс идёт к цели'), W / 2, scY - 46, { align: 'center', size: 12.5, col: '#cfe2ff', weight: 600 });
    G.txt(g, 'S = ' + fmt(p.s, 0) + ' м', (sx + refX) / 2, scY + 82, { align: 'center', size: 13, col: '#ffd166', weight: 700 });
    G.line(g, sx, scY + 70, refX, scY + 70, 'rgba(255,209,102,.5)', 1.4, [5, 5]);
    G.line(g, sx, scY + 64, sx, scY + 76, 'rgba(255,209,102,.7)', 1.4);
    G.line(g, refX, scY + 64, refX, scY + 76, 'rgba(255,209,102,.7)', 1.4);
    G.txt(g, 'v = ' + fmt(v, 0) + ' м/с   →   t = 2S/v = ' + unitTxt, W / 2, scY + 100, { align: 'center', size: 12, col: '#7effbe' });
    gTxtWrap(g, 'на экране импульс бежит условно быстро — физическое время считает формула', W / 2, scY + 120, { align: 'center', size: 10.5, col: '#5f7ba3' }, W - 30);
    /* эхограмма */
    const gx = 40, gy = H * .78, gw = W - 120, gh = 40;
    G.panel(g, gx - 10, gy - 20, gw + 60, gh + 44, { fill: 'rgba(255,255,255,.04)' });
    G.txt(g, 'Эхограмма (так же выглядит сигнал эхолота и сейсмограммы)', gx, gy - 6, { size: 11.5, col: '#8fb6ea' });
    G.line(g, gx, gy + gh * .6, gx + gw, gy + gh * .6, 'rgba(160,200,255,.35)', 1.2);
    const N = 6, h0 = gh * .6;
    for (let i = 0; i < N; i++) {
      const x = gx + (i / N) * gw;
      const amp = 20 * (i % 2 ? .45 : 1);
      g.save(); g.strokeStyle = i % 2 ? 'rgba(255,150,120,.85)' : 'rgba(120,255,190,.9)'; g.lineWidth = 1.8;
      g.beginPath();
      for (let k = 0; k <= 24; k++) { const xx = x + (k / 24) * gw / N, yy = gy + h0 - Math.sin(k / 24 * TAU * 3) * amp * Math.exp(-k / 12); k ? g.lineTo(xx, yy) : g.moveTo(xx, yy); }
      g.stroke(); g.restore();
      G.txt(g, (i / N * 1.6).toFixed(1) + ' с', x, gy + gh + 14, { size: 10, col: '#7ea4d8' });
    }
    G.txt(g, 'два импульса: посланный и вернувшийся — между ними время t', gx + gw / 2, gy + gh + 32, { align: 'center', size: 10.5, col: '#8fb6ea' });
    G.txt(g, 'Порог эха: ' + (p.s * 2 / v > .1 ? 'человек услышит раздельно ✅' : 'сливается в один звук ❌'), W - 12, 22, { align: 'right', size: 11.5, col: p.s * 2 / v > .1 ? '#7effbe' : '#ff9d9d' });
  },
  readout(st) {
    const p = st.p, md = ECHO_MEDIA.find(o => o.v === p.med) || ECHO_MEDIA[0], v = md.m, t = 2 * p.s / v;
    const need = p.s * 2 / v;
    return `<div class="kv"><span>Скорость звука в среде</span><b>${fmt(v, 0)} м/с</b></div>
    <div class="kv"><span>Время до эха t = 2S/v</span><b>${t < .001 ? fmt(t * 1e6, 0) + ' мкс' : t < 1 ? fmt(t * 1000, 0) + ' мс' : fmt(t, 2) + ' с'}</b></div>
    <div class="kv"><span>Обратная задача: S = v·t/2 при t = ${fmt(t, 3)} с</span><b>${fmt(v * t / 2, 0)} м — совпадает с расстоянием до отражателя</b></div>
    <div class="kv"><span>Человек различает эхо, если пауза больше 0,1 с</span><b>минимальное расстояние ${fmt(v * .05, 1)} м ${need > .1 ? '✅' : '❌'}</b></div>
    <div class="kv"><span>Сколько раз звук быстрее в этой среде, чем в воздухе</span><b>${fmt(v / 340, 2)} ×</b></div>
    <div class="kv"><span>Сравните: молния → гром за ${fmt(p.s / 340, 2)} с</span><b>даёт расстояние до грозы ${fmt(p.s, 0)} м в воздухе</b></div>
    <div class="note">Одна и та же формула <span class="f">S = v·t/2</span> измеряет глубину океана (эхолот), трещину в рельсе (ультразвуковая дефектоскопия) и границы слоёв Земли (сейсморазведка). В медицине на этом построено УЗИ, а летучие мыши и дельфины «видят» эхом: физика объясняет живой эхолокации механизм, а биология — её устройство.</div>`;
  }
});

/* ============================ 5. ФЕРМА: УСИЛИЯ В СТЕРЖНЯХ (7 класс, § 33; трудовое обучение) ============================ */
const MATERIALS = {
  steel: { s: 160, rho: 7850, name: 'Сталь Ст3' },
  alu: { s: 100, rho: 2700, name: 'Алюминиевый сплав' },
  wood: { s: 10, rho: 500, name: 'Дерево (сосна)' },
  concrete: { s: 8, rho: 2400, name: 'Бетон' },
  carbon: { s: 400, rho: 1600, name: 'Углепластик' }
};
defSim('truss', {
  title: '🏗 Ферма моста: почему треугольник прочнее квадрата',
  aspect: .58,
  theoryNote: 'Физика даёт условие равновесия (7 класс, § 33–35), математика — теорему Пифагора и тригонометрию, технология — выбор материала и сечения. Инженер решает одну задачу тремя предметами сразу.',
  hint: 'Увеличьте высоту фермы h — усилия в стержнях упадут (стержни станут «положе», а плечо больше). Уменьшите сечение — напряжение вырастет, запас прочности упадёт.',
  params: [
    { key: 'L', label: 'Пролёт фермы L', min: 2, max: 30, step: .5, val: 12, unit: 'м', dec: 1 },
    { key: 'h', label: 'Высота фермы h', min: .5, max: 8, step: .1, val: 3, unit: 'м', dec: 1 },
    { key: 'F', label: 'Нагрузка в вершине F', min: 1, max: 200, step: 1, val: 50, unit: 'кН', dec: 0 },
    { key: 'A', label: 'Площадь сечения стержня', min: 5, max: 100, step: 1, val: 20, unit: 'см²', dec: 0 }
  ],
  selects: [{ key: 'mat', label: 'Материал стержней', val: 'steel', options: Object.keys(MATERIALS).map(k => ({ v: k, label: MATERIALS[k].name + ' — [σ] = ' + MATERIALS[k].s + ' МПа' })) }],
  init: () => ({ ph: 0 }),
  step(st, dt) { st.ph += dt; },
  draw(g, st, W, H) {
    const p = st.p, Mt = MATERIALS[p.mat] || MATERIALS.steel;
    const ell = Math.hypot(p.L / 2, p.h), al = Math.atan2(p.h, p.L / 2) * R2D;
    const N = p.F * ell / (2 * p.h), sig = N / p.A * 10, k = Mt.s / Math.max(.001, sig);
    G.bg(g, W, H);
    const x0 = W * .16, x1 = W * .84, yB = H * .74, scale = (x1 - x0) / Math.max(4, p.L * 1.25);
    const cx = (x0 + x1) / 2, yA = yB - p.h * scale * Math.min(1, 6 / Math.max(2, p.h) * 1.1);
    const yTop = Math.max(H * .16, yA);
    const col = k < 1 ? '#ff6b6b' : k < 2 ? '#ffd166' : '#7effbe';
    // грунт
    G.bar(g, 0, yB, W, H - yB, 'rgba(150,190,240,.07)');
    for (let x = 0; x < W; x += 16) G.line(g, x, yB, x + 10, yB - 8, 'rgba(150,190,240,.22)', 1.4);
    G.line(g, 10, yB, W - 10, yB, 'rgba(180,215,255,.5)', 2);
    // опоры
    g.save(); g.fillStyle = 'rgba(160,200,255,.35)';
    g.beginPath(); g.moveTo(x0, yB); g.lineTo(x0 - 12, yB + 16); g.lineTo(x0 + 12, yB + 16); g.closePath(); g.fill();
    g.beginPath(); g.arc(x1, yB + 10, 7, 0, TAU); g.strokeStyle = 'rgba(160,200,255,.7)'; g.lineWidth = 2; g.stroke(); g.restore();
    G.txt(g, 'шарнир', x0 - 6, yB + 30, { size: 10.5, col: '#8fb6ea' }); G.txt(g, 'каток', x1 + 8, yB + 30, { size: 10.5, col: '#8fb6ea' });
    // стержни
    const thick = Math.max(5, Math.min(22, p.A * .16));
    [[x0, yB, cx, yTop], [cx, yTop, x1, yB], [x0, yB, x1, yB]].forEach(sg => {
      G.line(g, sg[0], sg[1], sg[2], sg[3], 'rgba(0,0,0,.35)', thick + 4);
      G.line(g, sg[0], sg[1], sg[2], sg[3], col, thick);
      G.line(g, sg[0], sg[1], sg[2], sg[3], 'rgba(255,255,255,.25)', Math.max(2, thick * .3));
    });
    // узел и нагрузка
    G.dot(g, cx, yTop, 6, '#ffd166', '#fff');
    G.arrow(g, cx, yTop - 54, cx, yTop - 6, '#ff9d7b', 3, 12);
    G.txt(g, 'F = ' + fmt(p.F, 0) + ' кН', cx + 10, yTop - 40, { size: 12.5, col: '#ff9d7b', weight: 700 });
    // размеры
    G.line(g, x0, yB + 46, cx, yB + 46, 'rgba(255,209,102,.8)', 1.4, [5, 5]);
    G.txt(g, 'L/2 = ' + fmt(p.L / 2, 1) + ' м', (x0 + cx) / 2, yB + 42, { align: 'center', size: 11.5, col: '#ffd166' });
    G.line(g, cx + 6, yTop, cx + 6, yB, 'rgba(140,220,255,.7)', 1.4, [4, 4]);
    G.txt(g, 'h = ' + fmt(p.h, 1) + ' м', cx + 10, (yTop + yB) / 2, { size: 11.5, col: '#8fd2ff' });
    G.txt(g, 'ℓ', (x0 + cx) / 2 - 12, (yB + yTop) / 2 - 6, { size: 13, col: '#cfe2ff', weight: 700 });
    g.save(); g.strokeStyle = 'rgba(255,255,255,.5)'; g.lineWidth = 1.4; g.beginPath();
    g.arc(x0, yB, 46, -al * D2R, 0); g.stroke(); g.restore();
    G.txt(g, 'α = ' + fmt(al, 0) + '°', x0 + 52, yB - 12, { size: 11.5, col: '#cfe2ff' });
    // силы в стержнях
    const Nl = Math.min(70, 20 + N * .2);
    G.arrow(g, x0 + 26, yB - 14, x0 + 26 + Math.cos(al * D2R) * Nl * .5, yB - 14 - Math.sin(al * D2R) * Nl * .5, '#4cc9f0', 2.6, 9);
    G.arrow(g, x1 - 26, yB - 14, x1 - 26 - Math.cos(al * D2R) * Nl * .5, yB - 14 - Math.sin(al * D2R) * Nl * .5, '#4cc9f0', 2.6, 9);
    G.txt(g, 'N = ' + fmt(N, 0) + ' кН (сжатие)', cx - 4, yB - 24, { align: 'right', size: 12, col: '#4cc9f0' });
    /* панель расчёта */
    const px = 24, py = 18;
    G.panel(g, px - 10, py - 12, 236, 116, { fill: 'rgba(255,255,255,.06)' });
    G.txt(g, 'Стержень: ' + Mt.name, px, py + 4, { size: 12, col: '#cfe2ff', weight: 600 });
    G.txt(g, 'ℓ = √((L/2)² + h²) = ' + fmt(ell, 2) + ' м', px, py + 24, { size: 11.5, col: '#8fb6ea' });
    G.txt(g, 'N = F·ℓ / (2h) = ' + fmt(N, 1) + ' кН', px, py + 42, { size: 11.5, col: '#4cc9f0' });
    G.txt(g, 'σ = N/A = ' + fmt(sig, 1) + ' МПа', px, py + 60, { size: 11.5, col: '#ffd166' });
    G.txt(g, '[σ] / σ = ' + fmt(k, 2) + ' — запас прочности', px, py + 78, { size: 11.5, col: col, weight: 600 });
    G.txt(g, k < 1 ? 'стержень разрушится' : k < 2 ? 'опасно: запас меньше двукратного' : 'конструкция выдержит', px, py + 98, { size: 11.5, col: col, weight: 600 });
    wrapText(g, 'Треугольник — жёсткая фигура: поэтому мосты, краны и вышки ЛЭП собирают из треугольников.', W / 2, H - 12, W - 40, 10.5, '#8fb6ea');
  },
  readout(st) {
    const p = st.p, Mt = MATERIALS[p.mat] || MATERIALS.steel;
    const ell = Math.hypot(p.L / 2, p.h), al = Math.atan2(p.h, p.L / 2) * R2D;
    const N = p.F * ell / (2 * p.h), sig = N / p.A * 10, k = Mt.s / Math.max(.001, sig);
    const mass = 2 * ell * (p.A * 1e-4) * Mt.rho + p.L * (p.A * 1e-4) * Mt.rho;
    return `<div class="kv"><span>Длина наклонного стержня ℓ</span><b>${fmt(ell, 3)} м (теорема Пифагора)</b></div>
    <div class="kv"><span>Угол наклона α = arctg(2h/L)</span><b>${fmt(al, 1)}°</b></div>
    <div class="kv"><span>Усилие в стержне N = F·ℓ/(2h)</span><b>${fmt(N, 1)} кН (сжатие)</b></div>
    <div class="kv"><span>Напряжение σ = N/A</span><b>${fmt(sig, 2)} МПа</b></div>
    <div class="kv"><span>Допускаемое напряжение материала [σ]</span><b>${fmt(Mt.s, 0)} МПа (${Mt.name})</b></div>
    <div class="kv"><span>Запас прочности [σ]/σ</span><b>${fmt(k, 2)} × — ${k < 1 ? 'стержень разрушится' : k < 2 ? 'мало: нужно не меньше 2' : 'конструкция выдержит'}</b></div>
    <div class="kv"><span>Как снизить напряжение</span><b>увеличить h, сечение A или выбрать материал покрепче</b></div>
    <div class="kv"><span>Масса конструкции (2 наклонных + 1 нижний стержень)</span><b>${fmt(mass, 0)} кг</b></div>
    <div class="note">1 кН/см² = 10 МПа — удобное правило для расчёта. Стержень работает на <b>сжатие</b>, и напряжение сравнивают с допускаемым: физика даёт условие равновесия, математика — длину и угол, технология — материал. Заодно виден и экологический смысл: чем меньше масса, тем меньше металла и энергии на его изготовление.</div>`;
  }
});

/* ============================ 6. ШУМ: ДЕЦИБЕЛЫ И БЕЗОПАСНОСТЬ (9 класс, § 30, 43) ============================ */
const NOISE_SRC = [
  { v: 'whisper', L: 30, label: 'Шёпот — 30 дБ' },
  { v: 'talk', L: 60, label: 'Разговор — 60 дБ' },
  { v: 'class', L: 75, label: 'Школьная перемена — 75 дБ' },
  { v: 'car', L: 85, label: 'Оживлённая улица — 85 дБ' },
  { v: 'metro', L: 95, label: 'Метро — 95 дБ' },
  { v: 'concert', L: 110, label: 'Рок-концерт, наушники — 110 дБ' },
  { v: 'jack', L: 115, label: 'Отбойный молоток — 115 дБ' },
  { v: 'plane', L: 140, label: 'Реактивный самолёт рядом — 140 дБ' }
];
defSim('noise', {
  title: '🔊 Шум: децибелы, здоровье и экология',
  aspect: .56,
  theoryNote: 'Физика описывает звук через интенсивность и звуковое давление, математика даёт логарифмическую шкалу (lg 10 = 1), биология и психология — пороги слуха, утомление и внимание, экология — нормы шума в городах (9 класс, § 43).',
  hint: 'Каждые +3 дБ — это вдвое опаснее: безопасное время воздействия уменьшается вдвое. Двигая ползунок, посмотрите, во сколько раз при этом меняется интенсивность (в 10 раз каждые +10 дБ).',
  params: [
    { key: 'L', label: 'Уровень шума у источника', min: 30, max: 140, step: 1, val: 85, unit: 'дБ', dec: 0 },
    { key: 'r', label: 'Расстояние от источника', min: 1, max: 200, step: 1, val: 10, unit: 'м', dec: 0 }
  ],
  selects: [{ key: 'src', label: 'Типичный источник шума', val: 'car', options: NOISE_SRC.map(o => ({ v: o.v, label: o.label })) }],
  init: () => ({ ph: 0 }),
  onChange(st, k, v) { if (k === 'src') { const o = NOISE_SRC.find(x => x.v === v); if (o) st.p.L = o.L; } },
  step(st, dt) { st.ph += dt * 2; },
  draw(g, st, W, H) {
    const p = st.p, Lr = p.L - 20 * Math.log10(Math.max(1, p.r));
    G.bg(g, W, H);
    /* --- источник и волны (левая половина) --- */
    const sx = W * .13, sy = H * .34, rp = Math.min(W * .22, 14 + Math.sqrt(p.r) * 4.2);
    wrapText(g, 'Звук — это волна: энергия расходится от источника', 16, 20, W * .40, 11.5, '#cfe2ff', 'left');
    G.dot(g, sx, sy, 15, '#ffd166');
    G.txt(g, '🔊', sx, sy + 7, { align: 'center', size: 17 });
    for (let i = 1; i <= 4; i++) {
      g.save(); g.strokeStyle = 'rgba(255,209,102,' + (0.5 - i * .09) + ')'; g.lineWidth = 1.6;
      g.beginPath(); g.arc(sx, sy, rp * i / 4 + 10, -1, 1); g.stroke(); g.restore();
    }
    G.line(g, sx, sy + 24, sx + rp, sy + 24, 'rgba(160,200,255,.5)', 1.4, [4, 4]);
    G.txt(g, 'r = ' + fmt(p.r, 0) + ' м', sx + rp / 2, sy + 38, { align: 'center', size: 11, col: '#8fb6ea' });
    G.txt(g, '👂', sx + rp, sy + 16, { align: 'center', size: 16 });
    G.txt(g, fmt(Lr, 0) + ' дБ', sx + rp, sy - 24, { align: 'center', size: 12.5, col: '#4cc9f0', weight: 700 });
    wrapText(g, 'Интенсивность падает как 1/r², а уровень — на 6 дБ при удвоении расстояния', 16, sy + 72, W * .42, 10.5, '#8fb6ea', 'left');
    /* --- шкала уровней (правая половина) --- */
    const gx = W * .60, gy = 34, gw = 46, gh = H - 132;
    G.panel(g, gx - 46, gy - 22, gw + 200, gh + 52, { fill: 'rgba(255,255,255,.05)' });
    G.txt(g, 'Шкала уровней звука', gx - 30, gy - 6, { size: 11.5, col: '#cfe2ff', weight: 600 });
    const Y = L => gy + gh - (Math.min(140, Math.max(0, L)) / 140) * gh;
    [
      { a: 0, b: 40, c: 'rgba(126,255,190,.16)', n: 'тихо' },
      { a: 40, b: 65, c: 'rgba(255,209,102,.16)', n: 'норма днём' },
      { a: 65, b: 85, c: 'rgba(255,160,90,.18)', n: 'шумно' },
      { a: 85, b: 110, c: 'rgba(255,110,110,.18)', n: 'опасно' },
      { a: 110, b: 140, c: 'rgba(220,60,60,.22)', n: 'боль / травма' }
    ].forEach(z => { G.bar(g, gx, Y(z.b), gw, Y(z.a) - Y(z.b), z.c); G.txt(g, z.n, gx + gw + 10, (Y(z.a) + Y(z.b)) / 2 + 4, { size: 10.5, col: '#cfe2ff' }); });
    G.line(g, gx, gy, gx, gy + gh, 'rgba(180,215,255,.6)', 1.6);
    for (let L = 0; L <= 140; L += 20) { G.line(g, gx - 4, Y(L), gx, Y(L), 'rgba(180,215,255,.5)', 1.4); G.txt(g, L, gx - 8, Y(L) + 4, { align: 'right', size: 10, col: '#7ea4d8' }); }
    G.line(g, gx - 6, Y(p.L), gx + gw + 4, Y(p.L), '#ffd166', 2.4);
    G.line(g, gx - 6, Y(Lr), gx + gw + 4, Y(Lr), '#4cc9f0', 2.4);
    G.line(g, gx - 6, Y(85), gx + gw + 4, Y(85), 'rgba(255,110,110,.9)', 1.6, [5, 4]);
    G.txt(g, 'источник: ' + fmt(p.L, 0) + ' дБ', gx + gw + 8, Y(p.L) - 6, { size: 11, col: '#ffd166', weight: 600 });
    G.txt(g, 'у уха: ' + fmt(Lr, 0) + ' дБ', gx + 6, Y(Lr) + 15, { size: 11, col: '#4cc9f0', weight: 600 });
    G.txt(g, '85 дБ', gx - 8, Y(85) + 4, { align: 'right', size: 10.5, col: '#ff9d9d', weight: 600 });
    /* --- безопасное время и норма (низ) --- */
    const bx = 16, by = H - 46, bw = W * .48;
    const tSafe = p.L <= 85 ? 8 : 8 * Math.pow(2, (85 - p.L) / 3);
    G.panel(g, bx - 8, by - 24, bw + 16, 66, { fill: 'rgba(255,255,255,.05)' });
    G.txt(g, 'Безопасное время: ' + (p.L <= 85 ? 'без ограничений (не более 8 ч)' : fmt(tSafe, 2) + ' ч'), bx, by - 6, { size: 12, col: p.L <= 85 ? '#7effbe' : p.L < 100 ? '#ffd166' : '#ff6b6b', weight: 600 });
    G.bar(g, bx, by + 4, bw, 11, 'rgba(255,255,255,.06)');
    G.bar(g, bx, by + 4, Math.max(3, bw * Math.min(1, tSafe / 8)), 11, p.L <= 85 ? '#7effbe' : '#ff9d7b');
    G.txt(g, 'каждые +3 дБ уменьшают безопасное время вдвое', bx, by + 31, { size: 10.5, col: '#8fb6ea' });
    wrapText(g, 'Ночная норма в жилых районах ≈ 45–55 дБ: до такого уровня звук ' + fmt(p.L, 0) + ' дБ доходит на ' + fmt(Math.pow(10, (p.L - 55) / 20), 0) + ' м', W - 16, H - 44, W * .36, 10.5, '#8fb6ea', 'right');
  },
  readout(st) {
    const p = st.p, Lr = p.L - 20 * Math.log10(Math.max(1, p.r));
    const I = 1e-12 * Math.pow(10, p.L / 10), pPa = 2e-5 * Math.pow(10, p.L / 20);
    const tSafe = p.L <= 85 ? Infinity : 8 * Math.pow(2, (85 - p.L) / 3);
    const rNorm = Math.pow(10, (p.L - 55) / 20);
    return `<div class="kv"><span>Интенсивность I = I₀·10^(L/10)</span><b>${sci(I, 2)} Вт/м²</b></div>
    <div class="kv"><span>Звуковое давление p = 2·10⁻⁵·10^(L/20)</span><b>${pPa < .01 ? sci(pPa, 2) : fmt(pPa, 3)} Па</b></div>
    <div class="kv"><span>Во сколько раз громче порога слышимости (по интенсивности)</span><b>${sci(Math.pow(10, p.L / 10), 1)} раз</b></div>
    <div class="kv"><span>Уровень на расстоянии ${fmt(p.r, 0)} м</span><b>${fmt(Lr, 1)} дБ (падение ${fmt(p.L - Lr, 1)} дБ)</b></div>
    <div class="kv"><span>На сколько громче предельно безопасных 85 дБ</span><b>${p.L > 85 ? '+' + fmt(p.L - 85, 0) + ' дБ = ' + fmt(Math.pow(10, (p.L - 85) / 10), 0) + ' раз по интенсивности' : 'нет превышения ✅'}</b></div>
    <div class="kv"><span>Безопасное время работы в таком шуме</span><b>${tSafe === Infinity ? 'не ограничено (≤ 8 ч в норме)' : fmt(tSafe, 2) + ' ч'}</b></div>
    <div class="kv"><span>На каком расстоянии шум спадает до 55 дБ (ночная норма)</span><b>${fmt(rNorm, 0)} м</b></div>
    <div class="note">Децибел — логарифмическая величина: <span class="f">L = 10·lg(I/I₀)</span>, где I₀ = 10⁻¹² Вт/м². Поэтому «+3 дБ» — это не маленькая добавка, а вдвое большая энергия звука. Наушники на громкости 100 дБ безопасны лишь 15 минут в день — это уже вопрос экологии и охраны здоровья.</div>`;
  }
});

/* ============================ 7. СТАНДАРТНЫЙ ВИД ЧИСЛА И ПОРЯДКИ ВЕЛИЧИН (7 класс, § 5) ============================ */
const ORDERS = [
  { k: -10, n: 'размер атома водорода (0,1 нм)', e: '⚛️' },
  { k: -8, n: 'диаметр молекулы белка', e: '🧬' },
  { k: -7, n: 'вирус гриппа', e: '🦠' },
  { k: -6, n: 'бактерия', e: '🦠' },
  { k: -4, n: 'толщина человеческого волоса', e: '💠' },
  { k: -3, n: 'комар', e: '🦟' },
  { k: -2, n: 'монета, 2 см', e: '🪙' },
  { k: -1, n: 'стакан, 10 см', e: '🥛' },
  { k: 0, n: 'рост школьника, 1 м', e: '🧑' },
  { k: 1, n: 'пятиэтажный дом, 15 м', e: '🏢' },
  { k: 2, n: 'футбольное поле, 100 м', e: '🥅' },
  { k: 3, n: '1 километр', e: '🛣' },
  { k: 4, n: 'город, 10 км', e: '🏙' },
  { k: 5, n: 'озеро, 100 км', e: '🌊' },
  { k: 6, n: 'Казахстан, 2 700 км ≈ 2,7·10⁶ м', e: '🗺' },
  { k: 7, n: 'диаметр Земли, 1,27·10⁷ м', e: '🌍' },
  { k: 8, n: 'расстояние до Луны, 3,8·10⁸ м', e: '🌕' },
  { k: 9, n: 'диаметр Солнца, 1,39·10⁹ м', e: '☀️' },
  { k: 11, n: 'от Солнца до Земли, 1,5·10¹¹ м', e: '🪐' },
  { k: 13, n: 'орбита Юпитера, 7,8·10¹¹…10¹³ м', e: '🪐' },
  { k: 16, n: 'световой год, 9,5·10¹⁵ м', e: '✨' },
  { k: 21, n: 'диаметр Галактики, 10²¹ м', e: '🌌' },
  { k: 26, n: 'наблюдаемая Вселенная, 8,8·10²⁶ м', e: '🌠' }
];
const SUP = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
const supNum = n => String(n).split('').map(c => SUP[c] || c).join('');
const plainNumber = (a, k) => {
  if (k === 0) return fmt(a, 1).replace('.', ',');
  if (k >= 1 && k <= 8) return String(Math.round(a * Math.pow(10, k))).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  if (k <= -1 && k >= -7) return ('0,' + '0'.repeat(-k - 1) + String(Math.round(a * Math.pow(10, -k))));
  return 'нулями не записать: в числе ' + (Math.abs(k) + 1) + ' разрядов';
};
defSim('orders', {
  title: '🔢 Порядки величин: от атома до Вселенной',
  aspect: .56,
  theoryNote: 'Запись числа в стандартном виде <b>a·10ⁿ</b> (7 класс, § 5) позволяет сравнивать атом и Галактику, а физика и астрономия дают материал: диапазон размеров — 36 порядков. Здесь математика обслуживает сразу все естественные науки.',
  hint: 'Нажмите кнопку объекта — ползунок перенесёт вас в нужный масштаб. Обратите внимание: каждый шаг ползунка — это в 10 раз больше, логарифмическая шкала.',
  params: [
    { key: 'a', label: 'Мантисса a (1 ≤ a < 10)', min: 1, max: 9.9, step: .1, val: 1, dec: 1 },
    { key: 'k', label: 'Порядок (показатель степени k)', min: -10, max: 26, step: 1, val: 0, dec: 0 }
  ],
  actions: [
    { label: '⚛️ Атом (10⁻¹⁰ м)', run: (st, a) => { st.p.a = 1; st.p.k = -10; a.sync(); a.notify('Атом — 10⁻¹⁰ м. В ядре сосредоточена почти вся масса'); } },
    { label: '🦠 Бактерия (10⁻⁶ м)', run: (st, a) => { st.p.a = 1; st.p.k = -6; a.sync(); a.notify('Бактерия — 1 мкм: в 1000 раз больше атома'); } },
    { label: '🧑 Человек (10⁰ м)', run: (st, a) => { st.p.a = 1; st.p.k = 0; a.sync(); a.notify('Человек — примерно 1,7 м = 1,7·10⁰ м'); } },
    { label: '🌍 Земля (10⁷ м)', run: (st, a) => { st.p.a = 1.27; st.p.k = 7; a.sync(); a.notify('Диаметр Земли 1,27·10⁷ м = 12 700 км'); }, primary: true },
    { label: '🌌 Галактика (10²¹ м)', run: (st, a) => { st.p.a = 1; st.p.k = 21; a.sync(); a.notify('Галактика — 10²¹ м, а до неё 100 000 световых лет'); } }
  ],
  init: () => ({ ph: 0 }),
  step(st, dt) { st.ph += dt; },
  draw(g, st, W, H) {
    const p = st.p, val = p.a * Math.pow(10, p.k);
    const near = ORDERS.reduce((b, o) => Math.abs(o.k - p.k) < Math.abs(b.k - p.k) ? o : b, ORDERS[0]);
    G.bg(g, W, H);
    /* крупная запись числа */
    G.panel(g, 24, 22, W * .44, H * .30, { fill: 'rgba(255,255,255,.06)' });
    G.txt(g, 'Стандартный вид числа', 40, 46, { size: 11.5, col: '#8fb6ea' });
    G.txt(g, fmt(p.a, 1) + ' · 10' + supNum(p.k), 40, 86, { size: 29, weight: 700, col: '#ffd166' });
    G.txt(g, 'обычная запись', 40, 114, { size: 11.5, col: '#8fb6ea' });
    const plain = plainNumber(p.a, p.k);
    G.txt(g, plain, 40, 140, { size: plain.length <= 26 ? 17 : plain.length <= 45 ? 13 : 10.5, col: '#cfe2ff', weight: 600 });
    G.txt(g, 'порядок величины: 10' + supNum(p.k), 40, H * .30 + 4, { size: 12, col: '#7effbe' });
    /* масштабная лестница */
    const gx = W * .52, gy = 42, gw = W * .44, gh = H * .46;
    G.panel(g, gx - 14, gy - 20, gw + 40, gh + 66, { fill: 'rgba(120,200,255,.05)' });
    G.txt(g, 'Логарифмическая шкала: каждое деление — в 10 раз', gx - 4, gy - 6, { size: 11.5, col: '#cfe2ff' });
    G.line(g, gx, gy + gh, gx + gw, gy + gh, 'rgba(180,215,255,.5)', 1.6);
    const KX = k => gx + ((k + 10) / 36) * gw;
    [-10, -5, 0, 5, 10, 15, 20, 26].forEach(k => { G.line(g, KX(k), gy + gh, KX(k), gy + gh + 6, 'rgba(180,215,255,.5)', 1.2); G.txt(g, '10' + supNum(k), KX(k), gy + gh + 20, { align: 'center', size: 10, col: '#7ea4d8' }); });
    ORDERS.forEach(o => {
      const x = KX(o.k), on = o === near;
      G.dot(g, x, gy + gh, on ? 6 : 3.4, on ? '#ffd166' : 'rgba(160,200,255,.55)');
      if (on) { G.line(g, x, gy + gh, x, gy + gh - 26, 'rgba(255,209,102,.7)', 1.4, [4, 4]); G.txt(g, o.e + ' ' + o.n, Math.min(x + 8, gx + gw - 4), gy + gh - 34, { align: x > gx + gw * .6 ? 'right' : 'left', size: 11.5, col: '#ffd166', weight: 600 }); }
    });
    G.dot(g, KX(p.k + Math.log10(p.a)), gy + gh, 5, '#ff7b3a', '#fff');
    G.txt(g, 'вы здесь', KX(p.k + Math.log10(p.a)), gy + gh + 36, { align: 'center', size: 10.5, col: '#ff9d7b' });
    /* сравнение с человеком */
    const cy2 = H * .58;
    G.panel(g, 24, cy2, W * .40, H * .29, { fill: 'rgba(255,255,255,.05)' });
    G.txt(g, 'Сравнение с человеком (1,7 м)', 40, cy2 + 22, { size: 11.5, col: '#8fb6ea' });
    const ratio = val / 1.7;
    const humanTxt = ratio > .95 && ratio < 1.05 ? 'примерно такая же величина'
      : ratio >= 1 ? 'во столько раз больше: ' + sci(ratio, 1)
        : 'во столько раз меньше: ' + sci(1 / ratio, 1);
    G.txt(g, humanTxt, 40, cy2 + 48, { size: 13, col: '#cfe2ff', weight: 600 });
    G.txt(g, 'Во сколько раз больше Солнца (1,39·10⁹ м): ' + sci(val / 1.39e9, 1), 40, cy2 + 70, { size: 11.5, col: '#9fb8dd' });
    G.txt(g, 'Одна и та же запись позволяет сравнивать атом и звёзды: 36 порядков.', 40, H - 14, { size: 11, col: '#8fb6ea' });
    gTxtWrap(g, 'Каждое деление шкалы — умножение на 10: это и есть логарифмическая шкала.', W / 2, H - 38, { align: 'center', size: 11, col: '#8fb6ea' }, W - 30);
  },
  readout(st) {
    const p = st.p, val = p.a * Math.pow(10, p.k);
    const near = ORDERS.reduce((b, o) => Math.abs(o.k - p.k) < Math.abs(b.k - p.k) ? o : b, ORDERS[0]);
    return `<div class="kv"><span>Стандартный вид числа</span><b>${fmt(p.a, 1)}·10${supNum(p.k)}</b></div>
    <div class="kv"><span>Значение (размер в метрах)</span><b>${sci(val, 1)} м</b></div>
    <div class="kv"><span>Обычная запись числа</span><b>${plainNumber(p.a, p.k)}${Math.abs(p.k) <= 8 ? ' м' : ''}</b></div>
    <div class="kv"><span>Мантисса и порядок</span><b>a = ${fmt(p.a, 1)} (1 ≤ a < 10), k = ${p.k}</b></div>
    <div class="kv"><span>Ближайший объект такой «величины»</span><b>${near.e} ${near.n}</b></div>
    <div class="kv"><span>Во сколько раз отличается от человека (1,7 м)</span><b>${val > 1.7 ? 'в ' + sci(val / 1.7, 1) : 'в ' + sci(1.7 / val, 1) + ' раз меньше'}</b></div>
    <div class="kv"><span>Сколько раз нужно умножить на 10</span><b>${p.k} ${p.k < 0 ? '(или делить)' : ''}</b></div>
    <div class="note">Стандартный вид — это «язык масштаба». Без него физики не смогли бы записывать ни заряд электрона (1,6·10⁻¹⁹ Кл), ни расстояние до звёзд (10²⁰ м). Математика даёт саму запись, физика и астрономия — что записывать. Такая же логарифмическая логика — в шкале децибел, в шкале Рихтера и в pH (химия).</div>`;
  }
});

/* ============================ 8. ПАРАЛЛАКС: РАССТОЯНИЕ ПО УГЛУ (9 класс, § 12) ============================ */
/* Базисы по учебнику § 12 (9 класс): D = R/sin p₀, где R — радиус Земли (горизонтальный параллакс)
   или радиус орбиты Земли (годичный параллакс). Для симметричного базиса из двух точек
   (зрачки, две обсерватории) расстояние считается как d = B/(2·tg(p/2)). */
const BASES = [
  { v: 'eye', b: .065, kind: 'base', label: 'Между зрачками — 6,5 см (стереозрение)' },
  { v: 'stations', b: 2000000, kind: 'base', label: 'Две обсерватории на Земле — 2000 км' },
  { v: 'earth', b: 6371000, kind: 'half', label: 'Радиус Земли — 6371 км (горизонтальный параллакс)' },
  { v: 'orbit', b: 1.496e11, kind: 'half', label: 'Радиус орбиты Земли — 1 а.е. (годичный параллакс)' }
];
const baseDist = (B, kind, pSec) => {
  const pRad = pSec / 206265;
  return kind === 'half' ? B / Math.sin(pRad) : B / (2 * Math.tan(pRad / 2));
};
defSim('parallax', {
  title: '🔭 Параллакс: измерить расстояние по углу',
  aspect: .58,
  theoryNote: 'Математика даёт формулу малого угла <b>D = R/sin p₀ ≈ R/p₀</b>, физика — свет и оптические приборы, астрономия — расстояния до тел Солнечной системы и звёзд (9 класс, § 12), география — триангуляция при съёмке местности, история — как измеряли размеры Земли и расстояние до Луны задолго до космических аппаратов.',
  hint: 'Сравните базисы: с базисом 6,5 см (зрачки) параллакс 0,01″ не измерить никаким прибором. Увеличивая базис, вы «покупаете» точность — поэтому годичный параллакс звезды измеряют с противоположных точек орбиты Земли.',
  params: [{ key: 'p', label: 'Угол параллакса p₀', min: .01, max: 3600, step: .01, val: .77, unit: '″ (угловая секунда)', dec: 2 }],
  selects: [{ key: 'base', label: 'Базис измерения', val: 'orbit', options: BASES.map(o => ({ v: o.v, label: o.label })) }],
  actions: [
    { label: '🏫 Доска в классе (p₀ = 8°)', run: (st, a) => { st.p.base = 'stations'; st.p.p = 3600; a.sync(); a.notify('С базисом 2000 км параллакс 1° даёт 115 000 км. Чтобы измерить расстояние до доски, нужен базис порядка метра — задание 1 из учебника (§ 12).'); } },
    { label: '🌕 Луна (p₀ = 57′)', run: (st, a) => { st.p.base = 'earth'; st.p.p = 3420; a.sync(); a.notify('Луна: базис — радиус Земли, горизонтальный параллакс 57′ = 3420″ → D = R/sin p₀ ≈ 384 000 км.'); } },
    { label: '⭐ Проксима (p₀ = 0,77″)', run: (st, a) => { st.p.base = 'orbit'; st.p.p = .77; a.sync(); a.notify('Ближайшая звезда: 1/0,77 = 1,3 пк ≈ 4,2 светового года.'); }, primary: true },
    { label: '✨ Звезда на 100 пк (p₀ = 0,01″)', run: (st, a) => { st.p.base = 'orbit'; st.p.p = .01; a.sync(); a.notify('Предел наземных измерений: 0,01″ — это монета диаметром 1 см, видимая с 200 км.'); } }
  ],
  init: () => ({ ph: 0, field: null }),
  step(st, dt) { st.ph += dt * .5; },
  draw(g, st, W, H) {
    const p = st.p, M = BASES.find(o => o.v === p.base) || BASES[3];
    const pRad = p.p / 206265, d = baseDist(M.b, M.kind, p.p);
    const big = d >= 1e12;
    G.bg(g, W, H);
    /* --- звёздное поле: смещение звезды --- */
    if (!st.field) { st.field = []; for (let i = 0; i < 90; i++) st.field.push({ x: Math.random(), y: Math.random(), r: .6 + Math.random() * 1.2, a: .3 + Math.random() * .6 }); }
    const fx = 20, fy = 30, fw = W * .44, fh = H * .38;
    G.panel(g, fx - 10, fy - 16, fw + 20, fh + 40, { fill: 'rgba(255,255,255,.04)' });
    G.txt(g, 'Звёздное поле: ближняя звезда на фоне далёких', fx - 2, fy - 2, { size: 11.5, col: '#cfe2ff' });
    st.field.forEach(sf => G.dot(g, fx + sf.x * fw, fy + sf.y * fh, sf.r, 'rgba(220,235,255,' + sf.a * .7 + ')'));
    const amp = Math.max(3, Math.min(40, 42 - 6 * Math.abs(Math.log10(p.p))));
    const shift = Math.sin(st.ph) * amp;
    const txs = fx + fw * .5 + shift, tys = fy + fh * .42;
    G.line(g, fx + fw * .5, tys + 4, fx + fw * .5, tys + 30, 'rgba(255,209,102,.30)', 1, [4, 4]);
    G.line(g, fx + fw * .5 - 30, tys, fx + fw * .5 + 30, tys, 'rgba(255,209,102,.30)', 1, [4, 4]);
    g.save(); g.beginPath(); g.arc(txs, tys, 5.5, 0, TAU); g.fillStyle = '#ffd166'; g.fill();
    g.strokeStyle = 'rgba(255,209,102,.5)'; g.lineWidth = 2; g.beginPath(); g.moveTo(txs - 11, tys); g.lineTo(txs + 11, tys); g.moveTo(txs, tys - 11); g.lineTo(txs, tys + 11); g.stroke(); g.restore();
    G.txt(g, 'одна и та же звезда видна в разных точках фона', fx + fw * .5, fy + fh + 12, { align: 'center', size: 11, col: '#8fb6ea' });
    /* --- геометрия по учебнику --- */
    const gx = W * .52, gy = 34, gw = W * .44, gh = H * .34;
    G.panel(g, gx - 14, gy - 18, gw + 40, gh + 52, { fill: 'rgba(120,200,255,.05)' });
    G.txt(g, M.kind === 'half' ? 'Прямоугольный треугольник (рис. 86 учебника)' : 'Симметричный базис из двух точек', gx - 4, gy - 4, { size: 11.5, col: '#cfe2ff' });
    const bx0 = gx + 14, bx1 = gx + gw - 14, by = gy + gh - 12;
    const apex = M.kind === 'half' ? { x: gx + gw * .78, y: gy + 30 } : { x: gx + gw * .5, y: gy + 26 };
    G.line(g, bx0, by, bx1, by, 'rgba(160,200,255,.6)', 1.6);
    if (M.kind === 'half') {
      G.line(g, bx0, by, apex.x, apex.y, 'rgba(255,209,102,.8)', 1.6);
      G.line(g, bx1, by, apex.x, apex.y, 'rgba(255,209,102,.8)', 1.6, [5, 4]);
      g.save(); g.strokeStyle = 'rgba(120,255,190,.9)'; g.lineWidth = 1.6;
      g.beginPath(); g.moveTo(apex.x - 16, apex.y + 14); g.lineTo(apex.x - 4, apex.y + 20); g.stroke(); g.restore();
      G.dot(g, bx0, by, 5, '#4cc9f0'); G.dot(g, bx1, by, 5, '#4cc9f0');
      G.txt(g, 'центр Земли (Солнца)', bx0 - 4, by + 20, { size: 10.5, col: '#4cc9f0' });
      G.txt(g, 'наблюдатель', bx1 + 4, by + 20, { align: 'right', size: 10.5, col: '#4cc9f0' });
      G.txt(g, 'R = ' + (M.b >= 1e10 ? sci(M.b, 2) + ' м' : fmt(M.b / 1000, 0) + ' км'), (bx0 + bx1) / 2, by - 8, { align: 'center', size: 11.5, col: '#4cc9f0' });
      G.txt(g, 'прямой угол', apex.x + 6, apex.y + 44, { size: 10, col: '#7effbe' });
    } else {
      G.line(g, bx0, by, apex.x, apex.y, 'rgba(255,209,102,.8)', 1.6);
      G.line(g, bx1, by, apex.x, apex.y, 'rgba(255,209,102,.8)', 1.6);
      G.line(g, apex.x, apex.y, apex.x, by, 'rgba(120,255,190,.5)', 1.2, [4, 4]);
      G.dot(g, bx0, by, 5, '#4cc9f0'); G.dot(g, bx1, by, 5, '#4cc9f0');
      G.txt(g, 'B = ' + (M.b >= 1e6 ? fmt(M.b / 1000, 0) + ' км' : fmt(M.b * 100, 1) + ' см'), (bx0 + bx1) / 2, by + 20, { align: 'center', size: 11.5, col: '#4cc9f0' });
    }
    G.dot(g, apex.x, apex.y, 5.5, '#ffd166');
    G.txt(g, 'объект', apex.x + 10, apex.y + 4, { size: 11, col: '#ffd166' });
    G.txt(g, 'p₀ = ' + fmt(p.p, p.p < 10 ? 2 : 0) + '″', apex.x - 14, apex.y + 24, { align: 'right', size: 12, col: '#ffd166', weight: 600 });
    G.txt(g, M.kind === 'half' ? 'D = R / sin p₀  ≈  R / p₀' : 'D = B / (2·tg(p₀/2))  ≈  B / p₀', gx + gw * .5, gy + gh + 30, { align: 'center', size: 12.5, col: '#7effbe', weight: 600 });
    /* --- результат --- */
    const rx = 24, ry = H * .60, rw = W * .44;
    G.panel(g, rx, ry, rw, H * .30, { fill: 'rgba(255,255,255,.05)' });
    G.txt(g, 'Расстояние до объекта', rx + 16, ry + 24, { size: 11.5, col: '#8fb6ea' });
    const shown = big ? sci(d, 2) + ' м = ' + fmt(d / 9.461e15, 2) + ' св. года' : d >= 1e9 ? fmt(d / 1e9, 2) + ' млн км' : fmt(d / 1000, 1) + ' км';
    G.txt(g, shown, rx + 16, ry + 54, { size: 19, weight: 700, col: '#ffd166' });
    G.txt(g, 'Свет летит: ' + (d / 3e8 < 3600 ? fmt(d / 3e8, 2) + ' с' : d / 3e8 < 3e5 ? fmt(d / 3e8 / 3600, 1) + ' ч' : fmt(d / 3e8 / 31557600, 2) + ' лет'), rx + 16, ry + 80, { size: 12.5, col: '#4cc9f0' });
    G.txt(g, 'В парсеках: ' + fmt(d / 3.086e16, d / 3.086e16 < 10 ? 3 : 1) + ' пк (1 пк = 3,086·10¹⁶ м)', rx + 16, ry + 102, { size: 12, col: '#9fb8dd' });
    gTxtWrap(g, 'Угол обратно пропорционален расстоянию: уменьшили p₀ вдвое — объект «уехал» вдвое дальше.', rx + 16, ry + 126, { size: 11, col: '#8fb6ea' }, rw - 32);
  },
  readout(st) {
    const p = st.p, M = BASES.find(o => o.v === p.base) || BASES[3];
    const pRad = p.p / 206265, d = baseDist(M.b, M.kind, p.p), dApprox = M.b / pRad;
    const bTxt = M.b >= 1e9 ? sci(M.b, 2) + ' м' : M.b >= 1e5 ? fmt(M.b / 1000, 0) + ' км' : fmt(M.b * 100, 1) + ' см';
    return `<div class="kv"><span>Базис измерения</span><b>${bTxt} — ${M.kind === 'half' ? 'радиус (прямоугольный треугольник)' : 'расстояние между двумя точками наблюдения'}</b></div>
    <div class="kv"><span>Угол параллакса</span><b>${fmt(p.p, 2)}″ = ${sci(pRad, 2)} рад = ${fmt(p.p / 3600, 4)}°</b></div>
    <div class="kv"><span>Формула учебника: ${M.kind === 'half' ? 'D = R / sin p₀' : 'D = B / (2·tg(p₀/2))'}</span><b>${d >= 1e9 ? sci(d, 3) + ' м' : fmt(d / 1000, 2) + ' км'}</b></div>
    <div class="kv"><span>Приближение малых углов D ≈ B / p₀ (rad)</span><b>${dApprox >= 1e9 ? sci(dApprox, 3) + ' м' : fmt(dApprox / 1000, 2) + ' км'} — отличие от точной формулы ${fmt(Math.abs(dApprox - d) / d * 100, 4)} %</b></div>
    <div class="kv"><span>Расстояние в парсеках</span><b>${fmt(d / 3.086e16, d / 3.086e16 < 10 ? 3 : 1)} пк</b></div>
    <div class="kv"><span>В световых годах</span><b>${fmt(d / 9.461e15, 3)} св. лет</b></div>
    <div class="kv"><span>Время полёта света</span><b>${d / 3e8 < 3600 ? fmt(d / 3e8, 2) + ' с' : d / 3e8 < 3e5 ? fmt(d / 3e8 / 3600, 2) + ' ч' : fmt(d / 3e8 / 31557600, 2) + ' лет'}</b></div>
    <div class="kv"><span>Контрольная проверка по учебнику</span><b>R = 1 а.е., p₀ = 1″ → D = 1 пк = 3,086·10¹⁶ м</b></div>
    <div class="note">Учебник (§ 12, 9 класс) даёт формулу <span class="f">D = R / sin p₀</span>: при малых углах sin p₀ ≈ p₀ (в радианах), поэтому D ≈ R/p₀ — обратная пропорциональность, то есть математика. Именно так определили расстояние до Луны (384 000 км) и до ближайших звёзд; 206265″ — число секунд в одном радиане. Тот же принцип работает в стереозрении человека (базис 6,5 см) и в геодезической триангуляции.</div>`;
  }
});

/* ==== extras: новые симуляторы, задания, теория ==== */
/* =====================================================================
   НОВЫЕ СИМУЛЯТОРЫ (часть 1): Архимед, радуга, ветрогенератор,
   фотосинтез, парниковый эффект
   ===================================================================== */

/* ---------- 33. Сила Архимеда (физика → история, техника, естествознание) ---------- */
defSim('buoyancy', {
  title: '⚓ Закон Архимеда: что плавает, а что тонет',
  aspect: .62,
  theoryNote: 'История просит: «Почему железный корабль плавает?» Физика отвечает формулой <b>F_A = ρ_ж·g·V_погр</b>, математика считает объём и долю погружения, а техника превращает это в суда, доки и подводные лодки.',
  hint: 'Меняйте плотность тела и жидкости. Тело плавает, когда его плотность меньше плотности жидкости: смотрите, какая доля объёма остаётся под водой.',
  params: [
    { key: 'V', label: 'Объём тела V', min: .02, max: 2, step: .01, val: .6, unit: 'м³', dec: 2 },
    { key: 'rho', label: 'Плотность тела ρ (материал)', min: 30, max: 8000, step: 10, val: 700, unit: 'кг/м³', dec: 0 },
    { key: 'rl', label: 'Плотность жидкости ρ_ж', min: 700, max: 13600, step: 5, val: 1000, unit: 'кг/м³', dec: 0 }
  ],
  actions: [
    { label: '🪵 Дуб в воде', run: (st, a) => { st.p.rho = 700; st.p.rl = 1000; st.p.V = .6; a.sync(); } },
    { label: '🧊 Лёд в воде', run: (st, a) => { st.p.rho = 900; st.p.rl = 1000; st.p.V = .8; a.sync(); } },
    { label: '🚢 «Стальной» корпус (с воздухом)', primary: true, run: (st, a) => { st.p.rho = 250; st.p.rl = 1025; st.p.V = 2; a.sync(); } },
    { label: '⚙️ Железо в ртути', run: (st, a) => { st.p.rho = 7800; st.p.rl = 13600; st.p.V = .3; a.sync(); } }
  ],
  init: () => ({ ph: 0 }),
  step(st, dt) { st.ph += dt; },
  draw(g, st, W, H) {
    const p = st.p, g0 = 9.81;
    G.bg(g, W, H);
    const x0 = W * .07, y0 = H * .16, tw = W * .86, th = H * .68;
    const yw = y0 + th * .2;                                   // уровень жидкости
    G.panel(g, x0, y0, tw, th, { fill: 'rgba(60,140,255,.10)', stroke: 'rgba(170,215,255,.45)', r: 14 });
    g.save();
    const lg = g.createLinearGradient(0, yw, 0, y0 + th);
    lg.addColorStop(0, 'rgba(90,180,255,.30)'); lg.addColorStop(1, 'rgba(30,90,190,.42)');
    g.fillStyle = lg; g.fillRect(x0 + 1, yw, tw - 2, y0 + th - yw - 1);
    g.restore();
    G.line(g, x0 + 1, yw, x0 + tw - 1, yw, '#9fd0ff', 2);
    G.txt(g, 'ρ_ж = ' + fmt(p.rl, 0) + ' кг/м³', x0 + 12, yw - 9, { size: 12.5, col: '#bfe0ff' });
    G.txt(g, 'ρ = ' + fmt(p.rho, 0) + ' кг/м³', x0 + 12, y0 + 20, { size: 12.5, col: '#ffd166' });

    const f = Math.min(1, p.rho / p.rl);                        // доля объёма под водой
    const S = Math.max(34, Math.min(H * .40, W * .26) * Math.cbrt(p.V / .6));
    const cx = x0 + tw * .5;
    let top, bot;
    if (f < 1) { bot = yw + S * f; top = bot - S; }             // плавает
    else { bot = y0 + th - 6; top = bot - S; }                  // лежит на дне
    const wob = f < 1 ? Math.sin(st.ph * 1.6) * 2.4 : 0;        // лёгкое покачивание
    G.panel(g, cx - S / 2, top + wob, S, S, { fill: 'rgba(255,209,102,.28)', stroke: '#ffd166', r: 8 });
    G.txt(g, Math.round(S) + ' px', cx, top + S / 2 + wob + 5, { align: 'center', size: 12, col: '#ffefc4' });

    const m = p.rho * p.V, Fmax = p.rl * g0 * p.V, F = p.rl * g0 * Math.min(p.V, p.V * f);
    const kA = 40 + 90 * Math.min(1, Math.abs(m - F) / Math.max(.5, Fmax));
    G.arrow(g, cx, top + S * .35 + wob, cx, top + S * .35 + wob + kA, '#fb7185', 3.2, 12);
    G.txt(g, 'Fт = ' + fmt(m * g0, 0) + ' Н', cx + 10, top + S * .35 + wob + kA, { size: 12.5, col: '#ffb3c0', weight: 700 });
    G.arrow(g, cx, Math.max(bot, yw + 6) + wob, cx, Math.max(bot, yw + 6) + wob - kA * .9, '#4cc9f0', 3.2, 12);
    G.txt(g, 'F_A = ' + fmt(F, 0) + ' Н', cx + 10, Math.max(bot, yw + 6) + wob - kA * .85, { size: 12.5, col: '#8fe3ff', weight: 700 });

    G.panel(g, W - 214, 12, 200, 74, { fill: 'rgba(9,16,32,.62)', stroke: 'rgba(160,200,255,.24)' });
    G.txt(g, 'под водой', W - 202, 32, { size: 11.5, col: '#9fb8dd' });
    G.txt(g, (f * 100).toFixed(0) + ' % объёма', W - 202, 52, { size: 16, weight: 700, col: f < 1 ? '#8fe3ff' : '#ffb3c0' });
    G.txt(g, f < 1 ? 'тело плавает' : 'тело тонет', W - 202, 72, { size: 12.5, col: f < 1 ? '#8affe0' : '#ff9d9d' });
    G.txt(g, 'история: Архимед, III в. до н.э. · техника: суда, доки, подводные лодки', 14, H - 12, { size: 11.5, col: '#7ea4d8' });
  },
  readout(st) {
    const p = st.p, g0 = 9.81, m = p.rho * p.V, Fmax = p.rl * g0 * p.V, f = Math.min(1, p.rho / p.rl);
    const cl = p.rho < p.rl ? 'ok' : (p.rho === p.rl ? 'warn' : 'bad');
    const verdict = p.rho < p.rl ? 'плавает на поверхности' : p.rho === p.rl ? 'плавает полностью погружённым (нейтральная плавучесть)' : 'тонет и ложится на дно';
    const N = p.rho > p.rl ? (m * g0 - Fmax) : 0;
    return `<div class="kv"><span>Масса тела m = ρ·V</span><b>${fmt(m, 0)} кг</b></div>
    <div class="kv"><span>Сила тяжести Fт = m·g</span><b>${fmt(m * g0, 0)} Н</b></div>
    <div class="kv"><span>Максимальная сила Архимеда (при полном погружении)</span><b>${fmt(Fmax, 0)} Н</b></div>
    <div class="kv long"><span>Сила Архимеда в равновесии F_A = ρ_ж·g·V_погр</span><b>${fmt(Math.min(m * g0, Fmax), 0)} Н</b></div>
    <div class="kv key"><span>Что происходит</span><b><span class="badge ${cl}">${verdict}</span></b></div>
    <div class="kv"><span>Доля объёма под водой</span><b>${(f * 100).toFixed(1)} %</b></div>
    ${N ? `<div class="kv"><span>Сила давления на дно (вес «в жидкости»)</span><b>${fmt(N, 0)} Н — то есть в ${fmt(m * g0 / Math.max(1, N), 1)} раз меньше</b></div>` : ''}
    <div class="kv long"><span>Сравните с железным листом: 1 м³ сплошного железа весит ${fmt(7800 * g0, 0)} Н и тонет. Но если тот же металл превратить в корпус объёмом 20 м³ (плотность «средняя» ≈ 390 кг/м³), он поплывёт: корпус вытесняет 20 м³ воды. Так устроен и корабль, и подводная лодка (заполняя балластные цистерны, меняют среднюю плотность).</span><b>ρ_composite = m / V_корпуса</b></div>
    <div class="note">🧭 <b>Мостик:</b> история — Архимед и «эврика», закон плавания тел в трактате «О плавающих телах»; техника — расчёт осадки и грузоподъёмности судна; математика — пропорция V_погр/V = ρ_тела/ρ_жидкости.</div>`;
  }
});

/* ---------- 34. Радуга: дисперсия, капля и геометрия ---------- */
defSim('rainbow', {
  title: '🌈 Радуга: дисперсия, капля и геометрия',
  aspect: .6,
  theoryNote: 'Радуга — это <b>оптика</b> (преломление и полное внутреннее отражение), <b>геометрия</b> (угол 42°), <b>география</b> (Солнце сзади и низко) и <b>искусство</b> (порядок спектра). Белый свет в капле раскладывается в спектр, и каждый цвет выходит под своим углом.',
  hint: 'Красный выходит под 42°, фиолетовый — под 40,7°. При двух внутренних отражениях появляется вторая радуга: она выше (≈51°), тусклее и с обратным порядком цветов.',
  params: [
    { key: 'sun', label: 'Высота Солнца над горизонтом', min: 3, max: 45, step: 1, val: 20, unit: '°', dec: 0 },
    { key: 'refl', label: 'Внутренних отражений в капле', min: 1, max: 2, step: 1, val: 1, dec: 0 }
  ],
  actions: [
    { label: 'Первая радуга (1 отражение)', primary: true, run: (st, a) => { st.p.refl = 1; a.sync(); } },
    { label: 'Вторая радуга (2 отражения)', run: (st, a) => { st.p.refl = 2; a.sync(); } }
  ],
  /* геометрия капли: при k внутренних отражениях угол максимальной яркости */
  _geom(n, k) {
    const C = (n * n - 1) / (k === 1 ? 3 : 8);
    const i = Math.acos(Math.min(1, Math.sqrt(Math.max(0, C))));
    const r = Math.asin(Math.min(1, Math.sin(i) / n));
    const dev = Math.abs(2 * i - 2 * (k + 1) * r) * R2D;
    return { i: i, r: r, ang: k === 1 ? dev : Math.abs(180 - dev) };
  },
  devAngle(n, k) { return this._geom(n, k).ang; },
  _rot(v, a) { const c = Math.cos(a), s = Math.sin(a); return { x: v.x * c - v.y * s, y: v.x * s + v.y * c }; },
  _unit(v) { const m = Math.hypot(v.x, v.y) || 1; return { x: v.x / m, y: v.y / m }; },
  draw(g, st, W, H) {
    const p = st.p, N1 = 1.331, N2 = 1.343;                     // красный … фиолетовый
    const cols = ['#ff3b30', '#ff9500', '#ffd60a', '#34c759', '#0a84ff', '#5e5ce6', '#af52de'];
    G.bg(g, W, H);
    const hor = H * .74;
    const sky = g.createLinearGradient(0, 0, 0, hor);
    sky.addColorStop(0, 'rgba(20,40,80,.9)'); sky.addColorStop(1, 'rgba(60,90,140,.65)');
    g.fillStyle = sky; g.fillRect(0, 0, W, hor);
    g.fillStyle = 'rgba(20,40,24,.85)'; g.fillRect(0, hor, W, H - hor);
    G.line(g, 0, hor, W, hor, 'rgba(140,200,255,.4)', 1.6);

    /* ---- Солнце и наблюдатель ---- */
    const sA = p.sun * D2R;
    const sunX = W * .055, sunY = Math.max(20, hor - Math.tan(sA) * (W * .10));
    G.dot(g, sunX, sunY, 15, '#ffd166', 'rgba(255,240,200,.6)');
    G.txt(g, 'Солнце ' + fmt(p.sun, 0) + '°', sunX, sunY + 30, { align: 'center', size: 12, col: '#ffe6a0' });
    const obsX = W * .70, obsY = hor;
    G.dot(g, obsX, obsY, 6, '#eaf1ff', '#5b8cff');
    G.txt(g, 'наблюдатель', obsX, obsY + 20, { align: 'center', size: 11.5, col: '#cfe2ff' });
    G.line(g, obsX, obsY, Math.max(8, obsX - 230), obsY, 'rgba(255,255,255,.25)', 1, [5, 5]);
    G.txt(g, 'противосолнечная точка', obsX - 165, obsY + 20, { align: 'center', size: 11, col: '#9fb8dd' });

    /* ---- дуга радуги: радиус пропорционален углу ---- */
    const A1 = this.devAngle(N1, p.refl);
    const R1 = 190;
    for (let i = cols.length - 1; i >= 0; i--) {
      const nC = N1 + (N2 - N1) * i / (cols.length - 1);
      const ang = this.devAngle(nC, p.refl);
      const rr = R1 * (ang / A1) * (p.refl === 2 ? .96 : .78);
      g.save(); g.beginPath();
      g.arc(obsX, obsY, rr, Math.PI * .98, Math.PI * 1.52);
      g.strokeStyle = cols[i]; g.lineWidth = 8; g.globalAlpha = p.refl === 1 ? .85 : .5; g.stroke(); g.restore();
    }
    G.txt(g, (p.refl === 1 ? 'первая радуга: ' : 'вторая радуга: ') + fmt(A1, 1) + '°', obsX - R1 * .76, obsY - R1 * 1.00, { size: 12.5, weight: 700, col: '#dbe9ff' });
    G.txt(g, 'от противосолнечной точки', obsX - R1 * .76, obsY - R1 * .88, { size: 11, col: '#9fb8dd' });

    /* ---- капля крупным планом: честный ход луча ---- */
    const dx2 = W * .23, dy2 = H * .58, R2x = Math.min(W * .105, H * .17);
    G.dot(g, dx2, dy2, R2x, 'rgba(90,180,255,.16)', 'rgba(170,220,255,.7)');
    G.txt(g, 'капля воды (сильно увеличено)', dx2, Math.max(16, dy2 - R2x - 12), { align: 'center', size: 12, col: '#bfe0ff' });
    const dIn = this._unit({ x: 1, y: .16 });
    const mLab = this._geom(1.337, p.refl);
    const radialIn = this._rot(dIn, -mLab.i);
    const P1 = { x: dx2 - radialIn.x * R2x, y: dy2 - radialIn.y * R2x };
    G.arrow(g, Math.max(6, P1.x - dIn.x * R2x * 1.5), P1.y - dIn.y * R2x * 1.5, P1.x, P1.y, '#fff7d6', 2.6, 10);
    G.txt(g, 'белый', 10, P1.y - dIn.y * R2x * 1.5 + 30, { size: 11.5, col: '#fff7d6' });
    G.txt(g, 'луч', 10, P1.y - dIn.y * R2x * 1.5 + 45, { size: 11.5, col: '#fff7d6' });
    const norm = v => { const a = Math.atan2(v.y, v.x); return v; };
    const angOf = v => Math.atan2(v.y, v.x);
    const wrap = a => Math.atan2(Math.sin(a), Math.cos(a));
    cols.forEach((col, ci) => {
      const nC = N1 + (N2 - N1) * ci / (cols.length - 1);
      const gm = this._geom(nC, p.refl);
      /* внутри капли луч идёт с той стороны от нормали, что и падающий */
      const aN = angOf(radialIn), aD = angOf(dIn);
      const sgn = Math.sign(wrap(aD - aN)) || 1;
      let dir = { x: Math.cos(aN + sgn * gm.r), y: Math.sin(aN + sgn * gm.r) };
      let P = P1; const pts = [P1];
      for (let s2 = 0; s2 < p.refl + 1; s2++) {
        const chord = Math.abs(2 * R2x * Math.cos(gm.r));
        P = { x: P.x + dir.x * chord, y: P.y + dir.y * chord };
        pts.push(P);
        const nrm = this._unit({ x: (P.x - dx2) / R2x, y: (P.y - dy2) / R2x });
        const d2 = dir.x * nrm.x + dir.y * nrm.y;
        dir = { x: dir.x - 2 * d2 * nrm.x, y: dir.y - 2 * d2 * nrm.y };      // отражение
      }
      g.save(); g.beginPath(); g.moveTo(pts[0].x, pts[0].y);
      for (let k2 = 1; k2 < pts.length; k2++) g.lineTo(pts[k2].x, pts[k2].y);
      g.strokeStyle = col; g.lineWidth = 1.6; g.globalAlpha = .95; g.stroke(); g.restore();
      /* выход наружу: преломление, луч «отходит» от нормали */
      const Pn = pts[pts.length - 1];
      const nOut = this._unit({ x: (Pn.x - dx2) / R2x, y: (Pn.y - dy2) / R2x });
      const prev = this._unit({ x: Pn.x - pts[pts.length - 2].x, y: Pn.y - pts[pts.length - 2].y });
      const sgn2 = Math.sign(wrap(angOf(prev) - angOf(nOut))) || 1;
      const out = { x: Math.cos(angOf(nOut) + sgn2 * gm.i), y: Math.sin(angOf(nOut) + sgn2 * gm.i) };
      G.arrow(g, Pn.x, Pn.y, Pn.x + out.x * R2x * 1.5, Pn.y + out.y * R2x * 1.5, col, 1.7, 7);
    });
    /* направляющая: полная «радужная окружность» */
    g.save(); g.beginPath(); g.arc(obsX, obsY, R1 * .78, Math.PI, Math.PI * 2);
    g.strokeStyle = 'rgba(200,225,255,.16)'; g.lineWidth = 1.2; g.setLineDash([4, 5]); g.stroke(); g.restore();
    G.txt(g, p.refl === 1 ? 'внутри — одно отражение от «спинки» капли' : 'внутри — два отражения: свет тусклее, порядок цветов обратный',
      dx2, Math.min(H - 10, dy2 + R2x + 26), { align: 'center', size: 11.5, col: '#9fb8dd' });
  },
  readout(st) {
    const p = st.p, N1 = 1.331, N2 = 1.343;
    const aR = this.devAngle(N1, p.refl), aV = this.devAngle(N2, p.refl);
    const g1 = this._geom(1.337, p.refl);
    return `<div class="kv"><span>Углы в капле: падения i, преломления r</span><b>i = ${fmt(g1.i * R2D, 1)}°, r = ${fmt(g1.r * R2D, 1)}°</b></div>
    <div class="kv"><span>Угол красной полосы (n = 1,331)</span><b>${fmt(aR, 1)}°</b></div>
    <div class="kv"><span>Угол фиолетовой полосы (n = 1,343)</span><b>${fmt(aV, 1)}°</b></div>
    <div class="kv key"><span>Ширина радуги</span><b>${fmt(Math.abs(aR - aV), 2)}° — вот почему виден весь спектр</b></div>
    <div class="kv"><span>Порядок цветов</span><b>${p.refl === 1 ? 'снаружи красный → внутри фиолетовый' : 'обратный: снаружи фиолетовый → внутри красный'}</b></div>
    <div class="kv"><span>Где искать радугу</span><b>Солнце за спиной, высота ${fmt(p.sun, 0)}° → дуга поднимается на ${fmt(Math.max(0, (p.refl === 1 ? 42 : 51) - p.sun), 0)}° над горизонтом</b></div>
    <div class="note">🌈 Радуга — не предмет, а <b>направление</b>: каждая капля отправляет к наблюдателю только один цвет под своим углом. Поэтому до радуги нельзя дойти — при движении она «отодвигается». Вторая радуга появляется при двух внутренних отражениях: она выше (≈51°), тусклее и с обратным порядком цветов — так физика объясняет то, что поэты называют «двойным чудом». Между двумя радугами небо темнее: там свет «потерялся» внутри капель.</div>`;
  }
});

/* ---------- 35. Ветрогенератор (экология, техника, география) ---------- */
defSim('windmill', {
  title: '🌬 Ветрогенератор: сколько энергии в ветре',
  aspect: .56,
  theoryNote: 'Мощность ветра растёт как <b>куб скорости</b>: P = ½ρAv³. Это физика (энергия потока), математика (кубическая функция), география (где дует) и экология (чистая энергия вместо угля).',
  hint: 'Увеличьте скорость ветра — мощность вырастет в 8 раз при удвоении v. Обратите внимание: ниже 3 м/с турбина вообще не работает, а выше 25 м/с её останавливают.',
  params: [
    { key: 'v', label: 'Скорость ветра v', min: 0, max: 30, step: .5, val: 9, unit: 'м/с', dec: 1 },
    { key: 'D', label: 'Диаметр ротора D', min: 10, max: 130, step: 1, val: 90, unit: 'м', dec: 0 },
    { key: 'rho', label: 'Плотность воздуха ρ', min: 1, max: 1.3, step: .005, val: 1.225, unit: 'кг/м³', dec: 3 }
  ],
  actions: [
    { label: '🏙 Слабый ветер (площадка в городе)', run: (st, a) => { st.p.v = 4; a.sync(); } },
    { label: '🌾 Типичная ВЭС (степь)', run: (st, a) => { st.p.v = 9; st.p.rho = 1.225; a.sync(); } },
    { label: '⛰ Высокогорье (−20 °C, 2000 м)', primary: true, run: (st, a) => { st.p.v = 13; st.p.rho = 1.0; a.sync(); } },
    { label: '🌀 Шторм — турбина остановлена', run: (st, a) => { st.p.v = 27; a.sync(); } }
  ],
  init: () => ({ ph: 0 }),
  step(st, dt) { st.ph += dt * (0.35 + st.p.v * 0.09); },
  draw(g, st, W, H) {
    const p = st.p;
    G.bg(g, W, H);
    const CP = .45, cut = 3, cutout = 25, rated = 12.5;
    const A = Math.PI * p.D * p.D / 4;
    const Pth = .5 * p.rho * A * p.v ** 3;
    const P = (p.v < cut || p.v > cutout) ? 0 : Math.min(Pth * CP, .5 * p.rho * A * rated ** 3 * CP);
    /* ---- земля и башня ---- */
    const ground = H * .84;
    g.fillStyle = 'rgba(24,44,30,.85)'; g.fillRect(0, ground, W, H - ground);
    const hx = W * .30, towerH = H * .56, hubY = ground - towerH;
    G.line(g, hx - 26, ground, hx, ground, 'rgba(180,220,255,.35)', 2);
    g.beginPath(); g.moveTo(hx - 8, ground); g.lineTo(hx - 3, hubY); g.lineTo(hx + 3, hubY); g.lineTo(hx + 8, ground); g.closePath();
    g.fillStyle = 'rgba(220,235,255,.85)'; g.fill();
    /* ---- лопасти ---- */
    const R = Math.min(W * .13, H * .24) * (p.D / 90);
    const spin = st.ph;
    for (let k = 0; k < 3; k++) {
      const a = spin + k * TAU / 3;
      const x1 = hx + Math.cos(a) * R, y1 = hubY + Math.sin(a) * R;
      g.save(); g.beginPath();
      g.moveTo(hx, hubY);
      g.quadraticCurveTo(hx + Math.cos(a + .18) * R * .62, hubY + Math.sin(a + .18) * R * .62, x1, y1);
      g.quadraticCurveTo(hx + Math.cos(a - .06) * R * .58, hubY + Math.sin(a - .06) * R * .58, hx, hubY);
      g.fillStyle = P > 0 ? 'rgba(180,225,255,.92)' : 'rgba(150,170,200,.5)'; g.fill(); g.restore();
    }
    G.dot(g, hx, hubY, 7, '#eaf1ff', '#5b8cff');
    G.txt(g, 'D = ' + fmt(p.D, 0) + ' м', hx, ground + 18, { align: 'center', size: 12, col: '#bfe0ff' });
    /* ---- ветер ---- */
    const wcol = p.v > cutout ? 'rgba(251,113,133,.8)' : 'rgba(140,220,255,.55)';
    for (let k = 0; k < 7; k++) {
      const y = H * .12 + k * (H * .62 / 7);
      const off = (st.ph * (10 + p.v * 3)) % (W * .62);
      const x = (W * .62 - off + W) % W;
      G.arrow(g, Math.max(6, x - 40), y, Math.max(30, x), y, wcol, 1.8, 8);
    }
    G.txt(g, 'v = ' + fmt(p.v, 1) + ' м/с' + (p.v > cutout ? ' — СТОП (шторм)' : p.v < cut ? ' — слишком слабо' : ''), 12, H * .08, { size: 13, weight: 700, col: p.v > cutout ? '#ffb3c0' : '#8fe3ff' });
    /* ---- график мощности ---- */
    const gx = W * .62, gy = H * .16, gw = W * .34, gh = H * .52;
    G.panel(g, gx - 10, gy - 22, gw + 20, gh + 46, { fill: 'rgba(9,16,32,.5)' });
    G.txt(g, 'P(v) — кубическая зависимость', gx, gy - 6, { size: 11.5, col: '#9fb8dd' });
    const vmax = 30, Pmax = .5 * p.rho * A * rated ** 3 * CP;
    G.line(g, gx, gy + gh, gx + gw, gy + gh, 'rgba(150,190,240,.45)', 1.2);
    G.line(g, gx, gy, gx, gy + gh, 'rgba(150,190,240,.45)', 1.2);
    g.save(); g.beginPath();
    for (let i = 0; i <= 100; i++) {
      const vv = vmax * i / 100;
      const pp = (vv < cut || vv > cutout) ? 0 : Math.min(.5 * p.rho * A * vv ** 3 * CP, Pmax);
      const X = gx + gw * vv / vmax, Y = gy + gh - gh * Math.min(1, pp / Math.max(1, Pmax));
      i ? g.lineTo(X, Y) : g.moveTo(X, Y);
    }
    g.strokeStyle = '#ffd166'; g.lineWidth = 2.4; g.stroke(); g.restore();
    const mx = gx + gw * p.v / vmax, my = gy + gh - gh * Math.min(1, P / Math.max(1, Pmax));
    G.dot(g, mx, my, 5.5, '#8affe0', '#0d1626');
    G.txt(g, fmt(P / 1e6, 2) + ' МВт', mx + 8, my - 8, { size: 12.5, weight: 700, col: '#8affe0' });
    G.txt(g, 'при 12,5 м/с турбина выходит на номинал', gx, gy + gh + 20, { size: 10.8, col: '#7ea4d8' });
  },
  readout(st) {
    const p = st.p, CP = .45, cut = 3, cutout = 25, rated = 12.5;
    const A = Math.PI * p.D * p.D / 4, Pth = .5 * p.rho * A * p.v ** 3;
    const P = (p.v < cut || p.v > cutout) ? 0 : Math.min(Pth * CP, .5 * p.rho * A * rated ** 3 * CP);
    const betz = Pth * 16 / 27;
    const year = P * 8760 * .35 / 3.6e6;                          // млн кВт·ч при КИУМ 35 %
    return `<div class="kv"><span>Ометаемая площадь A = πD²/4</span><b>${fmt(A, 0)} м²</b></div>
    <div class="kv long"><span>Мощность потока P_потока = ½ρAv³</span><b>${fmt(Pth / 1e6, 2)} МВт</b></div>
    <div class="kv"><span>Предел Бетца (16/27)</span><b>${fmt(betz / 1e6, 2)} МВт — больше забрать нельзя</b></div>
    <div class="kv key"><span>Реальная мощность установки (КПД 45 %)</span><b>${fmt(P / 1e6, 2)} МВт</b></div>
    <div class="kv"><span>При удвоении скорости ветра мощность</span><b>вырастет в 8 раз (2³)</b></div>
    <div class="kv"><span>Зона работы турбины</span><b>3…25 м/с; сейчас ${p.v < cut ? 'ниже порога — генератор стоит' : p.v > cutout ? 'штормовой ветер — аварийная остановка' : 'рабочий режим'}</b></div>
    <div class="kv long"><span>Годовая выработка при коэффициенте использования 35 %</span><b>≈ ${fmt(year, 1)} млн кВт·ч — это питание ${fmt(year * 1e6 / 1100, 0)} квартир (по 1100 кВт·ч в год каждая)</b></div>
    <div class="note">🌍 <b>Мостик:</b> география отвечает на вопрос «где строить» (среднегодовая скорость ветра, роза ветров), техника — «какой ротор и редуктор», экология — «сколько CO₂ не попало в атмосферу», математика — «как выглядит кубическая функция P(v)». Один ползунок связывает четыре предмета.</div>`;
  }
});

/* ---------- 36. Фотосинтез (биология, химия, экология) ---------- */
defSim('photosynth', {
  title: '🍃 Фотосинтез: свет превращается в еду',
  aspect: .58,
  theoryNote: 'Это главный энергетический мост между физикой, химией и биологией: <b>кванты света</b> → <b>химическая реакция</b> 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ → <b>жизнь</b> и кислород атмосферы.',
  hint: 'Насыщения нет только у света: до определённого уровня скорость растёт, потом упирается в «бутылочное горлышко» — CO₂ или температуру. Найдите, что ограничивает рост сейчас.',
  params: [
    { key: 'I', label: 'Освещённость (доля от полного солнца)', min: 0, max: 100, step: 1, val: 60, unit: '%', dec: 0 },
    { key: 'co2', label: 'Концентрация CO₂', min: 150, max: 1500, step: 10, val: 420, unit: 'ppm', dec: 0 },
    { key: 'T', label: 'Температура листа', min: 2, max: 45, step: 1, val: 24, unit: '°C', dec: 0 }
  ],
  actions: [
    { label: '☁️ Пасмурный день', run: (st, a) => { st.p.I = 18; st.p.T = 16; a.sync(); } },
    { label: '☀️ Ясный полдень', primary: true, run: (st, a) => { st.p.I = 95; st.p.T = 26; st.p.co2 = 420; a.sync(); } },
    { label: '🔥 Жара +40 °C (устьица закрыты)', run: (st, a) => { st.p.T = 40; st.p.co2 = 420; a.sync(); } },
    { label: '🏭 Теплица с подкормкой CO₂ (800 ppm)', run: (st, a) => { st.p.co2 = 800; st.p.I = 70; st.p.T = 24; a.sync(); } }
  ],
  init: () => ({ ph: 0, oxy: [] }),
  step(st, dt) {
    st.ph += dt;
    const R = this.rate ? this.rate(st.p) : 0;
    if (Math.random() < R * dt * .9) st.oxy.push({ x: .15 + Math.random() * .7, y: .82, r: 0 });
    st.oxy = st.oxy.filter(o => (o.r += dt * .34) < 1);
  },
  rate(p) {
    const fLight = p.I / (p.I + 22);
    const fCO2 = p.co2 / (p.co2 + 190);
    const fT = Math.exp(-Math.pow((p.T - 25) / 13, 2));
    return Math.max(0, fLight * fCO2 * fT);
  },
  draw(g, st, W, H) {
    const p = st.p;
    G.bg(g, W, H);
    const R = this.rate(p);
    /* ---- солнце и лучи ---- */
    G.dot(g, W * .12, H * .13, 20, 'rgba(255,209,102,.85)', 'rgba(255,240,200,.5)');
    for (let k = 0; k < 7; k++) {
      const y = H * .10 + k * (H * .34 / 7);
      const x = W * .20 + ((st.ph * 90 + k * 60) % (W * .5));
      G.dot(g, x, y, 3.4, 'rgba(255,230,150,.95)');
    }
    G.txt(g, 'кванты света', W * .20, H * .06, { size: 12, col: '#ffe6a0' });
    /* ---- лист ---- */
    const lx = W * .10, ly = H * .28, lw = W * .80, lh = H * .38;
    g.save();
    g.beginPath();
    g.ellipse(lx + lw / 2, ly + lh / 2, lw / 2, lh / 2, 0, 0, TAU);
    const lg = g.createLinearGradient(0, ly, 0, ly + lh);
    lg.addColorStop(0, 'rgba(60,160,90,.55)'); lg.addColorStop(1, 'rgba(20,90,50,.7)');
    g.fillStyle = lg; g.fill(); g.strokeStyle = 'rgba(140,230,170,.6)'; g.lineWidth = 1.6; g.stroke(); g.restore();
    G.line(g, lx + lw * .5, ly + 6, lx + lw * .5, ly + lh - 6, 'rgba(200,255,220,.35)', 2);
    /* хлоропласты: чем выше освещённость, тем активнее */
    for (let i = 0; i < 22; i++) {
      const a = i * 2.399, rr = Math.sqrt(i / 22) * .44;
      const cx2 = lx + lw * (.5 + Math.cos(a) * rr), cy2 = ly + lh * (.5 + Math.sin(a) * rr * .8);
      const pulse = .5 + .5 * Math.sin(st.ph * 2.2 + i);
      G.dot(g, cx2, cy2, 4.6, `rgba(${40 + 60 * pulse | 0},${140 + 80 * R * pulse | 0},${70 + 40 * pulse | 0},.9)`);
    }
    G.txt(g, 'в хлоропластах идёт реакция: 6CO₂ + 6H₂O + свет → C₆H₁₂O₆ + 6O₂', W * .5, ly + lh + 20, { align: 'center', size: 12, col: '#cfe9d8' });
    /* ---- пузырьки кислорода ---- */
    st.oxy.forEach(o => {
      const x = lx + lw * o.x, y = ly + lh * (o.y - o.r * .9);
      G.dot(g, x, y, 4.5, 'rgba(190,240,255,.85)', 'rgba(120,200,255,.8)');
    });
    G.txt(g, 'O₂ ↑', lx + lw - 40, ly + 14, { size: 13, weight: 700, col: '#bfeaff' });
    /* ---- «узкое место» ---- */
    const fL = p.I / (p.I + 22), fC = p.co2 / (p.co2 + 190), fT = Math.exp(-Math.pow((p.T - 25) / 13, 2));
    const lim = (fC < fL && fC < fT) ? 'CO₂' : (fT < fL ? 'температура' : 'свет');
    G.panel(g, W * .60, H * .03, W * .37, 52, { fill: 'rgba(9,16,32,.6)' });
    G.txt(g, 'ограничивает сейчас', W * .62, H * .03 + 18, { size: 11, col: '#9fb8dd' });
    G.txt(g, lim, W * .62, H * .03 + 38, { size: 15, weight: 700, col: lim === 'температура' ? '#ffb3c0' : '#8affe0' });

    /* ---- график скорости от света ---- */
    const gx = W * .08, gy = H * .78, gw = W * .84, gh = H * .17;
    G.panel(g, gx - 8, gy - 16, gw + 16, gh + 30, { fill: 'rgba(9,16,32,.45)' });
    G.txt(g, 'скорость фотосинтеза, отн. ед.', gx, gy - 3, { size: 11, col: '#9fb8dd' });
    g.save(); g.beginPath();
    for (let i = 0; i <= 100; i++) {
      const I2 = i, r2 = this.rate({ I: I2, co2: p.co2, T: p.T });
      const X = gx + gw * i / 100, Y = gy + gh - gh * r2;
      i ? g.lineTo(X, Y) : g.moveTo(X, Y);
    }
    g.strokeStyle = '#8affe0'; g.lineWidth = 2.2; g.stroke(); g.restore();
    G.line(g, gx, gy + gh, gx + gw, gy + gh, 'rgba(150,190,240,.4)', 1);
    G.dot(g, gx + gw * p.I / 100, gy + gh - gh * R, 5.5, '#ffd166', '#0d1626');
    G.txt(g, 'сейчас: ' + fmt(R * 100, 0) + ' % от максимума', gx + gw * p.I / 100 + 8, gy + gh - gh * R - 8, { size: 12, weight: 700, col: '#ffd166' });
  },
  readout(st) {
    const p = st.p, R = this.rate(p);
    const leafCm2 = 100, umol = R * 22 * leafCm2;                  // мкмоль CO₂ в секунду для листа 100 см²
    const sugarPerHour = umol * 3600 * 180 / 6 / 1e6;              // мг глюкозы в час (упрощённо)
    return `<div class="kv long"><span>Уравнение фотосинтеза</span><b>6CO₂ + 6H₂O + 2870 кДж → C₆H₁₂O₆ + 6O₂</b></div>
    <div class="kv key"><span>Скорость при текущих условиях</span><b>${fmt(R * 100, 1)} % от максимума</b></div>
    <div class="kv"><span>Поглощение CO₂ листом 100 см²</span><b>≈ ${fmt(umol, 1)} мкмоль/с</b></div>
    <div class="kv"><span>Запасается энергии (в глюкозе)</span><b>≈ ${fmt(sugarPerHour, 0)} мг глюкозы в час</b></div>
    <div class="kv"><span>Квантовый расход</span><b>8–10 фотонов на одну молекулу O₂</b></div>
    <div class="kv"><span>КПД фотосинтеза</span><b>1–2 % от энергии падающего света (у культур — до 3–4 %)</b></div>
    <div class="kv long"><span>Почему скорость не растёт бесконечно</span><b>свет насыщает реакционные центры (кривая выходит на плато), а при 40 °C ферменты теряют активность и устьица закрываются — приходит «фото呼吸ная» трата</b></div>
    <div class="note">🌱 <b>Мостик:</b> физика даёт квант и энергию (2870 кДж на моль), химия — уравнение реакции и стехиометрию, биология — ферменты, устьица и хлоропласты, экология — кислород атмосферы и «зелёный» углеродный баланс, география — распределение солнечной энергии по широтам.</div>`;
  }
});

/* ---------- 37. Парниковый эффект (экология, география, естествознание) ---------- */
defSim('greenhouse', {
  title: '🌡 Парниковый эффект: энергетический баланс Земли',
  aspect: .58,
  theoryNote: 'Земля получает от Солнца столько же, сколько отдаёт — но часть теплового (инфракрасного) излучения возвращается атмосферой. Физика считает баланс, химия знает молекулы-парниковые газы, география — последствия, экология — решения.',
  hint: 'Уберите парниковые газы полностью — Земля остынет до −18 °C. Удвойте CO₂ с 280 до 560 ppm — потеплеет примерно на 3 °C.',
  params: [
    { key: 'co2', label: 'Концентрация CO₂', min: 100, max: 1200, step: 5, val: 420, unit: 'ppm', dec: 0 },
    { key: 'albedo', label: 'Альбедо (отражательная способность)', min: .1, max: .55, step: .01, val: .3, dec: 2 },
    { key: 'ch4', label: 'Вклад CH₄ и N₂O (множитель)', min: 0, max: 1, step: .05, val: .35, dec: 2 }
  ],
  actions: [
    { label: '🏔 Доиндустриальная эпоха (280 ppm)', run: (st, a) => { st.p.co2 = 280; st.p.ch4 = 0; a.sync(); } },
    { label: '📍 Сегодня (420 ppm)', primary: true, run: (st, a) => { st.p.co2 = 420; a.sync(); } },
    { label: '⚠️ Путь без сокращений (800 ppm)', run: (st, a) => { st.p.co2 = 800; a.sync(); } }
  ],
  init: () => ({ ph: 0 }),
  step(st, dt) { st.ph += dt; },
  model(p) {
    const S = 1361, Q = S / 4;                                     // средний поток на 1 м²
    const absorbed = Q * (1 - p.albedo);
    const T0 = Math.pow(absorbed / 5.67e-8, .25) - 273.15;          // эффективная температура без парниковых газов
    const dT = 2.9 * Math.log(p.co2 / 280) / Math.LN2 * (1 + p.ch4 * .8);
    return { S, Q, absorbed, T0, T: T0 + 33 + dT, dT };
  },
  draw(g, st, W, H) {
    const p = st.p, M = this.model(p);
    G.bg(g, W, H);
    /* ---- космос и Солнце ---- */
    G.dot(g, W * .10, H * .12, 17, '#ffd166', 'rgba(255,240,200,.55)');
    G.txt(g, 'Солнце: 1361 Вт/м²', W * .10, H * .12 - 26, { align: 'center', size: 11.5, col: '#ffe6a0' });
    for (let k = 0; k < 6; k++) {
      const y = H * .17 + k * 9, off = (st.ph * 60 + k * 70) % (W * .5);
      G.arrow(g, W * .16 + off - 40, y, W * .16 + off, y, 'rgba(255,230,150,.7)', 1.6, 7);
    }
    /* ---- поверхность Земли ---- */
    const gy2 = H * .70;
    g.save();
    const lg = g.createLinearGradient(0, gy2, 0, H);
    lg.addColorStop(0, 'rgba(40,90,60,.9)'); lg.addColorStop(1, 'rgba(15,45,35,.95)');
    g.fillStyle = lg; g.fillRect(0, gy2, W, H - gy2); g.restore();
    g.beginPath(); g.arc(W * .5, gy2 + W * 1.4, W * 1.4, Math.PI * 1.05, Math.PI * 1.95); g.strokeStyle = 'rgba(160,240,190,.35)'; g.lineWidth = 2; g.stroke();
    G.txt(g, 'поверхность Земли: ' + fmt(M.T, 1) + ' °C', 14, gy2 - 8, { size: 13, weight: 700, col: '#8affe0' });
    /* ---- отражённая короткая волна ---- */
    const refK = .7 + p.albedo;
    G.arrow(g, W * .30, H * .28, W * .16, H * .12, 'rgba(255,255,255,' + (.25 + p.albedo * .6).toFixed(2) + ')', 2, 8);
    G.txt(g, 'отражено (альбедо ' + fmt(p.albedo * 100, 0) + ' %)', W * .30, H * .30, { size: 11, col: '#cfe2ff' });
    /* ---- инфракрасное излучение ---- */
    const nIR = 5;
    for (let k = 0; k < nIR; k++) {
      const x = W * .16 + k * (W * .68 / (nIR - 1));
      const trap = p.co2 > 150;
      G.arrow(g, x, gy2 - 12, x, H * .34, 'rgba(255,140,120,.85)', 1.8, 8);
      if (trap) {
        const back = .30 + Math.min(.5, p.co2 / 1200 * .7) + p.ch4 * .12;
        G.arrow(g, x + 12, H * .34, x + 12, gy2 - 16, 'rgba(255,190,120,' + back.toFixed(2) + ')', 1.6, 8, 'dash');
      }
    }
    G.txt(g, 'тепловое (ИК) излучение Земли', W * .62, gy2 - 26, { size: 11.5, col: '#ffb59b' });
    /* ---- слой парниковых газов ---- */
    g.save();
    const al = .10 + Math.min(.5, p.co2 / 1200 * .55) + p.ch4 * .08;
    g.fillStyle = 'rgba(120,160,255,' + al.toFixed(2) + ')';
    g.fillRect(0, H * .30, W, H * .10);
    g.restore();
    G.line(g, 0, H * .30, W, H * .30, 'rgba(170,200,255,.5)', 1);
    G.line(g, 0, H * .40, W, H * .40, 'rgba(170,200,255,.5)', 1);
    G.txt(g, 'атмосфера: CO₂ ' + fmt(p.co2, 0) + ' ppm, CH₄ и N₂O ×' + fmt(p.ch4, 2), W * .5, H * .35, { align: 'center', size: 12, col: '#dbe9ff' });
    /* ---- термометр ---- */
    const tx = W * .90, ty0 = H * .16, ty1 = gy2 - 10;
    G.panel(g, tx - 12, ty0, 24, ty1 - ty0, { fill: 'rgba(9,16,32,.6)', r: 12 });
    const frac = Math.max(0, Math.min(1, (M.T + 30) / 90));
    g.fillStyle = '#fb7185'; g.fillRect(tx - 7, ty1 - (ty1 - ty0) * frac, 14, (ty1 - ty0) * frac);
    G.txt(g, fmt(M.T, 0) + '°', tx, ty0 - 8, { align: 'center', size: 13, weight: 700, col: '#ffb3c0' });
    G.txt(g, M.dT >= 0 ? '+' + fmt(M.dT, 1) + ' °C к доиндустриальному' : fmt(M.dT, 1) + ' °C', tx, ty1 + 20, { align: 'center', size: 11, col: '#ffb3c0' });
    G.panel(g, 14, 12, 244, 70, { fill: 'rgba(9,16,32,.6)' });
    G.txt(g, 'баланс: поглощено ' + fmt(M.absorbed, 0) + ' Вт/м²', 26, 32, { size: 11.5, col: '#9fb8dd' });
    G.txt(g, 'без парниковых газов: ' + fmt(M.T0, 0) + ' °C', 26, 52, { size: 12, col: '#bfe0ff' });
    G.txt(g, 'парниковый эффект: +33 °C', 26, 72, { size: 12, weight: 700, col: '#8affe0' });
  },
  readout(st) {
    const p = st.p, M = this.model(p);
    const msk = 1000, dT = 3.0 * Math.log(p.co2 / 280) / Math.LN2;
    return `<div class="kv"><span>Солнечная постоянная / средний приток</span><b>1361 / ${fmt(M.Q, 0)} Вт/м²</b></div>
    <div class="kv"><span>Поглощено системой Земля (1 − альбедо)</span><b>${fmt(M.absorbed, 0)} Вт/м²</b></div>
    <div class="kv"><span>Эффективная температура без парникового эффекта</span><b>${fmt(M.T0, 1)} °C</b></div>
    <div class="kv key"><span>Средняя температура при текущих параметрах</span><b>${fmt(M.T, 1)} °C</b></div>
    <div class="kv long"><span>Упрощённая оценка вклада CO₂: ΔT = λ·log₂(C/C₀)</span><b>λ = 3,0 °C на удвоение → ΔT = ${fmt(dT, 2)} °C от доиндустриальных 280 ppm</b></div>
    <div class="kv"><span>Полосы поглощения</span><b>CO₂ — 4,3 и 15 мкм; H₂O — 6,3 мкм; CH₄ — 7,7 мкм: именно там ИК «запирается»</b></div>
    <div class="note">🌍 <b>Мостик:</b> физика — закон Стефана–Больцмана и баланс энергии; химия — какие молекулы поглощают ИК (дипольный момент); география — таяние ледников, таяние мерзлоты, уровень моря; экология — как сократить выбросы; математика — логарифмическая зависимость и её график. Помните: это оценочная модель для урока, а не точный климатический прогноз.</div>`;
  }
});


/* =====================================================================
   НОВЫЕ СИМУЛЯТОРЫ (часть 2): полиспаст, электрическая цепь,
   тепловое расширение, магнитное поле Земли, измерения и погрешность
   ===================================================================== */

/* ---------- 38. Полиспаст (технология, история, физкультура, математика) ---------- */
defSim('polyspast', {
  title: '🏗 Полиспаст: как выиграть в силе',
  aspect: .6,
  theoryNote: 'Простые механизмы дают выигрыш в силе, но не в работе — «золотое правило механики». Лебёдки, краны, спасательные системы и тренажёры в спортзале считают по одной и той же формуле: <b>F = mg / (2n)</b>.',
  hint: 'Добавляйте подвижные блоки: каждый блок даёт выигрыш в силе в 2 раза — но во столько же раз длиннее верёвка, которую надо вытянуть.',
  params: [
    { key: 'n', label: 'Пар блоков (подвижных)', min: 1, max: 4, step: 1, val: 2, dec: 0 },
    { key: 'm', label: 'Масса груза m', min: 10, max: 600, step: 5, val: 120, unit: 'кг', dec: 0 },
    { key: 'eta', label: 'КПД одной пары блоков', min: .6, max: 1, step: .01, val: .92, dec: 2 }
  ],
  actions: [
    { label: '🏋️ Тренажёр в зале (1 пара)', run: (st, a) => { st.p.n = 1; st.p.m = 60; a.sync(); } },
    { label: '🚧 Строительная лебёдка (2 пары)', primary: true, run: (st, a) => { st.p.n = 2; st.p.m = 120; a.sync(); } },
    { label: '🚁 Спасательный полиспаст (4 пары)', run: (st, a) => { st.p.n = 4; st.p.m = 200; a.sync(); } }
  ],
  draw(g, st, W, H) {
    const p = st.p, g0 = 9.81;
    G.bg(g, W, H);
    const kg = 2 * p.n;                                   // кратность
    const F = p.m * g0 / (kg * Math.pow(p.eta, p.n));
    /* ---- потолок ---- */
    const topY = H * .12;
    G.bar(g, W * .10, topY, W * .8, 8, 'rgba(180,220,255,.75)');
    for (let x = W * .12; x < W * .88; x += 26) G.line(g, x, topY, x + 12, topY - 8, 'rgba(180,220,255,.35)', 1.5);
    /* ---- блоки ---- */
    const bx0 = W * .30, dx = W * .13, R = 15;
    for (let k = 0; k < p.n; k++) {                        // неподвижные — на потолке
      const x = bx0 + k * dx;
      G.dot(g, x, topY + 14, R, 'rgba(9,16,32,.9)', '#9fd0ff');
      G.dot(g, x, topY + 14, 4, '#9fd0ff');
    }
    const cargoH = H * .12 * (p.m / 300);
    const cargoY = H * .80 - cargoH;
    for (let k = 0; k < p.n; k++) {                        // подвижные — над грузом
      const x = bx0 + dx * .5 + k * dx;
      G.dot(g, x, cargoY - 26, R, 'rgba(9,16,32,.9)', '#ffd166');
      G.dot(g, x, cargoY - 26, 4, '#ffd166');
    }
    /* ---- верёвки ---- */
    for (let k = 0; k < p.n; k++) {
      const xf = bx0 + k * dx, xm = bx0 + dx * .5 + k * dx;
      G.line(g, xf, topY + 14, xm, cargoY - 26, 'rgba(230,240,255,.85)', 1.6);
      G.line(g, xm, cargoY - 26, xf + dx * .5, topY + 14, 'rgba(230,240,255,.55)', 1.4);
    }
    /* ---- груз ---- */
    G.panel(g, W * .5 - 34, cargoY, 68, cargoH, { fill: 'rgba(120,160,255,.35)', stroke: '#8fb6ea', r: 6 });
    G.line(g, W * .5, cargoY - 20, W * .5, cargoY, 'rgba(230,240,255,.6)', 1.4);
    G.txt(g, fmt(p.m, 0) + ' кг', W * .5, cargoY + cargoH / 2 + 5, { align: 'center', size: 13, weight: 700, col: '#eaf1ff' });
    G.txt(g, 'Fт = ' + fmt(p.m * g0, 0) + ' Н', W * .5 + 80, cargoY + cargoH / 2, { size: 12.5, col: '#ffb3c0' });
    G.arrow(g, W * .5 - 60, cargoY + cargoH / 2 + 4, W * .5 - 60, cargoY + cargoH / 2 + 4 + Math.min(90, 26 + p.m * .12), '#fb7185', 3, 11);
    /* ---- сила на конце верёвки ---- */
    const fx = W * .86;
    G.arrow(g, fx, topY + 14, fx, topY + 14 + Math.min(100, 20 + F * .16), '#4cc9f0', 3.4, 12);
    G.txt(g, 'тянем: F = ' + fmt(F, 0) + ' Н', fx + 8, topY + 30 + Math.min(100, 20 + F * .16), { size: 12.5, weight: 700, col: '#8fe3ff' });
    G.panel(g, W - 250, H - 76, 236, 62, { fill: 'rgba(9,16,32,.6)' });
    G.txt(g, 'кратность полиспаста', W - 238, H - 54, { size: 11.5, col: '#9fb8dd' });
    G.txt(g, '2n = ' + kg + '   (выигрыш в силе)', W - 238, H - 34, { size: 14, weight: 700, col: '#ffd166' });
    G.txt(g, 'вытянуть верёвки: ' + kg + '·h', W - 238, H - 16, { size: 12, col: '#bfe0ff' });
  },
  readout(st) {
    const p = st.p, g0 = 9.81, kg = 2 * p.n;
    const Fid = p.m * g0 / kg, F = p.m * g0 / (kg * Math.pow(p.eta, p.n));
    const h = 1;
    return `<div class="kv"><span>Кратность (число несущих ветвей)</span><b>2n = ${kg}</b></div>
    <div class="kv"><span>Идеальная сила (без трения)</span><b>${fmt(Fid, 1)} Н</b></div>
    <div class="kv key"><span>Реальная сила с КПД ${fmt(p.eta, 2)}</span><b>${fmt(F, 1)} Н — это ${fmt(p.m * g0 / F, 1)}× легче груза</b></div>
    <div class="kv long"><span>Золотое правило механики: F·s = mg·h</span><b>чтобы поднять груз на ${h} м, надо вытянуть ${kg} м верёвки; работа остаётся ${fmt(p.m * g0 * h, 0)} Дж (+ потери ${fmt(p.m * g0 * h * (1 / Math.pow(p.eta, p.n) - 1), 0)} Дж)</b></div>
    <div class="kv"><span>Мощность, если тянуть 0,5 м/с</span><b>${fmt(F * .5, 0)} Вт</b></div>
    <div class="note">🏗 <b>Мостик:</b> технология — лебёдки, краны, полиспасты в гараже; история — Архимед и подъём корабля, строительство пирамид и соборов; физкультура — блочные тренажёры и подтягивания (там выигрыш в силе даёт рычаг тела); математика — пропорции и степень (КПД^n). Выигрыш в работе получить нельзя: энергия не берётся из ничего.</div>`;
  }
});

/* ---------- 39. Последовательное и параллельное соединение (технология, информатика, математика) ---------- */
defSim('circuit', {
  title: '🔌 Соединение проводников: дома и в приборе',
  aspect: .58,
  theoryNote: 'Почему лампочки в квартире соединяют параллельно, а гирлянду — последовательно? Физика даёт закон Ома, математика — формулы суммы сопротивлений, техника и информатика — расчёт схем и защиту от перегрузки.',
  hint: 'Переключите соединение: при последовательном ток общий, напряжение делится; при параллельном напряжение общее, а токи складываются.',
  params: [
    { key: 'U', label: 'Напряжение источника U', min: 1.5, max: 24, step: .5, val: 6, unit: 'В', dec: 1 },
    { key: 'R1', label: 'Сопротивление R₁', min: 1, max: 100, step: 1, val: 10, unit: 'Ом', dec: 0 },
    { key: 'R2', label: 'Сопротивление R₂', min: 1, max: 100, step: 1, val: 20, unit: 'Ом', dec: 0 }
  ],
  selects: [
    { key: 'mode', label: 'Соединение проводников', val: 'ser', options: [
      { v: 'ser', label: 'Последовательное' }, { v: 'par', label: 'Параллельное' }] }
  ],
  actions: [
    { label: '🎄 Гирлянда (последовательно)', run: (st, a) => { st.p.mode = 'ser'; st.p.R1 = 10; st.p.R2 = 20; a.sync(); } },
    { label: '🏠 Квартира (параллельно)', primary: true, run: (st, a) => { st.p.mode = 'par'; st.p.R1 = 10; st.p.R2 = 20; a.sync(); } }
  ],
  init: () => ({ ph: 0 }),
  step(st, dt) { st.ph += dt * (1 + (st.p.U / Math.max(1, st.p.R1 + st.p.R2)) * .4); },
  draw(g, st, W, H) {
    const p = st.p, par = p.mode === 'par';
    G.bg(g, W, H);
    /* монтажная плата: сетка-перфоборд */
    const step = 22;
    for (let x = step; x < W; x += step) for (let y = step; y < H; y += step) {
      G.dot(g, x, y, 1.15, 'rgba(140,190,250,.16)');
    }
    const L = W * .17, Rt = W * .63, T = H * .20, B = H * .62;
    if (par) { T; }
    const Rtot = par ? (p.R1 * p.R2) / (p.R1 + p.R2) : (p.R1 + p.R2);
    const I = p.U / Rtot;
    /* ---- провода ---- */
    const wire = (x1, y1, x2, y2) => G.line(g, x1, y1, x2, y2, 'rgba(200,225,255,.85)', 3);
    wire(L, B, Rt, B); wire(Rt, B, Rt, T); wire(Rt, T, L, T);
    /* ---- источник ---- */
    G.bar(g, L - 4, H * .33, 8, H * .16, '#eaf1ff');
    G.bar(g, L - 4, H * .49, 8, 4, '#eaf1ff');
    G.line(g, L, B, L, H * .49, 'rgba(200,225,255,.85)', 3);
    G.line(g, L, H * .33, L, T, 'rgba(200,225,255,.85)', 3);
    G.txt(g, 'U = ' + fmt(p.U, 1) + ' В', L - 14, H * .41, { align: 'right', size: 13, weight: 700, col: '#ffd166' });
    /* ---- резисторы ---- */
    const boxW = 66, boxH = 26, drawR = (x, y, val, label, Ix) => {
      G.panel(g, x - boxW / 2, y - boxH / 2, boxW, boxH, { fill: 'rgba(13,23,44,.97)', stroke: '#8fb6ea', r: 6 });
      G.txt(g, label + ' = ' + fmt(val, 0) + ' Ом', x, y + 5, { align: 'center', size: 12, weight: 700, col: '#eaf1ff' });
      G.txt(g, fmt(Ix, 2) + ' А', x, y - boxH / 2 - 7, { align: 'center', size: 11.5, col: '#8fe3ff' });
    };
    let segs = [];
    if (par) {
      const mx = W * .34;
      const y1 = H * .28, y2 = H * .54;
      wire(mx, T, mx, y1); wire(mx, y1, W * .55, y1); wire(W * .55, y1, W * .55, y2); wire(W * .55, y2, mx, y2); wire(mx, y2, mx, B);
      drawR(W * .46, y1 - 5, p.R1, 'R₁', p.U / p.R1);
      drawR(W * .46, y2 + 5, p.R2, 'R₂', p.U / p.R2);
      wire(W * .46 - 8, y1, W * .46 + 8, y1); wire(W * .46 - 8, y2, W * .46 + 8, y2);
      G.txt(g, 'напряжение на обеих ветвях одинаково', mx + 90, (y1 + y2) / 2 + 4, { size: 11.5, col: '#9fb8dd' });
      segs = [[L, B, W * .34, B], [W * .34, B, W * .34, y2], [W * .34, y2, W * .55, y2], [W * .55, y2, W * .55, y1], [W * .55, y1, W * .34, y1], [W * .34, y1, W * .34, T], [W * .34, T, Rt, T], [Rt, T, Rt, B], [Rt, B, L, B]];
    } else {
      drawR(W * .40, T, p.R1, 'R₁', I);
      drawR(W * .55, T, p.R2, 'R₂', I);
      G.txt(g, 'сила тока одинакова во всех элементах', W * .40, T - 34, { size: 11.5, col: '#9fb8dd' });
      segs = [[L, B, Rt, B], [Rt, B, Rt, T], [Rt, T, L, T], [L, T, L, B]];
    }
    /* ---- движущиеся заряды ---- */
    let total = 0;
    const parts = segs.map(s => { const d = Math.hypot(s[2] - s[0], s[3] - s[1]); total += d; return { s, d, a: total - d }; });
    const speed = Math.min(1.7, .3 + I * .3);
    for (let k = 0; k < 36; k++) {
      let pos = ((st.ph * speed * 130 + k * (total / 36)) % total + total) % total;
      const sg = parts.find(x => pos >= x.a && pos <= x.a + x.d) || parts[0];
      const tt = (pos - sg.a) / sg.d;
      const x = sg.s[0] + (sg.s[2] - sg.s[0]) * tt, y = sg.s[1] + (sg.s[3] - sg.s[1]) * tt;
      G.dot(g, x, y, 3.4, 'rgba(140,240,255,.95)');
    }
    /* ---- итоги ---- */
    G.panel(g, 12, H - 76, W * .58, 62, { fill: 'rgba(9,16,32,.7)', r: 12 });
    G.txt(g, par ? 'ПАРАЛЛЕЛЬНОЕ СОЕДИНЕНИЕ' : 'ПОСЛЕДОВАТЕЛЬНОЕ СОЕДИНЕНИЕ', 24, H - 54, { size: 12, weight: 700, col: '#8affe0' });
    G.txt(g, 'R_общ = ' + fmt(Rtot, 2) + ' Ом   ·   I = ' + fmt(I, 2) + ' А   ·   P = ' + fmt(p.U * I, 2) + ' Вт', 24, H - 30, { size: 12.5, col: '#eaf1ff' });
  },
  readout(st) {
    const p = st.p, par = p.mode === 'par';
    const Rtot = par ? (p.R1 * p.R2) / (p.R1 + p.R2) : (p.R1 + p.R2);
    const I = p.U / Rtot;
    const I1 = par ? p.U / p.R1 : I, I2 = par ? p.U / p.R2 : I;
    const U1 = par ? p.U : I * p.R1, U2 = par ? p.U : I * p.R2;
    const other = par ? (p.R1 + p.R2) : (p.R1 * p.R2) / (p.R1 + p.R2);
    return `<div class="kv"><span>Общее сопротивление</span><b>${fmt(Rtot, 2)} Ом ${par ? '(меньше самого маленького!)' : '(всегда больше каждого)'}</b></div>
    <div class="kv key"><span>Ток от источника I = U/R_общ</span><b>${fmt(I, 2)} А</b></div>
    <div class="kv"><span>Напряжение на R₁ / R₂</span><b>${fmt(U1, 2)} В / ${fmt(U2, 2)} В</b></div>
    <div class="kv"><span>Ток через R₁ / R₂</span><b>${fmt(I1, 2)} А / ${fmt(I2, 2)} А</b></div>
    <div class="kv"><span>Мощность всей цепи</span><b>${fmt(p.U * I, 2)} Вт</b></div>
    <div class="kv long"><span>Сравнение с другим соединением</span><b>если переключить, R_общ стало бы ${fmt(other, 2)} Ом, а ток — ${fmt(p.U / other, 2)} А</b></div>
    <div class="note">🏠 <b>Мостик:</b> в квартире все розетки и лампы включены <b>параллельно</b> — у каждой 220 В, выключение одной не гасит остальные. А в старой ёлочной гирлянде лампы соединяли <b>последовательно</b>: перегорела одна — погасла вся. Информатика добавляет расчёт и моделирование схем, техника — предохранители и автоматы, которые защищают от перегрузки по току.</div>`;
  }
});

/* ---------- 40. Тепловое расширение (технология, география) ---------- */
defSim('thermalexp', {
  title: '🛤 Тепловое расширение: зачем рельсам зазор',
  aspect: .56,
  theoryNote: 'Металл при нагреве удлиняется: <b>ΔL = α·L·ΔT</b>. Физика считает расширение, математика — линейную функцию, технология — зазоры в рельсах и мостах, география — суточные и сезонные перепады температур.',
  hint: 'Увеличьте перепад температуры: если зазор мал, рельсы упираются и в них возникают огромные напряжения — до 96 МПа при ΔT = 40 °C.',
  selects: [
    { key: 'mat', label: 'Материал (коэффициент α, 10⁻⁶ К⁻¹)', val: 'steel', options: [
      { v: 'steel', label: 'Сталь — α = 12' }, { v: 'alu', label: 'Алюминий — α = 23' },
      { v: 'copper', label: 'Медь — α = 17' }, { v: 'concrete', label: 'Бетон — α = 12' },
      { v: 'glass', label: 'Стекло — α = 9' }, { v: 'invar', label: 'Инвар — α = 1,2 (почти не расширяется)' }] }
  ],
  params: [
    { key: 'L', label: 'Длина конструкции L', min: 1, max: 500, step: 1, val: 25, unit: 'м', dec: 0 },
    { key: 'dT', label: 'Перепад температуры ΔT', min: -50, max: 60, step: 1, val: 40, unit: '°C', dec: 0 },
    { key: 'gap', label: 'Зазор между рельсами', min: 0, max: 60, step: 1, val: 18, unit: 'мм', dec: 0 }
  ],
  actions: [
    { label: '☀️ Летняя жара +40 °C', primary: true, run: (st, a) => { st.p.dT = 40; st.p.mat = 'steel'; a.sync(); } },
    { label: '🥶 Зимняя ночь −40 °C', run: (st, a) => { st.p.dT = -40; a.sync(); } },
    { label: '⛰ Горный мост, инвар-компенсация', run: (st, a) => { st.p.mat = 'invar'; st.p.dT = 30; st.p.L = 120; a.sync(); } }
  ],
  init: () => ({ ph: 0 }),
  step(st, dt) { st.ph += dt * .6; },
  ALPHA: { steel: 12e-6, alu: 23e-6, copper: 17e-6, concrete: 12e-6, glass: 9e-6, invar: 1.2e-6 },
  draw(g, st, W, H) {
    const p = st.p, a = this.ALPHA[p.mat] || 12e-6;
    G.bg(g, W, H);
    const dLmm = a * p.L * p.dT * 1000;
    const clash = dLmm > p.gap;
    /* ---- два рельса с зазором ---- */
    const y = H * .58, segW = W * .42, gapPx = Math.max(2, p.gap * (W / 700));
    const expandPx = dLmm * (W / 700) * 1.6;
    const leftX = W * .06, rightX = W * .5 + gapPx / 2;
    const drawSeg = (x, w) => {
      G.bar(g, x, y, w, 16, 'rgba(200,214,235,.9)');
      G.bar(g, x, y + 16, w, 5, 'rgba(140,158,186,.9)');
    };
    const wL = segW + expandPx / 2, wR = segW + expandPx / 2;
    drawSeg(leftX, wL);
    drawSeg(rightX, wR);
    /* шпалы */
    for (let x = leftX - 30; x < W; x += 46) {
      if (x > leftX + wL - gapPx / 2 && x < rightX) continue;
      G.bar(g, x, y + 21, 22, 9, 'rgba(120,96,72,.8)');
    }
    /* зазор */
    const gapLeft = leftX + wL, gapRight = rightX;
    if (clash) {
      G.bar(g, gapLeft - 2, y - 8, 8, 34, 'rgba(251,113,133,.35)');
      G.txt(g, 'ЗАЗОРА НЕ ХВАТАЕТ — рельс упёрся', (gapLeft + gapRight) / 2, y - 22, { align: 'center', size: 12.5, weight: 700, col: '#ffb3c0' });
    } else {
      G.line(g, gapLeft, y - 6, gapLeft, y + 30, 'rgba(140,240,200,.7)', 1.4, [4, 4]);
      G.line(g, gapRight, y - 6, gapRight, y + 30, 'rgba(140,240,200,.7)', 1.4, [4, 4]);
      G.txt(g, 'зазор ' + fmt(p.gap, 0) + ' мм — хватает', (gapLeft + gapRight) / 2, y - 22, { align: 'center', size: 12, col: '#8affe0' });
    }
    /* ---- размерные стрелки ---- */
    G.arrow(g, leftX, y + 44, leftX + wL, y + 44, '#4cc9f0', 1.8, 8);
    G.txt(g, 'L = ' + fmt(p.L, 0) + ' м → ' + fmt(p.L + a * p.L * p.dT, 3) + ' м', leftX, y + 62, { size: 12, col: '#8fe3ff' });
    G.txt(g, 'ΔL = α·L·ΔT = ' + fmt(dLmm, 1) + ' мм', leftX, y + 84, { size: 13, weight: 700, col: '#ffd166' });
    /* ---- термометр ---- */
    const tx = W * .93, ty0 = H * .16, ty1 = H * .70;
    G.panel(g, tx - 11, ty0, 22, ty1 - ty0, { fill: 'rgba(9,16,32,.6)', r: 11 });
    const fr = (p.dT + 50) / 110;
    g.fillStyle = p.dT >= 0 ? '#fb7185' : '#4cc9f0';
    const fhc = Math.min(1, Math.max(.06, fr)); g.fillRect(tx - 6, ty1 - (ty1 - ty0) * fhc, 12, (ty1 - ty0) * fhc);
    G.txt(g, (p.dT > 0 ? '+' : '') + fmt(p.dT, 0) + ' °C', tx - 12, ty0 - 8, { align: 'center', size: 13, weight: 700, col: p.dT >= 0 ? '#ffb3c0' : '#8fe3ff' });
    /* ---- полоска значения ----- */
    G.panel(g, 12, 12, W * .62, 52, { fill: 'rgba(9,16,32,.6)' });
    G.txt(g, 'коэффициент α = ' + fmt(a * 1e6, 1) + '·10⁻⁶ К⁻¹  (' + (p.mat === 'steel' ? 'сталь' : p.mat === 'alu' ? 'алюминий' : p.mat === 'copper' ? 'медь' : p.mat === 'concrete' ? 'бетон' : p.mat === 'glass' ? 'стекло' : 'инвар') + ')', 24, 34, { size: 12, col: '#bfe0ff' });
    G.txt(g, clash ? 'конструкция сжата: напряжение σ = E·α·ΔT = ' + fmt(200e9 * a * p.dT / 1e6, 1) + ' МПа' : 'свободное расширение: напряжений нет', 24, 54, { size: 12, col: clash ? '#ffb3c0' : '#8affe0' });
  },
  readout(st) {
    const p = st.p, a = this.ALPHA[p.mat] || 12e-6;
    const dL = a * p.L * p.dT, dLmm = dL * 1000;
    const E = 200e9, sigma = E * a * p.dT / 1e6;
    const force = E * a * p.dT * 1e-4;                             // на 1 см²
    return `<div class="kv"><span>Удлинение ΔL = α·L·ΔT</span><b>${fmt(dLmm, 2)} мм (${fmt(dL * 1e6, 0)} мкм)</b></div>
    <div class="kv"><span>Нужный зазор</span><b>${fmt(Math.max(0, dLmm), 1)} мм при нагреве; при охлаждении стык «расходится» на ${fmt(Math.abs(Math.min(0, dLmm)), 1)} мм</b></div>
    <div class="kv key"><span>Хватает ли выбранного зазора ${fmt(p.gap, 0)} мм?</span><b><span class="badge ${dLmm > p.gap ? 'bad' : 'ok'}">${dLmm > p.gap ? 'нет — рельсы упрутся и деформируются' : 'да, конструкция безопасна'}</span></b></div>
    <div class="kv long"><span>Напряжение при жёстком закреплении σ = E·α·ΔT</span><b>${fmt(sigma, 1)} МПа, сила на каждый см² сечения — ${fmt(force, 0)} Н</b></div>
    <div class="kv"><span>Сравните: для того же ΔT сталь и алюминий</span><b>алюминий расширяется почти в 2 раза сильнее стали</b></div>
    <div class="note">🛤 <b>Мостик:</b> технология — температурные швы мостов, «зазоры» рельсов на железной дороге, биметаллические пластины в термостатах, ЛЭП провисают летом; география — суточные перепады в пустыне достигают 40 °C, а в тропиках малы, поэтому и нормы зазоров разные; математика — прямая пропорциональность ΔL(ΔT).</div>`;
  }
});

/* ---------- 41. Магнитное поле Земли и компас (география, астрономия, история) ---------- */
defSim('magnetfield', {
  title: '🧭 Магнитное поле Земли: компас и сияния',
  aspect: .58,
  theoryNote: 'Земля — гигантский магнит: физика описывает диполь и силу Лоренца, география — склонение компаса и магнитные аномалии, астрономия — солнечный ветер и радиационные пояса, история — от компаса в Китае XI века до навигации Магеллана.',
  hint: 'Меняйте широту: у экватора стрелка ложится горизонтально, у полюсов наклоняется почти вертикально (магнитное наклонение).',
  params: [
    { key: 'lat', label: 'Магнитная широта', min: -90, max: 90, step: 1, val: 45, unit: '°', dec: 0 },
    { key: 'wind', label: 'Солнечный ветер (скорость частиц)', min: 200, max: 900, step: 10, val: 450, unit: 'км/с', dec: 0 }
  ],
  actions: [
    { label: '🟰 Экватор (наклонение 0°)', run: (st, a) => { st.p.lat = 0; a.sync(); } },
    { label: '🇰🇿 Павлодар ≈ 53° с.ш.', primary: true, run: (st, a) => { st.p.lat = 53; a.sync(); } },
    { label: '🌌 Полярный круг (сияния)', run: (st, a) => { st.p.lat = 67; st.p.wind = 700; a.sync(); } }
  ],
  init: () => ({ ph: 0 }),
  step(st, dt) { st.ph += dt; },
  draw(g, st, W, H) {
    const p = st.p;
    G.bg(g, W, H);
    const cx = W * .34, cy = H * .5, R = Math.min(W * .2, H * .34);
    /* ---- магнитные силовые линии (диполь) ---- */
    for (let k = 1; k <= 6; k++) {
      const s = k * R * .42;
      g.save(); g.beginPath();
      for (let t = 0; t <= 1.001; t += .01) {
        const th = Math.PI * t;
        const r = R * 1.15 + s * Math.sin(th) ** 2 * (1 + k * .1);
        const x = cx + Math.cos(th) * r * 1.15, y = cy - Math.sin(th) * r;
        t ? g.lineTo(x, y) : g.moveTo(x, y);
      }
      g.strokeStyle = `rgba(140,200,255,${.42 - k * .05})`; g.lineWidth = 1.5; g.stroke();
      g.beginPath();
      for (let t = 0; t <= 1.001; t += .01) {
        const th = Math.PI * t;
        const r = R * 1.15 + s * Math.sin(th) ** 2 * (1 + k * .1);
        const x = cx - Math.cos(th) * r * 1.15, y = cy + Math.sin(th) * r;
        t ? g.lineTo(x, y) : g.moveTo(x, y);
      }
      g.strokeStyle = `rgba(140,200,255,${.26 - k * .03})`; g.stroke(); g.restore();
    }
    /* ---- Земля ---- */
    const eg = g.createRadialGradient(cx - R * .3, cy - R * .3, R * .2, cx, cy, R);
    eg.addColorStop(0, '#5aa7ff'); eg.addColorStop(1, '#12407f');
    g.beginPath(); g.arc(cx, cy, R, 0, TAU); g.fillStyle = eg; g.fill();
    g.strokeStyle = 'rgba(170,220,255,.6)'; g.lineWidth = 1.6; g.stroke();
    G.line(g, cx, cy - R - 26, cx, cy + R + 26, 'rgba(255,255,255,.35)', 1.2, [5, 5]);
    G.exe = 1;
    G.txt(g, 'N (геогр.)', cx, cy - R - 32, { align: 'center', size: 11.5, col: '#dbe9ff' });
    G.txt(g, 'S (геогр.)', cx, cy + R + 44, { align: 'center', size: 11.5, col: '#dbe9ff' });
    /* магнитные полюса */
    const mLat = 80;
    const my1 = cy - Math.sin(mLat * D2R) * R * .99, mx1 = cx + Math.cos(mLat * D2R) * R * .30;
    const my2 = cy + Math.sin(mLat * D2R) * R * .99, mx2 = cx - Math.cos(mLat * D2R) * R * .30;
    G.dot(g, mx1, my1, 6, '#4cc9f0', '#0d1626');
    G.txt(g, 'магнитный S', mx1 + 10, my1 - 6, { size: 11, col: '#8fe3ff' });
    G.dot(g, mx2, my2, 6, '#fb7185', '#0d1626');
    G.txt(g, 'магнитный N', mx2 + 10, my2 + 12, { size: 11, col: '#ffb3c0' });
    /* ---- наблюдатель и компас ---- */
    const lat = p.lat * D2R;
    const px = cx + Math.cos(lat) * (R * 1.06), py = cy - Math.sin(lat) * (R * 1.06);
    G.dot(g, px, py, 7, '#ffd166', '#0d1626');
    const incl = Math.atan(2 * Math.tan(lat)) * R2D;                 // магнитное наклонение
    const needleL = 30;
    const na = -incl * D2R;
    G.arrow(g, px, py, px + Math.cos(na + Math.PI / 2) * needleL * .2, py + Math.sin(na + Math.PI / 2) * needleL * .2, '#fb7185', 3, 9);
    G.arrow(g, px, py, px - Math.cos(na + Math.PI / 2) * needleL * .2, py - Math.sin(na + Math.PI / 2) * needleL * .2, '#4cc9f0', 3, 9);
    G.line(g, px, py, px + Math.cos(na) * needleL, py + Math.sin(na) * needleL, 'rgba(255,255,255,.7)', 1.4, [3, 3]);
    G.txt(g, 'наклонение I = ' + fmt(Math.abs(incl), 1) + '°', px + 12, py - 14, { size: 12, col: '#ffd166' });
    G.txt(g, 'наблюдатель на широте ' + fmt(p.lat, 0) + '°', px + 12, py + 24, { size: 11.5, col: '#cfe2ff' });
    /* ---- солнечный ветер и сияние ---- */
    const wv = p.wind;
    for (let k = 0; k < 8; k++) {
      const y = H * .08 + k * (H * .2 / 8);
      const off = (st.ph * (wv / 120)) % (W * .4);
      G.arrow(g, W * .72 + off, y, W * .72 + off + 46, y, 'rgba(255,220,140,.55)', 1.6, 7);
    }
    G.txt(g, 'солнечный ветер ' + fmt(wv, 0) + ' км/с', W * .78, H * .05, { size: 11.5, col: '#ffe6a0' });
    const oval = Math.max(48, 74 - wv / 22);
    if (Math.abs(p.lat) > oval || wv > 620) {
      const ax = cx + Math.cos(lat) * R * 1.35, ay = cy - Math.sin(lat) * R * 1.35;
      g.save();
      for (let k = 0; k < 3; k++) {
        const gg = g.createLinearGradient(ax, ay - 60, ax, ay + 20);
        gg.addColorStop(0, `rgba(${100 + k * 40},255,${180 + k * 20},0)`);
        gg.addColorStop(1, `rgba(${120 + k * 40},255,140,${.30 + .07 * Math.sin(st.ph * 2 + k)})`);
        g.fillStyle = gg;
        g.beginPath(); g.moveTo(ax - 16 + k * 12, ay + 26); g.lineTo(ax + 16 + k * 12, ay + 26); g.lineTo(ax + 6 + k * 12, ay - 62); g.closePath(); g.fill();
      }
      g.restore();
      G.txt(g, 'полярное сияние', ax, ay - 70, { align: 'center', size: 11.5, col: '#8affe0' });
    }
    /* ---- пояснение справа ---- */
    G.panel(g, W * .62, H * .42, W * .36, H * .40, { fill: 'rgba(9,16,32,.55)' });
    G.txt(g, 'Что покажет компас', W * .64, H * .42 + 22, { size: 12.5, weight: 700, col: '#eaf1ff' });
    G.txt(g, 'напряжённость B ≈ ' + fmt(31 * Math.sqrt(1 + 3 * Math.sin(lat) ** 2), 0) + ' мкТл', W * .64, H * .42 + 44, { size: 12, col: '#8fe3ff' });
    G.txt(g, 'наклонение I = ' + fmt(Math.abs(incl), 1) + '°', W * .64, H * .42 + 64, { size: 12, col: '#ffd166' });
    G.txt(g, 'стрелка ляжет по касательной', W * .64, H * .42 + 84, { size: 11.5, col: '#bfe0ff' });
    G.txt(g, 'сияния появляются на ' + fmt(oval, 0) + '° широты', W * .64, H * .42 + 106, { size: 11.5, col: '#8affe0' });
  },
  readout(st) {
    const p = st.p, lat = p.lat * D2R;
    const incl = Math.atan(2 * Math.tan(lat)) * R2D;
    const B = 31 * Math.sqrt(1 + 3 * Math.sin(lat) ** 2);
    const oval = Math.max(48, 74 - p.wind / 22);
    return `<div class="kv"><span>Магнитное наклонение (tan I = 2·tan φ)</span><b>${fmt(Math.abs(incl), 1)}°</b></div>
    <div class="kv"><span>Индукция поля на этой широте</span><b>≈ ${fmt(B, 0)} мкТл (на экваторе 31, у полюсов 62)</b></div>
    <div class="kv key"><span>Куда покажет компас</span><b>${Math.abs(p.lat) < 15 ? 'почти горизонтально, вдоль меридиана' : Math.abs(p.lat) > 60 ? 'почти вертикально — нужен «наклонный» компас (инклинатор)' : 'наклонно, не строго по горизонту'}</b></div>
    <div class="kv"><span>Магнитное склонение (важно навигации)</span><b>1–20° и зависит от точки Земли: карты дают его отдельной таблицей</b></div>
    <div class="kv long"><span>Где полярное сияние при ветре ${fmt(p.wind, 0)} км/с</span><b>авроральный овал примерно на ${fmt(oval, 0)}° магнитной широты; сейчас вы ${Math.abs(p.lat) >= oval ? 'наблюдаете сияние' : 'вне зоны сияния'}</b></div>
    <div class="note">🧭 <b>Мостик:</b> география — склонение, магнитные аномалии (Курская), ориентирование по компасу; астрономия — солнечный ветер, радиационные пояса, магнитосфера Юпитера и Земли; история — компас пришёл в Европу из Китая (XI–XII вв.), без него невозможны были великие географические открытия; физика — диполь, сила Лоренца, движение заряда в магнитном поле.</div>`;
  }
});

/* ---------- 42. Измерения: среднее и погрешность (математика, информатика, физкультура) ---------- */
defSim('measure', {
  title: '📏 Измерения: среднее, разброс, погрешность',
  aspect: .55,
  theoryNote: 'Ни одно измерение не бывает точным. Физика даёт величину и её погрешность, математика — среднее и стандартное отклонение, информатика — обработку серии данных, а спортивная медицина так же считает пульс и шаги.',
  hint: 'Увеличьте число измерений: среднее приблизится к истине, но случайная погрешность среднего падает лишь как 1/√n. Приборная погрешность так не уменьшается — она остаётся.',
  params: [
    { key: 'n', label: 'Число измерений', min: 1, max: 40, step: 1, val: 8, dec: 0 },
    { key: 'sigma', label: 'Случайный разброс (СКО)', min: 0, max: 2, step: .05, val: .6, dec: 2 },
    { key: 'scale', label: 'Цена деления прибора', min: .05, max: 1, step: .05, val: .2, unit: 'ед.', dec: 2 },
    { key: 'bias', label: 'Систематическая ошибка (сдвиг прибора)', min: -1, max: 1, step: .05, val: 0, dec: 2 }
  ],
  actions: [
    { label: '📐 Хороший прибор (±0,05)', run: (st, a) => { st.p.scale = .05; st.p.sigma = .3; st.p.n = 12; st.p.bias = 0; a.sync(); } },
    { label: '🥴 Плохая линейка (±0,5) + сдвиг', primary: true, run: (st, a) => { st.p.scale = .5; st.p.sigma = .8; st.p.n = 6; st.p.bias = .4; a.sync(); } },
    { label: '🔬 Много измерений (±0,1)', run: (st, a) => { st.p.scale = .1; st.p.sigma = .5; st.p.n = 30; st.p.bias = 0; a.sync(); } }
  ],
  TRUE: 10,
  series(p) {
    /* детерминированная «случайная» серия: одни и те же данные при тех же параметрах */
    const out = [];
    let seed = 12345 + Math.round(p.n * 97 + p.sigma * 13 + p.bias * 7);
    for (let i = 0; i < p.n; i++) {
      seed = (seed * 1103515245 + 12345) % 2147483648;
      const u1 = (seed / 2147483648) || .5;
      seed = (seed * 1103515245 + 12345) % 2147483648;
      const u2 = (seed / 2147483648) || .5;
      const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(TAU * u2);      // нормальное распределение
      const raw = this.TRUE + z * p.sigma + p.bias;
      out.push(Math.round(raw / p.scale) * p.scale);                    // оцифровка прибором
    }
    return out;
  },
  draw(g, st, W, H) {
    const p = st.p, data = this.series(p);
    const mean = data.reduce((s, v) => s + v, 0) / data.length;
    G.bg(g, W, H);
    /* ---- ось значений ---- */
    const x0 = W * .10, x1 = W * .92, y = H * .42;
    const lo = this.TRUE - 3.2, hi = this.TRUE + 3.2;
    const X = v => x0 + (x1 - x0) * Math.max(0, Math.min(1, (v - lo) / (hi - lo)));
    G.line(g, x0, y, x1, y, 'rgba(150,190,240,.5)', 1.6);
    for (let v = Math.ceil(lo); v <= hi; v++) {
      G.line(g, X(v), y - 6, X(v), y + 6, 'rgba(150,190,240,.45)', 1.2);
      G.txt(g, v, X(v), y + 24, { align: 'center', size: 11.5, col: '#9fb8dd' });
    }
    /* истинное значение и среднее */
    G.line(g, X(this.TRUE), H * .18, X(this.TRUE), y + 40, '#8affe0', 2, [6, 5]);
    G.txt(g, 'истинное значение ' + fmt(this.TRUE, 2), X(this.TRUE), H * .18 - 8, { align: 'center', size: 12, col: '#8affe0' });
    G.line(g, X(mean), H * .24, X(mean), y + 40, '#ffd166', 2.4);
    G.txt(g, 'среднее ' + fmt(mean, 2), X(mean), H * .24 - 8, { align: 'center', size: 12.5, weight: 700, col: '#ffd166' });
    /* ---- точки измерений «пчелиный рой» ---- */
    data.forEach((v, i) => {
      const row = i % 5;
      const px = X(v), py = y - 14 - row * 16;
      G.dot(g, px, py, 4.6, 'rgba(140,200,255,.9)', 'rgba(10,20,40,.9)');
    });
    /* ---- приборная погрешность ---- */
    const dInstr = p.scale / 2;
    G.panel(g, X(mean) - 12, y + 44, 24, 16, { fill: 'rgba(255,209,102,.35)', stroke: '#ffd166' });
    /* ---- гистограмма снизу ---- */
    const hy = H * .88, hh = H * .22, bins = 13;
    const counts = new Array(bins).fill(0);
    data.forEach(v => { const b = Math.max(0, Math.min(bins - 1, Math.floor((v - lo) / (hi - lo) * bins))); counts[b]++; });
    const maxC = Math.max(1, ...counts);
    counts.forEach((c, i) => {
      const bx = x0 + (x1 - x0) * i / bins, bw = (x1 - x0) / bins - 2;
      const bh = hh * c / maxC * .55;
      G.bar(g, bx, hy - bh, bw, bh, 'rgba(140,200,255,.45)');
    });
    G.line(g, x0, hy, x1, hy, 'rgba(150,190,240,.35)', 1.2);
    G.line(g, X(mean), hy - hh * .6, X(mean), hy, 'rgba(255,209,102,.8)', 1.6, [4, 4]);
    G.txt(g, 'гистограмма: как «размазаны» результаты', x0, hy - hh * .72, { size: 11.5, col: '#9fb8dd' });
    /* ---- подписи величин ---- */
    const sd = Math.sqrt(data.reduce((s, v) => s + (v - mean) ** 2, 0) / Math.max(1, data.length - 1));
    G.panel(g, 12, H * .03, W * .34, 74, { fill: 'rgba(9,16,32,.6)' });
    G.txt(g, 'среднее: ' + fmt(mean, 3), 24, H * .03 + 22, { size: 12.5, weight: 700, col: '#ffd166' });
    G.txt(g, 'СКО серии σ = ' + fmt(sd, 3), 24, H * .03 + 42, { size: 12, col: '#bfe0ff' });
    G.txt(g, 'погрешность среднего σ/√n = ' + fmt(sd / Math.sqrt(data.length), 3), 24, H * .03 + 62, { size: 12, col: '#8fe3ff' });
    G.panel(g, W - W * .32, H * .03, W * .30, 74, { fill: 'rgba(9,16,32,.6)' });
    G.txt(g, 'приборная:', W - W * .32 + 12, H * .03 + 22, { size: 12, col: '#bfe0ff' });
    G.txt(g, '± ' + fmt(dInstr, 3) + ' (цена деления/2)', W - W * .32 + 12, H * .03 + 42, { size: 12.5, weight: 700, col: '#ffb3c0' });
    G.txt(g, 'она не уменьшается от числа опытов', W - W * .32 + 12, H * .03 + 62, { size: 11, col: '#9fb8dd' });
  },
  readout(st) {
    const p = st.p, data = this.series(p);
    const mean = data.reduce((s, v) => s + v, 0) / data.length;
    const sd = Math.sqrt(data.reduce((s, v) => s + (v - mean) ** 2, 0) / Math.max(1, data.length - 1));
    const sem = sd / Math.sqrt(data.length), dInstr = p.scale / 2;
    const total = Math.sqrt(sem * sem + dInstr * dInstr);
    const relErr = total / Math.abs(mean || 1) * 100;
    const threeSigma = data.filter(v => Math.abs(v - mean) > 3 * sd).length;
    return `<div class="kv"><span>Серия (первые 8 значений)</span><b>${data.slice(0, 8).map(v => fmt(v, 2)).join('; ')}</b></div>
    <div class="kv key"><span>Среднее значение</span><b>${fmt(mean, 3)} (истинное ${fmt(this.TRUE, 2)})</b></div>
    <div class="kv"><span>СКО серии σ</span><b>${fmt(sd, 3)}</b></div>
    <div class="kv"><span>Погрешность среднего σ/√n</span><b>${fmt(sem, 3)} — уменьшается с числом опытов</b></div>
    <div class="kv"><span>Приборная погрешность</span><b>± ${fmt(dInstr, 3)} — от числа опытов не меняется</b></div>
    <div class="kv"><span>Итоговая погрешность √(σ_ср² + Δ_пр²)</span><b>± ${fmt(total, 3)} ед., это ${fmt(relErr, 2)} %</b></div>
    <div class="kv"><span>Правило 3σ</span><b>грубых промахов в серии: ${threeSigma} (всё, что дальше 3σ, отбрасывают как промах)</b></div>
    <div class="kv long"><span>Запись результата по правилам</span><b>( ${fmt(mean, 3)} ± ${fmt(total, 3)} ) ед. — число знаков после запятой у результата и погрешности должно совпадать</b></div>
    <div class="note">📊 <b>Мостик:</b> математика — среднее арифметическое, дисперсия, корень; информатика — обработка массива данных, датчики и оцифровка (шаг квантования = цена деления); физика — погрешности и правила округления; физкультура и биология — так же считают пульс, шаги, частоту дыхания за серию замеров. ${p.bias ? '⚠️ Сейчас включена систематическая ошибка: прибор «врёт» в одну сторону, и среднее смещается — именно поэтому приборы калибруют по эталону!' : '✅ Систематической ошибки нет: среднее «сходится» к истинному значению.'}</div>`;
  }
});

const SIM_DEMOS_EXTRA = {
  measure: { dur: 9, run(st, p) { st.p.n = Math.max(1, Math.round(1 + 39 * p)); } },
  circuit: { dur: 8, run(st, p) { st.p.U = 1.5 + 22.5 * (1 - Math.abs(2 * p - 1)); } }
};
