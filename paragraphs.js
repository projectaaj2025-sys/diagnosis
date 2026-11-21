// Inclusive final paragraph in each curriculum quarter (printed textbooks, not PDF parts).
const textbookQuarters = {7:[10,20,30,39],8:[12,21,36,43],9:[12,19,31,43],10:[16,27,44,52],11:[11,21,45,51]};
(() => {
  const ui={
    contents:['Параграфы этой четверти','This term, paragraph by paragraph','Осы тоқсанның параграфтары'],
    extra:['Ещё по темам: подробные разборы и опыты','Explore further: worked lessons and experiments','Тақырыптарды тереңдету: талдау мен тәжірибелер'],
    experiment:['Мысленный опыт или рисунок','Thought experiment or sketch','Ойша тәжірибе немесе сызба'],
    example:['Разбор на примере','Worked example','Мысалмен талдау'],
    check:['Проверь себя','Try a variation','Өзіңді тексер'],
    answer:['Сверить ответ','Check your answer','Жауапты тексеру'],
    more:['Шаг глубже','A closer look','Тереңірек қара'],
    page:['с.','p.','б.'],
    source:['Учебник «Физика» · Н. А. Закирова и соавт.','Physics textbook · N. Zakirova et al.','«Физика» оқулығы · Н. А. Закирова және т.б.'],
    detail:['Открыть подробный конспект →','Open the extended lesson →','Толық конспектіні ашу →']
  };
  const extended={'7.5':'story-measure','7.9':'note-motion','7.13':'note-density','7.22':'read-ski','7.28':'note-buoy','7.32':'note-energy','7.35':'note-lever','8.7':'note-heat','8.9':'story-thermal','8.13':'note-gas','8.26':'note-circuits','8.27':'note-power','8.38':'note-optics','8.41':'note-lens','9.4':'read-brake','9.15':'note-forces','9.20':'note-impulse','9.24':'read-swing','9.29':'note-waves','9.33':'note-quantum','10.15':'read-flow','10.21':'note-isotherm','10.50':'read-flux','11.1':'read-swing','11.13':'story-phase','11.46':'read-star'};
  // Schematics are deliberately not to scale. All numerical values appear as selectable text too.
  const sketches=[
    ['pressure','M15 72H242 M37 70V50H84V70 M124 70V60H224V70 M60 10V45l-4 -6m4 6l4 -6 M174 10V55l-4 -6m4 6l4 -6','F, S₁','F, S₂'],
    ['acc accdist','M24 12V70H236 M26 16L191 69','v','t'],
    ['vector relative net','M29 30H176l-8 -5m8 5l-8 5 M176 50H92l8 -5m-8 5l8 5 M29 70H92l-6 -4m6 4l-6 4','+x →','Σ'],
    ['pendulum','M60 12H185 M120 12V67 M120 12L160 57 M117 67a4 4 0 1 0 8 0a4 4 0 1 0 -8 0 M156 57a4 4 0 1 0 8 0a4 4 0 1 0 -8 0','l','θ'],
    ['capacitor capenergy equip field','M25 20H220 M25 68H220 M58 24V60l-4 -6m4 6l4 -6 M122 24V60l-4 -6m4 6l4 -6 M189 24V60l-4 -6m4 6l4 -6','+','−'],
    ['throw fall','M24 15V72H235 M29 18Q116 17 201 70','y','x'],
    ['lever centre','M20 48H225 M106 48l-10 17h20z M40 18V45l-4 -6m4 6l4 -6 M205 18V45l-4 -6m4 6l4 -6','F₁, d₁','F₂, d₂'],
    ['reflect','M20 65H235 M128 12V70 M58 19L128 65L198 19','θᵢ','θᵣ'],
    ['refract','M15 43H235 M125 7V76 M57 9L125 43L150 75','n₁','n₂'],
    ['flow laminar','M18 17H88L151 31H233 M18 70H88L151 56H233 M29 42H65l-6 -4m6 4l-6 4 M155 43H218l-6 -4m6 4l-6 4','S₁','S₂'],
    ['wave harmonic period stand','M14 44H236 M17 44q22 -58 51 0t51 0t51 0t51 0','x','→'],
    ['parallax','M25 68L127 13L229 68Z M127 13V68','A','B'],
    ['buoy float','M16 45H241 M89 26H164V68H89Z M69 65V24l-4 6m4 -6l4 6 M183 25V65l-4 -6m4 6l4 -6','Fᴀ','mg'],
    ['parallel','M18 43H60V21H100v-5h45v10h-45v-5 M145 21H184V65H145v5h-45v-10h45v5 M100 65H60V43 M184 43H235','R₁','R₂'],
    ['shadow nature','M20 16L182 66 M20 16L225 66 M99 42V66 M16 67H237','h','s'],
    ['orbit circle centrip','M128 44m-57 0a57 28 0 1 0 114 0a57 28 0 1 0 -114 0 M183 44H133l7 -4m-7 4l7 4 M185 44V10l-4 6m4 -6l4 6','a','v'],
    ['gravity force newton','M105 28H148V55H105Z M127 27V9l-4 6m4 -6l4 6 M127 56V75l-4 -6m4 6l4 -6','N','mg']
  ];
  const legend=[['Сравни площади при одной нагрузке','Compare areas for the same load','Бір жүктемедегі аудандарды салыстыр'],['Площадь под графиком скорости — путь при движении вперёд','Area under a forward speed trace gives distance','Алға қозғалыста жылдамдық графигінің астындағы аудан — жол'],['Сложение направленных отрезков','Adding directed segments','Бағытталған кесінділерді қосу'],['Крайнее положение и положение равновесия','Extreme and equilibrium positions','Шеткі және тепе-теңдік күйлері'],['Однородное поле между параллельными пластинами','Uniform field between parallel plates','Параллель пластиналар арасындағы біртекті өріс'],['Горизонтальный бросок без сопротивления','Horizontal launch without drag','Кедергісіз көлденең лақтыру'],['Силы по разные стороны от опоры','Forces on opposite sides of a support','Тіректің екі жағындағы күштер'],['Углы от нормали к зеркалу','Angles relative to the mirror normal','Айна нормалінен өлшенген бұрыштар'],['Луч на границе двух сред','Ray at an interface','Екі ортаның шекарасындағы сәуле'],['Сечения одной трубки тока','Cross sections along a stream tube','Ағын түтігінің қималары'],['Периодическое изменение смещения','Periodic variation of displacement','Ығысудың периодты өзгерісі'],['Два положения наблюдателя','Two observer positions','Бақылаушының екі орны'],['Вес и выталкивающая сила','Weight and buoyant force','Ауырлық және Архимед күштері'],['Две ветви между общими узлами','Two branches between shared nodes','Ортақ түйіндер арасындағы екі тармақ'],['Прямые лучи и край тени','Straight rays and shadow edge','Түзу сәулелер және көлеңке шеті'],['Скорость по касательной, ускорение к центру','Tangential velocity, inward acceleration','Жанама жылдамдық, центрге бағытталған үдеу'],['Силы на теле у горизонтальной опоры','Forces on a body at a horizontal support','Көлденең тіректегі денеге әсер ететін күштер']];
  const picker=document.getElementById('language');
  let language='ru';try{language=localStorage.getItem('physlab-language')||language}catch{}
  const bookIds={7:1523,8:348,9:451,10:531,11:803};
  const rules=new Map(paragraphRules.flatMap(([keys,formula,usage])=>keys.map(key=>[key,{formula,usage}])));
  const fields=[];
  const experiments=new Map(paragraphExperiments.flatMap(([keys,text])=>keys.map(key=>[key,text])));
  function index(){return language==='kk'?2:language==='en'?1:0}
  function tag(parent,name,value,cls){const n=document.createElement(name);if(cls)n.className=cls;if(Array.isArray(value)){fields.push([n,value]);n.textContent=value[index()]}else if(value)n.textContent=value;parent.append(n);return n}
  const modelIndex=new Map(lessonModels.flatMap(([keys,labels,calc])=>keys.split(' ').map(k=>[k,[labels,calc]])));
  function mountSimulator(card,key){
    const [[xLabel,yLabel,fixed,math,substitution],calc]=modelIndex.get(key);
    const lab=tag(card,'section',null,'model-lab');tag(lab,'h4',['Практикум · исследуй график','Lab · investigate the graph','Практикум · графикті зертте']);
    tag(lab,'p',['Сначала предскажи, как изменится результат. Затем перемещай точку по графику. Остальные условия постоянны.','Predict how the result will change, then move the point along the graph. Other conditions stay fixed.','Алдымен нәтиже қалай өзгеретінін болжа. Содан кейін нүктені график бойымен жылжыт. Қалған шарттар тұрақты.']);
    tag(lab,'p',fixed,'model-fixed');const equation=tag(lab,'div',null,'model-equation');equation.innerHTML=math;
    const demo=tag(lab,'details',null,'model-demo');tag(demo,'summary',['Разбор расчётной точки','Worked point on the graph','График нүктесін есептеу']);const steps=tag(demo,'ol',null,'worked-steps');
    tag(steps,'li',[`Дано: ${xLabel} = 3; ${fixed}. Найти: ${yLabel}.`,`Given: ${xLabel} = 3; ${fixed}. Find ${yLabel}.`,`Берілгені: ${xLabel} = 3; ${fixed}. Табу керек: ${yLabel}.`]);
    tag(steps,'li',[`Подставляем в модель с учётом единиц осей: ${substitution}.`,`Substitute in the model using the axis units: ${substitution}.`,`Ось бірліктерін ескеріп модельге қоямыз: ${substitution}.`]);
    const result=Number(calc(3).toPrecision(4));tag(steps,'li',[`Ответ: ${yLabel} ≈ ${result}. Для проверки поставь регулятор на 3.`,`Result: ${yLabel} ≈ ${result}. Check with the slider at 3.`,`Жауабы: ${yLabel} ≈ ${result}. Тексеру үшін реттегішті 3-ке қой.`]);
    const control=tag(lab,'label');tag(control,'b',xLabel);const slider=tag(control,'input');slider.type='range';slider.min=1;slider.max=5;slider.step=1;slider.value=2;
    const reading=tag(lab,'output');const graph=tag(lab,'div',null,'model-chart');const vals=[1,2,3,4,5].map(calc),low=Math.min(...vals,0),high=Math.max(...vals,0),fmt=n=>Number(n.toPrecision(4)).toString(),py=n=>112-90*(n-low)/(high-low||1),px=n=>46+(n-1)*68;
    const discrete=['digital','nucleus','reaction','particle','gascurrent','grating','method','mass','calendar','model','error','rutherford'].includes(key);
    const points=Array.from({length:81},(_,i)=>`${px(1+i/20)},${py(calc(1+i/20))}`).join(' ');
    graph.innerHTML=`<svg viewBox="0 0 360 146" aria-hidden="true"><path d="M46 16V112H325" fill="none" stroke="#7d9699"/><text x="2" y="24">${fmt(high)}</text><text x="2" y="114">${fmt(low)}</text>${discrete?'':`<polyline points="${points}" fill="none" stroke="#2a6872" stroke-width="2.6"/>`}${vals.map((v,i)=>`<circle cx="${px(i+1)}" cy="${py(v)}" r="3" fill="#255662"/><text x="${px(i+1)-3}" y="134">${i+1}</text>`).join('')}<circle class="marker" r="6" fill="#a34228"/></svg>`;
    function draw(){const x=+slider.value,y=calc(x);reading.textContent=`${xLabel}: ${x}    →    ${yLabel}: ${fmt(y)}`;const mark=graph.querySelector('.marker');mark.setAttribute('cx',px(x));mark.setAttribute('cy',py(y))} slider.oninput=draw;draw();
    const activity=tag(lab,'div',null,'model-task');tag(activity,'strong',['Твоя проверка','Your prediction','Өзіңді тексер']);tag(activity,'p',[`При ${xLabel} = 4 вычисли ${yLabel}. Введи число в указанных единицах.`,`For ${xLabel} = 4, calculate ${yLabel}. Enter the number in the indicated units.`,`${xLabel} = 4 болса, ${yLabel} мәнін есепте. Көрсетілген бірлікпен сан енгіз.`]);const input=tag(activity,'input');input.inputMode='decimal';input.setAttribute('aria-label',yLabel);const button=tag(activity,'button',['Проверить','Check','Тексеру']);button.type='button';const feedback=tag(activity,'output');feedback.setAttribute('aria-live','polite');let last=null;
    function checkValue(){const text=input.value.trim().replace(',','.');last=text!==''&&Number.isFinite(Number(text))&&Math.abs(Number(text)-calc(4))<=Math.max(1e-8,Math.abs(calc(4))*.01);feedback.textContent=(last?['Верно.','Correct.','Дұрыс.']:['Проверь единицы и сравни с точкой 4 на графике.','Check the units and compare with point 4 on the graph.','Бірліктерді тексеріп, графиктегі 4-нүктемен салыстыр.'])[index()]}button.onclick=checkValue;input.onkeydown=e=>{if(e.key==='Enter')checkValue()};picker.addEventListener('change',()=>{if(last!==null)checkValue()});
  }
  function appendExercise(card,id){const exercise=bookExercises[id];if(!exercise)return;const [number,page,...parts]=exercise;tag(card,'h4',[`Из учебника · упр. ${number}, с. ${page}`,`Textbook exercise ${number}, p. ${page}`,`Оқулықтан · ${number}-жаттығу, ${page}-б.`]);tag(card,'p',parts[0]);const steps=tag(card,'ol',null,'worked-steps');for(const step of parts.slice(1))tag(steps,'li',step)}
  for(const panel of document.querySelectorAll('.shelf-panel')){
    const {grade,term}=panel.dataset,limits=textbookQuarters[grade],first=(limits[term-2]||0)+1,last=limits[term-1];
    const wrap=document.createElement('div');wrap.className='paragraph-shelf';wrap.setAttribute('data-own-language','');
    panel.querySelector('.note-list').before(wrap);tag(wrap,'h4',ui.contents);const grid=tag(wrap,'div',null,'paragraph-grid');
    for(let num=first;num<=last;num++){
      const [page,title,key]=textbookIndex[grade][num-1],[idea,example,check,answer]=paragraphNotes[key],id=`${grade}.${num}`;
      const card=tag(grid,'details',null,'paragraph-card');card.id=`para-${grade}-${num}`;
      const summary=tag(card,'summary');tag(summary,'small',ui.page.map(p=>`§ ${num} · ${p} ${page}`));tag(summary,'b',title);
      tag(card,'p',idea);
      const si=sketches.findIndex(s=>s[0].split(' ').includes(key));if(si>=0){const [,path,l,r]=sketches[si];const figure=tag(card,'figure',null,'worked-figure');figure.innerHTML=`<svg aria-hidden="true" viewBox="0 0 255 99"><path d="${path}" fill="none" stroke="#416975" stroke-width="2.5"/><text x="25" y="94">${l}</text><text x="190" y="94">${r}</text></svg>`;tag(figure,'figcaption',legend[si])}
      const lab=tag(card,'aside',null,'paragraph-lab');tag(lab,'strong',ui.experiment);tag(lab,'p',experiments.get(key));
      const rule=rules.get(key);tag(card,'h4',['Модель и условия применения','Model and assumptions','Модель және қолданылу шарттары']);tag(card,'div',null,'law model-equation').innerHTML=formattedLaws[rule.formula];tag(card,'p',rule.usage);tag(card,'h4',ui.example);tag(card,'p',example,'law');
      if(paragraphExtensions[id]){const [extra,calc]=paragraphExtensions[id];tag(card,'h4',ui.more);tag(card,'p',extra);tag(card,'p',calc,'law')}
      if(topicSupplement[id]){const [q,law,ex]=topicSupplement[id];tag(card,'h4',q);tag(card,'p',law,'law');tag(card,'p',ex)}
      tag(card,'h4',ui.check);tag(card,'p',check);const reveal=tag(card,'details');tag(reveal,'summary',ui.answer);tag(reveal,'p',answer,'law');
      appendExercise(card,id);
      card.addEventListener('toggle',()=>{if(card.open&&!card.querySelector('.model-lab')){mountSimulator(card,key);card.querySelector('.shelf-source').before(card.querySelector('.model-lab'))}});
      if(extended[id])tag(card,'a',ui.detail,'plan-link').href='#'+extended[id];
      const src=tag(card,'footer',ui.source.map((s,i)=>`${s} · ${grade} · § ${num} · ${ui.page[i]} ${page}`),'shelf-source'); const link=tag(card,'a',['Страница книги ↗','Book details ↗','Кітап беті ↗'],'plan-link');link.href=`https://okulyk.kz/fizika/${bookIds[grade]}/`;link.target='_blank';link.rel='noopener noreferrer';
    }
    tag(wrap,'h4',ui.extra);
  }
  picker.addEventListener('change',()=>{language=picker.value;for(const [node,text] of fields)node.textContent=text[index()]});
})();
