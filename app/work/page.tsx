'use client';

import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

const systems = [
  {
    slug: 'content-assembly',
    title: 'Content Assembly Pipeline',
    description:
      'Turn raw material into weekly distributed content.',
    tags: ['n8n', 'Claude', 'Opus Clip'],
  },
  {
    slug: 'research-agent',
    title: 'Research & Synthesis Agent',
    description:
      'Automated research that gathers, reads, and summarizes on demand.',
    tags: ['Claude', 'OpenAI', 'LangChain'],
  },
  {
    slug: 'knowledge-base',
    title: 'Internal Knowledge Base',
    description:
      'RAG system that lets teams query their own documentation naturally.',
    tags: ['Pinecone', 'Claude', 'Next.js'],
  },
];

export default function WorkPage() {
  return (
    <main className="min-h-screen pt-32 pb-32">
      <section className="container-main relative z-10">
        <ScrollReveal>
          <div className="mb-4">
            <span className="text-micro font-mono text-text-muted">
              SYSTEMS
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h1 className="text-h1 font-display font-medium text-text-primary mb-12">
            Selected systems, examined closely.
          </h1>
        </ScrollReveal>

        <div className="space-y-4">
          {systems.map((system, idx) => (
            <ScrollReveal key={system.slug} delay={0.05 * idx}>
              <Link href={`/work/${system.slug}`}>
                <div className="card hover:border-accent transition-all">
                  <h2 className="text-h2 font-display font-medium text-text-primary mb-2">
                    {system.title}
                  </h2>
                  <p className="text-body text-text-secondary mb-4">
                    {system.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {system.tags.map((tag) => (
                      <span key={tag} className="stack-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </main>
  );
}
