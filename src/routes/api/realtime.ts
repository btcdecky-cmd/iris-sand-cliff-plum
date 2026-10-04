import { createFileRoute } from "@tanstack/react-router";
import { waitForRealtimeEvents } from "@/lib/sandbox.server";

export const Route = createFileRoute("/api/realtime")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const projectId = url.searchParams.get("projectId")?.trim();
        const afterId = Number(url.searchParams.get("afterId") ?? "0");
        if (!projectId) return Response.json({ error: "projectId is required." }, { status: 400 });
        const events = await waitForRealtimeEvents(projectId, Number.isFinite(afterId) ? afterId : 0, request.signal);
        return Response.json({ events }, { headers: { "Cache-Control": "no-store" } });
      },
    },
  },
});
