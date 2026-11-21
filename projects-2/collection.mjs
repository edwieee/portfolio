import { concepts } from './concepts.mjs';
import { projects } from '../content/projects.mjs';

// Entries already documented in the portfolio reuse their verified copy.
// New Projects 2.0-only entries can also be defined directly in this array.
function include(slug) {
  const project = projects.find(entry => entry.slug === slug);
  if (!project) throw new Error('Missing project: ' + slug);
  return { ...project, cover: slug + '.webp' };
}
export const collection = ['lore', 'pulse-study', 'passage-index', 'meter-book'].map(include).concat(concepts);
