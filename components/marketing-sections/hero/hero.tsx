"use client";

import { ArrowUpIcon } from "@/components/shared-components/arrow-up-icon";
import { Button } from "@/components/shared-components/button";
import { Text } from "@/components/shared-components/text";
import Image from "next/image";
import { useState, useRef } from "react";

function ActionButton({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: "#f3f3f3",
        border: "none",
        borderRadius: 6,
        padding: "6px 10px",
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
        fontSize: 13,
        color: "#6b7280",
      }}
    >
      {icon}
      {label}
    </button>
  );
}

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
    <div
      style={{
        width: "100%",
        maxWidth: 728,
        borderRadius: 18,
        background: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxSizing: "border-box",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          fontSize: 12,
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>60/450 credits</span>
          <button
            style={{
              background: "#4ade80",
              color: "#1a1a1a",
              border: "none",
              borderRadius: 999,
              padding: "3px 10px",
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 12,
            }}
          >
            Upgrade
          </button>
        </div>
        <span style={{ fontSize: 12 }}>✦ Powered by Claude</span>
      </div>

      {/* White input card */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: 12,
          boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          boxSizing: "border-box",
          padding: 12,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {/* Textarea + submit */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Type question..."
            rows={1}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              color: "#000000",
              padding: "2px 0",
              resize: "none",
              maxHeight: "8rem",
              overflowY: "auto",
              lineHeight: "1.5",
            }}
          />
          <Button variant="icon-circle" aria-label="Send">
            <ArrowUpIcon />
          </Button>
        </div>

        {/* Bottom row: actions + counter */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <ActionButton
              icon={<span style={{ fontSize: 14 }}>📎</span>}
              label="Attach"
            />
            <ActionButton
              icon={<span style={{ fontSize: 14 }}>🎙</span>}
              label="Voice"
            />
            <ActionButton
              icon={<span style={{ fontSize: 14 }}>🔍</span>}
              label="Prompts"
            />
          </div>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              color: "#9b9b9b",
            }}
          >
            {value.length}/3,000
          </span>
        </div>
      </div>
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
