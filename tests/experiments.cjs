const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function load(file,name){return vm.runInNewContext(fs.readFileSync(file,'utf8')+';'+name)}
test('each imported instrument has one existing lesson and a three-language experiment guide',()=>{
 const defs=load('instruments/models.js','SIMS'),map=load('experiment-library.js','experimentLibrary'),book=load('paragraphs-data.js','textbookIndex');
 assert.equal(Object.keys(map).length,42);assert.deepEqual(Object.keys(map).sort(),Object.keys(defs).sort());
 for(const [key,m] of Object.entries(map)){const [grade,n]=m.lesson.split('.');assert.ok(book[grade][n-1],key);for(const field of ['title','guide']){assert.equal(m[field].length,3);assert.ok(m[field].every(t=>t.trim().length>0))}}
});
