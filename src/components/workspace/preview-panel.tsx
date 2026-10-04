import { useMemo } from "react";
import { Laptop, RefreshCw, Smartphone, Tablet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildPreviewHtml } from "@/lib/preview-html";
import type { ProjectFile } from "@/lib/types";
import { cn } from "@/lib/utils";

type Device = "desktop" | "tablet" | "mobile";

type Props = {
  files: ProjectFile[];
  device: Device;
  reloadKey: number;
  onDevice: (device: Device) => void;
  onReload: () => void;
};

export function PreviewPanel({ files, device, reloadKey, onDevice, onReload }: Props) {
  const html = useMemo(() => buildPreviewHtml(files), [files, reloadKey]);
  const width = device === "mobile" ? 390 : device === "tablet" ? 768 : "100%";

  return (
    <section className="flex h-full min-h-0 flex-col bg-surface">
      <header className="flex h-11 shrink-0 items-center justify-between border-b border-border px-3">
        <div>
          <p className="text-xs font-medium text-foreground">Preview</p>
          <p className="text-[0.65rem] text-subtle">Live render of index.html</p>
        </div>
        <div className="flex items-center gap-1">
          {(
            [
              ["desktop", Laptop],
              ["tablet", Tablet],
              ["mobile", Smartphone],
            ] as const
          ).map(([id, Icon]) => (
            <Button
              key={id}
              type="button"
              size="icon-sm"
              variant={device === id ? "secondary" : "ghost"}
              onClick={() => onDevice(id)}
              aria-label={id}
            >
              <Icon className="size-3.5" />
            </Button>
          ))}
          <Button type="button" size="icon-sm" variant="ghost" onClick={onReload} aria-label="Reload preview">
            <RefreshCw className="size-3.5" />
          </Button>
        </div>
      </header>
      <div className="flex min-h-0 flex-1 items-stretch justify-center overflow-auto bg-[linear-gradient(180deg,#0e0e11,var(--color-bg))] p-3">
        <div
          className={cn(
            "h-full overflow-hidden rounded-lg bg-paper shadow-[var(--shadow-border)]",
            device === "desktop" ? "w-full" : "mx-auto",
          )}
          style={{ width, maxWidth: "100%" }}
        >
          <iframe
            key={reloadKey}
            title="Site preview"
            sandbox="allow-scripts allow-forms allow-modals"
            srcDoc={html}
            className="h-full w-full border-0 bg-paper"
          />
        </div>
      </div>
    </section>
  );
}
