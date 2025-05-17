import { create } from "zustand";

interface Milestone {
  phase: string;
  tasks: string[];
  timeline: string;
  best_practices?: string;
}

interface ProjectState {
  projectDescription: string;
  roadmap: {
    milestones: Milestone[];
  } | null;
  architecture: {
    components: {
      name: string;
      description: string;
    }[];
    communication_flow: {
      from: string;
      to: string;
      protocol: string;
    }[];
  } | null;
  timeline: {
    totalDuration: string;
    milestones: {
      name: string;
      duration: string;
    }[];
  } | null;
  techStack: string[];
  setProjectDescription: (description: string) => void;
  setRoadmap: (roadmap: ProjectState["roadmap"]) => void;
  setArchitecture: (architecture: ProjectState["architecture"]) => void;
  setTimeline: (timeline: ProjectState["timeline"]) => void;
  setTechStack: (techStack: string[]) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projectDescription: "",
  roadmap: null,
  architecture: null,
  timeline: null,
  techStack: [],
  setProjectDescription: (description) =>
    set({ projectDescription: description }),
  setRoadmap: (roadmap) => set({ roadmap }),
  setArchitecture: (architecture) => set({ architecture }),
  setTimeline: (timeline) => set({ timeline }),
  setTechStack: (techStack) => set({ techStack }),
}));
