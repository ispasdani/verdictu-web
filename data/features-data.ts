import type { LucideIcon } from "lucide-react";
import {
  Brain,
  FileText,
  Ghost,
  GitBranch,
  ScanEye,
  Scale,
  Shield,
  Target,
  Workflow,
} from "lucide-react";

export type Feature = {
  id: string;
  icon: LucideIcon;
  title: string;
  shortDescription: string;
  fullDescription: string;
};

export const FEATURES: Feature[] = [
  {
    id: "legal-research",
    icon: Scale,
    title: "Legal Research & Citations",
    shortDescription:
      "Answers grounded in real statutes, regulations, and case law across every supported jurisdiction, not just web search.",
    fullDescription:
      "Every answer traces back to a citable primary source — statutes, regulations, and case law across supported jurisdictions (DK, DE, EU, UK, FR, SE, NL, US, RO). A verification pass checks that each citation actually supports the claim being made, with a visible confidence score per claim, and the agent tells you plainly when a question falls outside its depth instead of guessing.",
  },
  {
    id: "case-defense",
    icon: Shield,
    title: "Case Defense & Advocate Mode",
    shortDescription:
      "An always-on advocate that finds the exception, the gap, and the angle that helps your case.",
    fullDescription:
      "Verdictu's default stance is adversarial, not neutral: given a fact pattern, it actively builds your case — surfacing defenses, counterarguments, procedural challenges, and supporting precedent. If there's a law, it finds the exception. If there's a deadline, it finds the reset condition. This advocate framing is Verdictu's core brand differentiator against neutral 'assistant' style legal tools.",
  },
  {
    id: "draft-redline",
    icon: FileText,
    title: "Draft & Redline Documents",
    shortDescription:
      "Generate contracts from templates, or review incoming documents against your own playbook.",
    fullDescription:
      "Draft NDAs, service agreements, and notices from a growing template library with jurisdiction-appropriate language and clearly marked placeholders. Upload your own playbook or style guide and Verdictu reviews incoming contracts against it, flagging deviations and proposing inline redlines with rationale — exportable straight back into Word or PDF.",
  },
  {
    id: "ghost-mode",
    icon: Ghost,
    title: "Ghost Mode — Private Local AI",
    shortDescription:
      "Zero-install local inference in your browser, with bigger models unlocked on desktop.",
    fullDescription:
      "Ghost Mode runs entirely on-device — pick a model sized to your hardware, download once, and run it fully client-side with no account required. The desktop app unlocks larger local models (7B–70B+ class) than a browser sandbox can practically run, taking advantage of native GPU access for serious, fully offline work. No other legal AI in the category offers true local inference.",
  },
  {
    id: "persistent-memory",
    icon: Brain,
    title: "Persistent Memory",
    shortDescription:
      "The agent remembers your matters, decisions, and preferences across every session.",
    fullDescription:
      "A Codex-style long-term memory model accumulates durable, structured knowledge about you or a specific matter over time — facts established, prior decisions, standing preferences — instead of starting cold every session. Memory syncs across web, desktop, and mobile, so a case started on one device continues seamlessly on another.",
  },
  {
    id: "automations",
    icon: Workflow,
    title: "Automations & Workflows",
    shortDescription:
      "Chain research, drafting, and review into multi-step workflows that run without you.",
    fullDescription:
      "Define multi-step agent workflows — such as 'on new contract upload, extract key terms, check against playbook, draft a redline, and notify me' — that chain Verdictu's research, document, and drafting capabilities without re-prompting at every step. Time- or event-triggered automations handle recurring work like docket checks and deadline reminders, surfaced as notifications instead of relying on you to remember to ask.",
  },
  {
    id: "case-simulator",
    icon: GitBranch,
    title: "Case Outcome Simulator",
    shortDescription:
      "Enter your facts and evidence, run the case forward, and see where it's likely to break — before you're in front of a judge.",
    fullDescription:
      "Modeled on the litigation-analytics workflow pioneered by tools like Lex Machina, Premonition, and Blue J Legal — input your facts, jurisdiction, court, and the other side's position, and Verdictu runs a probability-weighted simulation against comparable case outcomes and precedent. Where those tools stop at a prediction, Verdictu goes further: because it runs on our own private, uncensored legal models instead of a sanitized general-purpose one, it will tell you plainly where your case is weak and hand you a concrete improvement plan — evidence to gather, arguments to reframe, procedural moves to make — instead of a score with no path forward.",
  },
  {
    id: "document-redaction",
    icon: ScanEye,
    title: "Local PII & GDPR Redaction",
    shortDescription:
      "A local model scans your documents and masks names, IDs, and other sensitive data before anything reaches an AI model.",
    fullDescription:
      "Everyone is already sending documents to AI — so before yours reaches any model, cloud or otherwise, a local, on-device model scans it and masks GDPR and other sensitive personal data: names, addresses, national ID and case numbers, emails, phone numbers, financial details. It runs fully client-side in the browser sandbox on web, and with a larger, more accurate local model on desktop for messy scans and bulk files. You hold the key to unmask the output locally, so you get full AI assistance on a document without ever exposing client PII to a third-party model.",
  },
  {
    id: "goal-mode",
    icon: Target,
    title: "Goal Mode — Sandboxed Autonomous Agent",
    shortDescription:
      "Set a goal and the rules for reaching it, and let the agent work toward it autonomously inside a locked-down sandbox.",
    fullDescription:
      "Set a goal, define what counts as 'done,' and specify the rules and guardrails the agent must follow — similar to ChatGPT's task/agent mode, purpose-built for legal work. Verdictu then works toward that goal autonomously: researching, drafting, browsing court portals, even operating a computer, checking in only when it hits a rule you set or a decision only you can make. Every action runs inside an isolated sandbox, and only the tools and sites you explicitly grant access to are ever reachable — nothing touches your real browser, files, or accounts unless you allow it.",
  },
];
