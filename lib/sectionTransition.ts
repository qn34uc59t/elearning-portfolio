import gsap from "gsap";

export const SECTION_FADE_OUT_DURATION = 0.55;
export const SECTION_FADE_IN_DURATION = 0.65;
export const SECTION_FADE_EASE = "power2.inOut";

export const PORTFOLIO_ENTER_SECTION_KEY = "portfolio-enter-section";

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function runSectionFadeOut(
  element: Element | null | undefined,
  onComplete?: () => void
) {
  if (!element || prefersReducedMotion()) {
    onComplete?.();
    return;
  }

  gsap.killTweensOf(element);
  gsap.to(element, {
    opacity: 0,
    duration: SECTION_FADE_OUT_DURATION,
    ease: SECTION_FADE_EASE,
    onComplete,
  });
}

export function runSectionFadeIn(
  element: Element | null | undefined,
  onComplete?: () => void
) {
  if (!element) {
    onComplete?.();
    return;
  }

  gsap.killTweensOf(element);

  if (prefersReducedMotion()) {
    gsap.set(element, { opacity: 1 });
    onComplete?.();
    return;
  }

  gsap.fromTo(
    element,
    { opacity: 0 },
    {
      opacity: 1,
      duration: SECTION_FADE_IN_DURATION,
      ease: SECTION_FADE_EASE,
      onComplete,
    }
  );
}

export function markPortfolioEnterSection(section: string) {
  sessionStorage.setItem(PORTFOLIO_ENTER_SECTION_KEY, section);
}

export function consumePortfolioEnterSection(): string | null {
  const value = sessionStorage.getItem(PORTFOLIO_ENTER_SECTION_KEY);
  if (value) {
    sessionStorage.removeItem(PORTFOLIO_ENTER_SECTION_KEY);
  }
  return value;
}
