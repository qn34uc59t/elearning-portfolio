"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { useGSAP } from "@gsap/react";
import HeroSection from "@/components/sections/HeroSection";
import ContactSection from "@/components/sections/ContactSection";
import ShowcaseSection from "@/components/sections/ShowcaseSection";
import WorkflowSection from "@/components/sections/WorkflowSection";
import SiteHeader from "@/components/layout/SiteHeader";
import { PortfolioNavigationContext } from "@/context/PortfolioNavigationContext";
import { PortfolioTransitionContext } from "@/context/PortfolioTransitionContext";
import { SHOWCASE_PROJECT_COUNT } from "@/data/showcaseProjects";
import { WORKFLOW_STEPS } from "@/data/workflowSteps";
import {
  INITIAL_VIEW,
  isSameView,
  headerVariantFromView,
  navIdFromView,
  navIdToView,
  parseHash,
  viewToHash,
  type NavId,
  type SectionId,
  type ViewState,
} from "@/lib/portfolioNavigation";
import {
  consumePortfolioEnterSection,
  runSectionFadeIn,
  runSectionFadeOut,
} from "@/lib/sectionTransition";
import styles from "./PortfolioExperience.module.css";

gsap.registerPlugin(Observer, useGSAP);

const NAV_COOLDOWN_MS = 1200;

function getSectionContentElement(
  container: HTMLDivElement | null,
  section: SectionId
) {
  return container?.querySelector(
    `[data-section="${section}"] [data-section-content]`
  );
}

function setLayerVisibility(
  container: HTMLDivElement | null,
  activeSection: SectionId,
  revealActive = false
) {
  (["hero", "showcase", "workflow", "contact"] as const).forEach((section) => {
    const content = getSectionContentElement(container, section);
    if (!content) return;

    if (section === activeSection) {
      if (revealActive) {
        gsap.set(content, { opacity: 1 });
      }
      return;
    }

    gsap.set(content, { opacity: 0 });
  });
}

export default function PortfolioExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<Observer | null>(null);
  const [view, setView] = useState<ViewState>(INITIAL_VIEW);
  const isTransitioningRef = useRef(false);
  const skipHashSyncRef = useRef(true);
  const lastNavTimeRef = useRef(0);
  const viewRef = useRef(view);
  const pendingEnterFadeRef = useRef<SectionId | null>(null);
  viewRef.current = view;

  const canNavigate = useCallback((force = false) => {
    if (force) return true;
    if (isTransitioningRef.current) return false;
    if (Date.now() - lastNavTimeRef.current < NAV_COOLDOWN_MS) return false;
    return true;
  }, []);

  const beginNavigation = useCallback(() => {
    isTransitioningRef.current = true;
    lastNavTimeRef.current = Date.now();
    observerRef.current?.disable();
  }, []);

  const endNavigation = useCallback(() => {
    isTransitioningRef.current = false;
    observerRef.current?.enable();
  }, []);

  const transitionSection = useCallback(
    (next: ViewState, force = false) => {
      if (!canNavigate(force)) return false;

      const current = viewRef.current;
      if (isSameView(current, next)) return false;

      beginNavigation();

      const outgoing = getSectionContentElement(
        containerRef.current,
        current.section
      );

      if (!outgoing) {
        endNavigation();
        return false;
      }

      runSectionFadeOut(outgoing, () => {
        viewRef.current = next;
        setView(next);

        requestAnimationFrame(() => {
          const incoming = getSectionContentElement(
            containerRef.current,
            next.section
          );

          if (!incoming) {
            endNavigation();
            return;
          }

          gsap.set(incoming, { opacity: 0 });
          runSectionFadeIn(incoming, () => {
            if (next.section !== "workflow") {
              endNavigation();
            }
          });
        });
      });

      return true;
    },
    [beginNavigation, canNavigate, endNavigation]
  );

  const changeWorkflow = useCallback(
    (next: Pick<ViewState, "workflowView" | "workflowStep">, force = false) => {
      if (!canNavigate(force)) return false;

      const current = viewRef.current;
      if (current.section !== "workflow") return false;

      const nextView: ViewState = {
        section: "workflow",
        workflowView: next.workflowView,
        workflowStep: next.workflowStep,
        showcaseProject: current.showcaseProject,
      };

      if (isSameView(current, nextView)) return false;

      beginNavigation();
      viewRef.current = nextView;
      setView(nextView);
      return true;
    },
    [beginNavigation, canNavigate]
  );

  const changeShowcaseProject = useCallback(
    (nextProject: number, force = false) => {
      if (!canNavigate(force)) return false;

      const current = viewRef.current;
      if (current.section !== "showcase") return false;
      if (current.showcaseProject === nextProject) return false;

      beginNavigation();
      viewRef.current = {
        ...current,
        showcaseProject: nextProject,
      };
      setView(viewRef.current);
      return true;
    },
    [beginNavigation, canNavigate]
  );

  const goToView = useCallback(
    (target: ViewState, force = false) => {
      const current = viewRef.current;
      if (isSameView(current, target)) return;

      if (force && isTransitioningRef.current) {
        const sections = containerRef.current?.querySelectorAll(
          "[data-section-content]"
        );
        if (sections?.length) {
          gsap.killTweensOf(sections);
        }
        endNavigation();
      }

      if (current.section === target.section) {
        if (target.section === "workflow") {
          changeWorkflow(
            {
              workflowView: target.workflowView,
              workflowStep: target.workflowStep,
            },
            force
          );
          return;
        }

        if (target.section === "showcase") {
          changeShowcaseProject(target.showcaseProject, force);
        }
        return;
      }

      transitionSection(target, force);
    },
    [changeShowcaseProject, changeWorkflow, endNavigation, transitionSection]
  );

  const goToNav = useCallback(
    (id: NavId) => {
      goToView(navIdToView(id), true);
    },
    [goToView]
  );

  const leaveSection = useCallback(
    (section: SectionId, onComplete: () => void) => {
      const current = viewRef.current;
      if (current.section !== section) {
        onComplete();
        return;
      }

      const outgoing = getSectionContentElement(
        containerRef.current,
        section
      );
      if (!outgoing) {
        onComplete();
        return;
      }

      beginNavigation();
      runSectionFadeOut(outgoing, () => {
        endNavigation();
        onComplete();
      });
    },
    [beginNavigation, endNavigation]
  );

  const navigate = useCallback(
    (direction: 1 | -1) => {
      const current = viewRef.current;

      if (direction === 1) {
        if (current.section === "hero") {
          transitionSection({
            section: "showcase",
            workflowView: "steps",
            workflowStep: 0,
            showcaseProject: 0,
          });
          return;
        }

        if (current.section === "showcase") {
          if (current.showcaseProject < SHOWCASE_PROJECT_COUNT - 1) {
            changeShowcaseProject(current.showcaseProject + 1);
            return;
          }

          transitionSection({
            section: "workflow",
            workflowView: "steps",
            workflowStep: 0,
            showcaseProject: SHOWCASE_PROJECT_COUNT - 1,
          });
          return;
        }

        if (current.section === "workflow") {
          if (current.workflowView === "steps") {
            if (current.workflowStep < WORKFLOW_STEPS.length - 1) {
              changeWorkflow({
                workflowView: "steps",
                workflowStep: current.workflowStep + 1,
              });
              return;
            }

            changeWorkflow({
              workflowView: "tools",
              workflowStep: WORKFLOW_STEPS.length - 1,
            });
            return;
          }

          transitionSection({
            section: "contact",
            workflowView: "tools",
            workflowStep: WORKFLOW_STEPS.length - 1,
            showcaseProject: SHOWCASE_PROJECT_COUNT - 1,
          });
          return;
        }

        return;
      }

      if (current.section === "contact") {
        transitionSection({
          section: "workflow",
          workflowView: "tools",
          workflowStep: WORKFLOW_STEPS.length - 1,
          showcaseProject: SHOWCASE_PROJECT_COUNT - 1,
        });
        return;
      }

      if (current.section === "workflow") {
        if (current.workflowView === "tools") {
          changeWorkflow({
            workflowView: "steps",
            workflowStep: WORKFLOW_STEPS.length - 1,
          });
          return;
        }

        if (current.workflowStep > 0) {
          changeWorkflow({
            workflowView: "steps",
            workflowStep: current.workflowStep - 1,
          });
          return;
        }

        transitionSection({
          section: "showcase",
          workflowView: "steps",
          workflowStep: 0,
          showcaseProject: SHOWCASE_PROJECT_COUNT - 1,
        });
        return;
      }

      if (current.section === "showcase") {
        if (current.showcaseProject > 0) {
          changeShowcaseProject(current.showcaseProject - 1);
          return;
        }

        transitionSection({
          ...INITIAL_VIEW,
          section: "hero",
        });
      }
    },
    [transitionSection, changeWorkflow, changeShowcaseProject]
  );

  useLayoutEffect(() => {
    const restored = parseHash(window.location.hash);
    const enterSection = consumePortfolioEnterSection();

    viewRef.current = restored;
    setView(restored);
    const willEnterFade =
      enterSection &&
      enterSection === restored.section &&
      (enterSection === "hero" ||
        enterSection === "showcase" ||
        enterSection === "workflow" ||
        enterSection === "contact");

    setLayerVisibility(containerRef.current, restored.section, !willEnterFade);

    if (willEnterFade) {
      pendingEnterFadeRef.current = enterSection;
      const incoming = getSectionContentElement(
        containerRef.current,
        enterSection
      );
      if (incoming) {
        gsap.set(incoming, { opacity: 0 });
      }
    }
  }, []);

  useEffect(() => {
    if (!pendingEnterFadeRef.current) return;

    const section = pendingEnterFadeRef.current;
    pendingEnterFadeRef.current = null;

    const incoming = getSectionContentElement(containerRef.current, section);
    runSectionFadeIn(incoming);
  }, []);

  useLayoutEffect(() => {
    if (skipHashSyncRef.current) return;
    setLayerVisibility(containerRef.current, view.section);
  }, [view.section]);

  useEffect(() => {
    if (skipHashSyncRef.current) {
      skipHashSyncRef.current = false;
      return;
    }

    const nextHash = viewToHash(view);
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, "", nextHash);
    }
  }, [view]);

  useEffect(() => {
    const onHashChange = () => {
      if (isTransitioningRef.current) return;
      goToView(parseHash(window.location.hash));
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [goToView]);

  useEffect(() => {
    const blockNativeScroll = (event: WheelEvent) => {
      if (document.documentElement.dataset.projectPage) return;
      event.preventDefault();
    };

    document.addEventListener("wheel", blockNativeScroll, {
      passive: false,
      capture: true,
    });
    return () =>
      document.removeEventListener("wheel", blockNativeScroll, { capture: true });
  }, []);

  useGSAP(
    () => {
      const observer = Observer.create({
        target: containerRef.current,
        type: "wheel,touch",
        wheelSpeed: 1,
        tolerance: 40,
        preventDefault: true,
        debounce: true,
        onDown: () => navigate(1),
        onUp: () => navigate(-1),
      });

      observerRef.current = observer;

      return () => {
        observer.kill();
        observerRef.current = null;
      };
    },
    { scope: containerRef, dependencies: [navigate] }
  );

  const navigationValue = useMemo(
    () => ({
      activeNavId: navIdFromView(view),
      goToNav,
    }),
    [view, goToNav]
  );

  const transitionValue = useMemo(
    () => ({
      leaveSection,
    }),
    [leaveSection]
  );

  const headerVariant = headerVariantFromView(view);

  return (
    <PortfolioNavigationContext.Provider value={navigationValue}>
      <PortfolioTransitionContext.Provider value={transitionValue}>
      <div ref={containerRef} className={styles.experience}>
        <SiteHeader variant={headerVariant} persistent />

        <div
          className={`${styles.layer} ${view.section === "hero" ? styles.layerActive : ""}`}
          style={{ opacity: view.section === "hero" ? 1 : undefined }}
        >
          <HeroSection />
        </div>

        <div
          className={`${styles.layer} ${view.section === "showcase" ? styles.layerActive : ""}`}
          style={{ opacity: view.section === "showcase" ? 1 : undefined }}
        >
          <ShowcaseSection
            projectIndex={view.showcaseProject}
            isActive={view.section === "showcase"}
            onSlideComplete={endNavigation}
          />
        </div>

        <div
          className={`${styles.layer} ${view.section === "workflow" ? styles.layerActive : ""}`}
          style={{ opacity: view.section === "workflow" ? 1 : undefined }}
        >
          <WorkflowSection
            view={view.workflowView}
            stepIndex={view.workflowStep}
            isActive={view.section === "workflow"}
            onTransitionComplete={endNavigation}
          />
        </div>

        <div
          className={`${styles.layer} ${view.section === "contact" ? styles.layerActive : ""}`}
          style={{ opacity: view.section === "contact" ? 1 : undefined }}
        >
          <ContactSection />
        </div>
      </div>
      </PortfolioTransitionContext.Provider>
    </PortfolioNavigationContext.Provider>
  );
}
