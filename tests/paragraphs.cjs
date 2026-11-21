const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const data=fs.readFileSync(require.resolve('../paragraphs-data.js'),'utf8');
const {index,notes,extensions,experiments}=vm.runInNewContext(data+';({index:textbookIndex,notes:paragraphNotes,extensions:paragraphExtensions,experiments:paragraphExperiments})');
const counts=[39,43,43,52,51];
test('complete textbook sequences, increasing start pages and translated learning activities',()=>{
 const labs=new Map(experiments.flatMap(([keys,lab])=>keys.map(key=>[key,lab])));
 for(const [grade,sections] of Object.entries(index)){
  assert.equal(sections.length,counts[grade-7]);let prev=0;
  sections.forEach(([page,title,key],i)=>{
   assert(page>prev,`${grade} §${i+1}`);prev=page;
   const [idea,example,q,answer]=notes[key];for(const three of [title,idea,q,labs.get(key)])assert(three.length===3&&three.every(s=>s.trim().length>1));assert(example&&answer);
  });
 }
 for(const [id,[text,exercise]] of Object.entries(extensions)){const [grade,num]=id.split('.');assert(index[grade][num-1]);assert(text.every(Boolean)&&exercise)}
});
test('every concept has a model and multilingual applicability conditions',()=>{
 const rules=vm.runInNewContext(data+';paragraphRules');const mapped=new Set();
 for(const [keys,formula,translations] of rules){assert(formula);assert.equal(translations.length,3);for(const k of keys){assert(!mapped.has(k));mapped.add(k)}}
 for(const k of Object.keys(notes))assert(mapped.has(k),k);
});
test('each lesson has a finite interactive lab, typeset law, and sourced exercises across grades',()=>{
 const {models,ex,typeset,rules}=vm.runInNewContext(data+fs.readFileSync(require.resolve('../lesson-models.js'),'utf8')+';({models:lessonModels,ex:bookExercises,typeset:formattedLaws,rules:paragraphRules})');
 const mapped=new Map();for(const [keys,labels,calc] of models){assert(labels[3].includes('<math'));for(const x of [1,2,3,4,5])assert(Number.isFinite(calc(x)));for(const k of keys.split(' ')){assert(!mapped.has(k),k);mapped.set(k,calc)}}
 for(const sections of Object.values(index))for(const [,,k] of sections)assert(mapped.has(k),k);for(const [,law] of rules)assert(typeset[law].includes('<math'));
 assert.equal(new Set(Object.keys(ex).map(id=>id.split('.')[0])).size,5);
});
const {activities,scenes}=vm.runInNewContext(['paragraph-activities','paragraph-scenes'].map(x=>fs.readFileSync(require.resolve(`../${x}.js`),'utf8')).join('\n')+';({activities:paragraphActivities,scenes:paragraphScenes})');
test('a dedicated prediction from the printed section for every grade/paragraph, no concept fallback',()=>{
 const prompts=new Set();for(const [g,sections] of Object.entries(index))for(const [i,[start]] of sections.entries()){
  const id=`${g}.${i+1}`,a=activities[id],end=sections[i+1]?.[0]??Infinity;assert(a,id);
  assert(a.page>=start&&a.page<end,id);assert.equal(a.choices.length,2);assert.notDeepEqual(...a.choices);
  for(const s of [a.prompt,...a.choices,a.why])if(Array.isArray(s))assert(s.length===3&&s.every(Boolean),id);else assert(typeof s==='string'&&s.length>0,id);
  assert(!prompts.has(JSON.stringify(a.prompt)),id);prompts.add(JSON.stringify(a.prompt));
  const scene=scenes[id];if(scene){assert(scene.page>=start&&scene.page<end);for(let v=scene.min;v<=scene.max;v+=scene.step){const [text,svg]=scene.draw(v);assert(text&&svg&&!/NaN|Infinity/.test(svg))}}
 }assert.equal(Object.keys(activities).length,228);assert(!activities['10.1'].graph);assert(!activities['9.36'].graph);
});
