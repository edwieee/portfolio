export function portfolioFooter(root) {
  const home = root ? root + 'index.html' : '';
  return `<footer class="portfolio-footer" id="colophon" aria-label="Portfolio footer">
  <div class="footer-sheet">
    <div class="footer-profile">
      <div>
        <svg class="footer-signature" viewBox="0 0 190 76" aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
          <path pathLength="1" stroke-width="2.05" d="M6 51C21 45 42 28 48 16C55 2 35 9 22 19C8 30 10 37 21 35C29 34 36 30 40 27C26 33 10 45 12 55C14 67 33 63 49 47C55 41 64 37 67 42C69 47 57 58 52 55C47 52 56 42 62 42Q68 40 66 47C75 31 85 9 88 12C91 16 75 41 69 50C64 60 74 56 81 47C90 35 88 41 83 50C78 61 91 54 98 43C100 40 101 38 101 40C98 47 93 56 99 55C106 54 115 40 112 39C107 39 111 55 121 47C127 41 129 38 130 39L123 51Q119 60 129 53L140 42Q145 36 142 42L134 55C142 45 153 35 155 39C156 42 146 54 151 55Q159 58 181 38"/>
          <path class="signature-finish" pathLength="1" stroke-width="1.1" d="M131 32l2-2M29 69C64 61 111 63 164 59"/>
        </svg>
        <p class="footer-name">Edwin Biju</p>
        <p class="footer-meta">Kerala, India.</p>
        <p class="footer-meta"><span data-shipped-label>Shipped</span> <a data-shipped href="https://github.com/edwieee/portfolio/commit/7f60e3f4ed05f98a38d50278cc6c1b912ba85aa7"><time datetime="2026-11-22">22 November 2026</time></a>.</p>
      </div>
      <figure class="footer-stamp">
        <img src="${root}assets/kerala-postage.svg" width="180" height="216" loading="lazy" alt="Kerala, India postage stamp with a houseboat and coconut palms on the backwaters">
        <figcaption>where I'm based</figcaption>
      </figure>
    </div>
    <nav class="footer-links" aria-label="Footer navigation">
      <div><h2>Pages</h2><ul>
        <li><a href="${home}#introduction">Home</a></li>
        <li><a href="${home}#about">About</a></li>
        <li><a href="${root}projects/index.html">Projects</a></li>
        <li><a href="${home}#projects-2">Projects 2.0</a></li>
      </ul></div>
      <div><h2>Projects</h2><ul>
        <li><a href="${root}projects-2/lore/index.html">LORE</a></li>
        <li><a href="${root}projects-2/pulse-study/index.html">Pulse Study</a></li>
        <li><a href="${root}projects-2/passage-index/index.html">Passage Index</a></li>
        <li><a href="${root}projects-2/meter-book/index.html">Meter Book</a></li>
      </ul></div>
      <div><h2>Elsewhere</h2><ul>
        <li><a href="https://github.com/edwieee">GitHub</a></li>
        <li><a href="https://www.linkedin.com/in/edwinbiju135/">LinkedIn</a></li>
        <li><a href="https://x.com/edwieeee">X</a></li>
        <li><a href="mailto:edwinbiju135@gmail.com">Email</a></li>
      </ul></div>
    </nav>
    <div class="footer-base"><p>© 2026 Edwin Biju · Portfolio</p>
      <span class="footer-clock"><abbr title="India Standard Time">IST</abbr> <time data-clock hidden></time></span>
    </div>
  </div>
</footer>`;
}
