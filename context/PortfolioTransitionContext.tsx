"use client";

import { createContext, useContext } from "react";
import type { SectionId } from "@/lib/portfolioNavigation";

type PortfolioTransitionContextValue = {
  leaveSection: (section: SectionId, onComplete: () => void) => void;
};

export const PortfolioTransitionContext =
  createContext<PortfolioTransitionContextValue | null>(null);

export function usePortfolioTransition() {
  const context = useContext(PortfolioTransitionContext);

  if (!context) {
    throw new Error(
      "usePortfolioTransition must be used within PortfolioExperience"
    );
  }

  return context;
}
