"use client";

import { ArrowUpIcon } from "@/components/shared-components/arrow-up-icon";
import { Button } from "@/components/shared-components/button";
import { useRef, useState } from "react";

export const AIChatBubble = () => {
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
            <Button
              variant="action"
              icon={<span style={{ fontSize: 14 }}>📎</span>}
              label="Attach"
            >
              Attach
            </Button>
            <Button
              variant="action"
              icon={<span style={{ fontSize: 14 }}>🎙</span>}
              label="Voice"
            >
              Voice
            </Button>
            <Button
              variant="action"
              icon={<span style={{ fontSize: 14 }}>🔍</span>}
              label="Prompts"
            >
              Prompts
            </Button>
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
};
