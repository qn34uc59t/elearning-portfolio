"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import WorkflowToolsContent from "@/components/sections/WorkflowToolsContent";
import { WORKFLOW_STEPS } from "@/data/workflowSteps";
import styles from "./WorkflowSection.module.css";

gsap.registerPlugin(useGSAP);

const STEP_FADE_OUT = 0.35;
const STEP_FADE_IN = 0.5;
const PROGRESS_DURATION = 0.65;

export type WorkflowView = "steps" | "tools";

type WorkflowSectionProps = {
  view: WorkflowView;
  stepIndex: number;
  isActive: boolean;
  onTransitionComplete?: () => void;
};

export default function WorkflowSection({
  view,
  stepIndex,
  isActive,
  onTransitionComplete,
}: WorkflowSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [renderedStep, setRenderedStep] = useState(stepIndex);
  const [renderedView, setRenderedView] = useState<WorkflowView>(view);
  const hasEnteredRef = useRef(false);
  const prevStepIndexRef = useRef(stepIndex);
  const prevViewRef = useRef<WorkflowView>(view);
  const animatingRef = useRef(false);
  const step = WORKFLOW_STEPS[renderedStep];

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        if (!isActive) {
          hasEnteredRef.current = false;
          animatingRef.current = false;
          prevStepIndexRef.current = stepIndex;
          prevViewRef.current = view;
          setRenderedStep(stepIndex);
          setRenderedView(view);
          return;
        }

        const stepContent = containerRef.current?.querySelector(
          "[data-step-content]"
        );
        const toolsContent = containerRef.current?.querySelector(
          "[data-tools-content]"
        );
        const progressTrack = containerRef.current?.querySelector(
          "[data-progress-track]"
        );
        const progressFill = containerRef.current?.querySelector(
          "[data-progress-fill]"
        );

        if (!stepContent || !toolsContent || !progressTrack || !progressFill) {
          return;
        }

        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

        const showStepsPanel = (visible: boolean) => {
          gsap.set(stepContent, {
            display: visible ? "block" : "none",
            opacity: visible ? 1 : 0,
            y: 0,
          });
        };

        const showToolsPanel = (visible: boolean) => {
          gsap.set(toolsContent, {
            display: visible ? "grid" : "none",
            opacity: visible ? 1 : 0,
            y: 0,
          });
        };

        const setProgressVisible = (visible: boolean) => {
          gsap.set(progressTrack, { opacity: visible ? 1 : 0 });
        };

        const finish = () => {
          animatingRef.current = false;
          onTransitionComplete?.();
        };

        const revealStepContent = (
          content: Element,
          onDone: () => void
        ) => {
          if (prefersReducedMotion) {
            gsap.set(content, { opacity: 1, y: 0 });
            onDone();
            return;
          }

          gsap.killTweensOf(content);
          gsap.fromTo(
            content,
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: STEP_FADE_IN,
              ease: "power3.out",
              onComplete: onDone,
            }
          );
        };

        const animateStepChange = () => {
          const nextStep = WORKFLOW_STEPS[stepIndex];

          gsap.killTweensOf([stepContent, progressFill]);

          gsap.to(progressFill, {
            width: `${nextStep.progress}%`,
            duration: PROGRESS_DURATION,
            ease: "power2.inOut",
          });

          gsap.to(stepContent, {
            opacity: 0,
            y: -12,
            duration: STEP_FADE_OUT,
            ease: "power2.inOut",
            onComplete: () => {
              setRenderedStep(stepIndex);

              requestAnimationFrame(() => {
                const updatedContent = containerRef.current?.querySelector(
                  "[data-step-content]"
                );

                if (!updatedContent) {
                  finish();
                  return;
                }

                revealStepContent(updatedContent, finish);
              });
            },
          });
        };

        const revealPanel = (
          panel: Element,
          onDone: () => void,
          staggerColumns = false
        ) => {
          if (prefersReducedMotion) {
            gsap.set(panel, { opacity: 1, y: 0 });
            onDone();
            return;
          }

          gsap.killTweensOf(panel);
          gsap.set(panel, { opacity: 0, y: 16 });

          if (staggerColumns) {
            const columns = panel.querySelectorAll("[data-tool-column]");
            gsap.set(columns, { opacity: 0, y: 20 });
            gsap
              .timeline({ onComplete: onDone })
              .to(panel, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" })
              .to(
                columns,
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.55,
                  stagger: 0.12,
                  ease: "power3.out",
                },
                "-=0.2"
              );
            return;
          }

          gsap.to(panel, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            onComplete: onDone,
          });
        };

        if (!hasEnteredRef.current) {
          hasEnteredRef.current = true;
          prevStepIndexRef.current = stepIndex;
          prevViewRef.current = view;
          setRenderedStep(stepIndex);
          setRenderedView(view);

          const currentStep = WORKFLOW_STEPS[stepIndex];

          if (view === "tools") {
            showStepsPanel(false);
            showToolsPanel(true);
            setProgressVisible(false);
            revealPanel(toolsContent, finish, true);
            return;
          }

          showStepsPanel(true);
          showToolsPanel(false);
          setProgressVisible(true);

          if (prefersReducedMotion) {
            gsap.set(progressFill, { width: `${currentStep.progress}%` });
            finish();
            return;
          }

          gsap.killTweensOf([stepContent, progressFill]);
          gsap.set(progressFill, { width: "0%" });
          gsap.set(stepContent, { opacity: 0, y: 20 });

          gsap
            .timeline({ onComplete: finish, defaults: { ease: "power3.out" } })
            .to(stepContent, { opacity: 1, y: 0, duration: PROGRESS_DURATION }, 0)
            .to(
              progressFill,
              {
                width: `${currentStep.progress}%`,
                duration: PROGRESS_DURATION,
                ease: "power2.inOut",
              },
              0
            );

          return;
        }

        const viewChanged = view !== prevViewRef.current;
        const stepChanged = stepIndex !== prevStepIndexRef.current;

        if ((!viewChanged && !stepChanged) || animatingRef.current) {
          return;
        }

        animatingRef.current = true;
        prevStepIndexRef.current = stepIndex;
        prevViewRef.current = view;

        if (!viewChanged && stepChanged && view === "steps") {
          if (prefersReducedMotion) {
            setRenderedStep(stepIndex);
            gsap.set(progressFill, {
              width: `${WORKFLOW_STEPS[stepIndex].progress}%`,
            });
            gsap.set(stepContent, { opacity: 1, y: 0 });
            finish();
            return;
          }

          animateStepChange();
          return;
        }

        const outgoing =
          renderedView === "tools" ? toolsContent : stepContent;
        const nextStep = WORKFLOW_STEPS[stepIndex];

        const completeSwap = () => {
          setRenderedStep(stepIndex);
          setRenderedView(view);

          requestAnimationFrame(() => {
            const updatedIncoming =
              view === "tools"
                ? containerRef.current?.querySelector("[data-tools-content]")
                : containerRef.current?.querySelector("[data-step-content]");
            const updatedFill = containerRef.current?.querySelector(
              "[data-progress-fill]"
            );
            const updatedTrack = containerRef.current?.querySelector(
              "[data-progress-track]"
            );

            if (!updatedIncoming || !updatedFill || !updatedTrack) {
              finish();
              return;
            }

            gsap.set(updatedIncoming, {
              display: view === "tools" ? "grid" : "block",
            });

            if (view === "tools") {
              gsap.to(updatedTrack, {
                opacity: 0,
                duration: STEP_FADE_OUT,
                ease: "power2.inOut",
              });
              revealPanel(updatedIncoming, finish, true);
              return;
            }

            gsap.set(updatedTrack, { opacity: 1 });
            gsap.killTweensOf([updatedFill, updatedIncoming]);

            if (prefersReducedMotion) {
              gsap.set(updatedFill, { width: `${nextStep.progress}%` });
              gsap.set(updatedIncoming, { opacity: 1, y: 0 });
              finish();
              return;
            }

            gsap
              .timeline({ onComplete: finish })
              .to(
                updatedFill,
                {
                  width: `${nextStep.progress}%`,
                  duration: PROGRESS_DURATION,
                  ease: "power2.inOut",
                },
                0
              )
              .fromTo(
                updatedIncoming,
                { opacity: 0, y: 16 },
                {
                  opacity: 1,
                  y: 0,
                  duration: STEP_FADE_IN,
                  ease: "power3.out",
                },
                0
              );
          });
        };

        if (prefersReducedMotion) {
          gsap.set(outgoing, { display: "none", opacity: 0 });
          completeSwap();
          return;
        }

        gsap.killTweensOf(outgoing);
        if (view === "tools" && renderedView === "steps") {
          gsap.to(progressTrack, {
            opacity: 0,
            duration: STEP_FADE_OUT,
            ease: "power2.inOut",
          });
        }

        gsap.to(outgoing, {
          opacity: 0,
          y: -12,
          duration: STEP_FADE_OUT,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.set(outgoing, { display: "none" });
            completeSwap();
          },
        });
      }, containerRef);

      return () => {
        animatingRef.current = false;
        ctx.revert();
      };
    },
    {
      scope: containerRef,
      dependencies: [view, stepIndex, isActive, onTransitionComplete],
    }
  );

  return (
    <section
      ref={containerRef}
      className={`${styles.section} ${view === "tools" ? styles.sectionDark : ""}`}
      aria-hidden={!isActive}
      data-section="workflow"
    >
      <div className={styles.stepContent} data-step-content>
        {step && (
          <>
            <h2 className={styles.stepTitle}>{step.title}</h2>
            <p className={styles.stepDescription}>{step.description}</p>
          </>
        )}
      </div>

      <WorkflowToolsContent />

      <div className={styles.progressTrack} data-progress-track aria-hidden="true">
        <div className={styles.progressFill} data-progress-fill />
      </div>

      <div
        className={`${styles.sectionLabel} ${view === "tools" ? styles.labelToolsActive : styles.labelStepsActive}`}
        aria-hidden="true"
      >
        <span className={styles.labelWorkflow}>Workflow</span>
        <span className={styles.labelConnector}> &amp; </span>
        <span className={styles.labelTools}>Tools</span>
      </div>
    </section>
  );
}
