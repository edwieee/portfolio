'use client';

import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

interface WritingPostProps {
  params: {
    slug: string;
  };
}

// {TODO: replace with real content from CMS or database}
const posts: Record<
  string,
  {
    title: string;
    date: string;
    content: string;
  }
> = {
  'how-to-design-ai-systems': {
    title: 'How to Design AI Systems That Actually Get Used',
    date: '2024-12-15',
    content: `
The gap between a system that ships and one that gets used is usually not technical. It's about design—specifically, about how the system fits into the existing workflow.

I built three systems that technically worked but nobody used. They were correct. They were fast. They just existed beside how people actually worked, not inside it.

**Design for the workflow, not the feature.**

A system that requires someone to learn a new interface, open a new tab, and follow three steps is fighting the business's own momentum. A system that slides into an existing process—a Slack message that triggers the work, an email that arrives with the answer already in it, a button on a dashboard they already open every day—has a chance.

This means starting not with "what does AI do well" but with "where does this person already spend their time, and how do we make the output land there?"

**The default assumption should be failure.**

Design for the case where something breaks silently. Add logging so you know when it does. Build a manual override path so you're not stuck. Test with real data, not sample data. Have someone actually use it before you ship it to the team.

The most dangerous systems are the ones that seem to work fine, fail silently for three months, and then you realize decisions were made on corrupted data. I've seen this happen. It's not a technical problem at that point—it's a trust problem.

**Make it smaller than you think it should be.**

The most successful systems I've built were the ones I initially thought were too narrow. "This only handles 70% of the cases," I thought, and shipped it. The team used it. They built workflows around it. Then they asked for the edge cases.

Compare that to systems I over-engineered to handle 95% of cases on day one. They were impressive. Nobody used them because there was too much configuration, too many options, too much cognitive load.
    `,
  },
  'silent-failures-in-automation': {
    title: 'Silent Failures and How to Catch Them',
    date: '2024-12-08',
    content: `
A workflow that fails visibly is annoying. A workflow that fails silently is a business problem.

The silent failure is the one that runs, produces no output, and nobody notices for three days. By then the business has made decisions based on incomplete information, sent reports with missing data, or missed a deadline because they assumed the automation handled it.

I learned this the hard way. I built a system that scraped data from an API, transformed it, and sent it to a database. It worked for two months. Then the API changed its response format, silently. The scraper still ran. It still wrote to the database. But it wrote empty records. Nobody noticed until the analytics suddenly went flat.

**The system didn't fail. It failed silently.**

Here's how I design for it now:

1. **Observability first.** Every step logs what happened. Not just errors—successful steps too. A step that runs, produces zero results, and succeeds is different from a step that works and produces data. You need to see both.

2. **Fail noisily.** If a system can't complete its core job, it should make noise. Send an alert. Stop the workflow. Make someone aware that something went wrong before decisions get made on bad data.

3. **Test with real data.** Sample data is a lie. Build the system, then test it with yesterday's real data, last week's real data, last month's real data. Test it with the edge cases that actually exist in your business, not the ones you imagine.

4. **Have a manual path.** The automation is supposed to be faster, but if it breaks, the business shouldn't grind to a halt. There should be a manual way to do what the automation does—slower, but available.

5. **Monitor the output, not just the execution.** A system can run successfully and still produce garbage. Monitor what actually comes out. Check that the numbers make sense. Check that the format is what downstream systems expect. Check that it moved forward, not just that it ran.

The best automation is the kind you forget about because it works. But you can't forget about it if you can't see what it's doing.
    `,
  },
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function WritingPostPage({ params }: WritingPostProps) {
  const post = posts[params.slug];

  if (!post) {
    return (
      <main className="min-h-screen pt-32 pb-32">
        <section className="container-main max-w-2xl relative z-10 text-center">
          <h1 className="text-h1 font-display font-medium text-text-primary mb-4">
            Post not found
          </h1>
          <Link href="/writing" className="btn-tertiary">
            Back to writing
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-32">
      <article className="container-main max-w-2xl relative z-10">
        <ScrollReveal>
          <Link href="/writing" className="btn-tertiary mb-8">
            ← Back to writing
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <h1 className="text-h1 font-display font-medium text-text-primary mb-2">
            {post.title}
          </h1>
          <p className="text-small font-mono text-text-muted mb-8">
            {formatDate(post.date)}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="prose prose-invert max-w-none">
            {post.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('**')) {
                return (
                  <h2
                    key={idx}
                    className="text-h3 font-display font-medium text-text-primary mt-8 mb-4"
                  >
                    {paragraph.replace(/\*\*/g, '')}
                  </h2>
                );
              }

              if (paragraph.startsWith('1.') || paragraph.match(/^\d+\./)) {
                return (
                  <ol
                    key={idx}
                    className="list-decimal list-inside space-y-3 text-body text-text-secondary mb-6"
                  >
                    {paragraph.split('\n').map((item, i) => (
                      <li key={i}>{item.replace(/^\d+\.\s*/, '')}</li>
                    ))}
                  </ol>
                );
              }

              return (
                <p
                  key={idx}
                  className="text-body text-text-secondary leading-relaxed mb-6"
                >
                  {paragraph}
                </p>
              );
            })}
          </div>
        </ScrollReveal>
      </article>
    </main>
  );
}
