import type { ProjectCaseStudy as ProjectCaseStudyData } from "@/data/projects/instructional-video-for-managers";
import BrandMark from "@/components/layout/BrandMark";
import ProjectLivePreviewTrigger from "@/components/projects/ProjectLivePreviewTrigger";
import ProjectsPageShell from "@/components/projects/ProjectsPageShell";
import { getAdjacentProjects } from "@/lib/projects";
import { navIdToPortfolioHref } from "@/lib/portfolioNavigation";
import Link from "next/link";
import styles from "./TechnicalTroubleshootingCaseStudy.module.css";

type TechnicalTroubleshootingCaseStudyProps = {
  project: ProjectCaseStudyData;
};

const SPECS: { label: string; value: string }[] = [
  { label: "Audience", value: "Online educators" },
  { label: "Format", value: "Troubleshooting guide" },
  { label: "Delivery", value: "Self-paced module" },
];

function SectionHead({ label, dark }: { label: string; dark?: boolean }) {
  return (
    <h2 className={`${styles.sectionHead} ${dark ? styles.sectionHeadDark : ""}`}>
      {label}
    </h2>
  );
}

export default function TechnicalTroubleshootingCaseStudy({
  project,
}: TechnicalTroubleshootingCaseStudyProps) {
  const adjacent = getAdjacentProjects(project.slug);
  const titleLines = project.titleLines ?? [project.title];

  return (
    <ProjectsPageShell showcaseIndex={project.showcaseIndex} headerVariant="dark">
      <article className={styles.page}>
        <header className={`${styles.hero} ${styles.heroDark}`}>
          <div className={`${styles.heroInner} ${styles.heroInnerNoMedia}`}>
            <p className={styles.eyebrow}>Case Study</p>
            <h1 className={styles.title}>
              {titleLines.map((line) => (
                <span key={line} className={styles.titleLine}>
                  {line}
                </span>
              ))}
            </h1>
            <p className={styles.tagline}>{project.tagline}</p>
            <ProjectLivePreviewTrigger
              url={project.livePreviewUrl}
              title={project.title}
              className={styles.livePreview}
            />
          </div>
        </header>

        <dl className={styles.specs}>
          {SPECS.map((spec) => (
            <div key={spec.label} className={styles.spec}>
              <dt className={styles.specLabel}>{spec.label}</dt>
              <dd className={styles.specValue}>{spec.value}</dd>
            </div>
          ))}
        </dl>

        <section className={styles.intro}>
          <div className={styles.introText}>
            {project.about.map((paragraph, index) => (
              <p
                key={paragraph}
                className={
                  index === 0 ? styles.proseParagraph : styles.proseParagraphSecondary
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          <figure className={styles.introMedia}>
            <img
              className={styles.introImg}
              src={project.media.src}
              alt={project.media.type === "image" ? project.media.alt ?? "" : ""}
            />
          </figure>
        </section>

        <section className={styles.section}>
          <SectionHead label="Brief" />
          <div className={styles.briefGrid}>
            <div className={styles.briefBlock}>
              <h3 className={styles.briefTitle}>Who it&apos;s for</h3>
              <p className={styles.briefText}>{project.audience}</p>
            </div>
            <div className={styles.briefBlock}>
              <h3 className={styles.briefTitle}>Challenge</h3>
              <p className={styles.briefText}>{project.challenge}</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <SectionHead label="Features" />
          <ul className={styles.featureList}>
            {project.highlights.map((item) => (
              <li key={item.title} className={styles.feature}>
                <h3 className={styles.featureTitle}>{item.title}</h3>
                <p className={styles.featureText}>{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <SectionHead label="Process" />
          <ol className={styles.processList}>
            {project.process.map((step) => (
              <li key={step.step} className={styles.processRow}>
                <h3 className={styles.processTitle}>{step.title}</h3>
                <p className={styles.processBody}>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.toolsBar}>
          <span className={styles.toolsLabel}>Tools</span>
          <ul className={styles.toolsRow}>
            {project.tools.map((tool) => (
              <li key={tool.name} className={styles.tool}>
                <img
                  src={tool.icon}
                  alt=""
                  className={`${styles.toolIcon} ${tool.wide ? styles.toolIconWide : ""}`}
                />
                <span className={styles.toolName}>{tool.name}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.closing}>
          <SectionHead label="Result" dark />
          <p className={styles.closingText}>{project.result[0]}</p>
        </section>

        <footer className={styles.footer}>
          {adjacent?.previous ? (
            <Link
              href={`/projects/${adjacent.previous.slug}`}
              className={`${styles.footerNav} ${styles.footerNavPrev}`}
            >
              <span className={styles.footerArrow} aria-hidden="true">
                ←
              </span>
              Previous project
            </Link>
          ) : (
            <Link
              href={navIdToPortfolioHref("showcase", project.showcaseIndex)}
              className={`${styles.footerNav} ${styles.footerNavPrev}`}
            >
              <span className={styles.footerArrow} aria-hidden="true">
                ←
              </span>
              Go back
            </Link>
          )}

          <div className={styles.footerBrand}>
            <BrandMark variant="dark" />
          </div>

          {adjacent?.next ? (
            <Link
              href={`/projects/${adjacent.next.slug}`}
              className={`${styles.footerNav} ${styles.footerNavNext}`}
            >
              Next project
              <span className={styles.footerArrow} aria-hidden="true">
                →
              </span>
            </Link>
          ) : (
            <span className={styles.footerNavSpacer} aria-hidden="true" />
          )}
        </footer>
      </article>
    </ProjectsPageShell>
  );
}
