const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const ctx=vm.createContext({});vm.runInContext(fs.readFileSync(require.resolve('../tutor.js'),'utf8').replace(/setupTutor\(\);\s*$/,''),ctx);
test('recognises supported distinctive prefixes, not ambiguous generic keys',()=>{for(const [k,v] of [['AIza-test','gemini'],['sk-ant-test','anthropic'],['sk-proj-test','openai'],['sk-test',''],['unknown','']])assert.equal(ctx.detectTutor(k),v)});
test('keys stay in headers, models cannot override endpoints and each parser extracts text',()=>{for(const [id,host,data] of [['gemini','generativelanguage.googleapis.com',{candidates:[{content:{parts:[{thought:true,text:'private'},{text:'reply'}]}}]}],['openai','api.openai.com',{choices:[{message:{content:'reply'}}]}],['anthropic','api.anthropic.com',{content:[{type:'text',text:'reply'}]}]]){const req=ctx.tutorRequest(id,'secret-fixture','some-model','example prompt');assert.equal(new URL(req.url).host,host);assert(!req.url.includes('secret-fixture'));assert(!JSON.stringify(req.body).includes('secret-fixture'));assert(JSON.stringify(req.headers).includes('secret-fixture'));assert.equal(ctx.tutorText(id,data),'reply');assert.throws(()=>ctx.tutorRequest(id,'k','https://other.example','p'));}});
test('Gemini auth key and coaching context are recognised without probing',()=>{
 assert.equal(ctx.detectTutor('AQ.fixture'),'gemini');assert.equal(ctx.detectTutor('AQ-fixture'),'');
 const turns=Array.from({length:10},(_,i)=>({role:'student',text:'turn-'+i}));const p=ctx.tutorLessonPrompt('steps','Kazakh',{id:'para-9-1'},turns,'my attempt');assert.match(p,/only ONE next step/);assert.match(p,/Kazakh/);assert.match(p,/my attempt/);assert.match(p,/turn-9/);assert(!p.includes('turn-0'));assert.match(ctx.tutorLessonPrompt('theory','Russian',null,[],'Why?'),/define unfamiliar terms/);
});
test('reports a safe reason for invalid, restricted and over-quota keys',()=>{
 const err=reason=>({error:{message:'secret payload',details:[{reason}]}});
 assert.match(ctx.tutorError(400,err('API_KEY_INVALID')),/отклонён/);assert.match(ctx.tutorError(403,err('API_KEY_HTTP_REFERRER_BLOCKED')),/сайт/);assert.match(ctx.tutorError(403,err('SERVICE_DISABLED')),/Gemini/);assert.match(ctx.tutorError(429,{}),/квота/);assert(!ctx.tutorError(500,err('unknown')).includes('secret'));
});
