"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/config";
import { SequentialTypewriter } from "@/components/SequentialTypewriter";
import { SocialLinks } from "@/components/SocialLinks";

interface HeroSectionProps {
  stats: Array<{ label: string; value: string }>;
}

export function HeroSection({ stats }: HeroSectionProps) {
  const [showAvatar, setShowAvatar] = useState(false);
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const handleTypewriterComplete = () => {
    setShowStats(true);
  };

  const handleFirstLineComplete = () => {
    // 可以在这里添加额外的逻辑，比如显示头像的额外动画
  };

  // 头像淡入动画启动
  setTimeout(() => setShowAvatar(true), 100);
  // 打字机启动
  setTimeout(() => setShowTypewriter(true), 600);

  return (
    <section className="flex flex-col items-center justify-center text-center min-h-screen py-16 relative">
      {/* Animated glow behind avatar */}
      <div className="absolute top-[20vh] w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse" />

      {/* Avatar with fade-in animation */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={siteConfig.owner.avatar}
        alt={siteConfig.owner.name}
        width={120}
        height={120}
        className={`relative w-28 h-28 rounded-full object-cover ring-4 ring-white/30 shadow-2xl mb-10 hover:scale-105 transition-all duration-700 ${
          showAvatar ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      />

      {/* Sequential Typewriter Effect */}
      {showTypewriter && (
        <SequentialTypewriter
          lines={[
            {
              prefix: "Hi, I'm ",
              highlight: siteConfig.owner.name,
              tag: "h1",
              className: "relative text-4xl font-bold mb-6 text-white drop-shadow-lg",
              speed: 80,
            },
            {
              prefix: "喜欢在旅行时创作的 ",
              highlight: "<Planner>",
              tag: "p",
              className: "text-4xl mb-8 text-white/90 drop-shadow-md leading-relaxed",
              speed: 100,
            },
            {
              text: `"${siteConfig.owner.motto}"`,
              tag: "p",
              className: "text-base text-white/70 italic mb-12 max-w-lg drop-shadow-md leading-relaxed",
              speed: 60,
            },
          ]}
          onComplete={handleTypewriterComplete}
          onLineComplete={handleFirstLineComplete}
        />
      )}

      {/* Stats with glass effect - fade in after typewriter */}
      <div className={`flex gap-10 mb-10 transition-all duration-700 ${
        showStats ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}>
        {stats.map((stat) => (
          <div key={stat.label} className="text-center px-6 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-xl font-semibold text-white">{stat.value}</div>
            <div className="text-xs text-white/60 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Social links - fade in after stats */}
      <div className={`transition-all duration-700 ${
        showStats ? "opacity-100" : "opacity-0"
      }`}>
        <SocialLinks />
      </div>
    </section>
  );
}
