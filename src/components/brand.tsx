import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid size-7 place-items-center rounded-[9px_9px_9px_3px] bg-accent text-accent-foreground",
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 16 16" className="size-3.5" fill="none">
        <path
          d="M3.2 13.2 8 2.8l4.8 10.4M5.1 9.4h5.8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-foreground">
      <BrandMark />
      <span className={cn("font-display font-medium tracking-tight", compact ? "text-base" : "text-lg")}>
        Adonabix
      </span>
    </span>
  );
}
