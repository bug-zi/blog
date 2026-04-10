"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition, useMemo } from "react";
import type { PostMeta } from "@/lib/posts";
import { PostCard } from "./PostCard";

const DROPDOWN_CATEGORIES = [
  { name: "全部", slug: "all" },
  { name: "月刊", slug: "monthly" },
  { name: "生活", slug: "life" },
  { name: "技术", slug: "tech" },
  { name: "思考", slug: "thoughts" },
  { name: "杂项", slug: "misc" },
  { name: "归档", slug: "archive" },
];

interface CategoryFilterProps {
  posts: PostMeta[];
  featuredPosts: PostMeta[];
}

export function CategoryFilter({ posts, featuredPosts }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const current = searchParams.get("category") || "all";

  const handleSelect = (slug: string) => {
    setOpen(false);
    const params = new URLSearchParams(searchParams);
    if (slug === "all") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    startTransition(() => {
      router.push(`/passage${params.toString() ? `?${params.toString()}` : ""}`);
    });
  };

  const currentLabel =
    DROPDOWN_CATEGORIES.find((c) => c.slug === current)?.name ?? "全部";

  const featuredSlugs = useMemo(() => new Set(featuredPosts.map((p) => p.slug)), [featuredPosts]);

  const filteredPosts = useMemo(() => {
    if (current === "all") {
      // Exclude featured posts — they're shown in the featured section
      return posts.filter((p) => !featuredSlugs.has(p.slug));
    }
    return posts.filter((p) => p.category === current);
  }, [posts, current, featuredSlugs]);

  return (
    <>
      {/* Header row: title centered, dropdown absolute right */}
      <div className="relative mb-8 text-center">
        <h1 className="text-2xl font-bold text-white">文章</h1>
        <p className="text-sm text-white/70 mt-1">思考、记录、分享</p>

        {/* Category Dropdown — positioned right, independent of title */}
        <div className="absolute -right-40 top-1/2 -translate-y-1/2">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-black/30 border border-white/10 hover:bg-black/40 hover:border-white/20 transition-all duration-200 text-sm text-white/80 backdrop-blur-md"
          >
            <span>{currentLabel}</span>
            <svg
              className={`w-3.5 h-3.5 text-white/50 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {open && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
              <ul className="absolute right-0 z-20 mt-1.5 w-32 rounded-lg bg-black/50 backdrop-blur-2xl border border-white/10 py-1 shadow-xl shadow-black/30">
                {DROPDOWN_CATEGORIES.map((cat) => (
                  <li key={cat.slug}>
                    <button
                      onClick={() => handleSelect(cat.slug)}
                      className={`w-full text-left px-3.5 py-1.5 text-sm transition-colors ${
                        current === cat.slug
                          ? "text-white bg-white/10"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {/* Featured section — only when "all" */}
      {current === "all" && featuredPosts.length > 0 && (
        <div className="mb-10">
          <h2 className="text-sm font-medium text-white/50 mb-4 uppercase tracking-wider">
            精选文章
          </h2>
          <div className="flex flex-col gap-[50px]">
            {featuredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="mt-10 h-px bg-white/10" />
        </div>
      )}

      {/* Article list */}
      {filteredPosts.length > 0 ? (
        <div className="flex flex-col gap-[50px]">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-white/60 py-20">
          该分类下暂无文章。
        </p>
      )}
    </>
  );
}
