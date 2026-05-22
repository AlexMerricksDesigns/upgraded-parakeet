/**
 * Smooth scroll to a section by id (respects reduced motion).
 */

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

/**
 * @param {string} sectionId — element id without #
 * @param {number} [offsetPx=120] — space above target (e.g. sticky header)
 */
export function scrollToSection(sectionId, offsetPx = 120) {
  const el = document.getElementById(sectionId);
  if (!el) return;

  const target =
    el.getBoundingClientRect().top + window.scrollY - offsetPx;

  window.scrollTo({
    top: Math.max(0, target),
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
}
