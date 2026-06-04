"use client";

import { useState, useRef, useEffect } from "react";
import type { PostMeta} from "@/lib/posts";
import { siteConfig } from "@/lib/config";
import { StarCard } from "@/components/StarCard";

const categories = siteConfig.categories.star;

export function StarClient({ stars }: { stars: PostMeta[] }) {
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
      ? stars
      : stars.filter((s) => s.category === activeCategory);

  const activeLabel =
    activeCategory === "all"
      ? "全部"
      : categories.find((c) => c.slug === activeCategory)?.name ?? "全部";

  return (
    <>
      {/* Header: title centered, filter button on the right */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex-1" />
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-bold text-white mb-1">收藏</h1>
          <p className="text-sm text-white/70">我喜欢的网站、文章、音乐和影视</p>
        </div>
        <div className="flex-1 flex justify-end" ref={ref}>
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-full py-2 px-5 text-sm text-white/90 hover:bg-white/15 hover:border-white/20 transition-all flex items-center gap-2"
            >
              {activeLabel}
              <svg className={`w-4 h-4 text-white/50 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {open && (
              <div className="absolute top-full mt-2 right-0 w-32 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden z-50">
                <button
                  onClick={() => { setActiveCategory("all"); setOpen(false); }}
                  className={`block w-full py-2.5 text-sm text-center transition-colors ${
                    activeCategory === "all"
                      ? "bg-white/20 text-white font-medium"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  全部
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => { setActiveCategory(cat.slug); setOpen(false); }}
                    className={`block w-full py-2.5 text-sm text-center transition-colors ${
                      activeCategory === cat.slug
                        ? "bg-white/20 text-white font-medium"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Star cards */}
      {filtered.length > 0 ? (
        <div>
          {filtered.map((star) => (
            <StarCard key={star.slug} star={star} />
          ))}
        </div>
      ) : (
        <p className="text-center text-white/40 py-20">
          该分类下还没有收藏。
        </p>
      )}
    </>
  );
}
