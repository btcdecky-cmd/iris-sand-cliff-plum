import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { C as ChevronDown, S as CircleAlert, T as ArrowUp, _ as FilePlus2, a as Tablet, b as Eye, c as Settings, d as Plus, f as MessageSquare, g as FolderOpen, h as Laptop, i as Trash2, l as Search, m as ListChecks, n as Wrench, o as Square, p as LoaderCircle, s as Smartphone, t as X, u as RefreshCw, v as FilePenLine, w as Check, x as Download, y as FileCode2 } from "../_libs/lucide-react.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as Root2, i as Portal2, n as Item2, o as Separator2, r as Label2, s as Trigger, t as Content2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { a as buildPreviewHtml, i as applyFileWrites, n as AGENT_MODES, o as Route$2, r as GROQ_MODELS } from "./router-DHljIKjK.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as cn, c as languageFor, i as Textarea, l as uid, n as Button, o as formatRelative, r as MODE_META, s as formatTime, t as Brand, u as useProjectStore } from "./project-store-Y5NhoJoQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/workspace-CdDcY0F8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		className: cn("fixed inset-0 z-50 bg-bg/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
		...props
	});
}
function DialogContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed left-1/2 top-1/2 z-50 grid w-[min(92vw,440px)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl border border-border bg-elevated p-5 shadow-[var(--shadow-border)] duration-[var(--motion-fast)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute right-3 top-3 rounded-md p-1 text-muted-foreground hover:bg-surface-2 hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5", className),
		...props
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("font-display text-lg font-medium tracking-tight", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
function DropdownMenuContent({ className, sideOffset = 6, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		sideOffset,
		className: cn("z-50 min-w-44 overflow-hidden rounded-lg border border-border bg-elevated p-1 text-foreground shadow-[var(--shadow-border)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className),
		...props
	}) });
}
function DropdownMenuItem({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
		className: cn("relative flex cursor-pointer select-none items-center gap-2 rounded-md px-2.5 py-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-surface-2", className),
		...props
	});
}
function DropdownMenuLabel({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
		className: cn("px-2.5 py-1.5 text-xs font-medium text-muted-foreground", className),
		...props
	});
}
function DropdownMenuSeparator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
		className: cn("-mx-1 my-1 h-px bg-border", className),
		...props
	});
}
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	type,
	className: cn("flex h-11 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground shadow-[var(--shadow-border)] transition-[box-shadow,border-color] duration-[var(--motion-quick)] placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 disabled:cursor-not-allowed disabled:opacity-50", className),
	ref,
	...props
}));
Input.displayName = "Input";
function parseBlocks(source) {
	const blocks = [];
	source.split(/```/).forEach((part, index) => {
		if (index % 2 === 1) {
			const nl = part.indexOf("\n");
			const lang = (nl === -1 ? part : part.slice(0, nl)).trim();
			const text = nl === -1 ? "" : part.slice(nl + 1).replace(/\n$/, "");
			blocks.push({
				kind: "code",
				lang,
				text
			});
			return;
		}
		const lines = part.split("\n");
		let list = [];
		let para = [];
		const flushPara = () => {
			const text = para.join("\n").trim();
			if (text) blocks.push({
				kind: "p",
				text
			});
			para = [];
		};
		const flushList = () => {
			if (list.length) blocks.push({
				kind: "ul",
				items: list
			});
			list = [];
		};
		for (const line of lines) if (/^\s*[-*]\s+/.test(line)) {
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
		flushList();
		flushPara();
	});
	return blocks;
}
function inline(text) {
	return text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((chunk, i) => {
		if (chunk.startsWith("`") && chunk.endsWith("`")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
			className: "rounded-sm bg-surface-2 px-1 py-0.5 font-mono text-[0.8em]",
			children: chunk.slice(1, -1)
		}, i);
		if (chunk.startsWith("**") && chunk.endsWith("**")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
			className: "font-medium text-foreground",
			children: chunk.slice(2, -2)
		}, i);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: chunk }, i);
	});
}
function Markdown({ text, className }) {
	const blocks = parseBlocks(text);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("space-y-3 text-pretty text-sm leading-relaxed text-foreground", className),
		children: blocks.map((block, i) => {
			if (block.kind === "code") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "overflow-x-auto rounded-lg border border-border bg-bg px-3 py-2.5 font-mono text-xs leading-relaxed text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: block.text })
			}, i);
			if (block.kind === "ul") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-1 pl-4 text-muted-foreground",
				children: block.items.map((item, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "list-disc",
					children: inline(item)
				}, j))
			}, i);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: inline(block.text)
			}, i);
		})
	});
}
var badgeVariants = cva("inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium tracking-wide", {
	variants: { variant: {
		default: "border-transparent bg-surface-2 text-muted-foreground",
		accent: "border-transparent bg-accent/15 text-accent",
		outline: "border-border text-muted-foreground",
		success: "border-transparent bg-success/15 text-success",
		warn: "border-transparent bg-warn/15 text-warn"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function Kbd({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
		className: cn("pointer-events-none inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-surface-2 px-1 font-mono text-xs font-medium text-muted-foreground", className),
		...props
	});
}
function ChatPanel({ messages, streaming, error, draft, mode, model, onDraft, onMode, onModel, onSend, onStop }) {
	const scroller = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = scroller.current;
		if (!el) return;
		el.scrollTop = el.scrollHeight;
	}, [messages, streaming]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex h-full min-h-0 flex-col bg-elevated",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex h-11 shrink-0 items-center justify-between border-b border-border px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-wide text-foreground",
					children: "Agent"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[0.65rem] text-subtle",
					children: "Groq-powered coding partner"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-2 text-[0.65rem] text-muted-foreground",
					children: ["Model", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: model,
						onChange: (event) => onModel(event.target.value),
						className: "h-8 rounded-md border border-border bg-surface px-2 font-mono text-[0.65rem] text-foreground",
						children: GROQ_MODELS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: item.id,
							children: item.label
						}, item.id))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: scroller,
				className: "min-h-0 flex-1 overflow-y-auto px-4 py-5",
				children: messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyChat, {
					mode,
					onPick: onDraft
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "space-y-5",
					children: messages.map((message) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[0.65rem] font-medium uppercase tracking-[0.12em] text-subtle",
									children: message.role === "user" ? "You" : "Adonabix"
								}),
								message.mode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									children: MODE_META[message.mode].label
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-auto font-mono text-[0.65rem] tabular-nums text-subtle",
									children: formatTime(message.createdAt)
								})
							]
						}), message.role === "user" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-xl rounded-tl-sm bg-surface-2 px-3.5 py-2.5 text-sm leading-relaxed text-foreground",
							children: message.content
						}) : message.content ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, { text: message.content }) : streaming ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "chat-shimmer text-sm",
							children: "Thinking through the request"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "No reply yet."
						})]
					}, message.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "shrink-0 border-t border-border p-3",
				children: [error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 rounded-md border border-danger/30 bg-danger/10 px-3 py-2 text-xs text-danger",
					children: error
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-surface p-2 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-2 flex flex-wrap gap-1",
							children: AGENT_MODES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => onMode(item),
								className: cn("h-8 rounded-md px-2.5 text-xs font-medium", mode === item ? "bg-paper text-ink" : "text-muted-foreground hover:bg-surface-2 hover:text-foreground"),
								children: MODE_META[item].label
							}, item))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: draft,
							onChange: (event) => onDraft(event.target.value),
							placeholder: MODE_META[mode].hint,
							rows: 3,
							className: "min-h-[72px] resize-none border-0 p-2 shadow-none focus-visible:ring-0",
							onKeyDown: (event) => {
								if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
									event.preventDefault();
									onSend();
								}
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between px-1 pb-0.5 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "hidden items-center gap-1 text-[0.65rem] text-subtle sm:flex",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kbd, { children: "⌘" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kbd, { children: "↵" }),
									"send"
								]
							}), streaming ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								size: "sm",
								variant: "outline",
								onClick: onStop,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-3.5" }), "Stop"]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								size: "sm",
								variant: "terracotta",
								disabled: !draft.trim(),
								onClick: onSend,
								children: [draft.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5" }), "Run"]
							})]
						})
					]
				})]
			})
		]
	});
}
function EmptyChat({ mode, onPick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-sm flex-col gap-4 pt-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl leading-tight tracking-tight text-foreground",
				children: "Tell the agent what to make."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm leading-relaxed text-muted-foreground",
				children: [MODE_META[mode].hint, ". It can read files, write HTML/CSS/JS, run diagnostics, and stream a live preview."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: [
					"A tasting-menu restaurant in Lisbon with a reservation note",
					"A film photographer’s archive with large stills and quiet type",
					"A waitlist page for a compact mechanical keyboard",
					"Debug the current page: spacing, contrast, and mobile layout"
				].map((seed) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onPick(seed),
					className: "w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-left text-sm text-muted-foreground hover:border-accent/40 hover:text-foreground",
					children: seed
				}) }, seed))
			})
		]
	});
}
function CodePanel({ files, selectedPath, onSelect, onChange, onAdd, onDelete }) {
	const file = files.find((item) => item.path === selectedPath) ?? files[0];
	const value = file?.content ?? "";
	const lines = Math.max(1, value.split("\n").length);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex h-full min-h-0 bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "flex w-44 shrink-0 flex-col border-r border-border bg-elevated",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-11 items-center justify-between border-b border-border px-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[0.65rem] font-medium uppercase tracking-[0.14em] text-subtle",
					children: "Files"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "icon-sm",
					variant: "ghost",
					onClick: onAdd,
					"aria-label": "New file",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePlus2, { className: "size-3.5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "min-h-0 flex-1 overflow-y-auto p-1.5",
				children: files.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onSelect(item.path),
					className: cn("flex h-9 w-full items-center gap-2 rounded-md px-2 text-left font-mono text-xs", item.path === file?.path ? "bg-surface-2 text-foreground" : "text-muted-foreground hover:bg-surface hover:text-foreground"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCode2, { className: "size-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: item.path
					})]
				}) }, item.path))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-11 items-center justify-between border-b border-border px-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "truncate font-mono text-xs text-muted-foreground",
					children: [file?.path ?? "No file", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2 text-subtle",
						children: languageFor(file?.path ?? "")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "icon-sm",
					variant: "ghost",
					onClick: onDelete,
					disabled: !file || files.length < 2,
					"aria-label": "Delete file",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-1 overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": "true",
					className: "select-none border-r border-border bg-elevated px-2 py-3 text-right font-mono text-[11px] leading-5 text-subtle",
					children: Array.from({ length: lines }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "tabular-nums",
						children: i + 1
					}, i))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value,
					spellCheck: false,
					onChange: (event) => onChange(event.target.value),
					onKeyDown: (event) => {
						if (event.key === "Tab") {
							event.preventDefault();
							const el = event.currentTarget;
							const start = el.selectionStart;
							const end = el.selectionEnd;
							onChange(`${value.slice(0, start)}  ${value.slice(end)}`);
							requestAnimationFrame(() => {
								el.selectionStart = el.selectionEnd = start + 2;
							});
						}
					},
					className: "min-h-0 flex-1 resize-none bg-bg px-3 py-3 font-mono text-[12px] leading-5 text-foreground outline-none",
					"aria-label": `Edit ${file?.path ?? "file"}`
				})]
			})]
		})]
	});
}
function OutcomePanel({ outcomes }) {
	if (!outcomes.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex h-full flex-col bg-elevated",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "flex h-11 items-center border-b border-border px-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium text-foreground",
				children: "Outcome"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.65rem] text-subtle",
				children: "Tool trace, files touched, result"
			})] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-1 items-center justify-center px-6 text-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-xs text-sm leading-relaxed text-muted-foreground",
				children: "When the agent runs, this log shows every tool call, write, and the final result of the turn."
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex h-full min-h-0 flex-col bg-elevated",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "flex h-11 shrink-0 items-center border-b border-border px-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium text-foreground",
				children: "Outcome"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.65rem] text-subtle",
				children: "Latest agent turns"
			})] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "min-h-0 flex-1 space-y-4 overflow-y-auto p-4",
			children: outcomes.map((outcome) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-xl border border-border bg-surface p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm text-foreground",
								children: outcome.request
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-0.5 font-mono text-[0.65rem] text-subtle",
								children: [
									outcome.provider ?? "Adonabix",
									outcome.model ? ` · ${outcome.model}` : "",
									" · ",
									formatRelative(outcome.startedAt)
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: outcome.status })]
					}),
					outcome.steps.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mb-3 space-y-1.5",
						children: outcome.steps.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepIcon, { step }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-foreground",
									children: step.name
								}), step.detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-0.5 block truncate font-mono text-[0.65rem] text-subtle",
									children: step.detail
								}) : null]
							})]
						}, step.id))
					}) : null,
					outcome.filesChanged.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 font-mono text-[0.65rem] text-accent",
						children: outcome.filesChanged.join(" · ")
					}) : null,
					outcome.summary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-muted-foreground",
						children: outcome.summary
					}) : null
				]
			}, outcome.id))
		})]
	});
}
function StatusBadge({ status }) {
	if (status === "running") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "warn",
		children: "Running"
	});
	if (status === "error") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "accent",
		children: "Error"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "success",
		children: "Done"
	});
}
function StepIcon({ step }) {
	const cls = "mt-0.5 size-3.5 shrink-0";
	if (step.status === "running") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: `${cls} animate-spin text-warn` });
	if (step.status === "error") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: `${cls} text-danger` });
	if (step.kind === "write" || step.kind === "edit") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePenLine, { className: `${cls} text-accent` });
	if (step.kind === "diag") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, { className: `${cls} text-success` });
	if (step.kind === "read") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: `${cls} text-muted-foreground` });
	if (step.kind === "tool") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: `${cls} text-muted-foreground` });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: `${cls} text-success` });
}
function PreviewPanel({ files, device, reloadKey, onDevice, onReload }) {
	const html = (0, import_react.useMemo)(() => buildPreviewHtml(files), [files, reloadKey]);
	const width = device === "mobile" ? 390 : device === "tablet" ? 768 : "100%";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex h-full min-h-0 flex-col bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex h-11 shrink-0 items-center justify-between border-b border-border px-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium text-foreground",
				children: "Preview"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.65rem] text-subtle",
				children: "Live render of index.html"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1",
				children: [[
					["desktop", Laptop],
					["tablet", Tablet],
					["mobile", Smartphone]
				].map(([id, Icon]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "icon-sm",
					variant: device === id ? "secondary" : "ghost",
					onClick: () => onDevice(id),
					"aria-label": id,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" })
				}, id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "icon-sm",
					variant: "ghost",
					onClick: onReload,
					"aria-label": "Reload preview",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-3.5" })
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-h-0 flex-1 items-stretch justify-center overflow-auto bg-[linear-gradient(180deg,#0e0e11,var(--color-bg))] p-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("h-full overflow-hidden rounded-lg bg-paper shadow-[var(--shadow-border)]", device === "desktop" ? "w-full" : "mx-auto"),
				style: {
					width,
					maxWidth: "100%"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
					title: "Site preview",
					sandbox: "allow-scripts allow-forms allow-modals",
					srcDoc: html,
					className: "h-full w-full border-0 bg-paper"
				}, reloadKey)
			})
		})]
	});
}
function WorkspaceApp({ initialPrompt }) {
	const navigate = useNavigate();
	const store = useProjectStore();
	const project = store.active();
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const [selectedPath, setSelectedPath] = (0, import_react.useState)("index.html");
	const [mode, setMode] = (0, import_react.useState)("agent");
	const [draft, setDraft] = (0, import_react.useState)("");
	const [streaming, setStreaming] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [mobileTab, setMobileTab] = (0, import_react.useState)("chat");
	const [stageTab, setStageTab] = (0, import_react.useState)("preview");
	const [device, setDevice] = (0, import_react.useState)("desktop");
	const [reloadKey, setReloadKey] = (0, import_react.useState)(0);
	const [settingsOpen, setSettingsOpen] = (0, import_react.useState)(false);
	const [renameOpen, setRenameOpen] = (0, import_react.useState)(false);
	const [renameValue, setRenameValue] = (0, import_react.useState)("");
	const [newFileOpen, setNewFileOpen] = (0, import_react.useState)(false);
	const [newFilePath, setNewFilePath] = (0, import_react.useState)("");
	const abortRef = (0, import_react.useRef)(null);
	const startedPrompt = (0, import_react.useRef)("");
	(0, import_react.useEffect)(() => {
		const finish = () => {
			useProjectStore.getState().hydrate();
			setHydrated(true);
		};
		if (useProjectStore.persist.hasHydrated()) finish();
		return useProjectStore.persist.onFinishHydration(finish);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!project) return;
		if (!project.files.some((file) => file.path === selectedPath)) setSelectedPath(project.files[0]?.path ?? "index.html");
	}, [project, selectedPath]);
	const send = async (request, turnMode) => {
		const current = useProjectStore.getState().active();
		if (!current || streaming) return;
		const clean = request.trim();
		if (!clean) return;
		setError("");
		setDraft("");
		setMode(turnMode);
		setStreaming(true);
		setStageTab("outcome");
		const userMessage = {
			id: uid(),
			role: "user",
			content: clean,
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			mode: turnMode
		};
		const assistantMessage = {
			id: uid(),
			role: "assistant",
			content: "",
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			mode: turnMode
		};
		const outcome = {
			id: uid(),
			mode: turnMode,
			request: clean,
			status: "running",
			steps: [],
			filesChanged: [],
			summary: "",
			startedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		useProjectStore.getState().addMessages(current.id, [userMessage, assistantMessage]);
		useProjectStore.getState().upsertOutcome(current.id, outcome);
		const controller = new AbortController();
		abortRef.current = controller;
		let assistantText = "";
		let files = current.files.slice();
		const steps = [];
		const filesChanged = [];
		let provider = "Groq";
		let model = useProjectStore.getState().settings.model;
		const patchOutcome = (partial) => {
			useProjectStore.getState().upsertOutcome(current.id, {
				...outcome,
				steps: [...steps],
				filesChanged: [...filesChanged],
				provider,
				model,
				...partial
			});
		};
		try {
			const settings = useProjectStore.getState().settings;
			const response = await fetch("/api/agent/turn", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "text/event-stream"
				},
				body: JSON.stringify({
					mode: turnMode,
					request: clean,
					files: files.slice(0, 24).map(({ path, content }) => ({
						path,
						content: content.slice(0, 4e4)
					})),
					history: current.messages.slice(-16).map(({ role, content }) => ({
						role,
						content
					})),
					model: settings.model,
					groqKey: settings.groqKey || void 0
				}),
				signal: controller.signal
			});
			if (!response.ok || !response.body) {
				const payload = await response.json().catch(() => ({ error: "" }));
				throw new Error(typeof payload.error === "string" && payload.error ? payload.error : `The agent could not respond (${response.status}).`);
			}
			const reader = response.body.getReader();
			const decoder = new TextDecoder();
			let buffer = "";
			let finished = false;
			const handleEvent = (event) => {
				if (event.type === "status") {
					provider = event.provider;
					model = event.model;
					patchOutcome({});
				}
				if (event.type === "content") {
					assistantText += event.text;
					useProjectStore.getState().updateMessage(current.id, assistantMessage.id, assistantText);
				}
				if (event.type === "file") {
					if (event.action === "delete") files = files.filter((file) => file.path !== event.path);
					else if (event.content != null) files = applyFileWrites(files, [{
						path: event.path,
						content: event.content
					}]);
					if (!filesChanged.includes(event.path)) filesChanged.push(event.path);
					useProjectStore.getState().setFiles(current.id, files);
					setReloadKey((key) => key + 1);
				}
				if (event.type === "tool") {
					if (event.status === "start") steps.push({
						id: event.id,
						kind: kindForTool(event.name),
						name: event.name,
						detail: event.detail ?? "",
						status: "running"
					});
					else {
						const step = steps.find((item) => item.id === event.id);
						if (step) {
							step.status = event.ok === false ? "error" : "ok";
							step.detail = event.detail ?? step.detail;
						}
					}
					patchOutcome({});
				}
				if (event.type === "outcome") {
					patchOutcome({
						summary: event.summary,
						filesChanged: event.filesChanged,
						status: "success",
						finishedAt: (/* @__PURE__ */ new Date()).toISOString()
					});
					if (event.filesChanged.length) setStageTab("preview");
				}
				if (event.type === "error") {
					setError(event.message);
					patchOutcome({
						status: "error",
						summary: event.message,
						finishedAt: (/* @__PURE__ */ new Date()).toISOString()
					});
				}
				if (event.type === "done") finished = true;
			};
			while (!finished) {
				const { value, done } = await reader.read();
				buffer += decoder.decode(value || /* @__PURE__ */ new Uint8Array(), { stream: !done });
				const chunks = buffer.split(/\r?\n\r?\n/);
				buffer = chunks.pop() || "";
				for (const chunk of chunks) {
					const data = chunk.split(/\r?\n/).filter((line) => line.startsWith("data:")).map((line) => line.slice(5).trim()).join("\n");
					if (!data) continue;
					try {
						handleEvent(JSON.parse(data));
					} catch {}
				}
				if (done) break;
			}
		} catch (caught) {
			if (caught.name === "AbortError") patchOutcome({
				status: "error",
				summary: "Stopped.",
				finishedAt: (/* @__PURE__ */ new Date()).toISOString()
			});
			else {
				const message = caught instanceof Error ? caught.message : "Something went wrong. Please try again.";
				setError(message);
				patchOutcome({
					status: "error",
					summary: message,
					finishedAt: (/* @__PURE__ */ new Date()).toISOString()
				});
				if (!assistantText) useProjectStore.getState().patch(current.id, { messages: [...current.messages, userMessage] });
			}
		} finally {
			setStreaming(false);
			abortRef.current = null;
		}
	};
	(0, import_react.useEffect)(() => {
		if (!hydrated || !initialPrompt) return;
		if (startedPrompt.current === initialPrompt) return;
		startedPrompt.current = initialPrompt;
		send(initialPrompt, "agent");
		navigate({
			to: "/workspace",
			search: {},
			replace: true
		});
	}, [hydrated, initialPrompt]);
	const exportProject = () => {
		if (!project) return;
		const blob = new Blob([JSON.stringify(project, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${project.name.replace(/\s+/g, "-").toLowerCase()}.adonabix.json`;
		a.click();
		URL.revokeObjectURL(url);
	};
	const tabs = (0, import_react.useMemo)(() => [
		{
			id: "chat",
			label: "Chat",
			icon: MessageSquare
		},
		{
			id: "code",
			label: "Code",
			icon: FolderOpen
		},
		{
			id: "preview",
			label: "Preview",
			icon: Eye
		},
		{
			id: "outcome",
			label: "Outcome",
			icon: ListChecks
		}
	], []);
	if (!hydrated || !project) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center bg-bg text-sm text-muted-foreground",
		children: "Opening workspace…"
	});
	const stage = stageTab === "code" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodePanel, {
		files: project.files,
		selectedPath,
		onSelect: setSelectedPath,
		onChange: (content) => useProjectStore.getState().setFileContent(project.id, selectedPath, content),
		onAdd: () => {
			setNewFilePath("");
			setNewFileOpen(true);
		},
		onDelete: () => {
			if (project.files.length < 2) return;
			useProjectStore.getState().deleteFile(project.id, selectedPath);
		}
	}) : stageTab === "outcome" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutcomePanel, { outcomes: project.outcomes ?? [] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewPanel, {
		files: project.files,
		device,
		reloadKey,
		onDevice: setDevice,
		onReload: () => setReloadKey((key) => key + 1)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh min-h-0 flex-col bg-bg text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex h-14 shrink-0 items-center gap-3 border-b border-border bg-elevated px-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => navigate({
							to: "/",
							search: {}
						}),
						className: "hidden sm:block",
						"aria-label": "Back to home",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, { compact: true })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hidden h-5 w-px bg-border sm:block" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							className: "max-w-48 justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: project.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-3.5" })]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
						align: "start",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: "Projects" }),
							store.projects.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
								onSelect: () => store.switchTo(item.id),
								children: item.name
							}, item.id)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								onSelect: () => {
									store.create(`Site ${store.projects.length + 1}`);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "New project"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
								onSelect: () => {
									setRenameValue(project.name);
									setRenameOpen(true);
								},
								children: "Rename"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								onSelect: () => {
									if (store.projects.length < 2) store.create("Untitled site");
									store.remove(project.id);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), "Delete"]
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-auto hidden text-[0.65rem] text-subtle sm:inline",
						children: "Saved in this browser"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "icon-sm",
						variant: "ghost",
						onClick: exportProject,
						"aria-label": "Export",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "icon-sm",
						variant: "ghost",
						onClick: () => setSettingsOpen(true),
						"aria-label": "Settings",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-4" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden min-h-0 flex-1 lg:grid lg:grid-cols-[minmax(320px,380px)_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-h-0 border-r border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatPanel, {
						messages: project.messages,
						streaming,
						error,
						draft,
						mode,
						model: store.settings.model,
						onDraft: setDraft,
						onMode: setMode,
						onModel: (value) => store.setSettings({ model: value }),
						onSend: () => void send(draft, mode),
						onStop: () => abortRef.current?.abort()
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-h-0 flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-11 items-center gap-1 border-b border-border bg-elevated px-2",
						children: [
							["preview", "Preview"],
							["code", "Code"],
							["outcome", "Outcome"]
						].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setStageTab(id),
							className: cn("h-8 rounded-md px-3 text-xs font-medium", stageTab === id ? "bg-surface-2 text-foreground" : "text-muted-foreground hover:text-foreground"),
							children: label
						}, id))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-h-0 flex-1",
						children: stage
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-1 flex-col lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-h-0 flex-1",
					children: mobileTab === "chat" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatPanel, {
						messages: project.messages,
						streaming,
						error,
						draft,
						mode,
						model: store.settings.model,
						onDraft: setDraft,
						onMode: setMode,
						onModel: (value) => store.setSettings({ model: value }),
						onSend: () => void send(draft, mode),
						onStop: () => abortRef.current?.abort()
					}) : mobileTab === "code" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodePanel, {
						files: project.files,
						selectedPath,
						onSelect: setSelectedPath,
						onChange: (content) => useProjectStore.getState().setFileContent(project.id, selectedPath, content),
						onAdd: () => {
							setNewFilePath("");
							setNewFileOpen(true);
						},
						onDelete: () => {
							if (project.files.length < 2) return;
							useProjectStore.getState().deleteFile(project.id, selectedPath);
						}
					}) : mobileTab === "outcome" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutcomePanel, { outcomes: project.outcomes ?? [] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewPanel, {
						files: project.files,
						device,
						reloadKey,
						onDevice: setDevice,
						onReload: () => setReloadKey((key) => key + 1)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "grid h-14 grid-cols-4 border-t border-border bg-elevated",
					children: tabs.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setMobileTab(tab.id),
						className: cn("flex flex-col items-center justify-center gap-1 text-[0.65rem]", mobileTab === tab.id ? "text-foreground" : "text-muted-foreground"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(tab.icon, { className: "size-4" }), tab.label]
					}, tab.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: settingsOpen,
				onOpenChange: setSettingsOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Agent settings" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Adonabix talks to Groq. Paste a key starting with gsk_ if the workspace is not already configured." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1.5 text-sm",
						children: ["Groq API key", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "password",
							autoComplete: "off",
							placeholder: "gsk_…",
							value: store.settings.groqKey,
							onChange: (event) => store.setSettings({ groqKey: event.target.value })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs leading-relaxed text-muted-foreground",
						children: "The key stays in this browser and is sent only to this app’s server for your turns. Never share it in chat."
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: renameOpen,
				onOpenChange: setRenameOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Rename project" }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: renameValue,
						onChange: (event) => setRenameValue(event.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						onClick: () => {
							if (renameValue.trim()) store.rename(project.id, renameValue.trim());
							setRenameOpen(false);
						},
						children: "Save"
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: newFileOpen,
				onOpenChange: setNewFileOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "New file" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Use a path like about.html or theme.css." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: newFilePath,
						onChange: (event) => setNewFilePath(event.target.value),
						placeholder: "about.html"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						onClick: () => {
							const path = newFilePath.trim().replace(/^\//, "");
							if (path) {
								store.addFile(project.id, path, "");
								setSelectedPath(path);
							}
							setNewFileOpen(false);
						},
						children: "Create"
					})
				] })
			})
		]
	});
}
function kindForTool(name) {
	if (name === "write_file") return "write";
	if (name === "str_replace") return "edit";
	if (name === "read_file" || name === "list_files" || name === "grep") return "read";
	if (name === "diagnostics") return "diag";
	return "tool";
}
function WorkspacePage() {
	const { prompt } = Route$2.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceApp, { initialPrompt: prompt });
}
//#endregion
export { WorkspacePage as component };
