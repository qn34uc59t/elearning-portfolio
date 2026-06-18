import type { ProjectCaseStudy as ProjectCaseStudyData } from "@/data/projects/instructional-video-for-managers";
import BrandMark from "@/components/layout/BrandMark";
import LinkArrow from "@/components/ui/LinkArrow";
import ProjectLivePreviewTrigger from "@/components/projects/ProjectLivePreviewTrigger";
import ProjectsPageShell from "@/components/projects/ProjectsPageShell";
import { getAdjacentProjects } from "@/lib/projects";
import { navIdToPortfolioHref } from "@/lib/portfolioNavigation";
import Link from "next/link";
import styles from "./GogoTeflCaseStudy.module.css";

type GogoTeflCaseStudyProps = {
  project: ProjectCaseStudyData;
};

const PROJECT_FACTS: { label: string; value: string }[] = [
  { label: "Format", value: "8-hour on-camera series" },
  { label: "Course", value: "120-hour TEFL certification" },
  { label: "Core content", value: "Text, quizzes, assignments, tests" },
  { label: "Platform", value: "Custom build on Supabase" },
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

function CaseStudyVideo({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return (
    <video
      className={className}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
    />
  );
}

export default function GogoTeflCaseStudy({ project }: GogoTeflCaseStudyProps) {
  const adjacent = getAdjacentProjects(project.slug);
  const titleLines = project.titleLines ?? [project.title];

  return (
    <ProjectsPageShell showcaseIndex={project.showcaseIndex} headerVariant="dark">
      <article className={styles.page}>
        {/* ── Hero (matches project 2) ── */}
        <header className={`${styles.hero} ${styles.heroDark}`}>
          <div className={`${styles.heroInner} ${styles.heroInnerNoMedia}`}>
            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>Case Study</p>
              <h1 className={styles.title}>
                {titleLines.map((line) => (
                  <span key={line} className={styles.titleLine}>
                    {line}
                  </span>
                ))}
              </h1>
              <p className={styles.tagline}>{project.tagline}</p>
            </div>
          </div>
        </header>

        <section className={styles.section}>
          <SectionHead label="Overview" />
          <div className={styles.leadGrid}>
            <p className={styles.lead}>{project.about[0]}</p>
            <p className={styles.leadSecondary}>{project.about[1]}</p>
          </div>
        </section>

        {/* ── Figure 01 ── */}
        <figure className={styles.figure}>
          {project.media.type === "video" ? (
            <CaseStudyVideo
              className={styles.figureImg}
              src={project.media.src}
            />
          ) : (
            <img
              className={styles.figureImg}
              src={project.media.src}
              alt={project.media.alt ?? ""}
            />
          )}
        </figure>

        <section className={styles.section}>
          <SectionHead label="The Brief" />
          <div className={styles.briefGrid}>
            <aside className={styles.colophon}>
              <dl className={styles.creditList}>
                {PROJECT_FACTS.map((fact) => (
                  <div key={fact.label} className={styles.creditRow}>
                    <dt className={styles.creditLabel}>{fact.label}</dt>
                    <dd className={styles.creditValue}>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>

            <div className={styles.briefBody}>
              <div className={styles.briefBlock}>
                <h2 className={styles.briefTitle}>Who it&apos;s for</h2>
                <p className={styles.briefText}>{project.audience}</p>
              </div>
              <div className={styles.briefBlock}>
                <h2 className={styles.briefTitle}>The challenge</h2>
                <p className={styles.briefText}>{project.challenge}</p>
              </div>
            </div>
          </div>
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

        {/* ── Figure pair ── */}
        <div className={styles.figurePair}>
          <figure className={styles.figurePairItem}>
            <CaseStudyVideo
              className={styles.figSquare}
              src="/assets/1_vid.mp4"
            />
          </figure>
          <figure className={styles.figurePairItem}>
            <CaseStudyVideo
              className={styles.figSquare}
              src="/assets/1.2_vid.mp4"
            />
          </figure>
        </div>

        <section className={styles.section}>
          <SectionHead label="Highlights" />
          <ul className={styles.notesGrid}>
            {project.highlights.map((highlight) => (
              <li key={highlight.title} className={styles.note}>
                <h3 className={styles.noteTitle}>{highlight.title}</h3>
                <p className={styles.noteText}>{highlight.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Tools ── */}
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

        {/* ── Footer ── */}
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
