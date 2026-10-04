import { FileCode2, FilePlus2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { languageFor } from "@/lib/starter";
import type { ProjectFile } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  files: ProjectFile[];
  selectedPath: string;
  onSelect: (path: string) => void;
  onChange: (content: string) => void;
  onAdd: () => void;
  onDelete: () => void;
};

export function CodePanel({ files, selectedPath, onSelect, onChange, onAdd, onDelete }: Props) {
  const file = files.find((item) => item.path === selectedPath) ?? files[0];
  const value = file?.content ?? "";
  const lines = Math.max(1, value.split("\n").length);

  return (
    <section className="flex h-full min-h-0 bg-bg">
      <aside className="flex w-44 shrink-0 flex-col border-r border-border bg-elevated">
        <div className="flex h-11 items-center justify-between border-b border-border px-3">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.14em] text-subtle">Files</p>
          <Button type="button" size="icon-sm" variant="ghost" onClick={onAdd} aria-label="New file">
            <FilePlus2 className="size-3.5" />
          </Button>
        </div>
        <ul className="min-h-0 flex-1 overflow-y-auto p-1.5">
          {files.map((item) => (
            <li key={item.path}>
              <button
                type="button"
                onClick={() => onSelect(item.path)}
                className={cn(
                  "flex h-9 w-full items-center gap-2 rounded-md px-2 text-left font-mono text-xs",
                  item.path === file?.path
                    ? "bg-surface-2 text-foreground"
                    : "text-muted-foreground hover:bg-surface hover:text-foreground",
                )}
              >
                <FileCode2 className="size-3.5 shrink-0" />
                <span className="truncate">{item.path}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-11 items-center justify-between border-b border-border px-3">
          <p className="truncate font-mono text-xs text-muted-foreground">
            {file?.path ?? "No file"}
            <span className="ml-2 text-subtle">{languageFor(file?.path ?? "")}</span>
          </p>
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            onClick={onDelete}
            disabled={!file || files.length < 2}
            aria-label="Delete file"
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <div
            aria-hidden="true"
            className="select-none border-r border-border bg-elevated px-2 py-3 text-right font-mono text-[11px] leading-5 text-subtle"
          >
            {Array.from({ length: lines }, (_, i) => (
              <div key={i} className="tabular-nums">
                {i + 1}
              </div>
            ))}
          </div>
          <textarea
            value={value}
            spellCheck={false}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Tab") {
                event.preventDefault();
                const el = event.currentTarget;
                const start = el.selectionStart;
                const end = el.selectionEnd;
                const next = `${value.slice(0, start)}  ${value.slice(end)}`;
                onChange(next);
                requestAnimationFrame(() => {
                  el.selectionStart = el.selectionEnd = start + 2;
                });
              }
            }}
            className="min-h-0 flex-1 resize-none bg-bg px-3 py-3 font-mono text-[12px] leading-5 text-foreground outline-none"
            aria-label={`Edit ${file?.path ?? "file"}`}
          />
        </div>
      </div>
    </section>
  );
}
