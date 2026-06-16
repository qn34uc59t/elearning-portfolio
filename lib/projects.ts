import { gogoTefl } from "@/data/projects/gogo-tefl";
import { handHygiene } from "@/data/projects/hand-hygiene";
import { instructionalVideoForManagers } from "@/data/projects/instructional-video-for-managers";
import { technicalTroubleshooting } from "@/data/projects/technical-troubleshooting";
import type { ProjectCaseStudy } from "@/data/projects/instructional-video-for-managers";

const PROJECTS: ProjectCaseStudy[] = [
  gogoTefl,
  instructionalVideoForManagers,
  handHygiene,
  technicalTroubleshooting,
];

export function getProjectBySlug(slug: string): ProjectCaseStudy | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((project) => project.slug);
}

export function getAdjacentProjects(slug: string): {
  previous: ProjectCaseStudy | null;
  next: ProjectCaseStudy | null;
} | undefined {
  const index = PROJECTS.findIndex((project) => project.slug === slug);
  if (index === -1) return undefined;

  return {
    previous: index > 0 ? PROJECTS[index - 1] : null,
    next: index < PROJECTS.length - 1 ? PROJECTS[index + 1] : null,
  };
}
