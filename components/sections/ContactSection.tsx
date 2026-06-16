import BrandMark from "@/components/layout/BrandMark";
import { Hero } from "@/components/ui/tailwind-css-background-snippet";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  return (
    <section className={styles.section} data-section="contact">
      <Hero className="absolute inset-0 h-full" aria-hidden="true" />
      <div className={styles.content}>
        <p className={styles.label}>Contact me at</p>
        <a className={styles.email} href="mailto:hello@nvzhn.com">
          hello@nvzhn.com
        </a>
        <p className={styles.meta}>📍 Vancouver, BC, Canada</p>
      </div>

      <footer className={styles.footer}>
        <BrandMark variant="dark" />
      </footer>
    </section>
  );
}
