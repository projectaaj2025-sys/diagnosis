// Translate presentation only. Topic IDs, scoring keys, typed numbers and the active
// question remain unchanged when a learner switches language mid-test.
(() => {
  const picker = document.getElementById('language');
  let lang = 'ru';
  try { lang = localStorage.getItem('physlab-language') || lang; } catch {}
  if (!['ru','kk','en'].includes(lang)) lang = 'ru';
  const entries = new Map(Object.entries(languageCatalog).map(([k,v]) => [k.toLowerCase(),v]));
  const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  // Longer keys include whole sentences; short keys handle composed labels and units.
  const phrases = [...entries.keys()].sort((a,b)=>b.length-a.length).map(esc);
  const pattern = new RegExp('(?<![а-яё])(?:'+phrases.join('|')+')(?![а-яё])','giu');
  function translate(source) {
    if (lang==='ru'||!/[а-яё]/i.test(source)) return source;
    const index=lang==='en'?0:1;
    const output=source.replace(pattern,match=>{
      const result=entries.get(match.toLowerCase())[index];
      return match.length>2 && match===match.toUpperCase() ? result.toUpperCase() : result;
    });
    return lang==='en' ? output.replace(/(\d+) grade\b/gi,'Grade $1').replace(/(\d+) term\b/gi,'Term $1').replace(/(\d),(?=\d)/g,'$1.') : output;
  }
  const saved=new WeakMap();
  function field(node,key,read,write){
    let fields=saved.get(node);if(!fields){fields={};saved.set(node,fields)}
    const current=read(),old=fields[key];const source=old&&old.output===current?old.source:current;
    const output=translate(source);fields[key]={source,output};if(current!==output)write(output);
  }
  function visit(node){
    if(node.nodeType===3){if(!node.parentElement?.closest('script,style,#language option,textarea,#ai-reply'))field(node,'text',()=>node.data,x=>node.data=x);return}
    if(node.nodeType!==1||node.matches('script,style,#language option'))return;
    for(const a of ['aria-label','title','placeholder','alt'])if(node.hasAttribute(a))field(node,a,()=>node.getAttribute(a),x=>node.setAttribute(a,x));
    if(node.matches('textarea[readonly]:not(#ai-preview)'))field(node,'value',()=>node.value,x=>node.value=x);
    [...node.childNodes].forEach(visit);
  }
  const observer=new MutationObserver(records=>{
    observer.disconnect();try{for(const r of records){if(r.type==='childList')r.addedNodes.forEach(visit);else visit(r.target)}}finally{observe()}
  });
  function observe(){observer.observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','placeholder','alt']})}
  function apply(){observer.disconnect();document.documentElement.lang=lang;picker.value=lang;visit(document.documentElement);observe()}
  picker.addEventListener('change',()=>{lang=picker.value;try{localStorage.setItem('physlab-language',lang)}catch{}apply()});
  apply();
})();
