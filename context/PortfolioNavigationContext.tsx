"use client";

import { createContext, useContext } from "react";
import type { NavId } from "@/lib/portfolioNavigation";

type PortfolioNavigationContextValue = {
  activeNavId: NavId;
  goToNav: (id: NavId) => void;
};

export const PortfolioNavigationContext =
  createContext<PortfolioNavigationContextValue | null>(null);

export function usePortfolioNavigation() {
  const context = useContext(PortfolioNavigationContext);

  if (!context) {
    throw new Error(
      "usePortfolioNavigation must be used within PortfolioNavigationProvider"
    );
  }

  return context;
}
