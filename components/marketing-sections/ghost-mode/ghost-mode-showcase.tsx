import { Subheading } from "@/components/shared-components/subheading";
import { Text } from "@/components/shared-components/text";
import { GhostModeVideo } from "./ghost-mode-video";
import Image from "next/image";

const POINTS = [
  {
    title: "No history",
    body: "Ghost conversations are never written to your account. Close the tab and the transcript is gone — there is nothing to recover, export, or subpoena.",
  },
  {
    title: "No training",
    body: "Nothing you type in Ghost Mode is logged, indexed, or used to train a model. It leaves no trace in our systems and none in anyone else's.",
  },
  {
    title: "Same full agent",
    body: "You still get the whole toolkit — document drafting, case research, deadline tracking. Ghost Mode changes what we keep, not what you can do.",
  },
];

const GhostModeShowcase = () => {
  return (
    <section className="my-15 flex w-full flex-col">
      <Subheading className="text-subheading">Ghost Mode</Subheading>
      <Text size="sm" color="muted" className="mt-4 max-w-[40vw]">
        Some questions should never leave a trace. Flip into Ghost Mode and
        every conversation stays ephemeral — no history, no training, nothing
        stored once you leave.
      </Text>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left half — the written pitch */}
        <div className="flex flex-col justify-center gap-8">
          <Text as="h3" size="2xl" font="lora" weight="medium">
            Privacy that is structural, not a setting.
          </Text>

          <Text size="sm" color="muted">
            Most tools promise privacy and then keep a copy anyway. Ghost Mode
            works the other way around: the session is held in memory for as
            long as you are in it, and discarded the moment you leave. There is
            no retention toggle to trust, because there is nothing retained.
          </Text>

          <div className="flex flex-col gap-6">
            {POINTS.map((point) => (
              <div key={point.title} className="flex flex-col gap-1.5">
                <Text size="md" weight="medium">
                  {point.title}
                </Text>
                <Text size="sm" color="muted">
                  {point.body}
                </Text>
              </div>
            ))}
          </div>
        </div>

        {/* Right half — background image with the video on top */}
        <div className="relative min-h-[420px] overflow-hidden rounded-md lg:min-h-[560px]">
          <Image
            fill
            src="/assets/images/ghost-mode-section.webp"
            alt="Ghost Mode Background"
            className="object-cover"
          />

          <div className="relative z-10 flex h-full items-center justify-center px-4 py-8 md:px-8">
            <GhostModeVideo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GhostModeShowcase;
