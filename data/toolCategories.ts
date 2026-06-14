export type ToolCategory = {
  title: string;
  description: string;
  tools: string[];
};

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    title: "Authoring",
    description:
      "I develop interactive courses, assessments, and SCORM-ready modules in the authoring tools I use every day, including:",
    tools: ["Articulate Storyline 360 & Rise", "Adobe Captivate", "Camtasia"],
  },
  {
    title: "Editing",
    description:
      "I shape visuals, motion, and audio in production suites, from static graphics through to finished video:",
    tools: [
      "Affinity / Adobe Creative Suite",
      "Final Cut Pro / Premiere Pro",
      "Apple Production Suite",
    ],
  },
  {
    title: "AI ✨",
    description:
      "I use AI across the pipeline for drafting, voiceover, and generative media. Tools I reach for most:",
    tools: ["ElevenLabs", "Nano Banana", "Higgsfield"],
  },
];
