import {
  Check,
  CircleAlert,
  FilePenLine,
  ListChecks,
  LoaderCircle,
  Search,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { AgentOutcome, OutcomeStep } from "@/lib/types";
import { formatRelative } from "@/lib/utils";

type Props = {
  outcomes: AgentOutcome[];
};

export function OutcomePanel({ outcomes }: Props) {
  if (!outcomes.length) {
    return (
      <section className="flex h-full flex-col bg-elevated">
        <header className="flex h-11 items-center border-b border-border px-4">
          <div>
            <p className="text-xs font-medium text-foreground">Outcome</p>
            <p className="text-[0.65rem] text-subtle">Tool trace, files touched, result</p>
          </div>
        </header>
        <div className="flex flex-1 items-center justify-center px-6 text-center">
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            When the agent runs, this log shows every tool call, write, and the final result of the turn.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex h-full min-h-0 flex-col bg-elevated">
      <header className="flex h-11 shrink-0 items-center border-b border-border px-4">
        <div>
          <p className="text-xs font-medium text-foreground">Outcome</p>
          <p className="text-[0.65rem] text-subtle">Latest agent turns</p>
        </div>
      </header>
      <ol className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
        {outcomes.map((outcome) => (
          <li key={outcome.id} className="rounded-xl border border-border bg-surface p-3">
            <div className="mb-2 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm text-foreground">{outcome.request}</p>
                <p className="mt-0.5 font-mono text-[0.65rem] text-subtle">
                  {outcome.provider ?? "Adonabix"}
                  {outcome.model ? ` · ${outcome.model}` : ""}
                  {" · "}
                  {formatRelative(outcome.startedAt)}
                </p>
              </div>
              <StatusBadge status={outcome.status} />
            </div>
            {outcome.steps.length ? (
              <ol className="mb-3 space-y-1.5">
                {outcome.steps.map((step) => (
                  <li key={step.id} className="flex gap-2 text-xs text-muted-foreground">
                    <StepIcon step={step} />
                    <span className="min-w-0">
                      <span className="font-medium text-foreground">{step.name}</span>
                      {step.detail ? (
                        <span className="mt-0.5 block truncate font-mono text-[0.65rem] text-subtle">
                          {step.detail}
                        </span>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ol>
            ) : null}
            {outcome.filesChanged.length ? (
              <p className="mb-2 font-mono text-[0.65rem] text-accent">
                {outcome.filesChanged.join(" · ")}
              </p>
            ) : null}
            {outcome.summary ? (
              <p className="text-sm leading-relaxed text-muted-foreground">{outcome.summary}</p>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}

function StatusBadge({ status }: { status: AgentOutcome["status"] }) {
  if (status === "running") return <Badge variant="warn">Running</Badge>;
  if (status === "error") return <Badge variant="accent">Error</Badge>;
  return <Badge variant="success">Done</Badge>;
}

function StepIcon({ step }: { step: OutcomeStep }) {
  const cls = "mt-0.5 size-3.5 shrink-0";
  if (step.status === "running") return <LoaderCircle className={`${cls} animate-spin text-warn`} />;
  if (step.status === "error") return <CircleAlert className={`${cls} text-danger`} />;
  if (step.kind === "write" || step.kind === "edit") return <FilePenLine className={`${cls} text-accent`} />;
  if (step.kind === "diag") return <ListChecks className={`${cls} text-success`} />;
  if (step.kind === "read") return <Search className={`${cls} text-muted-foreground`} />;
  if (step.kind === "tool") return <Wrench className={`${cls} text-muted-foreground`} />;
  return <Check className={`${cls} text-success`} />;
}
