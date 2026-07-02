# Verdictu — Full Agent Feature Vision

This document describes the complete target feature set for the Verdictu agent, spanning web (first), desktop (second), and mobile (third). It is a superset of what exists today (see [verdictu-monorepo.md](verdictu-monorepo.md) for current build state, [verdictu-old-main.md](verdictu-old-main.md) for the prior feature-rich iteration) and extends it with the broader automation/platform capabilities scoped on 2026-07-02: SEO/marketing analysis, desktop control, plug-and-play local inference, persistent memory, automations, code review, and browser-driven workflow verification.

**Positioning note:** this is a deliberately broad scope — legal vertical intelligence plus general-purpose agentic infrastructure (browser control, coding, automation). The legal features are the trust anchor and primary product; the platform/automation features are both product surface in their own right and the underlying substrate that makes the legal agent capable of acting (not just answering).

---

## 1. Core Legal Intelligence

### 1.1 Multi-Jurisdiction Legal Research

Answers grounded in primary sources (statutes, regulations, case law) across supported jurisdictions (starting with DK, DE, EU, UK, FR, SE, NL, US, RO), not just general web search. Every claim traces to a citable source; the agent states confidence and flags when a jurisdiction or area of law is out of its depth rather than guessing.

### 1.2 Case Defense / Advocate Mode

The existing "always find the angle that helps the user" stance (scope gaps, temporal gaps, definition gaps, superior law, enforcement reality, practical path) extended into active case-building: given a fact pattern, the agent identifies defenses, counterarguments, procedural challenges, and precedent that supports the user's position — explicitly adversarial rather than neutral, which is the core brand differentiator.

### 1.3 Citation Grounding & Verification

A verification pass that checks whether a cited law/case/section actually supports the claim being made before the answer ships, plus a visible confidence score per claim. This is the credibility gate professional users apply before trusting an AI legal answer, and the single highest-leverage trust feature to get right early.

### 1.4 Multi-Document Analysis at Scale

Beyond two-document Compare mode: ingest dozens or hundreds of documents (contracts, filings, discovery) and extract structured data points into a table (parties, dates, obligations, governing law, risk flags) for bulk review — the feature that makes Legora sticky for high-volume contract work.

### 1.5 Playbook-Based Contract Review & Redlining

Users (or firms) upload a playbook/style guide; the agent reviews incoming contracts against it, flags deviations, and proposes inline redlines with rationale, exportable back into Word/PDF.

### 1.6 Drafting & Template Library

Template-driven document generation (NDAs, service agreements, notices, etc.) with `[PLACEHOLDER]` markers for user-specific details, jurisdiction-appropriate language, and a growing library the agent can extend from user-created templates.

### 1.7 Matter / Case Management

Conversations, documents, drafts, and precedents organized by client/matter rather than a flat chat history, so context (and Persistent Memory, §5) attaches to the right case over time.

---

## 2. Marketing & SEO Analysis Agent

A secondary agent mode focused on analyzing and improving a user's or firm's public-facing content — site audits (technical SEO, page speed, structured data), content gap analysis, competitor visibility comparison, and keyword/topic research. For law firms and legal professionals specifically, this overlaps with the legal core: reviewing marketing copy, disclaimers, and website legal notices for compliance (advertising rules for legal services, accessibility, privacy policy accuracy) while also optimizing for discoverability. Positioned as an adjacent tool for the Companies tier rather than the primary product surface.

---

## 3. Ghost Mode — Plug-and-Play Local Inference

### 3.1 Browser tier (WebLLM)

Zero-install, in-browser local inference via WebLLM/MLC — pick a model sized to the device's VRAM (tiny/small/medium/large tiers already scoped in old-main), download once, run entirely client-side. No account or API key required to try it; this is the frictionless on-ramp.

### 3.2 Desktop tier (bigger models)

The downloadable desktop app unlocks larger local models than a browser sandbox can practically run (7B–70B+ class, depending on hardware), taking advantage of native GPU access, more RAM/VRAM headroom, and persistent background loading (no re-download/re-init per session). This is the natural upgrade path from "try it in-browser" to "run it seriously, offline, on your machine."

### 3.3 Model marketplace / auto-recommendation

Hardware-aware model suggestions (detect available VRAM/compute, recommend the best-fitting model), with clear tradeoffs surfaced (speed vs. quality vs. footprint) and a one-click swap between models mid-conversation.

---

## 4. Desktop Control & Computer-Use Automation

### 4.1 Native desktop agent capabilities

The desktop app can observe and act on the user's machine within granted permissions — reading/writing local files, watching a folder for new contracts to auto-review, filling forms in other native apps (e.g., a court e-filing portal or case management software) — going beyond chat into task execution.

### 4.2 Legal workflow automation

Scoped, legal-specific automation is the priority use of desktop control: monitoring court dockets for updates, searching case-law databases and pulling results back into the matter, auto-filling and submitting filings, tracking deadlines and triggering reminders.

### 4.3 General computer-use

Broader OS-level automation (open apps, manage files, cross-app workflows) modeled on existing computer-use agent patterns, gated behind explicit per-application permission grants and a clear read/click/full tiering so the agent never acts on sensitive apps (banking, email) without deliberate authorization.

---

## 5. Persistent Memory & Cross-Session Context

### 5.1 Long-term memory model

A Codex/Claude-Code-style memory system: the agent accumulates durable, structured knowledge about a user or matter over time (facts established, prior decisions, standing preferences) instead of starting cold each session — separate from raw chat history, actively curated and recalled when relevant.

### 5.2 Cross-device sync

Memory, precedent library, and matter data sync across web, desktop, and mobile via the existing Convex backend, so a case started on web continues seamlessly on desktop or mobile — this replaces old-main's IndexedDB-only local storage, which does not survive multi-device use.

---

## 6. Automations & Multi-Step Workflows

### 6.1 Workflow builder

User- or template-defined multi-step agent workflows (e.g., "on new contract upload → extract key terms → check against playbook → draft redline → notify me") that chain research, document, and drafting capabilities without a human re-prompting each step.

### 6.2 Scheduled / triggered automations

Time- or event-triggered runs — recurring docket checks, deadline reminders, periodic compliance re-scans of published content — surfaced as notifications rather than requiring the user to remember to ask.

---

## 7. Code Review & Development Testing Agent

### 7.1 What it does

An agent mode capable of reviewing code changes for correctness and quality, and running/verifying tests — useful both as an internal dogfooding tool (Verdictu's own engineering team using the agent to build Verdictu) and, longer-term, as a product surface for legal-tech and internal tooling teams who need lightweight review/testing support alongside their legal workflows.

### 7.2 Positioning

Treated as a secondary capability layered on the same underlying agentic infrastructure (workflows, browser control, persistent memory) rather than a primary go-to-market feature — the core trust story stays legal-first; this rides on the platform built for that purpose.

---

## 8. Browser Automation & Workflow Verification

### 8.1 Agentic browser control

The agent can drive a browser directly — navigate, fill forms, read page content, click through multi-step flows — to perform legal research on sites without APIs, submit online filings, or gather evidence/screenshots for a case.

### 8.2 QA / workflow verification

The same browser-control capability doubles as a way to verify that a built workflow actually behaves as intended (e.g., confirming an automation correctly submitted a filing or extracted the right data), closing the loop between "automation defined" and "automation confirmed working."

---

## 9. Collaboration & Enterprise Features

- Shared workspaces with multiplayer commenting/editing on documents and drafts.
- Team accounts with role-based access (already promised in the Companies pricing tier, not yet implemented).
- Assign review tasks to teammates; track status across a matter.
- Custom integrations: Word/Outlook add-ins, iManage/SharePoint/Google Drive/Dropbox connectors, e-signature (DocuSign).
- Dedicated account manager and SLA guarantees for enterprise customers.

---

## 10. Trust, Privacy & Compliance

- No training on user data — operationalized (not just stated in the pricing FAQ) with a verifiable data-handling policy.
- Zero-retention mode for sensitive matters.
- SOC2/ISO certification, audit logs, SSO/SAML, admin roles.
- Encryption in transit and at rest; DPA availability for enterprise customers.
- Ghost Mode's on-device inference as the strongest privacy claim in the category — no other major legal AI competitor offers true local inference.

---

## 11. Platform Rollout Strategy

| Platform    | Priority | Focus                                                                                                                                                                                                    |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Web**     | Now      | Ship the core agent pipeline end-to-end (research, citation grounding, compare, draft) plus Ghost Mode browser tier — reach feature parity with old-main before layering on the rest.                    |
| **Desktop** | Next     | Bigger local models via Ghost Mode desktop tier, native desktop control and computer-use automation, folder-watch workflows, native Word/Outlook add-ins, offline-first operation.                       |
| **Mobile**  | Later    | Quick-capture (photograph a document, ask about a clause), voice dictation, deadline/matter push notifications, lightweight approve/reject review — not a full port of the editor or automation builder. |

All three platforms share one backend (Convex) for auth, memory, matters, and sync, so a conversation or case started on one device continues on another without loss of context.

---

## 12. Feature Summary by Platform

| Feature area                              | Web              | Desktop                   | Mobile                  |
| ----------------------------------------- | ---------------- | ------------------------- | ----------------------- |
| Legal research & case defense             | ✅               | ✅                        | ✅ (read/query)         |
| Citation grounding & verification         | ✅               | ✅                        | ✅                      |
| Multi-document analysis & playbook review | ✅               | ✅                        | 🟡 view-only            |
| Drafting & templates                      | ✅               | ✅                        | 🟡 view/approve         |
| Marketing & SEO analysis                  | ✅               | ✅                        | ❌                      |
| Ghost Mode (browser tier)                 | ✅               | —                         | 🟡 lightweight models   |
| Ghost Mode (desktop/bigger models)        | —                | ✅                        | ❌                      |
| Desktop control & computer-use automation | ❌               | ✅                        | ❌                      |
| Persistent memory                         | ✅               | ✅                        | ✅                      |
| Automations & workflows                   | ✅ (define)      | ✅ (define + run locally) | 🟡 monitor/trigger only |
| Code review & dev testing                 | 🟡 internal tool | 🟡 internal tool          | ❌                      |
| Browser automation & verification         | ✅               | ✅                        | ❌                      |
| Collaboration & enterprise                | ✅               | ✅                        | 🟡 view/comment         |
| Trust, privacy & compliance controls      | ✅               | ✅                        | ✅                      |
