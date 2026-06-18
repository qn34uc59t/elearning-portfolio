import type { ProjectCaseStudy } from "@/data/projects/instructional-video-for-managers";

export const technicalTroubleshooting: ProjectCaseStudy = {
  slug: "technical-troubleshooting",
  title: "Technical Troubleshooting",
  titleLines: ["Technical Troubleshooting", "During Online Sessions"],
  tagline:
    "A step-by-step guide for educators fixing tech problems mid-session without losing teaching time.",
  showcaseDescription:
    "Troubleshooting guide for educators handling technical issues during live online classes.",
  showcaseIndex: 3,
  about: [
    "Live online classes break for connection issues, login errors, wrong assignments, and other routine failures. Without a shared approach, every teacher improvises and support fields the same tickets.",
    "This guide gives educators a fixed order of operations: identify the problem, apply the immediate fix, know when to escalate, and keep the session moving.",
  ],
  audience:
    "Online educators running live sessions. Mixed technical confidence, need answers fast while class is in progress.",
  challenge:
    "Replace ad-hoc troubleshooting with a short, repeatable workflow teachers can follow under pressure.",
  process: [
    {
      step: 1,
      title: "Research",
      body: "Reviewed support tickets and interviewed educators. Worked with IT to map recurring issues and verify the correct fixes.",
    },
    {
      step: 2,
      title: "Design",
      body: "Organized content by issue type and built decision-tree flows for diagnosis. Navigation stays scannable when someone is mid-session.",
    },
    {
      step: 3,
      title: "Build",
      body: "Scenario-based lessons, knowledge checks, and clear escalation steps in the finished module.",
    },
  ],
  highlights: [
    {
      title: "Issue-based modules",
      body: "Connection problems, login errors, assignment mix-ups: each gets its own focused lesson.",
    },
    {
      title: "Scenario practice",
      body: "Real session situations walk teachers through spotting the pattern and applying the fix.",
    },
    {
      title: "Escalation path",
      body: "Clear rules for when to stop troubleshooting and how to hand off to support.",
    },
  ],
  tools: [
    {
      name: "Storyline 360",
      icon: "/assets/tools/storyline.svg",
    },
    {
      name: "Illustrator",
      icon: "/assets/tools/illustrator.png",
    },
  ],
  result: [
    "Teachers work through common issues on their own mid-session, with less downtime and fewer repeat support requests.",
  ],
  livePreviewUrl: "https://sample4.nvzhn.com/",
  hideHeroMedia: true,
  heroTheme: "dark",
  media: {
    type: "image",
    src: "/assets/prjct3.gif",
    alt: "Technical troubleshooting guide interface",
  },
};
