(() => {
  const key = 'edwin-portfolio-theme';
  const system = matchMedia('(prefers-color-scheme: dark)');
  const root = document.documentElement;
  function readPreference() {
    try {
      const value = localStorage.getItem(key);
      return value === 'light' || value === 'dark' ? value : null;
    } catch { return null; }
  }

  let preference = readPreference();
  function apply() {
    const theme = preference || (system.matches ? 'dark' : 'light');
    root.dataset.theme = theme;
    const color = document.querySelector('meta[name="theme-color"]');
    if (color) color.content = theme === 'dark' ? '#191c1b' : '#f5f2e9';
    const button = document.querySelector('[data-theme-switch]');
    if (!button) return;
    const next = theme === 'dark' ? 'Light' : 'Dark';
    button.querySelector('span').textContent = next + ' mode';
    button.setAttribute('aria-label', 'Switch to ' + next.toLowerCase() + ' mode');
    button.hidden = false;
  }

  apply();
  document.addEventListener('DOMContentLoaded', () => {
    apply();
    document.querySelector('[data-theme-switch]')?.addEventListener('click', () => {
      preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(key, preference); } catch { /* In-memory choice still works. */ }
      apply();
    });
  });
  system.addEventListener('change', apply);
  window.addEventListener('storage', event => {
    if (event.key === key || event.key === null) {
      preference = readPreference();
      apply();
    }
  });
  window.addEventListener('pageshow', event => {
    if (event.persisted) {
      preference = readPreference() || preference;
      apply();
    }
  });
})();
