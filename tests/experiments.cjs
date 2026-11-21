const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function load(file,name){return vm.runInNewContext(fs.readFileSync(file,'utf8')+';'+name)}
test('each imported instrument has one existing lesson and a three-language experiment guide',()=>{
 const defs=load('instruments/models.js','SIMS'),map=load('experiment-library.js','experimentLibrary'),book=load('paragraphs-data.js','textbookIndex');
 assert.equal(Object.keys(map).length,42);assert.deepEqual(Object.keys(map).sort(),Object.keys(defs).sort());
 for(const [key,m] of Object.entries(map)){const [grade,n]=m.lesson.split('.');assert.ok(book[grade][n-1],key);for(const field of ['title','guide']){assert.equal(m[field].length,3);assert.ok(m[field].every(t=>t.trim().length>0))}}
});
test('all declared simulator controls, presets and choices have English and Kazakh labels',()=>{
 const defs=load('instruments/models.js','SIMS'),labels=load('instruments/labels.js','instrumentLabels');
 for(const model of Object.values(defs))for(const control of [...model.params||[],...model.actions||[],...model.selects||[],...(model.selects||[]).flatMap(s=>s.options)]){const pair=labels[control.label];assert.equal(pair?.length,2,control.label);assert.ok(pair.every(s=>s.trim()));assert.doesNotMatch(pair[0],/[а-яё]/i)}
});
test('all textbook review questions have both translations',()=>{
 const originals=load('reader-sources.js','textbookReading'),translations=load('reader-sources.js','reviewTranslations');assert.deepEqual(Object.keys(translations),Object.keys(originals));for(const pair of Object.values(translations)){assert.equal(pair.length,2);assert.ok(pair.every(s=>s.trim()));assert.doesNotMatch(pair[0],/[а-яё]/i)}
});
test('every textbook lesson has a topic-specific scene or a calculable slider model',()=>{
 const book=load('paragraphs-data.js','textbookIndex'),activities=load('paragraph-activities.js','paragraphActivities'),scenes=load('paragraph-scenes.js','paragraphScenes');
 const models=new Map(load('lesson-models.js','lessonModels').flatMap(([keys,,calc])=>keys.split(' ').map(k=>[k,calc])));
 for(const [grade,rows] of Object.entries(book)) rows.forEach(([,,key],i)=>{const id=`${grade}.${i+1}`;if(!scenes[id]){const calc=models.get(activities[id].graph||key);assert.ok(calc&&[1,2,3,4,5].every(x=>Number.isFinite(calc(x))),id)}});
});
test('all core equations have contextual symbol keys in all three languages',()=>{
 const symbols=load('lesson-reference.js','ruleSymbols');for(const [,formula] of load('paragraphs-data.js','paragraphRules')){assert.equal(symbols[formula]?.length,3,formula);assert.ok(symbols[formula].every(t=>t.length>10))}
});
test('primary imported instruments belong to the linked paragraph',()=>{
 const primary=load('lesson-investigations.js','primaryInstrumentByLesson'),lib=load('experiment-library.js','experimentLibrary');for(const [id,k] of Object.entries(primary))assert.equal(lib[k]?.lesson,id,k);
});
test('article investigations use real lesson ids, translated explanations and responsive outputs',()=>{
 const models=load('lesson-investigations.js','lessonInvestigations'),index=load('paragraphs-data.js','textbookIndex');for(const [id,m] of Object.entries(models)){const [g,n]=id.split('.');assert.ok(index[g][n-1]);for(const t of [m.title,m.story,m.check])assert.ok(t.length===3&&t.every(Boolean));const ys=m.values.map(m.calculate);assert.ok(ys.every(Number.isFinite)&&new Set(ys).size>1,id);if(m.paint)m.values.forEach((v,i)=>assert.doesNotMatch(m.paint(v,ys[i]),/NaN|Infinity/))}
 assert.equal(models['7.24'].calculate(800),8);assert.equal(models['11.9'].calculate(2),10);assert.equal(models['8.32'].calculate(2),6);assert.equal(models['9.27'].calculate(1),1);
});
test('all 228 paragraphs have distinct original article leads in all supported languages',()=>{
 const articles=load('lesson-articles.js','lessonArticles'),book=load('paragraphs-data.js','textbookIndex');
 const ids=Object.entries(book).flatMap(([g,rows])=>rows.map((_,i)=>`${g}.${i+1}`));assert.deepEqual(Object.keys(articles),ids);
 for(const [id,[hook,answer]] of Object.entries(articles)){for(const field of [hook,answer]){assert.equal(field.length,3,id);assert.ok(field.every(t=>t.trim().length>15),id);assert.doesNotMatch(field[1],/[а-яё]/i,id)}}
 for(let lang=0;lang<3;lang++)assert.equal(new Set(Object.values(articles).map(row=>row[0][lang])).size,228);
});
test('paragraph-specific trial settings are ordered and yield finite, changing results',()=>{
 const trials=load('lesson-articles.js','articleTrials'),articles=load('lesson-articles.js','lessonArticles');
 for(const [id,[axis,x,output,conditions,compute]] of Object.entries(trials)){assert.ok(articles[id]&&axis&&output&&conditions,id);assert.ok(x.length>=5&&x.every((v,i)=>!i||v>x[i-1]),id);const ys=x.map(compute);assert.ok(ys.every(Number.isFinite)&&new Set(ys).size>1,id)}
 assert.equal(trials['7.9'][4](30),3);assert.equal(trials['10.13'][4](2),3);assert.equal(trials['11.50'][4](550),.1);
});
test('experiment directions and apparatus are matched to the same trial data',()=>{
 const trials=load('lesson-articles.js','articleTrials'),guides=load('lesson-articles.js','articleTrialGuides'),drawings=load('lesson-articles.js','articleDrawings');assert.deepEqual(Object.keys(guides),Object.keys(trials));
 for(const [id,guide] of Object.entries(guides)){assert.equal(guide.length,3,id);assert.ok(guide.every(Boolean),id)}
 for(const [id,draw] of Object.entries(drawings))for(const x of trials[id][1]){const svg=draw(x,trials[id][4](x));assert.doesNotMatch(svg,/NaN|Infinity|undefined/);assert.ok(svg.includes('<'))}
});
