"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

/**
 * Infinite, self-running demo of Ghost Mode:
 * toggle Normal -> Ghost, pick a model, load a secure session,
 * a typed Q&A exchange, then a document pops out on the right
 * and writes itself — then everything fades and loops.
 *
 * The whole scene is derived from a single looping clock `t` (ms),
 * so the animation is deterministic and loops forever.
 */

const T = {
  ghostOn: 1700,
  ddOpen: 2400,
  ddHighlight: 3000,
  ddClose: 3600,
  loadStart: 3600,
  loadEnd: 4500,
  q1Start: 4700,
  q1Dur: 2000,
  q1Send: 7000,
  think1End: 8000,
  a1Start: 8000,
  a1Dur: 2800,
  q2Start: 11300,
  q2Dur: 1000,
  q2Send: 12600,
  think2End: 13300,
  a2Start: 13300,
  docPop: 13900,
  docLinesStart: 14100,
  docLineEvery: 360,
  a3Start: 17400,
  q3Start: 18300,
  q3Dur: 1500,
  q3Send: 20400,
  think3End: 21200,
  a4Start: 21200,
  a4Dur: 3000,
  q4Start: 24800,
  q4Dur: 1200,
  q4Send: 26300,
  think4End: 27100,
  a5Start: 27100,
  a5Dur: 2800,
  fadeStart: 30600,
  loop: 31600,
};

const Q1 =
  "I got a parking ticket, but the sign was hidden behind an overgrown tree. Can I fight it?";
const A1 =
  "Yes — obscured or non-compliant signage is one of the strongest grounds for appeal. If the restriction wasn't clearly visible, the citation can be dismissed. I can draft an appeal letter with the right legal basis.";
const Q2 = "Yes, draft the appeal.";
const A2 = "Generating your appeal letter…";
const A3 =
  "Done — your appeal is ready to submit. Nothing is saved after this session.";
const Q3 = "Can any of this be traced back to me later?";
const A4 =
  "No. Ghost sessions are never logged, indexed, or used for training. The moment you close this tab, the transcript and the draft are gone — there's no record left to trace.";
const Q4 = "How long do I have to file it?";
const A5 =
  "Most councils allow 28 days from the citation date. Yours is dated the 3rd, so you have until the 31st — I've put the deadline at the top of the letter.";

const QUESTIONS = [
  { text: Q1, start: T.q1Start, dur: T.q1Dur, send: T.q1Send },
  { text: Q2, start: T.q2Start, dur: T.q2Dur, send: T.q2Send },
  { text: Q3, start: T.q3Start, dur: T.q3Dur, send: T.q3Send },
  { text: Q4, start: T.q4Start, dur: T.q4Dur, send: T.q4Send },
];

type DocLine =
  | { kind: "title"; text: string }
  | { kind: "text"; text: string }
  | { kind: "bar"; width: string };

const DOC_LINES: DocLine[] = [
  { kind: "title", text: "RE: Appeal of Parking Citation #4471-A" },
  { kind: "text", text: "To the Parking Adjudication Office," },
  { kind: "bar", width: "w-full" },
  { kind: "bar", width: "w-11/12" },
  { kind: "bar", width: "w-full" },
  { kind: "bar", width: "w-4/5" },
  { kind: "bar", width: "w-10/12" },
  { kind: "text", text: "Respectfully," },
  { kind: "text", text: "The Appellant" },
];

const useLoopClock = () => {
  const [t, setT] = useState(0);

  useEffect(() => {
    // Respect reduced motion: freeze on the finished scene instead of animating.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setT(T.a5Start + T.a5Dur + 200);
      return;
    }
    // Interval (not rAF) so the clock keeps correct time even when the
    // tab is backgrounded/throttled; elapsed time comes from performance.now().
    const start = performance.now();
    const id = window.setInterval(() => {
      setT((performance.now() - start) % T.loop);
    }, 60);
    return () => window.clearInterval(id);
  }, []);

  return t;
};

const typed = (t: number, text: string, start: number, dur: number) => {
  if (t < start) return "";
  const progress = Math.min(1, (t - start) / dur);
  return text.slice(0, Math.floor(progress * text.length));
};

const ThinkingDots = () => (
  <div className="flex items-center gap-1 px-1 py-2">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400"
        style={{ animationDelay: `${i * 150}ms` }}
      />
    ))}
  </div>
);

const GhostIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={cn("h-3.5 w-3.5", className)}
    aria-hidden
  >
    <path d="M12 2a8 8 0 0 0-8 8v11.2c0 .7.85 1.06 1.35.56l1.4-1.4 1.9 1.9c.4.4 1.02.4 1.41 0L12 20.36l1.94 1.9c.4.4 1.02.4 1.41 0l1.9-1.9 1.4 1.4c.5.5 1.35.14 1.35-.56V10a8 8 0 0 0-8-8Zm-3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
  </svg>
);

const SendArrow = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ffffff"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

export const GhostModeDemo = () => {
  const t = useLoopClock();

  const ghost = t >= T.ghostOn;
  const dropdownOpen = t >= T.ddOpen && t < T.ddClose;
  const modelSelected = t >= T.ddClose;
  const loading = t >= T.loadStart && t < T.loadEnd;

  // Whichever question is currently being typed into the composer, if any.
  const composing = QUESTIONS.find((q) => t >= q.start && t < q.send);
  const inputText = composing
    ? typed(t, composing.text, composing.start, composing.dur)
    : "";
  const isTyping = Boolean(composing);

  const showUser1 = t >= T.q1Send;
  const thinking1 = t >= T.q1Send && t < T.think1End;
  const a1Text = typed(t, A1, T.a1Start, T.a1Dur);
  const showUser2 = t >= T.q2Send;
  const thinking2 = t >= T.q2Send && t < T.think2End;
  const showA2 = t >= T.a2Start;
  const docDone = t >= T.a3Start;
  const showUser3 = t >= T.q3Send;
  const thinking3 = t >= T.q3Send && t < T.think3End;
  const a4Text = typed(t, A4, T.a4Start, T.a4Dur);
  const showUser4 = t >= T.q4Send;
  const thinking4 = t >= T.q4Send && t < T.think4End;
  const a5Text = typed(t, A5, T.a5Start, T.a5Dur);

  const showDoc = t >= T.docPop;
  const docLineCount = Math.max(
    0,
    Math.min(
      DOC_LINES.length,
      Math.floor((t - T.docLinesStart) / T.docLineEvery) + 1,
    ),
  );

  const sending = QUESTIONS.some((q) => t >= q.send - 250 && t < q.send + 150);
  const togglePulse = t >= T.ghostOn - 200 && t < T.ghostOn + 500;
  const fading = t >= T.fadeStart;

  return (
    <div
      className={cn(
        "relative w-full max-w-[90%] h-full max-h-[90%] transition-opacity duration-700",
        fading ? "opacity-0" : "opacity-100",
      )}
      aria-hidden
    >
      {/* Glass shell — same treatment as the hero chat bubble */}
      <div className="h-full rounded-[18px] bg-white/15 p-2 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-[16px] sm:p-3">
        {/* App window */}
        <div
          className={cn(
            "h-full flex overflow-hidden rounded-xl border transition-colors duration-700",
            ghost
              ? "border-violet-500/30 bg-white"
              : "border-neutral-200 bg-white",
          )}
        >
          {/* Sidebar rail — mirrors the agent layout */}
          <div className="hidden w-12 shrink-0 flex-col items-center gap-3 border-r border-neutral-200 bg-neutral-50 py-3 sm:flex">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-violet-600 font-[Inter,sans-serif] text-xs font-semibold text-white">
              V
            </div>
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-6 w-6 rounded-md bg-neutral-200" />
            ))}
          </div>

          {/* Main column */}
          <div className="flex min-w-0 flex-1 flex-col">
            {/* Header */}
            <div className="flex h-11 items-center gap-2 border-b border-neutral-200 px-3">
              {/* Traffic dots */}
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="mx-1 h-4 w-px bg-neutral-200" />
              <span className="font-[Inter,sans-serif] text-xs font-medium text-neutral-900">
                Verdictu Agent
              </span>

              <div className="ml-auto flex items-center gap-2">
                {/* Model selector */}
                <div className="relative">
                  <div className="flex items-center gap-1 rounded-full border border-neutral-200 px-2.5 py-1 font-[Inter,sans-serif] text-[11px] font-medium text-neutral-600">
                    {modelSelected ? "✦ Claude Opus" : "Select model"}
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 10 10"
                      className={cn(
                        "transition-transform duration-300",
                        dropdownOpen && "rotate-180",
                      )}
                    >
                      <path
                        d="M1 3l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  {dropdownOpen && (
                    <div className="animate-in fade-in slide-in-from-top-1 absolute right-0 top-full z-30 mt-1.5 w-44 rounded-lg border border-neutral-200 bg-white p-1 font-[Inter,sans-serif] shadow-[0_8px_30px_rgba(0,0,0,0.12)] duration-200">
                      {[
                        { name: "Claude Haiku", tag: "fast" },
                        { name: "Claude Sonnet", tag: "balanced" },
                        { name: "Claude Opus", tag: "deep reasoning" },
                      ].map((m) => {
                        const highlighted =
                          m.name === "Claude Opus" && t >= T.ddHighlight;
                        return (
                          <div
                            key={m.name}
                            className={cn(
                              "flex items-center justify-between rounded-md px-2.5 py-1.5 text-[11px] transition-colors duration-200",
                              highlighted
                                ? "bg-violet-600 text-white"
                                : "text-neutral-700",
                            )}
                          >
                            <span className="font-medium">{m.name}</span>
                            <span
                              className={cn(
                                highlighted
                                  ? "text-violet-200"
                                  : "text-neutral-500",
                              )}
                            >
                              {m.tag}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Normal / Ghost toggle */}
                <div
                  className={cn(
                    "relative flex items-center rounded-full border p-0.5 font-[Inter,sans-serif] text-[11px] font-medium transition-colors duration-500",
                    ghost ? "border-violet-500/40" : "border-neutral-200",
                    togglePulse &&
                      "ring-2 ring-violet-500/60 ring-offset-1 ring-offset-transparent",
                  )}
                >
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 transition-colors duration-500",
                      !ghost ? "bg-neutral-900 text-white" : "text-neutral-500",
                    )}
                  >
                    Normal
                  </span>
                  <span
                    className={cn(
                      "flex items-center gap-1 rounded-full px-2.5 py-0.5 transition-colors duration-500",
                      ghost ? "bg-violet-600 text-white" : "text-neutral-500",
                    )}
                  >
                    <GhostIcon className="h-3 w-3" />
                    Ghost
                  </span>
                </div>
              </div>
            </div>

            {/* Ghost banner — space is always reserved so the card height
                never differs between Normal and Ghost mode; only color/opacity animate */}
            <div
              className={cn(
                "flex items-center gap-1.5 border-b px-3 py-1.5 font-[Inter,sans-serif] text-[11px] transition-colors duration-500",
                ghost
                  ? "border-violet-500/20 bg-violet-600/10 text-violet-700 opacity-100"
                  : "border-neutral-200 bg-transparent text-transparent opacity-0",
              )}
            >
              <GhostIcon />
              Ghost Mode — no history · no training · everything deleted when
              you leave
            </div>

            {/* Chat area */}
            <div className="relative h-[300px] overflow-hidden px-4 py-3 sm:h-[340px]">
              {/* Empty state */}
              {!showUser1 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
                  {loading ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
                      <span className="font-[Inter,sans-serif] text-[11px] text-neutral-400">
                        Starting secure session with Claude Opus…
                      </span>
                    </>
                  ) : (
                    <>
                      <GhostIcon
                        className={cn(
                          "h-8 w-8 transition-colors duration-700",
                          ghost ? "text-violet-500" : "text-neutral-300",
                        )}
                      />
                      <span className="max-w-[240px] font-[Inter,sans-serif] text-[11px] text-neutral-400">
                        {ghost
                          ? "Ghost session ready — messages vanish when you're done."
                          : "Ask anything about your legal situation."}
                      </span>
                    </>
                  )}
                </div>
              )}

              {/* Older messages scroll out of the fixed-height area; fade the
                  cut so it reads as scrollback instead of a hard clip. */}
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-gradient-to-b from-white to-transparent" />

              {/* Messages — pinned to the bottom so new ones stay in view */}
              <div className="flex h-full flex-col justify-end gap-2.5 font-[Inter,sans-serif] text-[13px] leading-relaxed">
                {showUser1 && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 flex justify-end duration-300">
                    <div className="max-w-[75%] rounded-2xl rounded-br-md bg-violet-600 px-3.5 py-2 text-white">
                      {Q1}
                    </div>
                  </div>
                )}

                {thinking1 && <ThinkingDots />}

                {t >= T.a1Start && (
                  <div className="flex gap-2">
                    <span className="mt-1 text-xs text-violet-400">✦</span>
                    <div className="max-w-[85%] text-neutral-800">
                      {a1Text}
                      {a1Text.length < A1.length && (
                        <span className="ml-0.5 inline-block h-3.5 w-[2px] animate-pulse bg-violet-400 align-middle" />
                      )}
                    </div>
                  </div>
                )}

                {showUser2 && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 flex justify-end duration-300">
                    <div className="max-w-[75%] rounded-2xl rounded-br-md bg-violet-600 px-3.5 py-2 text-white">
                      {Q2}
                    </div>
                  </div>
                )}

                {thinking2 && <ThinkingDots />}

                {showA2 && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 flex gap-2 duration-300">
                    <span className="mt-1 text-xs text-violet-400">✦</span>
                    <div className="flex items-center gap-2 text-neutral-800">
                      {docDone ? A3 : A2}
                      {!docDone && (
                        <span className="h-3 w-3 animate-spin rounded-full border-[1.5px] border-violet-500 border-t-transparent" />
                      )}
                    </div>
                  </div>
                )}

                {showUser3 && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 flex justify-end duration-300">
                    <div className="max-w-[75%] rounded-2xl rounded-br-md bg-violet-600 px-3.5 py-2 text-white">
                      {Q3}
                    </div>
                  </div>
                )}

                {thinking3 && <ThinkingDots />}

                {t >= T.a4Start && (
                  <div className="flex gap-2">
                    <span className="mt-1 text-xs text-violet-400">✦</span>
                    <div className="max-w-[85%] text-neutral-800">
                      {a4Text}
                      {a4Text.length < A4.length && (
                        <span className="ml-0.5 inline-block h-3.5 w-[2px] animate-pulse bg-violet-400 align-middle" />
                      )}
                    </div>
                  </div>
                )}

                {showUser4 && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 flex justify-end duration-300">
                    <div className="max-w-[75%] rounded-2xl rounded-br-md bg-violet-600 px-3.5 py-2 text-white">
                      {Q4}
                    </div>
                  </div>
                )}

                {thinking4 && <ThinkingDots />}

                {t >= T.a5Start && (
                  <div className="flex gap-2">
                    <span className="mt-1 text-xs text-violet-400">✦</span>
                    <div className="max-w-[85%] text-neutral-800">
                      {a5Text}
                      {a5Text.length < A5.length && (
                        <span className="ml-0.5 inline-block h-3.5 w-[2px] animate-pulse bg-violet-400 align-middle" />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input card — same white card as the hero chat bubble */}
            <div className="p-3 pt-0">
              <div className="rounded-xl bg-white p-3 shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
                <div className="flex items-start gap-2">
                  <div className="min-h-[24px] flex-1 py-[2px] font-[Inter,sans-serif] text-[13px] leading-[1.5] text-black">
                    {inputText.length === 0 && !isTyping ? (
                      <span className="text-neutral-400">Type question...</span>
                    ) : (
                      <>
                        {inputText}
                        <span className="ml-px inline-block h-3.5 w-[2px] animate-pulse bg-neutral-900 align-middle" />
                      </>
                    )}
                  </div>
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black transition-transform duration-150",
                      sending && "scale-90 bg-violet-600",
                    )}
                  >
                    <SendArrow />
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 font-[Inter,sans-serif] text-[11px] font-medium text-neutral-500">
                    <span className="rounded-md bg-neutral-100 px-2 py-1">
                      📎 Attach
                    </span>
                    <span className="rounded-md bg-neutral-100 px-2 py-1">
                      🎙 Voice
                    </span>
                    <span className="hidden rounded-md bg-neutral-100 px-2 py-1 sm:inline">
                      🔍 Prompts
                    </span>
                  </div>
                  <span className="font-[Inter,sans-serif] text-[11px] text-[#9b9b9b]">
                    {inputText.length}/3,000
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Document panel — pops out over the right edge like a desktop window */}
      {showDoc && (
        <div className="animate-in fade-in zoom-in-95 slide-in-from-right-4 absolute -right-2 top-14 z-20 w-[58%] max-w-[380px] duration-300 sm:-right-6 md:-right-12">
          <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 shadow-[0_16px_50px_rgba(0,0,0,0.25)]">
            <div className="flex items-center gap-2 border-b border-neutral-200 px-3 py-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                <span className="h-2 w-2 rounded-full bg-[#28c840]" />
              </div>
              <span className="font-[Inter,sans-serif] text-[11px] font-medium text-neutral-700">
                parking-appeal.docx
              </span>
              <span
                className={cn(
                  "ml-auto rounded-full px-2 py-0.5 font-[Inter,sans-serif] text-[10px] font-medium",
                  docDone
                    ? "bg-emerald-500/15 text-emerald-600"
                    : "bg-violet-500/15 text-violet-700",
                )}
              >
                {docDone ? "Ready" : "Writing…"}
              </span>
            </div>
            <div className="bg-white p-4">
              <div className="flex flex-col gap-2.5">
                {DOC_LINES.slice(0, docLineCount).map((line, i) =>
                  line.kind === "title" ? (
                    <div
                      key={i}
                      className="animate-in fade-in font-[Inter,sans-serif] text-[12px] font-semibold text-neutral-900 duration-300"
                    >
                      {line.text}
                    </div>
                  ) : line.kind === "text" ? (
                    <div
                      key={i}
                      className="animate-in fade-in font-[Inter,sans-serif] text-[11px] text-neutral-700 duration-300"
                    >
                      {line.text}
                    </div>
                  ) : (
                    <div
                      key={i}
                      className={cn(
                        "animate-in fade-in h-2 rounded-full bg-neutral-200 duration-300",
                        line.width,
                      )}
                    />
                  ),
                )}
                {docLineCount < DOC_LINES.length && (
                  <div className="h-2 w-6 animate-pulse rounded-full bg-violet-300" />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
