import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        'bg-elevated': 'var(--color-bg-elevated)',
        surface: 'var(--color-surface)',
        'surface-hover': 'var(--color-surface-hover)',
        border: 'var(--color-border)',
        'border-strong': 'var(--color-border-strong)',
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
        },
        accent: 'var(--color-accent)',
        'accent-glow': 'var(--color-accent-glow)',
        'accent-glow-strong': 'var(--color-accent-glow-strong)',
      },
      fontSize: {
        display: ['var(--text-display)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        h1: ['var(--text-h1)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        h2: ['var(--text-h2)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        h3: ['var(--text-h3)', { lineHeight: '1.3' }],
        'body-lg': ['var(--text-body-lg)', { lineHeight: '1.6' }],
        body: ['var(--text-body)', { lineHeight: '1.7' }],
        small: ['var(--text-small)', { lineHeight: '1.5' }],
        micro: ['var(--text-micro)', { lineHeight: '1.4', letterSpacing: '0.04em' }],
      },
      spacing: {
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        5: 'var(--space-5)',
        6: 'var(--space-6)',
        7: 'var(--space-7)',
        8: 'var(--space-8)',
        9: 'var(--space-9)',
      },
      borderRadius: {
        pill: 'var(--radius-pill)',
        card: 'var(--radius-card)',
        small: 'var(--radius-small)',
      },
      maxWidth: {
        container: '1200px',
      },
      backgroundImage: {
        grid: 'linear-gradient(0deg, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '80px 80px',
      },
      boxShadow: {
        'glow-soft': '0 0 40px var(--color-accent-glow)',
        'glow-hover': '0 0 60px var(--color-accent-glow-strong)',
      },
      fontFamily: {
        sans: ["'Geist Sans'", "'General Sans'", '-apple-system', 'sans-serif'],
        display: ["'Geist'", "'General Sans'", '-apple-system', 'sans-serif'],
        mono: ["'Geist Mono'", "'JetBrains Mono'", 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
