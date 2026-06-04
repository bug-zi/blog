"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const INTERACTIVE_SELECTORS =
  'a, button, [role="button"], input, textarea, select, [tabindex], summary';
const DOT_SIZE = 8;
const RING_SIZE = 32;
const RING_HOVER_SIZE = 48;
const LERP_FACTOR = 0.25;

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const rafId = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const isTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - DOT_SIZE / 2}px, ${e.clientY - DOT_SIZE / 2}px, 0)`;
      }
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(INTERACTIVE_SELECTORS)) {
        isHoveringRef.current = true;
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(INTERACTIVE_SELECTORS);
      const related = (e.relatedTarget as HTMLElement)?.closest(
        INTERACTIVE_SELECTORS
      );
      if (target && !related) {
        isHoveringRef.current = false;
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    const animate = () => {
      ringPos.current.x +=
        (mousePos.current.x - ringPos.current.x) * LERP_FACTOR;
      ringPos.current.y +=
        (mousePos.current.y - ringPos.current.y) * LERP_FACTOR;

      if (ringRef.current) {
        const size = isHoveringRef.current ? RING_HOVER_SIZE : RING_SIZE;
        ringRef.current.style.transform = `translate3d(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px, 0)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId.current);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mounted, isVisible]);

  if (!mounted) return null;

  return (
    <div
      className="custom-cursor-container pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden="true"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 will-change-transform
          w-2 h-2 rounded-full bg-white
          shadow-[0_0_8px_2px_rgba(255,255,255,0.3)]"
      />
      {/* Outer ring */}
      <motion.div
        ref={ringRef}
        className="absolute top-0 left-0 will-change-transform
          rounded-full border-[1.5px] border-white"
        animate={{
          width: isHovering ? RING_HOVER_SIZE : RING_SIZE,
          height: isHovering ? RING_HOVER_SIZE : RING_SIZE,
          opacity: isHovering ? 0.3 : [0, 0.6, 0],
        }}
        transition={{
          width: { type: "spring", stiffness: 300, damping: 20 },
          height: { type: "spring", stiffness: 300, damping: 20 },
          opacity: {
            duration: isHovering ? 0.2 : 4,
            repeat: isHovering ? 0 : Infinity,
            ease: "easeInOut",
          },
        }}
      />
    </div>
  );
}
