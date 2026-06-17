import type { ProjectCaseStudy } from "@/data/projects/instructional-video-for-managers";

export const handHygiene: ProjectCaseStudy = {
  slug: "hand-hygiene",
  title: "Hand Hygiene",
  titleLines: ["Hand Hygiene", "Your First Step to Staying Safe"],
  tagline:
    "A 3-minute microlearning module for hospital patients and the people who support them.",
  showcaseDescription:
    "Patient hand-hygiene microlearning for HSO and Accreditation Canada.",
  showcaseIndex: 2,
  about: [
    "Staff hygiene protocols get most of the attention in hospitals. Patient and family hand hygiene does not, even though it matters for infection prevention. This module fills that gap: three minutes, plain language, usable on a phone at the bedside or after discharge.",
    "Developed for the Health Standards Organization and Accreditation Canada as part of their patient education work.",
  ],
  audience:
    "Hospital patients and support persons. Mixed health literacy, diverse backgrounds, often learning on a personal device in a care setting.",
  challenge:
    "Turn WHO and CDC hand hygiene guidance into a short module people will finish, without losing what is medically important.",
  process: [
    {
      step: 1,
      title: "Content",
      body: "Simplified source material around why, when, and how. The sequence moves from motivation to step-by-step technique.",
    },
    {
      step: 2,
      title: "Instruction",
      body: "Microlearning structure with low cognitive load. Interactions placed where they reinforce behavior, not as decoration.",
    },
    {
      step: 3,
      title: "Build",
      body: "Built in Articulate Rise 360 with a clean healthcare UI, animated hand-washing demos, and responsive layouts for phone, tablet, and desktop.",
    },
  ],
  highlights: [
    {
      title: "Plain language",
      body: "Written to roughly a 6th-grade reading level. Clear navigation and culturally neutral visuals.",
    },
    {
      title: "Mobile-first",
      body: "Responsive layout built for learning at the point of need in hospital settings.",
    },
    {
      title: "Interactive demo",
      body: "A practice activity walks learners through proper hand-washing technique.",
    },
  ],
  tools: [
    {
      name: "Rise 360",
      icon: "/assets/tools/articulate.png",
    },
    {
      name: "Illustrator",
      icon: "/assets/tools/illustrator.png",
    },
  ],
  result: [
    "A finished three-minute module hospitals can add to patient education with little setup beyond deployment.",
  ],
  livePreviewUrl: "https://sample3.nvzhn.com/",
  assignmentPdfUrl: "/assets/assignment.pdf",
  hideHeroMedia: true,
  heroTheme: "dark",
  media: {
    type: "image",
    src: "/assets/prjct5_2.png",
    alt: "Hand hygiene microlearning module interface",
  },
};
