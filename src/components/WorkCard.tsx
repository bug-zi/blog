"use client";

import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export function WorkCard({ work }: { work: PostMeta }) {
  const handleCopy = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(url);
  };

  return (
    <Link href={`/work/${work.slug}`}>
      <article className="group rounded-lg border-b border-white/10 hover:bg-white/10 px-3 -mx-3 transition-all duration-200 p-4">
        {/* Title */}
        <h3 className="font-semibold text-white/90 group-hover:text-white transition-colors truncate text-lg">
          {work.title}
        </h3>

        {/* Description */}
        {work.description && (
          <p className="mt-2 text-sm text-white/60 line-clamp-2">
            {work.description}
          </p>
        )}

        {/* Software: status, date, url */}
        {work.category === "software" && (
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/40">
            <span className="inline-flex items-center gap-1">
              <span className={`inline-block w-1.5 h-1.5 rounded-full ${work.status === "已完成" ? "bg-green-400" : work.status === "开发中" ? "bg-yellow-400" : "bg-white/30"}`} />
              {work.status ?? "未知"}
            </span>
            <time>
              {new Date(work.date).toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {work.url && (
              <span className="inline-flex items-center gap-1.5 text-white/80 group-hover:text-white transition-colors truncate max-w-[260px]">
                {work.url}
                <button
                  onClick={(e) => handleCopy(e, work.url!)}
                  className="shrink-0 p-1 rounded hover:bg-white/10 transition-colors"
                  title="复制网址"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M7 3.5A1.5 1.5 0 0 1 8.5 2h3.879a1.5 1.5 0 0 1 1.06.44l3.122 3.12A1.5 1.5 0 0 1 17 6.622V12.5a1.5 1.5 0 0 1-1.5 1.5h-1v-3.379a3 3 0 0 0-.879-2.121L10.5 5.379A3 3 0 0 0 8.379 4.5H7v-1Z" />
                    <path d="M4.5 6A1.5 1.5 0 0 0 3 7.5v9A1.5 1.5 0 0 0 4.5 18h7a1.5 1.5 0 0 0 1.5-1.5v-5.879a1.5 1.5 0 0 0-.44-1.06L9.44 6.439A1.5 1.5 0 0 0 8.378 6H4.5Z" />
                  </svg>
                </button>
              </span>
            )}
          </div>
        )}

        {/* Music: date only */}
        {work.category === "music" && (
          <div className="mt-3 text-xs text-white/40">
            <time>
              {new Date(work.date).toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        )}

        {/* Fallback */}
        {!work.category && (
          <div className="mt-3 text-xs text-white/40">
            <time>
              {new Date(work.date).toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        )}
      </article>
    </Link>
  );
}
