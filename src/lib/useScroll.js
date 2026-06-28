import { useEffect, useState } from 'react';

/**
 * Returns true once the page is scrolled past `threshold` px.
 * Used to condense the sticky header. SSR-safe (starts false).
 */
export function useScrolledPast(threshold = 40) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return past;
}

/**
 * Scroll-spy: returns the id of the section currently in view.
 * Observes the elements matching `ids` via IntersectionObserver and reports the
 * top-most intersecting one. SSR-safe (starts empty). Honours the natural reading
 * order; no animation, so reduced-motion is unaffected.
 */
export function useScrollSpy(ids = [], { rootMargin = '-45% 0px -50% 0px' } = {}) {
  const [active, setActive] = useState('');
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return;

    const visible = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
          else visible.delete(entry.target.id);
        }
        if (visible.size) {
          // Pick the section nearest the top of the viewport.
          const top = [...visible.entries()].sort((a, b) => a[1] - b[1])[0][0];
          setActive(top);
        }
      },
      { rootMargin, threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [ids.join('|'), rootMargin]);

  return active;
}
