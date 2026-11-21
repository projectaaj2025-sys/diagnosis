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
