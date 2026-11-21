# Edwin Biju — Portfolio

A static introduction and illustrated project index. Open `index.html` directly or serve the directory with any static file server. Published HTML, styles, fonts and illustrations are checked in.

## Add or edit a project

Edit `content/projects.mjs` and put the artwork and any application captures in `assets/projects/`. Copy an existing entry for the expected fields. Use a unique, URL-safe slug. Set the kind to `Case study` for implemented work, and set `featured: true` on the case study to highlight. Future work uses a research or concept brief. The first featured case study takes the lead position.

Add repository, paper or verified live URLs as label/URL pairs in `links`. Use `gallery` for real application images. Credit third-party artwork in `assets/projects/CREDITS.md`.

Regenerate the archive with Node.js:

```sh
node scripts/build-projects.mjs
```

Commit the content, assets and generated pages together. The generator writes `projects/index.html` and a standalone page in `projects/<slug>/`. When retiring a slug, also remove or redirect its former page.

## Run locally

```sh
npx serve .
```

The portfolio works on static hosts, including subdirectory deployments. JavaScript adds scroll reveals. Native links and all project content work without it.
