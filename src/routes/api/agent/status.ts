import { createFileRoute } from "@tanstack/react-router";
import { agentStatus } from "@/lib/agent.server";

export const Route = createFileRoute("/api/agent/status")({
  server: {
    handlers: {
      GET: async () => Response.json(agentStatus()),
    },
  },
});
