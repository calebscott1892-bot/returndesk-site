import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { EASE } from './primitives.jsx';

/**
 * Fixed bottom-right "back to top" button.
 * Appears after ~600px of scroll. Smooth-scrolls to top (instant when the
 * user prefers reduced motion). Accent-styled to match the C4 family look.
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={toTop}
          aria-label="Scroll back to top"
          className="fixed bottom-6 right-6 z-50 inline-grid h-12 w-12 place-items-center rounded-full bg-accent text-[color:var(--accent-ink)] shadow-[var(--shadow-card)] transition-[filter,transform] hover:-translate-y-px hover:brightness-[1.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]"
          initial={reduce ? false : { opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.28, ease: EASE }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
