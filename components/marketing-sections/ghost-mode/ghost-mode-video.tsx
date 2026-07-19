import { cn } from "@/lib/utils";

/**
 * Frosted-glass shell for the Ghost Mode showcase video.
 *
 * The blurred border is the same treatment the hero chat bubble uses, so the
 * video sits on the background image the way the old animated demo did.
 * `children` is the slot for the real <video>; until one exists, the
 * placeholder below stands in.
 */

type GhostModeVideoProps = {
  className?: string;
  children?: React.ReactNode;
};

const VideoPlaceholder = () => (
  <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-neutral-900/70">
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur-sm">
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="ml-0.5 h-6 w-6 text-white"
        aria-hidden
      >
        <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.3-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z" />
      </svg>
    </div>
    <span className="font-[Inter,sans-serif] text-[11px] font-medium tracking-wide text-white/70 uppercase">
      Ghost Mode walkthrough
    </span>
  </div>
);

export const GhostModeVideo = ({
  className,
  children,
}: GhostModeVideoProps) => {
  return (
    <div
      className={cn(
        "w-full max-w-[90%] rounded-[18px] bg-white/15 p-2 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-[16px] sm:p-3",
        className,
      )}
    >
      <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/15">
        {children ?? <VideoPlaceholder />}
      </div>
    </div>
  );
};
