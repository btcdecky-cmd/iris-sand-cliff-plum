# Adonabix

A login-free AI coding workspace. Describe a website in plain language; a Groq-powered agent plans, writes, edits, debugs, and previews it in real time.

Adonabix is the rebuilt, production-ready version of this repo: a full coding agent (inspired by [OpenCode](https://github.com/opencode-ai/opencode)) with a chat composer in the spirit of [chat-langchain](https://github.com/langchain-ai/chat-langchain), plus a live **Preview** and an **Outcome** log of every tool the agent used.

## What you can do

- **Chat to control the site.** Modes: Agent, Plan, Build, Edit, Debug.
- **Watch a live preview** of `index.html` (desktop / tablet / mobile frames).
- **Inspect the outcome** — tool calls, files written, diagnostics, final summary.
- **Edit the files yourself.** HTML, CSS, and JS stay in the browser. Export anytime.
- **No account.** Projects persist in local storage on this device.

## Groq API

The agent speaks OpenAI-compatible chat completions against **Groq**.

1. Create a key at [console.groq.com](https://console.groq.com).
2. Set `GROQ_API_KEY` in the server environment, **or** paste a `gsk_…` key in workspace Settings.
3. Pick a model in the chat header (Llama 3.3 70B is the default).

The key is never written to source, never logged, and never returned to the client.

## Agent tools

The coding agent can:

| Tool | Purpose |
| --- | --- |
| `list_files` | Inventory the project |
| `read_file` | Open a file before editing |
| `write_file` | Create or rewrite a file |
| `str_replace` | Surgical edit |
| `delete_file` | Remove a file |
| `grep` | Search contents |
| `diagnostics` | Lightweight HTML/CSS checks |

Turns are streamed as server-sent events. The Outcome panel is the source of truth for what actually changed.

## Stack

- TanStack Start + React 19
- Tailwind v4
- Zustand (local-first projects)
- Groq Chat Completions (`llama-3.3-70b-versatile` and friends)

## Run

```bash
npm install
GROQ_API_KEY=gsk_… npm run dev
```

The app listens on port 8080. Open the workspace, describe a site, and watch Preview + Outcome update as the agent works.

## Privacy

Projects, chat, and an optional Groq key live in this browser (`localStorage`). Nothing is stored on a server besides the in-flight agent request.
