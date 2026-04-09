"use client";

import { useEffect, useRef, useState } from "react";

interface ContentFadeInProps {
  children: React.ReactNode;
}

export function ContentFadeIn({ children }: ContentFadeInProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);
  const [transformY, setTransformY] = useState(30);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start fading in when element is 200px from viewport bottom
      const triggerPoint = windowHeight - 200;

      let newOpacity = 0;
      let newTransformY = 30;

      if (rect.top < triggerPoint) {
        // Calculate how far past the trigger point we are (0 to 1)
        const progress = Math.min((triggerPoint - rect.top) / 300, 1);
        newOpacity = progress;
        newTransformY = 30 * (1 - progress);
      }

      // Ensure fully visible when in viewport
      if (rect.top < windowHeight - 400) {
        newOpacity = 1;
        newTransformY = 0;
      }

      setOpacity(newOpacity);
      setTransformY(newTransformY);
    };

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
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
      {children}
    </div>
  );
}
