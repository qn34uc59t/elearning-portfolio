import type { ShowcaseProjectMedia } from "@/data/showcaseProjects";

export type ProjectProcessStep = {
  step: number;
  title: string;
  body: string;
};

export type ProjectHighlight = {
  title: string;
  body: string;
};

export type ProjectTool = {
  name: string;
  icon: string;
  wide?: boolean;
};

export type ProjectCaseStudy = {
  slug: string;
  title: string;
  titleLines?: string[];
  tagline: string;
  showcaseDescription: string;
  showcaseIndex: number;
  about: string[];
  audience: string;
  challenge: string;
  process: ProjectProcessStep[];
  highlights: ProjectHighlight[];
  tools: ProjectTool[];
  result: string[];
  livePreviewUrl?: string;
  assignmentPdfUrl?: string;
  media: ShowcaseProjectMedia;
  hideHeroMedia?: boolean;
  heroTheme?: "light" | "dark";
};

export const instructionalVideoForManagers: ProjectCaseStudy = {
  slug: "instructional-video-for-managers",
  title: "Instructional Video for School Managers",
  titleLines: ["Instructional Video", "for School Managers"],
  tagline:
    "A modular video series for new school managers learning ClassIn from day one.",
  showcaseDescription:
    "Short video lessons for new school managers on ClassIn LMS, hosted in our internal learning hub.",
  showcaseIndex: 1,
  about: [
    "New managers were expected to run lesson scheduling, teacher accounts, and course materials in ClassIn LMS, but the training lived in scattered PDFs on Google Drive. Open one file for scheduling, another for accounts, and you still missed steps.",
    "I built a series of short instructional videos and published them in our internal learning hub. Each video covers one task or flow, so someone on their first week can watch only what they need instead of sitting through one long tutorial.",
  ],
  audience:
    "New school managers in their first weeks on the job. People who are still learning how the platform works and need clear, bite-sized guidance on everyday ClassIn tasks.",
  challenge:
    "Replace static PDFs with training that fits how new hires actually learn: small chunks, easy to find, and simple to update when the product changes.",
  process: [
    {
      step: 1,
      title: "Problem",
      body: "Onboarding relied on disconnected PDFs on Google Drive. New managers had to hunt across files, which slowed their first weeks and made it hard to follow a clear sequence.",
    },
    {
      step: 2,
      title: "Content",
      body: "I mapped the tasks new managers hit first, then scripted and storyboarded each video as its own module. One feature or workflow per video, in the order they would actually use them.",
    },
    {
      step: 3,
      title: "Production",
      body: "I built slides in Keynote, recorded and edited in Premiere Pro, created graphics in Illustrator, and used ElevenLabs for narration. I handled the full pipeline myself from script to final export.",
    },
    {
      step: 4,
      title: "Publishing",
      body: "I organized the series in our internal learning hub so each lesson sits in one place with the rest of manager onboarding. New hires land in the hub and work through videos task by task.",
    },
  ],
  highlights: [
    {
      title: "Series, not one long file",
      body: "The training is a set of short videos in our internal learning hub, not a single three-hour walkthrough. New managers open the lesson that matches the task in front of them.",
    },
    {
      title: "Built to update fast",
      body: "When ClassIn changes, I redo only the affected videos. The modular structure means a UI update in one area does not force a full re-record of the whole series.",
    },
    {
      title: "Narration via ElevenLabs",
      body: "ElevenLabs voice-over keeps tone consistent across the series and makes it straightforward to regenerate audio for a single module when the script changes.",
    },
  ],
  tools: [
    {
      name: "Keynote",
      icon: "/assets/tools/keynote.png",
    },
    {
      name: "Premiere Pro",
      icon: "/assets/tools/premiere-pro.svg",
    },
    {
      name: "Illustrator",
      icon: "/assets/tools/illustrator.png",
    },
    {
      name: "ElevenLabs",
      icon: "/assets/tools/elevenlabs-light.svg",
    },
    {
      name: "ClassIn",
      icon: "/assets/tools/classin.svg",
      wide: true,
    },
  ],
  result: [
    "New managers now have a video library in the internal learning hub they can dip into from day one. Onboarding does not start with \"which PDF do I open?\" It starts with the right short lesson for the task at hand.",
  ],
  livePreviewUrl: "https://sample2.nvzhn.com/video.mp4",
  hideHeroMedia: true,
  heroTheme: "dark",
  media: {
    type: "image",
    src: "/assets/card2.gif",
    alt: "Instructional video preview for ClassIn LMS managers",
  },
};
