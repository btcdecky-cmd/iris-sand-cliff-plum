import { createFileRoute } from "@tanstack/react-router";
import { WorkspaceRouteComponent } from "@/components/workspace/workspace-route";

type WorkspaceSearch = {
  prompt?: string;
};

export const Route = createFileRoute("/workspace")({
  validateSearch: (search: Record<string, unknown>): WorkspaceSearch => ({
    prompt: typeof search.prompt === "string" ? search.prompt : undefined,
  }),
  component: WorkspaceRouteComponent,
});
