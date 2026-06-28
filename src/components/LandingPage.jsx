import React from 'react';
import { product } from '../data/product.js';
import {
  Container,
  Section,
  Eyebrow,
  Reveal,
  Card,
  Button,
  Check,
  Plus,
  ArrowRight,
  Motif,
} from './primitives.jsx';
import Footer from './Footer.jsx';

/**
 * Standalone programmatic-SEO landing page.
 *
 * Rendered both at build time (scripts/prerender.mjs writes each to its own
 * dist/<path>/index.html) and not hydrated as an SPA — these are reached by a
 * normal full-page navigation. Reuses the shared Footer + primitives. A trimmed
 * inline header (not the interactive Nav) keeps the page SSR-deterministic.
 */
export default function LandingPage({ data }) {
  const homeUrl = product.siteUrl;
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[color:var(--accent-ink)]"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 border-b border-line bg-[color:var(--bg)]/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-container items-center justify-between px-6 md:px-12">
          <a href={homeUrl} className="inline-flex items-center gap-2.5 rounded-[3px]" aria-label={`${product.name} home`}>
            <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-[3px] border border-line bg-card">
              <img src={product.logo} alt="" width={24} height={24} className="h-5 w-5 object-contain" />
            </span>
            <span className="text-[16px] font-semibold tracking-[-0.01em] text-ink">{product.name}</span>
          </a>
          <Button href={product.ctaHref} variant="primary" className="px-5 py-2.5">
            {product.ctaLabel}
            <ArrowRight />
          </Button>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        {/* Hero */}
        <div className="relative overflow-hidden border-b border-line">
          <div aria-hidden="true" className="blueprint pointer-events-none absolute inset-0 opacity-70" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-accent-line" />
          <Container className="relative pt-16 pb-16 md:pt-20 md:pb-20">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mono mb-7 text-[10.5px] uppercase tracking-[0.16em] text-ink-faint">
              <a href={homeUrl} className="transition-colors hover:text-ink">{product.name}</a>
              <span className="px-2 text-ink-faint/60">/</span>
              <span className="text-ink-subtle">{data.navLabel}</span>
            </nav>

            <Reveal>
              <Eyebrow>{data.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h1
                className="mt-7 max-w-[18ch] text-[clamp(2.3rem,4.8vw,4rem)] font-semibold leading-[1.0] tracking-[-0.04em] text-ink"
                style={{ textWrap: 'balance' }}
              >
                {data.h1}
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-[58ch] text-[16.5px] leading-[1.75] text-ink-muted">{data.intro}</p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Button href={product.ctaHref} variant="primary">
                  {product.ctaLabel}
                  <ArrowRight />
                </Button>
                <Button href={homeUrl} variant="ghost" external={false}>
                  Explore {product.name}
                  <ArrowRight />
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="mono mt-6 text-[10.5px] uppercase tracking-[0.16em] text-ink-faint">
                Start free · manual-first · nothing sends without you
              </p>
            </Reveal>
          </Container>
        </div>

        {/* Body sections */}
        <Section className="border-b border-line">
          <Container>
            <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
              <div className="space-y-14">
                {data.sections.map((s) => (
                  <Reveal key={s.heading}>
                    <h2 className="text-[clamp(1.5rem,2.8vw,2.1rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-ink">
                      {s.heading}
                    </h2>
                    <div className="mt-5 space-y-4">
                      {s.body.map((p, i) => (
                        <p key={i} className="max-w-[64ch] text-[15.5px] leading-[1.78] text-ink-muted">
                          {p}
                        </p>
                      ))}
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Benefit list */}
              <Reveal delay={0.06}>
                <Card className="p-7 lg:sticky lg:top-24">
                  <div className="flex items-center gap-2 text-accent">
                    <Motif size={13} />
                    <span className="mono text-[10px] uppercase tracking-[0.18em]">{data.bullets.heading}</span>
                  </div>
                  <ul className="mt-6 space-y-3.5">
                    {data.bullets.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[14.5px] leading-[1.6] text-ink">
                        <span className="mt-0.5 inline-grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                          <Check size={12} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 border-t border-line-light pt-6">
                    <Button href={product.ctaHref} variant="primary" className="w-full">
                      {product.ctaLabel}
                      <ArrowRight />
                    </Button>
                  </div>
                </Card>
              </Reveal>
            </div>
          </Container>
        </Section>

        {/* FAQ */}
        <Section className="border-b border-line bg-bg-alt">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
              <Reveal>
                <Eyebrow>FAQ</Eyebrow>
                <h2 className="mt-6 text-[clamp(1.8rem,3.4vw,2.7rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-ink">
                  Questions, answered.
                </h2>
                <p className="mt-5 text-[15px] leading-[1.7] text-ink-muted">
                  Want the full picture?{' '}
                  <a href={homeUrl} className="text-accent underline decoration-accent-line underline-offset-2 hover:text-accent-strong">
                    See everything {product.name} does
                  </a>
                  .
                </p>
              </Reveal>

              <Reveal delay={0.06}>
                <Card className="overflow-hidden">
                  {data.faqs.map((f, i) => (
                    <details key={f.q} className="group" style={i === 0 ? undefined : { borderTop: '1px solid var(--border-light)' }}>
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-7 py-5 text-[15px] font-medium text-ink transition-colors hover:text-accent-strong [&::-webkit-details-marker]:hidden">
                        {f.q}
                        <Plus size={15} className="shrink-0 text-ink-subtle transition-transform duration-300 group-open:rotate-45" />
                      </summary>
                      <p className="max-w-[64ch] px-7 pb-6 text-[14px] leading-[1.75] text-ink-muted">{f.a}</p>
                    </details>
                  ))}
                </Card>
              </Reveal>
            </div>
          </Container>
        </Section>

        {/* Final CTA */}
        <Section>
          <Container>
            <Reveal>
              <div className="rounded-[10px] border border-line bg-[color:var(--ink-bg)] px-7 py-14 text-center md:px-14">
                <h2 className="mx-auto max-w-[22ch] text-[clamp(1.7rem,3.2vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[color:var(--ink-text)]">
                  The next job worth chasing is already in your inbox.
                </h2>
                <p className="mx-auto mt-5 max-w-[46ch] text-[15px] leading-[1.7] text-[color:var(--ink-muted)]">
                  Start free. Bring your enquiries in and let {product.name} show you what to answer first.
                </p>
                <div className="mt-8 flex justify-center">
                  <Button href={product.ctaHref} variant="primary">
                    {product.ctaLabel}
                    <ArrowRight />
                  </Button>
                </div>
              </div>
            </Reveal>
          </Container>
        </Section>
      </main>

      <Footer />
    </>
  );
}
