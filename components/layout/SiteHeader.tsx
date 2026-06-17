"use client";

import { useEffect, useState } from "react";
import BrandMark from "@/components/layout/BrandMark";
import LinkArrow from "@/components/ui/LinkArrow";
import RequestCvModal from "@/components/layout/RequestCvModal";
import { NAV_ITEMS } from "@/lib/portfolioNavigation";
import { usePortfolioNavigation } from "@/context/PortfolioNavigationContext";
import styles from "./SiteHeader.module.css";

type SiteHeaderProps = {
  variant?: "light" | "dark";
  persistent?: boolean;
};

const SCROLL_THRESHOLD_PX = 12;

export default function SiteHeader({
  variant = "light",
  persistent = false,
}: SiteHeaderProps) {
  const { activeNavId, goToNav } = usePortfolioNavigation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);

  useEffect(() => {
    if (!persistent) return;

    const onScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [persistent]);

  return (
    <header
      className={`${styles.header} ${variant === "dark" ? styles.headerDark : ""} ${persistent ? styles.headerPersistent : ""} ${isScrolled ? styles.headerScrolled : ""}`}
    >
      <BrandMark variant={variant} />

      <nav className={styles.nav} aria-label="Primary">
        <div className={styles.navLinks}>
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
        </div>

        <button
          type="button"
          className={styles.cvRequest}
          onClick={() => setIsCvModalOpen(true)}
        >
          Request a CV <LinkArrow />
        </button>
      </nav>

      <RequestCvModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
      />
    </header>
  );
}
