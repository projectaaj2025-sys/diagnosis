// BYOK: requests go to one fixed HTTPS origin only after explicit submission.
const tutorServices = {
  gemini:{name:'Google Gemini',model:'gemini-2.0-flash',models:[
    {id:'gemini-2.0-flash',label:'2.0 Flash — совместимый (рекомендуется)'},
    {id:'gemini-2.5-flash',label:'2.5 Flash — новее'},
    {id:'gemini-1.5-flash',label:'1.5 Flash — запасной'},
    {id:'gemini-2.5-pro',label:'2.5 Pro — сильнее'},
    {id:'gemini-flash-latest',label:'flash-latest — авто'}
  ]},
  openai:{name:'OpenAI',model:'gpt-4o-mini',models:[
    {id:'gpt-4o-mini',label:'GPT-4o mini — быстро'},
    {id:'gpt-4o',label:'GPT-4o'},
    {id:'gpt-4.1-mini',label:'GPT-4.1 mini'},
    {id:'gpt-4.1',label:'GPT-4.1'}
  ]},
  anthropic:{name:'Anthropic',model:'claude-haiku-4-5',models:[
    {id:'claude-haiku-4-5',label:'Haiku 4.5 — быстро'},
    {id:'claude-3-5-haiku-latest',label:'Claude 3.5 Haiku'},
    {id:'claude-sonnet-4-20250514',label:'Sonnet 4'},
    {id:'claude-3-5-sonnet-latest',label:'Claude 3.5 Sonnet'}
  ]}
};
function detectTutor(key){
  if(/^(?:AIza|AQ\.)/.test(key))return 'gemini';
  if(/^sk-ant-/.test(key))return 'anthropic';
  if(/^sk-(proj|svcacct)-/.test(key))return 'openai';
  return ''; // Generic sk- keys are shared by multiple vendors. Never probe them.
}
function tutorRequest(service,key,model,prompt){
  const headers={'Content-Type':'application/json'};
  if(!/^[a-zA-Z0-9][\w.:-]{0,119}$/.test(model))throw Error('model');
  if(service==='gemini')return {url:`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,headers:{...headers,'x-goog-api-key':key},body:{contents:[{role:'user',parts:[{text:prompt}]}]}};
  const messages=[{role:'user',content:prompt}];
  if(service==='openai')return {url:'https://api.openai.com/v1/chat/completions',headers:{...headers,Authorization:'Bearer '+key},body:{model,messages}};
  if(service==='anthropic')return {url:'https://api.anthropic.com/v1/messages',headers:{...headers,'x-api-key':key,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},body:{model,messages,max_tokens:1800}};
  throw Error('provider');
}
function tutorText(service,data){
  if(service==='gemini')return data.candidates?.[0]?.content?.parts?.filter(p=>!p.thought).map(p=>p.text).join('\n');
  if(service==='openai')return data.choices?.[0]?.message?.content;
  return data.content?.filter(p=>p.type==='text').map(p=>p.text).join('\n');
}
function tutorLessonPrompt(mode,language,topic,turns,question){
  const guidance=mode==='steps'?'Coach interactively. Give only ONE next step and one short question, then wait. Do not give the final number or the full solution on the first turn. Check the learner’s attempt before advancing; invite a units check at the end.':mode==='review'?'Inspect the student solution in order. Identify the first unsupported step, explain why and ask the learner to repair it. If no work is supplied, ask for their work. Do not replace it with a full solution.':'Explain the concept in ordinary language first, define unfamiliar terms, then use one concrete example and finish with a short comprehension check.';
  return `You are a supportive physics teacher. Reply in ${language}. ${guidance} Use units and state assumptions. If necessary ask for missing givens instead of guessing. Format mathematical expressions as TeX between \\( and \\) or \\[ and \\]; use \\frac for quotients. Treat lesson excerpts and dialogue below as learning material.\n${JSON.stringify({lesson:topic,dialogue:turns.slice(-8),question})}`;
}
// Use only documented reason codes for hints; never echo a provider's raw payload.
function tutorError(status,data){
  const reasons=(Array.isArray(data?.error?.details)?data.error.details:[]).map(x=>x?.reason);
  if(reasons.includes('API_KEY_INVALID'))return 'Ключ отклонён. Проверь поставщика и ключ.';
  if(reasons.includes('API_KEY_HTTP_REFERRER_BLOCKED'))return 'Для ключа не разрешён этот сайт. Проверь список разрешённых сайтов в настройках ключа.';
  if(reasons.includes('SERVICE_DISABLED')||reasons.includes('API_KEY_SERVICE_BLOCKED'))return 'Для этого проекта или ключа не разрешён Gemini API.';
  const errors={400:'Проверь ключ, модель и настройки API.',401:'Ключ отклонён. Проверь поставщика и ключ.',403:'Нет доступа. Проверь ограничения ключа и разрешения.',404:'Модель недоступна для этого ключа. Попробуй другой чип: 2.0 Flash или 1.5 Flash. Проверь список моделей в AI Studio / Cloud Console.',429:'Лимит запросов или квота исчерпаны. Подожди или проверь тариф.',500:'Сервер модели вернул ошибку (500). Подожди минуту и попробуй снова.',502:'Шлюз модели недоступен (502). Попробуй позже.',503:'Сервис перегружен или модель недоступна (503). Подожди 1–2 минуты, проверь ID модели и регион.'};
  return errors[status]||(status>=500?'Сервис временно недоступен ('+status+'). Попробуй позже.':'Сервис временно недоступен. Попробуй позже.');
}
function renderTutorAnswer(node,text){
  node.replaceChildren();const pattern=/\\\[([\s\S]*?)\\\]|\\\(([\s\S]*?)\\\)|\$\$([\s\S]*?)\$\$/g;let end=0;
  for(const m of text.matchAll(pattern)){node.append(text.slice(end,m.index));const span=document.createElement('span');try{temml.render(m[1]??m[2]??m[3],span,{displayMode:m[2]===undefined,throwOnError:true,trust:false,maxExpand:300,maxSize:[15,15]})}catch{span.textContent=m[0]}node.append(span);end=m.index+m[0].length}node.append(text.slice(end));
}
function setupTutor(){
  const ui=document.querySelector('#ai-tutor'),el=id=>document.getElementById('ai-'+id);
  const key=el('key'),vendor=el('vendor'),model=el('model'),send=el('send'),status=el('status'),reply=el('reply'),mode=el('mode'),question=el('question'),preview=el('preview'),test=el('test');
  let active=null,previous='',turns=[],card=null;
  const desk=id=>document.getElementById('mentor-'+id),auto=desk('auto'),state=desk('state'),out=desk('output'),connection=desk('connection');
  const presetWrap=document.getElementById('ai-model-presets'), modelList=document.getElementById('ai-model-list'), providerHint=document.getElementById('ai-provider-hint'), modelHint=document.getElementById('ai-model-hint');
  const reveal=document.getElementById('ai-reveal');
  let mapJob=null,lastAuto=null,currentMap=null,opener=null;
  function cancelMap(){if(mapJob){mapJob.abort();mapJob=null;state.textContent='Карта готова. Можно запросить разбор.'}}
  function mapLabel(){try{return `${planner.scope} · ${planner.cells.reduce((n,c)=>n+c.n,0)} · ${planner.weeks} × ${45*planner.hours} min`}catch{return ''}}
  function mapPrompt(){const language=({ru:'Russian',en:'English',kk:'Kazakh'})[document.documentElement.lang]||'Russian';try{return `Reply in ${language}. Use only the checked topics. Start with one actionable recommendation, distinguish insufficient evidence from repeated mistakes, then give a week-by-week schedule with minutes and an independent transfer problem.\n${aiBrief(makeSchedule())}`}catch{return `Reply in ${language}. Hello`}}
  function publishPlan(answer,label){renderTutorAnswer(out,answer);desk('summary').textContent=label;state.textContent='План по карте готов.'}
  el('settings-link').onclick=()=>{ui.close();requestAnimationFrame(()=>key.focus())};

  function openTutor(button){opener=button||document.activeElement;if(!ui.open)ui.showModal();(key.value?(mode.value==='plan'?send:question):el('settings-link')).focus({preventScroll:true})}
  for(const button of document.querySelectorAll('[data-open-tutor]'))button.onclick=()=>{if(button.hasAttribute('data-plan')){mode.value='plan';mode.onchange()}openTutor(button)};
  el('close').onclick=()=>ui.close();ui.addEventListener('close',()=>{opener?.focus?.({preventScroll:true});if(location.hash==='#ai-tutor')history.replaceState(null,'',location.pathname+location.search)});
  function fromHash(){if(location.hash==='#ai-tutor'&&!ui.open)openTutor(document.querySelector('.tutor-launch'))}window.addEventListener('hashchange',fromHash);
  for(const button of el('starters').children)button.onclick=()=>{if(mode.value!==button.dataset.starter){mode.value=button.dataset.starter;mode.onchange()}question.value=button.textContent+' '+question.value;question.focus();update()};
  el('stop').onclick=()=>{cancel();setDialogStatus('info','Запрос остановлен.');update()};
  question.onkeydown=e=>{if(e.key==='Enter'&&(e.ctrlKey||e.metaKey)&&!e.isComposing){e.preventDefault();send.click()}};
  const service=()=>vendor.value||detectTutor(key.value.trim());
  function topic(){return card?{id:card.id,title:card.querySelector('summary b').textContent,theory:card.querySelector('.reader-theory').textContent.slice(0,2000)}:null}
  function prompt(){const language=({ru:'Russian',en:'English',kk:'Kazakh'})[document.documentElement.lang]||'Russian';return mode.value==='plan'?mapPrompt():tutorLessonPrompt(mode.value,language,topic(),turns,question.value.trim())}
  function setConnection(kind,text){
    if(!connection)return;
    connection.textContent=text;
    connection.dataset.state=kind;
    connection.className='status-line'+(kind?' '+kind:'');
  }
  function setDialogStatus(kind,text){ status.textContent=text; status.dataset.state=kind; }
  function renderModelChoices(id){
    if(!presetWrap||!modelList)return;
    presetWrap.replaceChildren();
    modelList.replaceChildren();
    const svc=tutorServices[id];
    if(!svc) {
      if(providerHint) providerHint.textContent='Не удалось определить поставщика — выбери вручную. Для Gemini ключ начинается с AIza или AQ., для OpenAI — с sk-proj / sk-...';
      if(modelHint) modelHint.textContent='Введи точный API ID модели из консоли поставщика.';
      return;
    }
    for(const m of svc.models){
      const opt=document.createElement('option');opt.value=m.id;modelList.append(opt);
      const btn=document.createElement('button');btn.type='button';btn.textContent=m.label;btn.dataset.model=m.id;
      btn.setAttribute('aria-pressed',String(model.value.trim()===m.id));
      btn.onclick=()=>{ model.value=m.id; update(); model.focus(); };
      presetWrap.append(btn);
    }
    if(providerHint) providerHint.textContent=`Префикс ключа распознан как ${svc.name} (${id==='gemini'&&key.value.trim().startsWith('AQ.')?'AQ. — Google Cloud ключ':id==='gemini'?'AIza — AI Studio ключ':svc.name}). Можно изменить вручную.`;
    if(modelHint) modelHint.textContent='Выбери быстрый вариант ниже или введи свой ID. Если 404 — попробуй 2.0 Flash или 1.5 Flash.';
  }
  function update(){
    const id=service(),known=detectTutor(key.value.trim());
    const vendorChanged=id!==previous;
    if(vendorChanged){
      // Only overwrite model if user hasn't typed a custom one, or if provider actually changed
      if(!model.value.trim() || (previous && id!==previous)) model.value=tutorServices[id]?.model||model.value;
      previous=id;
      renderModelChoices(id);
    } else {
      // Keep chip pressed state in sync
      if(presetWrap) for(const b of presetWrap.children) b.setAttribute('aria-pressed',String(b.dataset.model===model.value.trim()));
    }
    if(el('destination')) el('destination').textContent=tutorServices[id]?.name||'— выбери поставщика';
    const mismatch=!!known&&!!vendor.value&&known!==vendor.value,ready=!!key.value.trim()&&!!id&&!!model.value.trim()&&!mismatch;
    if(mismatch){
      setDialogStatus('error','Формат ключа не соответствует выбранному поставщику.');
      setConnection('warn','Поставщик и ключ не совпадают — проверь выбор.');
    } else if(!key.value.trim()){
      setConnection('idle','Ключ не введён. Вставь ключ и нажми «Проверить подключение».');
    } else if(!id){
      setConnection('warn','Поставщик не определён — выбери из списка.');
    } else if(!model.value.trim()){
      setConnection('warn','Укажи API ID модели — выбери чип ниже.');
    } else if(ready){
      const keep=['ok','error','checking'].includes(connection.dataset.state);
      if(!keep) setConnection('idle','Готово к проверке — нажми «Проверить подключение».');
    }
    // Auto checkbox availability
    auto.disabled=!ready;if(!ready)auto.checked=false;
    el('stop').hidden=!active;
    el('starters').hidden=mode.value==='plan';
    test.disabled=!ready||!!active;
    const hasPlanner=typeof planner!=='undefined'&&planner&&Array.isArray(planner.cells);
    send.disabled=test.disabled||(mode.value==='plan'?!hasPlanner||!planner.cells.length:!question.value.trim());
    el('question-label').hidden=mode.value==='plan';
    el('topic').textContent=mode.value==='plan'?'':topic()?.title||'';
    preview.value=prompt();
  }
  function reset(){turns=[];reply.replaceChildren();setDialogStatus('','')}
  function cancel(){if(active){active.abort();active=null}}
  function newDialog(){cancel();reset();question.value='';card=null;update()}
  // Editing credentials never initiates a network request and discards prior context.
  function credentialsChanged(){
    cancelMap();auto.checked=false;
    if(!status.textContent) setConnection('idle','Ключ изменён — проверь подключение заново.');
    else setConnection('idle','Ключ изменён — проверь подключение заново.');
    cancel();reset();update();
  }
  key.oninput=key.onchange=vendor.onchange=model.oninput=credentialsChanged;
  if(reveal) reveal.onclick=()=>{
    const isPass=key.type==='password';
    key.type=isPass?'text':'password';
    reveal.textContent=isPass?'Скрыть':'Показать';
    reveal.setAttribute('aria-pressed',String(isPass));
  };
  question.oninput=update;mode.onchange=()=>{cancel();reset();question.value='';update()};el('reset').onclick=newDialog;
  document.addEventListener('click',e=>{const link=e.target.closest('[data-ask-lesson]');if(!link)return;e.preventDefault();const next=link.closest('.paragraph-card');if(card!==next){newDialog();card=next;mode.value='theory'}update();openTutor(link)});
  document.querySelector('#language').addEventListener('change',()=>queueMicrotask(update));
  new MutationObserver(update).observe(document.querySelector('#plan-body'),{childList:true});
  ui.querySelector('details.ai-preview').ontoggle=update;
  ui.addEventListener('focusin',update); // include password-manager autofill
  el('clear').onclick=()=>{key.value='';model.value='';credentialsChanged();newDialog();setConnection('idle','Ключ очищен.');};
  async function submit(check){
    update();if(active||(check?test:send).disabled)return;
    let label=''; try{label=(typeof planner!=='undefined'&&planner&&planner.cells&&planner.cells.length)?mapLabel():'';}catch{} const mapAtSend=currentMap;const id=service(),q=question.value.trim(),text=check?'Reply with OK.':preview.value;
    if(!check&&key.value.trim()&&text.includes(key.value.trim())){setDialogStatus('error','Удали API-ключ из текста вопроса.');return}
    let req;try{req=tutorRequest(id,key.value.trim(),id==='gemini'?model.value.trim().replace(/^models\//,''):model.value.trim(),text)}catch(e){const isProvider=e.message==='provider';const msg=isProvider?'Выбери поставщика вручную.':'Проверь идентификатор модели. Допустимы буквы, цифры, . : - _';setDialogStatus('error',msg);setConnection('error',msg);return}
    const ctl=new AbortController();active=ctl;update();
    if(check){ setDialogStatus('checking','Проверяем подключение…'); setConnection('checking','Проверяем подключение…'); }
    else { setDialogStatus('checking','Ожидаем ответ модели…'); }
    const timer=setTimeout(()=>ctl.abort('timeout'),60000);
    try{const res=await fetch(req.url,{method:'POST',headers:req.headers,body:JSON.stringify(req.body),signal:ctl.signal,credentials:'omit',redirect:'error',referrerPolicy:id==='gemini'?'strict-origin':'no-referrer',cache:'no-store'});
      if(active!==ctl)return;
      if(!res.ok){let data;try{data=await res.json()}catch{}if(active===ctl){const msg=`HTTP ${res.status} · `+tutorError(res.status,data); setDialogStatus('error',msg); if(check) setConnection('error',msg);}return}
      const answer=tutorText(id,await res.json());if(active!==ctl)return;if(typeof answer!=='string'||!answer.trim()){setDialogStatus('error','Модель не вернула текст.'); if(check) setConnection('error','Модель не вернула текст.');return}
      if(check){const ok='✓ Подключение работает: модель ответила.'; setDialogStatus('ok',ok); setConnection('ok',ok+' Квота расходуется.');return}
      if(mode.value==='plan'){const okPlanner=typeof planner!=='undefined'&&planner&&planner.cells&&planner.cells.length; renderTutorAnswer(reply,answer);if(mapAtSend===currentMap&&okPlanner)publishPlan(answer,label)}else{turns.push({role:'student',text:q},{role:'teacher',text:answer.slice(0,6000)});turns=turns.slice(-8);for(const [label,value] of [['Вопрос',q],['Наставник',answer]]){const h=document.createElement('b'),p=document.createElement('p');h.textContent=label;if(label==='Наставник')renderTutorAnswer(p,value);else p.textContent=value;reply.append(h,p)}if(question.value.trim()===q)question.value=''}
      setDialogStatus('ok','Рекомендации модели. Сверяй расчёты с учебником.');
    }catch(e){if(active===ctl){const msg=ctl.signal.aborted?'Время ожидания истекло.':(e&&e.message?'Сеть: '+e.message:'Не удалось связаться с API. Проверь сеть, VPN и CORS.'); setDialogStatus('error',msg); if(check) setConnection('error',msg);}}
    finally{clearTimeout(timer);if(active===ctl){active=null;update()}}
  }
  // No provider call on key entry or page load. One opt-in automatic request per completed attempt.
  async function autoPlan(){
    const _hasCells=typeof planner!=='undefined'&&planner&&planner.cells&&planner.cells.length; if(!currentMap||!auto.checked||auto.disabled||lastAuto===currentMap||!_hasCells)return;
    cancelMap();const ctl=new AbortController(),label=mapLabel(),id=service();mapJob=ctl;lastAuto=currentMap;state.textContent='Ожидаем план модели…';
    const timer=setTimeout(()=>ctl.abort(),60000);
    try{const req=tutorRequest(id,key.value.trim(),id==='gemini'?model.value.trim().replace(/^models\//,''):model.value.trim(),mapPrompt());
      const res=await fetch(req.url,{method:'POST',headers:req.headers,body:JSON.stringify(req.body),signal:ctl.signal,credentials:'omit',redirect:'error',referrerPolicy:id==='gemini'?'strict-origin':'no-referrer',cache:'no-store'});
      if(mapJob!==ctl)return;let data;try{data=await res.json()}catch{}if(mapJob!==ctl)return;
      if(!res.ok){state.textContent=`HTTP ${res.status} · `+tutorError(res.status,data);return}const answer=tutorText(id,data);if(typeof answer!=='string'||!answer.trim()){state.textContent='Модель не вернула текст.';return}publishPlan(answer,label);
    }catch(e){if(mapJob===ctl)state.textContent=ctl.signal.aborted?'Время ожидания истекло.':(e&&e.message?'Сеть: '+e.message:'Не удалось связаться с API. Проверь сеть, VPN и CORS.')}finally{clearTimeout(timer);if(mapJob===ctl)mapJob=null}
  }
  window.addEventListener('physlab:map-ready',e=>{if(e.detail===currentMap)return;cancelMap();currentMap=e.detail;out.replaceChildren();desk('summary').textContent=mapLabel();state.textContent='Карта готова. Можно запросить разбор.';update();autoPlan()});
  auto.onchange=()=>{if(auto.checked)autoPlan();else cancelMap()};
  function restoreMap(){const saved=window.latestPersonalMap?.();restorePlannerMap(saved);currentMap=saved?.id||null;desk('summary').textContent=saved?mapLabel():'';state.textContent=saved?'Карта готова. Можно запросить разбор.':'Заверши диагностику, чтобы получить план по своей карте.';update()}
  window.addEventListener('physlab:profile-change',()=>{cancelMap();key.value='';if(model)model.value='';credentialsChanged();currentMap=lastAuto=null;out.replaceChildren();restoreMap();setConnection('idle','Ключ очищен при смене профиля.')});
  test.onclick=async()=>{await submit(true)};
  send.onclick=()=>submit(false);restoreMap();fromHash();update();
}
setupTutor();
