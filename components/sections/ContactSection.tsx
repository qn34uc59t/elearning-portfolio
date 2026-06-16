import BrandMark from "@/components/layout/BrandMark";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  return (
    <section className={styles.section} data-section="contact">
      <div data-section-content>
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
      </div>
    </section>
  );
}
