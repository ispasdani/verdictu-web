"use client";

import { Button } from "@/components/shared-components/button";
import { Text } from "@/components/shared-components/text";
import Image from "next/image";
import { useState, useRef } from "react";

function AIChatInput() {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // handle submit
    }
  };

  return (
    <div className="flex items-end gap-2 w-full max-w-2xl bg-white rounded-2xl px-4 py-3 shadow-lg border border-gray-200">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything..."
        rows={1}
        className="flex-1 resize-none bg-transparent outline-none font-sans text-sm text-gray-800 placeholder-gray-400 leading-6 max-h-48 overflow-y-auto"
        style={{ fontFamily: "'Inter', sans-serif" }}
      />
      <button
        className="shrink-0 bg-black text-white rounded-xl p-2 hover:bg-gray-800 transition-colors disabled:opacity-40"
        disabled={!value.trim()}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="19" x2="12" y2="5" />
          <polyline points="5 12 12 5 19 12" />
        </svg>
      </button>
    </div>
  );
}

const Herobox = () => {
  return (
    <div className="flex flex-col bg-green-300 min-h-[92vh] mx-auto max-w-[140rem]">
      <div className="min-h-[35vh] bg-amber-200 flex flex-col items-start justify-center">
        <Text size={"8xl"} font="lora" className="my-1">
          Devoted to You.
        </Text>
        <Text size={"7xl"} font="lora" className="my-1">
          Dangerous to Everyone Else.
        </Text>
        {/* <Text size={"md"} >We are a team of passionate developers, designers, and marketers who are dedicated to creating the best possible experience for our users. We believe that the best way to achieve this is by putting our users first and foremost in everything we do.</Text> */}
        <Text size={"sm"} className="mt-10 mb-5 max-w-[40vw]">
          Like the most loyal dog you've ever had — except it reads case law,
          writes your contracts, ranks your content, and remembers every
          conversation you've ever had. It stays. It learns. It never turns on
          you.
        </Text>
        <Button variant="primary">
          <Text size="sm" color="inverted" weight="light">
            Try it now
          </Text>
        </Button>
      </div>
      <div className="min-h-[57vh] bg-green-800 flex justify-center items-center relative">
        <div className="w-full h-[45vh] bg-red-300 rounded-md relative">
          <Image
            src={"/assets/images/hero-image.webp"}
            alt="Hero Image"
            fill
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full px-6 flex justify-center">
          <AIChatInput />
        </div>
      </div>
    </div>
  );
};

export default Herobox;
