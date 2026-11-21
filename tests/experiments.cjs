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
