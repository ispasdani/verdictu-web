"use client";

import { Button } from "@/components/shared-components/button";
import { useCallback, useEffect, useRef, useState } from "react";

const PauseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <rect x="5" y="3" width="4" height="18" rx="1" />
    <rect x="15" y="3" width="4" height="18" rx="1" />
  </svg>
);

const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5,3 19,12 5,21" />
  </svg>
);

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [fading, setFading] = useState(false);

  const handleEnded = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      const video = videoRef.current;
      if (!video) return;
      video.currentTime = 0;
      video.play();
      setFading(false);
    }, 600);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, [handleEnded]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative w-full h-full rounded-md overflow-hidden">
      <video
        ref={videoRef}
        src="/assets/videos/hero-video.mp4"
        autoPlay
        muted
        playsInline
        preload="metadata"
        className={`w-full h-full object-cover rounded-md transition-opacity duration-500 ${fading ? "opacity-0" : "opacity-100"}`}
      />
      <div className="absolute top-3 right-3 z-10">
        <Button
          variant="icon-circle"
          onClick={togglePlayPause}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </Button>
      </div>
    </div>
  );
}
