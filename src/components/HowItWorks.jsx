import React from 'react';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';
import { product, content } from '../data/product.js';
import { Container, Section, Eyebrow, Reveal, EASE } from './primitives.jsx';

/*
 * Animated "How it works" — a self-running, three-act product demo.
 *
 * The three steps below are authored verbatim from product.howItWorks (copy
 * source of truth), each paired with a bespoke azure-accent mini-visual that
 * acts out the step:
 *   1. Capture every inbound — calls/emails/forms drop into one queue.
 *   2. Auto-scored by urgency — each item earns an explainable score + chips.
 *   3. Call back first — work the queue top-down; the urgent one resolves.
 *
 * Behaviour: renders meaningful content server-side (all steps + first panel),
 * auto-advances once scrolled into view (with a clickable stepper + progress
 * bar), and fully respects prefers-reduced-motion (no auto-advance, the visual
 * shows its resolved state). Matches PriorityStack's craft: premium, not flashy.
 */

const STEP_MS = 4200;

// Visual data, kept beside the panels so copy stays sourced from product.js.
const INBOUND = [
  { label: 'Missed call — tooth pain', meta: 'Call · just now', icon: 'call' },
  { label: 'Quote — clinic fit-out', meta: 'Email · 6h ago', icon: 'mail' },
  { label: 'Booking change', meta: 'Web form · 1h ago', icon: 'form' },
];

const SCORED = {
  label: 'Quote — clinic fit-out',
  score: 92,
  chips: ['Missed call', 'Waiting 6h', 'Complaint', '$4,200 value'],
};

const QUEUE = [
  { label: 'Quote — clinic fit-out', score: 92, tag: 'Critical' },
  { label: 'Invoice dispute', score: 78, tag: 'High' },
  { label: 'Reschedule request', score: 41, tag: 'Normal' },
];

function ChannelIcon({ name, size = 14 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };
  if (name === 'call')
    return (
      <svg {...common}>
        <path d="M5 4h4l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z" />
      </svg>
    );
  if (name === 'mail')
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    );
  return (
    <svg {...common}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  );
}

/* ── Step 1 visual: inbound items dropping into one queue ───────────────── */
function CaptureVisual({ active, reduce }) {
  return (
    <div role="img" aria-label="Calls, emails and form submissions landing in a single inbox.">
      <div className="mb-3 flex items-center gap-2">
        <span className="mono text-[9.5px] uppercase tracking-[0.16em] text-ink-faint">Inbound</span>
        <span className="h-px flex-1 bg-line" />
        <span className="mono text-[9.5px] uppercase tracking-[0.16em] text-accent">One queue</span>
      </div>
      <div className="space-y-2.5">
        {INBOUND.map((r, i) => (
          <motion.div
            key={r.label}
            className="flex items-center gap-3 rounded-xl border border-line bg-bg px-3.5 py-3"
            initial={reduce ? false : { opacity: 0, x: 18 }}
            animate={
              reduce || !active ? { opacity: 1, x: 0 } : { opacity: [0, 1], x: [18, 0] }
            }
            transition={{ duration: 0.5, delay: active && !reduce ? 0.15 + i * 0.45 : 0, ease: EASE }}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <ChannelIcon name={r.icon} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[12.5px] font-medium leading-tight text-ink">{r.label}</p>
              <p className="mono mt-1 text-[9px] uppercase tracking-[0.12em] text-ink-faint">{r.meta}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Step 2 visual: one item scored, reason chips revealing one by one ───── */
function ScoreVisual({ active, reduce }) {
  return (
    <div role="img" aria-label="An enquiry scored 92 out of 100, with the reasons shown as chips.">
      <div className="rounded-xl border border-line bg-bg p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="truncate text-[13px] font-medium text-ink">{SCORED.label}</p>
          <div className="flex items-baseline gap-1">
            <motion.span
              className="mono text-[22px] font-semibold tabular-nums leading-none text-accent"
              initial={reduce ? false : { opacity: 0 }}
              animate={reduce || !active ? { opacity: 1 } : { opacity: [0, 1] }}
              transition={{ duration: 0.4, delay: active && !reduce ? 0.2 : 0 }}
            >
              {SCORED.score}
            </motion.span>
            <span className="mono text-[10px] font-medium text-ink-faint">/100</span>
          </div>
        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-full" style={{ background: 'var(--bg-alt)' }}>
          <motion.span
            className="block h-full rounded-full bg-accent"
            initial={reduce ? false : { width: '0%' }}
            animate={reduce || !active ? { width: `${SCORED.score}%` } : { width: ['0%', `${SCORED.score}%`] }}
            transition={{ duration: 0.9, delay: active && !reduce ? 0.2 : 0, ease: EASE }}
          />
        </div>

        <p className="mono mt-4 mb-2 text-[9px] uppercase tracking-[0.16em] text-ink-faint">Why it ranks high</p>
        <div className="flex flex-wrap gap-1.5">
          {SCORED.chips.map((c, i) => (
            <motion.span
              key={c}
              className="inline-flex items-center gap-1.5 rounded-full border border-accent-line bg-accent-soft px-2.5 py-1 text-[10.5px] font-medium text-accent"
              initial={reduce ? false : { opacity: 0, y: 6, scale: 0.96 }}
              animate={
                reduce || !active
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: [0, 1], y: [6, 0], scale: [0.96, 1] }
              }
              transition={{ duration: 0.34, delay: active && !reduce ? 0.5 + i * 0.28 : 0, ease: EASE }}
            >
              <span className="h-1 w-1 rounded-full bg-accent" />
              {c}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Step 3 visual: working the queue top-down; top item resolves ────────── */
function ResolveVisual({ active, reduce }) {
  const SUCCESS = '#1f9d57';
  return (
    <div role="img" aria-label="Working the priority queue from the top — the most urgent enquiry is called back first.">
      <div className="space-y-2.5">
        {QUEUE.map((r, i) => {
          const isTop = i === 0;
          return (
            <motion.div
              key={r.label}
              className="relative flex items-center gap-3 overflow-hidden rounded-xl border px-3.5 py-3"
              style={{
                borderColor: isTop ? 'var(--accent-line)' : 'var(--border)',
                background: isTop ? 'var(--accent-soft)' : 'var(--bg)',
              }}
              initial={false}
              animate={
                reduce || !active || !isTop
                  ? { y: 0 }
                  : { y: [0, -2, 0] }
              }
              transition={{ duration: 0.6, delay: active && !reduce ? 0.2 : 0, ease: EASE }}
            >
              {isTop && !reduce && active && (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-[3px]"
                  style={{ background: 'var(--accent)' }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.4, delay: 0.2, ease: EASE }}
                />
              )}
              <span
                className="mono w-7 shrink-0 text-[11px] font-semibold tabular-nums"
                style={{ color: isTop ? 'var(--accent)' : 'var(--text-faint)' }}
              >
                {r.score}
              </span>
              <p className="min-w-0 flex-1 truncate text-[12.5px] font-medium text-ink">{r.label}</p>

              {isTop ? (
                <AnimatePresence mode="wait" initial={false}>
                  {!reduce && active ? (
                    <motion.span
                      key="called"
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]"
                      style={{ color: SUCCESS, background: 'color-mix(in srgb, ' + SUCCESS + ' 12%, transparent)' }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35, delay: 1.1, ease: EASE }}
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={SUCCESS} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      Called back
                    </motion.span>
                  ) : (
                    <span
                      key="next"
                      className="mono inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-accent"
                      style={{ background: 'color-mix(in srgb, var(--accent) 12%, transparent)' }}
                    >
                      Call first
                    </span>
                  )}
                </AnimatePresence>
              ) : (
                <span className="mono shrink-0 text-[9px] uppercase tracking-[0.12em] text-ink-faint">{r.tag}</span>
              )}
            </motion.div>
          );
        })}
      </div>
      <p className="mono mt-3 text-center text-[9px] uppercase tracking-[0.16em] text-ink-faint">
        Nothing urgent slips
      </p>
    </div>
  );
}

const VISUALS = [CaptureVisual, ScoreVisual, ResolveVisual];
const HEADINGS = ['Capture every inbound', 'Auto-scored by urgency', 'Call back first'];

export default function HowItWorks() {
  const reduce = useReducedMotion();
  const steps = product.howItWorks;
  const [active, setActive] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const rootRef = React.useRef(null);
  const inView = useInView(rootRef, { once: false, margin: '0px 0px -25% 0px' });

  // Start the self-running sequence only once the section is on screen.
  React.useEffect(() => {
    if (inView && !reduce) setRunning(true);
  }, [inView, reduce]);

  React.useEffect(() => {
    if (!running || reduce) return undefined;
    const t = setTimeout(() => setActive((a) => (a + 1) % steps.length), STEP_MS);
    return () => clearTimeout(t);
  }, [active, running, reduce, steps.length]);

  const handleStep = (i) => {
    setRunning(false); // user takes over; stop auto-advance
    setActive(i);
  };

  const Visual = VISUALS[active] || VISUALS[0];

  return (
    <Section id="how" className="border-b border-line">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-6 text-[clamp(1.8rem,3.4vw,2.7rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-ink">
            {content.howHeadline}
          </h2>
          <p className="mt-5 max-w-[52ch] text-[16px] leading-[1.75] text-ink-muted">{content.howSub}</p>
        </Reveal>

        <div ref={rootRef} className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,460px)] lg:gap-16">
          {/* Stepper + copy (server-rendered: all steps present) */}
          <div>
            <ol className="space-y-3">
              {steps.map((s, i) => {
                const isActive = i === active;
                return (
                  <li key={s.step}>
                    <button
                      type="button"
                      onClick={() => handleStep(i)}
                      aria-current={isActive ? 'step' : undefined}
                      className="group relative flex w-full gap-4 rounded-2xl border p-5 text-left transition-colors duration-300"
                      style={{
                        borderColor: isActive ? 'var(--accent-line)' : 'var(--border)',
                        background: isActive ? 'var(--accent-soft)' : 'transparent',
                      }}
                    >
                      <span
                        className="mono mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold tabular-nums transition-colors duration-300"
                        style={{
                          borderColor: isActive ? 'var(--accent)' : 'var(--border)',
                          color: isActive ? 'var(--accent)' : 'var(--text-faint)',
                          background: isActive ? 'var(--card)' : 'transparent',
                        }}
                      >
                        {s.step}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-[16px] font-semibold tracking-[-0.015em] text-ink">
                          {HEADINGS[i]}
                        </h3>
                        <p className="mt-1.5 text-[14px] leading-[1.65] text-ink-muted">{s.body}</p>

                        {/* per-step progress bar (only under the active step while running) */}
                        {isActive && (
                          <div className="mt-3.5 h-[3px] overflow-hidden rounded-full" style={{ background: 'var(--bg-alt)' }}>
                            {running && !reduce ? (
                              <motion.span
                                key={active}
                                className="block h-full rounded-full bg-accent"
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: STEP_MS / 1000, ease: 'linear' }}
                              />
                            ) : (
                              <span className="block h-full w-full rounded-full bg-accent" />
                            )}
                          </div>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Live demo panel */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-5 -z-10 rounded-[26px] opacity-70"
                style={{ background: 'radial-gradient(60% 55% at 70% 25%, var(--accent-soft), transparent 70%)' }}
              />
              <div className="card overflow-hidden p-0" style={{ boxShadow: 'var(--shadow-panel)' }}>
                <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
                  <span className="mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-ink-subtle">
                    {HEADINGS[active]}
                  </span>
                  <span className="mono text-[9.5px] uppercase tracking-[0.16em] text-ink-faint">
                    Step {steps[active].step} / {String(steps.length).padStart(2, '0')}
                  </span>
                </div>

                <div className="p-5">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={active}
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0, y: -8 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <Visual active={running || reduce} reduce={reduce} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* dot progress indicator */}
              <div className="mt-5 flex items-center justify-center gap-2" aria-hidden="true">
                {steps.map((s, i) => (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => handleStep(i)}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: i === active ? 22 : 6,
                      background: i === active ? 'var(--accent)' : 'var(--border)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
