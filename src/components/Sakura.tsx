"use client";

import { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotate: number;
  rotateSpeed: number;
  opacity: number;
  swing: number;
  swingSpeed: number;
  swingOffset: number;
}

export function Sakura() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const PETAL_COUNT = 6;
    const petals: Petal[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const createPetal = (startFromTop = true): Petal => ({
      x: Math.random() * canvas.width,
      y: startFromTop ? -20 : Math.random() * canvas.height,
      size: 6 + Math.random() * 10,
      speedY: 0.03 + Math.random() * 0.1,
      speedX: -0.005 + Math.random() * 0.01,
      rotate: Math.random() * Math.PI * 2,
      rotateSpeed: (Math.random() - 0.5) * 0.002,
      opacity: 0.3 + Math.random() * 0.5,
      swing: 0.5 + Math.random() * 1.5,
      swingSpeed: 0.01 + Math.random() * 0.02,
      swingOffset: Math.random() * Math.PI * 2,
    });

    for (let i = 0; i < PETAL_COUNT; i++) {
      petals.push(createPetal(false));
    }

    const drawPetal = (p: Petal) => {
      if (!ctx) return;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotate);
      ctx.globalAlpha = p.opacity;

      // Draw a petal shape
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(
        p.size * 0.3, -p.size * 0.5,
        p.size * 0.8, -p.size * 0.5,
        p.size * 0.5, 0
      );
      ctx.bezierCurveTo(
        p.size * 0.8, p.size * 0.5,
        p.size * 0.3, p.size * 0.5,
        0, 0
      );

      const isDark = document.documentElement.classList.contains("dark");
      const hue = 340 + Math.random() * 20;
      const sat = isDark ? "60%" : "70%";
      const light = isDark ? "75%" : "85%";
      ctx.fillStyle = `hsl(${hue}, ${sat}, ${light})`;
      ctx.fill();

      ctx.restore();
    };

    let frame = 0;

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      for (const p of petals) {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(frame * p.swingSpeed + p.swingOffset) * p.swing * 0.3;
        p.rotate += p.rotateSpeed;

        drawPetal(p);

        // Reset when off-screen
        if (p.y > canvas.height + 20 || p.x < -20 || p.x > canvas.width + 20) {
          Object.assign(p, createPetal(true));
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[-1]"
      aria-hidden="true"
    />
  );
}
