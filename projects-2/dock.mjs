const destinations = [
  ['introduction','Home','<path d="m3 10 9-7 9 7v10h-6v-7H9v7H3z"/>'],
  ['projects-2','Projects 2.0','<rect x="3" y="7" width="18" height="14" rx="3"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18"/>'],
  ['upcoming','Upcoming concepts','<path d="m12 3 9 5-9 5-9-5zM3 12l9 5 9-5M3 16l9 5 9-5"/>'],
  ['about','About Edwin','<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7v.5"/>']
];

export function dock(prefix, current) {
  const links = destinations.map(([id,label,graphic]) => `<a href="${prefix}#${id}" aria-label="${label}"${current === id ? ' aria-current="location"' : ''}>
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">${graphic}</svg>
    <span aria-hidden="true">${label}</span></a>`).join('');
  return `<nav class="section-dock" aria-label="Portfolio sections">${links}</nav>`;
}
