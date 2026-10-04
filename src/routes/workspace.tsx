import { createFileRoute } from "@tanstack/react-router";
import { WorkspaceApp } from "@/components/workspace/workspace-app";

type WorkspaceSearch = {
  prompt?: string;
};

export const Route = createFileRoute("/workspace")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>): WorkspaceSearch => ({
    prompt: typeof search.prompt === "string" ? search.prompt : undefined,
  }),
  component: WorkspacePage,
});

function WorkspacePage() {
  const { prompt } = Route.useSearch();
  return <WorkspaceApp initialPrompt={prompt} />;
}
