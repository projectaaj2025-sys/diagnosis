const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
test('restoring a personal map builds the schedule locally from aggregate fields only',()=>{
 const ctx=vm.createContext({window:{addEventListener(){}},location:{hash:''},document:{getElementById(){return null}}});vm.runInContext(fs.readFileSync(require.resolve('../planner.js'),'utf8'),ctx);
 ctx.restorePlannerMap({scope:'8 класс',rows:[{topic:'Оптика',skill:'Понимание',n:1,right:0,draft:'private'}]});const schedule=ctx.makeSchedule();assert.equal(schedule.length,4);assert.match(schedule[0].name,/Уточнение/);const prompt=ctx.aiBrief(schedule);assert.match(prompt,/Оптика \/ Понимание: 0 из 1/);assert(!prompt.includes('private'));assert.match(prompt,/45 мин/);ctx.restorePlannerMap(null);assert.equal(ctx.makeSchedule().length,0);assert.equal(ctx.planHtml('<tag>'),'&lt;tag&gt;');
});
