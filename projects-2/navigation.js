(() => {
  const dock = document.querySelector('.section-dock');
  if (!dock) return;
  const links = [...dock.querySelectorAll('a[href^="#"]')];
  const items = links.map(link => ({link, target: document.querySelector(link.hash)}));
  if (!items.length) return;

  function update() {
    const line = dock.getBoundingClientRect().bottom + 30;
    let active = items[0];
    for (const item of items) {
      const rect = item.target.getBoundingClientRect();
      if (rect.top <= line && rect.bottom > line) active = item;
    }
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) active = items.at(-1);
    for (const item of items) {
      if (item === active) item.link.setAttribute('aria-current','location');
      else item.link.removeAttribute('aria-current');
    }
  }
  let frame = 0;
  function schedule() {
    if (!frame) frame = requestAnimationFrame(() => { frame = 0; update(); });
  }
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule);
  window.addEventListener('pageshow',schedule);
  update();
})();

(() => {
  const rail = document.querySelector('.chapter-rail');
  if (!rail) return;
  const chapters = [...rail.querySelectorAll('a')].map(link => ({
    link, section: document.getElementById(link.hash.slice(1))
  }));
  const mobile = matchMedia('(max-width: 760px)');
  let selected = null;
  let requested = null;
  function update() {
    const root = document.documentElement;
    const line = parseFloat(getComputedStyle(root).scrollPaddingTop) + 12;
    let chapter = chapters[0];
    for (const item of chapters) {
      if (item.section.getBoundingClientRect().top <= line) chapter = item;
    }
    if (Math.ceil(innerHeight + scrollY) >= root.scrollHeight - 2) chapter = chapters.at(-1);
    // A short final chapter can be visible before its heading can reach the reading line.
    if (requested) chapter = requested;
    if (chapter === selected) return;
    selected = chapter;
    for (const item of chapters) {
      if (item === chapter) item.link.setAttribute('aria-current','location');
      else item.link.removeAttribute('aria-current');
    }
    if (mobile.matches) {
      const offset = chapter.link.getBoundingClientRect().left - rail.getBoundingClientRect().left;
      rail.scrollLeft += offset - (rail.clientWidth - chapter.link.offsetWidth) / 2;
    }
  }
  function followHash() {
    requested = chapters.find(item => item.link.hash === location.hash);
    update();
  }
  rail.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (link && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
      requested = chapters.find(item => item.link === link);
      update();
    }
  });
  function release() { requested = null; }
  window.addEventListener('wheel',release,{passive:true});
  window.addEventListener('touchstart',release,{passive:true});
  window.addEventListener('pointerdown',release,{passive:true});
  window.addEventListener('keydown', event => {
    if (['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(event.key)) release();
  });
  let frame = 0;
  function schedule() {
    if (!frame) frame = requestAnimationFrame(() => { frame = 0; update(); });
  }
  window.addEventListener('scroll', schedule, {passive:true});
  window.addEventListener('resize', schedule);
  window.addEventListener('hashchange', followHash);
  window.addEventListener('pageshow', followHash);
  followHash();
})();
