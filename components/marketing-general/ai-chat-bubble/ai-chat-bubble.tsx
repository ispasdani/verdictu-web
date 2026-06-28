"use client";

import { ArrowUpIcon } from "@/components/shared-components/arrow-up-icon";
import { Button } from "@/components/shared-components/button";
import { useEffect, useRef, useState } from "react";

const CLAMP = 25;
const STRENGTH = 0.06;

export const AIChatBubble = () => {
  const [value, setValue] = useState("");
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) * -STRENGTH;
      const dy = (e.clientY - cy) * -STRENGTH;
      setOffset({
        x: Math.max(-CLAMP, Math.min(CLAMP, dx)),
        y: Math.max(-CLAMP, Math.min(CLAMP, dy)),
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
    <div
      className="w-full max-w-[40vw] h-[20vh] rounded-[18px] bg-white/15 backdrop-blur-[16px] box-border p-4 flex flex-col gap-3"
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
        willChange: "transform",
      }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between font-[Inter,sans-serif] font-medium text-xs text-white">
        <div className="flex items-center gap-2">
          {/* this is going to be added later on the dahsboard ai chat bubble */}
          {/* <span>60/450 credits</span> */}
          <button className="bg-[#4ade80] text-[#1a1a1a] border-none rounded-full px-[10px] py-[3px] cursor-pointer font-[Inter,sans-serif] font-medium text-xs">
            Upgrade
          </button>
        </div>
        <span className="text-xs">✦ Powered by Claude</span>
      </div>

      {/* White input card */}
      <div className="bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.12)] box-border p-3 flex flex-col justify-between gap-[10px] h-full">
        {/* Textarea + submit */}
        <div className="flex items-start gap-2">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Type question..."
            className="flex-1 border-none outline-none bg-transparent font-[Inter,sans-serif] text-base text-black py-[2px] px-0 resize-none max-h-32 overflow-y-auto leading-[1.5]"
          />
          <Button variant="icon-circle" aria-label="Send">
            <ArrowUpIcon />
          </Button>
        </div>

        {/* Bottom row: actions + counter */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="action"
              icon={<span className="text-sm">📎</span>}
              label="Attach"
            >
              Attach
            </Button>
            <Button
              variant="action"
              icon={<span className="text-sm">🎙</span>}
              label="Voice"
            >
              Voice
            </Button>
            <Button
              variant="action"
              icon={<span className="text-sm">🔍</span>}
              label="Prompts"
            >
              Prompts
            </Button>
          </div>
          <span className="font-[Inter,sans-serif] text-xs text-[#9b9b9b]">
            {value.length}/3,000
          </span>
        </div>
      </div>
    </div>
  );
};
