"use client";

import { useState, useRef, useEffect } from "react";
import type { PostMeta } from "@/lib/posts";
import { siteConfig } from "@/lib/config";
import { WorkCard } from "@/components/WorkCard";

const categories = siteConfig.categories.work;

export function WorkClient({ works }: { works: PostMeta[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered =
    activeCategory === "all"
      ? works
      : works.filter((w) => w.category === activeCategory);

  const activeLabel =
    activeCategory === "all"
      ? "全部"
      : categories.find((c) => c.slug === activeCategory)?.name ?? "全部";

  const allOptions = [{ slug: "all", name: "全部" }, ...categories];

  return (
    <>
      {/* Header: title centered, dropdown positioned to the right */}
      <div className="relative mb-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-1">作品</h1>
          <p className="text-sm text-white/70">我的创作与项目</p>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 ml-[1000px]" ref={ref}>
          {/* Custom dropdown trigger */}
          <button
            onClick={() => setOpen(!open)}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg py-2 text-sm text-white/80 hover:bg-white/15 transition-colors text-center w-[6.5em] flex items-center justify-center gap-1"
          >
            {activeLabel}
            <svg className={`w-3 h-3 text-white/50 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          {/* Dropdown panel — acrylic glass */}
          {open && (
            <div className="absolute top-full mt-1 left-0 w-full rounded-lg bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg overflow-hidden z-50">
              {allOptions.map((opt) => (
                <button
                  key={opt.slug}
                  onClick={() => { setActiveCategory(opt.slug); setOpen(false); }}
                  className={`block w-full py-2 text-sm text-center transition-colors ${
                    activeCategory === opt.slug
                      ? "bg-white/15 text-white font-medium"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {opt.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Project cards */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {filtered.map((work) => (
            <WorkCard key={work.slug} work={work} />
          ))}
        </div>
      ) : (
        <p className="text-center text-white/40 py-20">
          该分类下还没有作品。
        </p>
      )}
    </>
  );
}
