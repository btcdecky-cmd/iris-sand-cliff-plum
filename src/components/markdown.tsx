import { cn } from "@/lib/utils";

type Block =
  | { kind: "p"; text: string }
  | { kind: "code"; lang: string; text: string }
  | { kind: "ul"; items: string[] };

function parseBlocks(source: string): Block[] {
  const blocks: Block[] = [];
  const parts = source.split(/```/);
  parts.forEach((part, index) => {
    if (index % 2 === 1) {
      const nl = part.indexOf("\n");
      const lang = (nl === -1 ? part : part.slice(0, nl)).trim();
      const text = nl === -1 ? "" : part.slice(nl + 1).replace(/\n$/, "");
      blocks.push({ kind: "code", lang, text });
      return;
    }
    const lines = part.split("\n");
    let list: string[] = [];
    let para: string[] = [];
    const flushPara = () => {
      const text = para.join("\n").trim();
      if (text) blocks.push({ kind: "p", text });
      para = [];
    };
    const flushList = () => {
      if (list.length) blocks.push({ kind: "ul", items: list });
      list = [];
    };
    for (const line of lines) {
      if (/^\s*[-*]\s+/.test(line)) {
        flushPara();
        list.push(line.replace(/^\s*[-*]\s+/, ""));
      } else if (/^\s*\d+\.\s+/.test(line)) {
        flushPara();
        list.push(line.replace(/^\s*\d+\.\s+/, ""));
      } else if (!line.trim()) {
        flushList();
        flushPara();
      } else {
        flushList();
        para.push(line);
      }
    }
    flushList();
    flushPara();
  });
  return blocks;
}

function inline(text: string) {
  const chunks = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return chunks.map((chunk, i) => {
    if (chunk.startsWith("`") && chunk.endsWith("`")) {
      return (
        <code key={i} className="rounded-sm bg-surface-2 px-1 py-0.5 font-mono text-[0.8em]">
          {chunk.slice(1, -1)}
        </code>
      );
    }
    if (chunk.startsWith("**") && chunk.endsWith("**")) {
      return (
        <strong key={i} className="font-medium text-foreground">
          {chunk.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{chunk}</span>;
  });
}

export function Markdown({ text, className }: { text: string; className?: string }) {
  const blocks = parseBlocks(text);
  return (
    <div className={cn("space-y-3 text-pretty text-sm leading-relaxed text-foreground", className)}>
      {blocks.map((block, i) => {
        if (block.kind === "code") {
          return (
            <pre
              key={i}
              className="overflow-x-auto rounded-lg border border-border bg-bg px-3 py-2.5 font-mono text-xs leading-relaxed text-muted-foreground"
            >
              <code>{block.text}</code>
            </pre>
          );
        }
        if (block.kind === "ul") {
          return (
            <ul key={i} className="space-y-1 pl-4 text-muted-foreground">
              {block.items.map((item, j) => (
                <li key={j} className="list-disc">
                  {inline(item)}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="text-muted-foreground">
            {inline(block.text)}
          </p>
        );
      })}
    </div>
  );
}
