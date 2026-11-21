import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dock } from './dock.mjs';
import { collection } from './collection.mjs';
import { portfolioFooter } from '../scripts/footer.mjs';

const directory = new URL('./', import.meta.url);
const html = value => String(value).replace(/[&<>"']/g, ch => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[ch]);
const arrow = '<span aria-hidden="true">↗</span>';
const count = n => String(n).padStart(2, '0');

function cover(p, root) {
  return `<span class="v2-print${p.example ? ' v2-concept-print' : ''}" data-cover="${html(p.slug)}">
    <img src="${root}projects-2/art/${html(p.cover)}" alt="" loading="lazy">
    <span class="v2-imprint">${p.example ? html(p.kind) : html(p.field)}</span>
    <span class="v2-signature">${html(p.title)}</span>
    <span class="v2-mark" aria-hidden="true">e.</span>
  </span>`;
}

function homeSection() {
  // A stable shuffle keeps a returning reader's place and preserves the index order.
  const [lead, ...rest] = collection;
  const shuffled = rest.map(project => ({
    project, rank: createHash('sha256').update('projects-2:' + project.slug).digest('hex')
  })).sort((a,b) => a.rank.localeCompare(b.rank));
  const deck = [lead, ...shuffled.map(entry => entry.project)];
  const cards = deck.map(p => `<a class="v2-card" href="projects-2/${p.slug}/index.html" aria-label="Read ${html(p.title)} — ${html(p.kind)}">${cover(p, '')}</a>`).join('\n');
  const rows = collection.map(p => `<li><a class="v2-row" href="projects-2/${p.slug}/index.html">
    <span><small>${html(p.field)} · ${html(p.kind)}</small><strong>${html(p.title)}</strong></span>
    <span class="v2-desc">${html(p.summary)}</span>${arrow}</a></li>`).join('\n');
  return `${dock('', 'introduction')}
<section class="v2 v2-home" id="projects-2" aria-labelledby="v2-heading">
  <div class="v2-wrap"><header class="v2-heading">
    <h2 id="v2-heading">Projects <em>2.0</em></h2>
    <a class="v2-jump" href="#v2-register">Project index ↓</a></header>
    <div class="v2-deck" id="upcoming" role="region" aria-label="Project cards">
      <div class="v2-spread">${cards}</div>
    </div>
    <div class="v2-pan" hidden role="group" aria-label="Pan project cards">
      <button type="button" data-pan="-1" aria-label="Pan cards left" aria-controls="upcoming">←</button>
      <button type="button" data-pan="1" aria-label="Pan cards right" aria-controls="upcoming">→</button>
    </div>
    <section id="v2-register" aria-labelledby="v2-index-title"><div class="v2-register-heading">
    <h3 id="v2-index-title">The index</h3><span>${count(collection.length)} entries</span></div>
    <ul class="v2-register">${rows}</ul></section>
  </div></section>`;
}

function gallery(p) {
  if (!p.gallery?.length) return '';
  return `<section id="screens"><h2>Inside the application</h2>${p.gallery.map(([image,title,caption]) =>
    `<figure><a href="../../assets/projects/${html(image)}.webp" aria-label="Open image: ${html(title)}"><img src="../../assets/projects/${html(image)}.webp" alt="${html(title)}" loading="lazy"></a>
    <figcaption><strong>${html(title)}.</strong> ${html(caption)}</figcaption></figure>`).join('\n')}</section>`;
}

function detail(p, next) {
  const chapters = p.sections.map(([title],i) => `<a href="#chapter-${i+1}">${html(title)}</a>`).join('\n');
  const back = '../../index.html#projects-2';
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#e9eae4"><script src="../../assets/theme.js"></script>
<title>${html(p.title)} · Projects 2.0 — Edwin Biju</title><meta name="description" content="${html(p.summary)}">
<link rel="icon" href="../../assets/favicon.svg"><link rel="stylesheet" href="../edition.css"><link rel="stylesheet" href="../../assets/theme.css"><link rel="stylesheet" href="../../assets/footer.css"><script defer src="../motion.js"></script><script defer src="../navigation.js"></script></head>
<body class="v2 v2-detail"><a class="v2-skip" href="#article">Skip to case notes</a>
${dock('../../index.html', 'projects-2')}
<div class="v2-wrap"><header class="v2-bar"><a href="../../index.html">edwin.</a><a href="${back}">← Projects 2.0</a><button type="button" class="theme-switch" data-theme-switch hidden><span>Dark mode</span></button></header>
<main><header class="v2-intro" id="overview"><div><small>${html(p.kind)} / ${html(p.field)}</small><h1>${html(p.title)}</h1>
<p class="v2-dek">${html(p.subtitle)}</p><p>${html(p.summary)}</p></div><div class="v2-exhibit">${cover(p,'../../')}</div></header>
<div class="v2-story" id="article"><aside><nav class="chapter-rail" aria-label="On this page"><small>Contents</small><a href="#overview" aria-current="location">Overview</a>${chapters}
<a href="#flow">${p.example ? 'Illustrated walkthrough' : 'System flow'}</a>${p.gallery?.length ? '<a href="#screens">Application views</a>' : ''}${p.links?.length ? '<a href="#sources">Sources</a>' : ''}</nav></aside>
<article><div class="v2-tools">${p.tools.map(tool=>`<span>${html(tool)}</span>`).join('')}</div>
${p.sections.map(([title,copy], i)=>`<section id="chapter-${i+1}"><h2>${html(title)}</h2><p>${html(copy)}</p></section>`).join('\n')}
<section id="flow"><h2>${p.example ? 'Illustrated walkthrough' : p.kind==='Case study'?'System flow':'Proposed system flow'}</h2>
${p.example ? `<p class="v2-example-note">Follow a sample scenario through the proposed system.</p>
    ${p.flow.map((step,i)=>`<details class="v2-step"><summary>${html(step)}</summary><p>${html(p.example[i])}</p></details>`).join('')}` :
    `<ol>${p.flow.map(step=>`<li>${html(step)}</li>`).join('')}</ol>`}</section>
${gallery(p)}
${p.links?.length ? `<section id="sources"><h2>Sources</h2>${p.links.map(([label,url])=>`<a class="v2-source" href="${html(url)}">${html(label)} ${arrow}</a>`).join('\n')}</section>` : ''}
</article></div></main>
<nav class="v2-bar v2-end" aria-label="Project navigation"><a href="${back}">← Projects 2.0</a><a href="../${next.slug}/index.html">Next · ${html(next.title)} →</a></nav></div>
${portfolioFooter('../../')}</body></html>\n`;
}

for (const [i, project] of collection.entries()) {
  const folder = new URL(project.slug + '/',directory);
  await mkdir(folder,{recursive:true});
  await writeFile(new URL('index.html',folder), detail(project,collection[(i+1)%collection.length]));
}

const home = new URL('../index.html',directory);
const start = '<!-- Projects 2.0: begin -->';
const end = '<!-- Projects 2.0: end -->';
const page = await readFile(home,'utf8');
const a = page.indexOf(start), b = page.indexOf(end);
if (a < 0 || b < a) throw new Error('Homepage Projects 2.0 markers are missing');
const updated = page.slice(0,a+start.length)+'\n'+homeSection()+'\n'+page.slice(b);
const footerStart = '<!-- Portfolio footer: begin -->';
const footerEnd = '<!-- Portfolio footer: end -->';
const from = updated.indexOf(footerStart), to = updated.indexOf(footerEnd);
if (from < 0 || to < from) throw new Error('Homepage footer markers are missing');
await writeFile(home, updated.slice(0,from+footerStart.length)+'\n'+portfolioFooter('')+'\n'+updated.slice(to));
