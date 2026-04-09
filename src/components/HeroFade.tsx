"use client";

import { useEffect, useRef, useState } from "react";

interface HeroFadeProps {
  children: React.ReactNode;
}

export function HeroFade({ children }: HeroFadeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(1);
  const [transformY, setTransformY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate fade based on scroll position
      // Starts fading after scrolling 100px, fully faded at 500px
      const fadeStart = 100;
      const fadeEnd = 500;

      let newOpacity = 1;
      let newTransformY = 0;

      if (scrollY >= fadeStart) {
        const progress = Math.min((scrollY - fadeStart) / (fadeEnd - fadeStart), 1);
        newOpacity = 1 - progress * 0.7; // Fade to 0.3, not fully invisible
        newTransformY = progress * 50; // Move down slightly while fading
      }

      setOpacity(newOpacity);
      setTransformY(newTransformY);
    };

    // Add smooth transition
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        opacity,
        transform: `translateY(${transformY}px)`,
        transition: "opacity 0.1s ease-out, transform 0.1s ease-out",
      }}
    >
      {children}
    </div>
  );
}
