'use client';

import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-32">
      <section className="container-main max-w-2xl relative z-10">
        <ScrollReveal delay={0.05}>
          <div className="card">
            <div className="space-y-8">
              <div>
                <h1 className="text-h1 font-display font-medium text-text-primary mb-4">
                  About
                </h1>
                <p className="text-body-lg text-text-secondary leading-relaxed">
                  I'm Edwin. I study data science, but most of what I actually
                  know about building real systems came from shipping things for
                  businesses, not from a classroom. I work alone, by choice —
                  it's slower in volume but there's nothing lost in translation
                  between the idea and what ships.
                </p>
              </div>

              <div>
                <h2 className="text-h3 font-display font-medium text-text-primary mb-3">
                  How I work
                </h2>
                <p className="text-body text-text-secondary leading-relaxed mb-3">
                  Solo work by choice means something specific: there's no
                  account manager between you and me, no "let me check with my
                  team," no context being lost in handoffs. You talk directly
                  with the person building the system.
                </p>
                <p className="text-body text-text-secondary leading-relaxed">
                  It also means I take on fewer projects at once, and I'm
                  selective about what I work on. I'd rather turn down a system
                  I don't think will work than ship something that looks good
                  in a demo and falls apart in production.
                </p>
              </div>

              <div>
                <h2 className="text-h3 font-display font-medium text-text-primary mb-3">
                  Right now
                </h2>
                <p className="text-body text-text-secondary leading-relaxed">
                  I'm focused on AI systems that disappear into how teams
                  already work — no new software to learn, no extra overhead.
                  The best automation is the kind people don't think about.
                </p>
              </div>

              <div>
                <h2 className="text-h3 font-display font-medium text-text-primary mb-3">
                  Background texture
                </h2>
                <p className="text-body text-text-secondary leading-relaxed mb-3">
                  I co-founded a data science club at my university and helped
                  organize several hackathons. I've shipped products for
                  startups ranging from pre-seed to Series A, and built systems
                  for teams at companies with significant scale.
                </p>
                <p className="text-body text-text-secondary leading-relaxed">
                  The through-line has always been the same: take something
                  broken or inefficient, and make it work cleanly.
                </p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <Link href="/contact" className="btn-primary">
                Start a conversation
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
