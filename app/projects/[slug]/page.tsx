import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectCaseStudy from "@/components/projects/ProjectCaseStudy";
import GogoTeflCaseStudy from "@/components/projects/GogoTeflCaseStudy";
import HandHygieneCaseStudy from "@/components/projects/HandHygieneCaseStudy";
import TechnicalTroubleshootingCaseStudy from "@/components/projects/TechnicalTroubleshootingCaseStudy";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";

type ProjectPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Illia Neviezhyn Portfolio`,
    description: project.tagline,
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  if (project.slug === "gogo-tefl") {
    return <GogoTeflCaseStudy project={project} />;
  }

  if (project.slug === "hand-hygiene") {
    return <HandHygieneCaseStudy project={project} />;
  }

  if (project.slug === "technical-troubleshooting") {
    return <TechnicalTroubleshootingCaseStudy project={project} />;
  }

  return <ProjectCaseStudy project={project} />;
}
