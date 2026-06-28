import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CornerBrackets } from './primitives.jsx';

/*
 * The ReturnDesk hero motif, alive.
 * The brand mark is an inbox with an orange arrow; these priority bars echo that orange (boldest = most urgent, fading down). Here that mark
 * becomes a living priority queue: inbound items as horizontal bars whose
 * length is urgency and whose orange intensity is priority. They protrude and
 * rescind in a staggered rhythm — the product's whole job (who to call back
 * first) made visible. Respects prefers-reduced-motion.
 */
const ROWS = [
  { label: 'Tooth pain — can you fit me in?', meta: 'Missed call · 2h', tag: 'Critical', w: 100, c: '#fb4a18', d: 0.0 },
  { label: 'Invoice dispute',                 meta: 'Email · 4h',       tag: 'High',     w: 84,  c: '#f4691f', d: 0.45 },
  { label: 'Quote — clinic fit-out',          meta: '$4,200 · 6h',      tag: 'High',     w: 71,  c: '#f78a4a', d: 0.9 },
  { label: 'Reschedule request',              meta: 'SMS · 1h',         tag: 'Normal',   w: 55,  c: '#f9a877', d: 1.35 },
  { label: 'General enquiry',                 meta: 'Form · 3h',        tag: 'Normal',   w: 41,  c: '#f6c4a6', d: 1.8 },
];

export default function PriorityStack() {
  const reduce = useReducedMotion();

  return (
    <div className="relative">
      {/* soft accent halo behind the panel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px] opacity-70"
        style={{ background: 'radial-gradient(60% 55% at 70% 30%, rgba(251, 74, 24,0.10), transparent 70%)' }}
      />

      <div className="card relative overflow-hidden p-0" style={{ boxShadow: 'var(--shadow-panel)' }}>
        <CornerBrackets inset={9} size={14} />

        {/* panel header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              {!reduce && (
                <motion.span
                  className="absolute inline-flex h-full w-full rounded-full"
                  style={{ background: '#fb4a18' }}
                  animate={{ scale: [1, 2.4], opacity: [0.55, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: '#fb4a18' }} />
            </span>
            <span className="mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-ink-subtle">
              Priority inbox
            </span>
          </div>
          <span className="mono text-[9.5px] uppercase tracking-[0.16em] text-ink-faint">Sorted by urgency</span>
        </div>

        {/* the living queue */}
        <div role="img" aria-label="A priority inbox sorting five inbound customer messages by urgency, most urgent first.">
          {ROWS.map((r) => (
            <div key={r.label} className="flex items-center gap-3.5 border-b border-line/70 px-5 py-[13px] last:border-b-0">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: r.c }} aria-hidden="true" />

              <div className="min-w-0 basis-[40%]">
                <p className="truncate text-[12.5px] font-medium leading-tight text-ink">{r.label}</p>
                <p className="mono mt-1 text-[9px] uppercase tracking-[0.12em] text-ink-faint">{r.meta}</p>
              </div>

              {/* urgency bar — protrudes and rescinds */}
              <div className="h-2.5 flex-1 overflow-hidden rounded-full" style={{ background: 'var(--bg-alt)' }}>
                <motion.span
                  className="block h-full rounded-full"
                  style={{ background: r.c }}
                  initial={{ width: `${r.w}%` }}
                  animate={reduce ? { width: `${r.w}%` } : { width: [`${r.w}%`, `${Math.max(r.w - 15, 14)}%`, `${r.w}%`] }}
                  transition={reduce ? {} : { duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: r.d }}
                />
              </div>

              <span
                className="mono hidden w-[58px] shrink-0 text-right text-[8.5px] font-semibold uppercase tracking-[0.1em] sm:block"
                style={{ color: r.c }}
              >
                {r.tag}
              </span>
            </div>
          ))}
        </div>

        {/* footer — the resolved next action */}
        <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-3" style={{ background: 'color-mix(in srgb, var(--bg-alt) 50%, transparent)' }}>
          <span className="mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">Call back first</span>
          <span className="inline-flex items-center gap-2 text-[12px] font-medium text-ink">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#fb4a18' }} aria-hidden="true" />
            Sarah K.
          </span>
        </div>
      </div>
    </div>
  );
}
