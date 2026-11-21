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
  const legend=[['Сравни площади при одной нагрузке','Compare areas for the same load','Бір жүктемедегі аудандарды салыстыр'],['Площадь под графиком скорости — путь при движении вперёд','Area under a forward speed trace gives distance','Алға қозғалыста жылдамдық графигінің астындағы аудан — жол'],['Сложение направленных отрезков','Adding directed segments','Бағытталған кесінділерді қосу'],['Крайнее положение и положение равновесия','Extreme and equilibrium positions','Шеткі және тепе-теңдік күйлері'],['Однородное поле между параллельными пластинами','Uniform field between parallel plates','Параллель пластиналар арасындағы біртекті өріс'],['Горизонтальный бросок без сопротивления','Horizontal launch without drag','Кедергісіз көлденең лақтыру'],['Силы по разные стороны от опоры','Forces on opposite sides of a support','Тіректің екі жағындағы күштер'],['Углы от нормали к зеркалу','Angles relative to the mirror normal','Айна нормалінен өлшенген бұрыштар'],['Луч на границе двух сред','Ray at an interface','Екі ортаның шекарасындағы сәуле'],['Сечения одной трубки тока','Cross sections along a stream tube','Ағын түтігінің қималары'],['Периодическое изменение смещения','Periodic variation of displacement','Ығысудың периодты өзгерісі'],['Два положения наблюдателя','Two observer positions','Бақылаушының екі орны'],['Сила тяжести и сила Архимеда','Gravity and buoyancy','Ауырлық және Архимед күштері'],['Две ветви между общими узлами','Two branches between shared nodes','Ортақ түйіндер арасындағы екі тармақ'],['Прямые лучи и край тени','Straight rays and shadow edge','Түзу сәулелер және көлеңке шеті'],['Скорость по касательной, ускорение к центру','Tangential velocity, inward acceleration','Жанама жылдамдық, центрге бағытталған үдеу'],['Силы на теле у горизонтальной опоры','Forces on a body at a horizontal support','Көлденең тіректегі денеге әсер ететін күштер']];
  // Original diagrams; the references name the corresponding chapter in Vakhnina.
  const visualGuides={
    reflect:[125,['Отражение: отсчёт от нормали','Reflection: measure from the normal','Шағылу: нормальдан өлшеу'],['Угол между лучами равен 60°, но угол падения — 30°: нормаль делит угол пополам.','The rays enclose 60°, but incidence is 30°: the normal bisects the angle.','Сәулелер арасындағы бұрыш 60°, бірақ түсу бұрышы 30°: нормаль бұрышты қақ бөледі.'],`<path d="M20 110H280 M150 15V110" stroke-dasharray="5 3"/><path d="M98 20L150 110L202 20 M116 60l7 4v-9 M174 57l7-4v9"/><text x="125" y="72">30°</text><text x="153" y="72">30°</text>`],
    lc:[114,['Куда переходит энергия контура?','Where does LC energy go?','Контур энергиясы қайда ауысады?'],['Слева конденсатор заряжен. Через четверть периода он разряжен, ток максимален, а энергия идеального контура находится в магнитном поле катушки.','At left the capacitor is charged. A quarter cycle later it is discharged, current peaks and the ideal circuit stores its energy in the magnetic field.','Сол жақта конденсатор зарядталған. Периодтың төрттен бірі өткенде ол разрядталады, ток ең үлкен болады, ал идеал контур энергиясы катушканың магнит өрісінде жиналады.'],`<path d="M20 61h28m0-22v44m9-44v44m0-22h28 M112 61h55l-8-5m8 5l-8 5 M190 61h12q7-30 14 0q7-30 14 0q7-30 14 0h24"/><text x="24" y="105">q = Q</text><text x="119" y="41">¼ T</text><text x="200" y="105">I = Iₘₐₓ</text>`],
    emwave:[122,['Как связаны частота и длина волны?','How are frequency and wavelength linked?','Жиілік пен толқын ұзындығы қалай байланысады?'],['На одинаковом отрезке у нижней волны вдвое больше периодов. В вакууме скорость одинакова: при удвоении частоты длина волны уменьшается вдвое.','Twice as many cycles of the lower wave fit the same distance. In vacuum both travel at the same speed: doubling frequency halves wavelength.','Бірдей кесіндіге төменгі толқынның екі есе көп периоды сыяды. Вакуумда жылдамдық бірдей: жиілік екі еселенсе, толқын ұзындығы екі есе қысқарады.'],`<path d="M55 39q26-42 52 0t52 0t52 0t52 0 M55 90q13-32 26 0t26 0t26 0t26 0t26 0t26 0t26 0t26 0"/><text x="20" y="43">f</text><text x="14" y="94">2f</text>`]
  };
  const picker=document.getElementById('language');
  let language='ru';try{language=localStorage.getItem('physlab-language')||language}catch{}
  const bookIds={7:1523,8:348,9:451,10:531,11:803};
  const rules=new Map(paragraphRules.flatMap(([keys,formula,usage])=>keys.map(key=>[key,{formula,usage}])));
  const byConcept = rows => new Map(rows.flatMap(([keys,text]) => keys.split(' ').map(key => [key,text])));
  const foundations=byConcept(lessonFoundations), explanations=byConcept(lessonExplanations), history=byConcept(lessonHistory);
  const comparisons=new Map(contrastTables.flatMap(([keys,...content])=>keys.split(' ').map(k=>[k,content])));
  const fields=[];
  let liveExperiment=null;
  function stopExperiment(){if(liveExperiment){liveExperiment.frame.remove();liveExperiment.button.hidden=false;liveExperiment=null}}
  function stopIfHidden(){if(liveExperiment&&!liveExperiment.frame.getClientRects().length)stopExperiment()}
  new MutationObserver(stopIfHidden).observe(document.querySelector('main'),{subtree:true,attributes:true,attributeFilter:['hidden','open']});


  function index(){return language==='kk'?2:language==='en'?1:0}
  function tag(parent,name,value,cls){const n=document.createElement(name);if(cls)n.className=cls;if(Array.isArray(value)){const text=document.createTextNode(value[index()]);n.append(text);fields.push([text,value])}else if(value)n.textContent=value;parent.append(n);return n}
  const modelIndex=new Map(lessonModels.flatMap(([keys,labels,calc])=>keys.split(' ').map(k=>[k,[labels,calc]])));
  function mountParagraphActivity(card,id){
    const entry=paragraphActivities[id]; // No fallback to another grade's concept.
    const lab=tag(card,'section',null,'paragraph-activity');lab.dataset.lesson=id;
    const [grade,num]=id.split('.');
    tag(lab,'small',[`По материалу учебника · ${grade} класс · § ${num} · с. ${entry.page}`,`Based on the textbook · Grade ${grade} · § ${num} · p. ${entry.page}`,`Оқулық негізінде · ${grade}-сынып · § ${num} · ${entry.page}-б.`]);
    tag(lab,'h4',['Проверь своё предсказание','Test your prediction','Болжамыңды тексер']);
    tag(lab,'p',entry.prompt);const buttons=tag(lab,'div',null,'buttons');
    const feedback=tag(lab,'div',null,'activity-result');feedback.setAttribute('aria-live','polite');
    const correct=tag(feedback,'strong',['Верно.','Correct.','Дұрыс.']);
    const retry=tag(feedback,'strong',['Пока нет. Сверь рассуждение и попробуй ещё раз.','Not quite. Check the reasoning and try again.','Әзірге дұрыс емес. Түсіндірмені қарап, қайта жауап бер.']);
    const explanation=tag(feedback,'p',entry.why);correct.hidden=retry.hidden=explanation.hidden=true;
    for(const i of (Math.random()<0.5?[0,1]:[1,0])){
      const btn=tag(buttons,'button',entry.choices[i]);btn.type='button';btn.setAttribute('aria-pressed','false');
      btn.onclick=()=>{for(const other of buttons.children)other.setAttribute('aria-pressed',String(other===btn));correct.hidden=i!==0;retry.hidden=i===0;explanation.hidden=false};
    }
  }
  function mountScene(lab,id){
    const scene=paragraphScenes[id];
    const box=tag(lab,'section',null,'scene-box');tag(box,'h4',scene.name);tag(box,'small',ui.page.map(p=>`${p} ${scene.page}`));tag(box,'p',scene.instruction);
    const label=tag(box,'label');tag(label,'b',scene.axis);const slider=tag(label,'input');Object.assign(slider,{type:'range',min:scene.min,max:scene.max,step:scene.step,value:scene.start});
    const out=tag(box,'output'),drawing=tag(box,'div');drawing.className='scene-drawing';
    function draw(){const [message,svg]=scene.draw(+slider.value);out.textContent=Array.isArray(message)?message[index()]:message;drawing.innerHTML=`<svg viewBox="0 0 320 145" aria-hidden="true">${svg}</svg>`}
    slider.oninput=draw;picker.addEventListener('change',draw);draw();
  }
  function mountInvestigation(host,m){
    const box=tag(host,'section',null,'scene-box');tag(box,'h4',m.title);tag(box,'p',m.check);if(m.conditions)tag(box,'p',m.conditions,'model-fixed');
    const control=tag(box,'label');tag(control,'b',m.axis);const input=tag(control,'input');Object.assign(input,{type:'range',min:0,max:m.values.length-1,step:1,value:0});
    const output=tag(box,'output');const image=tag(box,'div',null,'scene-drawing');
    const results=m.values.map(m.calculate),lo=Math.min(0,...results),hi=Math.max(0,...results);
    const xp=x=>35+250*(x-m.values[0])/(m.values.at(-1)-m.values[0]),yp=y=>115-95*(y-lo)/(hi-lo||1);
    const tr=s=>Array.isArray(s)?s[picker.value==='kk'?2:picker.value==='en'?1:0]:s;
    function draw(){const i=Number(input.value),x=m.values[i],y=results[i];output.textContent=`${tr(m.axis)}: ${x} → ${tr(m.output)}: ${Number((Math.abs(y)<1e-12?0:y).toPrecision(4))}`;
      image.innerHTML=`<svg viewBox="0 0 320 145" aria-hidden="true">${m.paint?m.paint(x,y):`<path d="M35 16V118H290" fill="none" stroke="#829397"/><polyline points="${m.values.map((v,j)=>xp(v)+','+yp(results[j])).join(' ')}" fill="none" stroke="#387783" stroke-width="2"/><circle cx="${xp(x)}" cy="${yp(y)}" r="6" fill="#ad532c"/><text x="32" y="139">${m.values[0]}</text><text x="276" y="139">${m.values.at(-1)}</text>`}</svg>`}
    input.oninput=draw;picker.addEventListener('change',draw);draw();
  }
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
      const switches=tag(card,'div',null,'reader-switch');
      const lesson=tag(card,'div'),practice=tag(card,'section');
      const labels=[['Конспект','Lesson','Конспект'],['Практикум','Practice','Практикум']];
      const panes=[lesson,practice],lab=Object.values(engineeringLabs).find(sim=>sim.ids.includes(id));
      const experiments=Object.entries(experimentLibrary).filter(([,m])=>m.lesson===id);
      labels.push(['Симулятор','Simulator','Симулятор']);
      const slot=tag(card,'div');slot.id=`lab-${grade}-${num}`;panes.push(slot);
      const buttons=labels.map(t=>tag(switches,'button',t));
      // The article and simulator sit above the detailed notes. Reusing the same
      // panel for both views preserves slider, iframe and engineering lab state.
      const opening=tag(card,'article',null,'lesson-case article-opening');
      card.insertBefore(opening,lesson);card.insertBefore(slot,lesson);
      const [hook,mechanism]=lessonArticles[id];
      tag(opening,'h4',hook);tag(opening,'p',mechanism);
      const inline=tag(opening,'button');
      const expandLabel=tag(inline,'span',['Проверить в опыте','Try the experiment','Тәжірибеде тексеру']);
      const collapseLabel=tag(inline,'span',['Свернуть опыт','Close experiment','Тәжірибені жинау']);
      inline.type='button';inline.setAttribute('aria-controls',slot.id);
      let mounted=false, inlineOpen=false;
      function mount(){if(mounted)return;const host=slot;tag(host,'h4',title);
        const trial=articleTrials[id];
        if(trial){const [axis,values,output,conditions,calculate]=trial;
          mountInvestigation(host,{title:['Измени условие и сравни результат','Change the input and compare results','Шартты өзгертіп, нәтижені салыстыр'],axis,values,output,check:articleTrialGuides[id],conditions,calculate,paint:articleDrawings[id]});}
        else if(lessonInvestigations[id])mountInvestigation(host,lessonInvestigations[id]);
        else if(paragraphScenes[id])mountScene(host,id);
        else if(!lab&&!primaryInstrumentByLesson[id])mountSimulator(host,paragraphActivities[id].graph||key);
        if(lab)mountEngineering(host,lab,picker);
        experiments.sort(([a],[b])=>Number(b===primaryInstrumentByLesson[id])-Number(a===primaryInstrumentByLesson[id]));
        for(const [key,m] of experiments){const tile=tag(panes[2],'section',null,'experiment-card');tile.dataset.experiment=key;if(key!==primaryInstrumentByLesson[id])tag(tile,'small',['Межпредметный опыт','Cross-curricular experiment','Пәнаралық тәжірибе']);tag(tile,'h4',m.title);tag(tile,'p',m.guide);const actions=tag(tile,'div',null,'buttons');const launch=tag(actions,'button',['Запустить опыт','Run experiment','Тәжірибені ашу']);launch.type='button';const url=()=>'instruments/player.html?sim='+key+'&lang='+picker.value;const full=tag(actions,'a',['Открыть отдельно ↗','Open separately ↗','Бөлек ашу ↗'],'plan-link');full.href=url();picker.addEventListener('change',()=>{full.href=url();if(liveExperiment?.button===launch){liveExperiment.frame.src=url();liveExperiment.frame.title=m.title[picker.value==='en'?1:picker.value==='kk'?2:0]}});full.target='_blank';full.rel='noopener';launch.onclick=()=>{stopExperiment();const frame=document.createElement('iframe');frame.title=m.title[index()];frame.setAttribute('sandbox','allow-scripts');frame.src=url();frame.className='experiment-frame';tile.append(frame);launch.hidden=true;liveExperiment={frame,button:launch};frame.focus()}}
        mounted=true;
      }
      function select(i){
        const showLab=i===2||(i===0&&inlineOpen);
        opening.hidden=i!==0;
        panes.forEach((pane,j)=>{pane.dataset.readerPane='';pane.hidden=j===2?!showLab:j!==i;buttons[j].setAttribute('aria-pressed',String(j===i))});
        inline.setAttribute('aria-expanded',String(i===0&&inlineOpen));
        expandLabel.hidden=inlineOpen;collapseLabel.hidden=!inlineOpen;
        if(showLab)mount();
      }
      inline.onclick=()=>{
        inlineOpen=!inlineOpen;select(0);
        const primary=primaryInstrumentByLesson[id];
        if(inlineOpen&&primary&&!articleTrials[id]&&!lessonInvestigations[id]&&!paragraphScenes[id]&&!lab){
          slot.querySelector(`[data-experiment="${primary}"] button:not([hidden])`)?.click();
        }
      };
      buttons.forEach((b,i)=>{b.type='button';b.onclick=()=>select(i)});select(0);
      const standalone=paragraphActivities[id].intro;
      const theory=tag(lesson,'section',null,'reader-theory');
      tag(theory,'h4',['Сначала разберёмся','Understanding the idea','Алдымен түсініп алайық']);
      const investigation=lessonInvestigations[id];if(investigation){const article=tag(theory,'article',null,'lesson-case');tag(article,'h4',investigation.title);tag(article,'p',investigation.story);tag(article,'p',investigation.check);if(investigation.reader)tag(article,'small',[`По теме: сборник статей для презентаций, с. ${investigation.reader}`,`Presentation reader, p. ${investigation.reader}`,`Презентацияға арналған мақалалар жинағы, ${investigation.reader}-б.`]);const run=tag(article,'button',['Проверить на модели','Test the model','Модельде тексеру']);run.type='button';run.onclick=()=>{select(2);buttons[2].focus()}}
      if(experiments.length){const intro=tag(theory,'section',null,'lesson-case');tag(intro,'strong',['От идеи к опыту','From idea to experiment','Идеядан тәжірибеге']);for(const [key,m] of experiments){tag(intro,'h4',m.title);tag(intro,'p',m.guide);const go=tag(intro,'button',['Проверить предсказание →','Test the prediction →','Болжамды тексеру →']);go.type='button';go.onclick=()=>{select(2);const tile=panes[2].querySelector(`[data-experiment="${key}"]`);tile.querySelector('button').click();tile.scrollIntoView({block:'start'})}}}
      if(lab){const lead=tag(theory,'section',null,'lesson-case');tag(lead,'h4',lab.hook);tag(lead,'p',lab.story);tag(lead,'strong',['Разберём на числах','Work through the numbers','Сандармен талдайық']);tag(lead,'p',lab.example);const run=tag(lead,'button',['Проверить в симуляторе →','Test it in the simulator →','Симуляторда тексеру →']);run.type='button';run.onclick=()=>{select(2);buttons[2].focus()}}
      tag(theory,'p',standalone || foundations.get(key));
      if(!bookDefinitions[id]){const box=tag(theory,'aside',null,'reader-definition');tag(box,'strong',['Ключевое понятие','Key concept','Негізгі ұғым']);tag(box,'p',lessonGlossary[key])}
      for(const [p,definition] of bookDefinitions[id]||[]){const box=tag(theory,'aside',null,'reader-definition');tag(box,'strong',[`Определение · с. ${p}`,`Definition · p. ${p}`,`Анықтама · ${p}-б.`]);tag(box,'p',definition)}
      const [reviewPage,reviewQuestion,reading]=textbookReading[`${grade}-${num}`];
      const sourceNote=tag(theory,'section',null,'reading-note');tag(sourceNote,'strong',[`По учебнику · § ${num}`,`From the Russian textbook · § ${num}`,`Орысша оқулық бойынша · § ${num}`]);tag(sourceNote,'p',reading).lang='ru';
      for(const [ids,statement] of Object.entries(lessonLawTexts))if(ids.split(' ').includes(id)){const box=tag(theory,'aside',null,'reader-definition');tag(box,'strong',[`Закон по материалу § ${num} · с. ${page}`,`Law from § ${num} · p. ${page}`,`§ ${num} бойынша заң · ${page}-б.`]);tag(box,'p',statement)}
      const hasExtras=textbookStatements[`${grade}-${num}`]?.length;const sourceExtras=hasExtras?tag(theory,'details',null,'source-extras'):null;if(sourceExtras)tag(sourceExtras,'summary',['Определения и формулировки из учебника','Textbook definitions and statements','Оқулықтағы анықтамалар мен тұжырымдар']);
      for(const [n,text] of textbookStatements[`${grade}-${num}`]||[]){const box=tag(sourceExtras,'aside',null,'reader-definition');tag(box,'strong',[`По материалу учебника · с. ${n}`,`Russian textbook · p. ${n}`,`Орысша оқулық · ${n}-б.`]);tag(box,'p',text).lang='ru'}
      const review=tag(practice,'section',null,'reading-note');tag(review,'strong',[`Контрольный вопрос из учебника · с. ${reviewPage}`,`Textbook review question · p. ${reviewPage}`,`Оқулықтағы бақылау сұрағы · ${reviewPage}-б.`]);tag(review,'p',[reviewQuestion,...reviewTranslations[`${grade}-${num}`]]);const guide=tag(review,'details');tag(guide,'summary',ui.answer);tag(guide,'p',reading).lang='ru';
      const extension=paragraphTheory[id] || (!standalone && explanations.get(key));
      if(extension)tag(theory,'p',extension);
      if(standaloneMath[id]){tag(theory,'h4',['Количественная связь','Quantitative relation','Сандық байланыс']);tag(theory,'p',standaloneLegends[id]);tag(theory,'div',null,'law model-equation').innerHTML=standaloneMath[id]}
      if(comparisons.has(key)){const [title,first,second]=comparisons.get(key),table=tag(theory,'table',null,'reader-table');tag(table,'caption',title);const row=tag(table,'tr');tag(row,'th',['Сравнение','Comparison','Салыстыру']);tag(row,'th',['Физический смысл','Physical meaning','Физикалық мағына']);for(const [i,text] of [first,second].entries()){const r=tag(table,'tr');tag(r,'th',String(i+1));tag(r,'td',text)}}
      const visual=visualLessons[key];
      if(visual){const box=tag(theory,'article',null,'visual-lesson');tag(box,'small',[`Визуальный разбор · сборник статей, с. ${visual.page}`,`Visual lesson · presentation reader, p. ${visual.page}`,`Көрнекі талдау · мақалалар жинағы, ${visual.page}-б.`]);tag(box,'h4',visual.title);tag(box,'p',visual.idea);const steps=tag(box,'ol',null,'visual-steps');visual.steps.forEach(step=>tag(steps,'li',step));
        const equation=tag(box,'div',null,'model-equation');const lab=tag(box,'div',null,'visual-bench');tag(lab,'strong',['Проверь на модели','Test the model','Модельді тексер']);const screen=tag(lab,'div',null,'visual-screen'),label=tag(lab,'label',visual.label),slider=tag(label,'input');Object.assign(slider,{type:'range',min:visual.range[0],max:visual.range[1],value:visual.range[2]});const reading=tag(lab,'output');function draw(){const [geometry,caption]=visual.draw(+slider.value);screen.innerHTML=`<svg viewBox="0 0 310 120" aria-hidden="true">${geometry}</svg>`;reading.textContent=caption}slider.oninput=draw;draw();const [slug,prompt,answer]=visualFollowups[key];tag(box,'h4',['Теперь реши сам','Now try it yourself','Енді өзің шеш']);tag(box,'p',prompt);const reveal=tag(box,'details');tag(reveal,'summary',ui.answer);tag(reveal,'p',answer);const ref=tag(box,'a',['По теме: Умскул Учебник ↗','Further reading: Umschool (Russian) ↗','Қосымша: Умскул оқулығы (орысша) ↗'],'plan-link');ref.href=`https://umschool.net/library/fizika/${slug}/`;ref.target='_blank';ref.rel='noopener';equation.innerHTML=visualMath[key];}
      if(presentationNotes[key]){const [pg,...body]=presentationNotes[key],aside=tag(theory,'aside',null,'reader-history');tag(aside,'strong',[`Разбор по сборнику статей · с. ${pg}`,`From the presentation reader · p. ${pg}`,`Мақалалар жинағы бойынша · ${pg}-б.`]);tag(aside,'p',body)}
      if(history.has(key)){const aside=tag(theory,'aside',null,'reader-history');tag(aside,'strong',['Из истории физики','From the history of physics','Физика тарихынан']);tag(aside,'p',history.get(key))}

      for(const [name,p,caption] of bookDiagrams[id]||[]){const figure=tag(theory,'figure',null,'source-diagram'),link=tag(figure,'a'),image=tag(link,'img');link.href=image.src=`assets/table-${name}.jpg`;link.target='_blank';link.rel='noopener';image.loading='lazy';image.alt=caption[index()];picker.addEventListener('change',()=>{image.alt=caption[picker.value==='en'?1:picker.value==='kk'?2:0]});tag(figure,'figcaption',caption);tag(figure,'small',[`Источник: «Курс физики в таблицах», с. ${p} · увеличить ↗`,`Source: Physics in Tables (Russian), p. ${p} · enlarge ↗`,`Дереккөз: «Курс физики в таблицах», ${p}-б. · үлкейту ↗`])}
      if(visualGuides[key]){const [page,title,description,svg]=visualGuides[key],fig=tag(theory,'figure',null,'worked-figure');tag(fig,'strong',title);const draw=tag(fig,'div');draw.innerHTML=`<svg aria-hidden="true" viewBox="0 0 300 120"><g fill="none" stroke="#416975" stroke-width="2">${svg.replaceAll('<text ','<text fill="#214653" stroke="none" ')}</g></svg>`;tag(fig,'figcaption',description);const ref=tag(fig,'a',[`К теме: С. В. Вахнина, «Физика в инфографике» (2022), раздел с с. ${page} ↗`,`Further reading: S. Vakhnina, Physics in Infographics (2022), chapter from p. ${page} ↗`,`Қосымша: С. Вахнина, «Физика в инфографике» (2022), бөлім ${page}-беттен ↗`]);ref.href='https://djvu.online/file/OL4KtuqNUdiX2';ref.target='_blank';ref.rel='noopener'}
      if(!standalone){tag(lesson,'p',idea);
      const si=sketches.findIndex(s=>s[0].split(' ').includes(key));if(si>=0){const [,path,l,r]=sketches[si];const figure=tag(lesson,'figure',null,'worked-figure');figure.innerHTML=`<svg aria-hidden="true" viewBox="0 0 255 99"><path d="${path}" fill="none" stroke="#416975" stroke-width="2.5"/><text x="25" y="94">${l}</text><text x="190" y="94">${r}</text></svg>`;if(key==='float')figure.innerHTML=`<svg aria-hidden="true" viewBox="0 0 280 110"><rect x="8" y="37" width="264" height="67" rx="4" fill="#cce5ed"/><rect x="104" y="30" width="70" height="70" rx="2" fill="#f4fbff" stroke="#386473" stroke-width="2"/><path d="M8 37h264" stroke="#37798a" stroke-dasharray="4 3"/><path d="M122 66V20m-5 7 5-7 5 7" fill="none" stroke="#177059" stroke-width="3"/><path d="M157 54v46m-5-7 5 7 5-7" fill="none" stroke="#a64f32" stroke-width="3"/><text x="88" y="19">Fₐ</text><text x="183" y="98">mg</text></svg>`;tag(figure,'figcaption',legend[si])}
      const rule=rules.get(key);tag(lesson,'h4',['Модель и условия применения','Model and assumptions','Модель және қолданылу шарттары']);tag(lesson,'div',null,'law model-equation').innerHTML=formattedLaws[rule.formula];tag(lesson,'p',ruleSymbols[rule.formula],'symbol-key');tag(lesson,'p',rule.usage);tag(lesson,'h4',ui.example);if(!workedMath[key]||Array.isArray(example))tag(lesson,'p',example);if(workedMath[key])tag(lesson,'div',null,'law model-equation').innerHTML=workedMath[key];if(key==='float')tag(lesson,'p',['Значит, 90 % объёма льда находится под водой, а 10 % — над поверхностью.','Thus 90% of the ice volume is submerged and 10% is above the surface.','Демек, мұз көлемінің 90 %-ы су астында, ал 10 %-ы су бетінің үстінде.']);
      }
      if(paragraphExtensions[id]){const [extra]=paragraphExtensions[id];tag(lesson,'h4',ui.more);tag(lesson,'p',extra);tag(lesson,'div',null,'law model-equation').innerHTML=extensionMath[id]}
      if(topicSupplement[id]){const [q,,ex]=topicSupplement[id];tag(lesson,'h4',q);tag(lesson,'div',null,'law model-equation').innerHTML=supplementMath[id];tag(lesson,'p',ex)}
      appendExercise(practice,id);
      if(!standalone){tag(practice,'h4',ui.check);tag(practice,'p',check);const reveal=tag(practice,'details');tag(reveal,'summary',ui.answer);tag(reveal,'p',answer,'law')}
      const practiceSlot=tag(practice,'div',null,'reader-practice');
      card.addEventListener('toggle',()=>{if(card.open&&!card.querySelector('.paragraph-activity')){mountParagraphActivity(practiceSlot,id);if((lab||experiments.length)&&paragraphScenes[id])mountScene(practiceSlot,id)}});
      if(extended[id])tag(card,'a',ui.detail,'plan-link').href='#'+extended[id];
      const src=tag(card,'footer',ui.source.map((s,i)=>`${s} · ${grade} · § ${num} · ${ui.page[i]} ${page}`),'shelf-source'); const link=tag(card,'a',['Страница книги ↗','Book details ↗','Кітап беті ↗'],'plan-link');link.href=`https://okulyk.kz/fizika/${bookIds[grade]}/`;link.target='_blank';link.rel='noopener noreferrer';
    }
    tag(wrap,'h4',ui.extra);
  }
  const directory=document.getElementById('engineering-links');directory.setAttribute('data-own-language','');
  for(const model of Object.values(engineeringLabs).sort((a,b)=>a.ids[0].localeCompare(b.ids[0],'en',{numeric:true})))for(const id of model.ids){const a=tag(directory,'a',model.name.map(n=>`${id} · ${n}`));a.href='#lab-'+id.replace('.','-')}
  const shelf=document.getElementById('experiment-index');for(const g of [7,8,9,10,11]){const group=tag(shelf,'details');tag(group,'summary',[`${g} класс`,`Grade ${g}`,`${g}-сынып`]);const links=tag(group,'div');for(const [key,m] of Object.entries(experimentLibrary).sort((a,b)=>a[1].lesson.localeCompare(b[1].lesson,'en',{numeric:true}))){if(!m.lesson.startsWith(g+'.'))continue;const a=tag(links,'a',m.title.map(t=>`${m.lesson} · ${t}`));a.href='#exp-'+key;const marker=document.createElement('span');marker.id='exp-'+key;document.getElementById('para-'+m.lesson.replace('.','-')).append(marker)}}
  picker.addEventListener('change',()=>{language=picker.value;for(const [node,text] of fields)node.textContent=text[index()]});
})();
