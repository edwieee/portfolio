'use client';

import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

interface WritingEntry {
  slug: string;
  title: string;
  date: string;
  description: string;
}

// TODO: replace with real writing entries
const writings: WritingEntry[] = [
  {
    slug: 'how-to-design-ai-systems',
    title: 'How to Design AI Systems That Actually Get Used',
    date: '2024-12-15',
    description:
      'The difference between a system people adopt and one that collects dust is not the AI - it is the design.',
  },
  {
    slug: 'silent-failures-in-automation',
    title: 'Silent Failures and How to Catch Them',
    date: '2024-12-08',
    description:
      'A system that fails quietly is worse than no system at all. Here is how to design for observability.',
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function WritingPage() {
  return (
    <main className="min-h-screen pt-32 pb-32">
      <section className="container-main max-w-2xl relative z-10">
        <ScrollReveal>
          <div className="mb-4">
            <span className="text-micro font-mono text-text-muted">
              WRITING
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h1 className="text-h1 font-display font-medium text-text-primary mb-12">
            Build logs and short technical notes.
          </h1>
        </ScrollReveal>

        <div className="space-y-6">
          {writings.length > 0 ? (
            writings.map((post, idx) => (
              <ScrollReveal key={post.slug} delay={0.05 * idx}>
                <Link href={`/writing/${post.slug}`}>
                  <div className="hover:opacity-80 transition-opacity">
                    <div className="flex items-start gap-4">
                      <span className="text-small font-mono text-text-muted flex-shrink-0 whitespace-nowrap">
                        {formatDate(post.date)}
                      </span>
                      <div className="flex-grow">
                        <h2 className="text-body font-display font-medium text-text-primary mb-1 hover:text-accent transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-small text-text-secondary">
                          {post.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))
          ) : (
            <ScrollReveal>
              <p className="text-body text-text-muted">
                No writing yet. Check back soon.
              </p>
            </ScrollReveal>
          )}
        </div>
      </section>
    </main>
  );
}
