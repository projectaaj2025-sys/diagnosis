// BYOK: requests go to one fixed HTTPS origin only after explicit submission.
const tutorServices = {
  gemini:{name:'Google Gemini',model:'gemini-2.5-flash'},
  openai:{name:'OpenAI',model:'gpt-4o-mini'},
  anthropic:{name:'Anthropic',model:'claude-haiku-4-5'}
};
function detectTutor(key){
  if(/^AIza/.test(key))return 'gemini';
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
function setupTutor(){
  const ui=document.querySelector('#ai-tutor'),el=id=>ui.querySelector('#ai-'+id);
  const key=el('key'),vendor=el('vendor'),model=el('model'),send=el('send'),status=el('status'),reply=el('reply');
  let active=null,previous='';
  const service=()=>vendor.value||detectTutor(key.value.trim());
  function update(){const id=service();if(id!==previous){model.value=tutorServices[id]?.model||'';previous=id}el('destination').textContent=tutorServices[id]?.name||'Выбери поставщика вручную';send.disabled=!key.value.trim()||!id||!model.value.trim()||!!active}
  function prompt(){return `You are a physics tutor. Reply in ${({ru:'Russian',en:'English',kk:'Kazakh'})[document.documentElement.lang]||'Russian'}. Use the anonymous summary below. Do not infer a gap from one mistake. For each priority give a short explanation, a worked example, an independent transfer question and a success criterion. If no responses exist, propose a starting assessment, not a diagnosis. Respect the time budget.\n\n${aiBrief(makeSchedule())}`}
  const preview=el('preview');function refresh(){preview.value=prompt()}
  key.oninput=vendor.onchange=model.oninput=update;
  ui.querySelector('details.ai-preview').ontoggle=refresh;
  document.querySelector('#language').addEventListener('change',refresh);
  new MutationObserver(refresh).observe(document.querySelector('#plan-body'),{childList:true});
  el('clear').onclick=()=>{active?.abort();key.value='';reply.textContent='';status.textContent='';update()};
  send.onclick=async()=>{
    const id=service();if(active||!id||!key.value.trim())return;
    let req;refresh();try{req=tutorRequest(id,key.value.trim(),model.value.trim(),preview.value)}catch{status.textContent='Проверь идентификатор модели.';return}
    const ctl=new AbortController();active=ctl;update();reply.textContent='';status.textContent='Ожидаем ответ модели…';
    const timer=setTimeout(()=>ctl.abort('timeout'),60000);
    try{
      const res=await fetch(req.url,{method:'POST',headers:req.headers,body:JSON.stringify(req.body),signal:ctl.signal,credentials:'omit',redirect:'error',referrerPolicy:'no-referrer',cache:'no-store'});
      if(!res.ok){const errors={400:'Проверь ключ, модель и настройки API.',401:'Ключ отклонён. Проверь поставщика и ключ.',403:'Нет доступа. Проверь ограничения ключа и разрешения.',404:'Модель недоступна. Укажи модель из своего кабинета.',429:'Лимит запросов или квота исчерпаны.'};status.textContent=errors[res.status]||'Сервис временно недоступен. Попробуй позже.';return}
      const text=tutorText(id,await res.json());if(typeof text!=='string'||!text.trim()){status.textContent='Модель не вернула текст.';return}
      reply.textContent=text;status.textContent='Рекомендации модели. Сверяй расчёты с учебником.';
    }catch{status.textContent=ctl.signal.aborted?(ctl.signal.reason==='timeout'?'Время ожидания истекло.':''):'Не удалось связаться с API. Проверь сеть и доступ из браузера.'}
    finally{clearTimeout(timer);active=null;update()}
  };refresh();update();
}
setupTutor();
