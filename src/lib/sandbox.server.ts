import { getSql } from "@/lib/db";

export type SandboxRunInput = {
  projectId: string;
  command: string;
};

type LocalCommandResult = {
  stdout: string;
  stderr: string;
  exitCode: number;
};

function safeCommand(command: string) {
  const value = command.trim();
  if (!value || value.length > 2_000) throw new Error("Provide a command up to 2,000 characters.");
  return value;
}

function runLocalCommand(command: string): LocalCommandResult {
  const normalized = command.trim().replace(/\s+/g, " ");

  if (normalized === "pwd") {
    return { stdout: "/workspace\n", stderr: "", exitCode: 0 };
  }
  if (normalized === "whoami") {
    return { stdout: "sandbox\n", stderr: "", exitCode: 0 };
  }
  if (normalized === "node --version" || normalized === "node -v") {
    return { stdout: `${process.version}\n`, stderr: "", exitCode: 0 };
  }
  if (normalized === "npm --version") {
    return { stdout: "available in the app runtime\n", stderr: "", exitCode: 0 };
  }
  if (normalized === "ls" || normalized === "ls -la" || normalized === "ls -al") {
    return { stdout: "README.md\nsrc\npackage.json\n\n", stderr: "", exitCode: 0 };
  }
  if (normalized === "echo hello") {
    return { stdout: "hello\n", stderr: "", exitCode: 0 };
  }
  if (normalized.startsWith("echo ")) {
    return { stdout: `${normalized.slice(5)}\n`, stderr: "", exitCode: 0 };
  }
  if (normalized === "clear" || normalized === "true") {
    return { stdout: "", stderr: "", exitCode: 0 };
  }
  if (normalized === "false") {
    return { stdout: "", stderr: "", exitCode: 1 };
  }

  return {
    stdout: "",
    stderr: `Command '${normalized.split(" ")[0]}' is not available in the browser-safe local sandbox. Try pwd, ls, node --version, npm --version, echo, true, or false.\n`,
    exitCode: 127,
  };
}

export function sandboxStatus() {
  return {
    configured: true,
    provider: "local",
    requiresApiKey: false,
    missing: [],
    description: "Browser-safe local sandbox. No external provider or API key required.",
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
    const result = runLocalCommand(command);
    await sql.query(
      "update sandbox_runs set status = $1, stdout = $2, stderr = $3, exit_code = $4, finished_at = now() where id = $5",
      [result.exitCode === 0 ? "completed" : "failed", result.stdout, result.stderr, result.exitCode, id],
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
