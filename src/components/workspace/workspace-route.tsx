import { useSearch } from "@tanstack/react-router";
import { WorkspaceApp } from "@/components/workspace/workspace-app";

export function WorkspaceRouteComponent() {
  const { prompt } = useSearch({ from: "/workspace" });
  return <WorkspaceApp initialPrompt={prompt} />;
}
