import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Eye, FolderOpen, ListChecks, MessageSquare } from "lucide-react";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useProjectStore } from "@/lib/project-store";

const EXAMPLES = [
  "A tasting-menu restaurant in Lisbon with a reservation note and a wine list",
  "A quiet archive for a film photographer, large stills, no clutter",
  "A waitlist page for a compact mechanical keyboard in matte aluminum",
];

export function HomePage() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");

  const start = (text: string) => {
    const value = text.trim();
    if (!value) {
      void navigate({ to: "/workspace", search: {} });
      return;
    }
    const store = useProjectStore.getState();
    if (!store.active()) store.hydrate();
    const active = store.active();
    if (!active || active.messages.length > 0) {
      store.create(value.slice(0, 42));
    } else {
      store.rename(active.id, value.slice(0, 42));
    }
    void navigate({ to: "/workspace", search: { prompt: value } });
  };

  return (
    <div className="min-h-dvh bg-bg text-foreground">
      <header className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
        <Brand />
        <nav className="flex items-center gap-5 text-sm text-muted-foreground">
          <a href="#how" className="hidden hover:text-foreground sm:inline">
            How it works
          </a>
          <Button size="sm" onClick={() => start("")}>
            Open workspace
            <ArrowRight className="size-3.5" />
          </Button>
        </nav>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:pt-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-accent" />
            Groq coding agent
          </p>
          <h1 className="mt-6 max-w-xl font-display text-[clamp(2.75rem,7vw,5.4rem)] font-medium leading-[0.95] tracking-[-0.04em]">
            Describe the site.
            <span className="italic text-accent"> Watch it land.</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            Adonabix is a login-free coding workspace. Chat with a Groq agent that plans, writes, debugs, and
            previews a real website — with an outcome log of every tool it used.
          </p>
          <div className="mt-7 rounded-xl border border-border bg-elevated p-3 shadow-[var(--shadow-border)]">
            <Textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="A calm portfolio for a ceramic artist, with a gallery and a note about commissions…"
              rows={3}
              className="min-h-[88px] resize-none border-0 bg-transparent p-2 shadow-none focus-visible:ring-0"
              onKeyDown={(event) => {
                if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) start(prompt);
              }}
            />
            <div className="flex items-center justify-between px-1 pt-1">
              <p className="hidden text-[0.65rem] text-subtle sm:block">No account. Projects stay in this browser.</p>
              <Button
                type="button"
                variant="terracotta"
                size="sm"
                disabled={!prompt.trim()}
                onClick={() => start(prompt)}
              >
                Run agent
                <ArrowRight className="size-3.5" />
              </Button>
            </div>
          </div>
          <ul className="mt-4 flex flex-col gap-2">
            {EXAMPLES.map((example) => (
              <li key={example}>
                <button
                  type="button"
                  onClick={() => setPrompt(example)}
                  className="text-left text-sm text-muted-foreground hover:text-foreground"
                >
                  {example}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="absolute inset-8 rounded-full bg-[radial-gradient(circle,rgb(196_92_62/0.18),transparent_68%)]" />
          <div className="relative overflow-hidden rounded-xl border border-border bg-elevated shadow-[var(--shadow-border)]">
            <div className="flex h-10 items-center gap-1.5 border-b border-border px-3">
              <i className="size-1.5 rounded-full bg-subtle" />
              <i className="size-1.5 rounded-full bg-subtle" />
              <i className="size-1.5 rounded-full bg-subtle" />
              <span className="ml-2 font-mono text-[0.65rem] text-subtle">preview · index.html</span>
            </div>
            <div className="space-y-3 bg-paper px-8 py-10 text-ink">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent">Morrow ceramics</p>
              <p className="font-display text-4xl leading-none tracking-tight">Objects for slower days.</p>
              <p className="max-w-[220px] text-sm leading-relaxed text-muted-foreground">
                Hand-thrown forms made to be held, used, and kept close.
              </p>
              <span className="inline-block rounded-md bg-ink px-3 py-2 text-xs font-medium text-paper">
                Explore the collection
              </span>
            </div>
          </div>
          <div className="absolute -left-4 bottom-10 hidden w-56 rounded-lg border border-border bg-elevated p-3 shadow-[var(--shadow-border)] sm:block">
            <p className="mb-1 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-subtle">Agent</p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Wrote index.html and styles.css. Preview is live — check the gallery spacing next.
            </p>
          </div>
        </div>
      </section>

      <section id="how" className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: MessageSquare, title: "Chat to control", body: "A proper composer, not a prompt box. Plan, build, edit, or debug in one thread." },
            { icon: FolderOpen, title: "Files you own", body: "HTML, CSS, and JS stay editable. Export whenever you want to take the work elsewhere." },
            { icon: Eye, title: "Live preview", body: "The site renders as the agent writes it. Flip desktop, tablet, and mobile frames." },
            { icon: ListChecks, title: "Outcome log", body: "Every tool call, write, and diagnostic is recorded so you can see what the agent actually did." },
          ].map((item) => (
            <article key={item.title} className="rounded-xl border border-border bg-elevated p-5">
              <item.icon className="mb-6 size-4 text-accent" />
              <h2 className="font-display text-xl tracking-tight">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl items-center justify-between px-5 py-8 text-xs text-subtle">
        <span>Adonabix</span>
        <span>Local-first coding agent. Powered by Groq.</span>
      </footer>
    </div>
  );
}
