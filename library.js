// Keep all lesson IDs in the document so diagnostic and planner links still work.
(() => {
  const library = document.querySelector('#notes');
  const panels = [...library.querySelectorAll('.shelf-panel')];
  let grade = '7', term = 'all';
  function show(g, t) {
    grade = g; term = t;
    for (const p of panels) p.hidden = p.dataset.grade !== g || (t !== 'all' && p.dataset.term !== t);
    for (const btn of library.querySelectorAll('.shelf-controls button')) {
      btn.setAttribute('aria-pressed', String(btn.dataset.grade === g || btn.dataset.term === t));
    }
  }
  library.querySelector('.shelf-controls').addEventListener('click', event => {
    const btn = event.target.closest('button');
    if (btn) show(btn.dataset.grade || grade, btn.dataset.term || term);
  });
  function followLink() {
    const note = document.getElementById(location.hash.slice(1));
    const panel = note?.closest('.shelf-panel');
    if (!panel) return;
    show(panel.dataset.grade, panel.dataset.term);
    if (note.matches('details')) note.open = true;
    if(note.id.startsWith('lab-')){const card=note.closest('.paragraph-card');card.open=true;card.querySelector('.reader-switch button:last-child').click()}
    note.scrollIntoView();
  }
  show(grade, term);
  window.addEventListener('hashchange', followLink);
  document.addEventListener('click', event => {
    const a = event.target.closest('a');
    if (a && a.hash && a.hash === location.hash) followLink();
  });
  followLink();
})();

// Interactive models start paused; a time step is also available without motion.
for (const [id,brake] of [['read-brake',true],['read-swing',false]]) {
  const note=document.getElementById(id), box=document.createElement('section');
  box.className='motion-lab';
  box.innerHTML=`<h4>Лаборатория движения</h4><p>${brake?'Предскажи остановочный путь, затем запусти торможение. Время реакции здесь равно нулю.':'Измени период. За сколько секунд груз вернётся к правому краю?'}</p>
    <label>${brake?'Начальная скорость':'Период колебаний'} <input type="range" min="${brake?4:1}" max="${brake?20:5}" step="${brake?1:0.5}" value="${brake?12:2}"> <output></output></label>
    <svg viewBox="0 0 320 65" aria-hidden="true"><path d="M14 44H306" stroke="#557782"/><circle cy="34" r="9" fill="#bf623a"/></svg>
    <p class="motion-reading"></p><div class="buttons"><button type="button">Запустить</button><button type="button">Шаг времени</button><button type="button">Сначала</button></div>`;
  note.querySelector('.shelf-source').before(box);
  const slider=box.querySelector('input'), [play,step,reset]=box.querySelectorAll('button');
  let time=0,frame=0,previous=0;
  function draw(){
    const v=Number(slider.value), end=brake?v/4:2*v;
    time=Math.min(time,end);
    const x=brake?v*time-2*time*time:Math.cos(2*Math.PI*time/v);
    box.querySelector('circle').setAttribute('cx',brake?15+x*5.8:160+130*x);
    box.querySelector('output').textContent=v+(brake?' m/s':' s');
    box.querySelector('.motion-reading').textContent=`t = ${time.toFixed(2)} s · x = ${x.toFixed(2)} m · `+(brake?`v = ${(v-4*time).toFixed(2)} m/s · a = −4 m/s²`:`A = 1 m · f = ${(1/v).toFixed(2)} Hz`);
    return time>=end;
  }
  function pause(){cancelAnimationFrame(frame);frame=0;play.textContent='Запустить'}
  function tick(now){if(!note.open||!box.getClientRects().length){pause();return}time+=(now-previous)/1000;previous=now;if(draw())pause();else frame=requestAnimationFrame(tick)}
  play.onclick=()=>{if(frame){pause();return}if(draw())time=0;previous=performance.now();play.textContent='Приостановить';frame=requestAnimationFrame(tick)};
  step.onclick=()=>{pause();time+=0.25;draw()};slider.oninput=reset.onclick=()=>{pause();time=0;draw()};draw();
}
// Search the complete index, not just the currently visible term.
(()=>{
 const input=document.getElementById('reader-search'),matches=document.getElementById('reader-matches');
 const fold=s=>s.toLocaleLowerCase().replaceAll('ё','е').trim();
 function update(){const q=fold(input.value),lang=document.getElementById('language').value,idx=lang==='en'?1:lang==='kk'?2:0;matches.replaceChildren();matches.hidden=!q;if(!q)return;
 const list=document.createElement('ul');for(const [grade,seq] of Object.entries(textbookIndex))seq.forEach(([,titles],i)=>{const id=`${grade}.${i+1}`;if(!titles.some(t=>fold(t).includes(q))&&id!==q)return;const li=document.createElement('li'),a=document.createElement('a');a.href=`#para-${grade}-${i+1}`;a.textContent=`${id} · ${titles[idx]}`;li.append(a);list.append(li)});if(list.children.length)matches.append(list);else matches.textContent=['Ничего не найдено. Попробуй другое слово.','No matches. Try a different word.','Ештеңе табылмады. Басқа сөз енгіз.'][idx];}
 input.addEventListener('input',update);document.getElementById('language').addEventListener('change',update);
})();
