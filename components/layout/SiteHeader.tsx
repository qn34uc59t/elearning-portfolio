"use client";

import { useCallback, useEffect, useState } from "react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    if (!persistent) return;

    const onScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [persistent]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeMenu, isMenuOpen]);

  const handleNavClick = (id: (typeof NAV_ITEMS)[number]["id"]) => {
    closeMenu();
    goToNav(id);
  };

  const handleCvClick = () => {
    closeMenu();
    setIsCvModalOpen(true);
  };

  return (
    <header
      className={`${styles.header} ${variant === "dark" ? styles.headerDark : ""} ${persistent ? styles.headerPersistent : ""} ${isScrolled ? styles.headerScrolled : ""}`}
    >
      <div className={styles.headerBar}>
        <BrandMark variant={variant} />

        <button
          type="button"
          className={styles.menuToggle}
          aria-expanded={isMenuOpen}
          aria-controls="site-mobile-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className={styles.menuToggleBar} />
          <span className={styles.menuToggleBar} />
          <span className={styles.menuToggleBar} />
        </button>
      </div>

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

      <div
        className={`${styles.menuBackdrop} ${isMenuOpen ? styles.menuBackdropVisible : ""}`}
        aria-hidden="true"
        onClick={closeMenu}
      />

      <nav
        id="site-mobile-menu"
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ""}`}
        aria-label="Mobile"
        aria-hidden={!isMenuOpen}
      >
        <ul className={styles.mobileMenuList}>
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`${styles.mobileMenuLink} ${activeNavId === item.id ? styles.mobileMenuLinkActive : ""}`}
                aria-current={activeNavId === item.id ? "page" : undefined}
                tabIndex={isMenuOpen ? 0 : -1}
                onClick={(event) => {
                  event.preventDefault();
                  handleNavClick(item.id);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={styles.mobileMenuCv}
          tabIndex={isMenuOpen ? 0 : -1}
          onClick={handleCvClick}
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
