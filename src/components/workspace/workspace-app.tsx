import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  Download,
  Eye,
  FolderOpen,
  ListChecks,
  MessageSquare,
  Plus,
  Settings,
  Trash2,
} from "lucide-react";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ChatPanel } from "@/components/workspace/chat-panel";
import { CodePanel } from "@/components/workspace/code-panel";
import { OutcomePanel } from "@/components/workspace/outcome-panel";
import { PreviewPanel } from "@/components/workspace/preview-panel";
import { applyFileWrites } from "@/lib/preview-html";
import { useProjectStore } from "@/lib/project-store";
import type { AgentEvent, AgentMode, AgentOutcome, ChatMessage, OutcomeStep } from "@/lib/types";
import { uid } from "@/lib/utils";
import { cn } from "@/lib/utils";

type MobileTab = "chat" | "code" | "preview" | "outcome";
type StageTab = "preview" | "code" | "outcome";
type Device = "desktop" | "tablet" | "mobile";

export function WorkspaceApp({ initialPrompt }: { initialPrompt?: string }) {
  const navigate = useNavigate();
  const store = useProjectStore();
  const project = store.active();
  const hydrated = store.hasHydrated;
  const [selectedPath, setSelectedPath] = useState("index.html");
  const [mode, setMode] = useState<AgentMode>("agent");
  const [draft, setDraft] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState("");
  const [mobileTab, setMobileTab] = useState<MobileTab>("chat");
  const [stageTab, setStageTab] = useState<StageTab>("preview");
  const [device, setDevice] = useState<Device>("desktop");
  const [reloadKey, setReloadKey] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [renameOpen, setRenameOpen] = useState(false);
  const [renameValue, setRenameValue] = useState("");
  const [newFileOpen, setNewFileOpen] = useState(false);
  const [newFilePath, setNewFilePath] = useState("");
  const [agentReady, setAgentReady] = useState<boolean | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const startedPrompt = useRef("");

  useEffect(() => {
    const finish = () => {
      useProjectStore.setState({ hasHydrated: true });
      useProjectStore.getState().hydrate();
    };
    if (useProjectStore.persist.hasHydrated()) {
      finish();
      return;
    }
    const unsub = useProjectStore.persist.onFinishHydration(finish);
    const timeout = window.setTimeout(finish, 80);
    return () => {
      unsub();
      window.clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    void fetch("/api/agent/status")
      .then((res) => res.json())
      .then((data: { groqConfigured?: boolean; ready?: boolean }) => {
        const groqLocal = Boolean(useProjectStore.getState().settings.groqKey);
        setAgentReady(Boolean(data.groqConfigured || groqLocal));
      })
      .catch(() => setAgentReady(false));
  }, []);

  useEffect(() => {
    if (!project) return;
    if (!project.files.some((file) => file.path === selectedPath)) {
      setSelectedPath(project.files[0]?.path ?? "index.html");
    }
  }, [project, selectedPath]);

  const send = async (request: string, turnMode: AgentMode) => {
    const current = useProjectStore.getState().active();
    if (!current || streaming) return;
    const clean = request.trim();
    if (!clean) return;

    setError("");
    setDraft("");
    setMode(turnMode);
    setStreaming(true);
    setStageTab("outcome");

    const userMessage: ChatMessage = {
      id: uid(),
      role: "user",
      content: clean,
      createdAt: new Date().toISOString(),
      mode: turnMode,
    };
    const assistantMessage: ChatMessage = {
      id: uid(),
      role: "assistant",
      content: "",
      createdAt: new Date().toISOString(),
      mode: turnMode,
    };
    const outcome: AgentOutcome = {
      id: uid(),
      mode: turnMode,
      request: clean,
      status: "running",
      steps: [],
      filesChanged: [],
      summary: "",
      startedAt: new Date().toISOString(),
    };

    useProjectStore.getState().addMessages(current.id, [userMessage, assistantMessage]);
    useProjectStore.getState().upsertOutcome(current.id, outcome);

    const controller = new AbortController();
    abortRef.current = controller;
    let assistantText = "";
    let files = current.files.slice();
    const steps: OutcomeStep[] = [];
    const filesChanged: string[] = [];
    let provider = "Groq";
    let model = useProjectStore.getState().settings.model;

    const patchOutcome = (partial: Partial<AgentOutcome>) => {
      useProjectStore.getState().upsertOutcome(current.id, {
        ...outcome,
        steps: [...steps],
        filesChanged: [...filesChanged],
        provider,
        model,
        ...partial,
      });
    };

    try {
      const settings = useProjectStore.getState().settings;
      const response = await fetch("/api/agent/turn", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "text/event-stream" },
        body: JSON.stringify({
          mode: turnMode,
          request: clean,
          files: files.slice(0, 24).map(({ path, content }) => ({
            path,
            content: content.slice(0, 40_000),
          })),
          history: current.messages.slice(-16).map(({ role, content }) => ({ role, content })),
          model: settings.model,
          groqKey: settings.groqKey || undefined,
        }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        const payload = await response.json().catch(() => ({ error: "" }));
        throw new Error(
          typeof payload.error === "string" && payload.error
            ? payload.error
            : `The agent could not respond (${response.status}).`,
        );
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let finished = false;

      const handleEvent = (event: AgentEvent) => {
        if (event.type === "status") {
          provider = event.provider;
          model = event.model;
          patchOutcome({});
        }
        if (event.type === "content") {
          assistantText += event.text;
          useProjectStore.getState().updateMessage(current.id, assistantMessage.id, assistantText);
        }
        if (event.type === "file") {
          if (event.action === "delete") {
            files = files.filter((file) => file.path !== event.path);
          } else if (event.content != null) {
            files = applyFileWrites(files, [{ path: event.path, content: event.content }]);
          }
          if (!filesChanged.includes(event.path)) filesChanged.push(event.path);
          useProjectStore.getState().setFiles(current.id, files);
          setReloadKey((key) => key + 1);
        }
        if (event.type === "tool") {
          if (event.status === "start") {
            steps.push({
              id: event.id,
              kind: kindForTool(event.name),
              name: event.name,
              detail: event.detail ?? "",
              status: "running",
            });
          } else {
            const step = steps.find((item) => item.id === event.id);
            if (step) {
              step.status = event.ok === false ? "error" : "ok";
              step.detail = event.detail ?? step.detail;
            }
          }
          patchOutcome({});
        }
        if (event.type === "outcome") {
          patchOutcome({
            summary: event.summary,
            filesChanged: event.filesChanged,
            status: "success",
            finishedAt: new Date().toISOString(),
          });
          if (event.filesChanged.length) setStageTab("preview");
        }
        if (event.type === "error") {
          setError(event.message);
          patchOutcome({
            status: "error",
            summary: event.message,
            finishedAt: new Date().toISOString(),
          });
        }
        if (event.type === "done") finished = true;
      };

      while (!finished) {
        const { value, done } = await reader.read();
        buffer += decoder.decode(value || new Uint8Array(), { stream: !done });
        const chunks = buffer.split(/\r?\n\r?\n/);
        buffer = chunks.pop() || "";
        for (const chunk of chunks) {
          const data = chunk
            .split(/\r?\n/)
            .filter((line) => line.startsWith("data:"))
            .map((line) => line.slice(5).trim())
            .join("\n");
          if (!data) continue;
          try {
            handleEvent(JSON.parse(data) as AgentEvent);
          } catch {
            /* ignore keep-alives */
          }
        }
        if (done) break;
      }
    } catch (caught) {
      if ((caught as { name?: string }).name === "AbortError") {
        patchOutcome({
          status: "error",
          summary: "Stopped.",
          finishedAt: new Date().toISOString(),
        });
      } else {
        const message =
          caught instanceof Error ? caught.message : "Something went wrong. Please try again.";
        setError(message);
        patchOutcome({
          status: "error",
          summary: message,
          finishedAt: new Date().toISOString(),
        });
        if (!assistantText) {
          useProjectStore.getState().patch(current.id, {
            messages: [...current.messages, userMessage],
          });
        }
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  };

  useEffect(() => {
    if (!hydrated || !initialPrompt) return;
    if (startedPrompt.current === initialPrompt) return;
    startedPrompt.current = initialPrompt;
    void send(initialPrompt, "agent");
    void navigate({ to: "/workspace", search: {}, replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, initialPrompt]);

  const exportProject = () => {
    if (!project) return;
    const blob = new Blob([JSON.stringify(project, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${project.name.replace(/\s+/g, "-").toLowerCase()}.adonabix.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabs = useMemo(
    () =>
      [
        { id: "chat" as const, label: "Chat", icon: MessageSquare },
        { id: "code" as const, label: "Code", icon: FolderOpen },
        { id: "preview" as const, label: "Preview", icon: Eye },
        { id: "outcome" as const, label: "Outcome", icon: ListChecks },
      ] as const,
    [],
  );

  if (!hydrated || !project) {
    return (
      <div className="grid min-h-dvh place-items-center bg-bg text-sm text-muted-foreground">
        Opening workspace…
      </div>
    );
  }

  const stage =
    stageTab === "code" ? (
      <CodePanel
        files={project.files}
        selectedPath={selectedPath}
        onSelect={setSelectedPath}
        onChange={(content) =>
          useProjectStore.getState().setFileContent(project.id, selectedPath, content)
        }
        onAdd={() => {
          setNewFilePath("");
          setNewFileOpen(true);
        }}
        onDelete={() => {
          if (project.files.length < 2) return;
          useProjectStore.getState().deleteFile(project.id, selectedPath);
        }}
      />
    ) : stageTab === "outcome" ? (
      <OutcomePanel outcomes={project.outcomes ?? []} />
    ) : (
      <PreviewPanel
        files={project.files}
        device={device}
        reloadKey={reloadKey}
        onDevice={setDevice}
        onReload={() => setReloadKey((key) => key + 1)}
      />
    );

  return (
    <div className="flex h-dvh min-h-0 flex-col bg-bg text-foreground">
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-elevated px-3">
        <button
          type="button"
          onClick={() => navigate({ to: "/", search: {} })}
          className="hidden sm:block"
          aria-label="Back to home"
        >
          <Brand compact />
        </button>
        <span className="hidden h-5 w-px bg-border sm:block" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="max-w-48 justify-between">
              <span className="truncate">{project.name}</span>
              <ChevronDown className="size-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Projects</DropdownMenuLabel>
            {store.projects.map((item) => (
              <DropdownMenuItem key={item.id} onSelect={() => store.switchTo(item.id)}>
                {item.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={() => {
                store.create(`Site ${store.projects.length + 1}`);
              }}
            >
              <Plus className="size-3.5" />
              New project
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                setRenameValue(project.name);
                setRenameOpen(true);
              }}
            >
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                if (store.projects.length < 2) {
                  store.create("Untitled site");
                }
                store.remove(project.id);
              }}
            >
              <Trash2 className="size-3.5" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <span className="ml-auto hidden text-[0.65rem] text-subtle sm:inline">Saved in this browser</span>
        {!store.settings.groqKey && agentReady === false ? (
          <Button type="button" size="sm" variant="terracotta" onClick={() => setSettingsOpen(true)}>
            Add Groq key
          </Button>
        ) : !store.settings.groqKey ? (
          <Button type="button" size="sm" variant="outline" onClick={() => setSettingsOpen(true)}>
            Groq key
          </Button>
        ) : null}
        <Button type="button" size="icon-sm" variant="ghost" onClick={exportProject} aria-label="Export">
          <Download className="size-4" />
        </Button>
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          onClick={() => setSettingsOpen(true)}
          aria-label="Settings"
        >
          <Settings className="size-4" />
        </Button>
      </header>

      <div className="hidden min-h-0 flex-1 lg:grid lg:grid-cols-[minmax(320px,380px)_minmax(0,1fr)]">
        <div className="min-h-0 border-r border-border">
          <ChatPanel
            messages={project.messages}
            streaming={streaming}
            error={error}
            draft={draft}
            mode={mode}
            model={store.settings.model}
            onDraft={setDraft}
            onMode={setMode}
            onModel={(value) => store.setSettings({ model: value })}
            onSend={() => void send(draft, mode)}
            onStop={() => abortRef.current?.abort()}
          />
        </div>
        <div className="flex min-h-0 flex-col">
          <div className="flex h-11 items-center gap-1 border-b border-border bg-elevated px-2">
            {(
              [
                ["preview", "Preview"],
                ["code", "Code"],
                ["outcome", "Outcome"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setStageTab(id)}
                className={cn(
                  "h-8 rounded-md px-3 text-xs font-medium",
                  stageTab === id
                    ? "bg-surface-2 text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="min-h-0 flex-1">{stage}</div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col lg:hidden">
        <div className="min-h-0 flex-1">
          {mobileTab === "chat" ? (
            <ChatPanel
              messages={project.messages}
              streaming={streaming}
              error={error}
              draft={draft}
              mode={mode}
              model={store.settings.model}
              onDraft={setDraft}
              onMode={setMode}
              onModel={(value) => store.setSettings({ model: value })}
              onSend={() => void send(draft, mode)}
              onStop={() => abortRef.current?.abort()}
            />
          ) : mobileTab === "code" ? (
            <CodePanel
              files={project.files}
              selectedPath={selectedPath}
              onSelect={setSelectedPath}
              onChange={(content) =>
                useProjectStore.getState().setFileContent(project.id, selectedPath, content)
              }
              onAdd={() => {
                setNewFilePath("");
                setNewFileOpen(true);
              }}
              onDelete={() => {
                if (project.files.length < 2) return;
                useProjectStore.getState().deleteFile(project.id, selectedPath);
              }}
            />
          ) : mobileTab === "outcome" ? (
            <OutcomePanel outcomes={project.outcomes ?? []} />
          ) : (
            <PreviewPanel
              files={project.files}
              device={device}
              reloadKey={reloadKey}
              onDevice={setDevice}
              onReload={() => setReloadKey((key) => key + 1)}
            />
          )}
        </div>
        <nav className="grid h-14 grid-cols-4 border-t border-border bg-elevated">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setMobileTab(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 text-[0.65rem]",
                mobileTab === tab.id ? "text-foreground" : "text-muted-foreground",
              )}
            >
              <tab.icon className="size-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agent settings</DialogTitle>
            <DialogDescription>
              Create a free key at console.groq.com. Paste it here (starts with gsk_). It stays in this browser and is sent only with your agent turns.
            </DialogDescription>
          </DialogHeader>
          <label className="grid gap-1.5 text-sm">
            Groq API key
            <Input
              type="password"
              autoComplete="off"
              placeholder="gsk_…"
              value={store.settings.groqKey}
              onChange={(event) => store.setSettings({ groqKey: event.target.value })}
            />
          </label>
          <p className="text-xs leading-relaxed text-muted-foreground">
            The key stays in this browser and is sent only to this app’s server for your turns. Never share it in chat.
          </p>
        </DialogContent>
      </Dialog>

      <Dialog open={renameOpen} onOpenChange={setRenameOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename project</DialogTitle>
          </DialogHeader>
          <Input value={renameValue} onChange={(event) => setRenameValue(event.target.value)} />
          <Button
            type="button"
            onClick={() => {
              if (renameValue.trim()) store.rename(project.id, renameValue.trim());
              setRenameOpen(false);
            }}
          >
            Save
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={newFileOpen} onOpenChange={setNewFileOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New file</DialogTitle>
            <DialogDescription>Use a path like about.html or theme.css.</DialogDescription>
          </DialogHeader>
          <Input
            value={newFilePath}
            onChange={(event) => setNewFilePath(event.target.value)}
            placeholder="about.html"
          />
          <Button
            type="button"
            onClick={() => {
              const path = newFilePath.trim().replace(/^\//, "");
              if (path) {
                store.addFile(project.id, path, "");
                setSelectedPath(path);
              }
              setNewFileOpen(false);
            }}
          >
            Create
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function kindForTool(name: string): OutcomeStep["kind"] {
  if (name === "write_file") return "write";
  if (name === "str_replace") return "edit";
  if (name === "read_file" || name === "list_files" || name === "grep") return "read";
  if (name === "diagnostics") return "diag";
  return "tool";
}
