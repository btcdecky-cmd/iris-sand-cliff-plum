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
  return {
    configured: Boolean(env("VIBEKIT_SANDBOX_API_KEY")),
    provider: env("VIBEKIT_SANDBOX_PROVIDER") ?? "e2b",
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
    const apiKey = env("VIBEKIT_SANDBOX_API_KEY");
    if (!apiKey) throw new Error("VibeKit sandbox is not configured.");
    const provider = (env("VIBEKIT_SANDBOX_PROVIDER") ?? "e2b") as "e2b" | "daytona" | "northflank";
    const kit = new VibeKit()
      .withAgent({
        type: "opencode",
        provider: "groq",
        apiKey: env("GROQ_API_KEY"),
        model: env("GROQ_SANDBOX_MODEL") ?? "llama-3.3-70b-versatile",
      })
      .withWorkingDirectory("/var/vibe0");

    if (provider !== "e2b") {
      throw new Error(`VibeKit provider ${provider} is not enabled in this build.`);
    }
    // The SDK resolves the configured sandbox provider at execution time. Keep
    // the credential server-only and pass it through the SDK's secret channel.
    kit.withSecrets({ E2B_API_KEY: apiKey });

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
