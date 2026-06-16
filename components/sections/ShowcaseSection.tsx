"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import LivePreviewModal from "@/components/LivePreviewModal";
import { GradientBackground4 } from "@/components/ui/gradient-background-4";
import { usePortfolioTransition } from "@/context/PortfolioTransitionContext";
import {
  SHOWCASE_PROJECTS,
  SHOWCASE_PROJECT_COUNT,
} from "@/data/showcaseProjects";
import styles from "./ShowcaseSection.module.css";

gsap.registerPlugin(useGSAP);

const SLIDE_DURATION = 1.2;
const SLIDE_EASE = "power4.inOut";

type ShowcaseSectionProps = {
  projectIndex: number;
  isActive: boolean;
  onSlideComplete?: () => void;
};

function getPanelWidth(track: HTMLDivElement) {
  const firstPanel = track.children[0] as HTMLElement | undefined;
  return firstPanel?.offsetWidth ?? window.innerWidth;
}

function resetParallax(track: HTMLDivElement) {
  gsap.set(track.querySelectorAll("[data-parallax]"), { x: 0, clearProps: "transform" });
}

export default function ShowcaseSection({
  projectIndex,
  isActive,
  onSlideComplete,
}: ShowcaseSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prevIndexRef = useRef(projectIndex);
  const hasEnteredRef = useRef(false);
  const animatingRef = useRef(false);

  const router = useRouter();
  const { leaveSection } = usePortfolioTransition();
  const counterLabel = `${String(projectIndex + 1).padStart(2, "0")}/${String(SHOWCASE_PROJECT_COUNT).padStart(2, "0")}`;
  const [preview, setPreview] = useState<{ url: string; title: string } | null>(
    null
  );

  const navigateToCaseStudy = (href: string) => {
    leaveSection("showcase", () => {
      router.push(href);
    });
  };

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const track = trackRef.current;
        const counter = containerRef.current?.querySelector(
          "[data-showcase-counter]"
        );

        if (!track) return;

        const slideTo = (fromIndex: number, toIndex: number, animate: boolean) => {
          const panelWidth = getPanelWidth(track);
          const x = -toIndex * panelWidth;

          if (!animate) {
            gsap.killTweensOf([track, counter]);
            gsap.set(track, { x });
            resetParallax(track);
            if (counter) gsap.set(counter, { opacity: 0.3 });
            return;
          }

          animatingRef.current = true;

          const direction = Math.sign(toIndex - fromIndex) || 1;
          const fromPanel = track.children[fromIndex] as HTMLElement | undefined;
          const toPanel = track.children[toIndex] as HTMLElement | undefined;
          const fromImage = fromPanel?.querySelector('[data-parallax="image"]');
          const toImage = toPanel?.querySelector('[data-parallax="image"]');
          const toInfo = toPanel?.querySelector('[data-parallax="info"]');

          gsap.killTweensOf([track, fromImage, toImage, toInfo, counter].filter(Boolean));

          const tl = gsap.timeline({
            defaults: { ease: SLIDE_EASE, force3D: true },
            onComplete: () => {
              resetParallax(track);
              if (counter) gsap.set(counter, { opacity: 0.3 });
              animatingRef.current = false;
              onSlideComplete?.();
            },
          });

          tl.to(
            track,
            {
              x,
              duration: SLIDE_DURATION,
            },
            0
          );

          if (fromImage) {
            tl.to(
              fromImage,
              {
                x: direction * -40,
                duration: SLIDE_DURATION,
              },
              0
            );
          }

          if (toImage) {
            tl.fromTo(
              toImage,
              { x: direction * 80 },
              {
                x: 0,
                duration: SLIDE_DURATION,
              },
              0
            );
          }

          if (toInfo) {
            tl.fromTo(
              toInfo,
              { x: direction * 56 },
              {
                x: 0,
                duration: SLIDE_DURATION,
              },
              0
            );
          }

          if (counter) {
            tl.to(
              counter,
              { opacity: 0.12, duration: SLIDE_DURATION * 0.3, ease: "power2.out" },
              0
            ).to(
              counter,
              { opacity: 0.3, duration: SLIDE_DURATION * 0.5, ease: "power2.inOut" },
              SLIDE_DURATION * 0.42
            );
          }
        };

        if (!isActive) {
          hasEnteredRef.current = false;
          animatingRef.current = false;
          prevIndexRef.current = projectIndex;
          slideTo(projectIndex, projectIndex, false);
          return;
        }

        if (!hasEnteredRef.current) {
          hasEnteredRef.current = true;
          prevIndexRef.current = projectIndex;
          slideTo(projectIndex, projectIndex, false);
          return;
        }

        if (projectIndex === prevIndexRef.current || animatingRef.current) {
          return;
        }

        const fromIndex = prevIndexRef.current;
        prevIndexRef.current = projectIndex;

        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) {
          slideTo(fromIndex, projectIndex, false);
          onSlideComplete?.();
          return;
        }

        slideTo(fromIndex, projectIndex, true);
      }, containerRef);

      return () => {
        animatingRef.current = false;
        ctx.revert();
      };
    },
    {
      scope: containerRef,
      dependencies: [projectIndex, isActive, onSlideComplete],
    }
  );

  return (
    <section
      ref={containerRef}
      className={styles.section}
      aria-hidden={!isActive}
      data-section="showcase"
    >
      <GradientBackground4 position="top" />
      <div
        className={styles.counter}
        data-showcase-counter
        aria-live="polite"
      >
        {counterLabel}
      </div>

      <div className={styles.viewport}>
        <div ref={trackRef} className={styles.track}>
          {SHOWCASE_PROJECTS.map((project) => (
            <article key={project.id} className={styles.panel}>
              <div
                className={styles.imageWrap}
                data-parallax="image"
                aria-hidden="true"
              >
                {project.media?.type === "video" ? (
                  <video
                    className={styles.media}
                    src={project.media.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                  />
                ) : project.media?.type === "image" ? (
                  <img
                    className={styles.media}
                    src={project.media.src}
                    alt={project.media.alt ?? ""}
                  />
                ) : null}
              </div>

              <div className={styles.info} data-parallax="info">
                <h2 className={styles.projectTitle}>{project.title}</h2>
                <p className={styles.projectDescription}>
                  {project.description}
                </p>
                {(project.caseStudyHref || project.livePreviewUrl) && (
                  <div className={styles.actions}>
                    {project.caseStudyHref && (
                      <Link
                        href={project.caseStudyHref}
                        className={styles.actionLink}
                        onClick={(event) => {
                          event.preventDefault();
                          navigateToCaseStudy(project.caseStudyHref!);
                        }}
                      >
                        Case Study <span aria-hidden="true">→</span>
                      </Link>
                    )}
                    {project.livePreviewUrl && (
                      <button
                        type="button"
                        className={styles.actionButton}
                        onClick={() =>
                          setPreview({
                            url: project.livePreviewUrl!,
                            title: project.title,
                          })
                        }
                      >
                        Live Preview <span aria-hidden="true">↗</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.sectionLabel} aria-hidden="true">
        Case studies
      </div>

      <LivePreviewModal
        url={preview?.url ?? null}
        title={preview?.title}
        onClose={() => setPreview(null)}
      />
    </section>
  );
}
