import type { ProjectCaseStudy } from "@/data/projects/instructional-video-for-managers";

export const gogoTefl: ProjectCaseStudy = {
  slug: "gogo-tefl",
  title: "Gogo TEFL",
  titleLines: ["Gogo TEFL", "Course Video Series"],
  tagline:
    "Eight hours of on-camera video for a 120-hour online TEFL certification, written, recorded, and edited end to end.",
  showcaseDescription:
    "Eight-hour green-screen video series for Gogo TEFL, a 120-hour online teacher-certification course.",
  showcaseIndex: 0,
  about: [
    "Gogo TEFL is a 120-hour online certification course for people who want to teach English as a second language and need a recognized certificate to work online. The course was designed and authored from scratch: structured reading, quizzes, assignments, printables, and tests, with progress tracked through custom logic built on Supabase rather than an off-the-shelf LMS.",
    "Video is a supporting layer within that same build. An eight-hour on-camera series walks learners through key concepts so the course feels taught, not only read. Curriculum, scripts, recording, captions, and editing were developed as one scope from first outline to final export.",
  ],
  audience:
    "Aspiring and practicing ESL teachers worldwide who need a TEFL certificate to teach English online. A global audience with no single target market, learning largely on their own and at their own pace.",
  challenge:
    "Build a complete certification from the ground up: a text-led course with assessments and printables, plus eight hours of accessible, broadcast-clean video that supports the written curriculum without overshadowing it.",
  process: [
    {
      step: 1,
      title: "Brief",
      body: "The certification was scoped and authored from scratch. Written modules, quizzes, assignments, and tests defined the course structure first; the video series was planned as part of the same build to give learners a taught path through the material.",
    },
    {
      step: 2,
      title: "Scripts",
      body: "Scripts were prepared and structured in Notion, aligned to the curriculum so each segment reinforced the right module in sequence.",
    },
    {
      step: 3,
      title: "Production",
      body: "Recorded on a green screen with voice captured on a lav mic, then edited in Final Cut and Camtasia. Captions were added throughout for accessibility, with a consistent look kept across all eight hours.",
    },
    {
      step: 4,
      title: "Delivery",
      body: "The videos sit alongside the written modules inside the course, which runs on Supabase with custom-built progress tracking rather than a third-party LMS. Each video is tracked as part of the learner's path through the full certification.",
    },
  ],
  highlights: [
    {
      title: "Full authorship",
      body: "Curriculum, scripts, on-camera presenting, audio, captions, and editing in one continuous scope from first draft to final export.",
    },
    {
      title: "Built at scale",
      body: "Eight hours of finished video supporting a 120-hour certification. A full series, scripted and edited as one consistent body of work rather than a handful of one-off clips.",
    },
    {
      title: "Green-screen production",
      body: "Recorded on a green screen with lav-mic audio and edited to a clean, broadcast-style finish, consistent with the rest of the course.",
    },
  ],
  tools: [
    {
      name: "Notion",
      icon: "/assets/tools/notion.svg",
    },
    {
      name: "Final Cut Pro",
      icon: "/assets/tools/final-cut-pro.png",
    },
    {
      name: "Camtasia",
      icon: "/assets/tools/camtasia.webp",
    },
    {
      name: "Captions",
      icon: "/assets/tools/captions.svg",
    },
  ],
  result: [
    "The course is finished and ready to launch: written modules, assessments, and eight hours of captioned video integrated into one certification. Learners move through a text-led program with on-camera instruction where it adds the most value.",
  ],
  livePreviewUrl: "/assets/platform.mp4",
  hideHeroMedia: true,
  heroTheme: "dark",
  media: {
    type: "video",
    src: "/assets/1.1_vid.mp4",
  },
};
