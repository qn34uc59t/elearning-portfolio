"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePortfolioNavigation } from "@/context/PortfolioNavigationContext";
import LinkArrow from "@/components/ui/LinkArrow";
import { navIdToPortfolioHref } from "@/lib/portfolioNavigation";
import styles from "./HeroSection.module.css";

gsap.registerPlugin(useGSAP);

const HEADING_WORDS = ["Hey,", "I'm", "Illia", "👋"];

const PARAGRAPH_LINES = [
  "I create high-impact learning content that sticks.",
  "Bridging the gap between business goals and learner success",
  "by crafting engaging materials from initial strategy to final delivery.",
];

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { goToNav } = usePortfolioNavigation();

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set("[data-reveal]", {
          opacity: 1,
          y: 0,
          scale: 1,
          clipPath: "inset(0% 0% 0% 0%)",
        });
        return;
      }

      gsap.set("[data-reveal]", { opacity: 0 });
      gsap.set("[data-motion='slide-up']", { y: 28 });
      gsap.set("[data-motion='slide-down']", { y: -16 });
      gsap.set("[data-motion='clip']", {
        clipPath: "inset(100% 0% 0% 0%)",
        y: 0,
      });
      gsap.set("[data-motion='scale']", { scale: 0.85, y: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.15,
      });

      tl.to(
          "[data-reveal='heading-word']",
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.11 },
          0.15
        )
        .to(
          "[data-reveal='paragraph-line']",
          {
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.85,
            stagger: 0.18,
            ease: "power4.out",
          },
          "-=0.2"
        )
        .to(
          "[data-reveal='section-nav']",
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power4.out",
          },
          "-=0.35"
        )
        .to(
          "[data-reveal='section-label']",
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power4.out",
          },
          "-=0.25"
        );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className={styles.hero} data-section="hero">
      <div data-section-content>
        <div className={styles.heroContent}>
        <h1 className={styles.heading}>
          {HEADING_WORDS.map((word, index) => (
            <span key={word} className={styles.word}>
              <span
                className={styles.wordInner}
                data-reveal="heading-word"
                data-motion="slide-up"
              >
                {word}
                {index < HEADING_WORDS.length - 1 ? "\u00A0" : ""}
              </span>
            </span>
          ))}
        </h1>

        <p className={styles.paragraph}>
          {PARAGRAPH_LINES.map((line) => (
            <span key={line} className={styles.line}>
              <span
                className={styles.lineInner}
                data-reveal="paragraph-line"
                data-motion="clip"
              >
                {line}
              </span>
            </span>
          ))}
        </p>

        <nav
          className={styles.actions}
          data-reveal="section-nav"
          data-motion="slide-up"
          aria-label="Explore the portfolio"
        >
          <a
            href={navIdToPortfolioHref("showcase")}
            className={styles.actionLink}
            onClick={(event) => {
              event.preventDefault();
              goToNav("showcase");
            }}
          >
            Explore my portfolio <LinkArrow />
          </a>
          <a
            href={navIdToPortfolioHref("workflow-and-tools")}
            className={styles.actionLink}
            onClick={(event) => {
              event.preventDefault();
              goToNav("workflow-and-tools");
            }}
          >
            How I work <LinkArrow />
          </a>
        </nav>
      </div>

      <div
        className={styles.sectionLabel}
        data-reveal="section-label"
        data-motion="slide-up"
        aria-hidden="true"
      >
        About
      </div>
      </div>
    </section>
  );
}
