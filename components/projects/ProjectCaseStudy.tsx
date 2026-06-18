import type { ProjectCaseStudy } from "@/data/projects/instructional-video-for-managers";
import BrandMark from "@/components/layout/BrandMark";
import LinkArrow from "@/components/ui/LinkArrow";
import ProjectLivePreviewTrigger from "@/components/projects/ProjectLivePreviewTrigger";
import ProjectsPageShell from "@/components/projects/ProjectsPageShell";
import { getAdjacentProjects } from "@/lib/projects";
import { navIdToPortfolioHref } from "@/lib/portfolioNavigation";
import Link from "next/link";
import styles from "./ProjectCaseStudy.module.css";

type ProjectCaseStudyProps = {
  project: ProjectCaseStudy;
};

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

function ProjectMedia({
  media,
  className,
}: {
  media: ProjectCaseStudy["media"];
  className?: string;
}) {
  if (media.type === "video") {
    return (
      <video
        className={className}
        src={media.src}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
    );
  }
  return <img className={className} src={media.src} alt={media.alt ?? ""} />;
}

export default function ProjectCaseStudy({ project }: ProjectCaseStudyProps) {
  const adjacentProjects = getAdjacentProjects(project.slug);

  return (
    <ProjectsPageShell
      showcaseIndex={project.showcaseIndex}
      headerVariant={project.heroTheme === "dark" ? "dark" : "light"}
    >
      <article className={styles.page}>
      {/* ── Hero ── */}
      <header
        className={`${styles.hero} ${project.heroTheme === "dark" ? styles.heroDark : ""}`}
      >
        <div
          className={`${styles.heroInner} ${project.hideHeroMedia ? styles.heroInnerNoMedia : ""}`}
        >
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Case Study</p>
            <h1 className={styles.title}>
              {project.titleLines ? (
                project.titleLines.map((line) => (
                  <span key={line} className={styles.titleLine}>
                    {line}
                  </span>
                ))
              ) : (
                project.title
              )}
            </h1>
            <p className={styles.tagline}>{project.tagline}</p>
            {project.livePreviewUrl ? (
              <ProjectLivePreviewTrigger
                url={project.livePreviewUrl}
                title={project.title}
                className={styles.livePreview}
              />
            ) : null}
          </div>

          {!project.hideHeroMedia && (
            <div className={styles.heroMedia}>
              <ProjectMedia media={project.media} className={styles.media} />
            </div>
          )}
        </div>
      </header>

      {/* ── Context ── full-width 2-col ── */}
      <section className={styles.contextSection}>
        <SectionMarker index="01" label="Context" />

        <div className={styles.contextColumns}>
          <div className={styles.contextBody}>
            {project.about.map((paragraph, i) => (
              <p
                key={paragraph}
                className={i === 0 ? styles.bodyLead : styles.body}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className={styles.contextDetails}>
            <div className={styles.detailBlock}>
              <h2 className={styles.detailTitle}>Audience</h2>
              <p className={styles.body}>{project.audience}</p>
            </div>
            <div className={styles.detailBlock}>
              <h2 className={styles.detailTitle}>Challenge</h2>
              <p className={styles.body}>{project.challenge}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Full-width media break ── */}
      <div className={styles.mediaBreak} aria-hidden="true">
        <ProjectMedia media={project.media} className={styles.mediaBreakImg} />
      </div>

      {/* ── Process ── dark, horizontal rows ── */}
      <section className={styles.processSection}>
        <div className={styles.processHeader}>
          <SectionMarker index="02" label="Process" className={styles.markerOnDark} />
        </div>

        <ol className={styles.processSteps}>
          {project.process.map((step) => (
            <li key={step.step} className={styles.processStep}>
              <span className={styles.stepNum}>
                {String(step.step).padStart(2, "0")}
              </span>
              <h2 className={styles.stepTitle}>{step.title}</h2>
              <p className={styles.stepBody}>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Highlights ── asymmetric grid ── */}
      <section className={styles.highlightsSection}>
        <SectionMarker index="03" label="Highlights" />

        <ul className={styles.highlightsGrid}>
          {project.highlights.map((highlight, index) => (
            <li
              key={highlight.title}
              className={`${styles.highlightCard} ${index === 0 ? styles.highlightFeatured : ""}`}
            >
              <h2 className={styles.highlightTitle}>{highlight.title}</h2>
              <p className={styles.body}>{highlight.body}</p>
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

      {/* ── Result ── dark, large quote ── */}
      <section className={styles.resultSection}>
        <SectionMarker index="05" label="Result" className={styles.markerOnDark} />

        <blockquote className={styles.resultQuote}>{project.result[0]}</blockquote>

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
        {adjacentProjects?.previous ? (
          <Link
            href={`/projects/${adjacentProjects.previous.slug}`}
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

        {adjacentProjects?.next ? (
          <Link
            href={`/projects/${adjacentProjects.next.slug}`}
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
