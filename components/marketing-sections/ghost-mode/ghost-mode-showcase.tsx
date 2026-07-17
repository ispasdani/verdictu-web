import { Subheading } from "@/components/shared-components/subheading";
import { Text } from "@/components/shared-components/text";
import { GhostModeDemo } from "./ghost-mode-demo";
import Image from "next/image";

const GhostModeShowcase = () => {
  return (
    <section className="my-15 flex w-full flex-col">
      <Subheading className="text-subheading">Ghost Mode</Subheading>
      <Text size="sm" color="muted" className="mt-4 max-w-[40vw]">
        Some questions should never leave a trace. Flip into Ghost Mode and
        every conversation stays ephemeral — no history, no training, nothing
        stored once you leave.
      </Text>

      <div className="relative mt-8 h-[760px]">
        {/* Placeholder background — swap for an <Image fill /> like the hero section */}
        <Image fill src="/assets/images/ghost-mode-section.webp" alt="Ghost Mode Background" className="object-cover" />
        {/* <div className="absolute inset-0 h-[760px] rounded-md bg-gradient-to-br from-neutral-900 via-neutral-800 to-black" /> */}

        <div className="relative z-10 flex h-full items-center justify-center px-4 py-10 md:px-10 md:py-16">
          <GhostModeDemo />
        </div>
      </div>
    </section>
  );
};

export default GhostModeShowcase;
