(() => {
  const surface = document.querySelector('.v2');
  if (!surface) return;
  const motion = matchMedia('(prefers-reduced-motion: no-preference)');
  const pointer = matchMedia('(hover: hover) and (pointer: fine)');
  const deck = surface.querySelector('.v2-deck');
  const pan = surface.querySelector('.v2-pan');
  if (deck && pan) {
    const [left, right] = pan.querySelectorAll('button');
    function syncPan() {
      const limit = deck.scrollWidth - deck.clientWidth;
      pan.hidden = limit < 2;
      left.disabled = deck.scrollLeft <= 1;
      right.disabled = deck.scrollLeft >= limit - 1;
    }
    for (const button of [left, right]) {
      button.addEventListener('click', () => deck.scrollBy({
        left: Number(button.dataset.pan) * deck.clientWidth * .75,
        behavior: motion.matches ? 'smooth' : 'instant'
      }));
    }
    deck.addEventListener('scroll', syncPan, { passive: true });
    window.addEventListener('resize', syncPan);
    syncPan();
  }
  // Keep each cover responsive to the pointer without moving its link hit area.
  for (const card of surface.querySelectorAll('.v2-card')) {
    const print = card.querySelector('.v2-print');
    card.addEventListener('pointermove', event => {
      if (!motion.matches || !pointer.matches || event.pointerType === 'touch') return;
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      print.style.setProperty('--pitch', (-y * 6).toFixed(2) + 'deg');
      print.style.setProperty('--yaw', (x * 8).toFixed(2) + 'deg');
      print.style.setProperty('--shine-y', (50 + y * 90).toFixed(1) + '%');
      print.style.setProperty('--shine', (50 + x * 80).toFixed(1) + '%');
    }, { passive: true });
    card.addEventListener('pointerleave', () => {
      for (const property of ['--pitch','--yaw','--shine','--shine-y']) print.style.removeProperty(property);
    });
  }
  if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;
  const running = new Set();
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting);
    visible.forEach(({ target }, i) => {
      observer.unobserve(target);
      if (!motion.matches || target.matches(':focus-within')) return;
      const isCard = target.classList.contains('v2-card');
      const timing = {
        duration: isCard ? 620 : 460,
        delay: Math.min(i, isCard ? 4 : 3) * 50,
        easing: 'cubic-bezier(.22,1,.36,1)',
        fill: 'backwards'
      };
      function play(element, frames) {
        const animation = element.animate(frames, timing);
        running.add(animation);
        animation.finished.catch(() => {}).finally(() => running.delete(animation));
      }
      play(target, [
        { opacity: .55, filter: 'blur(2px)', translate: isCard ? '0 13px' : '0 8px' },
        { opacity: 1, filter: 'blur(0)', translate: '0 0' }
      ]);
      if (isCard) play(target.querySelector('img'), [
        { clipPath: 'inset(0 0 8% 0 round 6px)' },
        { clipPath: 'inset(0 round 0)' }
      ]);
    });
  }, { threshold: .12 });
  surface.querySelectorAll('.v2-card, .v2-row, .v2-story article section').forEach(el => observer.observe(el));
  function settle() { for (const animation of running) animation.cancel(); }
  motion.addEventListener('change', settle);
  surface.addEventListener('focusin', settle);
  window.addEventListener('pagehide', settle);
})();
