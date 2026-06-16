import type { ProjectCaseStudy as ProjectCaseStudyData } from "@/data/projects/instructional-video-for-managers";
import BrandMark from "@/components/layout/BrandMark";
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
              <ProjectLivePreviewTrigger
                url={project.livePreviewUrl}
                title={project.title}
                className={styles.livePreview}
              />
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
          <img
            className={styles.figureImg}
            src={project.media.src}
            alt={project.media.type === "image" ? project.media.alt ?? "" : ""}
          />
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
            <img
              className={styles.figPortrait}
              src="/assets/projects/gogo-tefl/portrait.svg"
              alt=""
            />
          </figure>
          <figure className={styles.figurePairItem}>
            <img
              className={styles.figLandscape}
              src="/assets/projects/gogo-tefl/card.svg"
              alt=""
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

        {/* ── Footer ── */}
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
