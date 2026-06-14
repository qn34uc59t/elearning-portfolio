export type WorkflowStep = {
  title: string;
  description: string;
  progress: number;
};

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    title: "Analysis",
    description:
      "I identify learning needs, conduct audience analysis, and establish clear educational goals",
    progress: 20,
  },
  {
    title: "Design",
    description:
      "I structure content meaningfully, create targeted learning objectives, and plan effective assessments",
    progress: 40,
  },
  {
    title: "Development",
    description:
      "I create engaging learning materials and implement proven instructional strategies",
    progress: 60,
  },
  {
    title: "Implementation",
    description:
      "I deliver courses seamlessly and facilitate the learning experience with expert guidance",
    progress: 80,
  },
  {
    title: "Evaluation",
    description:
      "I assess effectiveness through data analysis and gather feedback for continuous improvement",
    progress: 100,
  },
];
