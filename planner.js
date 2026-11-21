// The planner runs locally. Only the aggregate, anonymous brief can be copied for an AI tutor.
const planner = {tab:'gaps', weeks:4, hours:2, cells:[], scope:'', ready:false};
const planTabs={gaps:'Ликвидировать пробелы',olymp:'Подготовка к олимпиадам'};
function noteLink(topic){const note=[...document.querySelectorAll('#notes .lesson')].find(el=>el.dataset.topics.split('|').includes(topic));return note?`<a class="plan-link" href="#${note.id}" onclick="document.getElementById('${note.id}').open=true">Читать конспект →</a>`:''}
function openLinkedNote(){const el=document.getElementById(location.hash.slice(1));if(el?.classList.contains('lesson'))el.open=true}
window.addEventListener('hashchange',openLinkedNote);openLinkedNote();
function recordMap(rows,scope){
 const cells=new Map();
 for(const r of rows){const id=JSON.stringify([r.topic,r.skill]);if(!cells.has(id))cells.set(id,{topic:r.topic,skill:r.skill,n:0,right:0});const c=cells.get(id);c.n++;c.right+=Number(r.ok)}
 planner.cells=[...cells.values()];planner.scope=scope;planner.ready=true;renderPlanner();
}
function priority(c){return c.right===c.n?2:c.n<3?1:0}
const book=[['Единицы, оценки и измерения','гл. 1, PDF с. 20'],['Механика','гл. 2, PDF с. 32'],['Колебания и волны','гл. 3, PDF с. 108'],['Электромагнетизм','гл. 4, PDF с. 140'],['Термодинамика','гл. 5, PDF с. 202'],['Современная физика','гл. 6, PDF с. 240'],['Анализ данных','гл. 7, PDF с. 290'],['Экспериментальный практикум','гл. 8, PDF с. 316']];
function chapter(t){if(/ток|электр|магнит|цеп/i.test(t))return 3;if(/термо|тепло|молекул|агрегат/i.test(t))return 4;if(/колеб|волн/i.test(t))return 2;if(/атом|квант|ядр/i.test(t))return 5;if(/измер|научный/i.test(t))return 6;if(/движ|кинемат|динамик|сил|механ|энерг|равновес|импульс/i.test(t))return 1;return 0}
const exercises={'Расчёт':'Переведи данные в СИ, реши задачу и проверь размерность ответа.','Теория':'Сформулируй закон своими словами и приведи пример, где его нельзя применять.','Понимание':'Предскажи результат опыта, измени одно условие и объясни, почему изменился ответ.'};
function makeSchedule(){
 const ranked=[...planner.cells].sort((a,b)=>priority(a)-priority(b)||a.right/a.n-b.right/b.n||b.n-a.n);
 if(planner.tab==='gaps'&&!ranked.length)return [];
 const focus=ranked.some(c=>c.right<c.n)?ranked.filter(c=>c.right<c.n):ranked;
 return Array.from({length:planner.weeks},(_,i)=>{
 const c=focus.length?focus[i%focus.length]:null, repeat=i>=focus.length&&!!c;
 const subtitle=c?`${c.topic} · ${c.skill} · ${c.right}/${c.n} верно`:'';
 if(planner.tab==='olymp'){
 const b=book[c?chapter(c.topic):[0,1,2,6,3,4,5,7][i%8]];
 const stage=i===planner.weeks-1?'Мини-тур':i===0?'Построение модели':'Самостоятельное решение';
 return {name:stage+' · '+b[0],why:subtitle||'Вводный маршрут без диагностики',task:`${stage==='Мини-тур'?'Реши незнакомую задачу на время, затем сравни два способа решения.':stage==='Построение модели'?'Выбери задачу, сделай рисунок, выпиши допущения и нужные законы.':'Реши задачу без образца. Проверь ответ предельным случаем и сверь с разбором.'} Ориентир: ${b[1]}.`};}
 const action=repeat?'Повторная проверка':priority(c)===1?'Уточнение':priority(c)===2?'Закрепление':'Работа над ошибками';
 return {topic:c.topic,name:action+' · '+c.topic,why:subtitle,task:(repeat?'Начни с новой задачи без подсказок. ':priority(c)===1?'Сначала реши один контрольный пример: одного промаха недостаточно для вывода. ':'')+(exercises[c.skill]||'Разбери ход решения.')+' В конце объясни решение другой задачи самостоятельно.'};
 });
}
function aiBrief(schedule){return `Ты — репетитор физики. Составь план: ${planTabs[planner.tab]}, ${planner.weeks} нед., ${planner.hours} академических ч. в неделю (45 мин каждый). Область проверки: ${planner.scope||'не проверено'}.\nКарта (тема / навык: верно из отвеченных):\n${planner.cells.map(c=>`${c.topic} / ${c.skill}: ${c.right} из ${c.n}`).join('\n')||'Нет ответов.'}\nЧерновик: ${schedule.map((s,i)=>`${i+1}. ${s.name}`).join('; ')}.\nПредложи для каждой недели цель, упражнения, время и проверяемый критерий успеха. Соблюдай бюджет. Единичную ошибку сначала перепроверь, не делай выводов о непроверенных темах. Не придумывай баллы или номера задач.`}
function renderPlanner(){
 const root=document.getElementById('plan-body');if(!root)return;
 const schedule=makeSchedule(),options=(vs,val)=>vs.map(x=>`<option ${x===val?'selected':''}>${x}</option>`).join('');
 root.innerHTML=`<div class="buttons plan-tabs">${Object.entries(planTabs).map(([k,v])=>`<button aria-pressed="${planner.tab===k}" class="${planner.tab===k?'sel':''}" onclick="planner.tab='${k}';renderPlanner()">${v}</button>`).join('')}</div><div class="plan-controls"><label>Период, недель <select onchange="planner.weeks=Number(this.value);renderPlanner()">${options([1,2,4,6,8],planner.weeks)}</select></label><label>Академических часов в неделю <select onchange="planner.hours=Number(this.value);renderPlanner()">${options([1,2,3,4,5,6],planner.hours)}</select></label><b>Всего: ${planner.hours*planner.weeks} акад. ч.</b></div><p>1 академический час = 45 минут. Средняя нагрузка — ${planner.hours*45} мин в неделю. ${planner.cells.length?`Основа плана: ${planner.scope}.`:''}</p>${schedule.length?`<ol class="weeks">${schedule.map((s,i)=>`<li><small>НЕДЕЛЯ ${i+1} / ${planner.hours} АКАД. Ч.</small><h3>${s.name}</h3><b>${s.why}</b><p>${s.task}</p>${s.topic?noteLink(s.topic):''}<span>Разбор ${10*planner.hours} мин · практика ${25*planner.hours} мин · проверка ${10*planner.hours} мин</span></li>`).join('')}</ol>`:`<p>${planner.ready?'В последней проверке нет отвеченных вопросов.':'Чтобы составить персональный план, нужна тепловая карта.'} Пройди диагностику — план появится здесь.</p><a class="plan-link" href="#setup">К диагностике ↑</a>`}${planner.tab==='olymp'?`<p>Книга: <i>Physics Olympiad: Basic to Advanced Exercises</i> (Physic_Olympiad.pdf). Страницы указаны по счётчику PDF.</p><a class="plan-link" href="#olympiad-book">Открыть переведённые задачи ↓</a> · <a class="plan-link" href="#library">Архивы олимпиады Казахстана и IZhO ↓</a>`:''}${schedule.length?`<details class="ai-plan"><summary>Уточнить план с помощью ИИ</summary><p>Этот план рассчитан в браузере, без ИИ-сервиса. Чтобы получить дополнительные упражнения, скопируй запрос в выбранную модель. В него входят только сводные результаты и нагрузка; сайт ничего не отправляет.</p><textarea readonly aria-label="Запрос для ИИ-репетитора"></textarea><button onclick="copyBrief(this)">Скопировать запрос</button><span role="status"></span></details>`:''}`;
 const text=root.querySelector('textarea');if(text)text.value=aiBrief(schedule);
}
async function copyBrief(btn){const area=btn.previousElementSibling;try{await navigator.clipboard.writeText(area.value);btn.nextElementSibling.textContent=' Скопировано.'}catch{area.focus();area.select();btn.nextElementSibling.textContent=' Текст выделен — скопируй его вручную.'}}
renderPlanner();
