import type { ProjectCaseStudy as ProjectCaseStudyData } from "@/data/projects/instructional-video-for-managers";
import BrandMark from "@/components/layout/BrandMark";
import LinkArrow from "@/components/ui/LinkArrow";
import ProjectLivePreviewTrigger from "@/components/projects/ProjectLivePreviewTrigger";
import ProjectAssignmentTrigger from "@/components/projects/ProjectAssignmentTrigger";
import ProjectsPageShell from "@/components/projects/ProjectsPageShell";
import { getAdjacentProjects } from "@/lib/projects";
import { navIdToPortfolioHref } from "@/lib/portfolioNavigation";
import Link from "next/link";
import styles from "./HandHygieneCaseStudy.module.css";

type HandHygieneCaseStudyProps = {
  project: ProjectCaseStudyData;
};

const SPECS: { label: string; value: string }[] = [
  { label: "Duration", value: "3 minutes" },
  { label: "Client", value: "HSO · Accreditation Canada" },
  { label: "Format", value: "Microlearning module" },
];

function SectionHead({ label, dark }: { label: string; dark?: boolean }) {
  return (
    <h2 className={`${styles.sectionHead} ${dark ? styles.sectionHeadDark : ""}`}>
      {label}
    </h2>
  );
}

function SectionMarker({
  index,
  label,
  className,
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <p className={`${styles.sectionMarker} ${className ?? ""}`}>
      <span className={styles.markerIndex}>{index}</span>
      <span className={styles.markerLabel}>{label}</span>
    </p>
  );
}

export default function HandHygieneCaseStudy({ project }: HandHygieneCaseStudyProps) {
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
            <div className={styles.heroActions}>
              {project.livePreviewUrl ? (
                <ProjectLivePreviewTrigger
                  url={project.livePreviewUrl}
                  title={project.title}
                  className={styles.livePreview}
                />
              ) : null}
              {project.assignmentPdfUrl ? (
                <ProjectAssignmentTrigger
                  url={project.assignmentPdfUrl}
                  className={styles.livePreview}
                />
              ) : null}
            </div>
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
              <h3 className={styles.briefTitle}>Audience</h3>
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

        <div className={styles.figurePair}>
          <figure className={styles.figurePairItem}>
            <img
              className={styles.figSquare}
              src="/assets/prjct5_1.png"
              alt=""
            />
          </figure>
          <figure className={styles.figurePairItem}>
            <img
              className={styles.figWide}
              src="/assets/prjct5_3.png"
              alt=""
            />
          </figure>
        </div>

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

        <section className={styles.toolsSection}>
          <SectionMarker index="04" label="Tools" />

          <ul className={styles.toolsGrid}>
            {project.tools.map((tool) => (
              <li key={tool.name} className={styles.toolItem}>
                <div className={styles.toolIconWrap}>
                  <img
                    src={tool.icon}
                    alt=""
                    className={`${styles.toolIcon} ${tool.wide ? styles.toolIconWide : ""}`}
                  />
                </div>
                <span className={styles.toolName}>{tool.name}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.closing}>
          <SectionHead label="Result" dark />
          <p className={styles.closingText}>{project.result[0]}</p>
          {project.livePreviewUrl ? (
            <div className={styles.resultActions}>
              <ProjectLivePreviewTrigger
                url={project.livePreviewUrl}
                title={project.title}
                className={styles.livePreview}
              />
            </div>
          ) : null}
        </section>

        <footer className={styles.footer}>
          {adjacent?.previous ? (
            <Link
              href={`/projects/${adjacent.previous.slug}`}
              className={`${styles.footerNav} ${styles.footerNavPrev}`}
            >
              <LinkArrow direction="back" size="large" />
              Previous project
            </Link>
          ) : (
            <Link
              href={navIdToPortfolioHref("showcase", project.showcaseIndex)}
              className={`${styles.footerNav} ${styles.footerNavPrev}`}
            >
              <LinkArrow direction="back" size="large" />
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
              <LinkArrow size="large" />
            </Link>
          ) : (
            <span className={styles.footerNavSpacer} aria-hidden="true" />
          )}
        </footer>
      </article>
    </ProjectsPageShell>
  );
}
