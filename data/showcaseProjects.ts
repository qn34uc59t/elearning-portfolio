export type ShowcaseProjectMedia =
  | {
      type: "video";
      src: string;
    }
  | {
      type: "image";
      src: string;
      alt?: string;
    };

export type ShowcaseProject = {
  id: string;
  title: string;
  description: string;
  href: string;
  media?: ShowcaseProjectMedia;
};

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: "project-1",
    title: "Project 1",
    description: "Just a short description of a project. A sentense max.",
    href: "#",
    media: {
      type: "video",
      src: "/assets/platform.mp4",
    },
  },
  {
    id: "project-2",
    title: "Project 2",
    description: "Just a short description of a project. A sentense max.",
    href: "#",
    media: {
      type: "image",
      src: "/assets/card2.gif",
      alt: "",
    },
  },
  {
    id: "project-3",
    title: "Project 3",
    description: "Just a short description of a project. A sentense max.",
    href: "#",
    media: {
      type: "image",
      src: "/assets/card5.jpeg",
      alt: "",
    },
  },
  {
    id: "project-4",
    title: "Project 4",
    description: "Just a short description of a project. A sentense max.",
    href: "#",
    media: {
      type: "image",
      src: "/assets/card1.png",
      alt: "",
    },
  },
];

export const SHOWCASE_PROJECT_COUNT = SHOWCASE_PROJECTS.length;
