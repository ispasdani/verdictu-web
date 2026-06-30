"use client";

interface MarqueeRowProps {
  prompts: string[];
  direction?: "left" | "right";
  durationSec?: number;
  onPick?: (text: string) => void;
}

export default function MarqueeRow({
  prompts,
  direction = "left",
  durationSec = 38,
  onPick,
}: MarqueeRowProps) {
  const doubled = [...prompts, ...prompts];

  return (
    <div
      className="pm-row overflow-hidden w-full"
      style={{ "--pm-duration": `${durationSec}s` } as React.CSSProperties}
    >
      <div
        className={`pm-track flex gap-3 w-max ${
          direction === "right" ? "pm-track-right" : "pm-track-left"
        }`}
      >
        {doubled.map((prompt, i) => (
          <button
            key={i}
            onClick={() => onPick?.(prompt)}
            className="bg-white whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium text-white/80 hover:bg-white/20 hover:text-white transition-colors cursor-pointer border border-white/10"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
