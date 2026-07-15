import type { LucideIcon } from "lucide-react";
import { Brain, Ghost, Scale, ScanEye, Shield } from "lucide-react";

export type ArticleLabel =
  | "Legal Tech"
  | "Compliance"
  | "Product"
  | "Industry"
  | "Privacy";

export type Article = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string[];
  author: {
    name: string;
    role: string;
  };
  publishedAt: string;
  readTime: string;
  label: ArticleLabel;
  icon: LucideIcon;
};

export const ARTICLES: Article[] = [
  {
    id: "advocate-mode-legal-ai",
    slug: "why-your-legal-ai-should-take-a-side",
    title: "Why Your Legal AI Should Take a Side",
    description:
      "Most legal AI tools are trained to sound neutral. We think that's the wrong default for anyone trying to build a case.",
    content: [
      "Ask a typical legal AI assistant a question about your situation, and you'll usually get a balanced, textbook-style overview of the law — accurate, cautious, and largely useless if you're trying to actually win an argument.",
      "Verdictu takes a different default stance. Given a fact pattern, our agent actively builds your case: surfacing defenses, counterarguments, procedural challenges, and supporting precedent. If there's a law, it looks for the exception. If there's a deadline, it looks for the reset condition.",
      "This isn't about being reckless with the law — every claim is still grounded in a citable primary source, with a visible confidence score. It's about recognizing that most people who come to a legal AI tool aren't looking for a Wikipedia summary of the law. They're trying to figure out what to do next.",
      "That's the gap Advocate Mode is built to close.",
    ],
    author: { name: "Dan Ispas", role: "Founder & Editor-in-Chief" },
    publishedAt: "2026-06-18",
    readTime: "5 min read",
    label: "Product",
    icon: Shield,
  },
  {
    id: "local-inference-ghost-mode",
    slug: "the-case-for-legal-ai-that-never-leaves-your-device",
    title: "The Case for Legal AI That Never Leaves Your Device",
    description:
      "Ghost Mode runs entirely on-device. Here's why local inference matters more for legal work than almost any other category.",
    content: [
      "Legal work is confidential by default. A contract, a dispute, a client name — none of it is supposed to leave the room, let alone get sent to a third-party server for processing.",
      "Most AI legal tools quietly break this assumption. Every query gets shipped to a cloud model, logged, and in many cases retained for training or debugging purposes, whatever the terms of service happen to say this quarter.",
      "Ghost Mode is Verdictu's answer: a fully local inference pipeline that runs in your browser sandbox, with larger models unlocked on desktop where native GPU access makes 7B–70B class models practical. No account required, no server round-trip for the model itself — only web search calls leave the device, and only when the agent decides research genuinely adds value.",
      "It's a harder engineering problem than calling an API. We think it's the right one to solve.",
    ],
    author: { name: "Dan Ispas", role: "Founder & Editor-in-Chief" },
    publishedAt: "2026-06-05",
    readTime: "6 min read",
    label: "Privacy",
    icon: Ghost,
  },
  {
    id: "gdpr-redaction-before-ai",
    slug: "redacting-pii-before-it-ever-reaches-a-model",
    title: "Redacting PII Before It Ever Reaches a Model",
    description:
      "Everyone is already pasting documents into AI tools. The question is whether anything sensitive slips through first.",
    content: [
      "The uncomfortable truth about legal AI adoption is that it's already happening, informally, whether or not a firm has a policy for it. Associates paste clauses into ChatGPT. Paralegals upload contracts to whatever tool is fastest.",
      "Verdictu's approach is to make the safe path the default one. Before any document reaches a model — ours or anyone else's — a local, on-device model scans it and masks GDPR-relevant personal data: names, addresses, national ID and case numbers, emails, phone numbers, financial details.",
      "It runs fully client-side in the browser on web, and with a larger, more accurate local model on desktop for messy scans and bulk files. You hold the key to unmask the output locally, so you get full AI assistance on a document without ever exposing client PII to a third-party model.",
    ],
    author: { name: "Dan Ispas", role: "Founder & Editor-in-Chief" },
    publishedAt: "2026-05-22",
    readTime: "4 min read",
    label: "Compliance",
    icon: ScanEye,
  },
  {
    id: "persistent-memory-legal-matters",
    slug: "why-your-legal-assistant-shouldnt-forget-your-case",
    title: "Why Your Legal Assistant Shouldn't Forget Your Case",
    description:
      "Starting cold every session is fine for trivia. It's a real cost when you're twelve sessions into building a case.",
    content: [
      "Most AI chat tools are stateless by design — every conversation starts from zero, and whatever context you built up last week is gone unless you paste it back in yourself.",
      "For legal work, that's a real tax. Cases unfold over weeks or months. Facts get established, decisions get made, preferences get set — and re-explaining all of it every session is exactly the kind of friction an AI tool is supposed to remove, not add.",
      "Verdictu's memory model accumulates durable, structured knowledge about you or a specific matter over time, and syncs across web, desktop, and mobile. A case started on one device continues seamlessly on another, weeks later, without a re-briefing.",
    ],
    author: { name: "Dan Ispas", role: "Founder & Editor-in-Chief" },
    publishedAt: "2026-05-09",
    readTime: "5 min read",
    label: "Product",
    icon: Brain,
  },
  {
    id: "citations-that-actually-hold-up",
    slug: "the-problem-with-confident-sounding-legal-citations",
    title: "The Problem With Confident-Sounding Legal Citations",
    description:
      "A citation that looks right and a citation that holds up in front of a judge are not the same thing. Legal AI has to close that gap.",
    content: [
      "General-purpose language models are fluent, and fluency is exactly what makes hallucinated citations so dangerous in a legal context — a confidently formatted, plausible-looking case reference is worse than an obvious guess, because it doesn't look like one.",
      "Every answer Verdictu produces traces back to a citable primary source — statutes, regulations, and case law across supported jurisdictions. A separate verification pass checks that each citation actually supports the claim being made, with a visible confidence score attached to each one.",
      "When a question falls outside what the underlying sources can support, the agent says so plainly instead of filling the gap with something that merely sounds authoritative.",
    ],
    author: { name: "Dan Ispas", role: "Founder & Editor-in-Chief" },
    publishedAt: "2026-04-27",
    readTime: "6 min read",
    label: "Legal Tech",
    icon: Scale,
  },
  {
    id: "case-outcome-simulation",
    slug: "modeling-a-case-before-youre-in-front-of-a-judge",
    title: "Modeling a Case Before You're in Front of a Judge",
    description:
      "Litigation analytics tools are good at predicting outcomes. We think the more useful question is what to do about a weak one.",
    content: [
      "Tools like Lex Machina, Premonition, and Blue J Legal pioneered a genuinely useful idea: model litigation outcomes probabilistically, using comparable case data, rather than relying on gut instinct alone.",
      "Where most of those tools stop, though, is at the prediction itself — a percentage, a score, and not much of a path forward if the number isn't in your favor.",
      "Verdictu's Case Outcome Simulator takes your facts, jurisdiction, court, and the other side's position, and runs a probability-weighted simulation against comparable precedent — then goes further. Because it runs on our own private, uncensored legal models rather than a sanitized general-purpose one, it tells you plainly where your case is weak and hands you a concrete improvement plan: evidence to gather, arguments to reframe, procedural moves to make.",
    ],
    author: { name: "Dan Ispas", role: "Founder & Editor-in-Chief" },
    publishedAt: "2026-04-11",
    readTime: "7 min read",
    label: "Industry",
    icon: Scale,
  },
];

export const getAllArticles = (): Article[] =>
  [...ARTICLES].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

export const getArticleBySlug = (slug: string): Article | undefined =>
  ARTICLES.find((article) => article.slug === slug);

export const formatArticleDate = (isoDate: string): string =>
  new Date(isoDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
