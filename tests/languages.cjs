// Offline catalogue checks. Run: node --test tests/languages.cjs
const {test}=require('node:test');const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const node={querySelector(){return this},innerHTML:''};
const ctx=vm.createContext({document:{querySelector(){return node}}});
for(const file of ['bank.js','olympiad.js','app.js','locales/catalog.js']){
 vm.runInContext(fs.readFileSync(path.join(__dirname,'..',file),'utf8'),ctx,{filename:file});
}
test('all prose questions and worked solutions have both translations',()=>{
 const missing=vm.runInContext(`(()=>{const list=[...basic,...life,...challenges,...multipleChoice,...reasoning,...termExtras,...practiceExtras,...olympBookTasks];return list.flatMap(item=>[item.raw.split('|')[0],item.solution]).filter(text=>!languageCatalog[text]?.every(Boolean));})()`,ctx);
 assert.equal(missing.length,0,missing.join('\n'));
});
test('workbook accepts comma decimals and reports an incorrect number',()=>{
 const status={},form={elements:{answer:{value:'10,4'}},querySelector:()=>status};ctx.form=form;vm.runInContext('checkBook(form,6)',ctx);assert.equal(status.textContent,'Верно!');form.elements.answer.value='89.6';vm.runInContext('checkBook(form,6)',ctx);assert.match(status.textContent,/неверно/);
});

test('the scale-transformation exercises accept the derived answers',()=>{
 const cases=[['1.5(1)','2'],['1.5(2)','0,077'],['1.5(3)','-2'],['1.5(4)','0.1']];
 for(const [id,v] of cases){
  const status={};ctx.form={elements:{answer:{value:v}},querySelector:()=>status};
  ctx.problemId=id;
  vm.runInContext('checkBook(form,olympBookTasks.findIndex(x=>x.id===problemId))',ctx);
  assert.equal(status.textContent,'Верно!',id);
 }
});
