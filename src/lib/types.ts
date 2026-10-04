export const AGENT_MODES = ["agent", "plan", "build", "edit", "debug"] as const;
export type AgentMode = (typeof AGENT_MODES)[number];

export const GROQ_MODELS = [
  { id: "qwen/qwen3.8-27b", label: "Qwen 3.8 27B", hint: "Best all-round" },
  { id: "llama-3.1-8b-instant", label: "Llama 3.1 8B", hint: "Fastest" },
  { id: "openai/gpt-oss-120b", label: "GPT-OSS 120B", hint: "Long context" },
  { id: "moonshotai/kimi-k2-instruct", label: "Kimi K2", hint: "Coding" },
  { id: "qwen/qwen3-32b", label: "Qwen3 32B", hint: "Reasoning" },
] as const;

export type GroqModelId = (typeof GROQ_MODELS)[number]["id"];

export type ProjectFile = {
  path: string;
  content: string;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  mode?: AgentMode;
};

export type OutcomeStep = {
  id: string;
  kind: "think" | "tool" | "write" | "edit" | "read" | "diag" | "plan";
  name: string;
  detail: string;
  status: "running" | "ok" | "error";
};

export type AgentOutcome = {
  id: string;
  mode: AgentMode;
  request: string;
  status: "running" | "success" | "error";
  steps: OutcomeStep[];
  filesChanged: string[];
  summary: string;
  startedAt: string;
  finishedAt?: string;
  provider?: string;
  model?: string;
};

export type Project = {
  id: string;
  name: string;
  files: ProjectFile[];
  messages: ChatMessage[];
  outcomes: AgentOutcome[];
  updatedAt: string;
};

export type AgentEvent =
  | { type: "status"; provider: string; model: string }
  | { type: "content"; text: string }
  | {
      type: "tool";
      id: string;
      name: string;
      status: "start" | "end";
      detail?: string;
      ok?: boolean;
    }
  | { type: "file"; action: "write" | "edit" | "delete"; path: string; content?: string }
  | { type: "outcome"; summary: string; filesChanged: string[] }
  | { type: "error"; message: string }
  | { type: "done" };

export type AgentTurnInput = {
  mode: AgentMode;
  request: string;
  files: ProjectFile[];
  history: Array<{ role: "user" | "assistant"; content: string }>;
  model?: string;
  groqKey?: string;
};
