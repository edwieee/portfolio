# Projects 2.0

The homepage card deck and its detail pages are generated as static HTML. The first collection entry leads the deck. The remaining covers use a stable shuffle based on their slugs. The text index and next-project navigation follow collection order.

1. Add a project in `collection.mjs`. Use `include(slug)` for a project from `content/projects.mjs`, or append a standalone object with the same fields and a `cover` filename to the exported array for a Projects 2.0-only entry.
2. Give it a unique lowercase URL slug. Supply its title, field, kind, subtitle, summary, tools, narrative sections and flow steps. Optional gallery entries use the existing portfolio screenshot format. Optional links are label/URL pairs for repositories, papers or live demos.
3. Put the cover in `projects-2/art/`. The existing covers are 840 × 540 pixels. Keep the upper-left and lower-left corners clear for the live HTML labels. Record image credits beside the art.
4. From the repository root run `node projects-2/build.mjs`. Commit the regenerated homepage, detail pages and new assets. The generator owns only the marked homepage section and the individual pages in this directory.

The deck, register and reading pages use ordinary links. Fine-pointer tilt, ink highlights and staggered entrances progressively enhance them. Reduced-motion preferences suppress motion effects.
