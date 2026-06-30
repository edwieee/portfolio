'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

const TimeDisplay = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Kolkata',
        hour12: false,
      });
      setTime(formatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span>{time ? `${time} IST` : '...'}</span>;
};

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        return;
      }

      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="min-h-screen">
      {/* Section 01 - Hero */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-4 md:px-6 overflow-hidden"
      >
        {/* Cursor-reactive glow */}
        <motion.div
          className="absolute pointer-events-none w-96 h-96 rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, var(--color-accent-glow) 0%, transparent 70%)',
          }}
          animate={{
            x: mousePos.x - 192,
            y: mousePos.y - 192,
          }}
          transition={{
            type: 'spring',
            stiffness: 50,
            damping: 30,
          }}
        />

        <div className="relative z-10 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-4 text-micro font-mono text-text-muted flex items-center justify-center gap-2"
          >
            <span className="status-dot active" />
            AVAILABLE FOR NEW SYSTEMS
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="text-display font-display font-medium mb-6 text-text-primary leading-tight"
          >
            I build AI systems. <span className="text-accent">Alone, on purpose.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="text-body-lg text-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            No handoffs, no account managers, no telephone game between what you
            need and what gets built. One person, start to finish.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="#work" className="btn-primary">
              See the work
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
            className="mt-12 text-micro font-mono text-text-muted"
          >
            Local - <TimeDisplay />
          </motion.div>
        </div>
      </section>

      {/* Section 02 - Live Signal */}
      <section className="section-spacing container-main relative z-10">
        <ScrollReveal>
          <div className="mb-4">
            <span className="text-micro font-mono text-text-muted">
              01 - CURRENTLY RUNNING
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="card border-accent border-opacity-60 glow-accent">
            <h3 className="text-h2 font-display font-medium text-text-primary mb-3">
              Content Assembly Pipeline
            </h3>
            <p className="text-body text-text-secondary mb-4">
              A system that turns one recorded conversation into a week of
              finished material - built with n8n, Claude, and Opus Clip,
              running without anyone touching it after setup.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="stack-tag">n8n</span>
              <span className="stack-tag">Claude</span>
              <span className="stack-tag">Opus Clip</span>
            </div>
            <Link href="/work/content-assembly" className="btn-tertiary">
              Read the case study
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 03 - AI Systems Taxonomy */}
      <section className="section-spacing container-main relative z-10">
        <ScrollReveal>
          <div className="mb-4">
            <span className="text-micro font-mono text-text-muted">
              02 - WHAT I BUILD
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-h1 font-display font-medium text-text-primary mb-12">
            The shape of the problems I solve.
          </h2>
        </ScrollReveal>

        <div className="space-y-8">
          {[
            {
              title: 'AI Agents',
              description:
                'Self-directed systems that make decisions and take actions based on defined goals, without requiring a human in every loop.',
            },
            {
              title: 'Workflow Automation',
              description:
                'Systems that remove a specific, repeated manual step from how a business already operates, without requiring anyone to learn new software.',
            },
            {
              title: 'Internal Tools',
              description:
                'Purpose-built interfaces that compress manual work into a single button or form, removing friction from how teams actually operate.',
            },
            {
              title: 'Knowledge & RAG Systems',
              description:
                'Systems that let teams retrieve, synthesize, and act on their own accumulated knowledge at the speed of a question.',
            },
          ].map((item, idx) => (
            <ScrollReveal key={idx} delay={0.05 * idx}>
              <div className="flex flex-col sm:flex-row sm:items-start sm:gap-6">
                <span className="text-h3 font-display font-medium text-text-primary flex-shrink-0 mb-2 sm:mb-0">
                  {item.title}
                </span>
                <p className="text-body text-text-secondary flex-grow">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Section 04 - Build Philosophy */}
      <section className="section-spacing container-main relative z-10">
        <ScrollReveal>
          <div className="mb-4">
            <span className="text-micro font-mono text-text-muted">
              03 - HOW I BUILD
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="card max-w-2xl">
            <p className="text-body-lg text-text-primary mb-8">
              I do not have a deck of slides about the future of AI. I have
              opinions about how it should actually be built, formed from
              building it.
            </p>

            <div className="space-y-6">
              {[
                'A system that disappears into how the business already runs is worth more than one that sits beside it, unopened.',
                'If a workflow can fail silently, eventually it will. I design for the failure case, not just the demo.',
                'A system that needs a manual to operate is not finished. It is half-built with instructions taped to it.',
                'I would rather hand over something smaller that actually runs than something ambitious that needs a babysitter.',
              ].map((principle, idx) => (
                <ScrollReveal key={idx} delay={0.05 * idx}>
                  <p className="text-body text-text-secondary leading-relaxed">
                    {principle}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 05 - Selected Systems */}
      <section className="section-spacing container-main relative z-10">
        <ScrollReveal>
          <div className="mb-4">
            <span className="text-micro font-mono text-text-muted">
              04 - SELECTED SYSTEMS
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-h1 font-display font-medium text-text-primary mb-8">
            Systems in the wild.
          </h2>
        </ScrollReveal>

        <div className="space-y-4 mb-8">
          {[
            {
              title: 'Content Assembly Pipeline',
              context: 'Turn raw material into weekly distributed content.',
              tags: ['n8n', 'Claude', 'Opus Clip'],
            },
            {
              title: 'Research and Synthesis Agent',
              context:
                'Automated research that gathers, reads, and summarizes on demand.',
              tags: ['Claude', 'OpenAI', 'LangChain'],
            },
            {
              title: 'Internal Knowledge Base',
              context:
                'RAG system that lets teams query their own documentation naturally.',
              tags: ['Pinecone', 'Claude', 'Next.js'],
            },
          ].map((item, idx) => (
            <ScrollReveal key={idx} delay={0.05 * idx}>
              <Link href="/work">
                <div className="card hover:border-accent transition-all">
                  <h3 className="text-h3 font-display font-medium text-text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-body text-text-secondary mb-4">
                    {item.context}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
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

        <ScrollReveal delay={0.3}>
          <Link href="/work" className="btn-tertiary">
            View all systems
          </Link>
        </ScrollReveal>
      </section>

      {/* Section 06 - About Snapshot */}
      <section className="section-spacing container-main relative z-10">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <div className="aspect-square bg-surface rounded-card border border-border flex items-center justify-center">
                {/* TODO: replace with actual photo */}
                <span className="text-text-muted text-small">Photo</span>
              </div>
            </div>

            <div>
              <p className="text-body-lg text-text-secondary leading-relaxed mb-6">
                I am Edwin. I study data science, but most of what I actually
                know about building real systems came from shipping things for
                businesses, not from a classroom. I work alone, by choice - it is
                slower in volume but there is nothing lost in translation between
                the idea and what ships.
              </p>
              <Link href="/about" className="btn-tertiary">
                More about how I work
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 07 - Closing CTA */}
      <section className="section-spacing container-main relative z-10">
        {/* Faint glow reprises hero motif */}
        <div className="absolute -top-64 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20" style={{ background: 'radial-gradient(circle, var(--color-accent-glow) 0%, transparent 70%)' }} />

        <ScrollReveal>
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h2 className="text-h1 font-display font-medium text-text-primary mb-6">
              I take on a small number of systems at a time, by design.
            </h2>
            <p className="text-body-lg text-text-secondary mb-8">
              If that is the kind of attention you want on yours, tell me what
              you are building.
            </p>
            <Link href="/contact" className="btn-primary">
              Start a conversation
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
