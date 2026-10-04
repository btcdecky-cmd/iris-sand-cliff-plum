import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { E as ArrowRight, b as Eye, f as MessageSquare, g as FolderOpen, m as ListChecks } from "../_libs/lucide-react.mjs";
import { i as Textarea, n as Button, t as Brand, u as useProjectStore } from "./project-store-Y5NhoJoQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-rZ_Lz3fU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EXAMPLES = [
	"A tasting-menu restaurant in Lisbon with a reservation note and a wine list",
	"A quiet archive for a film photographer, large stills, no clutter",
	"A waitlist page for a compact mechanical keyboard in matte aluminum"
];
function HomePage() {
	const navigate = useNavigate();
	const [prompt, setPrompt] = (0, import_react.useState)("");
	const start = (text) => {
		const value = text.trim();
		if (!value) {
			navigate({
				to: "/workspace",
				search: {}
			});
			return;
		}
		const store = useProjectStore.getState();
		if (!store.active()) store.hydrate();
		const active = store.active();
		if (!active || active.messages.length > 0) store.create(value.slice(0, 42));
		else store.rename(active.id, value.slice(0, 42));
		navigate({
			to: "/workspace",
			search: { prompt: value }
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mx-auto flex h-20 max-w-6xl items-center justify-between px-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex items-center gap-5 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#how",
						className: "hidden hover:text-foreground sm:inline",
						children: "How it works"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => start(""),
						children: ["Open workspace", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:pt-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-accent" }), "Groq coding agent"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-6 max-w-xl font-display text-[clamp(2.75rem,7vw,5.4rem)] font-medium leading-[0.95] tracking-[-0.04em]",
						children: ["Describe the site.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "italic text-accent",
							children: " Watch it land."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-md text-base leading-relaxed text-muted-foreground",
						children: "Adonabix is a login-free coding workspace. Chat with a Groq agent that plans, writes, debugs, and previews a real website — with an outcome log of every tool it used."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-7 rounded-xl border border-border bg-elevated p-3 shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: prompt,
							onChange: (event) => setPrompt(event.target.value),
							placeholder: "A calm portfolio for a ceramic artist, with a gallery and a note about commissions…",
							rows: 3,
							className: "min-h-[88px] resize-none border-0 bg-transparent p-2 shadow-none focus-visible:ring-0",
							onKeyDown: (event) => {
								if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) start(prompt);
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between px-1 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "hidden text-[0.65rem] text-subtle sm:block",
								children: "No account. Projects stay in this browser."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "terracotta",
								size: "sm",
								disabled: !prompt.trim(),
								onClick: () => start(prompt),
								children: ["Run agent", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 flex flex-col gap-2",
						children: EXAMPLES.map((example) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setPrompt(example),
							className: "text-left text-sm text-muted-foreground hover:text-foreground",
							children: example
						}) }, example))
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-8 rounded-full bg-[radial-gradient(circle,rgb(196_92_62/0.18),transparent_68%)]" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative overflow-hidden rounded-xl border border-border bg-elevated shadow-[var(--shadow-border)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex h-10 items-center gap-1.5 border-b border-border px-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "size-1.5 rounded-full bg-subtle" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "size-1.5 rounded-full bg-subtle" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "size-1.5 rounded-full bg-subtle" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-2 font-mono text-[0.65rem] text-subtle",
										children: "preview · index.html"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3 bg-paper px-8 py-10 text-ink",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent",
										children: "Morrow ceramics"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-4xl leading-none tracking-tight",
										children: "Objects for slower days."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "max-w-[220px] text-sm leading-relaxed text-muted-foreground",
										children: "Hand-thrown forms made to be held, used, and kept close."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-block rounded-md bg-ink px-3 py-2 text-xs font-medium text-paper",
										children: "Explore the collection"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute -left-4 bottom-10 hidden w-56 rounded-lg border border-border bg-elevated p-3 shadow-[var(--shadow-border)] sm:block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-1 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-subtle",
								children: "Agent"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs leading-relaxed text-muted-foreground",
								children: "Wrote index.html and styles.css. Preview is live — check the gallery spacing next."
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "how",
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid max-w-6xl gap-4 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						{
							icon: MessageSquare,
							title: "Chat to control",
							body: "A proper composer, not a prompt box. Plan, build, edit, or debug in one thread."
						},
						{
							icon: FolderOpen,
							title: "Files you own",
							body: "HTML, CSS, and JS stay editable. Export whenever you want to take the work elsewhere."
						},
						{
							icon: Eye,
							title: "Live preview",
							body: "The site renders as the agent writes it. Flip desktop, tablet, and mobile frames."
						},
						{
							icon: ListChecks,
							title: "Outcome log",
							body: "Every tool call, write, and diagnostic is recorded so you can see what the agent actually did."
						}
					].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-xl border border-border bg-elevated p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "mb-6 size-4 text-accent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl tracking-tight",
								children: item.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted-foreground",
								children: item.body
							})
						]
					}, item.title))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mx-auto flex max-w-6xl items-center justify-between px-5 py-8 text-xs text-subtle",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Adonabix" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Local-first coding agent. Powered by Groq." })]
			})
		]
	});
}
var SplitComponent = HomePage;
//#endregion
export { SplitComponent as component };
