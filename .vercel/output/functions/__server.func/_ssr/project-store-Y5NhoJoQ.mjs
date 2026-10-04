import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as Slot, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as GROQ_MODELS } from "./router-DHljIKjK.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/project-store-Y5NhoJoQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid() {
	return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
function formatTime(iso) {
	try {
		return new Intl.DateTimeFormat(void 0, {
			hour: "numeric",
			minute: "2-digit"
		}).format(new Date(iso));
	} catch {
		return "";
	}
}
function formatRelative(iso) {
	const delta = Date.now() - new Date(iso).getTime();
	const minutes = Math.round(delta / 6e4);
	if (minutes < 1) return "just now";
	if (minutes < 60) return `${minutes}m ago`;
	const hours = Math.round(minutes / 60);
	if (hours < 24) return `${hours}h ago`;
	return `${Math.round(hours / 24)}d ago`;
}
function BrandMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("grid size-7 place-items-center rounded-[9px_9px_9px_3px] bg-accent text-accent-foreground", className),
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			viewBox: "0 0 16 16",
			className: "size-3.5",
			fill: "none",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M3.2 13.2 8 2.8l4.8 10.4M5.1 9.4h5.8",
				stroke: "currentColor",
				strokeWidth: "1.6",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})
		})
	});
}
function Brand({ compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-2.5 text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("font-display font-medium tracking-tight", compact ? "text-base" : "text-lg"),
			children: "Adonabix"
		})]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:opacity-90",
			terracotta: "bg-accent text-accent-foreground hover:opacity-90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-surface-2",
			outline: "border border-border bg-transparent text-foreground hover:bg-surface-2",
			ghost: "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
			link: "text-accent underline-offset-4 hover:underline"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 rounded-md px-3 text-xs",
			lg: "h-12 rounded-lg px-5",
			icon: "size-11",
			"icon-sm": "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
	className: cn("flex min-h-24 w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 disabled:cursor-not-allowed disabled:opacity-50", className),
	ref,
	...props
}));
Textarea.displayName = "Textarea";
var STARTER_HTML = `<!doctype html>
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
    <script src="app.js"><\/script>
  </body>
</html>
`;
var STARTER_CSS = `*,
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
var STARTER_JS = `const button = document.querySelector("button");
if (button) {
  button.addEventListener("click", () => {
    button.textContent = "Describe the site in chat →";
  });
}
`;
function defaultFiles() {
	return [
		{
			path: "index.html",
			content: STARTER_HTML
		},
		{
			path: "styles.css",
			content: STARTER_CSS
		},
		{
			path: "app.js",
			content: STARTER_JS
		}
	];
}
function createProject(name = "Untitled site") {
	return {
		id: uid(),
		name,
		files: defaultFiles(),
		messages: [],
		outcomes: [],
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
}
function languageFor(path) {
	if (path.endsWith(".html") || path.endsWith(".htm")) return "html";
	if (path.endsWith(".css")) return "css";
	if (path.endsWith(".js") || path.endsWith(".mjs")) return "javascript";
	if (path.endsWith(".ts") || path.endsWith(".tsx")) return "typescript";
	if (path.endsWith(".json")) return "json";
	if (path.endsWith(".md")) return "markdown";
	if (path.endsWith(".svg")) return "xml";
	return "plaintext";
}
function touch(project, patch) {
	return {
		...project,
		...patch,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
}
var useProjectStore = create()(persist((set, get) => ({
	projects: [],
	activeId: null,
	settings: {
		groqKey: "",
		model: GROQ_MODELS[0].id
	},
	hydrate: () => {
		const { projects, activeId } = get();
		if (projects.length === 0) {
			const project = createProject("First site");
			set({
				projects: [project],
				activeId: project.id
			});
			return;
		}
		if (!activeId || !projects.some((project) => project.id === activeId)) set({ activeId: projects[0]?.id ?? null });
	},
	active: () => {
		const { projects, activeId } = get();
		return projects.find((project) => project.id === activeId) ?? projects[0] ?? null;
	},
	create: (name) => {
		const project = createProject(name);
		set((state) => ({
			projects: [project, ...state.projects],
			activeId: project.id
		}));
		return project;
	},
	switchTo: (id) => set({ activeId: id }),
	rename: (id, name) => set((state) => ({ projects: state.projects.map((project) => project.id === id ? touch(project, { name }) : project) })),
	remove: (id) => set((state) => {
		const projects = state.projects.filter((project) => project.id !== id);
		return {
			projects,
			activeId: state.activeId === id ? projects[0]?.id ?? null : state.activeId
		};
	}),
	patch: (id, patch) => set((state) => ({ projects: state.projects.map((project) => project.id === id ? touch(project, patch) : project) })),
	setFiles: (id, files) => set((state) => ({ projects: state.projects.map((project) => project.id === id ? touch(project, { files }) : project) })),
	setFileContent: (id, path, content) => set((state) => ({ projects: state.projects.map((project) => project.id === id ? touch(project, { files: project.files.map((file) => file.path === path ? {
		...file,
		content
	} : file) }) : project) })),
	addFile: (id, path, content = "") => set((state) => ({ projects: state.projects.map((project) => {
		if (project.id !== id) return project;
		if (project.files.some((file) => file.path === path)) return project;
		return touch(project, { files: [...project.files, {
			path,
			content
		}] });
	}) })),
	deleteFile: (id, path) => set((state) => ({ projects: state.projects.map((project) => project.id === id ? touch(project, { files: project.files.filter((file) => file.path !== path) }) : project) })),
	renameFile: (id, from, to) => set((state) => ({ projects: state.projects.map((project) => project.id === id ? touch(project, { files: project.files.map((file) => file.path === from ? {
		...file,
		path: to
	} : file) }) : project) })),
	addMessages: (id, messages) => set((state) => ({ projects: state.projects.map((project) => project.id === id ? touch(project, { messages: [...project.messages, ...messages] }) : project) })),
	updateMessage: (id, messageId, content) => set((state) => ({ projects: state.projects.map((project) => project.id === id ? touch(project, { messages: project.messages.map((message) => message.id === messageId ? {
		...message,
		content
	} : message) }) : project) })),
	upsertOutcome: (id, outcome) => set((state) => ({ projects: state.projects.map((project) => {
		if (project.id !== id) return project;
		const outcomes = project.outcomes ?? [];
		const index = outcomes.findIndex((item) => item.id === outcome.id);
		return touch(project, { outcomes: index >= 0 ? outcomes.map((item, i) => i === index ? outcome : item) : [outcome, ...outcomes].slice(0, 24) });
	}) })),
	setSettings: (patch) => set((state) => ({ settings: {
		...state.settings,
		...patch
	} }))
}), {
	name: "adonabix.workspace.v2",
	partialize: (state) => ({
		projects: state.projects,
		activeId: state.activeId,
		settings: state.settings
	})
}));
var MODE_META = {
	agent: {
		label: "Agent",
		hint: "Plan, write, and verify with tools"
	},
	plan: {
		label: "Plan",
		hint: "Shape the idea before writing code"
	},
	build: {
		label: "Build",
		hint: "Generate a complete first version"
	},
	edit: {
		label: "Edit",
		hint: "Change only what you asked for"
	},
	debug: {
		label: "Debug",
		hint: "Find issues and patch them"
	}
};
//#endregion
export { cn as a, languageFor as c, Textarea as i, uid as l, Button as n, formatRelative as o, MODE_META as r, formatTime as s, Brand as t, useProjectStore as u };
