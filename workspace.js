// Hash routes double as shareable lesson and report links. Keep live test state mounted.
(()=>{
 const pages=[...document.querySelectorAll('main > section')],links=[...document.querySelectorAll('.app-nav a')],desk=[...document.querySelectorAll('.desk-nav a')];
 function route(){const id=location.hash.slice(1),target=document.getElementById(id),page=pages.find(p=>target&&p.contains(target))?.id||'setup';
  for(const p of pages)p.hidden=p.classList.contains('hero')?page!=='setup':p.id!==page;
  function mark(items,hash){for(const a of items){if(a.hash===hash)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')}}mark(links,'#'+page);
  const sub=target?.closest('#teacher,#account-body')?.id||'accounts';mark(desk,'#'+sub);
  for(const [section,tab] of [['desk-profile','accounts'],['account-body','account-body'],['teacher','teacher']])document.getElementById(section).hidden=tab!==sub;
  if(target&&!target.closest('.shelf-panel'))requestAnimationFrame(()=>{if(location.hash==='#'+id)(page==='accounts'?document.getElementById(page):target).scrollIntoView()});
 }
 window.addEventListener('hashchange',route);route();
})();
