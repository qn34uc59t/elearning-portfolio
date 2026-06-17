"use client";

import Image from "next/image";
import Link from "next/link";
import { useOptionalPortfolioNavigation } from "@/context/PortfolioNavigationContext";
import { navIdToPortfolioHref } from "@/lib/portfolioNavigation";
import styles from "./BrandMark.module.css";

type BrandMarkProps = {
  variant?: "light" | "dark";
  linkToAbout?: boolean;
};

export default function BrandMark({
  variant = "light",
  linkToAbout = true,
}: BrandMarkProps) {
  const navigation = useOptionalPortfolioNavigation();
  const href = navIdToPortfolioHref("about");
  const className = `${styles.brand} ${variant === "dark" ? styles.brandDark : styles.brandLight}`;

  const content = (
    <>
      <Image
        src={variant === "dark" ? "/logo_nvzhn-light.png" : "/logo_nvzhn.png"}
        alt="Illia Neviezhyn"
        width={56}
        height={56}
        className={styles.logo}
        priority
      />
      <div className={styles.text}>
        <p className={styles.name}>Illia Neviezhyn</p>
        <p className={styles.title}>
          <span>Learning Content Developer &amp;</span>
          <span>Instructional Designer</span>
        </p>
      </div>
    </>
  );

  if (!linkToAbout) {
    return <div className={className}>{content}</div>;
  }

  if (navigation) {
    return (
      <a
        href={href}
        className={`${className} ${styles.brandLink}`}
        onClick={(event) => {
          event.preventDefault();
          navigation.goToNav("about");
        }}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={`${className} ${styles.brandLink}`}>
      {content}
    </Link>
  );
}
