import type { Project, ProjectFile } from "@/lib/types";
import { uid } from "@/lib/utils";

export const STARTER_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Untitled site</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <main class="stage">
      <p class="kicker">Ready when you are</p>
      <h1>A blank page<br />with a pulse.</h1>
      <p class="lede">Tell Adonabix what this site should become. The agent will plan, write, preview, and refine it with you.</p>
      <button type="button">Start the first pass</button>
    </main>
    <script src="app.js"></script>
  </body>
</html>
`;

export const STARTER_CSS = `*,
*::before,
*::after { box-sizing: border-box; }

html, body { margin: 0; min-height: 100%; }

body {
  font-family: "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif;
  color: #1c1916;
  background: #f3efe6;
}

.stage {
  min-height: 100vh;
  display: grid;
  place-content: center;
  text-align: center;
  padding: 48px 24px;
  background:
    radial-gradient(1200px 500px at 50% -10%, rgba(196, 92, 62, 0.16), transparent 60%),
    #f3efe6;
}

.kicker {
  margin: 0 0 18px;
  font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #c45c3e;
}

h1 {
  margin: 0 0 18px;
  font-size: clamp(42px, 8vw, 88px);
  line-height: 0.95;
  letter-spacing: -0.05em;
  font-weight: 500;
}

.lede {
  max-width: 440px;
  margin: 0 auto 28px;
  color: #6b655c;
  line-height: 1.6;
  font-size: 16px;
}

button {
  appearance: none;
  border: 0;
  background: #1c1916;
  color: #f3efe6;
  padding: 13px 18px;
  border-radius: 8px;
  font: 600 13px/1 system-ui, sans-serif;
  cursor: pointer;
}

button:hover { background: #c45c3e; }
`;

export const STARTER_JS = `const button = document.querySelector("button");
if (button) {
  button.addEventListener("click", () => {
    button.textContent = "Describe the site in chat →";
  });
}
`;

export function defaultFiles(): ProjectFile[] {
  return [
    { path: "index.html", content: STARTER_HTML },
    { path: "styles.css", content: STARTER_CSS },
    { path: "app.js", content: STARTER_JS },
  ];
}

export function createProject(name = "Untitled site"): Project {
  return {
    id: uid(),
    name,
    files: defaultFiles(),
    messages: [],
    outcomes: [],
    updatedAt: new Date().toISOString(),
  };
}

export function languageFor(path: string) {
  if (path.endsWith(".html") || path.endsWith(".htm")) return "html";
  if (path.endsWith(".css")) return "css";
  if (path.endsWith(".js") || path.endsWith(".mjs")) return "javascript";
  if (path.endsWith(".ts") || path.endsWith(".tsx")) return "typescript";
  if (path.endsWith(".json")) return "json";
  if (path.endsWith(".md")) return "markdown";
  if (path.endsWith(".svg")) return "xml";
  return "plaintext";
}
