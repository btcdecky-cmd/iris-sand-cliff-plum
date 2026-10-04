import { createFileRoute } from "@tanstack/react-router";
import { rateLimit, runAgentTurn } from "@/lib/agent.server";
import { AGENT_MODES, type AgentMode, type ProjectFile } from "@/lib/types";

export const Route = createFileRoute("/api/agent/turn")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ip =
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          request.headers.get("x-real-ip") ||
          "unknown";
        if (!rateLimit(ip)) {
          return Response.json(
            { error: "You’ve sent several requests. Please try again in a minute." },
            { status: 429, headers: { "Retry-After": "60" } },
          );
        }

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Please send a JSON body." }, { status: 400 });
        }

        const parsed = parseTurn(body);
        if (!parsed) {
          return Response.json(
            { error: "Please provide a valid message and project context." },
            { status: 400 },
          );
        }

        const encoder = new TextEncoder();
        const stream = new ReadableStream({
          async start(controller) {
            const emit = (event: unknown) => {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
            };
            try {
              await runAgentTurn({
                ...parsed,
                signal: request.signal,
                emit,
              });
            } catch (error) {
              const message =
                error instanceof Error && error.name === "AbortError"
                  ? "Stopped."
                  : error instanceof Error
                    ? error.message
                    : "The agent could not finish that turn.";
              emit({ type: "error", message });
              emit({ type: "done" });
            } finally {
              controller.close();
            }
          },
        });

        return new Response(stream, {
          headers: {
            "Content-Type": "text/event-stream; charset=utf-8",
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive",
          },
        });
      },
    },
  },
});

function parseTurn(body: unknown) {
  if (!body || typeof body !== "object") return null;
  const value = body as Record<string, unknown>;
  const mode = value.mode;
  const request = value.request;
  if (typeof mode !== "string" || !AGENT_MODES.includes(mode as AgentMode)) return null;
  if (typeof request !== "string" || !request.trim() || request.length > 12_000) return null;
  const files = Array.isArray(value.files) ? value.files.slice(0, 24) : [];
  const history = Array.isArray(value.history) ? value.history.slice(0, 20) : [];
  const parsedFiles: ProjectFile[] = [];
  for (const file of files) {
    if (!file || typeof file !== "object") continue;
    const rec = file as Record<string, unknown>;
    if (typeof rec.path !== "string" || typeof rec.content !== "string") continue;
    parsedFiles.push({ path: rec.path.slice(0, 180), content: rec.content.slice(0, 40_000) });
  }
  const parsedHistory: Array<{ role: "user" | "assistant"; content: string }> = [];
  for (const item of history) {
    if (!item || typeof item !== "object") continue;
    const rec = item as Record<string, unknown>;
    if ((rec.role !== "user" && rec.role !== "assistant") || typeof rec.content !== "string") continue;
    parsedHistory.push({ role: rec.role, content: rec.content.slice(0, 12_000) });
  }
  return {
    mode: mode as AgentMode,
    request: request.trim(),
    files: parsedFiles,
    history: parsedHistory,
    model: typeof value.model === "string" ? value.model : undefined,
    groqKey: typeof value.groqKey === "string" ? value.groqKey : undefined,
    memoryUserId: typeof value.projectId === "string" && value.projectId.trim()
      ? `project:${value.projectId.trim().slice(0, 120)}`
      : undefined,
  };
}
