import { useEffect, useRef } from "react";
import { ArrowUp, LoaderCircle, Square } from "lucide-react";
import { Markdown } from "@/components/markdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { Textarea } from "@/components/ui/textarea";
import { MODE_META } from "@/lib/project-store";
import type { AgentMode, ChatMessage } from "@/lib/types";
import { AGENT_MODES, GROQ_MODELS } from "@/lib/types";
import { cn, formatTime } from "@/lib/utils";

type Props = {
  messages: ChatMessage[];
  streaming: boolean;
  error: string;
  draft: string;
  mode: AgentMode;
  model: string;
  onDraft: (value: string) => void;
  onMode: (mode: AgentMode) => void;
  onModel: (model: string) => void;
  onSend: () => void;
  onStop: () => void;
};

export function ChatPanel({
  messages,
  streaming,
  error,
  draft,
  mode,
  model,
  onDraft,
  onMode,
  onModel,
  onSend,
  onStop,
}: Props) {
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, streaming]);

  return (
    <section className="flex h-full min-h-0 flex-col bg-elevated">
      <header className="flex h-11 shrink-0 items-center justify-between border-b border-border px-4">
        <div>
          <p className="text-xs font-medium tracking-wide text-foreground">Agent</p>
          <p className="text-[0.65rem] text-subtle">Groq-powered coding partner</p>
        </div>
        <label className="flex items-center gap-2 text-[0.65rem] text-muted-foreground">
          Model
          <select
            value={model}
            onChange={(event) => onModel(event.target.value)}
            className="h-8 rounded-md border border-border bg-surface px-2 font-mono text-[0.65rem] text-foreground"
          >
            {GROQ_MODELS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </header>

      <div ref={scroller} className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
        {messages.length === 0 ? (
          <EmptyChat mode={mode} onPick={onDraft} />
        ) : (
          <ol className="space-y-5">
            {messages.map((message) => (
              <li key={message.id} className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[0.65rem] font-medium uppercase tracking-[0.12em] text-subtle">
                    {message.role === "user" ? "You" : "Adonabix"}
                  </span>
                  {message.mode ? (
                    <Badge variant="outline">{MODE_META[message.mode].label}</Badge>
                  ) : null}
                  <span className="ml-auto font-mono text-[0.65rem] tabular-nums text-subtle">
                    {formatTime(message.createdAt)}
                  </span>
                </div>
                {message.role === "user" ? (
                  <p className="rounded-xl rounded-tl-sm bg-surface-2 px-3.5 py-2.5 text-sm leading-relaxed text-foreground">
                    {message.content}
                  </p>
                ) : message.content ? (
                  <Markdown text={message.content} />
                ) : streaming ? (
                  <p className="chat-shimmer text-sm">Thinking through the request</p>
                ) : (
                  <p className="text-sm text-muted-foreground">No reply yet.</p>
                )}
              </li>
            ))}
          </ol>
        )}
      </div>

      <footer className="shrink-0 border-t border-border p-3">
        {error ? (
          <p className="mb-2 rounded-md border border-danger/30 bg-danger/10 px-3 py-2 text-xs text-danger">
            {error}
          </p>
        ) : null}
        <div className="rounded-xl border border-border bg-surface p-2 shadow-[var(--shadow-border)]">
          <div className="mb-2 flex flex-wrap gap-1">
            {AGENT_MODES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onMode(item)}
                className={cn(
                  "h-8 rounded-md px-2.5 text-xs font-medium",
                  mode === item
                    ? "bg-paper text-ink"
                    : "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
                )}
              >
                {MODE_META[item].label}
              </button>
            ))}
          </div>
          <Textarea
            value={draft}
            onChange={(event) => onDraft(event.target.value)}
            placeholder={MODE_META[mode].hint}
            rows={3}
            className="min-h-[72px] resize-none border-0 p-2 shadow-none focus-visible:ring-0"
            onKeyDown={(event) => {
              if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                onSend();
              }
            }}
          />
          <div className="flex items-center justify-between px-1 pb-0.5 pt-1">
            <p className="hidden items-center gap-1 text-[0.65rem] text-subtle sm:flex">
              <Kbd>⌘</Kbd>
              <Kbd>↵</Kbd>
              send
            </p>
            {streaming ? (
              <Button type="button" size="sm" variant="outline" onClick={onStop}>
                <Square className="size-3.5" />
                Stop
              </Button>
            ) : (
              <Button
                type="button"
                size="sm"
                variant="terracotta"
                disabled={!draft.trim()}
                onClick={onSend}
              >
                {draft.trim() ? <ArrowUp className="size-3.5" /> : <LoaderCircle className="size-3.5" />}
                Run
              </Button>
            )}
          </div>
        </div>
      </footer>
    </section>
  );
}

function EmptyChat({ mode, onPick }: { mode: AgentMode; onPick: (value: string) => void }) {
  const seeds = [
    "A tasting-menu restaurant in Lisbon with a reservation note",
    "A film photographer’s archive with large stills and quiet type",
    "A waitlist page for a compact mechanical keyboard",
    "Debug the current page: spacing, contrast, and mobile layout",
  ];
  return (
    <div className="mx-auto flex max-w-sm flex-col gap-4 pt-8">
      <p className="font-display text-2xl leading-tight tracking-tight text-foreground">
        Tell the agent what to make.
      </p>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {MODE_META[mode].hint}. It can read files, write HTML/CSS/JS, run diagnostics, and stream a live preview.
      </p>
      <ul className="space-y-2">
        {seeds.map((seed) => (
          <li key={seed}>
            <button
              type="button"
              onClick={() => onPick(seed)}
              className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-left text-sm text-muted-foreground hover:border-accent/40 hover:text-foreground"
            >
              {seed}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
