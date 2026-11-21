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
