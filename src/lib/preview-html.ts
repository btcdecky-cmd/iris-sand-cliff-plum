import type { ProjectFile } from "@/lib/types";

export function getFile(files: ProjectFile[], path: string) {
  const normalized = path.replace(/^\.\//, "");
  return files.find((file) => file.path === normalized || file.path === path);
}

export function buildPreviewHtml(files: ProjectFile[]) {
  const htmlFile =
    getFile(files, "index.html") ??
    files.find((file) => file.path.endsWith(".html"));
  if (!htmlFile) {
    return `<!doctype html><html><body style="font-family:system-ui;padding:48px;color:#6b655c;background:#f3efe6">No HTML file yet. Ask the agent to build one.</body></html>`;
  }

  let html = htmlFile.content;
  const used = new Set<string>([htmlFile.path]);

  html = html.replace(
    /<link\b[^>]*href=["']([^"']+)["'][^>]*>/gi,
    (full, href: string) => {
      if (/^https?:|^data:|^\/\//i.test(href)) return full;
      const file = getFile(files, href);
      if (!file) return full;
      used.add(file.path);
      return `<style>\n${file.content}\n</style>`;
    },
  );

  html = html.replace(
    /<script\b([^>]*)\bsrc=["']([^"']+)["']([^>]*)><\/script>/gi,
    (full, pre: string, src: string, post: string) => {
      if (/^https?:|^data:|^\/\//i.test(src)) return full;
      const file = getFile(files, src);
      if (!file) return full;
      used.add(file.path);
      return `<script${pre}${post}>\n${file.content}\n</script>`;
    },
  );

  const leftoverCss = files.filter(
    (file) => file.path.endsWith(".css") && !used.has(file.path),
  );
  const leftoverJs = files.filter(
    (file) =>
      (file.path.endsWith(".js") || file.path.endsWith(".mjs")) &&
      !used.has(file.path),
  );

  if (leftoverCss.length || leftoverJs.length) {
    const inject = [
      ...leftoverCss.map((file) => `<style>\n${file.content}\n</style>`),
      ...leftoverJs.map((file) => `<script>\n${file.content}\n</script>`),
    ].join("\n");
    if (/<\/head>/i.test(html)) html = html.replace(/<\/head>/i, `${inject}</head>`);
    else if (/<\/body>/i.test(html)) html = html.replace(/<\/body>/i, `${inject}</body>`);
    else html += inject;
  }

  return html;
}

export function extractFencedFiles(text: string): Array<{ path: string; content: string }> {
  const out: Array<{ path: string; content: string }> = [];
  const fence = /```([^\n]*)\n([\s\S]*?)```/g;
  let match: RegExpExecArray | null;
  while ((match = fence.exec(text))) {
    const meta = match[1]?.trim() ?? "";
    const content = match[2] ?? "";
    const pathMatch = meta.match(/(?:[\w./-]+\.(?:html|css|js|mjs|ts|tsx|json|svg|md))/i);
    if (pathMatch) {
      out.push({ path: pathMatch[0].replace(/^\.\//, ""), content });
      continue;
    }
    const lang = meta.split(/\s+/)[0]?.toLowerCase();
    if (lang === "html" || lang === "htm") out.push({ path: "index.html", content });
    else if (lang === "css") out.push({ path: "styles.css", content });
    else if (lang === "javascript" || lang === "js") out.push({ path: "app.js", content });
  }
  return out;
}

export function applyFileWrites(files: ProjectFile[], writes: Array<{ path: string; content: string }>) {
  let next = files.slice();
  for (const write of writes) {
    const index = next.findIndex((file) => file.path === write.path);
    if (index >= 0) next[index] = { path: write.path, content: write.content };
    else next = [...next, { path: write.path, content: write.content }];
  }
  return next;
}
