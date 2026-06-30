'use client';

import { useState } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    question: '',
    email: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    // {TODO: replace with actual form submission endpoint}
    setTimeout(() => {
      setStatus('success');
      setFormData({ question: '', email: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <main className="min-h-screen pt-32 pb-32">
      <section className="container-main max-w-2xl relative z-10">
        <ScrollReveal delay={0.05}>
          <div className="card">
            <h1 className="text-h1 font-display font-medium text-text-primary mb-4">
              You read this far. That's usually a good sign.
            </h1>
            <p className="text-body-lg text-text-secondary mb-8 leading-relaxed">
              I take on a small number of systems at a time. If this is the kind
              of thinking you want behind yours, tell me what you're building.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 mb-8">
              <div>
                <label
                  htmlFor="question"
                  className="block text-small font-medium text-text-primary mb-2"
                >
                  What are you building?
                </label>
                <textarea
                  id="question"
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-bg-elevated border border-border rounded-card text-body text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all resize-none"
                  placeholder="Describe the problem you're solving and what you need built..."
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-small font-medium text-text-primary mb-2"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-bg-elevated border border-border rounded-card text-body text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                  placeholder="you@company.com"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Sending...' : 'Send'}
              </button>

              {status === 'success' && (
                <div className="p-4 bg-bg-elevated border border-accent/50 rounded-card text-small text-accent">
                  Message sent. I'll read and reply to it myself.
                </div>
              )}
            </form>

            <div className="p-4 bg-bg-elevated rounded-card border border-border mb-8">
              <p className="text-small text-text-muted">
                Messages come directly to me. I read and reply to all of them
                myself.
              </p>
            </div>

            <div className="border-t border-border pt-6">
              <p className="text-small text-text-muted mb-4">
                Prefer to reach out directly?
              </p>
              <a
                href="mailto:hello@example.com"
                className="btn-tertiary"
              >
                hello@example.com
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
