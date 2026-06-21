import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, EASE } from './primitives.jsx';

/**
 * Crafted in-product mockup of ReturnDesk — a priority inbox that scores each
 * enquiry, explains why, and offers a one-click templated reply. C4 dark language
 * with ReturnDesk's azure accent. (Swap for a real suite-app screenshot later.)
 */
const ENQUIRIES = [
  {
    score: 94,
    band: 'High',
    from: 'Sarah M.',
    subject: 'Quote — full bathroom renovation',
    reason: 'Quote intent · ready to book · high value',
    top: true,
  },
  {
    score: 71,
    band: 'Med',
    from: 'James T.',
    subject: 'Re: availability next week?',
    reason: 'Booking · existing customer',
  },
  {
    score: 23,
    band: 'Low',
    from: 'Trade Weekly',
    subject: 'Newsletter: 10 plumbing tips',
    reason: 'Promotional · low intent',
    muted: true,
  },
];

export default function ProductMock() {
  const reduce = useReducedMotion();
  const rise = (delay) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay, ease: EASE } };

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] opacity-60 blur-3xl"
        style={{ background: 'radial-gradient(60% 60% at 70% 20%, var(--accent-glow), transparent 70%)' }}
      />

      <motion.div
        {...rise(0.05)}
        className="overflow-hidden rounded-2xl border border-line bg-card shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]"
      >
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-line bg-white/[0.02] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-xs font-medium text-ink-subtle">ReturnDesk · Priority inbox</span>
          <span className="ml-auto rounded-full bg-accent-soft px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
            Beta
          </span>
        </div>

        {/* Sort header */}
        <div className="flex items-center justify-between border-b border-line px-4 py-2.5 text-[11px] text-ink-faint">
          <span>3 of 18 enquiries</span>
          <span className="inline-flex items-center gap-1.5 text-accent">
            <SortIcon /> Sorted by priority
          </span>
        </div>

        {/* Enquiry list */}
        <div className="space-y-2 p-3">
          {ENQUIRIES.map((e, i) => (
            <motion.div
              key={e.from}
              {...rise(0.18 + i * 0.12)}
              className={`rounded-xl border p-3 ${
                e.top ? 'border-accent-line bg-accent-soft' : 'border-line bg-bg-alt'
              } ${e.muted ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start gap-3">
                <ScoreChip score={e.score} band={e.band} muted={e.muted} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-[13px] font-semibold text-ink">{e.from}</span>
                    <span className="shrink-0 text-[10px] text-ink-faint">{i === 0 ? '2m' : i === 1 ? '14m' : '1h'}</span>
                  </div>
                  <p className="truncate text-[12px] text-ink-muted">{e.subject}</p>
                  <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-ink-subtle">
                    <span className="text-accent">Why:</span> {e.reason}
                  </p>
                </div>
              </div>
              {e.top && (
                <div className="mt-3 flex items-center gap-2 border-t border-accent-line/60 pt-3">
                  <button
                    type="button"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-[12px] font-semibold text-[color:var(--accent-ink)]"
                  >
                    <Check className="h-3 w-3" /> Send quote
                  </button>
                  <span className="rounded-lg border border-line px-3 py-1.5 text-[12px] text-ink-muted">Book a call</span>
                  <span className="ml-auto text-[11px] text-ink-faint">1-click templates</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Stat strip */}
        <motion.div
          {...rise(0.62)}
          className="grid grid-cols-3 divide-x divide-line border-t border-line bg-white/[0.015] text-center"
        >
          <Stat value="18" label="enquiries" />
          <Stat value="5" label="high-priority" />
          <Stat value="12m" label="to inbox-zero" />
        </motion.div>
      </motion.div>
    </div>
  );
}

function ScoreChip({ score, band, muted }) {
  return (
    <span
      className={`flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-lg border ${
        muted ? 'border-line text-ink-faint' : 'border-accent-line bg-bg text-accent'
      }`}
    >
      <span className="text-sm font-bold leading-none">{score}</span>
      <span className="mt-0.5 text-[8px] font-semibold uppercase tracking-wider opacity-80">{band}</span>
    </span>
  );
}

function Stat({ value, label }) {
  return (
    <div className="px-2 py-3">
      <div className="text-base font-bold text-ink">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-ink-faint">{label}</div>
    </div>
  );
}

function SortIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 4v16M7 20l-3-3M7 4l3 3" />
      <path d="M13 6h7M13 12h5M13 18h3" />
    </svg>
  );
}
