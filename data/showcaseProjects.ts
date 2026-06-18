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
  caseStudyHref?: string;
  livePreviewUrl?: string;
  media?: ShowcaseProjectMedia;
};

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: "project-1",
    title: "Gogo TEFL",
    description:
      "Eight-hour green-screen video series for a 120-hour online TEFL certification course.",
    caseStudyHref: "/projects/gogo-tefl",
    media: {
      type: "video",
      src: "/assets/platform.mp4",
    },
  },
  {
    id: "project-2",
    title: "Instructional Video for Managers",
    description:
      "Short video lessons for new school managers on ClassIn LMS, hosted in our internal learning hub.",
    caseStudyHref: "/projects/instructional-video-for-managers",
    livePreviewUrl: "https://sample2.nvzhn.com/video.mp4",
    media: {
      type: "image",
      src: "/assets/card2.gif",
      alt: "Instructional video preview for ClassIn LMS managers",
    },
  },
  {
    id: "project-3",
    title: "Hand Hygiene",
    description:
      "Patient hand-hygiene microlearning for HSO and Accreditation Canada.",
    caseStudyHref: "/projects/hand-hygiene",
    livePreviewUrl: "https://sample3.nvzhn.com/",
    media: {
      type: "video",
      src: "/assets/card3.mp4",
    },
  },
  {
    id: "project-4",
    title: "Technical Troubleshooting",
    description:
      "Troubleshooting guide for educators handling technical issues during live online classes.",
    caseStudyHref: "/projects/technical-troubleshooting",
    livePreviewUrl: "https://sample4.nvzhn.com/",
    media: {
      type: "video",
      src: "/assets/card4.mp4",
    },
  },
];

export const SHOWCASE_PROJECT_COUNT = SHOWCASE_PROJECTS.length;
