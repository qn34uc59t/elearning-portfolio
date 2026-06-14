"use client";

import BrandMark from "@/components/layout/BrandMark";
import styles from "./ContactSection.module.css";

function ArrowIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20 90 L90 20 M90 20 H35 M90 20 V75"
        stroke="currentColor"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ContactSection() {
  return (
    <section className={styles.section} data-section="contact">
      <div className={styles.arrows} aria-hidden="true">
        <ArrowIcon className={`${styles.arrow} ${styles.arrowBottomRight}`} />
        <ArrowIcon className={`${styles.arrow} ${styles.arrowTopLeft}`} />
        <ArrowIcon className={`${styles.arrow} ${styles.arrowTopCenter}`} />
      </div>

      <a className={styles.email} href="mailto:hello@nvzhn.com">
        hello@nvzhn.com
      </a>

      <footer className={styles.footer}>
        <BrandMark variant="dark" />
      </footer>
    </section>
  );
}
