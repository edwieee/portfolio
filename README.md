# Personal Portfolio — AI Systems Builder

A personal website for an independent AI systems builder who designs and builds AI systems, automations, internal tools, AI agents, and workflow software.

Built with **Next.js 14+**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Design tokens and global styles
│   ├── work/
│   │   ├── page.tsx        # Systems index
│   │   └── [slug]/page.tsx # Individual case study
│   ├── writing/
│   │   ├── page.tsx        # Writing index
│   │   └── [slug]/page.tsx # Individual post
│   ├── about/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── Dock.tsx            # Navigation dock
│   └── ScrollReveal.tsx    # Scroll reveal animations
├── tailwind.config.ts      # Tailwind configuration with design tokens
├── next.config.js
├── tsconfig.json
└── package.json
```

## Design System

All design tokens are defined as CSS variables in `app/globals.css` and referenced through Tailwind's config:

- **Colors:** Dark palette with warm amber accent
- **Typography:** Geist (display) + Geist Sans/Inter (body) + Geist Mono (UI labels)
- **Spacing:** 8px base scale
- **Shadows/Glow:** Accent-colored only, no conventional shadows

The grid pattern background is implemented as a fixed, full-viewport element at very low opacity.

## Key Components

### Dock Navigation
Fixed navigation dock at bottom-center, mobile-optimized with menu overlay. Active page indicator and tooltip labels on hover.

### Scroll Reveal
IntersectionObserver-based scroll animations with stagger support. Respects `prefers-reduced-motion`.

### Cursor-Reactive Glow (Hero)
Soft radial gradient follows cursor within hero section only. Smooth spring-based easing, lagged response.

## Customization

### Update Content

- **Homepage:** Edit `app/page.tsx` sections
- **Case Studies:** Add entries to `caseStudies` object in `app/work/[slug]/page.tsx`
- **Writing:** Add entries to `writings` array in `app/writing/page.tsx`
- **About:** Edit `app/about/page.tsx`
- **Contact:** Form logic in `app/contact/page.tsx` (connect to your backend)

### Modify Design Tokens

Edit CSS variables in `app/globals.css`:
- Color palette: `--color-*`
- Typography scales: `--text-*`
- Spacing: `--space-*`
- Breakpoints: `--bp-*`

All values cascade through Tailwind config in `tailwind.config.ts`.

### Change Dock Items

Edit the `desktopItems` and `mobileItems` arrays in `components/Dock.tsx`.

## Deployment

Deploy to [Vercel](https://vercel.com):

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

## Performance

- Lazy-loaded images with Next.js `<Image>`
- Variable fonts with `font-display: swap`
- GPU-accelerated animations (transform/opacity only)
- Static generation where possible
- Target Lighthouse 90+ score

## Accessibility

- WCAG AA contrast minimums verified
- Visible focus rings on all interactive elements
- Semantic HTML throughout
- Reduced motion support built-in

## Notes

- **No light mode:** Dark only, full commitment
- **No stock imagery:** Authentic, real work only
- **Single accent color:** All interactive states derive from warm amber
- **No agency language:** Never uses "we," "our," "clients," or "services"
- **Quiet confidence:** Site speaks through work, not hype

## License

MIT

---

**To personalize:**

1. Replace "Edwin" and "EB" with your name
2. Update email in Contact page and Dock navigation
3. Replace placeholder copy with your real systems, writing, and details
4. Add actual case study content (remove {TODO} markers)
5. Customize design tokens if desired (though the current palette is designed to be timeless)
6. Connect the contact form to a backend (Resend, Nodemailer, etc.)
