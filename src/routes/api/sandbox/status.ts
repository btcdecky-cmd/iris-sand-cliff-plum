import { createFileRoute } from "@tanstack/react-router";
import { sandboxStatus } from "@/lib/sandbox.server";

export const Route = createFileRoute("/api/sandbox/status")({
  server: {
    handlers: {
      GET: async () => Response.json(sandboxStatus()),
    },
  },
});
