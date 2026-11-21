(() => {
  const footer = document.querySelector('.portfolio-footer');
  if (!footer) return;

  const zone = 'Asia/Kolkata';
  const clock = footer.querySelector('[data-clock]');
  const localTime = new Intl.DateTimeFormat('en-GB', {
    timeZone: zone, hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23'
  });
  let timer;
  let inView = false;
  let opened = false;

  function tick() {
    clearTimeout(timer);
    if (!inView || document.hidden) return;
    const now = new Date();
    clock.dateTime = now.toISOString();
    clock.textContent = localTime.format(now);
    clock.hidden = false;
    timer = setTimeout(tick, 1000 - now.getMilliseconds());
  }

  async function refreshShipment() {
    const link = footer.querySelector('[data-shipped]');
    try {
      const response = await fetch('https://api.github.com/repos/edwieee/portfolio/commits/main/status', {
        credentials: 'omit', referrerPolicy: 'no-referrer'
      });
      if (!response.ok) return;
      const { sha, statuses } = await response.json();
      const deployed = statuses.find(entry => entry.context === 'Vercel' && entry.state === 'success');
      if (!deployed || !/^[0-9a-f]{40}$/.test(sha)) return;
      const date = new Date(deployed.updated_at);
      if (!Number.isFinite(date.valueOf())) return;
      const time = link.querySelector('time');
      time.textContent = new Intl.DateTimeFormat('en-IN', { dateStyle: 'long', timeZone: zone }).format(date);
      time.dateTime = date.toISOString();
      link.href = 'https://github.com/edwieee/portfolio/commit/' + sha;
      footer.querySelector('[data-shipped-label]').textContent = 'Last shipped';
    } catch {
      // The HTML already links to a verified successful deployment.
    }
  }

  function update(visible) {
    inView = visible;
    tick();
    if (!visible || opened) return;
    opened = true;
    footer.classList.add('signature-in-view');
    refreshShipment();
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => update(entry.isIntersecting)).observe(footer);
  } else {
    update(true);
  }
  document.addEventListener('visibilitychange', tick);
})();
