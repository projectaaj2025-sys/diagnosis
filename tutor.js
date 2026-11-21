// BYOK: requests go to one fixed HTTPS origin only after explicit submission.
const tutorServices = {
  gemini:{name:'Google Gemini',model:'gemini-flash-latest'},
  openai:{name:'OpenAI',model:'gpt-4o-mini'},
  anthropic:{name:'Anthropic',model:'claude-haiku-4-5'}
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
  const errors={400:'Проверь ключ, модель и настройки API.',401:'Ключ отклонён. Проверь поставщика и ключ.',403:'Нет доступа. Проверь ограничения ключа и разрешения.',404:'Модель недоступна. Укажи модель из своего кабинета.',429:'Лимит запросов или квота исчерпаны.'};
  return errors[status]||'Сервис временно недоступен. Попробуй позже.';
}
function renderTutorAnswer(node,text){
  node.replaceChildren();const pattern=/\\\[([\s\S]*?)\\\]|\\\(([\s\S]*?)\\\)|\$\$([\s\S]*?)\$\$/g;let end=0;
  for(const m of text.matchAll(pattern)){node.append(text.slice(end,m.index));const span=document.createElement('span');try{temml.render(m[1]??m[2]??m[3],span,{displayMode:m[2]===undefined,throwOnError:true,trust:false,maxExpand:300,maxSize:[15,15]})}catch{span.textContent=m[0]}node.append(span);end=m.index+m[0].length}node.append(text.slice(end));
}
function setupTutor(){
  const ui=document.querySelector('#ai-tutor'),el=id=>ui.querySelector('#ai-'+id);
  const key=el('key'),vendor=el('vendor'),model=el('model'),send=el('send'),status=el('status'),reply=el('reply'),mode=el('mode'),question=el('question'),preview=el('preview'),test=el('test');
  let active=null,previous='',turns=[],card=null;
  let opener=null;
  function openTutor(button){opener=button||document.activeElement;if(!ui.open)ui.showModal();(key.value?question:key).focus({preventScroll:true})}
  for(const button of document.querySelectorAll('[data-open-tutor]'))button.onclick=()=>openTutor(button);
  el('close').onclick=()=>ui.close();ui.addEventListener('close',()=>{opener?.focus?.({preventScroll:true});if(location.hash==='#ai-tutor')history.replaceState(null,'',location.pathname+location.search)});
  function fromHash(){if(location.hash==='#ai-tutor'&&!ui.open)openTutor(document.querySelector('.tutor-launch'))}window.addEventListener('hashchange',fromHash);
  for(const button of el('starters').children)button.onclick=()=>{if(mode.value!==button.dataset.starter){mode.value=button.dataset.starter;mode.onchange()}question.value=button.textContent+' '+question.value;question.focus();update()};
  el('stop').onclick=()=>{cancel();status.textContent='Запрос остановлен.';update()};
  question.onkeydown=e=>{if(e.key==='Enter'&&(e.ctrlKey||e.metaKey)&&!e.isComposing){e.preventDefault();send.click()}};
  const service=()=>vendor.value||detectTutor(key.value.trim());
  function topic(){return card?{id:card.id,title:card.querySelector('summary b').textContent,theory:card.querySelector('.reader-theory').textContent.slice(0,2000)}:null}
  function prompt(){const language=({ru:'Russian',en:'English',kk:'Kazakh'})[document.documentElement.lang]||'Russian';return mode.value==='plan'?`You are a physics teacher. Reply in ${language}. Explain priorities, a worked example, a transfer question and a success criterion. Never diagnose a gap from one mistake. Without responses suggest an assessment. Respect the time budget.\n${aiBrief(makeSchedule())}`:tutorLessonPrompt(mode.value,language,topic(),turns,question.value.trim())}
  function update(){const id=service(),known=detectTutor(key.value.trim());if(id!==previous){model.value=tutorServices[id]?.model||'';previous=id}el('destination').textContent=tutorServices[id]?.name||'Выбери поставщика вручную';
    const mismatch=!!known&&!!vendor.value&&known!==vendor.value,ready=!!key.value.trim()&&!!id&&!!model.value.trim()&&!mismatch;
    if(mismatch)status.textContent='Формат ключа не соответствует выбранному поставщику.';
    el('stop').hidden=!active;el('starters').hidden=mode.value==='plan';test.disabled=!ready||!!active;send.disabled=test.disabled||(mode.value!=='plan'&&!question.value.trim());el('question-label').hidden=mode.value==='plan';el('topic').textContent=mode.value==='plan'?'':topic()?.title||'';preview.value=prompt();
  }
  function reset(){turns=[];reply.replaceChildren();status.textContent=''}
  function cancel(){if(active){active.abort();active=null}}
  function newDialog(){cancel();reset();question.value='';card=null;update()}
  // Editing credentials never initiates a network request and discards prior context.
  function credentialsChanged(){cancel();reset();update()}
  key.oninput=key.onchange=vendor.onchange=model.oninput=credentialsChanged;
  question.oninput=update;mode.onchange=()=>{cancel();reset();question.value='';update()};el('reset').onclick=newDialog;
  document.addEventListener('click',e=>{const link=e.target.closest('[data-ask-lesson]');if(!link)return;e.preventDefault();const next=link.closest('.paragraph-card');if(card!==next){newDialog();card=next;mode.value='theory'}update();openTutor(link)});
  document.querySelector('#language').addEventListener('change',()=>queueMicrotask(update));
  new MutationObserver(update).observe(document.querySelector('#plan-body'),{childList:true});
  ui.querySelector('details.ai-preview').ontoggle=update;
  ui.addEventListener('focusin',update); // include password-manager autofill
  el('clear').onclick=()=>{key.value='';newDialog()};
  async function submit(check){
    update();if(active||(check?test:send).disabled)return;
    const id=service(),q=question.value.trim(),text=check?'Reply with OK.':preview.value;
    if(!check&&text.includes(key.value.trim())){status.textContent='Удали API-ключ из текста вопроса.';return}
    let req;try{req=tutorRequest(id,key.value.trim(),id==='gemini'?model.value.trim().replace(/^models\//,''):model.value.trim(),text)}catch{status.textContent='Проверь идентификатор модели.';return}
    const ctl=new AbortController();active=ctl;update();status.textContent='Ожидаем ответ модели…';const timer=setTimeout(()=>ctl.abort('timeout'),60000);
    try{const res=await fetch(req.url,{method:'POST',headers:req.headers,body:JSON.stringify(req.body),signal:ctl.signal,credentials:'omit',redirect:'error',referrerPolicy:id==='gemini'?'strict-origin':'no-referrer',cache:'no-store'});
      if(active!==ctl)return;
      if(!res.ok){let data;try{data=await res.json()}catch{}if(active===ctl)status.textContent=`HTTP ${res.status} · `+tutorError(res.status,data);return}
      const answer=tutorText(id,await res.json());if(active!==ctl)return;if(typeof answer!=='string'||!answer.trim()){status.textContent='Модель не вернула текст.';return}
      if(check){status.textContent='Подключение проверено: модель ответила.';return}
      if(mode.value==='plan'){renderTutorAnswer(reply,answer)}else{turns.push({role:'student',text:q},{role:'teacher',text:answer.slice(0,6000)});turns=turns.slice(-8);for(const [label,value] of [['Вопрос',q],['Наставник',answer]]){const h=document.createElement('b'),p=document.createElement('p');h.textContent=label;if(label==='Наставник')renderTutorAnswer(p,value);else p.textContent=value;reply.append(h,p)}if(question.value.trim()===q)question.value=''}
      status.textContent='Рекомендации модели. Сверяй расчёты с учебником.';
    }catch{if(active===ctl)status.textContent=ctl.signal.aborted?'Время ожидания истекло.':'Не удалось связаться с API. Проверь сеть и доступ из браузера.'}
    finally{clearTimeout(timer);if(active===ctl){active=null;update()}}
  }
  test.onclick=()=>submit(true);send.onclick=()=>submit(false);update();fromHash();
}
setupTutor();
