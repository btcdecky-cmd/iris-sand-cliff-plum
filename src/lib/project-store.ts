import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createProject } from "@/lib/starter";
import type { AgentMode, AgentOutcome, ChatMessage, Project, ProjectFile } from "@/lib/types";
import { GROQ_MODELS } from "@/lib/types";

type Settings = {
  groqKey: string;
  model: string;
};

type ProjectState = {
  hasHydrated: boolean;
  projects: Project[];
  activeId: string | null;
  settings: Settings;
  hydrate: () => void;
  active: () => Project | null;
  create: (name?: string) => Project;
  switchTo: (id: string) => void;
  rename: (id: string, name: string) => void;
  remove: (id: string) => void;
  patch: (id: string, patch: Partial<Project>) => void;
  setFiles: (id: string, files: ProjectFile[]) => void;
  setFileContent: (id: string, path: string, content: string) => void;
  addFile: (id: string, path: string, content?: string) => void;
  deleteFile: (id: string, path: string) => void;
  renameFile: (id: string, from: string, to: string) => void;
  addMessages: (id: string, messages: ChatMessage[]) => void;
  updateMessage: (id: string, messageId: string, content: string) => void;
  upsertOutcome: (id: string, outcome: AgentOutcome) => void;
  setSettings: (patch: Partial<Settings>) => void;
};

function touch(project: Project, patch: Partial<Project>): Project {
  return { ...project, ...patch, updatedAt: new Date().toISOString() };
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      hasHydrated: false,
      projects: [],
      activeId: null,
      settings: { groqKey: "", model: GROQ_MODELS[0].id },
      hydrate: () => {
        const { projects, activeId } = get();
        if (projects.length === 0) {
          const project = createProject("First site");
          set({ projects: [project], activeId: project.id });
          return;
        }
        if (!activeId || !projects.some((project) => project.id === activeId)) {
          set({ activeId: projects[0]?.id ?? null });
        }
      },
      active: () => {
        const { projects, activeId } = get();
        return projects.find((project) => project.id === activeId) ?? projects[0] ?? null;
      },
      create: (name) => {
        const project = createProject(name);
        set((state) => ({
          projects: [project, ...state.projects],
          activeId: project.id,
        }));
        return project;
      },
      switchTo: (id) => set({ activeId: id }),
      rename: (id, name) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? touch(project, { name }) : project,
          ),
        })),
      remove: (id) =>
        set((state) => {
          const projects = state.projects.filter((project) => project.id !== id);
          const activeId =
            state.activeId === id ? (projects[0]?.id ?? null) : state.activeId;
          return { projects, activeId };
        }),
      patch: (id, patch) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? touch(project, patch) : project,
          ),
        })),
      setFiles: (id, files) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? touch(project, { files }) : project,
          ),
        })),
      setFileContent: (id, path, content) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id
              ? touch(project, {
                  files: project.files.map((file) =>
                    file.path === path ? { ...file, content } : file,
                  ),
                })
              : project,
          ),
        })),
      addFile: (id, path, content = "") =>
        set((state) => ({
          projects: state.projects.map((project) => {
            if (project.id !== id) return project;
            if (project.files.some((file) => file.path === path)) return project;
            return touch(project, { files: [...project.files, { path, content }] });
          }),
        })),
      deleteFile: (id, path) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id
              ? touch(project, {
                  files: project.files.filter((file) => file.path !== path),
                })
              : project,
          ),
        })),
      renameFile: (id, from, to) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id
              ? touch(project, {
                  files: project.files.map((file) =>
                    file.path === from ? { ...file, path: to } : file,
                  ),
                })
              : project,
          ),
        })),
      addMessages: (id, messages) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id
              ? touch(project, { messages: [...project.messages, ...messages] })
              : project,
          ),
        })),
      updateMessage: (id, messageId, content) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id
              ? touch(project, {
                  messages: project.messages.map((message) =>
                    message.id === messageId ? { ...message, content } : message,
                  ),
                })
              : project,
          ),
        })),
      upsertOutcome: (id, outcome) =>
        set((state) => ({
          projects: state.projects.map((project) => {
            if (project.id !== id) return project;
            const outcomes = project.outcomes ?? [];
            const index = outcomes.findIndex((item) => item.id === outcome.id);
            const next =
              index >= 0
                ? outcomes.map((item, i) => (i === index ? outcome : item))
                : [outcome, ...outcomes].slice(0, 24);
            return touch(project, { outcomes: next });
          }),
        })),
      setSettings: (patch) =>
        set((state) => ({ settings: { ...state.settings, ...patch } })),
    }),
    {
      name: "adonabix.workspace.v2",
      partialize: (state) => ({
        projects: state.projects,
        activeId: state.activeId,
        settings: state.settings,
      }),
      onRehydrateStorage: () => () => {
        useProjectStore.setState({ hasHydrated: true });
        useProjectStore.getState().hydrate();
      },
    },
  ),
);

export const MODE_META: Record<
  AgentMode,
  { label: string; hint: string }
> = {
  agent: { label: "Agent", hint: "Plan, write, and verify with tools" },
  plan: { label: "Plan", hint: "Shape the idea before writing code" },
  build: { label: "Build", hint: "Generate a complete first version" },
  edit: { label: "Edit", hint: "Change only what you asked for" },
  debug: { label: "Debug", hint: "Find issues and patch them" },
};
