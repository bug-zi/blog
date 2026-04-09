"use client";

import { useEffect, useRef } from "react";

interface Bird {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  wingSpan: number;
  wingAngle: number;
  wingSpeed: number;
  opacity: number;
}

export function FlyingBirds() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const BIRD_COUNT = 5;
    const birds: Bird[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const createBird = (startFromSide = true): Bird => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      return {
        x: startFromSide
          ? direction === 1
            ? -50
            : canvas.width + 50
          : Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.6, // Keep in upper portion
        size: 8 + Math.random() * 12,
        speedX: (0.3 + Math.random() * 0.4) * direction,
        speedY: -0.05 + Math.random() * 0.1,
        wingSpan: 15 + Math.random() * 10,
        wingAngle: Math.random() * Math.PI * 2,
        wingSpeed: 0.08 + Math.random() * 0.06,
        opacity: 0.4 + Math.random() * 0.4,
      };
    };

    for (let i = 0; i < BIRD_COUNT; i++) {
      birds.push(createBird(false));
    }

    const drawBird = (bird: Bird) => {
      if (!ctx) return;
      ctx.save();
      ctx.translate(bird.x, bird.y);

      const direction = bird.speedX > 0 ? 1 : -1;
      ctx.scale(direction, 1);

      ctx.globalAlpha = bird.opacity;

      const isDark = document.documentElement.classList.contains("dark");
      ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.5)";
      ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.1)";
      ctx.lineWidth = 1.5;

      // Wing flap animation using sine
      const flap = Math.sin(bird.wingAngle) * 0.5;
      const wingY = flap * bird.wingSpan * 0.6;

      // Draw bird silhouette - simple V shape with curved wings
      ctx.beginPath();
      // Left wing
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(
        -bird.wingSpan * 0.5,
        wingY - bird.wingSpan * 0.2,
        -bird.wingSpan,
        wingY
      );
      // Right wing
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(
        bird.wingSpan * 0.5,
        wingY - bird.wingSpan * 0.2,
        bird.wingSpan,
        wingY
      );
      ctx.stroke();

      // Body
      ctx.beginPath();
      ctx.ellipse(0, 0, bird.size * 0.3, bird.size * 0.15, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const bird of birds) {
        bird.x += bird.speedX;
        bird.y += bird.speedY + Math.sin(bird.wingAngle * 0.5) * 0.02;
        bird.wingAngle += bird.wingSpeed;

        drawBird(bird);

        // Reset when off-screen
        if (
          (bird.speedX > 0 && bird.x > canvas.width + 60) ||
          (bird.speedX < 0 && bird.x < -60)
        ) {
          Object.assign(bird, createBird(true));
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
