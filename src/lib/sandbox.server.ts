import { env } from "@/lib/env.server";
import { getSql } from "@/lib/db";
import { VibeKit } from "@vibe-kit/sdk";

export type SandboxRunInput = {
  projectId: string;
  command: string;
};

function safeCommand(command: string) {
  const value = command.trim();
  if (!value || value.length > 2_000) throw new Error("Provide a command up to 2,000 characters.");
  return value;
}

export function sandboxStatus() {
  const provider = (env("VIBEKIT_SANDBOX_PROVIDER") ?? "e2b").toLowerCase();
  const sandboxKey = provider === "e2b" ? env("E2B_API_KEY") ?? env("VIBEKIT_SANDBOX_API_KEY") : undefined;
  return {
    configured: Boolean(sandboxKey && env("GROQ_API_KEY")),
    provider,
    missing: [
      !sandboxKey ? `${provider.toUpperCase()}_API_KEY` : null,
      !env("GROQ_API_KEY") ? "GROQ_API_KEY" : null,
    ].filter((value): value is string => Boolean(value)),
  };
}

export async function runSandboxCommand(input: SandboxRunInput) {
  const command = safeCommand(input.command);
  const id = crypto.randomUUID();
  const sql = await getSql();
  await sql.query(
    "insert into sandbox_runs (id, project_id, command) values ($1, $2, $3)",
    [id, input.projectId, command],
  );

  try {
    const provider = (env("VIBEKIT_SANDBOX_PROVIDER") ?? "e2b").toLowerCase();
    const apiKey = provider === "e2b" ? env("E2B_API_KEY") ?? env("VIBEKIT_SANDBOX_API_KEY") : undefined;
    const groqKey = env("GROQ_API_KEY");
    if (!apiKey || !groqKey) {
      throw new Error(
        `VibeKit sandbox is not configured. Required server variables: ${[
          !apiKey ? `${provider.toUpperCase()}_API_KEY` : null,
          !groqKey ? "GROQ_API_KEY" : null,
        ].filter(Boolean).join(", ")}.`,
      );
    }
    if (provider !== "e2b") {
      throw new Error(`VibeKit provider ${provider} is not enabled in this build.`);
    }
    const kit = new VibeKit()
      .withAgent({
        type: "opencode",
        provider: "groq",
        apiKey: groqKey,
        model: env("GROQ_SANDBOX_MODEL") ?? "qwen/qwen3.8-27b",
      })
      .withWorkingDirectory("/var/vibe0")
      .withSecrets({ E2B_API_KEY: apiKey, GROQ_API_KEY: groqKey });

    const result = await kit.executeCommand(command);
    await sql.query(
      "update sandbox_runs set status = $1, stdout = $2, stderr = $3, exit_code = $4, finished_at = now() where id = $5",
      ["completed", result.stdout ?? "", result.stderr ?? "", result.exitCode ?? null, id],
    );
    return { id, ...result };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Sandbox execution failed.";
    await sql.query(
      "update sandbox_runs set status = $1, stderr = $2, finished_at = now() where id = $3",
      ["failed", message, id],
    );
    throw new Error(message);
  }
}

export async function listSandboxRuns(projectId: string) {
  const sql = await getSql();
  return sql.query(
    "select id, project_id, command, status, stdout, stderr, exit_code, created_at, finished_at from sandbox_runs where project_id = $1 order by created_at desc limit 25",
    [projectId],
  );
}

export async function appendRealtimeEvent(projectId: string, eventType: string, payload: unknown) {
  const sql = await getSql();
  await sql.query(
    "insert into realtime_events (project_id, event_type, payload) values ($1, $2, $3::jsonb)",
    [projectId, eventType, JSON.stringify(payload)],
  );
}

export async function readRealtimeEvents(projectId: string, afterId = 0) {
  const sql = await getSql();
  return sql.query(
    "select id, event_type, payload, created_at from realtime_events where project_id = $1 and id > $2 order by id asc limit 100",
    [projectId, afterId],
  );
}

export async function waitForRealtimeEvents(projectId: string, afterId = 0, signal?: AbortSignal) {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    if (signal?.aborted) return [];
    const events = await readRealtimeEvents(projectId, afterId);
    if (events.length) return events;
    await new Promise((resolve) => setTimeout(resolve, 1_000));
  }
  return [];
}
