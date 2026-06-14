"use client";

import BrandMark from "@/components/layout/BrandMark";
import { NAV_ITEMS } from "@/lib/portfolioNavigation";
import { usePortfolioNavigation } from "@/context/PortfolioNavigationContext";
import styles from "./SiteHeader.module.css";

type SiteHeaderProps = {
  variant?: "light" | "dark";
  persistent?: boolean;
};

export default function SiteHeader({
  variant = "light",
  persistent = false,
}: SiteHeaderProps) {
  const { activeNavId, goToNav } = usePortfolioNavigation();

  return (
    <header
      className={`${styles.header} ${variant === "dark" ? styles.headerDark : ""} ${persistent ? styles.headerPersistent : ""}`}
    >
      <BrandMark variant={variant} />

      <nav className={styles.nav} aria-label="Primary">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`${styles.navLink} ${activeNavId === item.id ? styles.navLinkActive : ""}`}
            aria-current={activeNavId === item.id ? "page" : undefined}
            onClick={(event) => {
              event.preventDefault();
              goToNav(item.id);
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
