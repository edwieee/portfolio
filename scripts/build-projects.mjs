import { mkdir, writeFile } from 'node:fs/promises';
import { projects } from '../content/projects.mjs';

const output = new URL('../projects/', import.meta.url);
const escape = value => String(value).replace(/[&<>"']/g, char =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const arrow = '<span class="arrow" aria-hidden="true">↗</span>';
const number = value => String(value).padStart(2, '0');
const cases = projects.filter(p => p.kind === 'Case study');
const briefs = projects.filter(p => p.kind !== 'Case study');

function frame(title, description, root, content, isIndex = false) {
  const archive = root + 'projects/index.html';
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escape(description)}">
  <meta name="theme-color" content="#f5f3ec">
  <title>${escape(title)} — Edwin Biju</title>
  <link rel="icon" href="${root}assets/favicon.svg">
  <link rel="stylesheet" href="${root}projects/archive.css">
  <script defer src="${root}projects/motion.js"></script>
</head>
<body>
  <a href="#main" class="skip">Skip to content</a>
  <div class="shell">
    <header class="mast"><a class="brand" href="${root}index.html">edwin.</a>
      <nav aria-label="Primary"><a href="${root}index.html">About</a><a href="${archive}" ${isIndex ? 'aria-current="page"' : 'aria-current="location"'}>Projects</a><a href="https://github.com/edwieee">GitHub ${arrow}</a></nav>
    </header>
    <main id="main">${content}</main>
    <footer><a class="brand" href="${root}index.html">edwin.</a><a href="mailto:edwinbiju135@gmail.com">Get in touch ${arrow}</a></footer>
  </div>
</body>
</html>\n`;
}

function plate(project, root) {
  const isBrain = project.image === 'brain';
  return `<div class="plate ${isBrain ? 'anatomy' : ''}">
    <img class="plate-image" src="${root}assets/projects/${escape(project.image)}.webp" alt="" width="${isBrain ? 655 : 810}" height="${isBrain ? 810 : 420}" ${project.featured ? 'fetchpriority="high"' : 'loading="lazy"'}>
    <span class="plate-caption">${escape(project.plate)}</span>
  </div>`;
}

function card(p) {
  return `<a class="card" href="${p.slug}/index.html">
    ${plate(p, '../')}
    <div class="card-text"><span class="meta">${escape(p.field)} · ${escape(p.kind)}</span>
    <h3>${escape(p.title)} ${arrow}</h3><p>${escape(p.summary)}</p></div>
  </a>`;
}

function feature(p) {
  return `<a class="feature" href="${p.slug}/index.html"><div class="feature-copy">
    <span class="meta"><i class="dot"></i>Featured case study</span>
    <h2>${escape(p.title)}</h2><p class="feature-sub">${escape(p.subtitle)}</p>
    <p class="synopsis">${escape(p.summary)}</p><span class="read">Read case study <span aria-hidden="true">→</span></span>
    </div>${plate(p, '../')}</a>`;
}

function group(title, entries, id) {
  if (!entries.length) return '';
  return `<section id="${id}"><div class="section-title"><h2>${title}</h2><span class="meta">${number(entries.length)} entries</span></div>
    <div class="grid">${entries.map(card).join('\n')}</div></section>`;
}

function indexPage() {
  const lead = cases.find(p => p.featured);
  const sections = `<div class="index-title"><h1>Project <em>index</em></h1>
    <div class="index-links"><a href="#work">Case studies <span>${number(cases.length)}</span></a>
    <a href="#briefs">Research &amp; concepts <span>${number(briefs.length)}</span></a></div></div>
    <div id="work">${lead ? feature(lead) : ''}${group('Case studies', cases.filter(p => p !== lead), 'case-studies')}</div>
    ${group('Research &amp; concepts', briefs, 'briefs')}`;
  return frame('Project index', 'Engineering case studies and research briefs by Edwin Biju.', '../', sections, true);
}

function detail(p) {
  const root = '../../';
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  const figures = (p.gallery || []).map(([src,title,caption]) => `<figure>
    <a href="${root}assets/projects/${escape(src)}.webp" aria-label="Open full image: ${escape(title)}"><img loading="lazy" src="${root}assets/projects/${escape(src)}.webp" alt="${escape(title)} in the ${escape(p.title)} application"></a>
    <figcaption><strong>${escape(title)}.</strong> ${escape(caption)}</figcaption></figure>`).join('');
  const article = `<a class="back" href="../index.html">← Project index</a>
    <div class="detail-head"><div><span class="meta">${escape(p.field)} / ${escape(p.kind)}</span><h1>${escape(p.title)}</h1>
    <p class="dek">${escape(p.subtitle)}</p></div>${plate(p, root)}</div>
    <div class="article"><aside><span class="meta">${p.kind === 'Case study' ? 'Technology' : 'Study topics'}</span>
    <ul>${p.tools.map(t=>`<li>${escape(t)}</li>`).join('')}</ul>
    ${p.links?.map(([label,url])=>`<a class="source" href="${escape(url)}">${escape(label)} ${arrow}</a>`).join('') || ''}</aside>
    <div class="prose">${p.sections.map(([title,body])=>`<section><h2>${escape(title)}</h2><p>${escape(body)}</p></section>`).join('\n')}
    <section><h2>${p.kind === 'Case study' ? 'System flow' : 'Proposed flow'}</h2>
    <ol class="flow">${p.flow.map(step=>`<li>${escape(step)}</li>`).join('')}</ol></section></div></div>
${figures ? `<section><div class="section-title"><h2>Inside the application</h2></div><div class="gallery">${figures}</div></section>` : ''}
    <a class="next" href="../${escape(next.slug)}/index.html"><span class="meta">Next entry</span><span>${escape(next.title)} →</span></a>`;
  return frame(p.title, p.summary, root, article);
}

await mkdir(output, { recursive: true });
await writeFile(new URL('index.html', output), indexPage());
for (const project of projects) {
  const directory = new URL(project.slug + '/', output);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL('index.html', directory), detail(project));
}
