# Verdictu Agent v2 — Full Conversation Record & Implementation Plan

> **Date:** 2026-07-19
> **Status:** Planning document for the NEW project (no code written in this repo)
> **Goal:** A proper autonomous agent — Claude Code / Codex class — built for legal defense: it fights for the user, defends them, finds loopholes, exceptions, and every legal angle. Big models via OpenRouter (including unrestricted models chosen by the user), with the local/private tier as differentiator. Everything plug-and-play: at most one button press to load a model, ideally zero.

---

# PART 1 — Conversation Record (nothing omitted)

## User request #1 (verbatim)

> i need you to analyze how the ghost mode work + how the legal agent works + how the web llm work and how it loads how this is handled. I need you to tell me if there are any other better alternatives I heard of soemthing better then webllm something that is using web assembly. you can even suggest a better implmentation of something by us. I need you to come up with an implementation pplan of the best legal agent something that can fight with big people like legora and harvey ai. We need to go all in. everything needs to be plug and play so the users to maximum press a button to load the model of if we can it will be nice if the model loads by itself. this will be implmented on another project so don't do anything in terms of coding here

## Assistant response #1 (full analysis, verbatim)

### 1. How the current system works

**Ghost Mode (local)** — `lib/ghost/agent.ts` is a fixed 5-phase pipeline, not a real agent: (1) keyword matching decides if web search is needed (pure regex over ~50 English keywords, no AI call), (2) up to 4 sequential Tavily/DDG queries via `/api/search`, (3) one streaming synthesis call to the local model with the defense-stance prompt, (4) a follow-up-questions JSON call, (5) done. The model never decides anything — search queries are string-templated ("`{JUR} {message} exception exemption scope`").

**Ghost Local agentic loop** — `lib/ghost/local-loop.ts` is the newer, real tool-use loop (OpenAI-style function calling, max 12 turns, 4 browser-executable tools). But it's gated by `supportsToolUse`, which in `lib/ghost/models.ts` only Hermes 3 8B has — and that model is `desktopOnly`. So **in practice, browser users never get the agentic loop**; they always fall back to the dumb keyword pipeline.

**Server legal agent** — `lib/agent/core/loop.ts` is genuinely good: Anthropic SDK, extended thinking, parallel tool execution, prompt-cache breakpoints, sub-agents (legal research, company research), compaction and chunking. This is Legora-shaped architecture. But it exists in parallel with two other divergent pipelines (ghost keyword pipeline, ghost-api OpenRouter pipeline) — three implementations of "answer a legal question" that share almost nothing.

**WebLLM loading** — `hooks/useGhostLLM.ts`: dynamic import of `@mlc-ai/web-llm` (v0.2.82), a module-level singleton engine with a mutex against concurrent loads, one automatic retry with full cache purge, and storage-quota preflight that suggests a smaller model. The standout piece is `lib/ghost/opfsCache.ts` — a shim that replaces `window.caches` and redirects WebLLM's three cache buckets to OPFS, escaping the ~1–2 GB Cache API quota and giving implicit per-shard resume. That's clever and worth carrying to the new project. Weaknesses: loading requires an explicit button click (no auto-load), inference runs on the **main thread** (WebLLM has a `WebWorkerMLCEngine` that isn't used — long generations jank the UI), progress % is regex-parsed from human-readable text, and there's no GPU/VRAM detection — only storage is checked, so model choice is entirely manual.

### 2. Is there something better than WebLLM?

First, a clarification: WebLLM *already* uses WebAssembly (WASM for CPU ops + WebGPU for the GPU kernels). The "something using WebAssembly" is almost certainly one of these:

| Option | What it is | Verdict |
|---|---|---|
| **wllama** | llama.cpp compiled to WASM, CPU-only, runs any GGUF from Hugging Face | Great **fallback tier** (works with zero GPU), too slow as primary for 4B+ models |
| **llama.cpp WebGPU backend** (new, 2025–2026) | Official ggml WebGPU backend — GGUF models on the GPU **in the browser**, 45–69% faster decode and ~30% less VRAM than prior browser stacks | The most likely "better thing" heard of. Strongest long-term bet |
| **Transformers.js v4** (Feb 2026) | Hugging Face rewrote the runtime in C++/WASM with a WebGPU backend — 3–10× over v3, Llama 3.2 3B at ~60 tok/s, 1,200+ ready models | The strongest **maintained, batteries-included** option today |
| **MediaPipe LLM Inference** (Google) | WASM+WebGPU, small model set | Still experimental — skip |
| **Chrome built-in AI (Gemini Nano)** | Model ships with the browser, zero download | Worth an "instant answer" tier, but Chrome-only and no control |

Context that changes everything: **WebGPU shipped by default in all four major browsers in November 2025** (~83% global coverage). The "does the user's browser support this" problem that shaped the current design is mostly gone.

**Why move off WebLLM (MLC):** it requires models compiled to MLC's own format, so new models arrive weeks/months late or never — the current catalog is visibly stale (Qwen 2.5, Gemma 2, Phi 3.5 in a world of Qwen3, Gemma 3/4, Phi-4-mini, SmolLM3). Release cadence has slowed. In contrast, the GGUF ecosystem gets every new model within days of release.

**Recommendation: a GGUF-centric stack behind a thin engine abstraction.**

- **Primary:** llama.cpp WebGPU (via wllama's WebGPU build or a direct wasm build) — GPU speed, any GGUF.
- **Fallback:** wllama WASM (CPU) — same GGUF file, works on literally any browser.
- **Killer benefit:** a desktop app (Tauri/Electron) runs native llama.cpp on the *same GGUF files* with Metal/CUDA — one model catalog, one download, three performance tiers. That's the plug-and-play story WebLLM can't give.
- Keep the interface OpenAI-compatible so the agent loop doesn't care which engine is underneath. If llama.cpp-web tooling feels too raw at build time, Transformers.js v4 is the safe, well-maintained alternative — the abstraction layer means switching costs nothing at the agent level.

### 3. Original implementation plan (v1 — superseded by Part 2 below, kept for the record)

**Phase 0 — Engine abstraction + auto model manager (the "plug-and-play" core)**

1. **`LocalEngine` interface** (OpenAI-compatible `chat.completions.create`, `load`, `unload`, `capabilities`) with adapters: llama.cpp-WebGPU, wllama-CPU, and a cloud adapter — the agent loop is engine-blind.
2. **Hardware probe on first visit** (no user input): `navigator.gpu.requestAdapter()` + adapter limits + `shader-f16` support, `navigator.deviceMemory`, `navigator.storage.estimate()`, connection downlink. Map the result to a model tier automatically. This replaces the manual model picker as the default (keep it as an "advanced" override).
3. **Auto-load with consent-once**: on first visit show a single card — "Verdictu runs privately on your device. Download the AI (~2.4 GB)? [Download] [Use cloud instead]". One button, remembered forever. After that, the model warms automatically on page load.
4. **Background, resumable downloads**: Service Worker + Background Fetch API where available (survives tab close), OPFS storage (port the existing shim — it's already the right design, per-shard resume included). Show a small progress chip, never a blocking screen.
5. **Instant-start ladder**: while the real model downloads, serve from a ~300 MB tiny model that loads in seconds (SmolLM3-class / Qwen3-0.6B), or from cloud if the user allowed it, then **hot-swap** when the big model is ready. The user never waits.
6. **Run inference in a Web Worker.** Non-negotiable fix — main-thread inference makes the whole app stutter. Also set COOP/COEP headers so multithreaded WASM (SharedArrayBuffer) works for the CPU fallback.

**Phase 1 — One agent loop, three execution targets**

Collapse the current three pipelines into **one** loop (the server `loop.ts` is the best starting shape): tools defined once in a neutral schema, translated per provider (Anthropic tools / OpenAI-style for local), executed client-side or server-side depending on mode. Kill the keyword-based intent classifier entirely — the model decides when to search via a `web_search` tool. Even a 1.7B model can make that call; regex over English keywords can't handle a multilingual EU product.

Model policy for local tool use (2026 reality): Qwen3 4B is a genuinely capable in-browser tool-caller now — don't gate the agentic loop behind an 8B desktop-only model. Tier it: 1.7B = search+answer only, 4B = full tool loop, 7B+ (desktop) = sub-agents.

**Phase 2 — Legal grounding: jurisdiction packs + citation verification**

- **Downloadable jurisdiction packs**: statutes/codes per jurisdiction as pre-embedded, pre-chunked bundles (SQLite-wasm or a flat vector file in OPFS). On-device embeddings via a small embedding model + BM25 hybrid search. Fully offline legal RAG — nobody else has this, and it's plug-and-play: "Download EU pack (180 MB)".
- **Quote-level citation verification**: every citation in the answer is checked verbatim against the retrieved source before display; unverifiable ones get flagged. Hallucinated citations are the single fastest way to lose a lawyer's trust, and verified citations are Harvey's whole pitch.

**Phase 3 — Workflows, not chat**

Harvey and Legora win deals on structured workflows. Priorities: (a) **multi-document tabular review** (upload 50 contracts → agent fills a table of clauses/risks per doc — Legora's signature feature), (b) **redline/compare** with word-level diff and per-clause risk flags, (c) **template-driven drafting** with clause libraries pulled from the precedent store. The existing editor is the asset here; deepen it toward a Word add-in later — that's where lawyers live.

**Phase 4 — Keep what's already planned and good**

The existing `docs/legal-agent-plan.md` phases for compaction, chunking, IndexedDB memory, export/import, sub-agents, and Convex RAG are sound — carry them over as written. The dispatch matrix (Ghost Local / BYOK cloud / opt-in sync) is the right architecture and genuinely differentiated (zero-storage + BYOK + on-device are all things Harvey/Legora structurally can't offer).

**Phase 5 — Evals and the desktop escape hatch**

- Build a small **legal eval harness** from day one (citation accuracy, jurisdiction correctness, tool-call validity on a fixed question set, run on every model/prompt change). Parity with Harvey can't be claimed without measuring; this is also how local models earn the "recommended" tag instead of guessing.
- **Tauri desktop app** later: same UI, native llama.cpp, same GGUF catalog → 32B–70B models locally for law firms with workstations.

**Honest strategic note:** a 4B browser model will not out-reason Harvey's frontier-model backend, ever. The winning frame: BYOK cloud agent = flagship quality at ~10% of Harvey's price with zero data retention; Ghost Local = the privacy option nobody else can match; jurisdiction packs + verified citations = the trust layer.

## User request #2 (verbatim)

> this has to be a proper agent like claude code codex etc an agent that handles different tasks. i will be using open router to bring some big models that are uncensored so. The idea is that this agent should be able to fight for you to defend you to find loopholes etc. Put all this conversation and the updated messages into a .md file but don't ommit anything and based on what I just told you update the implementation plan

---

# PART 2 — Updated Implementation Plan (v2): A Claude Code–Class Legal Defense Agent

## What changed from v1

The v1 plan treated this as "a better chat pipeline with tools." v2 re-architects it as a **general-purpose autonomous agent** in the mold of Claude Code / Codex: a kernel that plans, decomposes tasks, operates on a persistent workspace, spawns sub-agents, runs long multi-step jobs in the background, and produces artifacts — with legal defense as its mission and **OpenRouter big models (user-selected, including unrestricted ones) as the primary brain**. Local models drop from "the star" to "the privacy tier."

## 2.1 The mental model: Claude Code → Verdictu mapping

| Claude Code concept | Verdictu Agent equivalent |
|---|---|
| Working directory / repo | **Case file** — a persistent workspace per matter: documents, notes, drafts, research, timeline, parties |
| File tools (Read/Write/Edit/Grep) | Case-file tools: `read_document`, `search_case`, `write_note`, `edit_draft`, `list_case_files` |
| Bash / execution | Research execution: `web_search`, `fetch_page`, `search_law_database`, `retrieve_precedent` |
| Todo/task list | **Defense plan** — the agent decomposes "defend me against X" into visible, checkable subtasks |
| Sub-agents (Explore/Plan/general) | Research sub-agent, jurisdiction sub-agent, company sub-agent, drafting sub-agent, **prosecution simulator** |
| Plan mode | **Strategy mode** — agent proposes a defense strategy for approval before executing it |
| CLAUDE.md / memory | Case memory + user profile (jurisdiction, language, standing facts) auto-loaded into context |
| Skills / slash commands | **Playbooks** — packaged legal workflows (see 2.6) |
| Artifacts / PR output | Deliverables: motions, letters, redlines, comparison tables, timelines — versioned in the case file |
| Permission system | Approval gates on outward-facing actions (send, export, file); research runs autonomously |

The defining property of a "proper agent": **the user states a goal, not a question.** "I got a speeding fine in Germany while driving a rental — get me out of it" → the agent plans, researches, checks procedure, finds the angles, drafts the objection letter, and presents a strategy with deliverables. Multi-turn, multi-tool, background-capable.

## 2.2 The kernel (one loop to rule everything)

Single provider-agnostic agentic loop — evolved from the existing `lib/agent/core/loop.ts`, which is already the right shape:

- **Streaming loop** with tool use, parallel tool execution, max-turn budget, cancellation, typed SSE event protocol (`thinking`, `plan_update`, `tool_call`, `subagent_step`, `delta`, `artifact`, `approval_request`, `done`).
- **Provider adapters**, all behind one interface:
  1. **OpenRouter adapter (primary)** — user's key or platform key; any model on OpenRouter.
  2. Anthropic BYOK adapter (kept — best tool-use reliability for orchestration).
  3. Local GGUF engine adapter (privacy tier, from v1 Phase 0).
- **Tool registry**: tools defined once in neutral JSON Schema; translated to each provider's format; each tool declares where it executes (client / server) and whether it needs approval.
- **Context manager**: compaction into a structured **case state** object (parties, facts, timeline, charges/claims, defenses found, evidence, citations, open questions), chunked document retrieval, prompt caching where the provider supports it.
- **Task planner**: a first-class todo system the model controls via `create_task` / `update_task` tools; rendered live in the UI. This is what makes it *feel* like Claude Code.

## 2.3 The OpenRouter reality check (critical engineering detail)

This is the most important new constraint: **many unrestricted/finetuned models on OpenRouter have weak or no native function calling** (Dolphin, Euryale, and similar finetunes often lack tool-call chat templates or emit malformed calls). A Claude Code–class agent lives and dies on reliable tool calls. Therefore the kernel MUST support two tool protocols:

1. **Native tool-calling** — used when the model supports it (check OpenRouter's `supported_parameters` for `tools`); normalize the OpenAI-style streamed tool-call deltas (the accumulation logic in `local-loop.ts` already does exactly this — reuse it).
2. **Structured-output fallback ("ReAct mode")** — for models without native tools: the system prompt teaches a strict fenced-block format (e.g. ```tool\n{"name": ..., "args": ...}\n```), the kernel parses it with a tolerant extractor (the existing three-strategy JSON extraction is a good base), executes, and feeds results back as user messages. Slightly less reliable, but it makes **every model on OpenRouter agent-capable**.

And the design that gets the best of both worlds — **the two-model architecture**:

- **Orchestrator model**: a strong, reliable tool-caller (DeepSeek R1/V3-class, Qwen3-235B-class, GLM-class, or Claude via BYOK) runs the loop: plans, searches, reads documents, builds the case state.
- **Voice model**: the user-selected model (including unrestricted ones) receives the fully-researched case state and writes the final analysis/strategy/draft with the full defense-advocate stance — no hedging, no refusals of legitimate defense work.
- The user sees one agent. Model routing is a settings detail: "Orchestrator: [auto]  •  Writer: [your pick]". Default = same model for both when it's capable of both.

This solves the real problem: unrestricted finetunes are usually *worse at agentic reliability* but chosen for their *unconstrained final output*. Split the jobs.

Also handle, at the adapter level: per-model context-length registry (pulled from OpenRouter's models API, not hardcoded), price/latency metadata for routing, automatic fallback chain when a model errors or times out, and usage accounting from OpenRouter's response metadata for billing/credits.

## 2.4 The mission layer: defense, loopholes, angles

The defense stance stops being one blob prompt and becomes a layered system prompt:

1. **Agent layer** — how to be an agent: plan first, use tools, verify claims, cite sources, track tasks, ask only when blocked.
2. **Mission layer** — the advocate stance (evolved from the existing `ghostModePrompt`): the default posture on every matter is *find what helps the user* — scope exclusions ("who does this rule NOT apply to"), temporal gaps and reset conditions, definition gaps and narrow interpretations, superior law (EU free movement, TFEU, proportionality), procedural defects and enforcement reality, and the practical path that keeps the user in the clear. Every claimed angle must be grounded in a retrieved source — an unsupported loophole is worse than none, because it burns the user in front of a judge.
3. **Case layer** — jurisdiction, language, case state, user profile.

New sub-agent that operationalizes "fight for you": the **Prosecution Simulator** — a red-team sub-agent that argues the *other side's* best case against the user, so the main agent can pre-empt every counterargument and rank defenses by survivability, not just by cleverness. This is what a great defense attorney actually does, and no competitor ships it.

## 2.5 The case workspace

Persistent, agent-operated, storage-mode aware (the existing dispatch matrix carries over):

```
Case: "Speeding fine — Munich, June 2026"
├── documents/        ← uploads (fine notice, rental contract, photos) — chunked + embedded on ingest
├── research/         ← agent-written findings, each with verified sources
├── drafts/           ← versioned deliverables (objection letter v1, v2…)
├── timeline.md       ← agent-maintained chronology
├── strategy.md       ← the approved defense plan
└── case-state.json   ← compacted working state (survives any context length)
```

- Storage: IndexedDB/OPFS in privacy mode, Convex when synced — same tool API over both.
- Export/import as a single open-format file (keep the `.verdictu` plan).
- Background tasks: long research jobs run server-side (or in a worker locally) and post results into the case; the user can close the tab and come back — parity with Claude Code's background tasks.

## 2.6 Playbooks (skills)

Packaged workflows = prompt + tool sequence + deliverable template, invocable by the user or by the agent itself:

- `/fight-fine` — traffic/administrative fines: procedure check, deadline check, formal-defect scan, objection letter.
- `/defend` — criminal/civil defense intake → full strategy with prosecution simulation.
- `/loophole-scan` — given a rule and the user's situation: applicability, exceptions, superior-law override.
- `/contract-review` — clause-by-clause risk table + redline (Legora's signature, commoditized).
- `/gdpr-request`, `/appeal`, `/demand-letter` — deliverable generators.

Playbooks are data, not code — new ones ship without redeploying the agent. This is the plug-and-play growth engine.

## 2.7 Local/privacy tier (demoted but kept — v1 Phase 0 intact)

Everything from v1 Phase 0 stands, unchanged in content, reduced in priority: engine abstraction (llama.cpp WebGPU primary / wllama WASM fallback / Transformers.js v4 as alternative), hardware probe → automatic model tier, consent-once auto-download via Service Worker + Background Fetch into OPFS (port the existing `opfsCache.ts` shim), instant-start ladder with hot-swap, inference in a Web Worker, COOP/COEP headers. Local mode runs the same kernel with a trimmed tool set and the ReAct fallback protocol (small models handle the fenced-block format better than native tool calls anyway). Ghost Local is the privacy story; OpenRouter is the power story.

## 2.8 Trust layer (unchanged from v1, now mandatory)

- Jurisdiction packs (pre-embedded statute bundles, offline RAG).
- Quote-level citation verification before display; unverifiable citations visibly flagged.
- For a defense agent this is doubly critical: an invented loophole is a malpractice machine. **Every angle the agent proposes must link to the exact source text it rests on.**

## 2.9 Build order

| Phase | Delivers | Notes |
|---|---|---|
| **0 — Kernel + OpenRouter adapter** | The loop: streaming tool use over OpenRouter, native + ReAct fallback protocols, model registry from OpenRouter API, fallback chains | Foundation. Reuse `loop.ts` structure + `local-loop.ts` delta accumulation + existing JSON extractors |
| **1 — Case workspace + tools** | Case files, document ingest/chunking, case-file tools, export/import | The agent gets hands |
| **2 — Planner + sub-agents** | Task system, strategy mode, research/jurisdiction/drafting sub-agents, **prosecution simulator**, two-model orchestrator/voice routing | The agent gets a brain and becomes "Claude Code for defense" |
| **3 — Trust layer** | Jurisdiction packs, citation verification | The agent becomes safe to rely on |
| **4 — Playbooks + deliverables** | Skill system, versioned drafts, redline/compare, tabular multi-doc review | The agent becomes a product |
| **5 — Ghost Local tier** | v1 Phase 0: GGUF engine abstraction, auto-detection, auto-load, worker inference | The privacy differentiator |
| **6 — Evals + desktop** | Legal eval harness (citation accuracy, tool-call validity, angle groundedness, per-model scores to auto-rank OpenRouter models), Tauri app with native llama.cpp | The moat hardens |

**Demo that beats Harvey/Legora in one minute:** upload a fine notice → agent plans visibly → researches the exact statute → simulates the authority's counterargument → presents three ranked, source-verified defense angles → produces a ready-to-send objection letter. No competitor does goal-in, deliverable-out defense work with visible agentic reasoning and verified citations.

---

# PART 3 — Research sources

- [wllama — WebAssembly binding for llama.cpp](https://github.com/ngxson/wllama)
- [WebLLM (MLC)](https://github.com/mlc-ai/web-llm)
- [llama.cpp](https://github.com/ggml-org/llama.cpp) + [llama.cpp WebGPU support news](https://www.kucoin.com/news/flash/llama-cpp-adds-webgpu-support-browser-inference-vram-drops-over-30)
- [Llamas on the Web: LLM Inference with WebGPU (arXiv, May 2026)](https://arxiv.org/html/2605.20706v1)
- [Browser-Native Agents & LLMs: Complete Guide (2026)](https://wowdata.science/browser-native-agents-llms-in-browser-ai-guide-2026/)
- [Intel: A Guide to In-Browser LLMs](https://www.intel.com/content/www/us/en/developer/articles/technical/web-developers-guide-to-in-browser-llms.html)
- [Running LLMs in the Browser: WebGPU, Transformers.js, Chrome Built-in AI](https://pockit.tools/blog/run-llms-browser-webgpu-transformers-js-chrome-built-in-ai-guide/)
- [Best Local Models for Tool Calling in 2026](https://www.promptquorum.com/power-local-llm/best-local-models-tool-calling-2026)
- [Small Language Models for On-Device Agents in 2026](https://www.digitalapplied.com/blog/small-language-models-on-device-agents-2026-guide)
- [WebAssembly for LLM Inference in Browsers](https://dasroot.net/posts/2026/01/webassembly-llm-inference-browsers-onnx-webgpu/)
- [Mozilla.ai: WebLLM + WASM + WebWorkers](https://blog.mozilla.ai/3w-for-in-browser-ai-webllm-wasm-webworkers/)
