import type { WorkflowView } from "@/components/sections/WorkflowSection";
import { SHOWCASE_PROJECT_COUNT } from "@/data/showcaseProjects";
import { WORKFLOW_STEPS } from "@/data/workflowSteps";

export type SectionId = "hero" | "workflow" | "showcase" | "contact";

export type ViewState = {
  section: SectionId;
  workflowView: WorkflowView;
  workflowStep: number;
  showcaseProject: number;
};

export const INITIAL_VIEW: ViewState = {
  section: "hero",
  workflowView: "steps",
  workflowStep: 0,
  showcaseProject: 0,
};

export const NAV_ITEMS = [
  { label: "About", id: "about" },
  { label: "Case studies", id: "showcase" },
  { label: "Workflow & Tools", id: "workflow-and-tools" },
  { label: "Contact", id: "contact" },
] as const;

export type NavId = (typeof NAV_ITEMS)[number]["id"];

export function isSameView(a: ViewState, b: ViewState) {
  if (a.section !== b.section) return false;

  if (a.section === "hero" || a.section === "contact") return true;

  if (a.section === "workflow") {
    return (
      a.workflowView === b.workflowView && a.workflowStep === b.workflowStep
    );
  }

  return a.showcaseProject === b.showcaseProject;
}

export function navIdToView(id: NavId): ViewState {
  switch (id) {
    case "about":
      return { ...INITIAL_VIEW };
    case "workflow-and-tools":
      return {
        section: "workflow",
        workflowView: "steps",
        workflowStep: 0,
        showcaseProject: 0,
      };
    case "showcase":
      return {
        section: "showcase",
        workflowView: "tools",
        workflowStep: WORKFLOW_STEPS.length - 1,
        showcaseProject: 0,
      };
    case "contact":
      return {
        section: "contact",
        workflowView: "tools",
        workflowStep: WORKFLOW_STEPS.length - 1,
        showcaseProject: SHOWCASE_PROJECT_COUNT - 1,
      };
  }
}

export function headerVariantFromView(_view: ViewState): "light" | "dark" {
  return "dark";
}

export function viewToHash(view: ViewState): string {
  switch (view.section) {
    case "hero":
      return "#about";
    case "workflow":
      if (view.workflowView === "tools") {
        return "#workflow-and-tools/tools";
      }
      return `#workflow-and-tools/step/${view.workflowStep + 1}`;
    case "showcase":
      return view.showcaseProject === 0
        ? "#showcase"
        : `#showcase/${view.showcaseProject + 1}`;
    case "contact":
      return "#contact";
  }
}

export function parseHash(hash: string): ViewState {
  const raw = hash.replace(/^#/, "").trim();
  if (!raw || raw === "about") return { ...INITIAL_VIEW };

  if (raw === "contact") return navIdToView("contact");

  if (raw === "workflow-and-tools") {
    return navIdToView("workflow-and-tools");
  }

  if (raw === "workflow-and-tools/tools") {
    return {
      section: "workflow",
      workflowView: "tools",
      workflowStep: WORKFLOW_STEPS.length - 1,
      showcaseProject: 0,
    };
  }

  const workflowStepMatch = raw.match(/^workflow-and-tools\/step\/(\d+)$/);
  if (workflowStepMatch) {
    const step = Math.min(
      Math.max(Number(workflowStepMatch[1]) - 1, 0),
      WORKFLOW_STEPS.length - 1
    );
    return {
      section: "workflow",
      workflowView: "steps",
      workflowStep: step,
      showcaseProject: 0,
    };
  }

  if (raw === "showcase") {
    return navIdToView("showcase");
  }

  const showcaseMatch = raw.match(/^showcase\/(\d+)$/);
  if (showcaseMatch) {
    const project = Math.min(
      Math.max(Number(showcaseMatch[1]) - 1, 0),
      SHOWCASE_PROJECT_COUNT - 1
    );
    return {
      section: "showcase",
      workflowView: "tools",
      workflowStep: WORKFLOW_STEPS.length - 1,
      showcaseProject: project,
    };
  }

  return { ...INITIAL_VIEW };
}

export function navIdToPortfolioHref(
  id: NavId,
  showcaseProject?: number
): string {
  const view = navIdToView(id);

  if (id === "showcase" && showcaseProject !== undefined) {
    view.showcaseProject = showcaseProject;
  }

  return `/${viewToHash(view)}`;
}

export function navIdFromView(view: ViewState): NavId {
  switch (view.section) {
    case "hero":
      return "about";
    case "workflow":
      return "workflow-and-tools";
    case "showcase":
      return "showcase";
    case "contact":
      return "contact";
  }
}
