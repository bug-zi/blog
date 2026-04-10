import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

interface StarCardProps {
  star: PostMeta;
}

const STAR_TYPE_LABELS: Record<string, string> = {
  website: "网站",
  article: "文章",
  music: "音乐",
  movie: "影视",
};

const STAR_TYPE_ICONS: Record<string, string> = {
  website: "🌐",
  article: "📄",
  music: "🎵",
  movie: "🎬",
};

export function StarCard({ star }: StarCardProps) {
  const typeLabel = STAR_TYPE_LABELS[star.category || ""] || "收藏";
  const typeIcon = STAR_TYPE_ICONS[star.category || ""] || "⭐";
  const linkUrl = star.link || star.url;

  return (
    <Link
      href={linkUrl || "#"}
      target={linkUrl ? "_blank" : undefined}
      rel={linkUrl ? "noopener noreferrer" : undefined}
      className="group block"
    >
      <article className="rounded-lg border-b border-white/10 hover:bg-white/10 px-3 -mx-3 transition-all duration-200 p-4">
        {/* Header: Type icon + Title */}
        <div className="flex items-start gap-2 mb-2">
          <span className="text-xl">{typeIcon}</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white/90 group-hover:text-white transition-colors truncate">
              {star.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        {star.description && (
          <p className="text-sm text-white/60 line-clamp-2 mb-2 pl-7">
            {star.description}
          </p>
        )}

        {/* Link display */}
        {linkUrl && (
          <div className="flex items-center gap-1.5 text-xs text-white/50 pl-7">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
              <path fillRule="evenodd" d="M12.586 5.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
            </svg>
            <span className="truncate">{linkUrl}</span>
          </div>
        )}

        {/* Date tag */}
        <div className="mt-2 pl-7">
          <span className="text-xs text-white/40">
            {new Date(star.date).toLocaleDateString("zh-CN", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </article>
    </Link>
  );
}
