(() => {
  const surface = document.querySelector('.v2');
  if (!surface) return;
  const motion = matchMedia('(prefers-reduced-motion: no-preference)');
  const pointer = matchMedia('(hover: hover) and (pointer: fine)');
  // Keep each cover responsive to the pointer without moving its link hit area.
  for (const card of surface.querySelectorAll('.v2-card')) {
    const print = card.querySelector('.v2-print');
    card.addEventListener('pointermove', event => {
      if (!motion.matches || !pointer.matches || event.pointerType === 'touch') return;
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      print.style.setProperty('--pitch', (-y * 10).toFixed(2) + 'deg');
      print.style.setProperty('--yaw', (x * 12).toFixed(2) + 'deg');
      print.style.setProperty('--shine', (50 + x * 80).toFixed(1) + '%');
    }, { passive: true });
    card.addEventListener('pointerleave', () => {
      for (const property of ['--pitch','--yaw','--shine']) print.style.removeProperty(property);
    });
  }
  if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;
  const running = new Set();
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting);
    visible.forEach(({ target }, i) => {
      observer.unobserve(target);
      if (!motion.matches || target.matches(':focus-within')) return;
      const animation = target.animate([
        { opacity: .55, filter: 'blur(2px)', translate: '0 8px' },
        { opacity: 1, filter: 'blur(0)', translate: '0 0' }
      ], { duration: 460, delay: Math.min(i,3)*50, easing: 'cubic-bezier(.2,.75,.2,1)', fill: 'backwards' });
      running.add(animation);
      animation.finished.catch(() => {}).finally(() => running.delete(animation));
    });
  }, { threshold: .12 });
  surface.querySelectorAll('.v2-card, .v2-row, .v2-story article section').forEach(el => observer.observe(el));
  function settle() { for (const animation of running) animation.cancel(); }
  motion.addEventListener('change', settle);
  surface.addEventListener('focusin', settle);
  window.addEventListener('pagehide', settle);
})();
