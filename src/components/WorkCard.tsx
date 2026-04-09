import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export function WorkCard({ work }: { work: PostMeta }) {
  return (
    <Link href={`/work/${work.slug}`}>
      <article className="group rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 p-5">
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
              <span className="text-accent/70 group-hover:text-accent transition-colors truncate max-w-[200px]">
                {work.url}
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
