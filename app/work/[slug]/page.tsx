'use client';

import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

interface CaseStudyPageProps {
  params: {
    slug: string;
  };
}

// TODO: replace with real case study data from a database or CMS
const caseStudies: Record<
  string,
  {
    title: string;
    headline: string;
    context: string[];
    problem: string;
    solution: string;
    outcome: string;
    outcomeStat: string;
    tradeoffs: string;
    tags: string[];
    architecture: string;
  }
> = {
  'content-assembly': {
    title: 'Content Assembly Pipeline',
    headline: 'One conversation becomes a week of content, automatically.',
    context: [
      'A content creator was spending 10+ hours per week manually converting recorded conversations into blog posts, social clips, and email content.',
      'The work was repetitive but required quality oversight.',
      'They needed something that could handle the heavy lifting without introducing errors that would tank the output.',
    ],
    problem:
      'Manual content repurposing was consuming more time than content recording itself. Growth was capped by manual work, not by recording capacity.',
    solution:
      'Built a workflow in n8n that: (1) ingests recorded audio/video, (2) sends to Claude for full transcript + structured extraction of key points, (3) uses Opus Clip to auto-generate social clips at optimal lengths, (4) formats outputs for immediate publication.',
    outcome:
      'The creator now publishes 5-7 pieces of polished content per week from a single 1-hour conversation, with zero manual intermediary steps.',
    outcomeStat: '10 hours/week -> 30 min/week of manual work',
    tradeoffs:
      'The system requires quality input (clear audio, coherent conversation structure). If the source material is poorly organized, the output needs more manual refinement. I built monitoring into the workflow so failures surface immediately rather than silently, but the creator still needs to review outputs - this isn\'t true fully-automated publishing.',
    tags: ['n8n', 'Claude', 'Opus Clip', 'API Integration', 'Workflow Automation'],
    architecture:
      'Audio Input → n8n Webhook → Claude Transcription + Extraction → Opus Clip → Output Formatting → Cloud Storage',
  },
  'research-agent': {
    title: 'Research & Synthesis Agent',
    headline:
      'Ask a question, get a synthesized research report in minutes instead of hours.',
    context: [
      'A strategy team was spending significant time on research tasks: gathering articles, reading through multiple sources, synthesizing findings into coherent reports.',
      'Each research request took 3-4 hours of focused work.',
      'They needed something that could speed up the research phase without losing the quality analysis.',
    ],
    problem:
      'Manual research was the bottleneck in decision-making cycles. Faster research meant faster strategy iterations.',
    solution:
      'Built an AI agent using Claude that: (1) accepts a research question via Slack, (2) performs web searches, (3) reads and synthesizes results, (4) returns a structured report with citations and confidence levels.',
    outcome:
      'Research requests that took 3+ hours now return a draft report in 10-15 minutes, ready for human review and judgment.',
    outcomeStat: '3-4 hours -> 15 minutes per research task',
    tradeoffs:
      'The agent outputs a strong first draft, but not a finished report. Humans need to verify sources and add judgment. For truly novel research areas, the agent sometimes conflates sources or misses nuance - it\'s a research accelerator, not a researcher replacement.',
    tags: ['Claude', 'LangChain', 'Web Search', 'Slack Integration', 'AI Agents'],
    architecture:
      'Slack Query → Agent → Web Search → Claude Analysis → Formatting → Slack Return',
  },
  'knowledge-base': {
    title: 'Internal Knowledge Base',
    headline:
      "Ask your company's documentation a question and get the answer in seconds.",
    context: [
      'A remote team had accumulated substantial internal documentation across wikis, Notion pages, and Google Docs, but nobody could find anything.',
      'Onboarding took weeks because information was scattered.',
      'The team had tribal knowledge sitting in people's heads instead of surfaced and accessible.',
    ],
    problem:
      'Scattered documentation created onboarding friction and repeated questions. Knowledge wasn't truly lost, just unsearchable.',
    solution:
      'Built a RAG system with: (1) indexing of all internal docs into Pinecone, (2) a simple Next.js interface where anyone can ask questions, (3) Claude retrieves relevant docs and synthesizes an answer with citations.',
    outcome:
      'New hires can now find answers to most questions without Slack interruptions. Documentation became an asset instead of a graveyard.',
    outcomeStat: 'Onboarding friction reduced by 60%',
    tradeoffs:
      'The system is only as good as the documentation fed into it. If docs are outdated or vague, answers will be too. Requires a small upkeep cost to keep docs current and well-structured.',
    tags: ['Pinecone', 'Claude', 'Next.js', 'RAG', 'Knowledge Systems'],
    architecture:
      'Documentation Upload → Pinecone Indexing → Query Interface → Vector Search → Claude Synthesis → Answer with Citations',
  },
};

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const study = caseStudies[params.slug];

  if (!study) {
    return (
      <main className="min-h-screen pt-32 pb-32">
        <section className="container-main relative z-10 text-center">
          <h1 className="text-h1 font-display font-medium text-text-primary mb-4">
            Case study not found
          </h1>
          <Link href="/work" className="btn-tertiary">
            Back to systems
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-32">
      <article className="container-main max-w-2xl relative z-10">
        <ScrollReveal>
          <Link href="/work" className="btn-tertiary mb-8">
            ← Back to systems
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <h1 className="text-h1 font-display font-medium text-text-primary mb-4">
            {study.headline}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="space-y-6 mb-12">
            <div>
              <h2 className="text-micro font-mono text-text-muted uppercase mb-2">
                Context
              </h2>
              {study.context.map((line, idx) => (
                <p key={idx} className="text-body text-text-secondary mb-3">
                  {line}
                </p>
              ))}
            </div>

            <div>
              <h2 className="text-micro font-mono text-text-muted uppercase mb-2">
                The Problem
              </h2>
              <p className="text-body text-text-secondary">
                {study.problem}
              </p>
            </div>

            <div>
              <h2 className="text-micro font-mono text-text-muted uppercase mb-2">
                The System
              </h2>
              <p className="text-body text-text-secondary mb-4">
                {study.solution}
              </p>
              <div className="bg-surface rounded-card border border-border p-4 mb-4">
                <p className="text-small text-text-muted font-mono">
                  {study.architecture}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-micro font-mono text-text-muted uppercase mb-2">
                Outcome
              </h2>
              <p className="text-h3 font-display font-medium text-accent mb-3">
                {study.outcomeStat}
              </p>
              <p className="text-body text-text-secondary">
                {study.outcome}
              </p>
            </div>

            <div>
              <h2 className="text-micro font-mono text-text-muted uppercase mb-2">
                What I'd Do Differently
              </h2>
              <p className="text-body text-text-secondary">
                {study.tradeoffs}
              </p>
            </div>

            <div>
              <h2 className="text-micro font-mono text-text-muted uppercase mb-3">
                Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {study.tags.map((tag) => (
                  <span key={tag} className="stack-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="pt-12 border-t border-border">
            <h2 className="text-h3 font-display font-medium text-text-primary mb-4">
              Talk about something similar
            </h2>
            <Link href="/contact" className="btn-primary">
              Start a conversation
            </Link>
          </div>
        </ScrollReveal>
      </article>
    </main>
  );
}
