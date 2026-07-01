# Verdictu — Feature Catalog

A complete inventory of every user-facing feature in the app: what it does, where it lives in the code, and the exact copy/text used in the UI. Generated from a full pass over the codebase on 2026-07-01.

---

## 1. Marketing Site

### 1.1 Homepage / Hero
**Files:** `components/marketing-sections/hero.tsx`, `app/(marketing)/page.tsx`

- Hero title: **"Law and Clarity"**
- Animated news ticker
- Marquee carousel of example prompts feeding into the primary AI chat input

**News ticker items** (`json/news.json`):
- "Christopher Vaccaro reports on the latest street art festival"
- "A look back at the events which defined Berlin's cultural landscape"
- "Episode 5 of Fyrre Magazine's podcast series is out now"

**Marquee example prompts** (`data/marquee-data.tsx`):
- ⚖️ "What are my rights when getting fired?"
- 📄 "Create a rental agreement."
- 🧾 "How do I file a consumer complaint?"
- 💼 "What are an employer's legal duties?"
- 🛡️ "How can I protect my personal data online?"
- ✍️ "Generate a non-disclosure agreement."
- 🏠 "Tenant vs landlord responsibilities."
- 🔍 "Is this non-compete clause enforceable?"
- 📌 "Write a simple service contract."
- 🧠 "Summarize this clause in plain English."
- 🧑‍⚖️ "What evidence do I need for small claims?"
- 📑 "Outline a privacy policy for my website."
- 🤝 "Draft a partnership agreement outline."
- 🧾 "What should invoice payment terms include?"
- 🛂 "What are basic visa work rights?"
- 📝 "Explain termination notice periods."

### 1.2 Video Presentation
**File:** `components/marketing-sections/video-presentation/video-presentation.tsx`

Featured video built from the latest article, with a play/pause overlay and article metadata (author, date, read time, label) linking to the full article.

### 1.3 Our Mission
**File:** `components/marketing-sections/our-mission/our-mission.tsx`

- Section title: **"Our Mission"**
- Headline: **"Law and clarity for everyone."**
- Body: *"At Verdictu, we believe that the law should be accessible to everyone. Our mission is to break down complex legal concepts into clear, understandable language — empowering individuals to navigate the legal landscape with confidence."*
- Body: *"We are committed to delivering independent, rigorous legal analysis that upholds the principles of justice, transparency, and accountability. Whether you are a legal professional, a student, or a curious citizen, Verdictu is your trusted source for law and clarity."*
- Displays a founder credit ("Founder Name" / "Founder & Editor-in-Chief") on a dark green background.

### 1.4 Success Stories
**File:** `components/marketing-sections/success-stories/success-stories.tsx`

Carousel of success stories pulled from `getSuccessStories()`, with an "All stories" link.

### 1.5 Pricing Section (homepage)
**File:** `components/marketing-sections/pricing/pricing.tsx`

Four-column plan grid, Pro plan highlighted.

| | Basic | Pro | Companies | Credits |
|---|---|---|---|---|
| **Badge** | — | "Most popular" | — | — |
| **Price** | €9 | €29 | Custom | From €5 |
| **Billing** | per month, billed annually (or €12 month-to-month) | per month, billed annually (or €35 month-to-month) | pricing tailored to your team | per credit bundle |
| **Description** | "For individuals who need occasional legal clarity without the complexity." | "For professionals who rely on legal intelligence every day." | "For legal teams and organisations that need scalable, integrated access." | "No subscription. Buy credits when you need them and use them at your own pace." |
| **CTA** | "Get started" | "Get started" | "Contact us" | "Buy credits" |
| **Features** | 50 AI queries/month · Jurisdiction-locked answers · Source citations included · Email support | Unlimited AI queries · All jurisdictions · Source citations included · PDF document analysis · Priority support · Early access to new features | Everything in Pro · Team accounts & roles · Custom integrations · Dedicated account manager · SLA guarantee | No monthly commitment · 1 credit = 1 AI query · Credits valid for 12 months · Source citations included · Top up anytime |

### 1.6 Pricing Comparison Table
**File:** `components/marketing-sections/pricing/pricing-comparison.tsx`

Full feature-by-feature comparison across all four plans, grouped by Usage / Access / Features / Teams / Support. Highlights include:

| Feature | Basic | Pro | Companies | Credits |
|---|---|---|---|---|
| AI queries | 50/month | Unlimited | Unlimited | Pay-per-use |
| Query rollover | No | No | No | Yes |
| Credits valid for | — | — | — | 12 months |
| Jurisdictions | Limited | All | All | All |
| Source citations | Yes | Yes | Yes | Yes |
| PDF document analysis | No | Yes | Yes | Yes |
| Compare Mode | No | Yes | Yes | Yes |
| Draft Mode templates | No | Yes | Yes | Yes |
| Smart Workflows | No | Yes | Yes | No |
| AI Text Editor | No | Yes | Yes | No |
| Local & Private AI | No | Yes | Yes | No |
| Team accounts & roles | No | No | Yes | No |
| Custom integrations | No | No | Yes | No |
| Dedicated account manager | No | No | Yes | No |
| SLA guarantee | No | No | Yes | No |
| Support level | Email | Priority | Dedicated | Standard |
| Early access | No | Yes | Yes | No |

### 1.7 Pricing FAQ
**File:** `components/marketing-sections/pricing/pricing-faq.tsx`

1. **"Is there a free trial?"** — "We don't offer a free trial at the moment, but you can start with the Credits plan — no subscription required. Buy a small bundle, try the platform, and upgrade when you're ready."
2. **"Can I switch plans at any time?"** — "Yes. You can upgrade or downgrade your plan at any time from your account settings. Changes take effect at the start of your next billing cycle. Unused queries do not roll over."
3. **"What happens when I reach my query limit on the Basic plan?"** — "Once you hit your 50-query limit for the month, you won't be able to run new queries until your cycle resets. You can upgrade to Pro at any time for unlimited access, or top up with a Credits bundle."
4. **"How do credits work?"** — "Credits are a pay-as-you-go option — 1 credit equals 1 AI query. Credits are valid for 12 months from purchase. They never expire within that window and can be topped up at any time."
5. **"What payment methods do you accept?"** — "We accept all major credit and debit cards (Visa, Mastercard, Amex) as well as SEPA direct debit for European customers. Enterprise invoicing is available for Companies plan customers."
6. **"Can I use Verdictu across multiple jurisdictions?"** — "Basic plan users have access to a limited set of jurisdictions. Pro and Companies plan users have access to all supported jurisdictions. Credits plan users also have full jurisdiction access."
7. **"Is my data private and secure?"** — "Yes. All queries and documents are encrypted in transit and at rest. We do not use your data to train models. Companies plan customers can request a dedicated data processing agreement (DPA)."
8. **"What does the Companies plan include that Pro doesn't?"** — "The Companies plan adds team accounts with role-based access, custom integrations with your existing legal tools, a dedicated account manager, and an SLA guarantee for uptime and response times."

### 1.8 Dedicated Pricing Page
**File:** `app/(marketing)/pricing/page.tsx`

- Page title: "Pricing | Verdictu"
- Page description: "Simple, transparent pricing for individuals, professionals, and teams."
- Heading: **"Pricing"**
- Subheading: "Simple, transparent pricing. No hidden fees. Cancel or change plans at any time."
- Renders the full plan grid, comparison table, and FAQ.

### 1.9 Features Section
**File:** `components/marketing-sections/features/features.tsx`

Dynamic 3-column grid of feature cards (image, title, date, duration), sourced from `getFeatures()`.

### 1.10 Articles / Blog
**Files:** `components/marketing-sections/articles-feed.tsx`, `app/(marketing)/articles/page.tsx`

Reverse-chronological article feed with a metadata sidebar. Each card shows image, title, description, author, date, read time, and label, with a **"Read"** button (arrow icon) linking to the full article.

---

## 2. Legal AI Agents

Verdictu ships three parallel agent backends, all exposed through the same chat UI.

### 2.1 Standard Legal Agent (cloud)
**Files:** `app/api/agent/route.ts`, `documentation/standard-agent.md`

Full 7-step pipeline: law identification → web search → alignment check → synthesis. Default provider is Gemini, configurable to Anthropic (Claude) or OpenAI.

**Output structure — General mode:**
`## Summary` → `## Legal Basis` → `## Analysis` → `## Practical Implications` → `## Disclaimer`

**Output structure — Compare mode:**
`## Document Overview` → `## Conflicts` → `## Gaps` → `## Risk Assessment` (HIGH/MEDIUM/LOW table) → `## Recommendations` → `## Disclaimer`

**Output structure — Draft mode:**
Formal jurisdiction-appropriate language, standard clauses, `[PLACEHOLDER: description]` markers for user-specific details, disclaimer at the end.

**Jurisdictions supported:** Denmark (DK), Germany (DE), European Union (EU), United Kingdom (UK), France (FR), Sweden (SE), Netherlands (NL), United States (US), Romania (RO).

**Streamed pipeline events (user-visible in the UI):**
- `intake` — "Locking jurisdiction and mode…"
- `identifying` — "Identifying applicable laws and statutes…"
- `laws_found` — identified laws with relevance (primary/secondary/supplementary) and confidence
- `searching` — "Searching 1/5: "{query}"…"
- `search_results` — "Found {count} sources for "{query}"…"
- `sources_ranked` — total sources + search engine used (Tavily or DuckDuckGo)
- `aligning` — alignment correction step
- `synthesizing` — "Composing legal analysis…"
- `delta` — streamed answer tokens
- `follow_up_generating` — "Generating follow-up questions…"
- `done` — final answer, sources, laws, and follow-up questions

### 2.2 Ghost Mode (on-device, local WebLLM)
**Files:** `lib/ghost/agent.ts`, `documentation/ghost-mode-agent.md`

Runs entirely in-browser via WebLLM (MLC) — no inference leaves the device. Only web search calls go to a server (Tavily/DuckDuckGo), and only when the agent decides research adds value (it skips search for direct drafting tasks).

**Prompt stance:** always-on advocate for the user. Verbatim system framing:

> "Your default stance on every question: find the angle that helps the user. If there is a law, find the exception. If there is a rule, find the gap. If someone is accused, find the defense. If a deadline exists, find the reset condition. If a restriction applies, find who it does NOT apply to."

**Six response angles (General mode):** Scope & Who It Actually Applies To · Temporal Gaps · Definition Gaps · Superior Law (EU free movement, TFEU, Regulation 883/2004) · Enforcement Reality · Practical Path.

**Local models offered (by VRAM tier):**
- Tiny (<1.5GB): Qwen 3 0.6B, Qwen 2.5 1.5B, SmolLM2 360M/1.7B
- Small (1–2GB): Qwen 3 1.7B (default), Gemma 2 2B, Phi 3.5 Mini
- Medium (2–4GB): Qwen 2.5 3B, Qwen 3 4B
- Large (7–8B): DeepSeek R1 7B, Qwen 2.5 7B, Qwen 3 8B, Llama 3.1 8B, Mistral 7B

**Pipeline events:** `classifying` → `intent` (domain classification + search-need detection) → optional `searching`/`search_results`/`sources_ranked` → `synthesizing` → `delta` → `follow_up_generating` → `done`.

### 2.3 Ghost Open (cloud, via OpenRouter)
**Files:** `app/api/ghost-api/route.ts`, `documentation/ghost-api-agent.md`

Cloud equivalent of Ghost Mode using OpenRouter, same defense-advocate stance and smart search detection. Inference is wired; billing/auth is planned but not yet live.

**Models offered:**
- *Reasoning* (best for finding gaps/exceptions): DeepSeek R1 — default, DeepSeek R1 (May 2025), QwQ 32B, Nemotron 70B
- *Fast*: Llama 3.3 70B, Mistral Large (Nov 2024), Qwen 2.5 72B, Gemini 1.5 Flash
- *Unrestricted* (no content filters): Nous Hermes 3 70B, Dolphin 3.0 R1 22B, Dolphin Mixtral 8x7B, Euryale 70B v3, Nous Capybara 7B

**Credit packs** (`components/ghost/GhostCredits.tsx`):
| Pack | Price | Credits | Rate |
|---|---|---|---|
| Starter | €5 | 150 | €0.033/credit |
| Standard (Popular) | €10 | 350 | €0.029/credit |
| Power | €25 | 1000 | €0.025/credit |
| Enterprise | €100 | 5000 | €0.020/credit |

Footer copy: *"Credits expire 12 months after purchase. Powered by Stripe."*

### 2.4 Simple Chat (general, non-legal mode)
**Files:** `app/(agent)/simple-chat`, `app/api/simple-chat`

Plain conversational assistant for when legal mode is off — no jurisdiction or mode selector required. Placeholder text: **"Ask me anything…"**. Supports multi-turn context, markdown rendering, streaming, and file attachments.

---

## 3. Chat Interface

### 3.1 Composer / Chat Input
**File:** `components/agent-general/aiChatInput.tsx`

- Placeholder (legal mode): **"Ask a legal question, compare documents, request a draft…"**
- Placeholder (general mode): **"Ask me anything…"**
- Enter to send, Shift+Enter for a new line.

**Attachments:**
- Accepted formats: PDF, DOCX, DOC, TXT — up to 20MB per file, multiple files at once
- Drag-and-drop with "Drop files to attach" overlay
- Per-file status: uploading (%), done (checkmark), error (alert)
- Per-file actions: "Use as source", "Summarize", "Extract citations", "Rename", "Remove"
- Error copy: *"Unsupported file type. Please upload {ACCEPTED_EXT_HINTS}."* / *"File is empty. Open it in Word/your editor and save it first."* / *"File too large. Max {MAX_FILE_SIZE_MB}MB."*
- Extraction: DOC files go through the server (`/api/extract-doc`); PDF/DOCX/TXT extracted client-side.

**Toolbar (legal mode adds):**
- **Attach** button — opens file picker
- **DeepSearch** toggle — indigo when on. Tooltip: "DeepSearch on — click to disable web search" / "DeepSearch off — click to enable web search"
- **Jurisdiction selector** — EU, Denmark, Germany, UK, France, Sweden, Netherlands (required; shows an error state if missing)
- **Mode selector** — see 3.2

### 3.2 Mode Selector
| Mode | Label | Description | Example |
|---|---|---|---|
| General (default) | "General" | "Legal research questions" | "What does GDPR say about right to erasure?" |
| Compare | "Compare" | "Comparing two legal documents" | "Compare these two lease agreements" |
| Draft | "Draft" | "Generating legal documents" | "Draft an NDA for a freelancer project" |

### 3.3 Citations
Checkbox to toggle source citations. When on: inline `[1]`, `[2]` markers appear in the answer, and a Sources section is appended as `[1] Title — URL`.

### 3.4 Jurisdiction Display Labels
`auto` → "Auto-detected" · `dk` → "Denmark" · `eu` → "European Union" · `de` → "Germany" · `uk` → "United Kingdom" · `fr` → "France" · `se` → "Sweden" · `nl` → "Netherlands" · `us` → "United States" · `ro` → "Romania"

### 3.5 Markdown Rendering
Custom renderer supports `##`/`###` headings, bulleted and numbered lists, bold/italic, inline code, tables, blockquotes, and clickable `[n]` citation superscripts that highlight the matching source card.

**Law citation chips:** patterns like "Art. 17(1) GDPR" or "§ 433 Abs. 1 BGB" are auto-detected (regex covers GDPR, DSA, DMA, AI Act, DSGVO, CCPA, HIPAA, NIS2, ePrivacy, TFEU, ECHR) and rendered as emerald pill chips.

### 3.6 Sources Panel ("Perplexity style")
Search-query chips at top, source count with a globe icon, and horizontally scrollable source cards — numbered badge, favicon, domain, 2-line title, 2-line snippet. Clicking a citation highlights its card for ~2 seconds.

### 3.7 Agent Pipeline Timeline
Vertical step timeline with pending/running/completed states.

- **Standard agent steps:** Jurisdiction & Mode → Law Identification → Deep Search → Legal Analysis → Follow-up Questions
- **Ghost mode steps:** Ghost Mode → Analyzing Question → (Searching, if triggered) → Generating Response → Follow-up Questions

Completed steps are clickable and expand into detail cards (domain, laws found, confidence, search engine, word count, etc).

### 3.8 Status Line
Braille spinner (⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏) cycling through verbs — Analyzing, Searching, Retrieving, Processing, Reasoning, Synthesizing, Reviewing, Scanning, Extracting, Identifying, Evaluating, Cross-referencing — formatted as `⠋ Analyzing query… 12.5s`.

### 3.9 Turn Display
User bubble (question + jurisdiction badge + mode badge + attachment count) → sources panel → rendered assistant answer → footer with elapsed time and a **"Save as Precedent"** button. Turns are separated by a dashed line.

### 3.10 Empty State (legal mode)
- Heading: **"Verdictu Legal AI"**
- Copy: "Ask a legal question or pick a mode below to get started"
- Four suggestion cards:
  1. **Analyze a regulation** — "Ask about GDPR, AI Act, DSA and national laws" · hint: "Is this GDPR-compliant?"
  2. **Research case law** — "Deep search across legal databases" · hint: "Find relevant precedents for…"
  3. **Draft a document** — "Memos, responses, compliance reports" · hint: "Draft a DPA for…"
  4. **Ghost Mode** — "Private AI — enable in the sidebar" · hint: "No data leaves your device"

### 3.11 Chat Actions
- **Copy answer** to clipboard (checkmark confirmation for 2s)
- **Save as Precedent** — persists the turn to the local precedent library
- **Export chat** — downloads a `.verdictu` file with full conversation history
- **Stop** — aborts an in-flight response

### 3.12 Badges
- Ghost Mode active: "Ghost · {Model Name}"
- Ghost Open active: "Ghost Open · {Model Name}"
- Storage: "Local only" or "Cloud (soon)"
- "Deep Search" badge shown in legal mode when enabled

### 3.13 Multi-turn Conversations, Export & Import
Conversation history is persisted per-chat to IndexedDB. **Export** produces a `.verdictu` JSON file with the full history and settings; **Import** accepts `.verdictu`/`.json` and rehydrates completed turns.

### 3.14 Precedent Library
**File:** `lib/memory/client-store.ts`

Saved answers are stored locally (IndexedDB) with title, parties, jurisdiction, and tags, and can be pulled back into future agent context.

---

## 4. Document Editor

### 4.1 Template Grid
**Files:** `components/agent-general/template-grid.tsx`, `lib/templates.ts`

- Title: **"Legal Documents Templates"**
- Description: "Browse the most relevant templates below. Select any template to view its full context and details before using it in your workflows."
- **"Create new template"** button
- Cards expand inline to preview content, with a **"Use & Edit Document"** button to open the editor, and a **"View Context"** link.

**Built-in templates:**
| Template | Category | Description |
|---|---|---|
| Transmittal of Documents for Signature | Communication | "A formal cover letter for sending documents that require a signature." |
| Legal Service Agreement | Contracts | "A standard agreement between a law firm and a client for legal services." |
| Checklist Documents to Bring to Your Attorney | Checklists | "A helpful checklist for clients to prepare before meeting their attorney." |
| Contract on Retaining Legal Counsel | Contracts | "An agreement to officially retain a lawyer or law firm for specific legal representation." |
| Website Legal Notice | Notices | "Standard terms, conditions, and copyright notices for a business website." |
| Standard Operation Procedure | Operations | "Internal and external document identification procedure." |

### 4.2 Editor
**File:** `components/editor/DocumentEditor.tsx`

Lexical-based rich text canvas with an AI chat sidebar. Toolbar: Undo, Redo, Bold, Italic, Underline, Strikethrough.

### 4.3 Document Extraction API
**File:** `app/api/extract-doc`

Server-side text extraction for DOC/DOCX/PDF/TXT, used for both chat attachments and template ingestion.

---

## 5. Settings

**File:** `components/settings/AgentSettings.tsx` — opens as a left-sliding panel from a settings icon.

**Provider**
- *Ghost Local* — "On-device model, no internet required"
- *Ghost Open* — "Your Claude API key — full agentic loop" (reveals a Claude API key field with show/hide toggle, and a model selector)

**Storage**
- *Local only* — "All data stays in your browser"
- *Sync with Verdictu* — "Encrypted, cross-device"

**Research**
- *Use Verdictu law database* checkbox — "(requires Sync)"
- *Bring your own Tavily key* checkbox — reveals a Tavily API key field with show/hide toggle

**Privacy**
- **"Export all my data"** — downloads `verdictu-export.json`
- **"Import conversation"** — accepts `.verdictu`/`.json` files

---

## 6. Ghost Mode UI

### 6.1 Ghost Mode Toggle
**File:** `components/ghost/GhostModeToggle.tsx`

Two side-by-side toggle buttons:
- **Ghost** — "Enable Ghost Mode — private & offline, no content filters" (status dot: amber loading, emerald ready, red error)
- **Ghost Open** — "Enable Ghost Open — cloud models via OpenRouter, unrestricted" (amber status dot when active)

Below the active toggle: a model selector and, for Ghost Open, a credit balance badge.

### 6.2 Ghost (Local) Model Selector
Header: "Ghost Models" / "Offline · No data leaves device". Models grouped by VRAM tier, with a "Best" badge (Zap icon) on recommended models, warnings for shader-f16 requirement, and a "Desktop Only" lock badge where relevant. Each entry shows provider, download size, VRAM needed, and a description.

### 6.3 Ghost Loading Bar
Progress bar with percentage while a local model downloads. On error: a red alert box with a specific message (e.g. missing shader-f16, insufficient storage) plus a **"Switch to {Model}"** suggestion button and a **"Clear cache & retry"** button.

### 6.4 Ghost Open Model Selector
Header: "Ghost Open Models" / "via OpenRouter". Category tabs: **Reasoning** ("For finding legal gaps and exceptions"), **Fast** ("Lower latency responses"), **Unrestricted** ("No content filters"). Each model lists provider, context window, and "1 credit/query" cost, with "Best" and "No filters" badges where relevant.

### 6.5 Ghost Credits Widget
**File:** `components/ghost/GhostCredits.tsx`

- **Badge variant** (inline): credit count with a Zap icon, colored red at 0 credits, amber at 1–9, gray at 10+; clicking opens the buy modal.
- **Widget variant:** "{N} credit(s) remaining" with status copy — "No credits remaining" (red) or "Running low" (amber, 1–9) — and a **"Buy credits"** button.
- **Buy Credits modal:** header "Buy Ghost API Credits", the four credit packs from §2.3, footer "Credits expire 12 months after purchase. Powered by Stripe."

---

## 7. Authentication

Auth is handled by Clerk (`@clerk/nextjs`), providing the sign-in/sign-up flows used to gate the chat, editor, and settings areas.

---

## Summary

| Area | Highlights | Count |
|---|---|---|
| Marketing pages | Hero, Video, Mission, Success Stories, Pricing, Features, Articles | 7 sections |
| Pricing plans | Basic, Pro, Companies, Credits | 4 plans |
| Agent backends | Standard (cloud), Ghost Mode (local), Ghost Open (cloud/OpenRouter) | 3 agents |
| Chat modes | General, Compare, Draft | 3 modes |
| Document templates | Built-in legal templates | 6 templates |
| Settings sections | Provider, Storage, Research, Privacy | 4 sections |
| Jurisdictions | DK, DE, EU, UK, FR, SE, NL, US, RO | 9 |
| Local (Ghost) models | Tiny → Large VRAM tiers | 15+ |
| Cloud (Ghost Open) models | Reasoning / Fast / Unrestricted | 14+ |
