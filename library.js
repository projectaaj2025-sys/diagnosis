// Keep all lesson IDs in the document so diagnostic and planner links still work.
(() => {
  const library = document.querySelector('#notes');
  const panels = [...library.querySelectorAll('.shelf-panel')];
  let grade = '7', term = '1';
  function show(g, t) {
    grade = g; term = t;
    for (const p of panels) p.hidden = p.dataset.grade !== g || p.dataset.term !== t;
    for (const btn of library.querySelectorAll('.shelf-controls button')) {
      btn.setAttribute('aria-pressed', String(btn.dataset.grade === g || btn.dataset.term === t));
    }
  }
  library.querySelector('.shelf-controls').addEventListener('click', event => {
    const btn = event.target.closest('button');
    if (btn) show(btn.dataset.grade || grade, btn.dataset.grade ? '1' : btn.dataset.term);
  });
  function followLink() {
    const note = document.getElementById(location.hash.slice(1));
    const panel = note?.closest('.shelf-panel');
    if (!panel) return;
    show(panel.dataset.grade, panel.dataset.term);
    if (note.matches('details')) note.open = true;
    note.scrollIntoView();
  }
  show(grade, term);
  window.addEventListener('hashchange', followLink);
  document.addEventListener('click', event => {
    const a = event.target.closest('a');
    if (a && a.hash && a.hash === location.hash) followLink();
  });
  followLink();
})();
