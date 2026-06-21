import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CornerBrackets, EASE } from './primitives.jsx';

/**
 * ReturnDesk hero visual — an editorial "blueprint" of the priority queue,
 * in the C4 engineering-drawing style: hairline borders, monospace labels,
 * minimal radius, accent used sparingly. Light, not a dark neon window.
 */
const ITEMS = [
  { score: '94', band: 'HIGH', from: 'Sarah M.', subj: 'Quote — full bathroom reno', why: 'Quote intent · ready to book', top: true },
  { score: '71', band: 'MED', from: 'James T.', subj: 'Re: availability next week?', why: 'Booking · existing customer' },
  { score: '23', band: 'LOW', from: 'Trade Weekly', subj: 'Newsletter: plumbing tips', why: 'Promotional · low intent', muted: true },
];

export default function ProductMock() {
  const reduce = useReducedMotion();
  const rise = (delay) =>
    reduce ? {} : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay, ease: EASE } };

  return (
    <div className="relative">
      <motion.div {...rise(0.1)} className="relative rounded-[3px] border border-line bg-card" style={{ boxShadow: '0 24px 60px -34px rgba(26,26,26,0.28)' }}>
        <CornerBrackets inset={10} size={16} />

        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <span className="mono inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-ink-subtle">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            ReturnDesk · Priority queue
          </span>
          <span className="mono hidden text-[9px] uppercase tracking-[0.2em] text-ink-faint sm:inline">Sheet · RD-01</span>
        </div>

        <div className="space-y-2 p-4">
          {ITEMS.map((it, i) => (
            <motion.div
              key={it.from}
              {...rise(0.2 + i * 0.1)}
              className={`flex items-start gap-3 rounded-[3px] border p-3 ${
                it.top ? 'border-accent-line bg-[color:var(--accent-soft)]' : 'border-line bg-bg-alt'
              } ${it.muted ? 'opacity-60' : ''}`}
            >
              <span className={`flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-[3px] border ${it.top ? 'border-accent-line text-accent' : 'border-line text-ink-subtle'}`}>
                <span className="mono text-[13px] font-semibold tabular-nums leading-none">{it.score}</span>
                <span className="mono mt-0.5 text-[7px] font-medium uppercase tracking-[0.1em] opacity-80">{it.band}</span>
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-[13px] font-semibold text-ink">{it.from}</span>
                  <span className="mono shrink-0 text-[9px] uppercase tracking-[0.1em] text-ink-faint">{i === 0 ? '2m' : i === 1 ? '14m' : '1h'}</span>
                </div>
                <p className="truncate text-[12px] text-ink-muted">{it.subj}</p>
                <p className="mono mt-1 truncate text-[10px] uppercase tracking-[0.08em] text-ink-subtle">
                  <span className="text-accent">Why</span> · {it.why}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...rise(0.5)} className="grid grid-cols-3 border-t border-line">
          <Stat n="18" label="Enquiries" />
          <Stat n="5" label="High" divider />
          <Stat n="12m" label="To zero" divider />
        </motion.div>
      </motion.div>
    </div>
  );
}

function Stat({ n, label, divider }) {
  return (
    <div className={`px-4 py-4 ${divider ? 'border-l border-line' : ''}`}>
      <div className="text-[22px] font-semibold tabular-nums tracking-[-0.02em] text-ink">{n}</div>
      <div className="mono mt-1 text-[9px] uppercase tracking-[0.18em] text-ink-faint">{label}</div>
    </div>
  );
}
