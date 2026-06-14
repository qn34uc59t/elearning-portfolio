import Image from "next/image";
import styles from "./BrandMark.module.css";

type BrandMarkProps = {
  variant?: "light" | "dark";
};

export default function BrandMark({ variant = "light" }: BrandMarkProps) {
  return (
    <div
      className={`${styles.brand} ${variant === "dark" ? styles.brandDark : styles.brandLight}`}
    >
      <Image
        src="/logo_black.png"
        alt="Illia Neviezhyn"
        width={56}
        height={56}
        className={`${styles.logo} ${variant === "dark" ? styles.logoInverted : ""}`}
        priority
      />
      <div className={styles.text}>
        <p className={styles.name}>Illia Neviezhyn</p>
        <p className={styles.title}>
          <span>Learning Content Developer &amp;</span>
          <span>Instructional Designer</span>
        </p>
      </div>
    </div>
  );
}
