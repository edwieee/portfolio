// Reading and navigation work before this enhancement runs.
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;
  const active = new Set();
  function reveal(entries) {
    const visible = entries.filter(entry => entry.isIntersecting);
    visible.forEach(({ target }, index) => {
      observer.unobserve(target);
      if (reduced.matches || target.matches(':focus-within')) return;
      const animation = target.animate([
        { opacity: .5, transform: 'translateY(10px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 480, delay: Math.min(index, 3) * 55, easing: 'cubic-bezier(.2,.7,.2,1)' });
      active.add(animation);
      animation.finished.catch(() => {}).finally(() => active.delete(animation));
    });
  }
  const observer = new IntersectionObserver(reveal, { threshold: .08 });
  document.querySelectorAll('.card, .prose section, .gallery figure').forEach(el => observer.observe(el));
  function settle() {
    for (const animation of active) animation.cancel();
  }
  reduced.addEventListener('change', settle);
  document.addEventListener('focusin', settle);
  window.addEventListener('pagehide', settle);
})();
