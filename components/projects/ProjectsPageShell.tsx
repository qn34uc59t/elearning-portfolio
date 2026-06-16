"use client";

import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SiteHeader from "@/components/layout/SiteHeader";
import { PortfolioNavigationContext } from "@/context/PortfolioNavigationContext";
import {
  markPortfolioEnterSection,
  runSectionFadeIn,
  runSectionFadeOut,
} from "@/lib/sectionTransition";
import {
  navIdToPortfolioHref,
  navIdToView,
  type NavId,
} from "@/lib/portfolioNavigation";

gsap.registerPlugin(useGSAP);

type ProjectsPageShellProps = {
  showcaseIndex: number;
  headerVariant?: "light" | "dark";
  children: ReactNode;
};

export default function ProjectsPageShell({
  showcaseIndex,
  headerVariant = "light",
  children,
}: ProjectsPageShellProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    document.documentElement.dataset.projectPage = "true";

    return () => {
      delete document.documentElement.dataset.projectPage;
    };
  }, []);

  useLayoutEffect(() => {
    if (contentRef.current) {
      gsap.set(contentRef.current, { opacity: 0 });
    }
  }, []);

  useGSAP(
    () => {
      runSectionFadeIn(contentRef.current);
    },
    { scope: contentRef }
  );

  const exitToPortfolio = useCallback(
    (href: string, enterSection?: string) => {
      runSectionFadeOut(contentRef.current, () => {
        if (enterSection) {
          markPortfolioEnterSection(enterSection);
        }
        window.location.assign(href);
      });
    },
    []
  );

  const goToNav = useCallback(
    (id: NavId) => {
      const view = navIdToView(id);
      if (id === "showcase") {
        view.showcaseProject = showcaseIndex;
      }

      exitToPortfolio(
        navIdToPortfolioHref(id, id === "showcase" ? showcaseIndex : undefined),
        view.section
      );
    },
    [exitToPortfolio, showcaseIndex]
  );

  const navigationValue = useMemo(
    () => ({
      activeNavId: "showcase" as const,
      goToNav,
    }),
    [goToNav]
  );

  return (
    <PortfolioNavigationContext.Provider value={navigationValue}>
      <SiteHeader variant={headerVariant} persistent />
      <div ref={contentRef}>{children}</div>
    </PortfolioNavigationContext.Provider>
  );
}
