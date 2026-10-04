import { env } from "@/lib/env.server";

const DEFAULT_BASE_URL = "https://api.mem0.ai";

type MemoryMessage = { role: "user" | "assistant"; content: string };

function config() {
  const apiKey = env("MEM0_API_KEY");
  if (!apiKey) return null;
  return {
    apiKey,
    baseUrl: (env("MEM0_BASE_URL") || DEFAULT_BASE_URL).replace(/\/$/, ""),
    organizationId: env("MEM0_ORG_ID"),
    projectId: env("MEM0_PROJECT_ID"),
  };
}

function headers(value: ReturnType<typeof config>) {
  if (!value) return {};
  return {
    Authorization: `Token ${value.apiKey}`,
    "Content-Type": "application/json",
    ...(value.organizationId ? { "X-Organization-ID": value.organizationId } : {}),
    ...(value.projectId ? { "X-Project-ID": value.projectId } : {}),
  };
}

export function mem0Status() {
  const value = config();
  return {
    configured: Boolean(value),
    baseUrl: value?.baseUrl ?? null,
    projectConfigured: Boolean(value?.projectId),
  };
}

export async function searchMemories(userId: string, query: string, signal?: AbortSignal) {
  const value = config();
  if (!value || !query.trim()) return [];

  try {
    const response = await fetch(`${value.baseUrl}/v1/memories/search/`, {
      method: "POST",
      headers: headers(value),
      body: JSON.stringify({ query: query.slice(0, 2_000), user_id: userId, limit: 8 }),
      signal,
    });
    if (!response.ok) return [];
    const json = (await response.json()) as { memories?: Array<{ memory?: string; score?: number }> };
    return (json.memories ?? []).filter((item) => item.memory).map((item) => item.memory as string);
  } catch {
    // Memory is an enhancement; a Mem0 outage must never take down a coding turn.
    return [];
  }
}

export async function addMemory(userId: string, messages: MemoryMessage[]) {
  const value = config();
  if (!value || messages.length === 0) return;
  await fetch(`${value.baseUrl}/v1/memories/`, {
    method: "POST",
    headers: headers(value),
    body: JSON.stringify({
      messages: messages.map((message) => ({ role: message.role, content: message.content.slice(0, 8_000) })),
      user_id: userId,
      ...(value.organizationId ? { organization_id: value.organizationId } : {}),
      ...(value.projectId ? { project_id: value.projectId } : {}),
    }),
  }).catch(() => undefined);
}
