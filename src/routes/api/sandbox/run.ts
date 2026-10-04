import { createFileRoute } from "@tanstack/react-router";
import { runSandboxCommand } from "@/lib/sandbox.server";

export const Route = createFileRoute("/api/sandbox/run")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as { projectId?: unknown; command?: unknown };
          if (typeof body.projectId !== "string" || typeof body.command !== "string") {
            return Response.json({ error: "projectId and command are required." }, { status: 400 });
          }
          const result = await runSandboxCommand({ projectId: body.projectId, command: body.command });
          return Response.json(result);
        } catch (error) {
          return Response.json(
            { error: error instanceof Error ? error.message : "Sandbox execution failed." },
            { status: 400 },
          );
        }
      },
    },
  },
});
